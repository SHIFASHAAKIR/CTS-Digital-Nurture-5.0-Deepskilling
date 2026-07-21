import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// HANDS-ON 1 - Task 2, Step 7: nav with portal name + placeholder links.
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
