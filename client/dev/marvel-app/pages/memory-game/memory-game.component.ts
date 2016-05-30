import {Component} from "@angular/core";
import {Logo} from "../../modules/memory-game/logo.interface";
import {Card} from "../../modules/memory-game/card.interface";
import {CardsService} from "../../services/cards-service/cards-service";

@Component({
  selector: 'memory-game',
  providers: [CardsService],
  templateUrl:'marvel-app/pages/memory-game/memory-game.template.html'
})


export class MemoryGame {
  private title:string = 'Find the heroes';
  private textInfo: string = 'Flip the cards';
  private textButton: string = 'Reset';
  private logos: Logo[];
  private cards: Card[];
  private previousCard: Card;
  private canFlip: boolean = false;
  private updateBoard;
  private showAll;
  private record: number = Infinity;
  private nbRound: number;
  private cardsCount:number = 0;
  private page = 'memory-game';
  private errorMessage:string;
  private qty:number = 25;

  constructor(private _cardsService:CardsService){

  }

  ngOnInit() {
    this.getHeroes(this.qty);
  }
  getHeroes(qty) {
    this._cardsService.getHeroes(qty)
      .subscribe(heroes => {
      this.logos = heroes;
        for(var i = 0; i < this.logos.length;i++){
          this.logos[i].idLogo = i;
        }
      console.log(heroes);
      this.initBoard();
    },
        error => this.errorMessage = <any>error
      );
  }

  initBoard() {
    this.nbRound = 0;
    this.cards = [];
    var size = 2*(this.logos.length);
    this.logos.forEach(logo => {
      var firstDone = false;
      var secondDone = false;
      while (!firstDone || !secondDone) {

        var index = Math.floor(size * Math.random());
        if (this.cards[index] == undefined) {
          this.cards[index] = {"idLogo" : logo.idLogo,
            "found": false, "image": "none"};
          if (firstDone) {
            secondDone = true;
          }
          firstDone = true;
        }
        this.cardsCount++;
      }
    });
    this.canFlip = true;
  }

  onFlip(card: Card) {
    if (this.canFlip && card != this.previousCard && card.found != true) {
      this.nbRound++;
      card.image = "url(" + this.logos[card.idLogo].character.thumbnail.path + '.' + this.logos[card.idLogo].character.thumbnail.extension + ")";
      if (this.previousCard == undefined) {
        this.previousCard = card;
      }
      else {
        this.canFlip = false;
        this.updateBoard = setTimeout(() => {
          if (card.idLogo == this.previousCard.idLogo) {
            card.found = true;
            this.previousCard.found = true;

            var gameOver = true;
            this.cards.forEach(card => {
              if (!card.found) { gameOver = false; }
            });
            if (gameOver) {

              this.previousCard.found = true;
              this.showAll = setTimeout(() => {
                if (this.nbRound < this.record) {
                  this.textInfo = "Best: " + this.nbRound / 2 + " rounds";
                  this.record = this.nbRound;
                }
                this.textButton = "Try again";
                this.cards.forEach((card) => {
                  card.found = false;
                  card.image = "url(" + this.logos[card.idLogo].character.thumbnail.path + '.' + this.logos[card.idLogo].character.thumbnail.extension + ")";
                  this.canFlip = false;
                });
              }, 1500);

            }
          }
          card.image = "none";
          this.previousCard.image = "none";
          this.previousCard = undefined;
          this.canFlip = true;
        }, 500);
      }
    }
  }

  onReset() {
    clearTimeout(this.updateBoard);
    clearTimeout(this.showAll);
    this.textButton = "Reset";
    this.getHeroes(this.qty);
    this.previousCard = undefined;

  }
}

