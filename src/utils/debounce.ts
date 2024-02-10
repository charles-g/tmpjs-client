export function debounce<T extends (...args: any[]) => void>(func: T, wait = 16) {
    let timeout;
    return function (this: ThisParameterType<T>, ...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
