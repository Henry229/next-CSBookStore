// pages/api/send-mail.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 메일 설정
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: NextRequest, res: NextResponse) {
  // if (req.method === 'POST') {
  const body = await req.json();
  const { name, email, phone, message } = body;

  try {
    // 메일 옵션 설정
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'recipient-email@example.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from your website contact form. Here are the details:',
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}`,
    };

    // 메일 전송
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // 성공 응답 보내기
    // res.status(200).json({ message: 'Mail sent successfully' });
    return NextResponse.json('Mail sent successfully', { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('Error Message :', err.message);
    console.error('Stack Trace :', err.stack);
    console.error('[Sending Mail ]:', error);
    // res.status(500).json({ message: 'Failed to send mail' });
    return NextResponse.json('Failed to send mail!', { status: 500 });
  }
}
// res.setHeader('Allow', ['POST']);
// res.status(405).end(`Method ${req.method} Not Allowed`);
// return NextResponse.json(`Method ${req.method} Not Allowed `, {
// status: 500,
// });
// }
// }

// export { sendMail as POST };
