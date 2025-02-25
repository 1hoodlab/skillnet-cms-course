import { list } from "@keystone-6/core";
import { text, timestamp, relationship, float } from "@keystone-6/core/fields";
import { accessControl } from "./User";

export const DiscountEvent = list({
  access: accessControl,
  fields: {
    title: text({
      validation: { isRequired: true },
      ui: { description: "Discount event title" },
    }),
    discountPercentage: float({
      validation: { isRequired: true },
      ui: { description: "Discount percentage applied to courses" },
    }),
    startDate: timestamp({
      validation: { isRequired: true },
      ui: { description: "Start date of the discount event" },
    }),
    endDate: timestamp({
      validation: { isRequired: true },
      ui: { description: "End date of the discount event" },
    }),
    courses: relationship({
      ref: "Course.discountEvents",
      many: true,
      ui: { description: "Courses included in this discount event" },
    }),
  },
});
