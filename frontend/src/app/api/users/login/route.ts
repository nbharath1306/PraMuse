import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/users/login  — register or login
export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    if (!email || !name) return NextResponse.json({ error: 'email and name required' }, { status: 400 });

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          password_hash: 'oauth_pending',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=43302E&color=FFF1B5&bold=true`,
          trust_score: 5.0,
        },
      });
    }
    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
