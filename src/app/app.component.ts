import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    model: [''],
    license: ['']
  });

  onSubmit(): void {
    console.log('Form Submitted: ', this.form.value);
  }
}