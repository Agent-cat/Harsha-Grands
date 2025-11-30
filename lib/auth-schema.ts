import { z } from "zod";

export const customAuthSchema = {
  user: {
    schema: {
      id: z.string(),
      email: z.string().email(),
      emailVerified: z.boolean().default(false),
      name: z.string().nullable(),
      image: z.string().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
      role: z.enum(["USER", "ADMIN"]).default("USER"),
    },
    tableName: "users",
  },
  account: {
    schema: {
      id: z.string(),
      userId: z.string(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().nullable(),
      access_token: z.string().nullable(),
      expires_at: z.number().nullable(),
      token_type: z.string().nullable(),
      scope: z.string().nullable(),
      id_token: z.string().nullable(),
      session_state: z.string().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    },
    tableName: "accounts",
  },
  session: {
    schema: {
      id: z.string(),
      userId: z.string(),
      token: z.string(),
      expiresAt: z.date(),
      createdAt: z.date(),
      updatedAt: z.date(),
    },
    tableName: "sessions",
  },
  verification: {
    schema: {
      id: z.string(),
      identifier: z.string(),
      value: z.string(),
      expiresAt: z.date(),
      createdAt: z.date(),
      updatedAt: z.date(),
    },
    tableName: "verifications",
  },
};
