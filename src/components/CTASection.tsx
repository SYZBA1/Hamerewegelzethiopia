import Link from "next/link";

export default function CTASection({ onContactHref, onFullStructureHref }: { onContactHref: string; onFullStructureHref: string }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <div className="rounded-xl bg-gradient-to-r from-[#0B2B26] to-[#051F20] p-8 text-center text-white shadow-2xl">
        <h3 className="text-2xl font-bold">Questions about departments or programmes?</h3>
        <p className="mt-2 text-md text-amber-100/90">Contact the central team or browse our departments hub.</p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={onContactHref} className="w-full rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-[#091913] transition hover:bg-amber-400 sm:w-auto">
            Contact
          </Link>
          <Link href={onFullStructureHref} className="w-full rounded-lg border border-amber-200 px-6 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-900/40 sm:w-auto">
            View departments
          </Link>
        </div>
      </div>
    </section>
  );
}
