//IMPORTANT NOTE: this implementation currently assumes each gene is represented by a 1 bit switch. It needs to be reworked to work with multi-allele genes. Probably just pre-designate a larger area, even though the gene may only use 1 bit. The bits saves in storage space will likely be paid for in processing time/code complexity. Alternatively, look into making a custom mask number array

//Additional note: it currently disregards gender, which is fine for the prototype, however it can be fixed by altering the male's red gene after breeding.
//first, unset the red gene coming from the father, then extract the mother's red gene (the one to the right, in the current implementation) with a mask. Finally, shift that gene to the left and reset it in the location the father's red gene was.

(function () {
    // const mom = 0b00101101;
    // const dad = 0b10111011;
    const mom = randomBetween(0, 255);
    const dad = randomBetween(0, 255);
    //represents the number of gene pairs in the genome (i.e. half the number of bits it uses)
    const gLength = 4;

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Currently unnecessary, but will become increasingly more useful as gene bit lengths increase
    function pickRandomGene() {
        return randomBetween(1, 2);
    }

    //it will always output a genotype with every second bit unset (e.g. the second smallest bit is always 0). Shift to the left by 1 to represent the other parent
    function randomChromosome(genotype, genomeLength) {
        let result = 0;
        for (let i = 0; i < genomeLength; i++) {
            let shift = i * 2;
            let mask = pickRandomGene();
            let gene;

            //shift genotype to remove already processed genes and ensure the last 2 bits are always the gene that's being chosen for
            if (i > 0) {
                genotype = genotype >>> 2;
            }

            gene = genotype & mask;

            if (mask == 0b10) {
                gene = gene >>> 1;
            }

            gene = gene << shift;

            result = result | gene;
        }
        return result;
    }

    function countSetBits(n) {
        let count = 0;

        while (n) {
            count++;
            n &= (n - 1);
        }

        return count;
    }

    function breed(momGenes, dadGenes) {
        let momChromosome = randomChromosome(momGenes, gLength);
        let dadChromosome = randomChromosome(dadGenes, gLength) << 1;
        return momChromosome | dadChromosome;
    }

    function toBinary(i, length) {
        let binary = i.toString(2);
        return ("0".repeat(length * 2)).substr(binary.length) + binary;
    }

    console.log("Genotype:");
    console.log(toBinary(mom, gLength));
    console.log(toBinary(dad, gLength));
    console.log("Children:");
    for (let i = 0; i < 20; i++) {
        // let child = (breed(mom, dad)).toString(2);
        // child = "00000000".substr(child.length) + child;
        // console.log(toBinary(randomChromosome(mom, gLength)));
        console.log(toBinary(breed(mom, dad), gLength));

        //SUCCESS!!
    }

})();