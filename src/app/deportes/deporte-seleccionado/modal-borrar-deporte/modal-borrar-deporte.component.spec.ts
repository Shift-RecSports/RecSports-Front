import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBorrarDeporteComponent } from './modal-borrar-deporte.component';

describe('ModalBorrarDeporteComponent', () => {
  let component: ModalBorrarDeporteComponent;
  let fixture: ComponentFixture<ModalBorrarDeporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBorrarDeporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBorrarDeporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
