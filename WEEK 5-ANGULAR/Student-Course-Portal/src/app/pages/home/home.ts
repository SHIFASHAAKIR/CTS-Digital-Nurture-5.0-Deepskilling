import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  // HANDS-ON 1 - Task 2, Step 8: hardcoded stats row values.
  coursesAvailable = 12;
  enrolledCount = 3;
  gpa = 3.8;

  // HANDS-ON 2 - Task 1, Step 11: interpolation.
  portalName = 'Student Course Portal';

  // HANDS-ON 2 - Task 1, Step 12: property binding controls [disabled].
  isPortalActive = true;

  // HANDS-ON 2 - Task 1, Step 13: event binding sets this message.
  message = '';

  // HANDS-ON 2 - Task 1, Step 14: two-way binding via [(ngModel)].
  searchTerm = '';

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
  }

  // HANDS-ON 2 - Task 2, Step 17: ngOnDestroy fires when the component is
  // removed from the DOM (e.g. navigating away) - clean up subscriptions/timers here.
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}
