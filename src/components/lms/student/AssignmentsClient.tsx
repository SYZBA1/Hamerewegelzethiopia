"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

const pendingAssignments = [
  {
    id: 1,
    title: "Biblical Analysis Essay",
    course: "Biblical Foundations",
    dueDate: "May 20, 2026",
    priority: "High",
    description: "Write a 2000-word essay analyzing key biblical themes",
  },
  {
    id: 2,
    title: "Pastoral Care Case Study",
    course: "Pastoral Care",
    dueDate: "May 22, 2026",
    priority: "Medium",
    description: "Complete case study on counseling techniques",
  },
  {
    id: 3,
    title: "Church History Timeline",
    course: "Church History",
    dueDate: "May 18, 2026",
    priority: "High",
    description: "Create a timeline of major church events",
  },
];

const submittedAssignments = [
  {
    id: 101,
    title: "Introduction to Ministry",
    course: "Ministry Leadership",
    submittedDate: "May 10, 2026",
    grade: "A",
    feedback: "Excellent work! Your analysis was thorough and well-researched.",
  },
  {
    id: 102,
    title: "Theology Reflection",
    course: "Biblical Foundations",
    submittedDate: "May 8, 2026",
    grade: "A-",
    feedback: "Strong submission. Consider exploring more diverse perspectives.",
  },
  {
    id: 103,
    title: "Liturgy Study",
    course: "Church History",
    submittedDate: "May 5, 2026",
    grade: "B+",
    feedback: "Good work. Your formatting could be improved for clarity.",
  },
];

export default function AssignmentsClient() {
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const getPriorityColor = (priority: string) => {
    if (priority === "High") return "text-red-400 bg-red-400/20";
    if (priority === "Medium") return "text-yellow-400 bg-yellow-400/20";
    return "text-green-400 bg-green-400/20";
  };

  return (
    <div className="space-y-6">
      {/* Pending Assignments */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Pending Assignments</h2>
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300">
            {pendingAssignments.length} Due
          </span>
        </div>

        <div className="space-y-4">
          {pendingAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{assignment.title}</h3>
                    <span className={`rounded-full px-2 py-1 text-[0.65rem] font-semibold ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{assignment.course}</p>
                  <p className="mt-2 text-sm text-slate-300">{assignment.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={14} />
                    Due: {assignment.dueDate}
                  </div>
                </div>
                <button
                  onClick={() => setUploadingId(uploadingId === assignment.id ? null : assignment.id)}
                  className="rounded-2xl bg-[#d6ff00]/20 px-4 py-2 text-xs font-semibold text-[#d6ff00] hover:bg-[#d6ff00]/30 transition-colors"
                >
                  Upload →
                </button>
              </div>

              {uploadingId === assignment.id && (
                <div className="mt-4 rounded-2xl border border-dashed border-[#d6ff00]/40 bg-[#d6ff00]/5 p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Upload size={16} className="text-[#d6ff00]" />
                    <span className="text-xs text-slate-300">Drag files here or click to browse</span>
                  </div>
                  <textarea
                    placeholder="Add notes about your submission..."
                    className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
                    rows={3}
                  />
                  <button className="mt-3 w-full rounded-lg bg-[#d6ff00] px-3 py-2 text-xs font-semibold text-[#08120f] hover:bg-[#a6ff4d] transition-colors">
                    Submit Assignment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submitted Assignments */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Submitted Assignments</h2>

        <div className="space-y-4">
          {submittedAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 hover:border-green-500/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-400" />
                    <h3 className="font-semibold text-white">{assignment.title}</h3>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{assignment.course}</p>
                  <p className="mt-2 text-sm text-slate-300">{assignment.feedback}</p>
                  <p className="mt-2 text-xs text-slate-500">Submitted: {assignment.submittedDate}</p>
                </div>
                <div className="text-right">
                  <div className="rounded-lg bg-white/10 px-3 py-2">
                    <p className="text-xs text-slate-400">Grade</p>
                    <p className="mt-1 text-2xl font-bold text-[#a5ff63]">{assignment.grade}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignment Statistics */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Assignment Statistics</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Submitted</p>
            <p className="mt-2 text-3xl font-bold text-green-400">{submittedAssignments.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Pending</p>
            <p className="mt-2 text-3xl font-bold text-red-400">{pendingAssignments.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Average Grade</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">A-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
