import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit, OnDestroy {
  searchTerm = '';
  selectedCourseId: number | null = null;
  private searchSubject = new BehaviorSubject<string>('');
  private querySub: Subscription | null = null;

  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  filteredCourses$: Observable<Course[]>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);

    this.filteredCourses$ = combineLatest([
      this.courses$,
      this.searchSubject.asObservable()
    ]).pipe(
      map(([courses, term]) => {
        if (!term.trim()) {
          return courses;
        }
        const lowerTerm = term.toLowerCase().trim();
        return courses.filter(
          (c) =>
            c.name.toLowerCase().includes(lowerTerm) ||
            c.code.toLowerCase().includes(lowerTerm)
        );
      })
    );
  }

  ngOnInit(): void {
    // Step 96: Dispatch the load action in ngOnInit
    this.store.dispatch(loadCourses());

    // Sync route parameters to reactive search filter subject
    this.querySub = this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search') || '';
      this.searchSubject.next(this.searchTerm);
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  onSearchChange(): void {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }

  onViewDetails(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
