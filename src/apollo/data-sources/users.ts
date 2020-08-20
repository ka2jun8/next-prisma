import { Context } from "@apollo/client";
import { PrismaClient } from "@prisma/client";
import { DataSource, DataSourceConfig } from "apollo-datasource";

export default class UserAPI extends DataSource {
  prisma: PrismaClient;
  context: Context;

  constructor({ prisma }: { prisma: PrismaClient }) {
    super();
    this.prisma = prisma;
  }

  initialize(config: DataSourceConfig<Context>): void {
    this.context = config.context;
  }

  async get() {
    const user = await this.prisma.user.findOne({
      where: {
        id: 1,
      },
    });
    return user;
  }

  async create({ name, email }) {
    const result = await this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return result;
  }
}
