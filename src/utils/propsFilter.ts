
export function propsFilter<T extends Object>(obj: any, keys: string[]) : T {
    const res = keys.reduce((acc, key) => {
        if (obj && obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
    return res as T;
}
