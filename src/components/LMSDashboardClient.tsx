"use client";

import { useEffect, memo } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import clsx from "clsx";

interface Content {
  welcome: string;
  stats: {
    enrolled: string;
    completed: string;
    pending: string;
  };
  recentActivity: string;
  continueLearning: string;
}

export default memo(function LMSDashboardClient({ locale, c }: { locale: string; c: Content }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isAm = locale === "am";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/${locale}/lms`);
    }
  }, [user, isLoading, router, locale]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  const name = user.email.split('@')[0];

  return (
    <div style={{ background: "linear-gradient(135deg, #0C342C 0%, #076653 45%, #051F20 100%)", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Welcome Card */}
        <div style={{ background: "rgba(11,43,38,.5)", borderRadius: 20, padding: "2rem", border: "1px solid rgba(142,182,155,.12)", marginBottom: "2rem" }}>
          <h1 className={clsx("font-serif font-semibold text-white", isAm && "font-ethiopic")}>
            {c.welcome.replace('{name}', name)}
          </h1>
          <p className={clsx(isAm ? "font-ethiopic text-[.88rem]" : "font-sans text-[.96rem]")}
            style={{ color: "rgba(218,241,222,.6)", marginTop: "0.5rem" }}>
            {isAm ? "የትምህርት ሂደትዎን እንደገና ለመጀመር ያስቡ።" : "Ready to continue your learning journey."}
          </p>
        </div>

        {/* Stats Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ background: "rgba(35,83,71,.15)", borderRadius: 15, padding: "1.5rem", border: "1px solid rgba(142,182,155,.1)" }}>
            <h3 className={clsx(isAm ? "font-ethiopic text-[.9rem]" : "font-sans text-[.8rem] uppercase tracking-[.1em]")}
              style={{ color: "#8EB69B", marginBottom: "0.5rem" }}>{c.stats.enrolled}</h3>
            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#DAF1DE" }}>5</p>
          </div>
          <div style={{ background: "rgba(35,83,71,.15)", borderRadius: 15, padding: "1.5rem", border: "1px solid rgba(142,182,155,.1)" }}>
            <h3 className={clsx(isAm ? "font-ethiopic text-[.9rem]" : "font-sans text-[.8rem] uppercase tracking-[.1em]")}
              style={{ color: "#8EB69B", marginBottom: "0.5rem" }}>{c.stats.completed}</h3>
            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#DAF1DE" }}>2</p>
          </div>
          <div style={{ background: "rgba(35,83,71,.15)", borderRadius: 15, padding: "1.5rem", border: "1px solid rgba(142,182,155,.1)" }}>
            <h3 className={clsx(isAm ? "font-ethiopic text-[.9rem]" : "font-sans text-[.8rem] uppercase tracking-[.1em]")}
              style={{ color: "#8EB69B", marginBottom: "0.5rem" }}>{c.stats.pending}</h3>
            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#DAF1DE" }}>3</p>
          </div>
        </div>

        {/* Course Progress */}
        <div style={{ background: "rgba(11,43,38,.5)", borderRadius: 20, padding: "2rem", border: "1px solid rgba(142,182,155,.12)" }}>
          <h2 className={clsx("font-serif font-semibold mb-6", isAm && "font-ethiopic")}
            style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#DAF1DE" }}>
            {c.continueLearning}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {[
              { title: "Introduction to Theology", progress: 75 },
              { title: "Biblical Studies", progress: 45 },
              { title: "Church History", progress: 90 }
            ].map((course, i) => (
              <div key={i} style={{ background: "rgba(35,83,71,.15)", borderRadius: 10, padding: "1.5rem", border: "1px solid rgba(142,182,155,.08)" }}>
                <h4 className={clsx(isAm ? "font-ethiopic text-[.9rem]" : "font-sans text-[.9rem]")}
                  style={{ color: "#DAF1DE", marginBottom: "0.5rem" }}>{course.title}</h4>
                <div style={{ width: "100%", height: 8, background: "rgba(142,182,155,.2)", borderRadius: 4, overflow: "hidden", marginBottom: "0.5rem" }}>
                  <div style={{ width: `${course.progress}%`, height: "100%", background: "linear-gradient(90deg,#D4A853,#C9A96E)", borderRadius: 4 }}></div>
                </div>
                <p style={{ fontSize: ".8rem", color: "#8EB69B" }}>{course.progress}% Complete</p>
                <button style={{ marginTop: "1rem", padding: ".5rem 1rem", background: "#235347", color: "#DAF1DE", border: "none", borderRadius: 6, cursor: "pointer" }}>
                  {c.continueLearning}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});