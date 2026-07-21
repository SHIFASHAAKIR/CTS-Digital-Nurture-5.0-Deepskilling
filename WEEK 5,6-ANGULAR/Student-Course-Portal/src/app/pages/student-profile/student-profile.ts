import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { Notification as NotificationComponent } from '../../components/notification/notification';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  studentName = 'SHIFA A';
  studentId = 'DN5-2026-020';
  gpa = 8.78;

  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }
}
