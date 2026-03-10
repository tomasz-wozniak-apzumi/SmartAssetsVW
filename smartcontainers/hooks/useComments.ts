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
      const res = await fetch('/api/comments');
      if (!res.ok) throw new Error('API failed, falling back to local');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      // Fallback lokalny
      const localData = localStorage.getItem('mockComments');
      if (localData) {
        setComments(JSON.parse(localData));
      }
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
    const newComment: CommentData = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...commentData
    };

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      if (res.ok) {
        const savedComment = await res.json();
        setComments(prev => [...prev, savedComment]);
        return savedComment;
      } else {
        throw new Error('Fallback to local handling');
      }
    } catch (err) {
      // Fallback lokalny
      const currentComments = [...comments, newComment];
      localStorage.setItem('mockComments', JSON.stringify(currentComments));
      setComments(currentComments);
      return newComment;
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const res = await fetch(`/api/comments?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setComments(prev => prev.filter(c => c.id !== id));
      } else {
         throw new Error('Fallback');
      }
    } catch (err) {
      // Fallback lokalny
      const newComments = comments.filter(c => c.id !== id);
      localStorage.setItem('mockComments', JSON.stringify(newComments));
      setComments(newComments);
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
