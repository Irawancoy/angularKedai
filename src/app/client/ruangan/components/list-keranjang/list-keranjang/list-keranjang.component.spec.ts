import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKeranjangComponent } from './list-keranjang.component';

describe('ListKeranjangComponent', () => {
  let component: ListKeranjangComponent;
  let fixture: ComponentFixture<ListKeranjangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKeranjangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKeranjangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
