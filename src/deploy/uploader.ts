import { BuilderContext } from '@angular-devkit/architect';
import * as Sftp from 'ssh2-sftp-client';

import { getHost, getRemotePath, getUsername } from './config';

export class Uploader {
  private _context: BuilderContext

  constructor(context: BuilderContext, private client: Sftp) {
    this._context = context
  }
  upload(filesPath: string, builderConfig: any) {
    try {
      const host = getHost(builderConfig)
      const username = getUsername(builderConfig)
      const remotePath = getRemotePath(builderConfig)
      if (!host || !username || !remotePath) {
        this._context.logger.error(`❌  Looks like you are missing some configuration`)
        return
      }
    } catch {
      return
    }
    return this.uploadFile(builderConfig, filesPath)
  }

  public async uploadFile(options: any, localFilePath: string) {
    const remotePathName = getRemotePath(options)
    const localPathName = localFilePath

    options = options.privateKey
      ? {
          ...options,
          privateKey: require('fs').readFileSync(options.privateKey),
        }
      : options

    await this.client
      .connect({
        ...options,
      })
      .then(() => {
        let rslt = (this.client as any).uploadDir(localPathName, remotePathName)
        return rslt
      })
      .then(() => this.client.end())
      .then((e: any) => this._context.logger.info(`Uploaded file successfully`))
      .catch((err: any) => {
        this._context.logger.error(`Error uploading file: ${err} \n ${JSON.stringify(options)}`)
      })
  }
}
