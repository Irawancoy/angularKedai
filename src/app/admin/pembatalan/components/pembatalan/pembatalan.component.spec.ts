import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PembatalanComponent } from './pembatalan.component';

describe('PembatalanComponent', () => {
  let component: PembatalanComponent;
  let fixture: ComponentFixture<PembatalanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PembatalanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PembatalanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
