import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { experimental, json, normalize } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import * as Client from 'node-ssh';
import * as Sftp from 'ssh2-sftp-client';

import { Command } from './command';
import { getHost, getPostDeployCommand, getUsername } from './config';
import { Uploader } from './uploader';

export default createBuilder<any>(
  async (builderConfig: any, context: BuilderContext): Promise<any> => {
    const root = normalize(context.workspaceRoot)
    const workspace = new experimental.workspace.Workspace(root, new NodeJsSyncHost())
    await workspace.loadWorkspaceFromHost(normalize('angular.json')).toPromise()

    if (!context.target) {
      throw new Error('Cannot deploy the application without a target')
    }

    let buildResult: BuilderOutput
    if (builderConfig.noBuild) {
      context.logger.info(`📦 Skipping build`)
      buildResult = {
        success: true,
      }
    } else {
      const configuration = builderConfig.configuration ? builderConfig.configuration : 'production'

      const overrides = {
        // this is an example how to override the workspace set of options
        ...(builderConfig.baseHref && { baseHref: builderConfig.baseHref }),
      }

      const build = await context.scheduleTarget(
        {
          target: 'build',
          project: context.target !== undefined ? context.target.project : '',
          configuration,
        },
        overrides as json.JsonObject,
      )

      buildResult = await build.result
    }
    if (buildResult.success) {
      context.logger.info(`✔ Build Completed`)
      const filesPath = buildResult.outputPath as string

      if (getHost(builderConfig) || getUsername(builderConfig)) {
        context.logger.info('Start uploading files...')
        const client = new Sftp()
        const uploader = new Uploader(context, client)
        await uploader.upload(filesPath, builderConfig)
        context.logger.info('✔ Finished uploading files...')

        if (getPostDeployCommand(builderConfig)) {
          const sshClient = new Client()
          const command = new Command(context, sshClient)
          await command.run(getPostDeployCommand(builderConfig), builderConfig)

          context.logger.info('✔ Post Deploy executed successfully...')
        }

        return { success: true }
      } else {
        return {
          error: `❌  Missing settings for Authentication`,
          success: false,
        }
      }
    } else {
      return {
        error: `❌ Application build failed`,
        success: false,
      }
    }
  },
)
