import { list } from "@keystone-6/core";
import { text, password, timestamp, checkbox } from "@keystone-6/core/fields";

const isAdmin = ({
  session,
}: {
  session?: { data?: { isAdmin?: boolean } };
}): boolean => {
  return !!session?.data?.isAdmin;
};

const isSignedIn = ({ session }: { session?: { data?: any } }): boolean => {
  return !!session?.data;
};

let IS_SEEDING = false;

export const enableSeedingMode = () => {
  IS_SEEDING = true;
};

export const disableSeedingMode = () => {
  IS_SEEDING = false;
};

export const accessControl = {
  operation: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    query: () => true,
  },
};
export const User = list({
  access: {
    operation: {
      create: ({ session }) => IS_SEEDING || isAdmin({ session }),
      query: ({ session }) => isAdmin({ session }),
      update: isAdmin,
      delete: isAdmin,
    },
  },

  ui: {
    listView: {
      initialColumns: ["name", "email", "isAdmin", "createdAt"],
      initialSort: { field: "createdAt", direction: "DESC" },
    },
    labelField: "name",
  },

  fields: {
    name: text({
      validation: { isRequired: true },
      label: "Username",
      ui: { description: "User's login name" },
    }),

    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      label: "Email",
      ui: { description: "Email address used for login and contact" },
    }),

    password: password({
      validation: { isRequired: true },
      label: "Password",
      ui: {
        description: "User's login password",
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "read" },
      },
    }),

    isAdmin: checkbox({
      defaultValue: false,
      label: "Admin Privileges",
      ui: {
        description: "Grant administrative privileges to this user",
        itemView: {
          fieldMode: ({ session }) => (isAdmin({ session }) ? "edit" : "read"),
        },
      },
    }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
      label: "Created At",
      ui: {
        description: "When this account was created",
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
  },
});
