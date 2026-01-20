import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Menu from '@/pages/Menu';
import Booking from '@/pages/Booking';
import PreOrder from '@/pages/PreOrder';
import Delivery from '@/pages/Delivery';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/pre-order" element={<PreOrder />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
