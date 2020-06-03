import {countSetBits, fill} from './utils';
import {palette} from './palette';

function Cat(genotype, spritesheet, canvas) {
    this.genotype = genotype;
    this.spriteSheet = spritesheet;
    this.canvas = canvas;
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
    this.earEl = this.spriteSheet.select('.ears' + (this.earAngle + 1)).clone();
    this.headEl = this.spriteSheet.select('.head' + (this.headShape + 1)).clone();
    this.eyeEl = this.spriteSheet.select('.eyes' + (this.eyeShape + 1)).clone();
    this.lineEl = this.spriteSheet.select('.lines' + (this.headShape + 1)).clone();
    this.muzzleEl = this.spriteSheet.select('.muzzle' + (this.muzzleLength + 1)).clone();
    this.pointEl = this.spriteSheet.select('.point').clone();
    this.tabbyEl = this.spriteSheet.select('.tabby').clone();
    this.tortieEl = this.spriteSheet.select('.tortie').clone();
    this.torbieEl = this.spriteSheet.select('.torbie').clone();
    this.whiteEl = this.spriteSheet.select((this.white === 2) ? '.highwhite' : '.lowwhite').clone();
    this.markingEl = this.canvas.g();
    this.whiteMarkingEl = this.canvas.g();
    this.headMask = this.canvas.g();
    this.whiteMask = this.canvas.g(this.lineEl.clone().attr({'fill': '#fff'}));
    this.tortieMask = this.canvas.g(this.tortieEl.clone().attr({'fill': '#fff'}));
    this.eyeMask = this.canvas.g(this.eyeEl.select('.iris').clone().attr({'fill': '#fff'}));

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

    fill(this.earEl.select('.left'), palette[this.baseColor]);
    fill(this.earEl.select('.right'), palette[this.rightEarColor]);
    fill(this.headEl, palette[this.headColor]);
    fill(this.pointEl, palette[this.baseColor]);
    fill(this.tabbyEl, palette[this.stripeColor]);
    fill(this.tortieEl, palette[this.redColor]);
    fill(this.torbieEl, palette[this.torbieColor]);
    fill(this.whiteEl, palette['white']);
    fill(this.eyeEl.select('.iris'), palette[this.eyeColor]);
    fill(this.muzzleEl.select('.lips'), palette[this.muzzleColor]);
    fill(this.muzzleEl.select('.jaw'), palette[this.jawColor]);
};

Cat.prototype.parseColors = function() {
    this.baseColor = 'black';

    if(this.red === 2) {
        this.baseColor = 'red';
    }
    if(this.dilute === 2) {
        this.baseColor += 'dilute';
    }
    if(this.tabby > 0) {
        this.baseColor += 'tabby';
    }
    if(this.point === 2) {
        this.baseColor += 'point';
    }

    this.stripeColor = this.baseColor.replace('tabby', '');
    this.redColor = this.baseColor.replace('black', 'red');
    this.torbieColor = this.redColor.replace('tabby', '');
    this.muzzleColor = this.baseColor;
    this.jawColor = this.baseColor;
    this.rightEarColor = this.baseColor;

    if(this.red === 1) {
        this.jawColor = this.redColor;
        this.rightEarColor = this.redColor;
    }

    if(this.point === 2) {
        this.headColor = 'point';
    }
    else {
        this.headColor = this.baseColor;
    }

    if(this.white > 0) {
        this.muzzleColor = 'white';
        this.jawColor = 'white';
    }

    if((this.point === 2) || (this.white === 2)) {
        this.eyeColor = 'blue';
    }
    else {
        this.eyeColor = 'yellow';
    }
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