import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { BasePageComponent } from '../base-page';
import { BoardService } from '../../services/board/board.service';
import { ThreadService } from '../../services/thread/thread.service';
import { IBoard } from 'src/app/interfaces/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class PageBoardComponent extends BasePageComponent implements OnInit {
  threadForm: FormGroup;
  board: IBoard;
  thread: any = {};
  index: any = {};

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
    this.bs.getBoard(this.boardAddress).subscribe((res: IBoard) => {
      this.board = res;
    });
  }

  addThread(threadText) {
    this.ts.addThread(threadText, this.board._id);
  }
}
