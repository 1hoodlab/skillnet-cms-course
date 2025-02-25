import { list } from "@keystone-6/core";
import { text, password, timestamp, checkbox } from "@keystone-6/core/fields";

// Kiểm tra nếu user là admin
const isAdmin = ({
  session,
}: {
  session?: { data?: { isAdmin?: boolean } };
}): boolean => {
  console.log(session);
  return !!session?.data?.isAdmin;
};

// Kiểm tra nếu user đã đăng nhập
const isSignedIn = ({ session }: { session?: { data?: any } }): boolean => {
  return !!session?.data;
};

// Cờ kiểm soát chế độ seeding (cho phép tạo user khi khởi động lần đầu)
let IS_SEEDING = false;

// Hàm bật chế độ seeding
export const enableSeedingMode = () => {
  IS_SEEDING = true;
};

// Hàm tắt chế độ seeding
export const disableSeedingMode = () => {
  IS_SEEDING = false;
};

export const accessControl = {
  operation: {
    create: isAdmin, // Chỉ admin có thể tạo
    update: isAdmin, // Chỉ admin có thể cập nhật
    delete: isAdmin, // Chỉ admin có thể xóa
    query: () => true, // Tất cả user có thể xem dữ liệu
  },
};
export const User = list({
  access: {
    operation: {
      // Chỉ admin mới được tạo user (trừ khi đang ở chế độ seeding)
      create: ({ session }) => IS_SEEDING || isAdmin({ session }),
      query: ({ session }) => isAdmin({ session }), // Chỉ admin mới được xem danh sách user
      update: isAdmin, // Chỉ admin mới được chỉnh sửa user
      delete: isAdmin, // Chỉ admin mới được xóa user
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
