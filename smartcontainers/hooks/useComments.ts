import { useState, useEffect, useCallback } from 'react';

export interface CommentData {
  id: string;
  x: number;
  y: number;
  view: string;
  text: string;
  author: string;
  createdAt: string;
}

export function useComments(currentView: string) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      // In development environments without Vercel CLI, we might need a full URL if not using proxy
      // Assuming we either use Vercel CLI or standard proxy in Vite
      const res = await fetch('/api/comments');
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 10000); // Polling co 10s
    return () => clearInterval(interval);
  }, [fetchComments]);

  const addComment = async (commentData: Omit<CommentData, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments(prev => [...prev, newComment]);
        return newComment;
      }
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const res = await fetch(`/api/comments?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setComments(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete comment', err);
    }
  };

  // Filtrowanie komentarzy tylko dla aktywnego widoku (tabeli)
  const activeComments = comments.filter(c => c.view === currentView);

  return { 
    comments: activeComments, 
    allComments: comments,
    isLoading, 
    addComment, 
    deleteComment, 
    refresh: fetchComments 
  };
}
