import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { CourseList } from './course-list';
import { Course } from '../../models/course.model';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed', enrolled: false },
    { id: 2, name: 'Algorithms', code: 'CS102', credits: 3, gradeStatus: 'pending', enrolled: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          initialState: {
            course: { courses: mockCourses, loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Step 109: assert rendered course cards match the initial state
  it('should render the list of courses from the store', () => {
    fixture.detectChanges();
    const courseCards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(courseCards.length).toBe(2);
  });

  // Step 110: use store.setState and assert loading indicator is visible
  it('should display the loading indicator when state has loading: true', () => {
    store.setState({
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] }
    });
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(loadingElement.textContent).toContain('Loading courses...');
  });
});
