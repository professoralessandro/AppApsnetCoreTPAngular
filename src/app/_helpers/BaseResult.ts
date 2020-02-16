export class BaseResult<T> {
    countItems: number;
    page: number;
    limit: number;
    items: T[];
    length: number;
}
