import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeporteSeleccionadoComponent } from './deporte-seleccionado.component';

describe('DeporteSeleccionadoComponent', () => {
  let component: DeporteSeleccionadoComponent;
  let fixture: ComponentFixture<DeporteSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeporteSeleccionadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeporteSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
