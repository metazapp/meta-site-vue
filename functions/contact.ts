interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Main fetch event handler
export default {
  async fetch(request: Request) {
    if (request.method === "POST") {
      try {
        const payload: EmailPayload = await request.json();
        const { name, email, subject, message } = payload;

        const emailData = {
          from: "noreply@metazapp.com",
          to: "hello@metazapp.com",
          subject: `Contact Form: ${subject}`,
          text: `Name: ${name} Email: ${email} Subject: ${subject}

Message: ${message} , html:

<h2>New Contact Form Submission</h2> <p><strong>Name:</strong> ${name}</p> <p><strong>Email:</strong> ${email}</p> <p><strong>Subject:</strong> ${subject}</p> <h3>Message:</h3> <p>${message.replace(/\n/g, '<br>')}</p> ` };
await fetch('https://api.mailchannels.net/tx/v1/send', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(emailData),
});

return new Response(JSON.stringify({ success: true }), {
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
} catch (error) {
return new Response(JSON.stringify({ success: false, error: error.message }), {
  status: 500,
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
}
} else if (request.method === "OPTIONS") {
// Handling CORS for OPTIONS request
return new Response(null, {
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
},
});
}

return new Response('Method Not Allowed', { status: 405 });
}
};
 
 
