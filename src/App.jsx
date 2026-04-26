import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  Library, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  Heart, 
  Music,
  Zap,
  Mic2,
  ListMusic,
  PlusCircle,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---
const mockTrending = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop" },
  { id: 2, title: "Save Your Tears", artist: "The Weeknd", cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop" },
  { id: 3, title: "Levitating", artist: "Dua Lipa", cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400&h=400&fit=crop" },
  { id: 4, title: "Peaches", artist: "Justin Bieber", cover: "https://images.unsplash.com/photo-1514525253361-bee8d4008039?w=400&h=400&fit=crop" },
];

const AuraApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(mockTrending[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="aura-app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">
              <Zap size={20} color="white" fill="white" />
            </div>
            <span>AuraStream</span>
          </div>

          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <Home size={20} /> Home
            </NavLink>
            <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <Search size={20} /> Search
            </NavLink>
            <NavLink to="/library" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <Library size={20} /> Library
            </NavLink>
          </div>

          <div className="nav-links" style={{ marginTop: '20px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', paddingLeft: '15px', marginBottom: '10px' }}>PLAYLISTS</p>
            <div className="nav-item"><PlusCircle size={20} /> Create Playlist</div>
            <div className="nav-item"><Heart size={20} /> Liked Songs</div>
          </div>
        </aside>

        {/* Main View */}
        <main className="main-view">
          <Routes>
            <Route path="/" element={<HomeView setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />} />
            <Route path="/search" element={<SearchView searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          </Routes>
        </main>

        {/* Player Bar */}
        <footer className="player-bar">
          <div className="track-info">
            <img src={currentTrack.cover} alt="art" className="track-art" />
            <div>
              <p style={{ fontSize: '14px', fontWeight: '700' }}>{currentTrack.title}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{currentTrack.artist}</p>
            </div>
            <Heart size={18} color="var(--text-muted)" style={{ cursor: 'pointer', marginLeft: '10px' }} />
          </div>

          <div className="player-controls">
            <div className="control-btns">
              <Shuffle size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              <SkipBack size={22} fill="white" style={{ cursor: 'pointer' }} />
              <div className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" style={{ marginLeft: '4px' }} />}
              </div>
              <SkipForward size={22} fill="white" style={{ cursor: 'pointer' }} />
              <Repeat size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>
            <div className="progress-container">
              <span>1:24</span>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <span>3:45</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '30%', justifyContent: 'flex-end' }}>
             <Mic2 size={18} color="var(--text-muted)" />
             <ListMusic size={18} color="var(--text-muted)" />
             <Volume2 size={18} color="var(--text-muted)" />
             <div style={{ width: '100px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '70%', height: '100%', background: 'white', borderRadius: '2px' }}></div>
             </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const HomeView = ({ setCurrentTrack, setIsPlaying }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <header style={{ marginBottom: '40px' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '800' }}>Good Evening</h1>
    </header>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
      {mockTrending.slice(0, 2).map(song => (
        <div key={song.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }} onClick={() => { setCurrentTrack(song); setIsPlaying(true); }}>
           <img src={song.cover} style={{ width: '80px', height: '80px', borderRadius: '12px' }} />
           <span style={{ fontSize: '18px', fontWeight: '700' }}>{song.title}</span>
           <div className="play-btn" style={{ marginLeft: 'auto', opacity: 0.8 }}><Play size={20} fill="black" /></div>
        </div>
      ))}
    </div>

    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px' }}>Recommended for you</h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '700' }}>SEE ALL</span>
      </div>
      <div className="grid-songs">
        {mockTrending.map(song => (
          <div key={song.id} className="song-card" onClick={() => { setCurrentTrack(song); setIsPlaying(true); }}>
            <img src={song.cover} className="song-img" />
            <p style={{ fontWeight: '700', marginBottom: '4px' }}>{song.title}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{song.artist}</p>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const SearchView = ({ searchQuery, setSearchQuery }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div style={{ position: 'sticky', top: 0, background: 'var(--bg-black)', paddingBottom: '20px', z-index: 5 }}>
      <input 
        className="search-input" 
        placeholder="What do you want to listen to?" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ marginBottom: '20px' }}>Browse all</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
        {['Pop', 'Hip-Hop', 'Dance', 'Indie', 'Chill', 'Workout', 'Sleep'].map((cat, i) => (
          <div key={i} style={{ 
            height: '180px', 
            borderRadius: '16px', 
            background: `hsl(${i * 45}, 70%, 40%)`, 
            padding: '20px', 
            fontSize: '22px', 
            fontWeight: '800',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}>
            {cat}
            <Music size={80} style={{ position: 'absolute', bottom: '-10px', right: '-10px', opacity: 0.2, transform: 'rotate(25deg)' }} />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default AuraApp;
