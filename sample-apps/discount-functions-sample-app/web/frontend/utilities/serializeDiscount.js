export function serializeDiscount(discount) {
  const serialized = {
    title: discount.title,
    startsAt: new Date(),
    discountClass: discount.discountClass,
    metafields: [
      // store configuration in standard metafield
      {
        namespace: 'function',
        key: 'configuration',
        type: 'json',
        value: JSON.stringify(discount.configuration)
      }
    ]
  };

  // metafield id is required for update
  if (discount.configurationId) {
    serialized.metafields[0].id = discount.configurationId;
  }

  return serialized;
}