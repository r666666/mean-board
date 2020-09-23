import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from '../../services/board/board.service';
import { ThreadService } from '../../services/thread/thread.service';
import { BasePageComponent } from '../base-page';
import { IBoard } from '../../interfaces/board';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PageDashboardComponent extends BasePageComponent implements OnInit {
  boards: IBoard[];

  constructor(
    bs: BoardService,
    ts: ThreadService,
    route: ActivatedRoute,
  ) { super(bs, ts, route); }

  ngOnInit() {
    this.bs
      .getBoards()
      .subscribe((data: IBoard[]) => {
        this.boards = data;
    });
  }
}
