import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { EventSubmission } from './components/EventSubmission';
import { AdminDashboard } from './components/AdminDashboard';
import { Notifications } from './components/Notifications';
import { ContactUs } from './components/ContactUs';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  location: string;
  image: string;
  attendance: number;
  rating?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'home' | 'events' | 'dashboard' | 'notifications' | 'contact'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Innovation Summit 2025',
      date: '2025-01-15',
      time: '09:00',
      category: 'technology',
      location: 'Main Auditorium',
      image: 'https://images.unsplash.com/photo-1592758080692-b6a5dbe9c725?w=800',
      attendance: 250,
      rating: 4.5,
      createdAt: new Date('2025-01-01')
    },
    {
      id: '2',
      title: 'Cultural Festival 2025',
      date: '2025-02-20',
      time: '14:00',
      category: 'cultural',
      location: 'Campus Grounds',
      image: 'https://images.unsplash.com/photo-1639369501176-f40a0641c91f?w=800',
      attendance: 500,
      rating: 4.8,
      createdAt: new Date('2025-01-05')
    },
    {
      id: '3',
      title: 'Leadership Workshop',
      date: '2025-01-25',
      time: '10:00',
      category: 'workshop',
      location: 'Room 301',
      image: 'https://images.unsplash.com/photo-1765438863717-49fca900f861?w=800',
      attendance: 80,
      rating: 4.3,
      createdAt: new Date('2025-01-08')
    },
    {
      id: '4',
      title: 'Graduation Ceremony',
      date: '2025-06-15',
      time: '11:00',
      category: 'special days',
      location: 'Grand Hall',
      image: 'https://images.unsplash.com/photo-1623461487986-9400110de28e?w=800',
      attendance: 800,
      rating: 5.0,
      createdAt: new Date('2025-01-10')
    }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleNavigate = (page: 'home' | 'events' | 'dashboard' | 'notifications' | 'contact') => {
    setCurrentPage(page);
  };

  const handleCreateEvent = (newEvent: Omit<Event, 'id' | 'createdAt'>) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setEvents(prev => [event, ...prev]);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id 
        ? { ...updatedEvent, updatedAt: new Date() }
        : event
    ));
  };

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentPage === 'login' || !isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 ml-64 p-8">
        {currentPage === 'home' && <HomePage events={events} />}
        {currentPage === 'events' && <EventSubmission onCreateEvent={handleCreateEvent} />}
        {currentPage === 'dashboard' && (
          <AdminDashboard 
            events={events} 
            onUpdateEvent={handleUpdateEvent}
          />
        )}
        {currentPage === 'notifications' && <Notifications events={events} />}
        {currentPage === 'contact' && <ContactUs />}
      </main>
    </div>
  );
}
