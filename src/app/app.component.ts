import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';

@Component({
  selector: 'app-root',
  imports: [ StudentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EL-Renad-app';
}
