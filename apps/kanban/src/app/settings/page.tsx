'use client';

import LogoutButton from '@/components/buttons/LogoutButton';
import SaveButton from '@/components/buttons/SaveButton';
import ProfileSection from '@/components/settings/ProfileSection';
import PreferencesSection from '@/components/settings/PreferencesSection';

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
            <ProfileSection />

            <PreferencesSection />

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Actions
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <SaveButton onClick={() => alert('Changes saved')} />
                <LogoutButton />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
