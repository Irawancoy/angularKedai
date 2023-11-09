import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTentangKamiComponent } from './form-tentang-kami.component';

describe('FormTentangKamiComponent', () => {
  let component: FormTentangKamiComponent;
  let fixture: ComponentFixture<FormTentangKamiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTentangKamiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTentangKamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
