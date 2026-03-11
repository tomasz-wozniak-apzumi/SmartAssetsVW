// ============================================================
// comments-admin — barrel eksportów
//
// Użycie w nowym projekcie:
//   import { CommentsOverlay } from './modules/comments-admin';
//   import { useComments, useAdminMode } from './modules/comments-admin';
//   import type { CommentData } from './modules/comments-admin';
// ============================================================

export { default as CommentsOverlay } from './components/CommentsOverlay';
export { useComments } from './hooks/useComments';
export { useAdminMode } from './hooks/useAdminMode';
export type { CommentData } from './types';
