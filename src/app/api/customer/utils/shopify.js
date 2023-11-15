const Shopify = require('shopify-api-node');

function mapShopifyStore(country) {
  switch (country) {
    case 'us':
    case 'united states':
    case 'united states of america':
    case 'états-unis':
    case 'etats-unis':
      return new Shopify({
          shopName: process.env.SHOPIFY_SHOP_NAME_US,
          accessToken: process.env.SHOPIFY_CUSTOMER_ACCESS_TOKEN_US
        }
      );
    case 'fr':
    case 'france':
      return new Shopify({
          shopName: process.env.SHOPIFY_SHOP_NAME_FR,
          accessToken: process.env.SHOPIFY_CUSTOMER_ACCESS_TOKEN_FR
        }
      );
    case 'uk':
    case 'united kingdom':
    case 'royaume-uni':
      return new Shopify({
          shopName: process.env.SHOPIFY_SHOP_NAME_UK,
          accessToken: process.env.SHOPIFY_CUSTOMER_ACCESS_TOKEN_UK
        }
      );
    case 'cn':
    case 'chine':
    case 'china':
      throw new Error("Country not supported currently");
    default:
      return new Shopify({
          shopName: process.env.SHOPIFY_SHOP_NAME_INT,
          accessToken: process.env.SHOPIFY_CUSTOMER_ACCESS_TOKEN_INT
        }
      );
  }
}

export function initShopifyBasedOnCountry(country, rm_program) {
  if (!country) {
    throw new Error("Missing country");
  }
  country = country.toLowerCase();
  switch (rm_program) {
    // Will have other brands in the future
    case process.env.SHOPIFY_RM_PROGRAM:
      return mapShopifyStore(country);
    default:
      throw new Error("Brand not supported");
  }
}
