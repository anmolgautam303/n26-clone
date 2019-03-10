import { Component, OnInit } from '@angular/core';

import { I18nService } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  windowWidth = window.innerWidth;
  public isScrolled: boolean;

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.isScrolled = false;
    window.addEventListener('scroll', this.scrolling);
    window.addEventListener('resize', this.winChange);
    window.addEventListener('load', this.winChange);
  }

  scrolling() {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    var elem = <HTMLElement>document.getElementsByClassName('replace-wrapper')[0];
    var linkEl = <HTMLElement>document.getElementsByClassName('link-w')[0];
    var btnEl = <HTMLElement>document.getElementsByClassName('button-w')[0];
    var navEl = <HTMLElement>document.getElementsByClassName('navbar')[0];
    var logo_img = <HTMLElement>document.getElementsByClassName('header-img')[0];
    var logo_btn = <HTMLElement>document.getElementsByClassName('header-btn')[0];
    if (top > 1) {
      navEl.style.boxShadow = '0 0.2em 0.25em rgba(0, 0, 0, 0.075)';
    } else {
      navEl.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
    }
    if (top > 100) {
      this.isScrolled = true;
      elem.style.top = '-70px';
      linkEl.style.opacity = '0';
      btnEl.style.opacity = '1';
      if (this.windowWidth < 577) {
        logo_img.style.display = 'none';
        logo_btn.style.display = 'block';
      }
    } else {
      this.isScrolled = false;
      elem.style.top = '0px';
      linkEl.style.opacity = '1';
      if (this.windowWidth < 577) {
        logo_img.style.display = 'block';
        logo_btn.style.display = 'none';
      }
    }
  }
  winChange() {
    var w = window.innerWidth;
    this.windowWidth = w;
    var dot1 = <HTMLElement>document.getElementsByClassName('dot')[0];
    var dot2 = <HTMLElement>document.getElementsByClassName('dot')[1];
    var logo_img = <HTMLElement>document.getElementsByClassName('header-img')[0];
    var logo_btn = <HTMLElement>document.getElementsByClassName('header-btn')[0];
    if (w < 577) {
      dot1.style.display = 'none';
      dot2.style.display = 'none';
    } else {
      dot1.style.display = 'block';
      dot2.style.display = 'block';
      logo_img.style.display = 'block';
      logo_btn.style.display = 'none';
    }
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}
