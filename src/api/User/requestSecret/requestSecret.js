import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(loginSecret);
      const existUser = await prisma.$exists.user({ email });

      try {
        if (existUser) {
          await sendSecretMail(email, loginSecret);
          await prisma.updateUser({ data: { loginSecret }, where: { email } });
          return true;
        } else {
          throw Error("You don't have an account yet! Create One!!");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
