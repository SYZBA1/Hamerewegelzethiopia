export default function ListSection({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: { title: string; detail?: string }[];
}) {
  return (
    <section className="rounded-3xl border border-[#163832]/10 bg-white/95 p-8 shadow-[0_18px_40px_rgba(35,83,71,.08)]">
      <h3 className="text-2xl font-semibold text-[#051F20]">{title}</h3>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-slate-700">{description}</p>
      ) : null}
      <ul className="mt-6 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="rounded-2xl border border-slate-200/70 bg-[#F7FBF7] p-4">
            <p className="font-semibold text-[#051F20]">{item.title}</p>
            {item.detail ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
