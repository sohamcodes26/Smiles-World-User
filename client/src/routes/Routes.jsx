import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import page components from the user/pages directory
import Home from '../user/pages/Home';
import About from '../user/pages/About';
import Customize from '../user/pages/Customize';
import Domestic from '../user/pages/Domestic';
import International from '../user/pages/International';
import Women from '../user/pages/Women';
import Group from '../user/pages/Group';
import Blogs from '../user/pages/Blogs';
import Contact from '../user/pages/Contact';
import PackageDetails from '../user/pages/PackageDetails';
import{ BlogPost } from '../user/pages/BlogPost';
import CancellationPolicy from '../user/pages/CancellationPolicy';
import { PodcastPage } from '../user/pages/PodcastPage';

export function AppRoutes() {
  const location = useLocation();
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About key={location.key} />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/domestic" element={<Domestic />} />
      <Route path="/international" element={<International />} />
      <Route path="/women" element={<Women />} />
      <Route path="/group-departure" element={<Group />} />
      <Route path="/blog" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/packages/:packageId" element={<PackageDetails />} />
      <Route path="/blog/:postId" element={<BlogPost />} />
      <Route path="/podcast/:podcastId" element={<PodcastPage />} />
      <Route path="/cancellation-policy" element={<CancellationPolicy />} />
    </Routes>
  );
}