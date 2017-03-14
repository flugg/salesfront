import { browser, element, by } from 'protractor';

export class SfPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sf-root h1')).getText();
  }
}
