import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Tag, Image as ImageIcon, FileText, Upload } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface WireframeProps {
  viewMode: 'wireframe' | 'code' | 'info';
  isMobile: boolean;
}

export function EventFormDetailedWireframe({ viewMode, isMobile }: WireframeProps) {
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Event - Event Manager</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="event-form-container">
        <form id="eventForm" class="event-form">
            <h1>Create New Event</h1>
            
            <div class="form-section">
                <h2>Event Details</h2>
                
                <div class="form-group">
                    <label>Event Title</label>
                    <input type="text" id="title" required>
                </div>
                
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="description" rows="4"></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" id="date" required>
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" id="time" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="location">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Category</label>
                        <select id="category">
                            <option>Technology</option>
                            <option>Business</option>
                            <option>Design</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Max Attendees</label>
                        <input type="number" id="maxAttendees" min="1">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Event Image</label>
                    <input type="file" id="image" accept="image/*">
                </div>
            </div>
            
            <button type="submit" class="btn-submit">Create Event</button>
        </form>
    </div>
</body>
</html>`;

  const cssCode = `.event-form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.event-form {
    background: white;
    border-radius: 24px;
    padding: 48px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.form-section {
    margin-bottom: 32px;
}

.form-section h2 {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f3f4f6;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #374151;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 14px;
    transition: all 0.3s;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.btn-submit {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}`;

  const jsCode = `// Event Form Handler
const eventForm = document.getElementById('eventForm');

eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('date', document.getElementById('date').value);
    formData.append('time', document.getElementById('time').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('maxAttendees', document.getElementById('maxAttendees').value);
    
    const imageFile = document.getElementById('image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }
    
    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Event created successfully!');
            eventForm.reset();
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        }
    } catch (error) {
        showError('Failed to create event');
    }
});

// Image Preview
document.getElementById('image').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            showImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});`;

  const componentInfo = [
    {
      title: 'Event Title Input',
      description: 'Main event name with character limit',
      specs: 'Type: text, Required, Max-length: 100 chars',
    },
    {
      title: 'Description Textarea',
      description: 'Detailed event information with rich text support',
      specs: 'Rows: 4, Max-length: 500 chars, Optional rich text',
    },
    {
      title: 'Date & Time Pickers',
      description: 'Native date/time selectors with validation',
      specs: 'Min date: today, Time format: 24h, Timezone aware',
    },
    {
      title: 'Location Field',
      description: 'Venue address with autocomplete',
      specs: 'Google Places API, Geocoding, Map preview',
    },
    {
      title: 'Category Dropdown',
      description: 'Predefined event categories',
      specs: 'Options: Tech, Business, Design, etc.',
    },
    {
      title: 'Image Upload',
      description: 'Event banner with preview and crop',
      specs: 'Max size: 5MB, Formats: JPG/PNG, Aspect: 16:9',
    },
    {
      title: 'Capacity Input',
      description: 'Maximum number of attendees',
      specs: 'Type: number, Min: 1, Max: 10000',
    },
    {
      title: 'Form Validation',
      description: 'Real-time validation with error messages',
      specs: 'Client-side + Server-side, AJAX submission',
    },
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
          <span className="text-white/60 text-sm ml-3">event-form.html</span>
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

        {/* Image Reference */}
        <motion.div
          className={`${isMobile ? 'col-span-1' : 'col-span-2'} bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzY1Nzg0MjQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Event Conference"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 bg-slate-900/50">
            <p className="text-white text-sm">Example of a professional event that can be created using this form</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Wireframe View
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
      <div className={`${isMobile ? 'p-4' : 'p-12'} min-h-[800px] relative`}>
        {/* Annotations */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute left-4 top-20 bg-purple-500 text-white px-3 py-1 rounded-lg text-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              File Upload Component
            </motion.div>
            <motion.div
              className="absolute right-4 top-40 bg-pink-500 text-white px-3 py-1 rounded-lg text-xs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              Date/Time Pickers
            </motion.div>
          </>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-gray-900 mb-2">Create New Event</h1>
            <p className="text-gray-600">Fill in the details to create your event</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-8">
              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Event Image
                </label>
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-dashed border-purple-300 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <p className="text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Event Title
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="e.g., Tech Innovation Summit 2025"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  placeholder="Describe your event in detail..."
                />
              </div>

              {/* Date & Time */}
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Venue address"
                />
              </div>

              {/* Category & Capacity */}
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Category
                  </label>
                  <select className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all">
                    <option>Technology</option>
                    <option>Business</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex ${isMobile ? 'flex-col' : 'gap-4'} pt-6 border-t-2 border-gray-200`}>
                <motion.button
                  type="submit"
                  className={`${isMobile ? 'w-full mb-3' : 'flex-1'} bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Event
                </motion.button>
                <motion.button
                  type="button"
                  className={`${isMobile ? 'w-full' : 'w-32'} bg-gray-200 text-gray-700 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-300 transition-colors`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
