import { Component } from '@angular/core';

import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'progressbar',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.css',
})
export class ProgressbarComponent {}
