// This file sets up the Cloudflare Worker to handle API requests and interact with the optional D1 database.

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (url.pathname === "/api/guestbook" && request.method === "GET") {
            // Fetch all guestbook messages
            const { results } = await env.DB.prepare(
                "SELECT name, message, created_at FROM guestbook ORDER BY created_at DESC LIMIT 20"
            ).all();
            return Response.json({ messages: results });
        }

        if (url.pathname === "/api/guestbook" && request.method === "POST") {
            const data = await request.json();
            if (!data.name || !data.message) {
                return new Response("Missing name or message", { status: 400 });
            }
            await env.DB.prepare(
                "INSERT INTO guestbook (name, message) VALUES (?, ?)"
            ).bind(data.name, data.message).run();
            return new Response("OK", { status: 200 });
        }

        return new Response("Not found", { status: 404 });
    }
};