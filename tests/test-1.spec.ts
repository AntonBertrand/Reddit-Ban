import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.reddit.com/user/Existing_Use7876/');
  await page.getByText('This account has been').click();

  if (await page.getByText('This account has been').isVisible()) {
    console.log(`Account is banned!`);
  } else {
    console.log(`Account is NOT banned!`);
  }

  await page.getByLabel('Home').click();
});