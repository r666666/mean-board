import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  uri: string;

  constructor(
    private http: HttpClient
  ) {
    this.uri = 'http://localhost:4000/board';
  }

  getBoards() {
    return this.http.get(`${this.uri}`);
  }

  getBoard(id) {
    return this.http.get(`${this.uri}/get/${id}`);
  }

  updateBoard(id, threadIndex) {
    this.http.post(`${this.uri}/update/${id}`, {index: threadIndex})
      .subscribe(res => console.log('Update board: ' + id + ' with thread: ' + threadIndex));
  }

  addBoard(name, address, threadList) {
    const board = { name, address, threadList };
    this.http.post(`${this.uri}/add`, board)
      .subscribe(res => console.log('Update' + board.name));
  }
}
