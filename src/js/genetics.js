import {palette} from './palette';
import {countSetBits} from './utils';

export function genotypeToPhenotype(genotype) {
    // counting the bits gets you the equivalent values XX (2), Xx (1), or xx (0), while ignoring gene order
    const dilute = countSetBits(genotype & 3);
    const tabby = countSetBits((genotype >> 2) & 3);
    const red = countSetBits((genotype >> 4) & 3);
    const white = countSetBits((genotype >> 6) & 3);
    const point = countSetBits((genotype >> 8) & 3);
    const muzzleLength = countSetBits((genotype >> 10) & 0xF);
    const eyeShape = countSetBits((genotype >> 14) & 0xF);
    const headSize = countSetBits((genotype >> 18) & 0xF);
    const earSet = countSetBits((genotype >> 22) & 0xF);

    const phenotype = {
        headSize,
        earSet,
        eyeShape,
        muzzleLength,
        tabby: (tabby > 0) ? 'tabby' : 'non-tabby',
        dilute: (dilute === 2) ? 'dilute' : 'non-dilute',
        point: (point === 2) ? 'point' : 'non-point',
        red: (red === 2) ? 'red' : ((red === 1) ? 'tortie' : 'non-red'),
        white: (white === 2) ? 'high' : ((white === 1) ? 'low' : 'non-white')
    };

    return phenotype;
}

export function phenotypeToColors(phenotype) {
    let base = (phenotype.red === 'red') ? 'red' : 'black';

    if(phenotype.dilute === 'dilute') base += 'Dilute';
    if(phenotype.tabby === 'tabby') base += 'Tabby';
    if(phenotype.point === 'point') base += 'Point';

    const redBase = base.replace('black', 'red'); // essentially ignored on already red cats

    const colors = {
        head: (phenotype.point === 'point') ? palette['point'] : palette[base],
        leftEar: palette[base],
        rightEar: (phenotype.red === 'tortie') ? palette[redBase] : palette[base],
        eyes: (phenotype.white === 'high' || phenotype.point === 'point') ? palette['blue'] : palette['yellow'],
        muzzle: (phenotype.white !== 'non-white') ? palette['white'] : palette[base],
        jaw: (phenotype.white !== 'non-white') ? palette['white'] : ((phenotype.red === 'tortie') ? palette[redBase] : palette[base]),
        stripes: palette[base.replace('Tabby', '')],
        tortie: palette[redBase],
        tortieStripes: palette[redBase.replace('Tabby', '')],
        point: palette[base],
        white: palette['white']
    };

    return colors;
}

export function comparePhenotypes(phenotype1, phenotype2) {
    for(const gene in phenotype1) {
        if(phenotype1[gene] !== phenotype2[gene]) return false;
    }
    return true;
}