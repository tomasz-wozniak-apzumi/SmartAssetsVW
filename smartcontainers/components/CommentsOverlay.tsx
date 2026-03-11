import React, { useState, MouseEvent } from 'react';
import { useComments } from '../hooks/useComments';
import { useAdminMode } from '../hooks/useAdminMode';
import { MessageCircle, X, Send, Trash2 } from 'lucide-react';

interface CommentsOverlayProps {
  currentView: string;
  isMobile?: boolean;
}

const CommentsOverlay: React.FC<CommentsOverlayProps> = ({ currentView, isMobile }) => {
  const { comments, addComment, deleteComment, isLoading } = useComments(currentView);
  const isAdmin = useAdminMode();
  const [isCommentingMode, setIsCommentingMode] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [collapsedAdminComments, setCollapsedAdminComments] = useState<Set<string>>(new Set());
  
  // Stan dla nowo tworzonego komentarza
  const [newPin, setNewPin] = useState<{ x: number, y: number } | null>(null);
  const [newText, setNewText] = useState('');

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    // Jeśli nie jesteśmy w trybie dodawania lub kliknięto w coś innego niż tło nakładki
    if (!isCommentingMode || e.target !== e.currentTarget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewPin({ x, y });
    setNewText('');
  };

  const handleCreateSubmit = async () => {
    if (!newPin || !newText.trim()) return;

    await addComment({
      x: newPin.x,
      y: newPin.y,
      view: currentView,
      text: newText,
      author: isAdmin ? 'Admin' : 'User', // w prawdziwej aplikacji pobierane z kontekstu auth
      isAdminComment: isAdmin,
    });

    setNewPin(null);
    setNewText('');
    setIsCommentingMode(false);
  };

  const cancelNewPin = () => {
    setNewPin(null);
    setNewText('');
  };

  return (
    <>
      {/* Floating button do włączania trybu komentarzy */}
      <div className={`${isMobile ? 'absolute bottom-24 right-4' : 'fixed bottom-6 right-6'} z-50`}>
        <button
          onClick={() => setIsCommentingMode(!isCommentingMode)}
          className={`p-4 rounded-full shadow-lg text-white transition-all ${
            isCommentingMode ? 'bg-red-500 hover:bg-red-600' : 'bg-[#007bff] hover:bg-blue-600'
          }`}
          title={isCommentingMode ? 'Wyjdź z trybu komentarzy' : 'Dodaj komentarz'}
        >
          {isCommentingMode ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Nakładka na cały ekran - gdy tryb komentarzy, łapie kliknięcia */}
      <div 
        className={`absolute inset-0 z-40 ${isCommentingMode ? 'cursor-crosshair bg-black/5' : 'pointer-events-none'}`}
        onClick={handleOverlayClick}
      >
        {/* Renderowanie istniejących komentarzy */}
        {!isLoading && comments.map((comment) => (
          <div 
            key={comment.id}
            className={`absolute z-50 pointer-events-auto ${comment.isAdminComment ? 'z-[60]' : ''}`}
            style={{ left: `${comment.x}%`, top: `${comment.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (comment.isAdminComment) {
                  setCollapsedAdminComments(prev => {
                    const next = new Set(prev);
                    if (next.has(comment.id)) next.delete(comment.id);
                    else next.add(comment.id);
                    return next;
                  });
                } else {
                  setActiveCommentId(activeCommentId === comment.id ? null : comment.id);
                }
              }}
              className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform ${
                comment.isAdminComment
                  ? 'bg-red-600 text-white'
                  : 'bg-yellow-400 text-yellow-900'
              }`}
            >
              {comment.isAdminComment ? '!' : comment.author.charAt(0).toUpperCase()}
            </button>

            {/* Chmurka z treścią */}
            {(comment.isAdminComment ? !collapsedAdminComments.has(comment.id) : activeCommentId === comment.id) && (
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-lg shadow-xl border p-3 text-sm flex flex-col gap-2 ${
                comment.isAdminComment 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-white border-gray-100'
              }`}>
                 <div className="flex justify-between items-start mb-1">
                    <span className={`font-bold ${comment.isAdminComment ? 'text-red-800' : 'text-gray-800'}`}>
                      {comment.author}
                    </span>
                    {isAdmin && (
                      <button 
                        onClick={() => deleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                        title="Usuń komentarz"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                 </div>
                 <p className={`${comment.isAdminComment ? 'text-red-900' : 'text-gray-600'} break-words flex-1`}>{comment.text}</p>
                 <span className={`text-[10px] mt-1 ${comment.isAdminComment ? 'text-red-500' : 'text-gray-400'}`}>
                   {new Date(comment.createdAt).toLocaleString()}
                 </span>
              </div>
            )}
          </div>
        ))}

        {/* Podgląd nowo tworzonego komentarza */}
        {newPin && (
          <div 
            className="absolute z-50 pointer-events-auto"
            style={{ left: `${newPin.x}%`, top: `${newPin.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-md flex items-center justify-center text-white animate-pulse">
               +
            </div>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl border border-blue-100 p-3 flex flex-col gap-2">
              <textarea
                autoFocus
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Wpisz komentarz..."
                className="w-full text-sm p-2 border border-gray-200 rounded resize-none min-h-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
              />
              <div className="flex justify-end gap-2 mt-1">
                 <button 
                   onClick={cancelNewPin}
                   className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded transition-colors"
                 >
                   Anuluj
                 </button>
                 <button 
                   onClick={handleCreateSubmit}
                   disabled={!newText.trim()}
                   className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded flex items-center gap-1 transition-colors"
                 >
                   Zapisz <Send size={12} />
                 </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentsOverlay;
