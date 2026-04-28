import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/users/:id — update profile
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        avatar: body.avatar,
      },
    });
    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
