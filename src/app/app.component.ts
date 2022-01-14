import { Component, HostListener, Input } from '@angular/core';
import { WordService } from './word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wordmind';
  constructor(private _wordService: WordService) {}

  newGame() {
    this._wordService.startGame().subscribe(word => {
      console.log(word);
    })
  }
}
