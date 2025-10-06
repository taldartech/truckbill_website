import { useState } from 'react';
import { Truck, FileText, Shield, TrendingUp, Users, Mail, Phone, MapPin, CheckCircle, Clock, IndianRupee } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'transport' | 'broker' | 'about' | 'contact'>('home');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: 'home' | 'transport' | 'broker' | 'about' | 'contact') => {
    setCurrentPage(page);
    scrollToTop();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Sticky header with logo and menu */}
      {/* Home Page - Hero, Solutions Overview, Customer Success */}
      {/* Transport Agency Features Page - 4 detailed features */}
      {/* Broker Agency Features Page - 4 detailed features */}
      {/* About Us Page - Mission, Team, Advisors */}
      {/* Contact Page - Form with WhatsApp integration */}
      {/* Footer - Links and contact info */}
    </div>
  );
}

export default App;
