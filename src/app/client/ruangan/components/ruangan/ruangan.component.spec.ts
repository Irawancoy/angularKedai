import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanganComponent } from './ruangan.component';

describe('RuanganComponent', () => {
  let component: RuanganComponent;
  let fixture: ComponentFixture<RuanganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
