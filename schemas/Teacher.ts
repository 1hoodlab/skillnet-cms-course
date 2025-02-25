import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text, image } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const Teacher = list({
  access: allowAll,
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
      storage: "teacher_images", // Define a storage configuration in Keystone config
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
