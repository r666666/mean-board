import { Component, OnInit } from '@angular/core';

import { BoardService } from '../../services/board/board.service';
import { BasePageComponent } from '../base-page';
import { IBoard } from '../../interfaces/board';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PageDashboardComponent extends BasePageComponent implements OnInit {

  boards: IBoard[];

  constructor( bs: BoardService ) { super(bs); }

  ngOnInit() {
    this.bs
      .getBoards()
      .subscribe((data: IBoard[]) => {
        this.boards = data;
    });
  }
}
