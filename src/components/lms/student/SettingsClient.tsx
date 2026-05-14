"use client";

import { useState } from "react";
import { Lock, Globe, Moon, Bell, Shield, LogOut, ChevronRight } from "lucide-react";

export default function SettingsClient() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("lmsAuth");
    window.location.href = "/lms/login";
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Account Settings */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-[#d6ff00]" />
              <span className="text-sm font-medium text-slate-100">Change Password</span>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>

          <button
            onClick={() => setTwoFA(!twoFA)}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-[#d6ff00]" />
              <div className="text-left">
                <span className="text-sm font-medium text-slate-100">Two-Factor Authentication</span>
                <p className="text-xs text-slate-500 mt-0.5">{twoFA ? "Enabled" : "Disabled"}</p>
              </div>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors ${twoFA ? "bg-[#d6ff00]" : "bg-white/10"}`} />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-[#d6ff00]" />
              <span className="text-sm font-medium text-slate-100">Manage Login Sessions</span>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* LMS Preferences */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">LMS Preferences</h2>

        <div className="space-y-4">
          {/* Language */}
          <div>
            <label className="flex items-center gap-3 mb-3">
              <Globe size={18} className="text-[#d6ff00]" />
              <span className="text-sm font-medium text-slate-100">Language</span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-[#d6ff00]/50 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="am">Amharic (አማርኛ)</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="flex items-center gap-3 mb-3">
              <Moon size={18} className="text-[#d6ff00]" />
              <span className="text-sm font-medium text-slate-100">Theme</span>
            </label>
            <div className="flex gap-3">
              {["light", "dark", "auto"].map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`flex-1 rounded-lg px-4 py-2 text-xs font-semibold transition-colors capitalize ${
                    theme === themeOption
                      ? "bg-[#d6ff00] text-[#08120f]"
                      : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  {themeOption}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Layout */}
          <div>
            <label className="block text-sm font-medium text-slate-100 mb-3">Dashboard Layout</label>
            <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-[#d6ff00]/50 focus:outline-none">
              <option>Compact</option>
              <option>Standard</option>
              <option>Wide</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Notification Settings</h2>

        <div className="space-y-3">
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-[#d6ff00]" />
              <div className="text-left">
                <span className="text-sm font-medium text-slate-100">Email Notifications</span>
                <p className="text-xs text-slate-500 mt-0.5">Receive updates via email</p>
              </div>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors ${emailNotifications ? "bg-[#d6ff00]" : "bg-white/10"}`} />
          </button>

          <button
            onClick={() => setSmsNotifications(!smsNotifications)}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-[#d6ff00]" />
              <div className="text-left">
                <span className="text-sm font-medium text-slate-100">SMS Notifications</span>
                <p className="text-xs text-slate-500 mt-0.5">Receive alerts via SMS</p>
              </div>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors ${smsNotifications ? "bg-[#d6ff00]" : "bg-white/10"}`} />
          </button>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm text-slate-100">Assignment Notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm text-slate-100">Class Reminders</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm text-slate-100">Grade Updates</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm text-slate-100">Marketing Emails</span>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Privacy & Security</h2>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-[#d6ff00]" />
              <span className="text-sm font-medium text-slate-100">View Active Sessions</span>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-[#d6ff00]" />
              <span className="text-sm font-medium text-slate-100">Connected Devices</span>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-[#d6ff00]" />
              <span className="text-sm font-medium text-slate-100">Security Logs</span>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500/20 hover:bg-red-500/30 px-6 py-3.5 text-sm font-semibold text-red-300 transition-colors border border-red-500/20"
      >
        <LogOut size={18} />
        Logout
      </button>

      {/* Help & Support */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Help & Support</h2>
        <div className="space-y-2">
          <button className="w-full text-left rounded-lg hover:bg-white/10 px-4 py-2 transition-colors text-sm text-slate-300">
            📖 FAQs
          </button>
          <button className="w-full text-left rounded-lg hover:bg-white/10 px-4 py-2 transition-colors text-sm text-slate-300">
            💬 Contact Support
          </button>
          <button className="w-full text-left rounded-lg hover:bg-white/10 px-4 py-2 transition-colors text-sm text-slate-300">
            📋 Terms of Service
          </button>
          <button className="w-full text-left rounded-lg hover:bg-white/10 px-4 py-2 transition-colors text-sm text-slate-300">
            🔒 Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
