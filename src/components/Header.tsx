
import React from 'react';
import { MountainIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-gray/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <MountainIcon className="h-8 w-8 text-mint" />
            <h1 className="text-3xl font-bold text-stone ml-3">HikeLog</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

