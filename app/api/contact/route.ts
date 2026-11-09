import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const targetEmail = 'aliarafat57000@gmail.com';
    const emailSubject = subject?.trim()
      ? `[Portfolio] ${subject.trim()} (from ${name.trim()})`
      : `[Portfolio] New message from ${name.trim()}`;

    const requestOrigin =
      req.headers.get('origin') ||
      req.headers.get('referer') ||
      process.env.APP_URL ||
      'https://aliarafat.app';

    // Direct inbox delivery via FormSubmit for aliarafat57000@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: requestOrigin,
        Referer: requestOrigin,
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        _replyto: email.trim(),
        _subject: emailSubject,
        subject: subject?.trim() || 'General Inquiry',
        message: message.trim(),
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('FormSubmit response error:', errText);
      return NextResponse.json(
        { error: 'Failed to deliver message to email provider' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent directly to Ali Arafat inbox!',
      data,
    });
  } catch (error) {
    console.error('Contact API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing message' },
      { status: 500 }
    );
  }
}
