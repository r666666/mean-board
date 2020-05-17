import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from '../../services/board/board.service';
import { ThreadService } from '../../services/thread/thread.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {
  boardAddress?: string;
  currentThreadId?: string;

  constructor(
    public bs: BoardService,
    public ts: ThreadService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.boardAddress = params.boardAddress;
      this.currentThreadId = params.threadId;
    });
  }

  ngOnInit() { }
}
