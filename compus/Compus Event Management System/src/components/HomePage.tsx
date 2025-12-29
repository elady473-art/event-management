import { motion } from 'motion/react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../App';

interface HomePageProps {
  events: Event[];
}

export function HomePage({ events }: HomePageProps) {
  const featuredEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit',
      image: 'https://images.unsplash.com/photo-1592758080692-b6a5dbe9c725?w=800',
      description: 'Discover the latest in technology and innovation',
      date: 'Jan 15, 2025'
    },
    {
      id: 2,
      title: 'Cultural Festival',
      image: 'https://images.unsplash.com/photo-1639369501176-f40a0641c91f?w=800',
      description: 'Celebrate diversity and cultural heritage',
      date: 'Feb 20, 2025'
    },
    {
      id: 3,
      title: 'Leadership Workshop',
      image: 'https://images.unsplash.com/photo-1765438863717-49fca900f861?w=800',
      description: 'Develop your leadership skills',
      date: 'Jan 25, 2025'
    },
    {
      id: 4,
      title: 'Campus Conference',
      image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?w=800',
      description: 'Academic excellence and networking',
      date: 'Mar 10, 2025'
    },
    {
      id: 5,
      title: 'Graduation Ceremony',
      image: 'https://images.unsplash.com/photo-1623461487986-9400110de28e?w=800',
      description: 'Celebrate achievements and new beginnings',
      date: 'Jun 15, 2025'
    },
    {
      id: 6,
      title: 'University Building Tour',
      image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800',
      description: 'Explore our beautiful campus facilities',
      date: 'Feb 05, 2025'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white mb-4"
            >
              Welcome to Campus Events
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/90 mb-6"
            >
              Discover amazing events happening across campus
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-6"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl">{events.length}</div>
                <div className="text-white/80">Total Events</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl">
                  {events.filter(e => new Date(e.date) > new Date()).length}
                </div>
                <div className="text-white/80">Upcoming</div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="mb-8">
        <h2 className="text-gray-900 mb-6">Featured Campus Events</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <motion.img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Date Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-lg"
              >
                <div className="text-sm text-gray-900">{event.date}</div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              {/* Action */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                View Details
              </motion.button>
            </div>

            {/* Hover Accent */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Upcoming Events Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 bg-white rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-gray-900 mb-6">Upcoming Events</h2>
        <div className="space-y-4">
          {events
            .filter(e => new Date(e.date) > new Date())
            .slice(0, 5)
            .map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.attendance}</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="w-2 h-2 rounded-full bg-blue-600"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
