import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    followers: ({ id }) => prisma.user({ id }).followers(),
    following: ({ id }) => prisma.user({ id }).following(),
    posts: ({ id }) => prisma.user({ id }).posts(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),

    fullName: parent => `${parent.firstName} ${parent.lastName}`,

    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),

    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),

    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_some: { id } } })
        .aggregate()
        .count(),

    isFollowing: (parent, _, { request }) => {
      const { id: parentId } = parent;
      const { user } = request;

      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    isSelf: (parent, _, { request }) => {
      const { id: parentId } = parent;
      const { user } = request;

      return user.id === parentId;
    }
  }
};
