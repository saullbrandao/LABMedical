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
  selectedPatient: Patient = {} as Patient;
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
      id: [null],
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

    if (appointment?.id) {
      this.patientsSubscription = this.patientsService
        .getById(appointment.pacienteId)
        .subscribe((data) => (this.selectedPatient = data));

      this.form.patchValue({
        ...appointment,
      });
    }
  }

  ngOnDestroy(): void {
    this.patientsSubscription.unsubscribe();
  }

  onSubmit() {
    const successMsg = this.form.value.id
      ? 'Consulta atualizada com sucesso!'
      : 'Consulta cadastrada com sucesso!';

    if (this.form.valid) {
      this.appointmentsService.save(this.form.value).subscribe(() => {
        this.toastService.success(successMsg);
        this.router.navigate(['/pacientes', this.selectedPatient.id]);
      });
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });
    }
  }

  onDelete() {
    const id = this.form.get('id')?.value;

    this.appointmentsService.delete(id).subscribe({
      next: () => {
        this.toastService.success('Consulta deletada com sucesso!');
        this.router.navigate(['/pacientes', this.selectedPatient.id]);
      },
    });
  }

  handlePatientSelection(patient: Patient) {
    this.selectedPatient = patient;

    this.form.patchValue({
      pacienteId: patient.id,
    });
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }
}
