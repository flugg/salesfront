import { DanieltestPage } from './app.po';

describe('danieltest App', function() {
  let page: DanieltestPage;

  beforeEach(() => {
    page = new DanieltestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
