import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  integer,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";

export const Review = list({
  access: allowAll,
  fields: {
    course: relationship({
      ref: "Course.reviews",
      ui: { description: "The course being reviewed" },
    }),
    reviewerName: text({
      validation: { isRequired: true },
      ui: { description: "Name of the reviewer" },
    }),
    rating: integer({
      validation: { isRequired: true, min: 1, max: 5 },
      ui: { description: "Rating out of 5" },
    }),
    comment: text({
      ui: { displayMode: "textarea", description: "Review comment" },
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: { description: "Date of the review" },
    }),
  },
});
