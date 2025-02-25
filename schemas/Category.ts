import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, relationship } from "@keystone-6/core/fields";
import { accessControl } from "./User";

export const Category = list({
  access: accessControl,
  fields: {
    name: text({
      validation: { isRequired: true },
      ui: { description: "Category name" },
    }),
    description: text({
      ui: { displayMode: "textarea", description: "Category description" },
    }),
    courses: relationship({
      ref: "Course.categories", // This must match the field name in Course
      many: true,
      ui: { description: "Courses in this category" },
    }),
  },
});
