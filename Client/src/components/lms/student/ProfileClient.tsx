"use client";

import { useState } from "react";
import { User, Mail, Phone, Calendar, MapPin, LogOut } from "lucide-react";

export default function ProfileClient() {
  const [isEditing, setIsEditing] = useState(false);

  const studentData = {
    profileImage: "👨‍🎓",
    fullName: "Samuel Bekele",
    studentId: "HW-2024-001",
    program: "Bachelor's Degree in Theology",
    enrollmentStatus: "Active",
    email: "samuel.bekele@hamere.edu",
    phone: "+251 911 234 567",
    gender: "Male",
    dateOfBirth: "1995-05-15",
    country: "Ethiopia",
    city: "Addis Ababa",
    address: "Bole, Addis Ababa",
    department: "Theology & Ministry",
    batch: "2024 - Cohort A",
    enrollmentDate: "2024-09-01",
    currentSemester: "1st Semester",
    academicStats: {
      coursesEnrolled: 5,
      assignmentsSubmitted: 12,
      certificatesEarned: 2,
      attendancePercentage: 94,
    },
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#d6ff00]/15 text-5xl">
            {studentData.profileImage}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">{studentData.fullName}</h1>
            <p className="mt-1 text-sm text-[#a5ff63]">{studentData.studentId}</p>
            <p className="mt-2 text-sm text-slate-300">{studentData.program}</p>
            <div className="mt-3 inline-block rounded-full bg-[#2e7d52]/20 px-4 py-1.5">
              <span className="text-xs font-semibold text-[#a5ff63]">{studentData.enrollmentStatus}</span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-2xl bg-[#d6ff00] px-6 py-3 text-sm font-semibold text-[#08120f] hover:bg-[#a6ff4d] transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
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
                <p className="text-sm text-slate-100">{studentData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#d6ff00]" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Phone</p>
                <p className="text-sm text-slate-100">{studentData.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Gender</p>
              <p className="mt-1 text-sm text-slate-100">{studentData.gender}</p>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-[#d6ff00]" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Date of Birth</p>
                <p className="text-sm text-slate-100">{studentData.dateOfBirth}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#d6ff00]" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Location</p>
                <p className="text-sm text-slate-100">{studentData.city}, {studentData.country}</p>
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
              <p className="mt-1 text-sm text-slate-100">{studentData.department}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Program</p>
              <p className="mt-1 text-sm text-slate-100">{studentData.program}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Batch</p>
              <p className="mt-1 text-sm text-slate-100">{studentData.batch}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Enrollment Date</p>
              <p className="mt-1 text-sm text-slate-100">{studentData.enrollmentDate}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Current Semester</p>
              <p className="mt-1 text-sm text-slate-100">{studentData.currentSemester}</p>
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
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">{studentData.academicStats.coursesEnrolled}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Assignments</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">{studentData.academicStats.assignmentsSubmitted}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Certificates</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">{studentData.academicStats.certificatesEarned}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Attendance</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">{studentData.academicStats.attendancePercentage}%</p>
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
