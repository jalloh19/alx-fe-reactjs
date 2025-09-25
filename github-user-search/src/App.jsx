import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <header className="bg-white border-b border-[#d0d7de]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-[#24292f]">GitHub User Search</h1>
        </div>
      </header>
      <main className="py-6">
        <Search />
      </main>
    </div>
  );
}

export default App;