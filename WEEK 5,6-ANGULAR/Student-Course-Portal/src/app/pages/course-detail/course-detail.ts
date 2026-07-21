import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit, OnDestroy {
  course: Course | undefined;
  enrolledStudents: any[] = [];
  private routeSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    // Step 87: Use switchMap to chain two HTTP calls: load its enrolled students
    // Why switchMap cancels the previous inner Observable:
    // If the route parameter 'id' changes before the previous HTTP requests complete (e.g. user clicks another link quickly),
    // switchMap automatically unsubscribes from (cancels) the previous inner Observables. This prevents older pending requests
    // from finishing out-of-order and corrupting the UI state with stale data.
    this.routeSub = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((courseId) => this.courseService.getCourseById(courseId)),
      tap((course) => this.course = course),
      switchMap((course) => this.enrollmentService.getStudentsByCourse(course.id))
    ).subscribe({
      next: (students) => {
        this.enrolledStudents = students;
      },
      error: (err) => console.error('Error fetching course or students:', err)
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  get isEnrolled(): boolean {
    return this.course ? this.enrollmentService.isEnrolled(this.course.id) : false;
  }

  toggleEnrollment(): void {
    if (!this.course) return;
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
