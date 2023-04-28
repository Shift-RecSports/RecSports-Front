import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDeporteComponent } from './nuevo-deporte.component';

describe('NuevoDeporteComponent', () => {
  let component: NuevoDeporteComponent;
  let fixture: ComponentFixture<NuevoDeporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoDeporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoDeporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
