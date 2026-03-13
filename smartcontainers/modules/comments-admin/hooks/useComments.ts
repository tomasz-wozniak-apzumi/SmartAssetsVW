import { useState, useEffect, useCallback } from 'react';
import type { CommentData } from '../types';

// ============================================================
// comments-admin module — useComments
//
// Parametry:
//   currentView  — identyfikator bieżącego widoku (komentarze są filtrowane per-view)
//   apiUrl       — opcjonalny endpoint API (domyślnie '/api/comments')
//                  Dopasuj do routingu swojego projektu.
//
// Fallback: gdy API nie odpowiada, komentarze zapisywane są w localStorage
//           pod kluczem 'comments_admin_mock'.
// ============================================================

export function useComments(currentView: string, apiUrl = '/api/comments') {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setComments(data);
    } catch {
      // Fallback lokalny
      const localData = localStorage.getItem('comments_admin_mock');
      if (localData) {
        setComments(JSON.parse(localData));
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 10000); // polling co 10s
    return () => clearInterval(interval);
  }, [fetchComments]);

  const addComment = async (commentData: Omit<CommentData, 'id' | 'createdAt'>) => {
    const newComment: CommentData = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...commentData,
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      if (res.ok) {
        const saved = await res.json();
        setComments(prev => [...prev, saved]);
        return saved;
      }
      throw new Error('Fallback');
    } catch {
      const current = [...comments, newComment];
      localStorage.setItem('comments_admin_mock', JSON.stringify(current));
      setComments(current);
      return newComment;
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setComments(prev => prev.filter(c => c.id !== id));
        return;
      }
      throw new Error('Fallback');
    } catch {
      const updated = comments.map(c => 
        c.id === id ? { ...c, isDeleted: true } : c
      );
      localStorage.setItem('comments_admin_mock', JSON.stringify(updated));
      setComments(updated);
    }
  };

  const activeComments = comments.filter(c => c.view === currentView && !c.isDeleted);

  return {
    comments: activeComments,
    allComments: comments,
    isLoading,
    addComment,
    deleteComment,
    refresh: fetchComments,
  };
}
