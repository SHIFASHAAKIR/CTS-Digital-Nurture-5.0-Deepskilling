import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading.service';

// HANDS-ON 1 - Task 2, Step 9: Add <app-header> and <router-outlet> to the root
// component, replacing the default boilerplate content.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'student-course-portal';

  constructor(public loadingService: LoadingService) {}
}
