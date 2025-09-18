
import React from 'react';
import { Hike, Difficulty } from '../types';

interface HikeListProps {
  hikes: Hike[];
  onSelectHike: (hike: Hike) => void;
  selectedHikeId?: string;
}

const getDifficultyClass = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return 'bg-green-500/20 text-green-300';
    case Difficulty.Moderate:
      return 'bg-yellow-500/20 text-yellow-300';
    case Difficulty.Hard:
      return 'bg-red-500/20 text-red-300';
    default:
      return 'bg-gray-500/20 text-gray-300';
  }
};

const HikeListItem: React.FC<{hike: Hike, onSelect: (hike: Hike) => void, isSelected: boolean}> = ({ hike, onSelect, isSelected }) => (
    <li
        onClick={() => onSelect(hike)}
        className={`p-4 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
        isSelected
            ? 'bg-mint/30 shadow-lg ring-2 ring-mint'
            : 'bg-dark-slate hover:bg-light-slate/20'
        }`}
    >
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-stone text-lg">{hike.name}</h3>
                <p className="text-sm text-light-slate">{hike.location}</p>
            </div>
            <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyClass(hike.difficulty)}`}
            >
                {hike.difficulty}
            </span>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-light-slate">
            <span>{hike.date}</span>
            <span>{hike.distance} mi</span>
        </div>
    </li>
);

const HikeList: React.FC<HikeListProps> = ({ hikes, onSelectHike, selectedHikeId }) => {
  return (
    <ul className="space-y-2 max-h-[calc(100vh-15rem)] overflow-y-auto pr-2">
      {hikes.map(hike => (
        <HikeListItem 
            key={hike.id} 
            hike={hike}
            onSelect={onSelectHike}
            isSelected={hike.id === selectedHikeId}
        />
      ))}
    </ul>
  );
};

export default HikeList;
