import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header';
import Section1 from './Section1';
import Footer from './Footer';
import Chat from './Chat';
import Shop from './Shop';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${location.pathname !== '/' ? 'pt-[75px]' : ''}`}>
        <Routes>
          <Route path="/" element={<Section1 />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;