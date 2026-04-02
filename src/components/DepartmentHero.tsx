export default function DepartmentHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="w-full bg-gradient-to-b from-[#051F20] to-[#0B2B26] py-20 text-center text-white">
      <div className="mx-auto max-w-3xl px-4">
        <p className="mb-2 text-sm uppercase tracking-widest text-amber-200">Department</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-amber-100/90 sm:text-xl">{subtitle}</p>
      </div>
    </section>
  );
}
