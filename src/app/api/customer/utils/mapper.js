export function transformShopifyCustomer(customerData) {
  let shopifyCustomer = {
    email: customerData.email,
    accepts_marketing: customerData.accepts_marketing ? customerData.accepts_marketing : false,
    first_name: customerData.first_name,
    last_name: customerData.last_name,
    phone: customerData.phone,
    password: customerData.password,
    password_confirmation: customerData.password_confirmation,
    verified_email: true,
  }
  let customerFieldsDataValue = {
    postcode: customerData.postcode,  //TODO check with RC, use postcode or zip
    salutation: customerData.salutation,
    birth_date: customerData.birth_date,
    city: customerData.city,
    accept_marketing_privacy: customerData.accept_marketing_privacy,
    rm_program: customerData.rm_program,
    country: customerData.country,
    province: customerData.state
  }

  shopifyCustomer.tags = getTagsByRmProgram(customerData.rm_program);

  shopifyCustomer.metafields = [{
    namespace: "customer_fields",
    key: "data",
    value: JSON.stringify(customerFieldsDataValue),
    owner_resource: "customer",
    type: "json_string",
  }]

  return shopifyCustomer;
}

function getTagsByRmProgram(rmProgram) {
  // Will have other brands in the future
  switch (rmProgram) {
    case process.env.SHOPIFY_RM_PROGRAM:
      return process.env.SHOPIFY_CUSTOMER_TAGS;
    default:
      return '';
  }
}
