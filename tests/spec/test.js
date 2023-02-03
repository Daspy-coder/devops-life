const assert = require("assert");

const url = { vote: "http://vote/", result: "http://result/" };
// TODO: Implement a reverse proxy (see issue #2) so that the above URLs go via the proxy, as follows:
// const url = { vote: "http://vote-proxy/", result: "http://result-proxy/", };

/* Helper function that waits for a selector then returns a string of the innerText */
async function selectorText(page, selector) {
  await page.waitForSelector(selector);
  text = await page.$eval(selector, (e) => e.innerText);
  return text.toString();
}

/* Helper function to cast a specific vote as a particular user/browser */
async function castVote(page, selector) {
  clickedSelector = selector + " > i";
  await selectorText(page, selector);
  const navigationPromise = page.waitForNavigation();
  await page.click(selector);
  await navigationPromise;
  await page.$eval(clickedSelector, (e) => e.outerHTML);
}

/* Helper function to check vote counts and percentages */
async function checkVotes(page, votes, dogs, cats) {
  assert.strictEqual(await selectorText(page, "#result .ng-binding"), votes);
  assert.strictEqual(await selectorText(page, ".dogs .stat"), dogs);
  assert.strictEqual(await selectorText(page, ".cats .stat"), cats);
}

describe("Primary workflow", () => {
  it("Initial results show no votes", async () => {
    await global.page.a.goto(url.result);
    assert.strictEqual(await selectorText(global.page.a, "#result"), "");
  });
  it("User A can vote for dogs", async () => {
    await global.page.a.goto(url.vote);
    await castVote(global.page.a, "#b");
  });
  it("Results show correct values after User A vote", async () => {
    await global.page.a.goto(url.result);
    await checkVotes(global.page.a, "1 vote", "100.0%", "0.0%");
  });
  it("User A can change vote to cats", async () => {
    await global.page.a.goto(url.vote);
    await castVote(global.page.a, "#a");
  });
  it("Results show correct values after User A changes vote", async () => {
    await global.page.a.goto(url.result);
    await checkVotes(global.page.a, "1 vote", "0.0%", "100.0%");
  });
  it("User B can vote for dogs", async () => {
    await global.page.b.goto(url.vote);
    await castVote(global.page.b, "#b");
  });
  // TODO: Fix vote results for multiple users (see issue #1):
  // it("Results show correct values after User B votes", async () => {
  //   await global.page.a.goto(url.result);
  //   await checkVotes(global.page.a, "2 votes", "50.0%", "50.0%");
  // });
});
