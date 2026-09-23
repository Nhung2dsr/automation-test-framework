import { ObjectRepository } from "../types/locator.types";

export const productRepository = {
    itemProduct: {
        type: 'xpath',
        value: '//a[normalize-space(text())="FullStack Automation QA với Playwright Typescript"]'
    },

  imgProduct: {
    type: 'xpath',
    value: '//img[@src="https://e-commerce-dev.betterbytesvn.com/wp-content/uploads/2026/06/6074295_d042.jpg" and @class="zoomImg"]'
  },

  titleProduct: {
    type: 'xpath',
    value: '//h1[@class="product_title entry-title"]'
  },

  priceGoc: {
    type: 'xpath',
    value: '//div[contains(@class,"summary") and contains(@class,"entry-summary")]//p[contains(@class,"price")]//del//span[contains(@class,"woocommerce-Price-amount")]'
  },

  priceKM: {
    type: 'xpath',
    value: '//div[contains(@class,"summary") and contains(@class,"entry-summary")]//p[contains(@class,"price")]//ins//span[contains(@class,"woocommerce-Price-amount")]'
  },

  describeProduct: {
    type: 'xpath',
    value: '//div[@class="woocommerce-product-details__short-description"]'
  },

  btnAddCart: {
    type: 'xpath',
    value: '//button[@name="add-to-cart"]'
  },

  successMessage: {
    type: 'xpath',
    value: '//div[@class="woocommerce-message"]'
  },
} satisfies ObjectRepository