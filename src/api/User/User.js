import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    followers: ({ id }) => prisma.user({ id }).followers(),
    following: ({ id }) => prisma.user({ id }).following(),
    posts: ({ id }) => prisma.user({ id }).posts(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),

    fullName: parent => `${parent.firstName} ${parent.lastName}`
  }
};
