import { PrismaClient } from "@prisma/client";

import UserAPI from "./users";

const prisma = new PrismaClient();

export const dataSources = () => ({ users: new UserAPI({ prisma }) });
