const puppeteer = require("puppeteer");

before(async () => {
  const args = {
    args: [
      // Required for Docker version of Puppeteer
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      "--disable-dev-shm-usage",
    ],
  };
  global.browser = {
    a: await puppeteer.launch(args),
    b: await puppeteer.launch(args),
  };

  const browserVersion = await global.browser.a.version();
  console.log(`Started ${browserVersion}`);
});

beforeEach(async () => {
  global.page = {
    a: await global.browser.a.newPage(),
    b: await global.browser.b.newPage(),
  };
});

afterEach(async () => {
  await global.page.a.close();
  await global.page.b.close();
});

after(async () => {
  await global.browser.a.close();
  await global.browser.b.close();
});
