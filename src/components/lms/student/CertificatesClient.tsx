"use client";

import { Download, CheckCircle, Eye, QrCode } from "lucide-react";

const earnedCertificates = [
  {
    id: 1,
    name: "Completion Certificate",
    course: "Biblical Foundations 101",
    completionDate: "May 10, 2026",
    certificateId: "HW-2024-CERT-001",
    verificationStatus: "Verified",
  },
  {
    id: 2,
    name: "Excellence Award",
    course: "Pastoral Care Basics",
    completionDate: "April 28, 2026",
    certificateId: "HW-2024-CERT-002",
    verificationStatus: "Verified",
  },
];

const courseProgress = [
  {
    id: 101,
    course: "Church History",
    completionPercentage: 75,
    remainingLessons: 5,
    requiredAssessments: "2 of 4 completed",
  },
  {
    id: 102,
    course: "Ministry Leadership",
    completionPercentage: 90,
    remainingLessons: 2,
    requiredAssessments: "3 of 4 completed",
  },
  {
    id: 103,
    course: "Theology Practicum",
    completionPercentage: 100,
    remainingLessons: 0,
    requiredAssessments: "All completed",
  },
];

export default function CertificatesClient() {
  return (
    <div className="space-y-6">
      {/* Earned Certificates */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Earned Certificates ({earnedCertificates.length})</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {earnedCertificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl border border-[#d6ff00]/30 bg-gradient-to-br from-[#d6ff00]/10 to-[#a5ff63]/10 p-6 hover:border-[#d6ff00]/50 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-white text-sm">{cert.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{cert.course}</p>
                </div>
                <CheckCircle size={20} className="text-[#a5ff63]" />
              </div>

              <div className="space-y-2 mb-4 text-xs">
                <div>
                  <p className="text-slate-400">Completion Date</p>
                  <p className="text-slate-200">{cert.completionDate}</p>
                </div>
                <div>
                  <p className="text-slate-400">Certificate ID</p>
                  <p className="text-slate-200 font-mono text-[0.7rem]">{cert.certificateId}</p>
                </div>
                <div>
                  <p className="text-slate-400">Verification Status</p>
                  <p className="text-[#a5ff63] font-semibold">{cert.verificationStatus}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 rounded-lg bg-[#d6ff00]/20 px-3 py-2 text-xs font-semibold text-[#d6ff00] hover:bg-[#d6ff00]/30 transition-colors flex items-center justify-center gap-1">
                  <Download size={12} /> Download
                </button>
                <button className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/20 transition-colors flex items-center justify-center gap-1">
                  <Eye size={12} /> View
                </button>
                <button className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/20 transition-colors">
                  <QrCode size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Toward Certificates */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Progress Toward Certificates</h2>

        <div className="space-y-4">
          {courseProgress.map((progress) => (
            <div key={progress.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{progress.course}</h3>
                <span className="text-sm font-bold text-[#d6ff00]">{progress.completionPercentage}%</span>
              </div>

              <div className="mb-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#d6ff00] to-[#a5ff63] transition-all duration-500"
                  style={{ width: `${progress.completionPercentage}%` }}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div>
                  <p className="text-slate-400">Remaining Lessons</p>
                  <p className="text-slate-200">{progress.remainingLessons} lessons</p>
                </div>
                <div>
                  <p className="text-slate-400">Required Assessments</p>
                  <p className="text-slate-200">{progress.requiredAssessments}</p>
                </div>
              </div>

              {progress.completionPercentage < 100 && (
                <button className="mt-3 w-full rounded-lg bg-[#2e7d52]/30 px-3 py-2 text-xs font-semibold text-[#a5ff63] hover:bg-[#2e7d52]/50 transition-colors">
                  Continue Course
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Verification */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Verify a Certificate</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
              Certificate ID
            </label>
            <input
              type="text"
              placeholder="Enter certificate ID (e.g., HW-2024-CERT-001)"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-[#d6ff00]/50 focus:outline-none"
            />
          </div>

          <button className="w-full rounded-2xl bg-[#d6ff00] px-6 py-3 text-sm font-semibold text-[#08120f] hover:bg-[#a6ff4d] transition-colors">
            Verify Certificate
          </button>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p>✓ All certificates are digitally signed and can be verified instantly.</p>
            <p className="mt-2">✓ Employers and institutions can verify your credentials using the certificate ID.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
