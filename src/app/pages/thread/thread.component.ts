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
  threadForm: FormGroup;

  constructor(
    bs: BoardService,
    ts: ThreadService,
    route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(bs, ts, route);

    this.threadForm = this.fb.group({
      threadText: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.ts.getThread(this.currentThreadId).subscribe((res: IThread) => {
      this.thread = res;
    });
  }

  postMessage(threadText) {
    this.ts.postMessage(threadText, this.currentThreadId);
  }
}
