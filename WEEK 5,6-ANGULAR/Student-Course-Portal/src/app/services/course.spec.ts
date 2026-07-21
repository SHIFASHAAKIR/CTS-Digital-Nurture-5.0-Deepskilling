import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CourseService
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Step 110: verify there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Step 107: test getCourses()
  it('should retrieve courses from backend via GET request', () => {
    const mockCourses: Course[] = [
      { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed', enrolled: false },
      { id: 2, name: 'Algorithms', code: 'CS102', credits: 3, gradeStatus: 'pending', enrolled: false }
    ];

    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('Data Structures');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Step 108: test error handling (handling the retry(2) strategy)
  it('should propagate a friendly error message on 500 server response', () => {
    service.getCourses().subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (err) => {
        expect(err.message).toBe('Failed to load courses. Please try again.');
      }
    });

    // 1st attempt
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });

    // 2nd attempt (1st retry)
    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });

    // 3rd attempt (2nd retry)
    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
