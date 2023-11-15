import {transformShopifyCustomer} from "@/app/api/customer/utils/mapper.js";
import {initShopifyBasedOnCountry} from "@/app/api/customer/utils/shopify.js";
import {logger} from "@/app/api/customer/utils/logger.js";
import {NextResponse} from "next/server";

export async function POST(req) {
  const customerData = await req.json();
  // Validate request data
  if (!customerData.salutation || !customerData.first_name || !customerData.last_name || !customerData.email ||
    !customerData.country || !customerData.city || !customerData.postcode || !customerData.birth_date ||
    !customerData.password || !customerData.password_confirmation || !customerData.rm_program) {
    return NextResponse.json({ errors: "Missing mandatory fields value" }, {status: 400});
  }

  let passwordPatten = /^(?=.*?[A-Z])(?=.*?[0-9])(?=(.*\W))(?!.*\\s).{8,}$/;
  if (customerData.password.length < 8 || !passwordPatten.test(customerData.password)) {
    return NextResponse.json({ errors: { password: ["must contain at least 8 characters, 1 upper case, 1 numeric digit and 1 special character"] }}, {status: 400});
  }

  if ((customerData.country.toLowerCase() === "us" || customerData.country.toLowerCase() === "united states of america" ||
      customerData.country.toLowerCase() === "united states" ||
      customerData.country.toLowerCase() === "états-unis" || customerData.country.toLowerCase() === "etats-unis" ) && !customerData.state) {
    return NextResponse.json({ errors: "Missing state for United States of America" }, {status: 400});
  }

  logger.info(`Receiving customer creation for ${customerData.rm_program} ${customerData.country}`);
  let shopifyCustomer = transformShopifyCustomer(customerData);

  try {
    let shopify = initShopifyBasedOnCountry(customerData.country, customerData.rm_program);
    logger.info("Creating customer in store: " + shopify.options.shopName);
    let customer = await shopify.customer.create(
      shopifyCustomer
    );
    logger.info(`Finished creating customer ${customer.first_name}  ${customer.last_name} in store: ${shopify.options.shopName}`);
    return NextResponse.json({ message: customer }, {status: 200});
  } catch (error) {
    logger.error(error);
    return NextResponse.json(error.response ? error.response.body :  { errors: error.message }, {status: 400});
  }
}

