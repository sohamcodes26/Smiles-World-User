import React from 'react';
import { Navbar } from './user/components/navbar';
import { Footer } from './user/components/footer';
import { AppRoutes } from './routes/Routes'; 
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen flex flex-col ">
      <ScrollToTop />
      <Navbar />
      
      <main className="flex-grow pt-16">
        <AppRoutes /> 
      </main>
      
      <Footer />
    </div>
  )
}

export default App;