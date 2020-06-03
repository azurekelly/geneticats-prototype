import {randomBetween} from './utils';

const genomeLength = 13;

export function randomGenotype() {
    let genotype = 0;
    const genes = [0, 0, 1, 2, 3];
    for(let i = 0; i < 13; i++) {
        genotype <<= 2;
        genotype |= genes[randomBetween(0, 5)];
    }

    return genotype;
}

export function breed(momGenes, dadGenes) {
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
