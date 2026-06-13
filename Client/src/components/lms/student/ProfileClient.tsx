"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, MapPin, Loader2, Save, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const API_URL = "http://localhost:5000/api/v1";

export default function ProfileClient() {
  const { user, login } = useAuth(); // We'll use login to refresh context user
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "Male",
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "",
        country: user.country || "",
        city: user.city || "",
        address: user.address || "",
        profileImage: user.profileImage || "👨‍🎓"
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/updatedetails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        // We might want a dedicated refresh function in AuthContext, 
        // but for now, we can manually update if we had a setUser export.
        // Since we don't, we can just reload or assume it worked and update local state.
        setIsEditing(false);
        window.location.reload(); // Quick way to refresh AuthContext state
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#d6ff00]/15 text-5xl">
            {user.profileImage || '👨‍🎓'}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">{user.username}</h1>
            <p className="mt-1 text-sm text-[#a5ff63]">{user.studentId || 'N/A'}</p>
            <p className="mt-2 text-sm text-slate-300">{user.program || 'General Program'}</p>
            <div className="mt-3 inline-block rounded-full bg-[#2e7d52]/20 px-4 py-1.5">
              <span className="text-xs font-semibold text-[#a5ff63]">Active</span>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-2xl bg-[#d6ff00] px-6 py-3 text-sm font-semibold text-[#08120f] hover:bg-[#a6ff4d] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-2xl bg-[#d6ff00] px-6 py-3 text-sm font-semibold text-[#08120f] hover:bg-[#a6ff4d] transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white">Personal Information</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#d6ff00]" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#d6ff00]/50 focus:outline-none"
                  />
                ) : (
                  <p className="text-sm text-slate-100">{user.email}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#d6ff00]" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Phone</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#d6ff00]/50 focus:outline-none"
                  />
                ) : (
                  <p className="text-sm text-slate-100">{user.phone || "Not provided"}</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Gender</p>
              {isEditing ? (
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#d6ff00]/50 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="mt-1 text-sm text-slate-100">{user.gender || "Not specified"}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-[#d6ff00]" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Date of Birth</p>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#d6ff00]/50 focus:outline-none"
                  />
                ) : (
                  <p className="text-sm text-slate-100">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "N/A"}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#d6ff00]" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Location</p>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input
                      placeholder="City"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#d6ff00]/50 focus:outline-none"
                    />
                    <input
                      placeholder="Country"
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#d6ff00]/50 focus:outline-none"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-slate-100">{user.city || "N/A"}, {user.country || "N/A"}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white">Academic Information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Department</p>
              <p className="mt-1 text-sm text-slate-100">{user.department || "General Theology"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Program</p>
              <p className="mt-1 text-sm text-slate-100">{user.program || "Standard Degree"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Batch</p>
              <p className="mt-1 text-sm text-slate-100">{user.batch || "2024"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Enrollment Date</p>
              <p className="mt-1 text-sm text-slate-100">{user.enrollmentDate ? new Date(user.enrollmentDate).toLocaleDateString() : "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Current Semester</p>
              <p className="mt-1 text-sm text-slate-100">{user.currentSemester || "1st Semester"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Progress */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-lg font-bold text-white">Academic Progress</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Courses Enrolled</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">5</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Assignments</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">12</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Certificates</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">2</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Attendance</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">94%</p>
          </div>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-lg font-bold text-white">Account Settings</h2>
        <div className="mt-4 space-y-3">
          <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 hover:bg-white/10 transition-colors">
            🔐 Change Password
          </button>
          <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 hover:bg-white/10 transition-colors">
            🔑 Two-Factor Authentication
          </button>
          <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 hover:bg-white/10 transition-colors">
            🔔 Notification Preferences
          </button>
          <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 hover:bg-white/10 transition-colors">
            🔒 Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
}
