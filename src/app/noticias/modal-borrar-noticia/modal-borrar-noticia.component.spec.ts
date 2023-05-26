import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBorrarNoticiaComponent } from './modal-borrar-noticia.component';

describe('ModalBorrarNoticiaComponent', () => {
  let component: ModalBorrarNoticiaComponent;
  let fixture: ComponentFixture<ModalBorrarNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBorrarNoticiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBorrarNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
