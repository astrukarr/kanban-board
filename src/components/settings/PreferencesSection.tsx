'use client';

export default function PreferencesSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Preferences</h2>
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
            <h3 className="text-sm font-medium text-slate-700">Dark Mode</h3>
            <p className="text-sm text-slate-500">Switch to dark theme</p>
          </div>
          <input
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
          />
        </div>
      </div>
    </section>
  );
}
