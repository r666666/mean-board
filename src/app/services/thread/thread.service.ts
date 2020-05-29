import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BoardService } from '../board/board.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  uri = 'http://localhost:4000/thread';

  constructor(
    private http: HttpClient,
    private bs: BoardService
  ) { }

  getGlobalIndex() {
    return this.http.get(`${this.uri}/getGlobalIndex`);
  }

  getThread(id) {
    return this.http.get(`${this.uri}/get/${id}`);
  }

  addThread(text, id) {
    this.getGlobalIndex().subscribe(index => {
      const thread = {
        _id: index,
        threadData: {
          'index': index,
          'text': text
        }
      };
      this.http.post(`${this.uri}/add`, thread)
        .subscribe(res => console.log('Add thread: ' + index));

      this.bs.updateBoard(id, index);
    });
  }

  postMessage(id, text, threadData) {
    this.getGlobalIndex().subscribe(index => {
      const thread = {
        'index': index,
        'text': text
      };
      threadData.push(thread);

      this.http.post(`${this.uri}/post/${id}`, { 'threadData': threadData})
        .subscribe(res => console.log('Add post: ' + index));
    });
  }
}
