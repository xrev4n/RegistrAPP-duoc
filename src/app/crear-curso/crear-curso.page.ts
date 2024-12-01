import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../services/cursos.service'; // Asegúrate de crear este servicio
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.page.html',
  styleUrls: ['./crear-curso.page.scss'],
})
export class CrearCursoPage {

  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursosService,
    private toastController: ToastController
  ) {
    this.courseForm = this.fb.group({
      nombre: ['', Validators.required],
      sigla: ['', Validators.required],
      institucion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      try {
        const response = await this.cursoService.createCourse(courseData);
        await this.showToast('Curso creado exitosamente');
        this.courseForm.reset();
      } catch (error) {
        await this.showToast('Error al crear el curso');
        console.error(error);
      }
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}
