import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasiComponent } from './reservasi.component';

describe('ReservasiComponent', () => {
  let component: ReservasiComponent;
  let fixture: ComponentFixture<ReservasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
