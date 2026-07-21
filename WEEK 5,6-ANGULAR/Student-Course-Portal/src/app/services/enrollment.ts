import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseService } from './course';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];
  private allCourses: Course[] = [];
  private apiUrl = 'http://localhost:3000/enrollments';

  constructor(
    private http: HttpClient,
    private courseService: CourseService
  ) {
    this.loadAllCourses();
    this.loadEnrollments();
  }

  private loadAllCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
      },
      error: (err) => console.error('Failed to load courses in EnrollmentService:', err)
    });
  }

  private loadEnrollments(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.enrolledCourseIds = data.map((item) => item.courseId);
      },
      error: (err) => console.error('Failed to load enrollments:', err)
    });
  }

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
      this.http.post(this.apiUrl, { id: courseId, courseId, studentName: 'GUNAL s' }).subscribe({
        next: () => console.log(`Enrolled course ${courseId} on server`),
        error: (err) => console.error('Enrollment post call failed:', err)
      });
    }
  }

  unenroll(courseId: number): void {
    if (this.isEnrolled(courseId)) {
      this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
      this.http.delete(`${this.apiUrl}/${courseId}`).subscribe({
        next: () => console.log(`Unenrolled course ${courseId} on server`),
        error: (err) => console.error('Enrollment delete call failed:', err)
      });
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.allCourses.filter((course) => this.enrolledCourseIds.includes(course.id));
  }

  // Step 87: Use switchMap to chain two HTTP calls: load enrolled students
  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?courseId=${courseId}`);
  }
}
