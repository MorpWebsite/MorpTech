import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  ArrowLeft,
  Database,
  User,
  Save,
  Copy,
  Check
} from 'lucide-react';

export function SettingsPage() {
  const { user, updateFirebaseConfig, logout } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: user?.firebaseConfig?.apiKey || '',
    authDomain: user?.firebaseConfig?.authDomain || '',
    databaseURL: user?.firebaseConfig?.databaseURL || '',
    projectId: user?.firebaseConfig?.projectId || '',
    storageBucket: user?.firebaseConfig?.storageBucket || '',
    messagingSenderId: user?.firebaseConfig?.messagingSenderId || '',
    appId: user?.firebaseConfig?.appId || '',
  });

  const handleSave = () => {
    updateFirebaseConfig(firebaseConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleCode = `
// Arduino/ESP32 Example Code
#include <WiFi.h>
#include <FirebaseESP32.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Firebase credentials
#define FIREBASE_HOST "${firebaseConfig.databaseURL || 'YOUR_DATABASE_URL'}"
#define FIREBASE_AUTH "${firebaseConfig.apiKey || 'YOUR_API_KEY'}"

FirebaseData firebaseData;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
  // Read sensor
  float temperature = readTemperature();
  float soilMoisture = readSoilMoisture();
  float phLevel = readPHLevel();

  // Send to Firebase
  Firebase.setFloat(firebaseData, "/sensors/temperature", temperature);
  Firebase.setFloat(firebaseData, "/sensors/soilMoisture", soilMoisture);
  Firebase.setFloat(firebaseData, "/sensors/phLevel", phLevel);

  // Read controls
  bool pumpState;
  Firebase.getBool(firebaseData, "/controls/pump", &pumpState);
  digitalWrite(PUMP_PIN, pumpState);

  delay(5000); // Update every 5 seconds
}
`.trim();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-bold">User Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={user?.name}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Firebase Configuration */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold">Firebase Configuration</h2>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">How to get your Firebase credentials:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
              <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
              <li>Create a new project or select existing one</li>
              <li>Go to Project Settings → General</li>
              <li>Scroll down to "Your apps" and add a Web app</li>
              <li>Copy the configuration values below</li>
            </ol>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="text"
                value={firebaseConfig.apiKey}
                onChange={(e) => setFirebaseConfig({ ...firebaseConfig, apiKey: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auth Domain
              </label>
              <input
                type="text"
                value={firebaseConfig.authDomain}
                onChange={(e) => setFirebaseConfig({ ...firebaseConfig, authDomain: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your-project.firebaseapp.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Database URL
              </label>
              <input
                type="text"
                value={firebaseConfig.databaseURL}
                onChange={(e) => setFirebaseConfig({ ...firebaseConfig, databaseURL: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://your-project-default-rtdb.firebaseio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project ID
              </label>
              <input
                type="text"
                value={firebaseConfig.projectId}
                onChange={(e) => setFirebaseConfig({ ...firebaseConfig, projectId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your-project-id"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage Bucket
              </label>
              <input
                type="text"
                value={firebaseConfig.storageBucket}
                onChange={(e) => setFirebaseConfig({ ...firebaseConfig, storageBucket: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your-project.appspot.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Messaging Sender ID
              </label>
              <input
                type="text"
                value={firebaseConfig.messagingSenderId}
                onChange={(e) => setFirebaseConfig({ ...firebaseConfig, messagingSenderId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123456789012"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                App ID
              </label>
              <input
                type="text"
                value={firebaseConfig.appId}
                onChange={(e) => setFirebaseConfig({ ...firebaseConfig, appId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1:123456789012:web:xxxxxxxxxxxxx"
              />
            </div>

            <button
              onClick={handleSave}
              className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {saved ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Microcontroller Code */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Microcontroller Code Example</h2>
            <button
              onClick={() => copyToClipboard(exampleCode)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{exampleCode}</code>
            </pre>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Save your Firebase configuration above first, then copy this code
              to your Arduino/ESP32. Install the FirebaseESP32 library from the Arduino Library Manager.
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border-2 border-red-200">
          <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to logout?')) {
                logout();
                navigate('/login');
              }
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
