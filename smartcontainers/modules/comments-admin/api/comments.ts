import Redis from 'ioredis';

// ============================================================
// comments-admin module — API handler (Vercel serverless / Express)
//
// Skopiuj ten plik do katalogu `api/` swojego projektu Vercel
// (np. api/comments.ts) lub użyj go jako Express route handler.
//
// Wymagana zmienna środowiskowa:
//   REDIS_URL — connection string do Redis (np. redis://...)
//
// Klucz Redis: 'comments_admin_data' (zmień stałą REDIS_KEY jeśli chcesz)
// ============================================================

const REDIS_KEY = 'comments_admin_data';

const redisUrl = process.env.REDIS_URL || process.env.redisvw_REDIS_URL || '';
const redis = redisUrl ? new Redis(redisUrl, { connectTimeout: 10000 }) : null;

const allowCors = (fn: any) => async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req: any, res: any) => {
  if (!redis) {
    console.error('[comments-admin] Brak zmiennej REDIS_URL / redisvw_REDIS_URL');
    return res.status(500).json({ error: 'Database connection not configured' });
  }

  try {
    if (req.method === 'GET') {
      const raw = await redis.get(REDIS_KEY);
      return res.status(200).json(raw ? JSON.parse(raw) : []);
    }

    if (req.method === 'POST') {
      const body = req.body;
      const raw = await redis.get(REDIS_KEY);
      const comments = raw ? JSON.parse(raw) : [];
      const newComment = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...body,
      };
      comments.push(newComment);
      await redis.set(REDIS_KEY, JSON.stringify(comments));
      return res.status(201).json(newComment);
    }

    if (req.method === 'DELETE') {
      const id = req.query.id;
      if (!id) return res.status(400).json({ error: 'Missing id' });

      const raw = await redis.get(REDIS_KEY);
      const comments = raw ? JSON.parse(raw) : [];
      const updated = comments.map((c: any) => 
        c.id === id ? { ...c, isDeleted: true } : c
      );
      await redis.set(REDIS_KEY, JSON.stringify(updated));
      return res.status(200).json({ success: true });
    }

    if (req.method === 'PATCH') {
      const id = req.query.id;
      const { isDeleted } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing id' });

      const raw = await redis.get(REDIS_KEY);
      const comments = raw ? JSON.parse(raw) : [];
      const updated = comments.map((c: any) => 
        c.id === id ? { ...c, isDeleted: !!isDeleted } : c
      );
      await redis.set(REDIS_KEY, JSON.stringify(updated));
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('[comments-admin] API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default allowCors(handler);
