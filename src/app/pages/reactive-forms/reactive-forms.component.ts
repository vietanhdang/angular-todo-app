import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  agreement: boolean;
  gender: string;
  country: string;
  hobbies: string[];
}

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css'],
})
export class ReactiveFormsComponent implements OnInit {
  // Simple Form
  simpleForm!: FormGroup;

  // Registration Form with validation
  registrationForm!: FormGroup;

  // Dynamic Form Array
  dynamicForm!: FormGroup;

  // Submitted data
  submittedData: any = null;
  registrationData: any = null;

  countries = ['Vietnam', 'USA', 'UK', 'Japan', 'Korea', 'Thailand'];
  hobbiesList = ['Reading', 'Gaming', 'Sports', 'Music', 'Coding', 'Travel'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForms();
  }

  private initializeForms() {
    // 1. Simple Form - Manual way
    this.simpleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    // 2. Registration Form - FormBuilder way (recommended)
    this.registrationForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-zA-Z0-9_]+$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.minLength(8), this.strongPasswordValidator],
        ],
        confirmPassword: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
        gender: ['male', Validators.required],
        country: ['Vietnam', Validators.required],
        hobbies: [[]],
        agreement: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );

    // 3. Dynamic Form with FormArray
    this.dynamicForm = this.fb.group({
      skills: this.fb.array([this.createSkillGroup()]),
    });

    // Subscribe to value changes
    this.registrationForm.get('password')?.valueChanges.subscribe((value) => {
      console.log('Password changed:', value);
      // Trigger confirmPassword validation when password changes
      this.registrationForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  // Custom Validators
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecial;
    return valid ? null : { strongPassword: { value } };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // FormArray methods
  get skills() {
    return this.dynamicForm.get('skills') as any;
  }

  createSkillGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['beginner', Validators.required],
    });
  }

  addSkill() {
    this.skills.push(this.createSkillGroup());
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Form submission methods
  onSimpleSubmit() {
    if (this.simpleForm.valid) {
      this.submittedData = this.simpleForm.value;
      console.log('Simple Form Submitted:', this.submittedData);
    } else {
      this.markFormGroupTouched(this.simpleForm);
    }
  }

  onRegistrationSubmit() {
    if (this.registrationForm.valid) {
      this.registrationData = this.registrationForm.value;
      console.log('Registration Form Submitted:', this.registrationData);
    } else {
      this.markFormGroupTouched(this.registrationForm);
    }
  }

  onDynamicSubmit() {
    console.log('Dynamic Form:', this.dynamicForm.value);
  }

  // Utility methods
  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  resetForm(form: FormGroup) {
    form.reset();
  }

  // Getters for template
  get username() {
    return this.registrationForm.get('username');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
  get age() {
    return this.registrationForm.get('age');
  }
  get agreement() {
    return this.registrationForm.get('agreement');
  }

  // Toggle hobby selection
  toggleHobby(hobby: string) {
    const hobbies = this.registrationForm.get('hobbies')?.value || [];
    const index = hobbies.indexOf(hobby);

    if (index > -1) {
      hobbies.splice(index, 1);
    } else {
      hobbies.push(hobby);
    }

    this.registrationForm.patchValue({ hobbies });
  }

  isHobbySelected(hobby: string): boolean {
    const hobbies = this.registrationForm.get('hobbies')?.value || [];
    return hobbies.includes(hobby);
  }

  // Form info methods
  getPasswordStrength(): string {
    const password = this.password?.value || '';
    if (password.length === 0) return '';
    if (password.length < 8) return 'weak';

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (strength <= 2) return 'weak';
    if (strength === 3) return 'medium';
    return 'strong';
  }
}
