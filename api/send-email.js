// api/send-email.js
// Vercel serverless function — sends results to user and BHI using EmailJS server-side

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userEmail, name, role, sector, stage, concern, domainScores, narrative, openQuestion } = req.body;

  const serviceId  = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey  = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    // EmailJS not yet configured — silently succeed so app still works
    return res.status(200).json({ ok: true, note: "EmailJS not configured" });
  }

  try {
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: userEmail,
       bhi_email: "info@businesshealthinstitute.co.uk", 
        name,
        role,
        sector,
        stage,
        concern,
        domain_scores: domainScores,
        narrative,
        open_question: openQuestion,
        reply_to: userEmail
      }
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(200).json({ ok: false, note: err });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    return res.status(200).json({ ok: false, note: error.message });
  }
}
