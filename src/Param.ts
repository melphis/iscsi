export interface IParam {
  name?: string;
  args?: string[];
  enabled?: boolean;
}

export class Param implements IParam {
  name: string;
  args: string[];
  enabled: boolean;

  constructor(data: IParam = {}) {
    this.name = data.name;
    this.args = data.args;
    this.enabled = typeof data.enabled === 'boolean' ? data.enabled : true;
  }

  static parse(row: string): Param {
    const [name, ...args] = row.match(/\S+/g);

    return new Param({
      name, args, enabled: name.indexOf('#') !== 0
    });
  }

  serialize(): string {
    const ds = this.enabled ? '' : '#';
    return `${ds}${this.name} ${this.args.join(' ')}`;
  }
}
