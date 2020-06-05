import {checkGoal} from './goal';

export let catteryList = [];
export let storageList = [];

export function addCat(id, genotype) {
    catteryList = [{id, genotype}, ...catteryList];
    checkGoal(genotype);
}

export function despositToStorage(id) {
    storageList = [...catteryList.filter(cat => cat.id === id), ...storageList];
    catteryList = catteryList.filter(cat => cat.id !== id);
}

export function withdrawFromStorage(id) {
    catteryList = [...storageList.filter(cat => cat.id === id), ...catteryList];
    storageList = storageList.filter(cat => cat.id !== id);
}