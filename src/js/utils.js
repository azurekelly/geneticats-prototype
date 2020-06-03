export function countSetBits(n) {
    let count = 0;

    while(n) {
        count++;
        n &= (n - 1);
    }

    return count;
}

export function fill(el, fill) {
    el.attr({'fill': fill});
}

export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}