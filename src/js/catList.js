export const catteryList = [];

export function addCat(id, genotype) {
    catteryList.push({id, genotype});
    console.log(catteryList);
}