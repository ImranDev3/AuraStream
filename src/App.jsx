import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, Library, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Volume2, Heart, Music, Zap, Mic2, ListMusic, PlusCircle, Maximize2
} from 'lucide-react';

// --- Global Fix for React 18/Vite Stability ---
localStorage.clear(); 

// --- Mock Music Database ---
const mockSongs = [
  { id: 'yt_1', title: "Starboy", artist: "The Weeknd", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", color: "#7000ff" },
  { id: 'yt_2', title: "Stay", artist: "The Kid LAROI", cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop", color: "#00f2ff" },
  { id: 'yt_3', title: "Flowers", artist: "Miley Cyrus", cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300&h=300&fit=crop", color: "#ff00c8" },
  { id: 'yt_4', title: "Heat Waves", artist: "Glass Animals", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", color: "#f59e0b" },
];

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(mockSongs[0]);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(30);

  return (
    <Router>
      <div className="aura-app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: '800' }}>
            <div style={{ background: 'var(--accent-gradient)', padding: '8px', borderRadius: '10px' }}>
              <Zap size={22} fill="white" color="white" />
            </div>
            AuraStream
          </div>

          <nav style={{ marginTop: '30px' }}>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Home size={22} /> <span>Home</span>
            </NavLink>
            <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Search size={22} /> <span>Search</span>
            </NavLink>
            <NavLink to="/library" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Library size={22} /> <span>Library</span>
            </NavLink>
          </nav>

          <div style={{ marginTop: '40px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>YOUR COLLECTION</p>
             <div className="nav-item" style={{ padding: '8px 0' }}><PlusCircle size={18} /> Create Playlist</div>
             <div className="nav-item" style={{ padding: '8px 0' }}><Heart size={18} /> Liked Songs</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-view">
          <Routes>
            <Route path="/" element={<HomeView setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />} />
            <Route path="/search" element={<SearchView setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />} />
          </Routes>
        </main>

        {/* Player Controls (Spotify Style) */}
        <footer className="player-bar">
          <div className="track-info">
            <img src={currentTrack.cover} className="track-art" style={{ animation: isPlaying ? 'rotate 10s linear infinite' : 'none' }} />
            <div>
              <p style={{ fontWeight: '700', fontSize: '14px' }}>{currentTrack.title}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{currentTrack.artist}</p>
            </div>
            <Heart size={18} style={{ marginLeft: '15px', cursor: 'pointer', color: 'var(--text-muted)' }} />
          </div>

          <div className="player-controls">
            <div className="control-btns">
              <Shuffle size={18} color="var(--text-muted)" />
              <SkipBack size={24} fill="white" />
              <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" style={{ marginLeft: '3px' }} />}
              </button>
              <SkipForward size={24} fill="white" />
              <Repeat size={18} color="var(--text-muted)" />
            </div>
            <div className="progress-container">
              <span>1:45</span>
              <div className="progress-bar" onClick={(e) => setProgress(e.nativeEvent.offsetX / e.target.clientWidth * 100)}>
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <span>4:20</span>
            </div>
          </div>

          <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
            <Mic2 size={18} color="var(--text-muted)" />
            <ListMusic size={18} color="var(--text-muted)" />
            <Volume2 size={20} color="var(--text-muted)" />
            <div className="progress-bar" style={{ width: '100px' }}>
              <div className="progress-fill" style={{ width: `${volume}%` }}></div>
            </div>
            <Maximize2 size={18} color="var(--text-muted)" />
          </div>
        </footer>
      </div>
    </Router>
  );
};

const HomeView = ({ setCurrentTrack, setIsPlaying }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="content-wrap">
    <h1 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '30px' }}>Good Afternoon</h1>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
      {mockSongs.slice(0, 3).map(song => (
        <div key={song.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => { setCurrentTrack(song); setIsPlaying(true); }}>
           <img src={song.cover} style={{ width: '60px', height: '60px', borderRadius: '8px' }} />
           <span style={{ fontWeight: '700' }}>{song.title}</span>
        </div>
      ))}
    </div>

    <h2 style={{ marginBottom: '20px' }}>Made For You</h2>
    <div className="grid-songs">
       {mockSongs.map(song => (
         <div key={song.id} className="song-card" onClick={() => { setCurrentTrack(song); setIsPlaying(true); }}>
            <div style={{ position: 'relative' }}>
              <img src={song.cover} className="song-img" />
              <div className="play-overlay"><Play fill="white" size={30} /></div>
            </div>
            <p style={{ fontWeight: '700', marginTop: '10px' }}>{song.title}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{song.artist}</p>
         </div>
       ))}
    </div>
  </motion.div>
);

const SearchView = ({ setCurrentTrack, setIsPlaying }) => {
  const [query, setQuery] = useState('');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       <div className="search-wrap" style={{ position: 'sticky', top: '0', background: 'var(--bg-black)', paddingBottom: '30px', zIndex: '100' }}>
         <div style={{ position: 'relative', maxWidth: '500px' }}>
            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
            <input 
              className="search-input" 
              placeholder="What do you want to listen to?" 
              style={{ paddingLeft: '50px' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
         </div>
       </div>

       <div className="grid-songs">
         {mockSongs.filter(s => s.title.toLowerCase().includes(query.toLowerCase())).map(song => (
           <div key={song.id} className="song-card" onClick={() => { setCurrentTrack(song); setIsPlaying(true); }}>
              <img src={song.cover} className="song-img" />
              <p style={{ fontWeight: '700' }}>{song.title}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{song.artist}</p>
           </div>
         ))}
       </div>
    </motion.div>
  );
};

export default App;
