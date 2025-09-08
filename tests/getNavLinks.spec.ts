import { test } from '@playwright/test';

test.skip('Generate nav link array for expectedNavLinks', async ({ page }) => {
  await page.goto('https://www.fifa.com/en/home');

  const navLinks = page.locator('#mainLinksID a');
  const actualNavLinks = await navLinks.allInnerTexts();

  // Normalize text (trim + remove non-breaking spaces)
  const cleanedLinks = actualNavLinks.map(text =>
    text.trim().replace(/\u00A0/g, ' ')
  );

  // Print array in ready-to-paste format
  console.log("Copy this array into your real test:\n");
  console.log("[");
  cleanedLinks.forEach(link => {
    console.log(`  "${link}",`);
  });
  console.log("]");
});
