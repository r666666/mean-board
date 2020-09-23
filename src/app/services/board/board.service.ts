import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  uri: string;

  constructor(
    private http: HttpClient
  ) {
    this.uri = environment.backendUrl + '/board';
  }

  getBoards() {
    return this.http.get(`${this.uri}`);
  }

  getBoard(id: string) {
    return this.http.get(`${this.uri}/get/${id}`);
  }

  updateBoard(id: string, threadIndex: string) {
    this.http.post(`${this.uri}/update/${id}`, {index: threadIndex})
      .subscribe(res => console.log('Update board: ' + id + ' with thread: ' + threadIndex));
  }

  addBoard(name: string, address: string, threadList: string) {
    const board = { name, address, threadList };
    this.http.post(`${this.uri}/add`, board)
      .subscribe(res => console.log('Update' + board.name));
  }
}
