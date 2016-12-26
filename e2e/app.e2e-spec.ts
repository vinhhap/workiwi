import { JobBoardPage } from './app.po';

describe('job-board App', function() {
  let page: JobBoardPage;

  beforeEach(() => {
    page = new JobBoardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('jb works!');
  });
});
