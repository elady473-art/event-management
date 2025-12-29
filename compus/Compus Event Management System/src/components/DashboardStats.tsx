import { motion } from 'motion/react';
import { Calendar, Users, TrendingUp, Clock } from 'lucide-react';
import { Event } from '../App';

interface DashboardStatsProps {
  events: Event[];
}

export function DashboardStats({ events }: DashboardStatsProps) {
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const totalAttendees = events.reduce((sum, e) => sum + e.currentAttendees, 0);
  const totalCapacity = events.reduce((sum, e) => sum + e.maxAttendees, 0);
  const avgAttendance = totalCapacity > 0 ? Math.round((totalAttendees / totalCapacity) * 100) : 0;

  const stats = [
    {
      icon: Calendar,
      label: 'Total Events',
      value: totalEvents,
      color: 'from-blue-500 to-cyan-500',
      delay: 0,
    },
    {
      icon: Clock,
      label: 'Upcoming',
      value: upcomingEvents,
      color: 'from-purple-500 to-pink-500',
      delay: 0.1,
    },
    {
      icon: Users,
      label: 'Total Attendees',
      value: totalAttendees,
      color: 'from-green-500 to-emerald-500',
      delay: 0.2,
    },
    {
      icon: TrendingUp,
      label: 'Avg Attendance',
      value: `${avgAttendance}%`,
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-200 text-sm mb-2">{stat.label}</p>
              <motion.p
                className="text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stat.delay + 0.2 }}
              >
                {stat.value}
              </motion.p>
            </div>
            <motion.div
              className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl shadow-lg`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
