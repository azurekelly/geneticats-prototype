import {fill} from './utils';
import {genotypeToPhenotype, phenotypeToColors} from './genetics';

function Cat(genotype, spritesheet, canvas) {
    this.genotype = genotype;
    this.spriteSheet = spritesheet;
    this.canvas = canvas;
    this.phenotype = genotypeToPhenotype(genotype);
    this.colors = phenotypeToColors(this.phenotype);
    this.constructHead();

    return this;
}

Cat.prototype.selectElements = function() {
    this.earEl = this.spriteSheet.select('.ears' + (this.phenotype.earSet + 1)).clone();
    this.headEl = this.spriteSheet.select('.head' + (this.phenotype.headSize + 1)).clone();
    this.eyeEl = this.spriteSheet.select('.eyes' + (this.phenotype.eyeShape + 1)).clone();
    this.lineEl = this.spriteSheet.select('.lines' + (this.phenotype.headSize + 1)).clone();
    this.muzzleEl = this.spriteSheet.select('.muzzle' + (this.phenotype.muzzleLength + 1)).clone();
    this.pointEl = this.spriteSheet.select('.point').clone();
    this.tabbyEl = this.spriteSheet.select('.tabby').clone();
    this.tortieEl = this.spriteSheet.select('.tortie').clone();
    this.torbieEl = this.spriteSheet.select('.torbie').clone();
    this.whiteEl = this.spriteSheet.select((this.phenotype.white == 'high') ? '.highwhite' : '.lowwhite').clone();
    this.markingEl = this.canvas.g();
    this.whiteMarkingEl = this.canvas.g();
    this.headMask = this.canvas.g();
    this.whiteMask = this.canvas.g(this.lineEl.clone().attr({'fill': '#fff'}));
    this.tortieMask = this.canvas.g(this.tortieEl.clone().attr({'fill': '#fff'}));
    this.eyeMask = this.canvas.g(this.eyeEl.select('.iris').clone().attr({'fill': '#fff'}));

    if(this.phenotype.point === 'point') {
        this.headMask.add(this.pointEl.clone().attr({'fill': '#fff'}));
        this.markingEl.add(this.pointEl);
    }
    else {
        this.headMask.add(this.lineEl.clone().attr({'fill': '#fff'}));
    }
    if(this.phenotype.tabby === 'tabby') {
        this.markingEl.add(this.tabbyEl);
    }
    if(this.phenotype.red === 'tortie') {
        this.markingEl.add(this.tortieEl);
        if(this.phenotype.tabby === 'tabby') {
            this.markingEl.add(this.torbieEl);
        }
    }
    if(this.phenotype.white !== 'non-white') {
        this.whiteMarkingEl.add(this.whiteEl);
    }

    this.colorElements();
};

Cat.prototype.colorElements = function() {
    fill(this.earEl.select('.left'), this.colors.leftEar);
    fill(this.earEl.select('.right'), this.colors.rightEar);
    fill(this.headEl, this.colors.head);
    fill(this.pointEl, this.colors.point);
    fill(this.tabbyEl, this.colors.stripes);
    fill(this.tortieEl, this.colors.tortie);
    fill(this.torbieEl, this.colors.tortieStripes);
    fill(this.whiteEl, this.colors.white);
    fill(this.eyeEl.select('.iris'), this.colors.eyes);
    fill(this.muzzleEl.select('.lips'), this.colors.muzzle);
    fill(this.muzzleEl.select('.jaw'), this.colors.jaw);
};

Cat.prototype.maskElements = function() {
    this.markingEl.attr({'mask': this.headMask});
    this.whiteMarkingEl.attr({'mask': this.whiteMask});
    this.torbieEl.attr({'mask': this.tortieMask});
    this.eyeEl.select('.inner').attr({'mask': this.eyeMask});
};

Cat.prototype.constructHead = function() {
    this.svg = this.canvas.g().attr({'class': 'cat-head', 'data-genotype': this.genotype});
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

export default Cat;