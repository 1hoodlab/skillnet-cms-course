import { list } from "@keystone-6/core";
import { float, text } from "@keystone-6/core/fields";
import { accessControl } from "./User";

export const Currency = list({
  access: accessControl,
  fields: {
    name: text({
      validation: { isRequired: true },
      ui: { description: "Currency name (e.g., Vietnamese Dong, US Dollar)" },
    }),
    code: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      ui: { description: "Currency code (e.g., VND, USD)" },
    }),
    exchangeRate: float({
      defaultValue: 1,
      ui: {
        description:
          "Exchange rate compared to base currency (e.g., 1 USD = 23000 VND)",
      },
    }),
  },
});
