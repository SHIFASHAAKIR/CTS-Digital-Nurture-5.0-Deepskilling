import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../services/course';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { EnrollmentService } from '../../services/enrollment';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, CourseSummaryWidget],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  coursesAvailableCount = 0;
  private coursesSub: Subscription | null = null;

  get coursesAvailable(): number {
    return this.coursesAvailableCount;
  }
  get enrolledCount(): number {
    return this.enrollmentService.getEnrolledCourses().length;
  }
  gpa = 3.8;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  // HANDS-ON 2 - Task 1, Step 11: interpolation.
  portalName = 'Student Course Portal';

  // HANDS-ON 2 - Task 1, Step 12: property binding controls [disabled].
  isPortalActive = true;

  // HANDS-ON 2 - Task 1, Step 13: event binding sets this message.
  message = '';

  // HANDS-ON 2 - Task 1, Step 14: two-way binding via [(ngModel)].
  searchTerm = '';

  // Step 71: Update URL query parameters on search input value change
  onSearchChange(): void {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null }
    });
  }

  // HANDS-ON 2 - Task 1, Step 15 (explained in comment below):
  // [property]="value"        -> ONE-WAY binding, data flows component -> DOM only.
  //                               The DOM element cannot push a value back into the
  //                               component property (e.g. [disabled]="!isPortalActive").
  // [(ngModel)]="searchTerm"  -> TWO-WAY binding, data flows DOM <-> component.
  //                               When the user types, the DOM change flows back into
  //                               `searchTerm`; when `searchTerm` changes in code, the
  //                               input's displayed value updates too. It is Angular's
  //                               "banana in a box" shorthand for
  //                               [ngModel]="searchTerm" (ngModelChange)="searchTerm = $event".

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  // HANDS-ON 2 - Task 2, Step 16: ngOnInit fires once, after inputs are set -
  // the right place to fetch/simulate data, unlike the constructor.
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.coursesSub = this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.coursesAvailableCount = courses.length;
      },
      error: (err) => console.error('Home failed to load courses:', err)
    });
  }

  // HANDS-ON 2 - Task 2, Step 17: ngOnDestroy fires when the component is
  // removed from the DOM (e.g. navigating away) - clean up subscriptions/timers here.
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
  }
}
