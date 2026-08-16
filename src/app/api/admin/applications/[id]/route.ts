import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { APPLICATION_STATUS_LABELS } from "@/lib/content";

const patchSchema = z.object({
  status: z
    .enum(Object.keys(APPLICATION_STATUS_LABELS) as [string, ...string[]])
    .optional(),
  internalNotes: z.string().max(5000).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Daten." }, { status: 422 });
  }

  const data: { status?: ApplicationStatus; internalNotes?: string } = {};
  if (parsed.data.status) data.status = parsed.data.status as ApplicationStatus;
  if (parsed.data.internalNotes !== undefined)
    data.internalNotes = parsed.data.internalNotes;

  try {
    const updated = await prisma.application.update({
      where: { id },
      data,
    });
    return NextResponse.json({ ok: true, application: updated });
  } catch {
    return NextResponse.json({ error: "Bewerbung nicht gefunden." }, { status: 404 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bewerbung nicht gefunden." }, { status: 404 });
  }
}
