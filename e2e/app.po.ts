import { browser, element, by } from 'protractor';

export class JobBoardPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('jb-root h1')).getText();
  }
}
