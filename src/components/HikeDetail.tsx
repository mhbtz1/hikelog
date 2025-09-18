
import React from 'react';
import { Hike, Difficulty } from '../types';
import { ShareIcon, CalendarIcon, PinIcon, ChartBarIcon, SunIcon } from './icons';

interface HikeDetailProps {
  hike: Hike;
  onShare: (hike: Hike) => void;
  isSharing: boolean;
}

const getDifficultyClass = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return 'bg-green-500 text-dark-slate';
    case Difficulty.Moderate:
      return 'bg-yellow-500 text-dark-slate';
    case Difficulty.Hard:
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};


const HikeDetail: React.FC<HikeDetailProps> = ({ hike, onShare, isSharing }) => {
  if (!hike) return null;

  return (
    <div className="bg-slate-gray/30 rounded-lg p-6 shadow-xl animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-4xl font-extrabold text-pale-mint">{hike.name}</h2>
          <div className="flex items-center text-light-slate mt-2">
            <PinIcon className="w-5 h-5 mr-2" />
            <p>{hike.location}</p>
          </div>
        </div>
        <button
            onClick={() => onShare(hike)}
            disabled={isSharing}
            className="bg-earth hover:bg-earth/80 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isSharing ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
            </>
            ) : (
            <>
                <ShareIcon className="w-5 h-5 mr-2" />
                Share
            </>
            )}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 text-center">
        <div className="bg-dark-slate p-3 rounded-lg">
          <div className="flex items-center justify-center text-light-slate mb-1"><CalendarIcon className="w-4 h-4 mr-2" /> Date</div>
          <p className="font-semibold text-stone">{hike.date}</p>
        </div>
        <div className="bg-dark-slate p-3 rounded-lg">
           <div className="flex items-center justify-center text-light-slate mb-1"><ChartBarIcon className="w-4 h-4 mr-2" /> Distance</div>
          <p className="font-semibold text-stone">{hike.distance} mi</p>
        </div>
        <div className="bg-dark-slate p-3 rounded-lg col-span-2 md:col-span-1">
          <div className="flex items-center justify-center text-light-slate mb-1"><SunIcon className="w-4 h-4 mr-2" /> Difficulty</div>
          <p className={`font-semibold text-sm px-3 py-1 rounded-full inline-block ${getDifficultyClass(hike.difficulty)}`}>{hike.difficulty}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-pale-mint mb-2">My Notes</h3>
        <p className="text-stone bg-dark-slate p-4 rounded-lg whitespace-pre-wrap">{hike.notes}</p>
      </div>

      {hike.photos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-pale-mint mb-2">Photos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hike.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Hike photo ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HikeDetail;
