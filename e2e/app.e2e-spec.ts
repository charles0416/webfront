import { SpikePage } from './app.po';

describe('spike App', () => {
  let page: SpikePage;

  beforeEach(() => {
    page = new SpikePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
