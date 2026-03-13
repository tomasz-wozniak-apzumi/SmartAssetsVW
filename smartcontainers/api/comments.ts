import Redis from 'ioredis';
import crypto from 'crypto';

// Inicjacja klienta na zewnątrz, aby używał puli połączeń na serwerach Vercel
const redisUrl = process.env.redisvw_REDIS_URL || '';
const redis = redisUrl ? new Redis(redisUrl, { connectTimeout: 10000 }) : null;

// Allow CORS specifically for development if needed
const allowCors = (fn: any) => async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = async (req: any, res: any) => {
  if (!redis) {
    console.error('Brak zmiennej redisvw_REDIS_URL');
    return res.status(500).json({ error: 'Database connection not configured' });
  }

  try {
    if (req.method === 'GET') {
      const commentsStr = await redis.get('comments');
      const comments = commentsStr ? JSON.parse(commentsStr) : [];
      return res.status(200).json(comments);
    }

    if (req.method === 'POST') {
      const body = req.body;
      const commentsStr = await redis.get('comments');
      const comments = commentsStr ? JSON.parse(commentsStr) : [];
      
      const newComment = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...body };
      comments.push(newComment);
      
      await redis.set('comments', JSON.stringify(comments));
      return res.status(201).json(newComment);
    }

    if (req.method === 'DELETE') {
      const id = req.query.id;
      if (!id) return res.status(400).json({ error: 'Missing id' });

      const commentsStr = await redis.get('comments');
      const comments = commentsStr ? JSON.parse(commentsStr) : [];
      
      const newComments = comments.map((c: any) => 
        c.id === id ? { ...c, isDeleted: true } : c
      );
      await redis.set('comments', JSON.stringify(newComments));
      return res.status(200).json({ success: true });
    }

    if (req.method === 'PATCH') {
      const id = req.query.id;
      const { isDeleted } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing id' });

      const commentsStr = await redis.get('comments');
      const comments = commentsStr ? JSON.parse(commentsStr) : [];
      
      const newComments = comments.map((c: any) => 
        c.id === id ? { ...c, isDeleted: !!isDeleted } : c
      );
      await redis.set('comments', JSON.stringify(newComments));
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API comments error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default allowCors(handler);
