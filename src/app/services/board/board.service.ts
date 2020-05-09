import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  uri = 'http://localhost:4000/board';

  constructor(private http: HttpClient) { }

  getBoards() {
    return this.http.get(`${this.uri}`);
  }

  addBoard(name, address, threadList) {
    const board = { name, address, threadList };
    this.http.post(`${this.uri}/add`, board)
      .subscribe(res => console.log('Add ' + board.name));
  }
}
