import { Component } from '@angular/core';
import { TranslationService } from '../translation/service/translation.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [MatSelectModule, FormsModule, CommonModule, TranslateModule],
  template: `
    <mat-form-field appearance="outline" class="language-select">
      <mat-label>{{ 'language.select' | translate }}</mat-label>
      <mat-select [(ngModel)]="selectedLanguage" (ngModelChange)="onLanguageChange($event)">
        <mat-option value="en">English</mat-option>
        <mat-option value="ar">العربية</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    .language-select {
      margin-left: 10px;
      width: 120px;
      display: block !important; /* Ensure visibility */
      position: relative; /* Prevent overlap issues */
      z-index: 1000; /* Ensure it stays above other elements */
    }
    mat-form-field {
      padding: 0 10px; /* Add padding for better spacing */
    }
  `]
})
export class LanguageToggleComponent {
  selectedLanguage: 'en' | 'ar';

  constructor(private translationService: TranslationService) {
    this.selectedLanguage = this.translationService.getCurrentLanguage() as 'en' | 'ar';
  }

  onLanguageChange(lang: 'en' | 'ar'): void {
    this.translationService.switchLanguage(lang);
  }
}