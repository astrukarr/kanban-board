'use client';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Settings</h1>
            <p className="text-slate-600">
              Manage your account and application preferences
            </p>
          </div>

          <div className="space-y-8">
            {/* Profile Section */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-slate-500">
                      Receive email updates about your projects
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700">
                      Dark Mode
                    </h3>
                    <p className="text-sm text-slate-500">
                      Switch to dark theme
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                  />
                </div>
              </div>
            </section>

            {/* Actions Section */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Actions
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
