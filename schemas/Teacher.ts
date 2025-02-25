import { list } from "@keystone-6/core";
import { relationship, text, image } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { accessControl } from "./User";

export const Teacher = list({
  access: accessControl,
  fields: {
    name: text({
      validation: { isRequired: true },
      ui: { description: "Teacher's full name" },
    }),
    email: text({
      validation: { isRequired: true },
      ui: { description: "Teacher's email address" },
    }),
    avatar: image({
      storage: "teacher_images", 
      ui: { description: "Teacher's profile picture" },
    }),
    bio: document({
      formatting: true,
      ui: { description: "Short biography of the teacher" },
    }),
    courses: relationship({
      ref: "Course.teacher",
      many: true,
      ui: { description: "Courses taught by the teacher" },
    }),
  },
});
