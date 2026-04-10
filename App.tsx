import React from 'react';
import { HashRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ApplyPage from './pages/ApplyPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
