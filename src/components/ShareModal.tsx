
import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from './icons';

interface ShareModalProps {
  summary: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ summary, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-slate-gray rounded-lg shadow-2xl p-8 m-4 max-w-lg w-full transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-pale-mint mb-4">Share Your Adventure!</h2>
        <div className="bg-dark-slate p-4 rounded-lg text-stone whitespace-pre-wrap mb-6 min-h-[100px]">
          {summary}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-light-slate/50 hover:bg-light-slate/80 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="bg-mint hover:bg-light-mint text-dark-slate font-bold py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            {copied ? (
              <>
                <CheckIcon className="w-5 h-5 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <ClipboardIcon className="w-5 h-5 mr-2" />
                Copy Text
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
