export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const { name, email, message } = await request.json();

      const mailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalizations: [
            { to: [{ email: "hello@METAZAPP.COM", name: "Metazapp Admin" }] },
          ],
          from: { email: "no-reply@metazapp.com", name: "Metazapp Contact" },
          reply_to: [{ email, name }],
          subject: "New Contact Form Submission",
          content: [{ type: "text/plain", value: message }],
          dkim_domain: "metazapp.com",
          dkim_selector: "cfmail",
          dkim_private_key: Deno.env.get("DKIM_PRIVATE_KEY"),
        }),
      });

      if (!mailResponse.ok) {
        return new Response("Failed to send email", { status: 500 });
      }

      return new Response("Email sent successfully", { status: 200 });
    } catch (error) {
      return new Response("Invalid request", { status: 400 });
    }
  },
};
