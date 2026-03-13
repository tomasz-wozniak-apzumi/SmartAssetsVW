import React from 'react';
import type { CommentData } from '../types';
import { X, Trash2, RotateCcw, MessageSquare } from 'lucide-react';

interface AdminCommentsPanelProps {
  comments: CommentData[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
}

const AdminCommentsPanel: React.FC<AdminCommentsPanelProps> = ({ comments, onClose, onDelete, onRestore }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-[100] border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-blue-500" size={20} />
          <h2 className="font-bold text-gray-800">Panel Komentarzy</h2>
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
            ADMIN
          </span>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MessageSquare size={48} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">Brak komentarzy w systemie</p>
          </div>
        ) : (
          comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((comment) => (
            <div 
              key={comment.id} 
              className={`p-4 rounded-xl border transition-all ${
                comment.isDeleted 
                  ? 'bg-gray-50 border-gray-100 opacity-75' 
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${comment.isAdminComment ? 'text-red-600' : 'text-blue-600'}`}>
                    {comment.author} {comment.isAdminComment && '(Admin)'}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-1">
                  {comment.isDeleted ? (
                    <button 
                      onClick={() => onRestore(comment.id)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Przywróć komentarz"
                    >
                      <RotateCcw size={14} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => onDelete(comment.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Usuń komentarz"
                    >
                      <Trash2 size={14} />
                    </button>
                  ) }
                </div>
              </div>
              
              <p className={`text-sm ${comment.isDeleted ? 'text-gray-400 line-through' : 'text-gray-700'} break-words`}>
                {comment.text}
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-medium">
                  Widok: {comment.view}
                </span>
                {comment.isDeleted && (
                  <span className="text-[10px] text-red-500 font-bold uppercase italic">
                    Usunięty
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <span>Łącznie: {comments.length}</span>
          <span>Aktywne: {comments.filter(c => !c.isDeleted).length}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminCommentsPanel;
