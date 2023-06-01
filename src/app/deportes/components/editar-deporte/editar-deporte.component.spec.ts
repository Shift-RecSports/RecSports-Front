import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDeporteComponent } from './editar-deporte.component';

describe('EditarDeporteComponent', () => {
  let component: EditarDeporteComponent;
  let fixture: ComponentFixture<EditarDeporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDeporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDeporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
