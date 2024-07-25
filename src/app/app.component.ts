import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    // [Validators.required], [asyncForbiddenModelValidator]
    model: [
      '',
      {
        validators: [Validators.required],
        asyncValidators: [asyncForbiddenModelValidator],
      },
    ],
    license: [
      '',
      {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]{4}[A-Z]{3}$'),
          forbiddenLicenseValidator(['CNP', 'PGC']),
        ],
      }
    ],
  });

  onSubmit(): void {
    console.log('Form Submitted: ', this.form.value);
  }
}

export const forbiddenLicenseValidator = (forbiddenLetters: string[]): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const licenseLetters = control.value.slice(-3);

    if (forbiddenLetters.includes(licenseLetters)) {
      return {
        forbiddenLicense: 'La matrícula no es válida',
      };
    }
    return null;
  };
};

export const asyncForbiddenModelValidator: AsyncValidatorFn = (
  control: AbstractControl,
): Observable<ValidationErrors | null> => {
  const forbiddenModels = ['Volvo'];
  return of(control.value).pipe(
    delay(1500),
    map((value) => {
      if (forbiddenModels.includes(value)) {
        return {
          forbiddenModel: 'El modelo no es válido',
        };
      }
      return null;
    }),
  );
};
