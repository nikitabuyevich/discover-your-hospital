import { LicenseMinderPage } from './app.po';

describe('license-minder App', function() {
  let page: LicenseMinderPage;

  beforeEach(() => {
    page = new LicenseMinderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
