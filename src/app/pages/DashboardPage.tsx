import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  LogOut,
  Settings,
  Thermometer,
  Droplets,
  Gauge,
  Lightbulb,
  Power,
  Wifi,
  WifiOff,
  TrendingUp,
  Home,
  Sprout
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SensorData {
  temperature: number;
  soilMoisture: number;
  phLevel: number;
  timestamp: Date;
}

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'garden'>('home');

  // Controls state
  const [lights, setLights] = useState({
    living: false,
    bedroom: false,
    kitchen: false,
  });
  const [pump, setPump] = useState(false);
  const [fan, setFan] = useState(false);

  // Sensor data
  const [currentData, setCurrentData] = useState<SensorData>({
    temperature: 24.5,
    soilMoisture: 45,
    phLevel: 6.8,
    timestamp: new Date(),
  });

  const [historicalData, setHistoricalData] = useState([
    { time: '00:00', temp: 23, moisture: 42, ph: 6.7 },
    { time: '04:00', temp: 22, moisture: 40, ph: 6.8 },
    { time: '08:00', temp: 24, moisture: 38, ph: 6.9 },
    { time: '12:00', temp: 26, moisture: 35, ph: 7.0 },
    { time: '16:00', temp: 25, moisture: 43, ph: 6.8 },
    { time: '20:00', temp: 24, moisture: 45, ph: 6.8 },
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => ({
        temperature: 20 + Math.random() * 10,
        soilMoisture: 30 + Math.random() * 40,
        phLevel: 6.0 + Math.random() * 2,
        timestamp: new Date(),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Check Firebase connection
  useEffect(() => {
    setIsConnected(!!user?.firebaseConfig);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLight = (room: keyof typeof lights) => {
    setLights(prev => ({ ...prev, [room]: !prev[room] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold">IoT Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <>
                    <Wifi className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-600">Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-5 w-5 text-red-500" />
                    <span className="text-sm text-gray-600">Not Connected</span>
                  </>
                )}
              </div>

              <Link
                to="/settings"
                className="p-2 text-gray-600 hover:text-blue-600 transition"
              >
                <Settings className="h-5 w-5" />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Firebase Warning */}
      {!isConnected && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <p className="text-yellow-800">
                Firebase is not configured. Please add your Firebase credentials in Settings.
              </p>
              <Link
                to="/settings"
                className="text-yellow-900 font-medium hover:underline"
              >
                Configure Now
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600">Monitor and control your smart devices</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-2 pb-4 border-b-2 transition ${
                activeTab === 'home'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Smart Home</span>
            </button>
            <button
              onClick={() => setActiveTab('garden')}
              className={`flex items-center space-x-2 pb-4 border-b-2 transition ${
                activeTab === 'garden'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sprout className="h-5 w-5" />
              <span className="font-medium">Smart Garden</span>
            </button>
          </div>
        </div>

        {/* Sensor Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Thermometer className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-2xl font-bold">{currentData.temperature.toFixed(1)}°C</p>
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>Normal range: 20-26°C</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Soil Moisture</p>
                  <p className="text-2xl font-bold">{currentData.soilMoisture.toFixed(0)}%</p>
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>Optimal: 40-60%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Gauge className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">pH Level</p>
                  <p className="text-2xl font-bold">{currentData.phLevel.toFixed(1)}</p>
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>Optimal: 6.0-7.5</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">
              {activeTab === 'home' ? 'Smart Home Controls' : 'Garden Controls'}
            </h3>

            <div className="space-y-4">
              {activeTab === 'home' ? (
                <>
                  {/* Living Room Light */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lightbulb className={`h-6 w-6 ${lights.living ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium">Living Room</p>
                        <p className="text-sm text-gray-500">Main Light</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLight('living')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        lights.living ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          lights.living ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Bedroom Light */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lightbulb className={`h-6 w-6 ${lights.bedroom ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium">Bedroom</p>
                        <p className="text-sm text-gray-500">Main Light</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLight('bedroom')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        lights.bedroom ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          lights.bedroom ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Kitchen Light */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lightbulb className={`h-6 w-6 ${lights.kitchen ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium">Kitchen</p>
                        <p className="text-sm text-gray-500">Main Light</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLight('kitchen')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        lights.kitchen ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          lights.kitchen ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Fan Control */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Power className={`h-6 w-6 ${fan ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium">Ceiling Fan</p>
                        <p className="text-sm text-gray-500">Living Room</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFan(!fan)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        fan ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          fan ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Water Pump */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Droplets className={`h-6 w-6 ${pump ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium">Water Pump</p>
                        <p className="text-sm text-gray-500">Irrigation System</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPump(!pump)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        pump ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          pump ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Garden Light */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lightbulb className={`h-6 w-6 ${lights.living ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium">Garden Light</p>
                        <p className="text-sm text-gray-500">Outdoor Lighting</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLight('living')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        lights.living ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          lights.living ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 Auto-watering is enabled. Pump will activate when soil moisture drops below 35%.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Historical Data Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Temperature History (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4">Device Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Object.values(lights).filter(Boolean).length}
              </p>
              <p className="text-sm text-gray-600">Lights On</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-sm text-gray-600">Sensors Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {pump ? '1' : '0'}
              </p>
              <p className="text-sm text-gray-600">Pumps Running</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {currentData.temperature.toFixed(1)}°C
              </p>
              <p className="text-sm text-gray-600">Current Temp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
