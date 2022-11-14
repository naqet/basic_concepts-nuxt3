import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const loginUserSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  // Checks if there is body
  if (!body) {
    sendError(
      event,
      createError({ statusCode: 404, statusMessage: "Invalid request" })
    );
  }

  // Checks if body is valid
  try {
    loginUserSchema.parse(body);
  } catch (e) {
    sendError(
      event,
      createError({ statusCode: 404, statusMessage: "Invalid request" })
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (!user) {
      sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "Invalid username or password",
        })
      );
      return;
    }

    const isValidPassword = await bcrypt.compare(
      user.passwordHash,
      body.password
    );

    if (!isValidPassword) {
      sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "Invalid username or password",
        })
      );
      return;
    }

    // TODO: change it to proper login handling
    return "Success";
  } catch (e) {
    let statusMessage = "";
    if (e instanceof Error) {
      statusMessage = e.message;
    } else if (typeof e === "string") statusMessage = e;

    sendError(event, createError({ statusCode: 500, statusMessage }));
  }
});
