import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exam } from 'src/app/models/exam';
import { Patient } from 'src/app/models/pacient';
import { DateService } from 'src/app/services/date.service';
import { ToastService } from 'src/app/services/toast.service';
import { URL_REGEX } from 'src/app/utils/constants';
import { PatientsService } from '../../patients/patients.service';
import { ExamsService } from '../exams.service';

@Component({
  selector: 'labmedical-exams',
  templateUrl: './exams-form.component.html',
  styleUrls: ['./exams-form.component.scss'],
})
export class ExamsFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  patient: Patient = {} as Patient;
  patientsSubscription: Subscription = new Subscription();
  patientsSearchSubscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    private examsService: ExamsService,
    private toastService: ToastService,
    private dateService: DateService
  ) {
    this.form = this.formBuilder.group({
      pacienteId: [null, [Validators.required]],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      data: [this.dateService.getCurrentDate(), Validators.required],
      horario: [this.dateService.getCurrentTime(), Validators.required],
      tipo: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
        ],
      ],
      laboratorio: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
        ],
      ],
      url: ['', [Validators.pattern(URL_REGEX)]],
      resultado: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(1024),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const exam: Exam = this.route.snapshot.data['exam'];

    this.patientsSubscription = this.patientsService
      .getById(exam.pacienteId)
      .subscribe((data) => (this.patient = data));

    this.form.patchValue({
      ...exam,
    });
  }

  ngOnDestroy(): void {
    this.patientsSubscription.unsubscribe();
    this.patientsSearchSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.examsService.create(this.form.value).subscribe({
        next: () => {
          this.toastService.success('Exame criado com sucesso!');
          this.router.navigate(['/']);
        },
        error: () => this.toastService.error('Erro ao salvar exame!'),
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
