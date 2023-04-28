import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservacionComponent } from './modal-reservacion.component';

describe('ModalReservacionComponent', () => {
  let component: ModalReservacionComponent;
  let fixture: ComponentFixture<ModalReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReservacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
