import { useState } from 'react';
import { Calendar, Clock, MapPin, Image, Users, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event } from '../App';

interface EventSubmissionProps {
  onCreateEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
}

const categories = [
  'technology',
  'conference',
  'cultural',
  'workshop',
  'training',
  'special days'
];

export function EventSubmission({ onCreateEvent }: EventSubmissionProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [attendance, setAttendance] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent = {
      title,
      date,
      time,
      category,
      location,
      image: image || 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?w=800',
      attendance: parseInt(attendance) || 0,
      rating: 0
    };

    onCreateEvent(newEvent);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form
    setTitle('');
    setDate('');
    setTime('');
    setCategory('');
    setLocation('');
    setImage('');
    setAttendance('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-gray-900 mb-2">Create New Event</h1>
        <p className="text-gray-600">Fill in the details to create a new campus event</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-700 mb-2">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter event title"
              required
            />
          </motion.div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-700 mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </motion.div>
          </div>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-gray-700 mb-3">Category</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat}
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 capitalize ${
                    category === cat
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter event location"
                required
              />
            </div>
          </motion.div>

          {/* Image URL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-gray-700 mb-2">Image URL (Optional)</label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {image && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3"
              >
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Expected Attendance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <label className="block text-gray-700 mb-2">Expected Attendance</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Number of expected attendees"
                min="0"
                required
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Create Event
          </motion.button>
        </form>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6" />
            <div>
              <div className="font-semibold">Event Created Successfully!</div>
              <p className="text-sm text-green-100">Check the Admin Dashboard to view it</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
