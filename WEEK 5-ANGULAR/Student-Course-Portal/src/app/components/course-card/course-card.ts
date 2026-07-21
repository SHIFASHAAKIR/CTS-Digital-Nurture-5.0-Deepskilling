import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Course } from '../../models/course.model';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, Highlight, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();
  isExpanded = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        'CourseCard ngOnChanges — previous:',
        changes['course'].previousValue,
        'current:',
        changes['course'].currentValue,
      );
    }
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    this.enrollRequested.emit(this.course.id);
  }
  get gradeBorderStyle(): Record<string, string> {
    const colours: Record<Course['gradeStatus'], string> = {
      passed: '#16a34a',
      failed: '#dc2626',
      pending: '#296ce1',
    };
    return { 'border-left-color': colours[this.course.gradeStatus] };
  }
  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.course.enrolled,
      'card--full': this.course.credits >= 4,
      expanded: this.isExpanded,
    };
  }
}
