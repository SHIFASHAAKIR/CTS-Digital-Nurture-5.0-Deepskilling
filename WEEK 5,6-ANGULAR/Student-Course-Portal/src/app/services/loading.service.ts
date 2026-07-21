import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private activeRequests = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  // Add delay(0) to prevent ExpressionChangedAfterItHasBeenCheckedError during change detection
  isLoading$ = this.isLoadingSubject.asObservable().pipe(delay(0));

  show(): void {
    this.activeRequests++;
    this.isLoadingSubject.next(true);
  }

  hide(): void {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this.isLoadingSubject.next(false);
    }
  }
}
