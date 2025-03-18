interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Handle actual POST request
    if (request.method === "POST") {
      try {
        // Parse the request body
        const payload: EmailPayload = await request.json();
        const { name, email, subject, message } = payload;

        // Validate required fields
        if (!name || !email || !subject || !message) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Missing required fields",
            }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }

        // Prepare email data for MailChannels
        const emailData = {
          from: {
            email: "no-reply@mailchannels.net",
            name: "Metazapp Contact Form",
          },
          to: [
            {
              email: "hello@metazapp.com",
              name: "Metazapp Team",
            },
          ],
          subject: `Contact Form: ${subject}`,
          content: [
            {
              type: "text/plain",
              value: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`,
            },
            {
              type: "text/html",
              value: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
              `,
            },
          ],
        };

        // Send email using MailChannels API
        const mailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (mailResponse.status >= 200 && mailResponse.status < 300) {
          return new Response(
            JSON.stringify({
              success: true,
              message: "Email sent successfully",
            }),
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        } else {
          const mailResponseText = await mailResponse.text();
          return new Response(
            JSON.stringify({
              success: false,
              error: `Failed to send email: ${mailResponseText}`,
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }
      } catch (error) {
        return new Response(
          JSON.stringify({
            success: false,
            error: error.message || "An unexpected error occurred",
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
    }

    // If neither OPTIONS nor POST, return 405 Method Not Allowed
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Allow": "POST, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};