import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getThread(id: string) {
    return this.http.get(`${this.uri}/get/${id}`);
  }

  addThread(boardAddress: string, data: FormData, threadId) {
    let headerParam = new HttpHeaders();
    headerParam = headerParam.set('id', threadId).set('board', boardAddress);

    return new Promise((resolve, reject) => {
      this.http.post(`${this.uri}/add`, data, { headers: headerParam })
        .subscribe(res => {
          console.log('Add thread: ' + threadId);

          this.bs.updateBoard(boardAddress, threadId);

          resolve();
        });
    });
  }

  updateThreadData(threadId: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.uri}/update/${threadId}`, data)
        .subscribe(res => {
          console.log('Update thread: ' + threadId);

          resolve();
        });
    });
  }

  postMessage(threadId: string, data: FormData, postId: string, boardAddress: string) {
    let headerParam = new HttpHeaders();
    headerParam = headerParam.set('id', threadId).set('board', boardAddress);

    this.http.post(`${this.uri}/post/${threadId}`, data, { headers: headerParam }) 
      .subscribe(res => {
        console.log('Add post: ' + postId);
      });
  }
}
