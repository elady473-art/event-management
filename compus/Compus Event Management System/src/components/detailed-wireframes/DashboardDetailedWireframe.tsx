import { motion } from 'motion/react';
import { Calendar, Users, TrendingUp, Clock, Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface WireframeProps {
  viewMode: 'wireframe' | 'code' | 'info';
  isMobile: boolean;
}

export function DashboardDetailedWireframe({ viewMode, isMobile }: WireframeProps) {
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Event Manager</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="dashboard">
        <!-- Header -->
        <header class="dashboard-header">
            <div class="logo">Event Manager</div>
            <nav class="nav-menu">
                <a href="#dashboard">Dashboard</a>
                <a href="#events">Events</a>
                <a href="#analytics">Analytics</a>
            </nav>
            <div class="user-menu">
                <img src="avatar.jpg" alt="User" class="avatar">
            </div>
        </header>
        
        <!-- Stats Cards -->
        <section class="stats-grid">
            <div class="stat-card">
                <h3>Total Events</h3>
                <p class="stat-value">24</p>
            </div>
            <div class="stat-card">
                <h3>Upcoming</h3>
                <p class="stat-value">8</p>
            </div>
            <div class="stat-card">
                <h3>Total Attendees</h3>
                <p class="stat-value">1,234</p>
            </div>
            <div class="stat-card">
                <h3>Avg Attendance</h3>
                <p class="stat-value">78%</p>
            </div>
        </section>
        
        <!-- Events List -->
        <section class="events-section">
            <div class="section-header">
                <h2>All Events</h2>
                <div class="search-filter">
                    <input type="search" placeholder="Search...">
                    <button class="filter-btn">Filter</button>
                </div>
            </div>
            
            <div class="events-grid" id="eventsGrid">
                <!-- Event cards will be inserted here -->
            </div>
        </section>
    </div>
    
    <script src="dashboard.js"></script>
</body>
</html>`;

  const cssCode = `.dashboard {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.dashboard-header {
    background: white;
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e5e7eb;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    padding: 32px;
}

.stat-card {
    background: white;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-value {
    font-size: 32px;
    font-weight: bold;
    color: #667eea;
    margin-top: 8px;
}

.events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    padding: 32px;
}

.event-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: all 0.3s;
}

.event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}`;

  const jsCode = `// Dashboard Data Management
class DashboardManager {
    constructor() {
        this.events = [];
        this.stats = {};
        this.init();
    }
    
    async init() {
        await this.loadEvents();
        await this.loadStats();
        this.render();
    }
    
    async loadEvents() {
        try {
            const response = await fetch('/api/events', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            });
            this.events = await response.json();
        } catch (error) {
            console.error('Failed to load events:', error);
        }
    }
    
    async loadStats() {
        const totalEvents = this.events.length;
        const upcomingEvents = this.events.filter(e => 
            new Date(e.date) > new Date()
        ).length;
        const totalAttendees = this.events.reduce((sum, e) => 
            sum + e.currentAttendees, 0
        );
        const totalCapacity = this.events.reduce((sum, e) => 
            sum + e.maxAttendees, 0
        );
        
        this.stats = {
            totalEvents,
            upcomingEvents,
            totalAttendees,
            avgAttendance: Math.round((totalAttendees / totalCapacity) * 100)
        };
    }
    
    render() {
        this.renderStats();
        this.renderEvents();
    }
    
    renderEvents() {
        const grid = document.getElementById('eventsGrid');
        grid.innerHTML = this.events.map(event => this.createEventCard(event)).join('');
    }
    
    createEventCard(event) {
        return \`
            <div class="event-card" data-id="\${event.id}">
                <img src="\${event.image}" alt="\${event.title}">
                <div class="event-content">
                    <h3>\${event.title}</h3>
                    <p>\${event.description}</p>
                    <div class="event-meta">
                        <span>\${event.date}</span>
                        <span>\${event.location}</span>
                    </div>
                </div>
            </div>
        \`;
    }
}

// Initialize dashboard
const dashboard = new DashboardManager();

// Search functionality
document.querySelector('input[type="search"]').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    dashboard.filterEvents(query);
});`;

  const componentInfo = [
    {
      title: 'Navigation Header',
      description: 'Top navigation with logo, menu items, and user profile',
      specs: 'Sticky position, Responsive menu, Dropdown actions',
    },
    {
      title: 'Statistics Cards',
      description: 'Key metrics displayed in card format',
      specs: 'Auto-update, Animated counters, Comparison indicators',
    },
    {
      title: 'Search & Filter',
      description: 'Real-time search with category filters',
      specs: 'Debounced search, Multi-filter support, Sort options',
    },
    {
      title: 'Event Cards Grid',
      description: 'Responsive grid layout for event items',
      specs: 'CSS Grid, Lazy loading, Infinite scroll',
    },
    {
      title: 'Event Card Actions',
      description: 'Quick actions for each event (edit, delete, view)',
      specs: 'Dropdown menu, Confirmation modals, Batch operations',
    },
    {
      title: 'Progress Indicators',
      description: 'Visual representation of attendance capacity',
      specs: 'Animated bars, Color coding, Real-time updates',
    },
    {
      title: 'Data Refresh',
      description: 'Auto-refresh functionality for live data',
      specs: 'WebSocket connection, Polling fallback, Manual refresh',
    },
    {
      title: 'Responsive Design',
      description: 'Optimized layouts for all screen sizes',
      specs: 'Breakpoints: 640px, 768px, 1024px, 1280px',
    },
  ];

  const eventImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    'https://images.unsplash.com/photo-1709715357520-5e1047a2b691',
    'https://images.unsplash.com/photo-1582192730841-2a682d7375f9',
  ];

  if (viewMode === 'code') {
    return (
      <div className="bg-slate-900 rounded-2xl border border-white/20 overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 border-b border-white/10 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-white/60 text-sm ml-3">dashboard.html</span>
        </div>
        <div className={`overflow-auto ${isMobile ? 'max-h-96' : 'max-h-[600px]'}`}>
          <div className="p-6 space-y-6">
            {/* HTML */}
            <div>
              <div className="text-purple-400 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>HTML Structure</span>
              </div>
              <pre className="bg-slate-950 rounded-xl p-4 overflow-x-auto text-xs text-gray-300">
                <code>{htmlCode}</code>
              </pre>
            </div>

            {/* CSS */}
            <div>
              <div className="text-blue-400 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>CSS Styling</span>
              </div>
              <pre className="bg-slate-950 rounded-xl p-4 overflow-x-auto text-xs text-gray-300">
                <code>{cssCode}</code>
              </pre>
            </div>

            {/* JavaScript */}
            <div>
              <div className="text-green-400 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>JavaScript Logic</span>
              </div>
              <pre className="bg-slate-950 rounded-xl p-4 overflow-x-auto text-xs text-gray-300">
                <code>{jsCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'info') {
    return (
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
        {componentInfo.map((info, index) => (
          <motion.div
            key={info.title}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">{index + 1}</span>
              </div>
              <div>
                <h3 className="text-white mb-1">{info.title}</h3>
                <p className="text-purple-200 text-sm">{info.description}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-purple-300 text-xs">{info.specs}</p>
            </div>
          </motion.div>
        ))}

        {/* Image Examples */}
        <motion.div
          className={`${isMobile ? 'col-span-1' : 'col-span-2'} bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid grid-cols-3 gap-2 p-2">
            {eventImages.map((img, i) => (
              <ImageWithFallback
                key={i}
                src={img}
                alt={`Event ${i + 1}`}
                className="w-full h-32 object-cover rounded-xl"
              />
            ))}
          </div>
          <div className="p-4 bg-slate-900/50">
            <p className="text-white text-sm">Example event images displayed in the dashboard grid</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Wireframe View
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
      {/* Header */}
      <motion.div
        className="bg-white border-b-2 border-gray-200 px-6 py-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl" />
            <span className="text-gray-900">Event Manager</span>
          </div>
          <div className="flex items-center gap-3">
            {!isMobile && (
              <>
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              </>
            )}
            <div className="w-10 h-10 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full" />
          </div>
        </div>
      </motion.div>

      <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
        {/* Page Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage and monitor your events</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4 mb-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Calendar, label: 'Total Events', value: '24', color: 'from-blue-500 to-cyan-500' },
            { icon: Clock, label: 'Upcoming', value: '8', color: 'from-purple-500 to-pink-500' },
            { icon: Users, label: 'Attendees', value: '1,234', color: 'from-green-500 to-emerald-500' },
            { icon: TrendingUp, label: 'Avg Rate', value: '78%', color: 'from-orange-500 to-red-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search/Filter Bar */}
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-200 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'}`}>
            <div className="flex-1 flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-2 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Search events..."
                />
              </div>
              {!isMobile && (
                <motion.button
                  className="flex items-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
          {[0, 1, 2, 3, 4, 5].slice(0, isMobile ? 3 : 6).map((i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={eventImages[i % eventImages.length]}
                  alt={`Event ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs">
                    Technology
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center cursor-pointer">
                    <Edit className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center cursor-pointer">
                    <Eye className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-gray-900 mb-2">Tech Innovation Summit</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Join industry leaders for cutting-edge discussions
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Dec 20, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>09:00 AM</span>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-600">Attendees</span>
                    <span className="text-gray-900">342 / 500</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${68}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
