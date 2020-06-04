export let catteryList = [];
export let storageList = [];

export function addCat(id, genotype) {
    catteryList.push({id, genotype});
}

export function despositToStorage(id) {
    storageList.push(...catteryList.filter(cat => cat.id === id));
    catteryList = catteryList.filter(cat => cat.id !== id);
}

export function withdrawFromStorage(id) {
    catteryList.push(...storageList.filter(cat => cat.id === id));
    storageList = storageList.filter(cat => cat.id !== id);
}