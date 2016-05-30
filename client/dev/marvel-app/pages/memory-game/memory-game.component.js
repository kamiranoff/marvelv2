"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var cards_service_1 = require("../../services/cards-service/cards-service");
var MemoryGame = (function () {
    function MemoryGame(_cardsService) {
        this._cardsService = _cardsService;
        this.title = 'Find the heroes';
        this.textInfo = 'Flip the cards';
        this.textButton = 'Reset';
        this.canFlip = false;
        this.record = Infinity;
        this.cardsCount = 0;
        this.page = 'memory-game';
        this.qty = 25;
    }
    MemoryGame.prototype.ngOnInit = function () {
        this.getHeroes(this.qty);
    };
    MemoryGame.prototype.getHeroes = function (qty) {
        var _this = this;
        this._cardsService.getHeroes(qty)
            .subscribe(function (heroes) {
            _this.logos = heroes;
            for (var i = 0; i < _this.logos.length; i++) {
                _this.logos[i].idLogo = i;
            }
            console.log(heroes);
            _this.initBoard();
        }, function (error) { return _this.errorMessage = error; });
    };
    MemoryGame.prototype.initBoard = function () {
        var _this = this;
        this.nbRound = 0;
        this.cards = [];
        var size = 2 * (this.logos.length);
        this.logos.forEach(function (logo) {
            var firstDone = false;
            var secondDone = false;
            while (!firstDone || !secondDone) {
                var index = Math.floor(size * Math.random());
                if (_this.cards[index] == undefined) {
                    _this.cards[index] = { "idLogo": logo.idLogo,
                        "found": false, "image": "none" };
                    if (firstDone) {
                        secondDone = true;
                    }
                    firstDone = true;
                }
                _this.cardsCount++;
            }
        });
        this.canFlip = true;
    };
    MemoryGame.prototype.onFlip = function (card) {
        var _this = this;
        if (this.canFlip && card != this.previousCard && card.found != true) {
            this.nbRound++;
            card.image = "url(" + this.logos[card.idLogo].character.thumbnail.path + '.' + this.logos[card.idLogo].character.thumbnail.extension + ")";
            if (this.previousCard == undefined) {
                this.previousCard = card;
            }
            else {
                this.canFlip = false;
                this.updateBoard = setTimeout(function () {
                    if (card.idLogo == _this.previousCard.idLogo) {
                        card.found = true;
                        _this.previousCard.found = true;
                        var gameOver = true;
                        _this.cards.forEach(function (card) {
                            if (!card.found) {
                                gameOver = false;
                            }
                        });
                        if (gameOver) {
                            _this.previousCard.found = true;
                            _this.showAll = setTimeout(function () {
                                if (_this.nbRound < _this.record) {
                                    _this.textInfo = "Best: " + _this.nbRound / 2 + " rounds";
                                    _this.record = _this.nbRound;
                                }
                                _this.textButton = "Try again";
                                _this.cards.forEach(function (card) {
                                    card.found = false;
                                    card.image = "url(" + _this.logos[card.idLogo].character.thumbnail.path + '.' + _this.logos[card.idLogo].character.thumbnail.extension + ")";
                                    _this.canFlip = false;
                                });
                            }, 1500);
                        }
                    }
                    card.image = "none";
                    _this.previousCard.image = "none";
                    _this.previousCard = undefined;
                    _this.canFlip = true;
                }, 500);
            }
        }
    };
    MemoryGame.prototype.onReset = function () {
        clearTimeout(this.updateBoard);
        clearTimeout(this.showAll);
        this.textButton = "Reset";
        this.getHeroes(this.qty);
        this.previousCard = undefined;
    };
    MemoryGame = __decorate([
        core_1.Component({
            selector: 'memory-game',
            providers: [cards_service_1.CardsService],
            templateUrl: 'marvel-app/pages/memory-game/memory-game.template.html'
        }), 
        __metadata('design:paramtypes', [cards_service_1.CardsService])
    ], MemoryGame);
    return MemoryGame;
}());
exports.MemoryGame = MemoryGame;
