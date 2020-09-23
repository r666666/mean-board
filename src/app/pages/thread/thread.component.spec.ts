import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageThreadComponent } from './thread.component';

describe('PageThreadComponent', () => {
  let component: PageThreadComponent;
  let fixture: ComponentFixture<PageThreadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
