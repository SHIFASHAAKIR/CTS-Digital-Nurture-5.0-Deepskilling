import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  selectedCourseId?: number;

  isLoading = true;

  courses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4 },
    { id: 2, name: 'Database Management', code: 'CS102', credits: 3 },
    { id: 3, name: 'Operating Systems', code: 'CS103', credits: 4 },
    { id: 4, name: 'Computer Networks', code: 'CS104', credits: 3 },
    { id: 5, name: 'Artificial Intelligence', code: 'CS105', credits: 4 }
  ];

  ngOnInit(): void {
    console.log("CourseList Started");

    setTimeout(() => {
      this.isLoading = false;
      console.log("Loading Completed");
    }, 1500);
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
    console.log("Selected:", courseId);
  }

}