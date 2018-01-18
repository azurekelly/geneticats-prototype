(function () {
    var palette = {
        'point': "#e4d5bd",
        'white': "#f3efea",
        'black': "#2e2e2e",
        'blacktabby': "#83745c",
        'blacktabbypoint': "#9c8a6f",
        'blackpoint': "#3f342b",
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
    var canvas = Snap("#canvas");
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

    Cat.prototype.selectElements = function () {
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

        if (this.point === 2) {
            this.headMask.add(this.pointEl.clone().attr({'fill': '#fff'}));
            this.markingEl.add(this.pointEl);
        }
        else {
            this.headMask.add(this.lineEl.clone().attr({'fill': '#fff'}));
        }
        if (this.tabby > 0) {
            this.markingEl.add(this.tabbyEl);
        }
        if (this.red === 1) {
            this.markingEl.add(this.tortieEl);
            if (this.tabby > 0) {
                this.markingEl.add(this.torbieEl);
            }
        }
        if (this.white > 0) {
            this.whiteMarkingEl.add(this.whiteEl);
        }

        this.colorElements();
    };

    Cat.prototype.colorElements = function () {
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

    Cat.prototype.parseColors = function () {
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

        if (this.red === 1) {
            this.jawColor = this.redColor;
            this.rightEarColor = this.redColor;
        }

        if (this.point === 2) {
            this.headColor = "point";
        }
        else {
            this.headColor = this.baseColor;
        }

        if (this.white > 0) {
            this.muzzleColor = "white";
            this.jawColor = "white";
        }

        if ((this.point === 2) || (this.white === 2)) {
            this.eyeColor = "blue";
        }
        else {
            this.eyeColor = "yellow";
        }
    };

    Cat.prototype.maskElements = function () {
        this.markingEl.attr({'mask': this.headMask});
        this.whiteMarkingEl.attr({'mask': this.whiteMask});
        this.torbieEl.attr({'mask': this.tortieMask});
        this.eyeEl.select(".inner").attr({'mask': this.eyeMask});
    };

    Cat.prototype.constructHead = function () {
        this.svg = canvas.g().attr({'class': "cat-head", 'data-genotype': this.genotype})
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
        var genes = [0, 0, 1, 2, 3];
        for (var i = 0; i < 13; i++) {
            genotype <<= 2;
            genotype |= genes[randomBetween(0, 5)];
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
        canvas.attr({'viewBox': viewBox});
        spriteSheet = loadedFragment;
        newGoal();
        $("#storage-screen").hide();

        var $doc = $(document);

        $doc.on("click", "#breed-btn", function () {
            var $main = $("#main");
            var $breed = $("<div></div>").attr('id', "breed-screen");
            var $containerBase = $("<div></div>").attr('class', "cat-container");
            var $selectBase = $("<div></div>").attr('class', "small-btn select-confirm").html("<span>Select</span>");
            var $keepBase = $("<div></div>").attr('class', "small-btn keep-confirm disabled").html("<span>Keep</span>");
            var $svgBase = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
            var $bigBtn = $("<div></div>").attr({'id': "breed-confirm", 'class': "big-btn disabled"}).html("<span>Breed</span>");

            $breed.append($("<div></div>").attr("id", "back-btn").html("<span>◄</span>"));

            $breed.append(
                $("<div id='parents'></div>")
                    .append($containerBase.clone().attr('data-id', '1').addClass("parent")
                        .append($svgBase.clone().attr('id', 'parent1')))
                    .append($bigBtn)
                    .append($containerBase.clone().attr('data-id', "2").addClass("parent")
                        .append($svgBase.clone().attr('id', 'parent2')))
                    .append($selectBase.clone().attr({'data-id': '1', 'id': 'select-1'}))
                    .append($selectBase.attr({'data-id': '2', 'id': 'select-2'}))
            );
            $breed.append(
                $("<div id='offspring'></div>")
                    .append($containerBase.clone().attr('data-id', '1').addClass("offspring")
                        .append($svgBase.clone().attr('id', 'offspring1')))
                    .append($containerBase.clone().attr('data-id', '2').addClass("offspring")
                        .append($svgBase.clone().attr('id', 'offspring2')))
                    .append($containerBase.attr('data-id', '3').addClass("offspring")
                        .append($svgBase.attr('id', 'offspring3')))
                    .append($keepBase.clone().attr({'data-id': '1', 'id': 'keep-1'}))
                    .append($keepBase.clone().attr({'data-id': '2', 'id': 'keep-2'}))
                    .append($keepBase.attr({'data-id': '3', 'id': 'keep-3'}))
            );


            $main.find("#home-screen").remove();
            $main.append($breed);
        });

        $doc.on("click", "#adopt-btn", function () {
            var $main = $("#main");
            var $adopt = $("<div></div>").attr('id', "adopt-screen");
            var $containerBase = $("<div></div>").attr('class', "cat-container");
            var $btnBase = $("<div></div>").attr('class', "small-btn adopt-confirm").html("<span>Adopt</span>");
            var $svgBase = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);

            $adopt.append($("<div></div>").attr("id", "back-btn").html("<span>◄</span>"));
            $adopt.append($("<div></div>").attr("id", "refresh-btn").html("<span>🗘</span>"));
            $adopt.append(
                $containerBase.clone()
                    .attr('data-id', "1")
                    .append($svgBase.clone().attr("id", "adopt1"))
            );
            $adopt.append(
                $containerBase.clone()
                    .attr('data-id', "2")
                    .append($svgBase.clone().attr("id", "adopt2"))
            );
            $adopt.append(
                $containerBase
                    .attr('data-id', "3")
                    .append($svgBase.clone().attr("id", "adopt3"))
            );
            $adopt.append($btnBase.clone().attr('data-id', "1"));
            $adopt.append($btnBase.clone().attr('data-id', "2"));
            $adopt.append($btnBase.attr('data-id', "3"));

            $main.find("#home-screen").remove();
            $main.append($adopt);

            Snap("#adopt1").append(new Cat(randomGenotype()).svg);
            Snap("#adopt2").append(new Cat(randomGenotype()).svg);
            Snap("#adopt3").append(new Cat(randomGenotype()).svg);
        });

        $doc.on("click", "#storage-btn", function() {
            $("#main").append($("<div></div>").attr("id", "back-btn").html("<span>◄</span>"));
            $("#home-screen").remove();
            $("#storage-screen").show();
        });

        $doc.on("click", "#back-btn", function () {
            $(".cat.disabled").removeClass("disabled");
            $(".selected").removeClass("selected");
            $("#storage-screen").hide();
            var $main = $("#main");
            var $home = $("<div></div>").attr('id', "home-screen");
            $home.append($("<div></div>").attr({'id': "breed-btn", 'class': "big-btn"}).html("<span>Breed</span>"));
            $home.append($("<div></div>").attr({'id': "adopt-btn", 'class': "big-btn"}).html("<span>Adopt</span>"));
            $home.append($("<div></div>").attr({'id': "storage-btn", 'class': "big-btn"}).html("<span>Storage</span>"));

            $("#breed-screen, #adopt-screen, #back-btn").remove();
            $("#storage-screen").hide();
            $main.append($home);
        });

        $doc.on("click", "#adopt-screen #refresh-btn", function() {
            var $svgBase = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);

            $(".adopt-confirm.disabled").removeClass("disabled");

            $("#adopt-screen").find(".cat-container").each(function(i, e) {
                $(e).html("").append($svgBase.clone().attr('id', "adopt" + (i + 1)));
            });

            Snap("#adopt1").append(new Cat(randomGenotype()).svg);
            Snap("#adopt2").append(new Cat(randomGenotype()).svg);
            Snap("#adopt3").append(new Cat(randomGenotype()).svg);
        });

        $doc.on("click", ".adopt-confirm", function() {
            var $this = $(this);
            if(!$this.is(".disabled")) {
                var $targetSvg = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
                var $catContainer = $(".cat-container[data-id='" + $this.attr('data-id') + "']");
                var $originalSvg = $catContainer.find("svg");
                var targetGenotype = Snap($originalSvg.get(0)).select(".cat-head").attr("data-genotype");

                $this.addClass("disabled");
                $catContainer.html("");
                $("#cattery").prepend($targetSvg);
                var svg = Snap($targetSvg.get(0));
                svg.append(new Cat(targetGenotype).svg);
                checkGoal(svg);
            }
        });

        $doc.on("click", ".select-confirm", function() {
            $(".cat-container.selected").removeClass("selected");

            var $this = $(this);

            $("#cattery").addClass("selected");
            $(".parent[data-id='" + $this.attr("data-id") + "']").addClass('selected');
        });

        $doc.on("click", ".keep-confirm", function() {
            var $this = $(this);
            if(!$this.is(".disabled")) {
                var $targetSvg = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
                var $catContainer = $(".offspring[data-id='" + $this.attr('data-id') + "']");
                var $originalSvg = Snap($catContainer.find("svg").get(0));
                var targetGenotype = $originalSvg.select(".cat-head").attr("data-genotype");

                $this.addClass("disabled");

                $originalSvg.clear();
                $("#cattery").prepend($targetSvg);
                var svg = Snap($targetSvg.get(0));
                svg.append(new Cat(targetGenotype).svg);
                checkGoal(svg);
            }
        });

        $doc.on("click", "#breed-confirm", function() {
            var $this = $(this);
            if(!($this.is(".disabled")) && ($(".parent.chosen").length === 2)) {
                var momGenotype = Snap("#parent1").select(".cat-head").attr('data-genotype');
                var dadGenotype = Snap("#parent2").select(".cat-head").attr('data-genotype');
                var child1 = Snap("#offspring1");
                var child2 = Snap("#offspring2");
                var child3 = Snap("#offspring3");

                child1.clear();
                child1.append(new Cat(breed(momGenotype, dadGenotype)).svg);
                child2.clear();
                child2.append(new Cat(breed(momGenotype, dadGenotype)).svg);
                child3.clear();
                child3.append(new Cat(breed(momGenotype, dadGenotype)).svg);
                $(".keep-confirm.disabled").removeClass("disabled");
            }
        });

        $doc.on("click", "#cattery .cat", function() {
            var $this = $(this);
            if($("#breed-screen").length > 0) {
                var $parent = $(".parent.selected");
                if($parent.length > 0) {
                    if($this.is(".disabled")) {
                        if($this.attr('data-id') === $parent.attr('data-id')) {
                            $(".selected").removeClass("selected");
                        }
                    }
                    else {
                        var targetGenotype = Snap($this.get(0)).select(".cat-head").attr("data-genotype");
                        $(".cat.disabled[data-id='" + $parent.attr('data-id') + "']").removeClass("disabled").attr('data-id', '');
                        $this.addClass("disabled").attr('data-id', $parent.attr('data-id'));

                        var s = Snap("#parent" + $parent.attr("data-id"));
                        s.clear();
                        s.append(new Cat(targetGenotype).svg);
                        $(".selected").removeClass("selected");
                    }

                    $parent.addClass("chosen");

                    if($(".parent.chosen").length === 2) {
                        $("#breed-confirm").removeClass("disabled");
                    }
                }
            }
            else if($("#storage-screen").is(':visible')) {
                var $targetSvg = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
                var $originalSvg = Snap($this.get(0));
                var movedGenotype = $originalSvg.select(".cat-head").attr("data-genotype");

                $("#storage-screen").prepend($targetSvg);
                Snap($targetSvg.get(0)).append(new Cat(movedGenotype).svg);
                $this.remove();
            }
        });

        $doc.on("click", "#storage-screen .cat", function() {
            var $this = $(this);
            var $targetSvg = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
            var $originalSvg = Snap($this.get(0));
            var movedGenotype = $originalSvg.select(".cat-head").attr("data-genotype");

            $("#cattery").prepend($targetSvg);
            Snap($targetSvg.get(0)).append(new Cat(movedGenotype).svg);
            $this.remove();
        })

    });

    function checkGoal(svg) {
        var matches = false;
        var goalCat = Snap("#goal");

        if((svg.select(".tabby") !== null && goalCat.select(".tabby") !== null) ||
            (svg.select(".tabby") === null && goalCat.select(".tabby") === null)) {

            if((svg.select(".tortie") !== null && goalCat.select(".tortie") !== null) ||
                (svg.select(".tortie") === null && goalCat.select(".tortie") === null)) {

                if((svg.select(".point") !== null && goalCat.select(".point") !== null) ||
                    (svg.select(".point") === null && goalCat.select(".point") === null)) {

                    if((svg.select(".lowwhite") !== null && goalCat.select(".lowwhite") !== null) ||
                        (svg.select(".lowwhite") === null && goalCat.select(".lowwhite") === null)) {

                        if((svg.select(".highwhite") !== null && goalCat.select(".highwhite") !== null) ||
                            (svg.select(".highwhite") === null && goalCat.select(".highwhite") === null)) {
                            var earMatch = svg.select(".ears").attr("class") === goalCat.select(".ears").attr("class");
                            var headMatch = svg.select(".head").attr("class") === goalCat.select(".head").attr("class");
                            var muzzleMatch = svg.select(".muzzle").attr("class") === goalCat.select(".muzzle").attr("class");
                            var eyeMatch = svg.select(".eyes").attr("class") === goalCat.select(".eyes").attr("class");

                            matches = earMatch && headMatch && muzzleMatch && eyeMatch;
                        }

                    }

                }

            }

        }

        if(matches) {
            var $score = $("#score");
            $score.text(parseInt($score.text()) + 50);
            newGoal();
            alert("You obtained the goal cat! A new goal has been added.");
        }
    }

    function newGoal() {
        var snap = Snap("#goal-cat");
        snap.clear();
        snap.append(new Cat(randomGenotype()).svg);
    }
})();