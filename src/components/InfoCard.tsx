export default function InfoCard({ icon, title, description }: { icon?: string; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-300/40 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-200 text-2xl text-[#051F20]">{icon ?? "🔹"}</div>
      <h4 className="text-lg font-semibold text-[#051F20]">{title}</h4>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}
