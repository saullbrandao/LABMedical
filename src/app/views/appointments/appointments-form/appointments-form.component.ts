import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Patient } from 'src/app/models/patient';
import { DateService } from 'src/app/services/date.service';
import { ToastService } from 'src/app/services/toast.service';
import { PatientsService } from '../../patients/patients.service';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'labmedical-appointments-form',
  templateUrl: './appointments-form.component.html',
  styleUrls: ['./appointments-form.component.scss'],
})
export class AppointmentsFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  patient: Patient = {} as Patient;
  patientsSearchSubscription: Subscription = new Subscription();
  patientsSubscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private patientsService: PatientsService,
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

  ngOnInit(): void {
    const appointment: Appointment = this.route.snapshot.data['appointment'];

    this.patientsSubscription = this.patientsService
      .getById(appointment.pacienteId)
      .subscribe((data) => (this.patient = data));

    this.form.patchValue({
      ...appointment,
    });
  }

  ngOnDestroy(): void {
    this.patientsSearchSubscription.unsubscribe();
    this.patientsSubscription.unsubscribe();
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
    this.patientsSearchSubscription = this.patientsService
      .getByName(term)
      .subscribe((data) => {
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
