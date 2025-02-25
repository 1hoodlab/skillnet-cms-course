import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  password,
  relationship,
  timestamp,
} from "@keystone-6/core/fields";

export const User = list({
  access: allowAll,

  fields: {
    name: text({
      validation: { isRequired: true },
      label: "Họ và tên",
    }),

    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      label: "Email",
    }),

    password: password({
      validation: { isRequired: true },
      label: "Mật khẩu",
    }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
      label: "Thời điểm tạo",
    }),
  },
});
