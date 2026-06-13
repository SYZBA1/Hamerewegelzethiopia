"use client";

import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type PlatformType = "hamere-wengel" | "saint-cyril";

type SidebarItem = { slug: string; label: string };

type SectionContent = {
  title: string;
  subtitle: string;
  cards: Array<{ title: string; value?: string; note?: string }>;
  features: string[];
};

function normalizeRole(role: string) {
  const r = String(role || "").trim().toLowerCase();
  if (r === "super admin" || r === "super-admin" || r === "administrator" || r === "admin") return "administrator";
  if (r === "teacher" || r === "instructor") return "teacher";
  return "student";
}

const hamereSidebar: SidebarItem[] = [
  { slug: "dashboard", label: "Dashboard" },
  { slug: "website-content", label: "Website Content" },
  { slug: "departments", label: "Departments" },
  { slug: "news-articles", label: "News and Articles" },
  { slug: "events", label: "Events" },
  { slug: "media-library", label: "Media Library" },
  { slug: "sermons", label: "Sermons" },
  { slug: "users", label: "Users" },
  { slug: "donations", label: "Donations" },
  { slug: "notifications", label: "Notifications" },
  { slug: "website-settings", label: "Website Settings" },
  { slug: "analytics", label: "Analytics" },
];

const saintSidebar: SidebarItem[] = [
  { slug: "dashboard", label: "Dashboard" },
  { slug: "admissions", label: "Admissions" },
  { slug: "students", label: "Students" },
  { slug: "teachers", label: "Teachers" },
  { slug: "courses", label: "Courses" },
  { slug: "classes", label: "Classes" },
  { slug: "assignments", label: "Assignments" },
  { slug: "certificates", label: "Certificates" },
  { slug: "departments", label: "Departments" },
  { slug: "finance", label: "Finance" },
  { slug: "reports", label: "Reports" },
  { slug: "settings", label: "Settings" },
];

const hamereContent: Record<string, SectionContent> = {
  dashboard: {
    title: "Hamere Wengel Ethiopia Dashboard",
    subtitle: "Website Management and Ministry Platform",
    cards: [
      { title: "Website Visitors", value: "38,420" },
      { title: "Total Members", value: "2,140" },
      { title: "Upcoming Events", value: "8" },
      { title: "Published Articles", value: "126" },
    ],
    features: ["New Content", "Recent Donations", "Latest Users", "Upcoming Programs"],
  },
  "website-content": {
    title: "Website Content Module",
    subtitle: "Manage public website pages and content system",
    cards: [{ title: "Managed Pages", value: "24" }, { title: "Draft Pages", value: "6" }],
    features: ["Manage Homepage", "About Page", "Mission and Vision", "Leadership Pages", "Dynamic Sections", "SEO Management"],
  },
  departments: {
    title: "Departments Module",
    subtitle: "Department structure and leadership",
    cards: [{ title: "Departments", value: "12" }, { title: "Leaders", value: "15" }],
    features: ["Create Department", "Edit Department", "Department Leaders", "Department Pages", "Ministry Structures"],
  },
  "news-articles": {
    title: "News and Articles Module",
    subtitle: "Publishing and editorial control",
    cards: [{ title: "Published", value: "126" }, { title: "Drafts", value: "14" }],
    features: ["Create News", "Publish Articles", "Categories", "Featured Posts", "Draft System"],
  },
  events: {
    title: "Events Module",
    subtitle: "Programs and calendar management",
    cards: [{ title: "Upcoming Events", value: "8" }, { title: "Registrations", value: "296" }],
    features: ["Upcoming Events", "Conferences", "Programs", "Calendar Management", "Registration Forms"],
  },
  "media-library": {
    title: "Media Library Module",
    subtitle: "Digital assets and gallery management",
    cards: [{ title: "Images", value: "3,200" }, { title: "Videos", value: "420" }],
    features: ["Images", "Videos", "Documents", "Audio Sermons", "Gallery Management"],
  },
  sermons: {
    title: "Sermons Module",
    subtitle: "Sermon publishing and streaming",
    cards: [{ title: "Uploaded Sermons", value: "860" }, { title: "Series", value: "54" }],
    features: ["Upload Sermons", "Series Management", "Speaker Profiles", "Downloads", "Streaming Links"],
  },
  users: {
    title: "Users Module",
    subtitle: "Public platform user management",
    cards: [{ title: "Registered Users", value: "5,248" }, { title: "New This Month", value: "214" }],
    features: ["User Directory", "Role Assignment", "Account Status", "Moderation Controls"],
  },
  donations: {
    title: "Donations Module",
    subtitle: "Campaign and donation finance operations",
    cards: [{ title: "Monthly Donations", value: "ETB 1.2M" }, { title: "Active Campaigns", value: "5" }],
    features: ["Donation Tracking", "Campaign Management", "Financial Reports", "Payment Integration"],
  },
  notifications: {
    title: "Notifications Module",
    subtitle: "Broadcasts and system alerts",
    cards: [{ title: "Pending Alerts", value: "7" }, { title: "Sent This Week", value: "22" }],
    features: ["Audience Segments", "Schedule Notifications", "Email Broadcast", "In-App Notices"],
  },
  "website-settings": {
    title: "Website Settings Module",
    subtitle: "Platform configuration and global controls",
    cards: [{ title: "System Status", value: "Healthy" }, { title: "Uptime", value: "99.98%" }],
    features: ["Theme Settings", "Site Configuration", "Navigation", "Integrations", "Localization"],
  },
  analytics: {
    title: "Analytics Module",
    subtitle: "Traffic and engagement reporting",
    cards: [{ title: "Monthly Traffic", value: "128K" }, { title: "Engagement", value: "67%" }],
    features: ["Website Traffic", "User Engagement", "Popular Content", "Donation Analytics"],
  },
};

const saintContent: Record<string, SectionContent> = {
  dashboard: {
    title: "Saint Cyril College Dashboard",
    subtitle: "LMS Management, Students, Teachers and Academic System",
    cards: [
      { title: "Total Students", value: "2,184" },
      { title: "Total Teachers", value: "164" },
      { title: "Active Courses", value: "238" },
      { title: "Pending Admissions", value: "96" },
    ],
    features: ["Course Completion", "Attendance Rates", "Assignments Submitted", "Academic Performance"],
  },
  admissions: {
    title: "Admissions Module",
    subtitle: "Application workflow and decisions",
    cards: [{ title: "Applications", value: "312" }, { title: "Pending Review", value: "96" }],
    features: ["Review Applications", "Approve Students", "Reject Applications", "Send Admission Letters"],
  },
  students: {
    title: "Students Module",
    subtitle: "Student lifecycle and records",
    cards: [{ title: "Active Students", value: "2,184" }, { title: "At Risk", value: "74" }],
    features: ["Manage Students", "Student Profiles", "Academic Records", "Attendance", "Performance Tracking"],
  },
  teachers: {
    title: "Teachers Module",
    subtitle: "Teaching staff management",
    cards: [{ title: "Teachers", value: "164" }, { title: "Assigned Courses", value: "238" }],
    features: ["Manage Teachers", "Assign Courses", "Monitor Performance", "Teaching Schedules"],
  },
  courses: {
    title: "Courses Module",
    subtitle: "Curriculum and course operations",
    cards: [{ title: "Courses", value: "238" }, { title: "Lessons", value: "4,820" }],
    features: ["Create Courses", "Assign Teachers", "Manage Lessons", "Course Categories"],
  },
  classes: {
    title: "Classes Module",
    subtitle: "Live class delivery and schedules",
    cards: [{ title: "Live Classes", value: "34" }, { title: "Recorded Sessions", value: "902" }],
    features: ["Live Classes", "Schedules", "Recorded Sessions", "Attendance Tracking"],
  },
  assignments: {
    title: "Assignments Module",
    subtitle: "Submission and grading oversight",
    cards: [{ title: "Open Assignments", value: "412" }, { title: "Needs Review", value: "167" }],
    features: ["Assignment Review", "Submission Monitoring", "Grading Oversight"],
  },
  certificates: {
    title: "Certificates Module",
    subtitle: "Certification and verification",
    cards: [{ title: "Issued", value: "1,504" }, { title: "Pending Approval", value: "59" }],
    features: ["Generate Certificates", "Approve Completion", "Certificate Templates", "Verification System"],
  },
  departments: {
    title: "Departments Module",
    subtitle: "Academic department management",
    cards: [{ title: "Departments", value: "18" }, { title: "Heads", value: "18" }],
    features: ["Department Management", "Program Mapping", "Academic Structure", "Staff Allocation"],
  },
  finance: {
    title: "Finance Module",
    subtitle: "Fees and financial reporting",
    cards: [{ title: "Collected Tuition", value: "ETB 8.4M" }, { title: "Outstanding", value: "ETB 1.1M" }],
    features: ["Student Payments", "Tuition Tracking", "Invoices", "Financial Reports"],
  },
  reports: {
    title: "Reports and Analytics Module",
    subtitle: "Institution-wide insights and exports",
    cards: [{ title: "Academic Reports", value: "56" }, { title: "Attendance Reports", value: "78" }],
    features: ["Academic Reports", "Performance Analytics", "Enrollment Reports", "Attendance Reports"],
  },
  settings: {
    title: "Settings Module",
    subtitle: "Platform and admin preferences",
    cards: [{ title: "Role System", value: "6 roles" }, { title: "System Health", value: "Healthy" }],
    features: ["Super Admin", "Website Manager", "Academic Admin", "Finance Admin", "Content Manager", "Teacher", "Student"],
  },
};

export default function SuperAdminPlatform({ platform, section }: { platform: PlatformType; section?: string }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [stats, setStats] = useState({
    studentCount: 0,
    teacherCount: 0,
    courseCount: 0,
    pendingAdmissions: 0
  });

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ username: "", email: "", password: "" });
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteMessage, setInviteMessage] = useState({ type: "", text: "" });

  const locale = useMemo(() => {
    const segment = pathname.split("/")[1];
    return segment === "am" ? "am" : "en";
  }, [pathname]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/${locale}/lms/login`);
      return;
    }
    const role = normalizeRole(user.role || "");
    if (role !== "administrator") {
      router.replace(`/${locale}/lms/dashboard/${role}`);
    }
  }, [user, loading, locale, router]);

  useEffect(() => {
    const fetchStats = async () => {
      if (platform !== "saint-cyril" || !user) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('lms_token')}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      }
    };

    fetchStats();
  }, [platform, user]);

  const handleInviteTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/admin/invite-teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('lms_token')}`
        },
        body: JSON.stringify(inviteData)
      });

      const data = await res.json();
      if (data.success) {
        setInviteMessage({ type: "success", text: "Teacher invited successfully!" });
        setInviteData({ username: "", email: "", password: "" });
        setTimeout(() => setInviteModalOpen(false), 2000);
        // Refresh stats
        const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/admin/stats`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('lms_token')}` }
        });
        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.data);
      } else {
        setInviteMessage({ type: "error", text: data.message || "Failed to invite teacher" });
      }
    } catch (err) {
      setInviteMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setInviteLoading(false);
    }
  };

  const userName = user?.username || "Super Admin";

  const items = platform === "hamere-wengel" ? hamereSidebar : saintSidebar;
  const contentMap = platform === "hamere-wengel" ? hamereContent : saintContent;
  const current = section && contentMap[section] ? section : "dashboard";
  const currentModule = useMemo(() => {
    const base = contentMap[current];
    if (platform === "saint-cyril" && current === "dashboard") {
      return {
        ...base,
        cards: [
          { title: "Total Students", value: stats.studentCount.toLocaleString() },
          { title: "Total Teachers", value: stats.teacherCount.toLocaleString() },
          { title: "Active Courses", value: stats.courseCount.toLocaleString() },
          { title: "Pending Admissions", value: stats.pendingAdmissions.toLocaleString() },
        ]
      };
    }
    return base;
  }, [contentMap, current, platform, stats]);

  const title = platform === "hamere-wengel" ? "Hamere Wengel Ethiopia" : "Saint Cyril College";
  const subtitle = platform === "hamere-wengel"
    ? "Manage Website and Ministry Platform"
    : "Manage LMS, Students and Academic System";

  const prefix = `/${locale}/admin/${platform}`;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#f8fbf8] text-[#1d2a22]">
      <header className="border-b border-[#d8e4da] bg-white px-4 py-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#4d6a5a]">Super Admin</p>
            <h1 className="text-xl font-bold text-[#163325]">{title}</h1>
            <p className="text-sm text-[#4e6256]">{subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full border border-[#d5e2d8] bg-white px-3 py-1">{userName}</span>
            <span className="rounded-full border border-[#d5e2d8] bg-white px-3 py-1">Role: Super Admin</span>
            <span className="rounded-full border border-[#d5e2d8] bg-[#ecf7ef] px-3 py-1 text-[#24573c]">System Status: Healthy</span>
            <Link href={`/${locale}/admin/dashboard-selector`} className="rounded-full border border-[#d5e2d8] bg-white px-3 py-1">Switch Dashboard</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] gap-6 px-4 py-6 md:px-8">
        <aside className="hidden w-72 shrink-0 rounded-3xl border border-[#d7e4db] bg-white p-4 lg:block">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#4d6a5a]">Menu</p>
          <ul className="space-y-1">
            {items.map((item) => {
              const href = item.slug === "dashboard" ? prefix : `${prefix}/${item.slug}`;
              const active = current === item.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    className={`block rounded-xl px-3 py-2 text-sm transition ${active ? "bg-[#d6ff00] text-[#112014] font-semibold" : "text-[#234132] hover:bg-[#edf6ef]"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#d6ff00] px-3 py-2 text-sm font-semibold text-[#112014]"
          >
            Logout
          </button>
        </aside>

        <main className="min-w-0 flex-1 space-y-6">
          <section className="rounded-3xl border border-[#d7e4db] bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#183625]">{currentModule.title}</h2>
              {platform === "saint-cyril" && current === "teachers" && (
                <button
                  onClick={() => setInviteModalOpen(true)}
                  className="rounded-xl bg-[#d6ff00] px-4 py-2 text-sm font-semibold text-[#112014] hover:bg-[#c4eb00] transition-colors"
                >
                  Invite Teacher
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-[#4d6457]">{currentModule.subtitle}</p>
          </section>

          {/* Invitation Modal */}
          {inviteModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl border border-[#d7e4db] bg-white p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-[#183625]">Invite New Teacher</h3>
                <p className="text-sm text-[#4d6457] mt-1">Create a new instructor account for Saint Cyril College.</p>
                
                <form onSubmit={handleInviteTeacher} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d6a5a]">Username</label>
                    <input
                      required
                      type="text"
                      value={inviteData.username}
                      onChange={(e) => setInviteData({ ...inviteData, username: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#d8e4da] bg-[#f8fbf8] p-3 text-sm focus:border-[#d6ff00] focus:outline-none"
                      placeholder="johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d6a5a]">Email Address</label>
                    <input
                      required
                      type="email"
                      value={inviteData.email}
                      onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#d8e4da] bg-[#f8fbf8] p-3 text-sm focus:border-[#d6ff00] focus:outline-none"
                      placeholder="teacher@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d6a5a]">Temporary Password</label>
                    <input
                      required
                      type="password"
                      value={inviteData.password}
                      onChange={(e) => setInviteData({ ...inviteData, password: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#d8e4da] bg-[#f8fbf8] p-3 text-sm focus:border-[#d6ff00] focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  {inviteMessage.text && (
                    <p className={`text-sm font-medium ${inviteMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {inviteMessage.text}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setInviteModalOpen(false)}
                      className="flex-1 rounded-xl border border-[#d8e4da] py-3 text-sm font-semibold text-[#4d6a5a] hover:bg-[#f8fbf8] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={inviteLoading}
                      type="submit"
                      className="flex-1 rounded-xl bg-[#d6ff00] py-3 text-sm font-semibold text-[#112014] hover:bg-[#c4eb00] transition-colors disabled:opacity-50"
                    >
                      {inviteLoading ? "Sending..." : "Send Invitation"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {currentModule.cards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-[#d7e4db] bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#5d7266]">{card.title}</p>
                {card.value ? <p className="mt-2 text-2xl font-bold text-[#193726]">{card.value}</p> : null}
                {card.note ? <p className="mt-1 text-xs text-[#607569]">{card.note}</p> : null}
              </article>
            ))}
          </section>

          <section className="rounded-3xl border border-[#d7e4db] bg-white p-6">
            <h3 className="text-lg font-bold text-[#183625]">Features</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {currentModule.features.map((feature) => (
                <div key={feature} className="rounded-xl bg-[#f0f7f2] px-3 py-2 text-sm text-[#244635]">
                  {feature}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
