import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsedurComponent } from './prosedur.component';

describe('ProsedurComponent', () => {
  let component: ProsedurComponent;
  let fixture: ComponentFixture<ProsedurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsedurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsedurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
