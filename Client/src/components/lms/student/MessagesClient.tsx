"use client";

import { useState } from "react";
import { Search, Send, Plus } from "lucide-react";

const recentChats = [
  { id: 1, name: "Dr. Abebe", role: "Instructor", message: "Good work on your essay submission", time: "2h ago", unread: true },
  { id: 2, name: "Pastor Alemayehu", role: "Instructor", message: "See you in class tomorrow", time: "1d ago", unread: false },
  { id: 3, name: "Class Group - Theology 101", role: "Group", message: "Samuel: Thanks for sharing the notes!", time: "3d ago", unread: false },
];

const teacherMessages = [
  { id: 101, from: "Dr. Miriam", subject: "Assignment Feedback", date: "May 12, 2026", preview: "Your pastoral care assignment..." },
  { id: 102, from: "Bishop Samuel", subject: "Ministry Workshop", date: "May 10, 2026", preview: "Reminder about the upcoming workshop..." },
];

const announcements = [
  { id: 201, title: "Semester Break Dates", date: "May 11, 2026", content: "The semester break will run from June 1-15..." },
  { id: 202, title: "New Course Available", date: "May 9, 2026", content: "Christian Ethics course is now open for enrollment..." },
  { id: 203, title: "Campus Maintenance", date: "May 8, 2026", content: "The campus will be closed on May 20 for maintenance..." },
];

export default function MessagesClient() {
  const [activeTab, setActiveTab] = useState<"chats" | "teachers" | "announcements">("chats");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 rounded-3xl border border-white/10 bg-[#111f16]/95 p-2 shadow-xl backdrop-blur-xl">
        {(["chats", "teachers", "announcements"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? "bg-[#d6ff00] text-[#08120f]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {tab === "chats" && "Chats"}
            {tab === "teachers" && "Teachers"}
            {tab === "announcements" && "Announcements"}
          </button>
        ))}
      </div>

      {/* Chats Tab */}
      {activeTab === "chats" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat List */}
          <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-4 shadow-xl backdrop-blur-xl lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full rounded-2xl p-3 text-left transition-colors ${
                    selectedChat === chat.id
                      ? "bg-[#d6ff00]/20 border border-[#d6ff00]/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm">{chat.name}</p>
                      <p className="text-xs text-slate-400">{chat.role}</p>
                      <p className="mt-1 truncate text-xs text-slate-400">{chat.message}</p>
                    </div>
                    {chat.unread && (
                      <div className="ml-2 h-2 w-2 rounded-full bg-[#d6ff00] flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl lg:col-span-2">
            {selectedChat ? (
              <div className="flex flex-col h-96">
                <h3 className="text-lg font-bold text-white mb-4">
                  {recentChats.find((c) => c.id === selectedChat)?.name}
                </h3>

                <div className="flex-1 overflow-y-auto space-y-3 mb-4 rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="rounded-lg bg-white/10 px-4 py-2 max-w-xs">
                    <p className="text-xs text-slate-400">Instructor</p>
                    <p className="text-sm text-slate-100">Hi Samuel, I reviewed your submission and it looks great!</p>
                  </div>
                  <div className="rounded-lg bg-[#d6ff00]/20 px-4 py-2 max-w-xs ml-auto">
                    <p className="text-sm text-slate-100">Thank you! I really appreciated the feedback.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                  <button className="rounded-lg bg-[#d6ff00] p-2 text-[#08120f] hover:bg-[#a6ff4d] transition-colors">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-slate-400 py-12">Select a chat to start messaging</p>
            )}
          </div>
        </div>
      )}

      {/* Teacher Messages Tab */}
      {activeTab === "teachers" && (
        <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
          <div className="space-y-3">
            {teacherMessages.map((msg) => (
              <div key={msg.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{msg.from}</p>
                    <p className="text-sm text-[#d6ff00] mt-1">{msg.subject}</p>
                    <p className="text-xs text-slate-400 mt-2">{msg.preview}</p>
                  </div>
                  <span className="text-xs text-slate-500 flex-shrink-0">{msg.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="rounded-2xl border border-[#d6ff00]/20 bg-[#d6ff00]/10 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{ann.title}</h3>
                    <p className="text-sm text-slate-300 mt-2">{ann.content}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">{ann.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
