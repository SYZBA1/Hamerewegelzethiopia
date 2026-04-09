export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-3xl border border-[#163832]/10 bg-white/95 p-8 shadow-[0_24px_60px_rgba(35,83,71,.08)]">
      {eyebrow ? (
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-amber-500">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold text-[#051F20] sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">{description}</p>
    </section>
  );
}
