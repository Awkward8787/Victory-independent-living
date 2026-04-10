import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ApplyPage from './pages/ApplyPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/ResourcesPage';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/apply"     element={<ApplyPage />} />
          <Route path="/partners"  element={<PartnersPage />} />
          <Route path="/contact"   element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
