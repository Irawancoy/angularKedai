import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRuanganComponent } from './detail-ruangan.component';

describe('DetailRuanganComponent', () => {
  let component: DetailRuanganComponent;
  let fixture: ComponentFixture<DetailRuanganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRuanganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRuanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
