import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Pacient } from 'src/app/shared/models/pacient';
import { DateService } from 'src/app/shared/services/date.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PacientsService } from '../../pacients/pacients.service';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'labmedical-appointments-form',
  templateUrl: './appointments-form.component.html',
  styleUrls: ['./appointments-form.component.scss'],
})
export class AppointmentsFormComponent {
  form!: FormGroup;
  patient: Pacient = {} as Pacient;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private patientsService: PacientsService,
    private appointmentsService: AppointmentsService,
    private toastService: ToastService,
    private dateService: DateService
  ) {
    this.form = this.formBuilder.group({
      pacienteId: [null, [Validators.required]],
      motivo: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      data: [this.dateService.getCurrentDate(), Validators.required],
      horario: [this.dateService.getCurrentTime(), Validators.required],
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(1024),
        ],
      ],
      medicacao: [''],
      dosagemEPrecaucoes: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(256),
        ],
      ],
    });
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.valid) {
      this.appointmentsService.create(this.form.value).subscribe({
        next: () => {
          this.toastService.success('Consulta criada com sucesso!');
          this.router.navigate(['/']);
        },
        error: () => this.toastService.error('Erro ao salvar consulta!'),
      });
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });
    }
  }

  searchPatient(term: string) {
    this.patientsService.getByName(term).subscribe((data) => {
      this.patient = data[0];
      this.form.patchValue({
        pacienteId: this.patient.id,
      });
    });
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }
}
