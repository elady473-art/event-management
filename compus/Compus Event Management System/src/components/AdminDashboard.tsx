import { useState } from 'react';
import { Search, Filter, Calendar, Users, TrendingUp, Star, Edit, Save, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event } from '../App';

interface AdminDashboardProps {
  events: Event[];
  onUpdateEvent: (event: Event) => void;
}

export function AdminDashboard({ events, onUpdateEvent }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editForm, setEditForm] = useState<Event | null>(null);

  const categories = ['all', 'technology', 'conference', 'cultural', 'workshop', 'training', 'special days'];

  // Calculate statistics
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;
  const totalAttendance = events.reduce((sum, e) => sum + e.attendance, 0);
  const avgRating = events.reduce((sum, e) => sum + (e.rating || 0), 0) / events.length || 0;

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setEditForm(event);
  };

  const handleSave = () => {
    if (editForm) {
      onUpdateEvent(editForm);
      setEditingEvent(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
    setEditForm(null);
  };

  const isNewEvent = (event: Event) => {
    const daysSinceCreated = (new Date().getTime() - new Date(event.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceCreated < 1;
  };

  const isUpdatedEvent = (event: Event) => {
    if (!event.updatedAt) return false;
    const daysSinceUpdated = (new Date().getTime() - new Date(event.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdated < 1;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage all campus events</p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-white/80" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-white/20 border-t-white/40 rounded-full"
            />
          </div>
          <div className="text-3xl mb-1">{totalEvents}</div>
          <div className="text-blue-100">Total Events</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-white/80" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-white rounded-full"
            />
          </div>
          <div className="text-3xl mb-1">{upcomingEvents}</div>
          <div className="text-purple-100">Upcoming Events</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-white/80" />
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white/60" />
            </motion.div>
          </div>
          <div className="text-3xl mb-1">{totalAttendance.toLocaleString()}</div>
          <div className="text-green-100">Total Attendance</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Star className="w-8 h-8 text-white/80" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-6 h-6 text-white/60" />
            </motion.div>
          </div>
          <div className="text-3xl mb-1">{avgRating.toFixed(1)}</div>
          <div className="text-orange-100">Average Rating</div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter */}
          <div className="relative md:w-64">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white capitalize"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Events List */}
      <div className="space-y-4">
        <h2 className="text-gray-900 mb-4">All Events ({filteredEvents.length})</h2>
        
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {editingEvent?.id === event.id && editForm ? (
                // Edit Mode
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900">Edit Event</h3>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Title</label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Location</label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Date</label>
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Time</label>
                      <input
                        type="time"
                        value={editForm.time}
                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Category</label>
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize"
                      >
                        {categories.filter(c => c !== 'all').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Attendance</label>
                      <input
                        type="number"
                        value={editForm.attendance}
                        onChange={(e) => setEditForm({ ...editForm, attendance: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  {/* Event Image */}
                  <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    {isNewEvent(event) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-lg"
                      >
                        <Sparkles className="w-4 h-4" />
                        New
                      </motion.div>
                    )}
                    {isUpdatedEvent(event) && !isNewEvent(event) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-lg"
                      >
                        <Sparkles className="w-4 h-4" />
                        Updated
                      </motion.div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-gray-900 mb-1">{event.title}</h3>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
                          {event.category}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(event)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{event.attendance} attendees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{event.rating?.toFixed(1) || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{event.location}</span>
                    </div>

                    {event.updatedAt && (
                      <div className="mt-2 text-sm text-gray-500">
                        Last updated: {new Date(event.updatedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No events found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
