import { createReducer, on } from '@ngrx/store';
import * as EnrollmentActions from './enrollment.actions';

// Step 99: Define enrollment reducer managing enrolledCourseIds
export interface EnrollmentState {
  enrolledCourseIds: number[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: [],
};

export const enrollmentReducer = createReducer(
  initialEnrollmentState,
  on(EnrollmentActions.enrollInCourse, (state, { courseId }) => {
    if (state.enrolledCourseIds.includes(courseId)) {
      return state;
    }
    return {
      ...state,
      enrolledCourseIds: [...state.enrolledCourseIds, courseId],
    };
  }),
  on(EnrollmentActions.unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId),
  })),
  on(EnrollmentActions.setEnrolledCourses, (state, { courseIds }) => ({
    ...state,
    enrolledCourseIds: [...courseIds],
  }))
);
