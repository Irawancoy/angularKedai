import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMenuComponent } from './detail-menu.component';

describe('DetailMenuComponent', () => {
  let component: DetailMenuComponent;
  let fixture: ComponentFixture<DetailMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
