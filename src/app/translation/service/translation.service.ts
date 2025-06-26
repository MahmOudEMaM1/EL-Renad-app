import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'app_language';

  constructor(private translate: TranslateService) {
    // Set default language
    const savedLang = localStorage.getItem(this.STORAGE_KEY) || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(savedLang);
  }

  switchLanguage(lang: 'en' | 'ar'): void {
    this.translate.use(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
    // Update direction for Arabic (RTL) or English (LTR)
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
}