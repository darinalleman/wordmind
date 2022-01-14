import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guess } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private base: String = ""

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(
    private _http: HttpClient
  ) { }

  startGame() {
    return this._http.get('/api/word/', {responseType: 'text'});
  }

  submitGuess(inputGuess: string) : Observable<number> {
    let guessParam = new Guess();
    guessParam.guess = inputGuess;
    return this._http.post<number>('/api/guess/', guessParam, this.httpOptions);
  }
}
