import { createTRPCReact } from "@trpc/react";
import type { AppRouter } from "@chat/api";

export const trpc = createTRPCReact<AppRouter>();
