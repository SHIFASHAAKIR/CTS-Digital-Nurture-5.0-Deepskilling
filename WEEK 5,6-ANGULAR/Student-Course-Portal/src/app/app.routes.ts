import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  // Step 72: Nested routes under /courses layout component
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetail }
    ]
  },
  // Step 76: Protect profile route using authGuard
  { path: 'profile', component: StudentProfile, canActivate: [authGuard] },
  // Step 73: Lazy load enrollment module, protected by authGuard (Step 76)
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/enrollment/enrollment-module').then((m) => m.EnrollmentModule),
  },
  // Step 68: NotFoundComponent wildcard match at the end
  { path: '**', component: NotFound },
];

