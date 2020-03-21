import { BuilderContext } from '@angular-devkit/architect';
import * as fs from 'fs';
import * as Client from 'node-ssh';

export class Command {
  constructor(protected context: BuilderContext, private client: Client) {}

  async run(command: string, options: any) {
    this.context.logger.info(`✔  Running command... ${command}`)
    options = options.privateKey
      ? {
          ...options,
          privateKey: fs.readFileSync(options.privateKey, 'utf8'),
        }
      : options

    await this.client
      .connect({
        ...options,
      })
      .then(() => {
        this.context.logger.info(`✔ connected successully..`)
      })
      .catch((err) => {
        this.context.logger.error(err)
      })

    const commands = command.split(';')
    for (let i = 0; i < commands.length; i++) {
      await this.client
        .exec(commands[i], [], { stream: 'stdout', options: { pty: true } })
        .then((data: any) => {
          this.context.logger.info(`✔ ${command} executed successully...`, data)
        })
        .catch((err) => {
          this.context.logger.error(err)
        })
    }

    await this.client.dispose()

    this.context.logger.info(`✔ client disposed successully...`)
  }
}
