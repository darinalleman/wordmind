import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WordService } from '../word.service';

@Component({
  selector: 'guesses',
  templateUrl: './guesses.component.html',
  styleUrls: ['./guesses.component.scss']
})
export class GuessesComponent implements OnInit, OnChanges {
  public currentGuess: string = "";
  public numbers = Array(5).fill(null, 0, 6);
  public previousGuesses: string[] = [];
  public previousResults: string[] = [];

  @Input() newGame: boolean = false;
  constructor(private _wordService: WordService) { }

  ngOnInit(): void {
    this._wordService.startGame();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newGame'].previousValue != changes['newGame'].currentValue) {
      this.previousGuesses = [];
      this.previousResults = [];
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (/^[a-z]$/i.test(event.key) && this.currentGuess.length <= 5) this.letter(event.key);
    if (event.key === "Backspace") this.backspace();
    if (event.key === "Enter") this.enter();
  }

  onScreenKeyboardEvent(event: string) {
    if (event === "{bksp}") this.backspace();
    else if (event === "{enter}") this.enter();
    else if (/^[a-z]$/i.test(event) && this.currentGuess.length <= 5) this.letter(event);
  }

  letter(letter: string) {
    this.currentGuess = this.currentGuess.concat(letter);
  }
  backspace() {
    this.currentGuess = this.currentGuess.slice(0, this.currentGuess.length - 1);
  }
  enter() {
    this._wordService.submitGuess(this.currentGuess, this._wordService.getAnswer()).subscribe(res => {
      this.previousResults.push(res.toString());
      this.previousGuesses.push(this.currentGuess);
      this.currentGuess = "";
    });
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
