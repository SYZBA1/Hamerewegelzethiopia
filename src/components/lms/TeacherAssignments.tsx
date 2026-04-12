"use client";

import { memo } from "react";

interface Assignment {
  id: string;
  title: string;
  student: string;
  submittedDate: string;
  status: "pending" | "graded";
}

interface TeacherAssignmentsProps {
  assignments: Assignment[];
  onGrade?: (id: string) => void;
}

const TeacherAssignments = memo(function TeacherAssignments({ assignments, onGrade }: TeacherAssignmentsProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold text-white">Assignments to Grade</h2>
      <div className="mt-4 space-y-3">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="flex items-center justify-between rounded-xl border border-white/20 bg-[#0B2B26]/70 p-4">
            <div>
              <h3 className="text-sm font-semibold text-[#c8ddcb]">{assignment.title}</h3>
              <p className="text-xs text-[#cbe6ce]">by {assignment.student} • Submitted {assignment.submittedDate}</p>
            </div>
            <button
              onClick={() => onGrade?.(assignment.id)}
              className="rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-2 text-xs font-semibold text-[#091913]"
            >
              Grade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TeacherAssignments;