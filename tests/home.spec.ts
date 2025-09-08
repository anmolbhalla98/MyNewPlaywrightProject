import {test,expect} from '@playwright/test';
test ('We are Opening Home Page and Verifying Title', async ({page})=>{
    await page.goto('https://www.fifa.com/en/home');
    await expect(page).toHaveTitle("FIFA | The Home of Football");  //Regular Expression
    // using regex(/^FIFA\ | The Home of Football$/);
})
test ('We are Opening Home Page and Verifying Logo', async ({page})=>{
    await page.goto('https://www.fifa.com/en/home');
    const logo= page.locator('xpath=//img[@title="FIFA"]');
    //img[title='FIFA']
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('title','FIFA');
})
test('Verifying navigation link texts', async ({ page }) => {
  const expectedNavLinks = [
    "OVERVIEW",
    "FIFA WORLD CUP 26™",
    "FIFA WOMEN'S WORLD CUP 2027™",
    "FIFA U-20 WORLD CUP 2025",
    "MATCH CENTRE",
    "NEWS",
    "RANKINGS",
    "HOME",
    "FIFA WORLD CUP 26™ QUALIFIERS",
    "LIVE",
    "ORIGINALS",
    "ARCHIVE",
    "PAIRS",
    "GLOBAL GOALSCORER",
    "WHO AM I?",
    "FIVES",
    "TRIVIA",
    "SUPER LEAGUE SOCCER",
    "FIFA RIVALS",
    "MORE GAMES",
    "FIFA STORE",
    "TICKETS & HOSPITALITY",
    "FIFA COLLECT",
    "OVERVIEW",
    "STRATEGIC OBJECTIVES: 2023–2027",
    "WHAT FIFA DOES",
    "ORGANISATION",
    "CAMPAIGNS",
    "MEMBER ASSOCIATIONS",
    "REPORTS & DOCUMENTS",
    "FIFA RANKINGS"
  ];

  await page.goto('https://www.fifa.com/en/home');
  await page.waitForSelector('#mainLinksID a', { state: 'attached' });

  //await page.pause(); // Debugging pause
  const actualLinks = (await page.locator('#mainLinksID a').allInnerTexts())
    .map(text => text.trim().replace(/\u00A0/g, ' '))
    .filter(text => text !== ""); // remove blanks

  console.log("Actual Nav Links:", actualLinks);
  expect(actualLinks).toEqual(expectedNavLinks);
});
//.global-menu-top-nav_searchIconPadding__iOSPu
test.skip('Verifying searchbox is functional', async ({page})=>{
    await page.goto('https://www.fifa.com/en/home');
    const searchIcon = page.locator('#mainLinksID button[aria-label="Search"]');
    await searchIcon.click();
    const searchBox= page.getByPlaceholder("News, Players, Matches, Videos, etc");
    await searchBox.fill('football');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/search\q=football/);

    
})

test.skip ('Verifying searchbox is functional and is working', async ({ page }) => {
  // 1️⃣ Navigate to FIFA home page
  await page.goto('https://www.fifa.com/en/home');

  // 2️⃣ Click on the search icon
  const searchIcon = page.getByRole('button', { name: 'Search' });
  await expect(searchIcon).toBeVisible();
  await searchIcon.click();

  // 3️⃣ Fill the search input
  const searchBox = page.getByPlaceholder('News, Players, Matches, Videos, etc');
  await expect(searchBox).toBeVisible();
  await searchBox.fill('football');

  // 4️⃣ Press Enter
  await page.keyboard.press('Enter');

  // 5️⃣ Assert URL contains the search query
  await expect(page).toHaveURL(/search\?q=football/);

  // 6️⃣ Assert search results container is visible
  const searchResultsContainer = page.locator('section.search-results-page_searchResutlsContainer_p3ZL3');
  await expect(searchResultsContainer).toBeVisible();

  // 7️⃣ Assert first result card is visible
  const firstResultCard = searchResultsContainer.locator('div.search-result-card_searchCardContainer_RLZSB').first();
  await expect(firstResultCard).toBeVisible();

  // 8️⃣ Optional: check that the first card contains your search term
  await expect(firstResultCard.locator('a')).toContainText(/football/i);

  // 9️⃣ Optional: log total number of result cards
  const allResultCards = searchResultsContainer.locator('div.search-result-card_searchCardContainer_RLZSB');
  console.log('Total search result cards found:', await allResultCards.count());
});
