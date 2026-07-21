import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  enrollForm?: { dirty: boolean };
  submitted?: boolean;
}

// Step 77: Implement canDeactivate to check if the form is dirty (enrollForm.dirty).
// If dirty (and not yet submitted), use window.confirm('You have unsaved changes. Leave?')
export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (component && component.enrollForm && component.enrollForm.dirty && !component.submitted) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
