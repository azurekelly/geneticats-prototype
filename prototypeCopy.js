(function() {
    var palette = {
        'point': "#e4d5bd",
        'white': "#f3efea",
        'black': "#2e2e2e",
        'blacktabby': "#83745c",
        'blacktabbypoint': "#9c8a6f",
        'blackpoint': "#393027",
        'blackdilute': "#929292",
        'blackdilutetabby': "#b3b1ac",
        'blackdilutetabbypoint': "#b3b1ac",
        'blackdilutepoint': "#929292",
        'red': "#a75a13",
        'redtabby': "#cb8e55",
        'redtabbypoint': "#cb8e55",
        'redpoint': "#a75a13",
        'reddilute': "#cda284",
        'reddilutetabby': "#e0bfa4",
        'reddilutetabbypoint': "#e0bfa4",
        'reddilutepoint': "#cda284",
        'blue': "#46a2cc",
        'yellow': "#dfb305"
    };
    var spriteSheet;
    var genomeLength = 13;
    var canvas = Snap("#mom");
    var viewBox = "0 0 389 306";

    function Cat(genotype) {
        this.genotype = genotype;
        this.dilute = countSetBits(genotype & 3);
        this.tabby = countSetBits((genotype >> 2) & 3);
        this.red = countSetBits((genotype >> 4) & 3);
        this.white = countSetBits((genotype >> 6) & 3);
        this.point = countSetBits((genotype >> 8) & 3);
        this.muzzleLength = countSetBits((genotype >> 10) & 0xF);
        this.eyeShape = countSetBits((genotype >> 14) & 0xF);
        this.headShape = countSetBits((genotype >> 18) & 0xF);
        this.earAngle = countSetBits((genotype >> 22) & 0xF);
        this.constructHead();

        return this;
    }

    Cat.prototype.selectElements = function() {
        this.earEl = spriteSheet.select('.ears' + (this.earAngle + 1)).clone();
        this.headEl = spriteSheet.select('.head' + (this.headShape + 1)).clone();
        this.eyeEl = spriteSheet.select('.eyes' + (this.eyeShape + 1)).clone();
        this.lineEl = spriteSheet.select('.lines' + (this.headShape + 1)).clone();
        this.muzzleEl = spriteSheet.select('.muzzle' + (this.muzzleLength + 1)).clone();
        this.pointEl = spriteSheet.select('.point').clone();
        this.tabbyEl = spriteSheet.select('.tabby').clone();
        this.tortieEl = spriteSheet.select('.tortie').clone();
        this.torbieEl = spriteSheet.select('.torbie').clone();
        this.whiteEl = spriteSheet.select((this.white === 2) ? '.highwhite' : '.lowwhite').clone();
        this.markingEl = canvas.g();
        this.whiteMarkingEl = canvas.g();
        this.headMask = canvas.g();
        this.whiteMask = canvas.g(this.lineEl.clone().attr({'fill': '#fff'}));
        this.tortieMask = canvas.g(this.tortieEl.clone().attr({'fill': '#fff'}));
        this.eyeMask = canvas.g(this.eyeEl.select('.iris').clone().attr({'fill': "#fff"}));

        if(this.point === 2) {
            this.headMask.add(this.pointEl.clone().attr({'fill': '#fff'}));
            this.markingEl.add(this.pointEl);
        }
        else {
            this.headMask.add(this.lineEl.clone().attr({'fill': '#fff'}));
        }
        if(this.tabby > 0) {
            this.markingEl.add(this.tabbyEl);
        }
        if(this.red === 1) {
            this.markingEl.add(this.tortieEl);
            if(this.tabby > 0) {
                this.markingEl.add(this.torbieEl);
            }
        }
        if(this.white > 0) {
            this.whiteMarkingEl.add(this.whiteEl);
        }

        this.colorElements();
    };

    Cat.prototype.colorElements = function() {
        //must be called first for the colors to apply
        this.parseColors();

        fill(this.earEl.select(".left"), palette[this.baseColor]);
        fill(this.earEl.select(".right"), palette[this.rightEarColor]);
        fill(this.headEl, palette[this.headColor]);
        fill(this.pointEl, palette[this.baseColor]);
        fill(this.tabbyEl, palette[this.stripeColor]);
        fill(this.tortieEl, palette[this.redColor]);
        fill(this.torbieEl, palette[this.torbieColor]);
        fill(this.whiteEl, palette["white"]);
        fill(this.eyeEl.select(".iris"), palette[this.eyeColor]);
        fill(this.muzzleEl.select(".lips"), palette[this.muzzleColor]);
        fill(this.muzzleEl.select(".jaw"), palette[this.jawColor]);
    };

    Cat.prototype.parseColors = function() {
        this.baseColor = "black";

        if (this.red === 2) {
            this.baseColor = "red";
        }
        if (this.dilute === 2) {
            this.baseColor += "dilute";
        }
        if (this.tabby > 0) {
            this.baseColor += "tabby";
        }
        if (this.point === 2) {
            this.baseColor += "point";
        }

        this.stripeColor = this.baseColor.replace("tabby", "");
        this.redColor = this.baseColor.replace("black", "red");
        this.torbieColor = this.redColor.replace("tabby", "");
        this.muzzleColor = this.baseColor;
        this.jawColor = this.baseColor;
        this.rightEarColor = this.baseColor;

        if(this.red === 1) {
            this.jawColor = this.redColor;
            this.rightEarColor = this.redColor;
        }

        if(this.point === 2) {
            this.headColor = "point";
        }
        else {
            this.headColor = this.baseColor;
        }

        if(this.white > 0) {
            this.muzzleColor = "white";
            this.jawColor = "white";
        }

        if((this.point === 2) || (this.white === 2)) {
            this.eyeColor = "blue";
        }
        else {
            this.eyeColor = "yellow";
        }
    };

    Cat.prototype.maskElements = function() {
        this.markingEl.attr({'mask': this.headMask});
        this.whiteMarkingEl.attr({'mask': this.whiteMask});
        this.torbieEl.attr({'mask': this.tortieMask});
        this.eyeEl.select(".inner").attr({'mask': this.eyeMask});
    };

    Cat.prototype.constructHead = function() {
        this.svg = canvas.g().attr({'data-genotype': this.genotype})
        this.selectElements();

        this.svg.append(this.earEl);
        this.svg.append(this.headEl);
        this.svg.append(this.markingEl);
        this.svg.append(this.whiteMarkingEl);
        this.svg.append(this.eyeEl);
        this.svg.append(this.lineEl);
        this.svg.append(this.muzzleEl);

        this.maskElements();
    };

    function fill(el, fill) {
        el.attr({'fill': fill});
    }

    function countSetBits(n) {
        var count = 0;

        while (n) {
            count++;
            n &= (n - 1);
        }

        return count;
    }

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function randBool() {
        return randomBetween(0, 1);
    }

    function randomGenotype() {
        var genotype = 0;
        for(var i = 0; i < 26; i++) {
            genotype <<= 1;
            genotype |= randBool();
        }

        return genotype;
    }

    function toBinary(i, length) {
        var binary = i.toString(2);
        return ("0".repeat(length)).substr(binary.length) + binary;
    }

    function breed(momGenes, dadGenes) {
        var momChromosome = randomChromosome(momGenes, genomeLength);
        var dadChromosome = randomChromosome(dadGenes, genomeLength) << 1;
        return momChromosome | dadChromosome;
    }

    //Currently unnecessary, but will become increasingly more useful as gene bit lengths increase
    function pickRandomGene() {
        return randomBetween(1, 2);
    }

    function randomChromosome(genotype, genomeLength) {
        var result = 0;
        for (var i = 0; i < genomeLength; i++) {
            var shift = i * 2;
            var mask = pickRandomGene();
            var gene;

            //shift genotype to remove already processed genes and ensure the last 2 bits are always the gene that's being chosen for
            if (i > 0) {
                genotype = genotype >>> 2;
            }

            gene = genotype & mask;

            if (mask === 2) {
                gene = gene >>> 1;
            }

            gene = gene << shift;

            result = result | gene;
        }
        return result;
    }



    Snap.load("spritesheet clean.svg", function (loadedFragment) {
        spriteSheet = loadedFragment;
        canvas.attr({'viewBox': viewBox});
        var s = Snap("#dad").attr({'viewBox': viewBox});
        var childOut = Snap("#child").attr({'viewBox': viewBox});
        var mom = new Cat(randomGenotype());
        var dad = new Cat(randomGenotype());
        var child;
        canvas.append(mom.svg);
        s.append(dad.svg);

        $("#breed").on("click", function() {
            childOut.clear();
            child = new Cat(breed(mom.genotype, dad.genotype));
            childOut.append(child.svg);
        });
    });
})();