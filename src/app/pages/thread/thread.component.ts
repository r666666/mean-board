import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from '../../services/board/board.service';
import { ThreadService } from '../../services/thread/thread.service';
import { BasePageComponent } from '../base-page';
import { IThread } from '../../interfaces/thread';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class PageThreadComponent extends BasePageComponent implements OnInit {
  thread: IThread;
  threadData: any;
  postText: any;
  reply: number;

  constructor(
    bs: BoardService,
    ts: ThreadService,
    route: ActivatedRoute,
  ) {
    super(bs, ts, route);
  }

  ngOnInit() {
    this.ts.getThread(this.currentThreadId).subscribe((res: IThread) => {
      this.thread = res;
      this.threadData = this.thread.threadData;
    });
  }

  postMessage(data: any) {
    if (data.replies.length > 0) {
      this.modifyData(data.replies, data.index);
      this.ts.updateThreadData(this.currentThreadId, this.threadData).then(
        res => this.ts.postMessage(this.currentThreadId, data.postData, data.index, this.boardAddress)
      );
    } else {
      this.ts.postMessage(this.currentThreadId, data.postData, data.index, this.boardAddress);
    }
  }

  setReply(index: number) {
    this.reply = null;

    // trigger ngOnChanges if reply is already selected
    setTimeout(() => {
      this.reply = index;
    });
  }

  modifyData(replyList: any, threadIndex: string) {
    replyList.forEach(reply => {
      const index = this.threadData.findIndex((item => item.index.toString() === reply));

      // prevent index duplication
      const indexRepeat = this.threadData[index].replies.filter((v) => (v === threadIndex)).length;

      if (index >= 0 && reply && ( indexRepeat === 0)) {
        this.threadData[index].replies.push(threadIndex);
      }
    });
  }
}
