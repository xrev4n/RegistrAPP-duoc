import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosMatriculadosPage } from './cursos-matriculados.page';

describe('CursosMatriculadosPage', () => {
  let component: CursosMatriculadosPage;
  let fixture: ComponentFixture<CursosMatriculadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosMatriculadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
