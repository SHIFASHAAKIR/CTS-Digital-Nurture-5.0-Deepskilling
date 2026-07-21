import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  // HANDS-ON 3 - Task 1, Step 25: loading flag toggled after a simulated fetch.
  isLoading = true;

  // HANDS-ON 2 - Task 3, Step 22: 5 hardcoded course objects.
  courses: Course[] = [
    { id: 1, name: 'Introduction to Angular', code: 'WEB101', credits: 3, gradeStatus: 'passed', enrolled: true },
    { id: 2, name: 'Data Structures', code: 'CS201', credits: 4, gradeStatus: 'pending', enrolled: false },
    { id: 3, name: 'Database Systems', code: 'CS210', credits: 3, gradeStatus: 'failed', enrolled: false },
    { id: 4, name: 'UI/UX Design', code: 'DES150', credits: 2, gradeStatus: 'pending', enrolled: true },
    { id: 5, name: 'Cloud Computing', code: 'CS330', credits: 4, gradeStatus: 'passed', enrolled: false },
  ];

  selectedCourseId: number | null = null;

  ngOnInit(): void {
    // HANDS-ON 3 - Task 1, Step 25: simulate a network fetch delay.
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // HANDS-ON 3 - Task 1, Step 26: trackBy returns a stable identity (course.id)
  // so Angular only re-renders items whose id changed, instead of destroying
  // and recreating every <app-course-card> whenever the courses array reference changes.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  // HANDS-ON 2 - Task 3, Step 23: handle the bubbled-up (enrollRequested) event.
  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
