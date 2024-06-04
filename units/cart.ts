import { test, expect, Page } from '@playwright/test';

export const emptyCart = async (page: Page) => {
  test('Empty Cart', async () => {
    await page.waitForTimeout(4000);
    const shoppingItems = await page.locator('.shopping-cart-item');
    const emptyCartButton = await page.locator('text=Empty Cart');
    const items = await shoppingItems.count();
    if (items > 0) {
      await emptyCartButton.click();
      await expect(page.locator('.c-modal__window')).toBeVisible();
      console.log('empty cart modal is visible');
      await page.locator('.c-modal__window >> text=Yes').click();
      await expect(page.locator('.c-modal__window')).not.toBeVisible();
    }
    await page.waitForTimeout(2000);
    await expect(page.locator('.shopping-cart-item')).toHaveCount(0);
  });
};
