// ============================================================
// comments-admin module — shared types
// ============================================================

export interface CommentData {
  id: string;
  x: number;         // pozycja % (0-100) od lewej
  y: number;         // pozycja % (0-100) od góry
  view: string;      // identyfikator widoku/strony, np. "assets" lub "shelves"
  text: string;
  author: string;
  createdAt: string; // ISO 8601
  isAdminComment?: boolean;
}
