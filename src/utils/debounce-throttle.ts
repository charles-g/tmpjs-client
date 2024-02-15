export function debounce<T extends (...args: any[]) => void>(func: T, wait = 16) {
    let timeout;
    return function (this: ThisParameterType<T>, ...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

export function throttle<T extends (...args: any[]) => void>(func: T, wait = 50) {
    let throttle = false;
    return function (this: ThisParameterType<T>, ...args) {
        if (!throttle) {
            func.apply(this, args);
            throttle = true;
            setInterval(() => { throttle = false }, wait);
        }
    }
}
