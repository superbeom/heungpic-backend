import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { avatar, username, email, firstName, lastName, bio } = args;
      const { user } = request;

      return prisma.updateUser({
        where: {
          id: user.id
        },
        data: {
          avatar,
          username,
          email,
          firstName,
          lastName,
          bio
        }
      });
    }
  }
};
