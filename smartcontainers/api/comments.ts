import Redis from 'ioredis';

export const config = {
  runtime: 'edge',
};

// Inicjacja klienta na zewnątrz, aby używał puli połączeń na serwerach Vercel
const redisUrl = process.env.redisvw_REDIS_URL || '';
const redis = redisUrl ? new Redis(redisUrl) : null;

export default async function handler(request: Request) {
  const headers = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (!redis) {
    console.error('Brak zmiennej redisvw_REDIS_URL');
    return new Response(JSON.stringify({ error: 'Database connection not configured' }), { status: 500, headers });
  }

  try {
    if (request.method === 'GET') {
      const commentsStr = await redis.get('comments');
      const comments = commentsStr ? JSON.parse(commentsStr) : [];
      return new Response(JSON.stringify(comments), { status: 200, headers });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const commentsStr = await redis.get('comments');
      const comments = commentsStr ? JSON.parse(commentsStr) : [];
      
      const newComment = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...body };
      comments.push(newComment);
      
      await redis.set('comments', JSON.stringify(comments));
      return new Response(JSON.stringify(newComment), { status: 201, headers });
    }

    if (request.method === 'DELETE') {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
      if (!id) return new Response('Missing id', { status: 400, headers });

      const commentsStr = await redis.get('comments');
      const comments = commentsStr ? JSON.parse(commentsStr) : [];
      
      const newComments = comments.filter((c: any) => c.id !== id);
      await redis.set('comments', JSON.stringify(newComments));
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    }

    return new Response('Method Not Allowed', { status: 405, headers });
  } catch (error) {
    console.error('API comments error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers });
  }
}
