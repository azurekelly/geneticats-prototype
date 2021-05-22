export function countSetBits(n) {
    let count = 0;

    while(n) {
        count++;
        n &= (n - 1);
    }

    return count;
}

export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function alertWin() {
    alert('You did it! A new goal has been added.');
}

export function mergeClasses(base, additional) {
    return base + (additional ? ` ${additional}` : '');
}