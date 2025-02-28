import mailgun from 'mailgun-js';

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY!,
  domain: process.env.MAILGUN_DOMAIN!,
});

type EmailData = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: EmailData) {
  const data = {
    from: process.env.MAILGUN_FROM_EMAIL!,
    to,
    subject,
    text,
    html,
  };

  try {
    await mg.messages().send(data);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to our SaaS platform!',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1>Welcome to our platform!</h1>
        <p>We're excited to have you on board. Here are a few things you can do to get started:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore our features</li>
          <li>Upgrade to a paid plan</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  return sendEmail({
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1>Reset your password</h1>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetLink}" style="padding: 10px 15px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}
