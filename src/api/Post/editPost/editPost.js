import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id: postId, caption, location, action } = args;
      const { user } = request;

      const post = await prisma.$exists.post({
        id: postId,
        user: {
          id: user.id
        }
      });

      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            where: {
              id: postId
            },
            data: {
              caption,
              location
            }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id: postId });
        }
      } else {
        throw Error("You can't do that!!");
      }
    }
  }
};
