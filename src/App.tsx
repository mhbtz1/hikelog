
import React, { useState, useCallback } from 'react';
import { Hike, Difficulty } from './types';
import Header from './components/Header';
import HikeList from './components/HikeList';
import HikeDetail from './components/HikeDetail';
import HikeForm from './components/HikeForm';
import ShareModal from './components/ShareModal';
import { generateHikeSummary } from './services/geminiService';
import { PlusIcon, MountainIcon } from './components/icons';

// Mock data for initial state
const initialHikes: Hike[] = [
  {
    id: '1',
    name: 'Emerald Lake Trail',
    location: 'Rocky Mountain National Park, CO',
    date: '2023-08-15',
    notes: 'Absolutely stunning views of the lake and surrounding peaks. Wildflowers were in full bloom. A bit crowded but worth it. Saw a marmot near the top!',
    photos: ['https://picsum.photos/seed/hike1/800/600', 'https://picsum.photos/seed/hike2/800/600'],
    difficulty: Difficulty.Moderate,
    distance: 3.6,
  },
  {
    id: '2',
    name: 'Zion Narrows Riverside Walk',
    location: 'Zion National Park, UT',
    date: '2023-09-22',
    notes: 'Easy, paved trail perfect for a relaxing afternoon. The views of the Virgin River and the canyon walls are incredible. Great for all skill levels.',
    photos: ['https://picsum.photos/seed/hike3/800/600'],
    difficulty: Difficulty.Easy,
    distance: 2.2,
  },
];

const App: React.FC = () => {
  const [hikes, setHikes] = useState<Hike[]>(initialHikes);
  const [selectedHike, setSelectedHike] = useState<Hike | null>(null);
  const [view, setView] = useState<'list' | 'form'>('list');

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareableSummary, setShareableSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleSelectHike = useCallback((hike: Hike) => {
    setSelectedHike(hike);
    setView('list');
  }, []);

  const handleAddNewHikeClick = () => {
    setSelectedHike(null);
    setView('form');
  };

  const handleSaveHike = (newHike: Hike) => {
    setHikes(prevHikes => [newHike, ...prevHikes]);
    setView('list');
    setSelectedHike(newHike);
  };
  
  const handleCancelAddHike = () => {
    setView('list');
  };

  const handleGenerateSummary = async (hike: Hike) => {
    setIsLoadingSummary(true);
    try {
      const summary = await fetch('http://0.0.0.0:3003', {
        body: JSON.stringify(hike),
        headers: { "Content-Type": "application/json"}
      }).then( async (res) => { return (await res.json())})
      setShareableSummary(summary);
      setIsShareModalOpen(true);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setShareableSummary("Sorry, we couldn't generate a summary at this time. Please try again later.");
      setIsShareModalOpen(true);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-slate">
      <Header />
      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 bg-slate-gray/30 rounded-lg p-4 h-fit sticky top-24">
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-pale-mint">My Hikes</h2>
              <button
                onClick={handleAddNewHikeClick}
                className="bg-mint hover:bg-light-mint text-dark-slate font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                New Hike
              </button>
          </div>
          <HikeList hikes={hikes} onSelectHike={handleSelectHike} selectedHikeId={selectedHike?.id!} />
        </aside>

        <section className="md:col-span-2">
          {view === 'list' && !selectedHike && (
            <div className="flex flex-col items-center justify-center bg-slate-gray/30 rounded-lg p-8 h-[calc(100vh-12rem)]">
              <MountainIcon className="w-24 h-24 text-light-slate mb-4" />
              <h3 className="text-3xl font-bold text-stone">Welcome to HikeLog</h3>
              <p className="text-light-slate mt-2 text-center">Select a hike from the list to see details, or add a new one to start your journal.</p>
            </div>
          )}

          {view === 'list' && selectedHike && (
            <HikeDetail 
              hike={selectedHike} 
              onShare={handleGenerateSummary} 
              isSharing={isLoadingSummary}
            />
          )}

          {view === 'form' && (
            <HikeForm onSave={handleSaveHike} onCancel={handleCancelAddHike} />
          )}
        </section>
      </main>

      {isShareModalOpen && (
        <ShareModal
          summary={shareableSummary}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
