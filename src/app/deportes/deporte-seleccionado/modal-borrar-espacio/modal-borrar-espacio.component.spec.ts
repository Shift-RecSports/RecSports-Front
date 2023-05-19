import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBorrarEspacioComponent } from './modal-borrar-espacio.component';

describe('ModalBorrarEspacioComponent', () => {
  let component: ModalBorrarEspacioComponent;
  let fixture: ComponentFixture<ModalBorrarEspacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBorrarEspacioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBorrarEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
