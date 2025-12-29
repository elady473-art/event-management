import { Home, Calendar, LayoutDashboard, Bell, Mail, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'events' | 'dashboard' | 'notifications' | 'contact') => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Event Submission', icon: Calendar },
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-50"
    >
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-700">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-white">Event Manager</div>
            <p className="text-gray-400 text-sm">Campus System</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => onNavigate(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 bg-white rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
