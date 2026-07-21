import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

// Step 99: Define enrollment selectors
export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state: EnrollmentState) => state.enrolledCourseIds
);

// Cross-slice selector (combining course and enrollment state)
// Comment: Cross-slice selectors are a powerful NgRx pattern - use createSelector with multiple input selectors
// to derive joined data without duplicating state.
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter((course) => enrolledIds.includes(course.id))
);
