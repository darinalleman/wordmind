import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WordService } from '../word.service';

@Component({
  selector: 'guesses',
  templateUrl: './guesses.component.html',
  styleUrls: ['./guesses.component.scss']
})
export class GuessesComponent implements OnInit, OnChanges {
  public currentGuess: string = "";
  public numbers = Array(5).fill(null);
  public previousGuesses: string[] = Array(5).fill("");
  public previousResults: string[] = [];
  public currentGuessCount = 0;
  public gameWon = false;

  @Input() newGame: boolean = false;
  constructor(private _wordService: WordService) { }

  ngOnInit(): void {
    this._wordService.startGame();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newGame'].previousValue != changes['newGame'].currentValue) {
      this.previousGuesses = Array(5).fill("");
      this.previousResults = [];
      this.currentGuessCount = 0;
      this.currentGuess = "";
      this.gameWon = false;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.gameWon) {
      if (/^[a-z]$/i.test(event.key) && this.currentGuess.length < 5) this.letter(event.key);
      if (event.key === "Backspace") this.backspace();
      if (event.key === "Enter") this.enter();
    }
  }

  onScreenKeyboardEvent(event: string) {
    if (!this.gameWon) {
      if (event === "{bksp}") this.backspace();
      else if (event === "{enter}") this.enter();
      else if (/^[a-z]$/i.test(event) && this.currentGuess.length < 5) this.letter(event);
    }
  }

  letter(letter: string) {
    this.currentGuess = this.currentGuess.concat(letter.toUpperCase());
  }
  backspace() {
    this.currentGuess = this.currentGuess.slice(0, this.currentGuess.length - 1);
  }
  enter() {
    if (this.currentGuess.length == 5) {
      this._wordService.submitGuess(this.currentGuess, this._wordService.getAnswer()).subscribe(res => {
        this.previousResults.push(res.toString());
        this.previousGuesses[this.currentGuessCount] = this.currentGuess;
        this.currentGuessCount++;
        this.currentGuess = "";
        if (res.toString() == "33333") { //all letters are correct
          this.gameWon = true;
        }
      });
    }
  }
  
  getStatusClass(result: string) {
    if (result === "3") {
      return "correct";
    }
    else if (result === "2") {
      return "half";
    }
    else if (result === "1") {
      return "incorrect";
    }
    return "incorrect";
  }

}
