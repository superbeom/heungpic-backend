import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    user: ({ id }) => prisma.post({ id }).user(),
    files: ({ id }) => prisma.post({ id }).files(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    comments: ({ id }) => prisma.post({ id }).comments()
  }
};
