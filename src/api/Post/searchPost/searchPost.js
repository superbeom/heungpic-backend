import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: (_, args) => {
      const { term } = args;

      return prisma.posts({
        where: {
          OR: [
            {
              location_contains: term
            },
            {
              caption_contains: term
            }
          ]
        }
      });
    }
  }
};
