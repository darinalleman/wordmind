import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guess } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private baseUrl = "";
  private answer: string = "";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(
    private _http: HttpClient
  ) {}

  startGame() {
    return this._http.get('/api/word/', {responseType: 'text'}).subscribe(answer => {
      this.answer = answer;
    });
  }

  submitGuess(inputGuess: string, answer: string) {
    let guessParam = new Guess();
    guessParam.guess = inputGuess;
    guessParam.answer = answer;
    return this._http.post('/api/guess/', guessParam, this.httpOptions);
  }

  getAnswer() : string {
    return this.answer;
  }
}
