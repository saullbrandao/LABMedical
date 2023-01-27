import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { hideModal } from 'src/app/utils/bootstrap-modal';
import { matchValidator } from 'src/app/utils/match-validator';

@Component({
  selector: 'labmedical-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  @ViewChild('registerModal', { static: false })
  registerModal!: ElementRef<HTMLElement>;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(64),
          ],
        ],
      },
      {
        validators: [matchValidator('password', 'confirmPassword')],
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.toastService.success('Conta criada com sucesso!');
          localStorage.setItem('token', JSON.stringify(res));
          hideModal(this.registerModal.nativeElement);
          this.router.navigate(['/']);
        },
        error: () =>
          this.toastService.error(
            'Erro ao cadastrar novo usuário. Tente novamente.'
          ),
      });
    }
  }

  isInvalid(input: string) {
    return (
      this.registerForm.get(input)?.invalid &&
      this.registerForm.get(input)?.touched
    );
  }
}
