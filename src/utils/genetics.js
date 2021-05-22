import uniqid from 'uniqid';
import {palette} from './palette';
import {countSetBits, randomBetween} from './utils';

const genomeLength = 13;

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

export function doPhenotypesMatch(cat1, cat2) {
    const phenotype1 = genotypeToPhenotype(cat1.genotype);
    const phenotype2 = genotypeToPhenotype(cat2.genotype);

    for(const gene in phenotype1) {
        if(phenotype1[gene] !== phenotype2[gene]) return false;
    }
    return true;
}

export function randomCat() {
    return {id: uniqid(), genotype: randomGenotype()};
}

export function randomOffspring(mom, dad) {
    return {id: uniqid(), genotype: breed(mom.genotype, dad.genotype)};
}

export function randomGenotype() {
    let genotype = 0;
    const genes = [0, 0, 1, 2, 3];
    for(let i = 0; i < 13; i++) {
        genotype <<= 2;
        genotype |= genes[randomBetween(0, 5)];
    }

    return genotype;
}

function breed(momGenes, dadGenes) {
    const momChromosome = randomChromosome(momGenes, genomeLength);
    const dadChromosome = randomChromosome(dadGenes, genomeLength) << 1;
    return momChromosome | dadChromosome;
}

//Currently unnecessary, but will become increasingly more useful as gene bit lengths increase
function pickRandomGene() {
    return randomBetween(1, 2);
}

function randomChromosome(genotype, genomeLength) {
    let result = 0;
    for(let i = 0; i < genomeLength; i++) {
        const shift = i * 2;
        const mask = pickRandomGene();
        let gene;

        //shift genotype to remove already processed genes and ensure the last 2 bits are always the gene that's being chosen for
        if(i > 0) {
            genotype = genotype >>> 2;
        }

        gene = genotype & mask;

        if(mask === 2) {
            gene = gene >>> 1;
        }

        gene = gene << shift;

        result = result | gene;
    }
    return result;
}