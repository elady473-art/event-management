import { motion } from 'motion/react';
import { Bell, Calendar, CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';
import { Event } from '../App';

interface NotificationsProps {
  events: Event[];
}

export function Notifications({ events }: NotificationsProps) {
  // Generate notifications from events
  const notifications = [
    ...events
      .filter(e => {
        const daysSinceCreated = (new Date().getTime() - new Date(e.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceCreated < 1;
      })
      .map(e => ({
        id: `new-${e.id}`,
        type: 'new' as const,
        title: 'New Event Created',
        message: `"${e.title}" has been added to the calendar`,
        time: new Date(e.createdAt),
        event: e
      })),
    ...events
      .filter(e => e.updatedAt && (new Date().getTime() - new Date(e.updatedAt).getTime()) / (1000 * 60 * 60 * 24) < 1)
      .map(e => ({
        id: `updated-${e.id}`,
        type: 'updated' as const,
        title: 'Event Updated',
        message: `"${e.title}" details have been modified`,
        time: e.updatedAt!,
        event: e
      })),
    ...events
      .filter(e => {
        const daysUntilEvent = (new Date(e.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
        return daysUntilEvent <= 7 && daysUntilEvent > 0;
      })
      .map(e => ({
        id: `upcoming-${e.id}`,
        type: 'upcoming' as const,
        title: 'Upcoming Event Reminder',
        message: `"${e.title}" is happening on ${e.date}`,
        time: new Date(e.date),
        event: e
      }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const getIcon = (type: string) => {
    switch (type) {
      case 'new':
        return <Sparkles className="w-5 h-5 text-green-500" />;
      case 'updated':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'upcoming':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-gray-900">Notifications</h1>
        </div>
        <p className="text-gray-600">Stay updated with the latest event activities</p>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl text-green-700">
                {notifications.filter(n => n.type === 'new').length}
              </div>
              <div className="text-sm text-green-600">New Events</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl text-blue-700">
                {notifications.filter(n => n.type === 'updated').length}
              </div>
              <div className="text-sm text-blue-600">Updates</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-orange-50 border border-orange-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-orange-500" />
            <div>
              <div className="text-2xl text-orange-700">
                {notifications.filter(n => n.type === 'upcoming').length}
              </div>
              <div className="text-sm text-orange-600">Upcoming</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-gray-900 mb-1">{notification.title}</h3>
                      <p className="text-gray-600">{notification.message}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {getTimeAgo(notification.time)}
                    </span>
                  </div>

                  {/* Event Preview */}
                  {notification.event && (
                    <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={notification.event.image}
                        alt={notification.event.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 truncate">
                          {notification.event.title}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {notification.event.date}
                          </span>
                          <span className="capitalize text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {notification.event.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow-lg"
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No new notifications at the moment</p>
          </motion.div>
        )}
      </div>

      {/* Mark all as read button */}
      {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <CheckCircle className="w-5 h-5" />
            Mark All as Read
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
