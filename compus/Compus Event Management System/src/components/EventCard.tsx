import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Tag } from 'lucide-react';
import { Event } from '../App';

interface EventCardProps {
  event: Event;
  index: number;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

export function EventCard({ event, index, onEdit, onDelete }: EventCardProps) {
  const attendancePercentage = (event.currentAttendees / event.maxAttendees) * 100;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: 'from-blue-500 to-cyan-500',
      Business: 'from-green-500 to-emerald-500',
      Design: 'from-purple-500 to-pink-500',
      Marketing: 'from-orange-500 to-red-500',
      Education: 'from-yellow-500 to-amber-500',
      Entertainment: 'from-fuchsia-500 to-violet-500',
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <div className={`bg-gradient-to-r ${getCategoryColor(event.category)} px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 shadow-lg`}>
              <Tag className="w-3 h-3" />
              {event.category}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              onClick={() => onEdit(event)}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => onDelete(event.id)}
              className="bg-red-500/20 backdrop-blur-sm p-2 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-purple-200 text-sm mb-4 line-clamp-2">{event.description}</p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {/* Attendance Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-purple-300 text-sm">
                <Users className="w-4 h-4" />
                <span>Attendees</span>
              </div>
              <span className="text-white text-sm">
                {event.currentAttendees} / {event.maxAttendees}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${attendancePercentage}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
