import { NextRequest, NextResponse } from 'next/server';
import { join, extname, normalize } from 'path';
import { readFile, stat } from 'fs/promises';

const getContentType = (filePath: string) => {
  const extension = extname(filePath).toLowerCase();
  switch (extension) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
};

type RouteParams = { path: string[] };

export const GET = async (
  _request: NextRequest,
  context: { params: RouteParams } | { params: Promise<RouteParams> }
) => {
  try {
    const { path: rawSegments } = await Promise.resolve(context.params);
    const segments = Array.isArray(rawSegments)
      ? rawSegments.filter((segment) => segment && segment.trim().length > 0)
      : [];

    if (segments.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    if (segments.some((segment) => segment.includes('..'))) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const relativePath = normalize(join(...segments));
    const filePath = join(process.cwd(), 'uploads', relativePath);

    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': getContentType(filePath),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving uploaded file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
};


