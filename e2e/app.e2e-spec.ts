import { SfPage } from './app.po';

describe('sf App', () => {
  let page: SfPage;

  beforeEach(() => {
    page = new SfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sf works!');
  });
});
