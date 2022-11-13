import { z } from "zod";

const loginUserSchema = z.object({
	username: z.string(),
	password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
	const body = await useBody(event);
	if (!body) {
		event.res.statusCode = 404;
		event.res.statusMessage = "Invalid request";
		return;
	}
	loginUserSchema.parse(body);
});
