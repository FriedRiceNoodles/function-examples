// @ts-check
import { DiscountApplicationStrategy, TargetType } from "../generated/api";

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").Discount} Discount
 */

/**
 * @type {FunctionResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  const DEFAULT_VALUE =  50.00;

  const configuration = JSON.parse(
    input?.discountNode?.metafield?.value ?? JSON.stringify(DEFAULT_VALUE)
  );
  const targets = [ /** @type */ { orderSubtotal: { excludedVariantIds: []} }];

  /**
   * @type {Discount}
   */
  const discount = {
    targets: targets,
    value: { fixedAmount:
      { amount: convertToCartCurrency(configuration, input.presentmentCurrencyRate).toString() }
    }
  }

  return{
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [discount],
  };
};

function convertToCartCurrency(value, presentmentCurrencyRate) {
  presentmentCurrencyRate ??= 1.0;
  return value * presentmentCurrencyRate;
}
