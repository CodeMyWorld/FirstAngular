import { FirstAngularPage } from './app.po';

describe('first-angular App', function() {
  let page: FirstAngularPage;

  beforeEach(() => {
    page = new FirstAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
