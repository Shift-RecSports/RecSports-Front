import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeportesFavComponent } from './deportes-fav.component';

describe('DeportesFavComponent', () => {
  let component: DeportesFavComponent;
  let fixture: ComponentFixture<DeportesFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeportesFavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeportesFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
