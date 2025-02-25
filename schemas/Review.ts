import { list } from "@keystone-6/core";
import {
  integer,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { accessControl } from "./User";

export const Review = list({
  access: accessControl,
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
