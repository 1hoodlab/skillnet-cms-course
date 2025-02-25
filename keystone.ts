// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from "@keystone-6/core";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from "./auth";
import { Category } from "./schemas/Category";
import { Course } from "./schemas/Course";
import { DiscountEvent } from "./schemas/DiscountEvent";
import { User } from "./schemas/User";
import { Teacher } from "./schemas/Teacher";
import { Currency } from "./schemas/Currency";
import { Lesson } from "./schemas/Lesson";
import { Review } from "./schemas/Review";
import { seedAdminUser } from "./seeds/admin";

export default withAuth(
  config({
    storage: {
      teacher_images: {
        kind: "local", // Use local storage
        type: "image", // Image type
        generateUrl: (path) => `/uploads/teachers/${path}`, // URL to access images
        serverRoute: {
          path: "/uploads/teachers", // Public route for images
        },
        storagePath: "public/uploads/teachers", // Local folder to store images
      },
      course_images: {
        kind: "local", // Use local storage
        type: "image", // Image type
        generateUrl: (path) => `/uploads/courses/${path}`, // URL to access images
        serverRoute: {
          path: "/uploads/courses", // Public route for images
        },
        storagePath: "public/uploads/courses", // Local folder to store images
      },
    },
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db",

      async onConnect(context) {
        console.log("🔌 Connected to database. Running seeds...");

        try {
          await seedAdminUser(context);
        } catch (error) {
          console.error("❌ Seeding error:", error);
        }
      },
    },
    lists: {
      Lesson,
      Review,
      Currency,
      Category,
      Course,
      DiscountEvent,
      Teacher,
      User,
    },
    session,
  })
);
