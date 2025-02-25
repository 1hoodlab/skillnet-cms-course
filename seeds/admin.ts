// seeds/admin.ts
import { disableSeedingMode, enableSeedingMode } from "../schemas/User";
import { KeystoneContext } from "@keystone-6/core/types";

export async function seedAdminUser(context: KeystoneContext) {
  // Get credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";

  try {
    // Enable seeding mode to bypass access control
    enableSeedingMode();

    console.log(`🌱 Checking for existing admin user (${adminEmail})...`);

    // Check if admin user already exists
    const existingUsers = await context.query.User.findMany({
      where: { email: { equals: adminEmail } },
    });

    if (existingUsers.length === 0) {
      console.log(`🌱 Creating admin user (${adminEmail})...`);

      // Create the admin user
      await context.query.User.createOne({
        data: {
          name: "Admin User",
          email: adminEmail,
          password: adminPassword,
          isAdmin: true,
        },
      });

      console.log("✅ Admin user created successfully!");
    } else {
      console.log("👍 Admin user already exists, skipping seed");
    }
  } catch (error) {
    console.error("❌ Error during admin user creation:");
    console.error(error);
  } finally {
    // Always disable seeding mode when done
    disableSeedingMode();
  }
}
