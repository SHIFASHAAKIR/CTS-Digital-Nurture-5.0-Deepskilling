import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentForm } from './enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './reactive-enrollment-form/reactive-enrollment-form';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: EnrollmentForm },
  {
    path: 'reactive',
    component: ReactiveEnrollmentForm,
    canDeactivate: [unsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
