import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import * as CourseActions from './course.actions';

// Step 94: Define state interface and reducer with on() handlers
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null,
  })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
