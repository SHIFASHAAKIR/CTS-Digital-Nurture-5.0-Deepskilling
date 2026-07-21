import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  // Step 78: Inject HttpClient into CourseService
  constructor(private http: HttpClient) {}

  // Step 79: Replace courses array with HTTP call returning Observable<Course[]>
  // Step 83: Chain the map operator to transform the API response
  // Step 84: Add error handling using catchError
  // Step 85: Add a tap operator for side effects (logging)
  // Step 86: Implement a retry strategy
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      // Step 83: filter courses to only include those with credits > 0
      map((courses) => courses.filter((c) => c.credits > 0)),
      // Step 85: tap operator for side effects (logging count).
      // Comment: tap is preferred over side effects inside map because tap is designed
      // explicitly for side effects (like logging, analytics, debugging) without altering
      // the value of the stream. map is intended purely for data transformations.
      tap((courses) => console.log('Courses loaded:', courses.length)),
      catchError(this.handleError)
    );
  }

  // Step 79: getCourseById returning Observable<Course>
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Step 81: Add a POST method to CourseService
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(this.handleError)
    );
  }

  // Backwards compatibility helper
  addCourse(course: Course): void {
    this.createCourse(course).subscribe();
  }

  // Step 82: Add PUT and DELETE methods
  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('HTTP Error caught in CourseService:', error);
    return throwError(() => new Error('Failed to load courses. Please try again.'));
  }
}
