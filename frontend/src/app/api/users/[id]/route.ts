import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/users/:id — fetch public profile with skills and reviews
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        avatar: true,
        trust_score: true,
        created_at: true,
        skills: {
          orderBy: { created_at: 'desc' },
          select: { id: true, title: true, seeking: true, category: true, level: true, availability: true, created_at: true },
        },
        reviews_received: {
          orderBy: { created_at: 'desc' },
          take: 10,
          select: {
            id: true,
            rating: true,
            feedback: true,
            created_at: true,
            reviewer: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/users/:id — update profile
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        avatar: body.avatar || null,
      },
    });
    return NextResponse.json(user);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
