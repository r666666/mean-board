import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

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
  postForm: FormGroup;
  postText: any;

  constructor(
    bs: BoardService,
    ts: ThreadService,
    route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(bs, ts, route);

    this.postForm = this.fb.group({
      postText: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.ts.getThread(this.currentThreadId).subscribe((res: IThread) => {
      this.thread = res;
      this.threadData = this.thread.threadData;
    });
  }

  postMessage(text) {
    this.ts.postMessage(this.currentThreadId, text, this.threadData);
  }

  createReply(index: number) {
    if (this.postText) {
      this.postText += '>>' + index + '>>\n';
    } else {
      this.postText = '>>' + index + '>>\n';
    }
  }
}
