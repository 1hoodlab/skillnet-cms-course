import { list } from "@keystone-6/core";
import { text, relationship, integer } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { accessControl } from "./User";

export const Lesson = list({
  access: accessControl,
  fields: {
    title: text({
      validation: { isRequired: true },
      ui: { description: "Lesson title" },
    }),
    course: relationship({
      ref: "Course.lessons",
      ui: { description: "The course this lesson belongs to" },
    }),
    content: document({
      formatting: true,
      links: true,
      dividers: true,
      ui: { description: "Lesson content (text, images, etc.)" },
    }),
    videoUrl: text({
      ui: { description: "Video link for the lesson (if any)" },
    }),
    order: integer({
      defaultValue: 1,
      ui: { description: "Lesson order within the course" },
    }),
  },
});
