import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeranjangComponent } from './keranjang.component';

describe('KeranjangComponent', () => {
  let component: KeranjangComponent;
  let fixture: ComponentFixture<KeranjangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeranjangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeranjangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
