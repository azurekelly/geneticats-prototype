// when storing the genotype as hex, it has the nice side effect of having a hex digit be equal to a genotype for a single gene
// this means no need for decoding to binary when converting to phenotype
// polygenes probably need a different method, since those alleles are single bit, with 2 gene pairs per hex digit


// just used to improve readability, the digits can be considered the "alele id" for that slot
// g = gene, prefix is just there to allow numbers in variable names
// these are used for 2-bit genes, no polygenes
const g33 = 'F';
const g32 = 'E';
const g31 = 'D';
const g30 = 'C';
const g22 = 'A';
const g21 = '9';
const g20 = '8';
const g11 = '5';
const g10 = '4';
const g00 = '0';

// phenotype functions will probably be stored in an array of anonymous functions for easily looping over genotype string
// when looping, if the genome is longer than the string, the default value of the switch statement should be used
// this means all new genes added should go on the end of the genotype string
const blackPhenotype = gene => {
    // B = 2, b = 1, bl = 0
    switch(gene) {
        case g22:
        case g21:
        case g20:
        default:
            return 'black';
        case g11:
        case g10:
            return 'chocolate';
        case g00:
            return 'cinnamon';
    }
};

// needs to be in the same order as the phenotype array!
// used for selecting random genotypes
// also allows for easy disabling of WIP genes like chocolate and cinnamon. The switch statements won't change, just the gene pool
const blackGenes = [g22, g21, g20, g11, g10, g00];