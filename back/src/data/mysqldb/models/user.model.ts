import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export const UserPrismaModel = prisma.user;