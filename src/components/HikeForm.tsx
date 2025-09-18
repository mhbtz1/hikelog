
import React, { useState } from 'react';
import { Hike, Difficulty } from '../types';

interface HikeFormProps {
  onSave: (hike: Hike) => void;
  onCancel: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const HikeForm: React.FC<HikeFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Moderate);
  const [distance, setDistance] = useState<number | ''>('');

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const base64Photos = await Promise.all(files.map(fileToBase64));
      setPhotos(prev => [...prev, ...base64Photos]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !date || !distance) {
        alert('Please fill out all required fields.');
        return;
    }
    const newHike: Hike = {
      id: crypto.randomUUID(),
      name,
      location,
      date,
      notes,
      photos,
      difficulty,
      distance: Number(distance),
    };
    onSave(newHike);
  };

  return (
    <div className="bg-slate-gray/30 rounded-lg p-6 shadow-xl animate-fade-in">
        <h2 className="text-3xl font-bold text-pale-mint mb-6">Add a New Hike</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-light-slate">Hike Name</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-dark-slate border-slate-gray rounded-md shadow-sm py-2 px-3 text-stone focus:outline-none focus:ring-mint focus:border-mint" required />
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-light-slate">Location</label>
                <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full bg-dark-slate border-slate-gray rounded-md shadow-sm py-2 px-3 text-stone focus:outline-none focus:ring-mint focus:border-mint" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-light-slate">Date</label>
                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full bg-dark-slate border-slate-gray rounded-md shadow-sm py-2 px-3 text-stone focus:outline-none focus:ring-mint focus:border-mint" required />
                </div>
                <div>
                    <label htmlFor="distance" className="block text-sm font-medium text-light-slate">Distance (miles)</label>
                    <input type="number" id="distance" value={distance} onChange={e => setDistance(parseFloat(e.target.value) || '')} step="0.1" min="0" className="mt-1 block w-full bg-dark-slate border-slate-gray rounded-md shadow-sm py-2 px-3 text-stone focus:outline-none focus:ring-mint focus:border-mint" required />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-light-slate">Difficulty</label>
                <div className="mt-2 flex space-x-4">
                    {Object.values(Difficulty).map(level => (
                        <label key={level} className="flex items-center">
                            <input type="radio" name="difficulty" value={level} checked={difficulty === level} onChange={() => setDifficulty(level)} className="form-radio h-4 w-4 text-mint bg-dark-slate border-slate-gray focus:ring-mint" />
                            <span className="ml-2 text-stone">{level}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-light-slate">Notes</label>
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={4} className="mt-1 block w-full bg-dark-slate border-slate-gray rounded-md shadow-sm py-2 px-3 text-stone focus:outline-none focus:ring-mint focus:border-mint"></textarea>
            </div>
            <div>
                <label htmlFor="photos" className="block text-sm font-medium text-light-slate">Upload Photos</label>
                <input type="file" id="photos" onChange={handlePhotoUpload} multiple accept="image/*" className="mt-1 block w-full text-sm text-light-slate file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-mint file:text-dark-slate hover:file:bg-light-mint"/>
                <div className="mt-2 flex flex-wrap gap-2">
                    {photos.map((photo, index) => (
                        <img key={index} src={photo} alt={`preview ${index}`} className="h-20 w-20 object-cover rounded-md" />
                    ))}
                </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} className="bg-slate-gray hover:bg-light-slate text-stone font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-pine hover:bg-mint text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Hike</button>
            </div>
        </form>
    </div>
  );
};

export default HikeForm;

