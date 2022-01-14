import { Component, HostListener, OnInit } from '@angular/core';
import { WordService } from '../word.service';

@Component({
  selector: 'guesses',
  templateUrl: './guesses.component.html',
  styleUrls: ['./guesses.component.scss']
})
export class GuessesComponent implements OnInit {
  public currentGuess: string = "";
  public numbers = Array(6).fill(null, 0, 6);

  constructor(private _wordService: WordService) { }

  ngOnInit(): void {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (/^[a-z]$/i.test(event.key) && this.currentGuess.length <= 5) {
      this.currentGuess = this.currentGuess.concat(event.key);
    }
    if (event.key === "Backspace") {
      this.currentGuess = this.currentGuess.slice(0, this.currentGuess.length - 1);
    }
    if (event.key === "Enter") {
      this._wordService.submitGuess(this.currentGuess).subscribe(res => {
          console.log(res);
        })
    }
  }

}
