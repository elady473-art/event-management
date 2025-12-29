import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, MapPin, Users, FileText, Tag, Image as ImageIcon, Save } from 'lucide-react';
import { Event } from '../App';

interface EventFormProps {
  event: Event | null;
  onClose: () => void;
  onSubmit: (event: Omit<Event, 'id' | 'currentAttendees'>) => void;
}

export function EventForm({ event, onClose, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Technology',
    maxAttendees: 100,
    image: '',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        maxAttendees: event.maxAttendees,
        image: event.image,
        status: event.status,
      });
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxAttendees' ? parseInt(value) : value,
    }));
  };

  const categories = ['Technology', 'Business', 'Design', 'Marketing', 'Education', 'Entertainment'];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white">{event ? 'Edit Event' : 'Create New Event'}</h2>
          <motion.button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-white/90 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/90 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your event"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-white/90 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-white/90 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter venue location"
              required
            />
          </div>

          {/* Category and Max Attendees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-purple-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/90 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Max Attendees
              </label>
              <input
                type="number"
                name="maxAttendees"
                value={formData.maxAttendees}
                onChange={handleChange}
                min="1"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-white/90 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-white/90 mb-2">Status</label>
            <div className="flex gap-3">
              {(['upcoming', 'ongoing', 'completed'] as const).map(status => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleChange}
                    className="w-4 h-4 accent-purple-500"
                  />
                  <span className="text-white/90 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <motion.button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              <span>{event ? 'Update Event' : 'Create Event'}</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              className="px-6 bg-white/10 text-white py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
