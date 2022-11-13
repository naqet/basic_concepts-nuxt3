export default defineEventHandler((event) => {
	const body = useBody(event);
	if (!body) {
		event.res.statusCode = 404;
		event.res.statusMessage = "Invalid request";
		return;
	}
});
