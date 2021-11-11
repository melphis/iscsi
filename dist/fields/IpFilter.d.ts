import Field from './Field';
export default class IpFilter extends Field {
    static get Name(): string;
    get name(): string;
    toJson(): string;
}
