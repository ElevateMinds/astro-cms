import { defineDb, defineTable, column } from "astro:db";
import Google from "@auth/core/providers/google";


// https://astro.build/db/config

// Define USERS
const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    email_verified_at: column.date({ optional: true }),
    password: column.text(),
    rememberToken: column.text(),
    super: column.boolean({ default: false }),
    avatar: column.text({ optional: true }),
    preferences: column.json({ optional: true }),
    last_login: column.date({ optional: true }),
  },
});

// Define ROLES
const Roles = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    handle: column.text({ unique: true }),
    title: column.text(),
    permissions: column.json({ optional: true }),
    preferences: column.json({ optional: true }),
  },
});

// Define GROUPS
const Groups = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    handle: column.text({ unique: true }),
    title: column.text(), 
    data: column.json({ optional: true }),
    roles: column.json({ optional: true }),
  },
});

// Define ROLE_USER
const RoleUser = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    user_id: column.number({ references: () => Users.columns.id }),
    role_id: column.text(),
  },
});

// Define GROUP_USER
const GroupUser = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    user_id: column.number({ references: () => Users.columns.id }),
    group_id: column.text(),
  },
});

// Define password_activation_tokens
const PasswordActivationTokens = defineTable({
  columns: {
    email: column.text({ index: true }),
    token: column.text(),
    created_at: column.date({ optional: true }),
  },
});

// Export all defined tables
export default defineDb({
  tables: {
    Users,
    Roles,
    Groups,
    RoleUser,
    GroupUser,
    PasswordActivationTokens,
  },
});
