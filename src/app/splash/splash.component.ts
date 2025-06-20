import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  @Output() splashComplete = new EventEmitter<boolean>();
  
  // Define image paths
  image2Path = 'assets/image2.png';

  ngOnInit(): void {
    setTimeout(() => {
      this.splashComplete.emit(true);
    }, 3000);
  }
}