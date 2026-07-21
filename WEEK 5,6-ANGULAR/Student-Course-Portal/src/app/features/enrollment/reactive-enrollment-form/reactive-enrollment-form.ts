import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  // Step 49: Inject FormBuilder and CourseService in the constructor
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {}

  // Step 49: In ngOnInit, build the form
  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Step 55: Apply the async validator simulateEmailCheck as the third argument of the email FormControl
      studentEmail: this.fb.control(
        '',
        [Validators.required, Validators.email],
        [this.simulateEmailCheck]
      ),
      // Step 53: Apply the custom noCourseCode validator alongside Validators.required
      courseId: [null, [Validators.required, this.noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      // Step 56: Add a FormArray for additionalCourses
      additionalCourses: this.fb.array([])
    });
  }

  // Step 53: Custom validator function to check if the control value starts with 'XX'
  noCourseCode(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (val !== null && val !== undefined) {
      const valStr = String(val).trim();
      // Returns { noCourseCode: true } if the value starts with 'XX' (case-insensitive check for completeness)
      if (valStr.toUpperCase().startsWith('XX')) {
        return { noCourseCode: true };
      }
    }
    return null;
  }

  // Step 55: Async validator simulateEmailCheck that returns a Promise.
  // After 800ms, if the email contains 'test@', return { emailTaken: true }, otherwise return null.
  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const val = control.value;
        if (val && typeof val === 'string' && val.includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
  }

  // Step 57: Implement a typed getter for additionalCourses.
  // Why this getter is better than casting in the template:
  // 1. Compile-Time Type Safety: It allows the TypeScript compiler and Angular's template parser
  //    to know that 'additionalCourses' is a FormArray, checking properties like 'controls' correctly.
  // 2. Avoids Casting in Templates: Writing casts (like '$any' or custom casts) in templates is error-prone,
  //    clutters the HTML, and disables type-checking, which defeats the purpose of TypeScript.
  // 3. Reusability: We can easily access 'additionalCourses' as a FormArray in component methods (like add/remove)
  //    without having to cast it every time.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Step 56: Pushes a new FormControl('', Validators.required) into the FormArray
  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  // Step 56: Removes a FormControl from the FormArray at the specified index
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Helper method to cast AbstractControl to FormControl in templates under strict checking
  getAsFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  // Step 51: On submit, log enrollForm.value and enrollForm.getRawValue()
  onSubmit(): void {
    // Step 52: Difference between value and getRawValue() comment:
    // - enrollForm.value: Excludes the values of any form controls that are disabled.
    // - enrollForm.getRawValue(): Includes the values of all form controls, regardless of whether they are enabled or disabled.
    console.log('enrollForm.value:', this.enrollForm.value);
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());

    if (this.enrollForm.valid) {
      this.submitted = true;

      // Step 81: Wire createCourse to the enrollment form's submit handler to trigger POST
      const newCourseName = `Enrollment: ${this.enrollForm.value.studentName}`;
      const newCourseCode = `EC-${this.enrollForm.value.courseId || '999'}`;
      this.courseService.createCourse({
        name: newCourseName,
        code: newCourseCode,
        credits: 3,
        gradeStatus: 'pending',
        enrolled: true
      }).subscribe({
        next: (created) => {
          console.log('Course created successfully through form POST:', created);
        },
        error: (err) => {
          console.error('Failed to create course through form POST:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.enrollForm.reset({
      studentName: '',
      studentEmail: '',
      courseId: null,
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}
