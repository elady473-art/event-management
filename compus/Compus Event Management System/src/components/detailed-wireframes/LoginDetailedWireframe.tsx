import { motion } from 'motion/react';
import { Mail, Lock, Eye, Chrome, Github } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface WireframeProps {
  viewMode: 'wireframe' | 'code' | 'info';
  isMobile: boolean;
}

export function LoginDetailedWireframe({ viewMode, isMobile }: WireframeProps) {
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Management - Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="logo">
                <img src="logo.svg" alt="Logo">
                <h1>Event Manager</h1>
            </div>
            
            <form class="login-form">
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="admin@events.com">
                </div>
                
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••">
                </div>
                
                <button type="submit" class="btn-primary">Sign In</button>
                
                <div class="social-login">
                    <button class="btn-social">Google</button>
                    <button class="btn-social">GitHub</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>`;

  const cssCode = `.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
    background: white;
    border-radius: 24px;
    padding: 48px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    max-width: 420px;
    width: 100%;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 14px;
    transition: all 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
}

.btn-primary {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
}

.btn-primary:hover {
    transform: translateY(-2px);
}`;

  const jsCode = `// Login Form Handler
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const credentials = {
        email: emailInput.value,
        password: passwordInput.value
    };
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('authToken', data.token);
            window.location.href = '/dashboard';
        } else {
            showError('Invalid credentials');
        }
    } catch (error) {
        showError('Login failed. Please try again.');
    }
});

// Form Validation
function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
}

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
    } else {
        emailInput.classList.remove('error');
    }
});`;

  const componentInfo = [
    {
      title: 'Logo & Branding',
      description: 'Brand identity with logo and application name',
      specs: 'Size: 80x80px, Format: SVG/PNG',
    },
    {
      title: 'Email Input',
      description: 'Email validation with icon indicator',
      specs: 'Type: email, Required, Pattern validation',
    },
    {
      title: 'Password Input',
      description: 'Secure password field with visibility toggle',
      specs: 'Type: password, Min-length: 8, Toggle visibility',
    },
    {
      title: 'Primary Action',
      description: 'Submit button with loading state',
      specs: 'Full width, Gradient background, Hover effect',
    },
    {
      title: 'Social Login',
      description: 'OAuth integration for Google and GitHub',
      specs: 'OAuth 2.0, Redirect flow, Token handling',
    },
    {
      title: 'Security Features',
      description: 'HTTPS only, CSRF protection, Rate limiting',
      specs: 'JWT tokens, Secure cookies, Session management',
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
          <span className="text-white/60 text-sm ml-3">login.html</span>
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
                <span className="text-white">{index + 1}</span>
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
          transition={{ delay: 0.6 }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762330469123-ce98036eff16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpbiUyMHNlY3VyaXR5fGVufDF8fHx8MTc2NTc1MjA1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Login Security"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 bg-slate-900/50">
            <p className="text-white text-sm">Security-focused login interface with modern authentication methods</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Wireframe View
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
      <div className={`${isMobile ? 'p-6' : 'p-12'} min-h-[700px] flex items-center justify-center relative`}>
        {/* Annotations */}
        {!isMobile && (
          <>
            {/* Email annotation */}
            <motion.div
              className="absolute left-4 top-1/3 bg-purple-500 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
              Email Input with Validation
              <div className="w-px h-8 bg-white absolute left-full top-1/2 -translate-y-1/2" />
            </motion.div>

            {/* Button annotation */}
            <motion.div
              className="absolute right-4 top-2/3 bg-pink-500 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="w-px h-8 bg-white absolute right-full top-1/2 -translate-y-1/2" />
              Primary CTA Button
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
          </>
        )}

        <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-md'} relative z-10`}>
          {/* Logo Section */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <div className="w-10 h-10 border-4 border-white rounded-xl" />
            </motion.div>
            <h1 className="text-gray-900 mb-2">Event Manager</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="admin@events.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="password"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-purple-500 transition-colors" />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between items-center'}`}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-purple-500 rounded" />
                  <span className="text-gray-600 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-purple-600 text-sm hover:text-purple-700 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-5">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-gray-500 text-sm">or continue with</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Social Login */}
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
                <motion.button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-xl py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Chrome className="w-5 h-5 text-blue-500" />
                  <span>Google</span>
                </motion.button>
                <motion.button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-xl py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </motion.button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 transition-colors">
                  Sign up
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
