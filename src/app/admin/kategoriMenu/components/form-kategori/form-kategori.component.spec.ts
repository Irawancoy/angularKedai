import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKategoriComponent } from './form-kategori.component';

describe('FormKategoriComponent', () => {
  let component: FormKategoriComponent;
  let fixture: ComponentFixture<FormKategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
