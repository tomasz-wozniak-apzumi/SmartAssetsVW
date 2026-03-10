import { kv } from '@vercel/kv';

export default async function handler(request: Request) {
  // Allow CORS specifically for development if needed
  const headers = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    if (request.method === 'GET') {
      const comments = (await kv.get('comments')) || [];
      return new Response(JSON.stringify(comments), { status: 200, headers });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const comments = (await kv.get<any[]>('comments')) || [];
      const newComment = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...body };
      comments.push(newComment);
      await kv.set('comments', comments);
      return new Response(JSON.stringify(newComment), { status: 201, headers });
    }

    if (request.method === 'DELETE') {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
      if (!id) return new Response('Missing id', { status: 400, headers });

      const comments = (await kv.get<any[]>('comments')) || [];
      const newComments = comments.filter((c: any) => c.id !== id);
      await kv.set('comments', newComments);
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    }

    return new Response('Method Not Allowed', { status: 405, headers });
  } catch (error) {
    console.error('API comments error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers });
  }
}
