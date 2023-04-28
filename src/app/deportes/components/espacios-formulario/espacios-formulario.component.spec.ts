import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosFormularioComponent } from './espacios-formulario.component';

describe('EspaciosFormularioComponent', () => {
  let component: EspaciosFormularioComponent;
  let fixture: ComponentFixture<EspaciosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaciosFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaciosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
