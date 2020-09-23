import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: PageBoardComponent;
  let fixture: ComponentFixture<PageBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
