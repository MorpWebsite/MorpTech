import { Navbar } from '../components/Navbar';
import { Link } from 'react-router';
import {
  Thermometer,
  Droplets,
  Activity,
  Lightbulb,
  Gauge,
  Wifi,
  Shield,
  Zap,
  Check
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart IoT Platform for
              <span className="text-blue-600"> Home & Garden</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Monitor and control your smart home and garden with real-time data from sensors.
              Connect your microcontroller and manage everything from one dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition"
              >
                Start Free Trial
              </Link>
              <a
                href="#features"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Image/Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Wifi className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">10K+</h3>
                  <p className="text-gray-600">Active Devices</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">99.9%</h3>
                  <p className="text-gray-600">Uptime</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">&lt;100ms</h3>
                  <p className="text-gray-600">Response Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Smart Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to monitor and control your IoT devices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sensor Monitoring */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Thermometer className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Temperature Monitoring</h3>
              <p className="text-gray-600">
                Real-time room temperature tracking with historical data and alerts
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Droplets className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Soil Moisture</h3>
              <p className="text-gray-600">
                Monitor soil moisture levels for optimal plant health and automated watering
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Gauge className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">pH Level Detection</h3>
              <p className="text-gray-600">
                Track soil pH levels to ensure optimal growing conditions
              </p>
            </div>

            {/* Control Features */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Lighting</h3>
              <p className="text-gray-600">
                Control lights remotely with scheduling and automation features
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-cyan-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pump Control</h3>
              <p className="text-gray-600">
                Automated irrigation system with manual override capabilities
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Connection</h3>
              <p className="text-gray-600">
                Your own Firebase database with encrypted connections
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Up to 3 devices</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Basic sensors</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>24h data retention</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Community support</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block text-center bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-blue-600 p-8 rounded-xl shadow-xl transform scale-105">
              <div className="bg-yellow-400 text-blue-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-blue-100">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-200 mr-2" />
                  <span>Up to 20 devices</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-200 mr-2" />
                  <span>All sensors & controls</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-200 mr-2" />
                  <span>30 days data retention</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-200 mr-2" />
                  <span>Email support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-200 mr-2" />
                  <span>Advanced automation</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block text-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Start Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Unlimited devices</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>All features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>1 year data retention</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Built for Makers and Innovators
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our IoT platform is designed for hobbyists, makers, and professionals who want
            complete control over their smart home and garden automation. With support for
            popular microcontrollers like ESP32, Arduino, and Raspberry Pi, you can easily
            integrate your existing projects.
          </p>
          <p className="text-lg text-gray-600">
            Each user gets their own Firebase database instance, ensuring your data stays
            private and secure. Simply input your Firebase credentials into your microcontroller,
            and start sending data immediately.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="h-6 w-6" />
                <span className="text-lg font-bold">IoT Platform</span>
              </div>
              <p className="text-gray-400">
                Smart home and garden automation made simple.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 IoT Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
