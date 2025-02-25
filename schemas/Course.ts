import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  float,
  relationship,
  image,
  select,
  checkbox,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { accessControl } from "./User";


export const Course = list({
  access: accessControl,
  fields: {
    title: text({
      validation: { isRequired: true },
      ui: { description: "Course title" },
    }),
    slug: text({
      validation: { isRequired: true },
      ui: { description: "Static URL slug" },
    }),
    description: text({
      ui: { displayMode: "textarea", description: "Course description" },
    }),
    content: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
      ui: { description: "Detailed course content" },
    }),

    lessons: relationship({
      ref: "Lesson.course",
      many: true,
      ui: { description: "Lessons included in this course" },
    }),
    reviews: relationship({
      ref: "Review.course",
      many: true,
      ui: { description: "Reviews for this course" },
    }),

    price: float({
      defaultValue: 0,
      validation: { isRequired: true },
      ui: { description: "Course price amount" },
    }),
    currency: select({
      options: [
        { label: "Vietnamese Dong (VND)", value: "VND" },
        { label: "US Dollar (USD)", value: "USD" },
      ],
      defaultValue: "VND",
      validation: { isRequired: true },
      ui: { description: "Select currency for the course price" },
    }),
    thumbnail: image({
      storage: "course_images",
      ui: { description: "Course thumbnail image" },
    }),
    categories: relationship({
      ref: "Category.courses",
      many: true,
      ui: { description: "Course categories" },
    }),
    discountEvents: relationship({
      ref: "DiscountEvent.courses",
      many: true,
      ui: { description: "Associated discount events" },
    }),
    teacher: relationship({
      ref: "Teacher.courses",
      ui: { description: "Instructor teaching the course" },
    }),
    visible: checkbox({
      defaultValue: true,
      ui: { description: "Enable/Disable course visibility" },
    }),
  },
});
