import { SeminarManagerPage } from './app.po';

describe('seminar-manager App', () => {
  let page: SeminarManagerPage;

  beforeEach(() => {
    page = new SeminarManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
