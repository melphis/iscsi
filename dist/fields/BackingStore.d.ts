import Field from './Field';
export default class BackingStore extends Field {
    static get Name(): string;
    get name(): string;
    toJson(): string;
}
