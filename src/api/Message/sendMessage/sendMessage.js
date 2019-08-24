import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, toId } = args;
      const { user } = request;
      let room;
      const message = {
        text,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: { id: toId }
        }
      };

      // 둘(user.id와 toId) 사이에 이미 채팅방이 존재하는지 확인
      const existRoom = await prisma.$exists.room({
        AND: [
          { participants_some: { id: user.id } },
          { participants_some: { id: toId } }
        ]
      });

      if (existRoom) {
        // 이미 채팅방이 존재하는 경우 - 채팅방 update
        room = await prisma.user({ id: user.id }).rooms({
          where: {
            participants_some: { id: toId }
          }
        });
        const roomId = room[0].id;

        room = await prisma.updateRoom({
          where: {
            id: roomId
          },
          data: {
            messages: {
              create: message
            }
          }
        });
      } else {
        // 채팅방이 존재하지 않는 경우 - 채팅방 create
        room = await prisma.createRoom({
          participants: {
            connect: [{ id: user.id }, { id: toId }]
          },
          messages: {
            create: message
          }
        });
      }

      return room;
    }
  }
};
