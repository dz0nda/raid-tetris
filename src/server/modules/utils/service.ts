import { Logger } from './utils';

export class Base {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public log(value: string): void {
    Logger.info(`[${this.name}] ${value}`);
  }

  public err(value: string): void {
    Logger.error(`[${this.name}] ${value}`);
  }

  public debug(value: string): void {
    Logger.debug(`[${this.name}] ${value}`);
  }
}
