"use client";

import { useState, useCallback } from "react";

export default function ModelLogoSection() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const onLogoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setLogoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);

  return (
    <section
      id="model-brand"
      className="relative overflow-hidden border-y border-[#076653]/15 bg-gradient-to-br from-[#E2FBCE]/40 via-[#FFFDEE]/40 to-white py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E3EF26]/15 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#076653]">Brand & identity</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0C342C] md:text-4xl">Model & logo</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#076653]/85 md:text-base">
            Upload your ministry or chapter logo for use on certificates and communications. Preview is stored locally in your browser only.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="flex flex-col rounded-2xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-[#076653]/10 backdrop-blur-md">
            <h3 className="font-serif text-lg font-semibold text-[#0C342C]">Visual model</h3>
            <p className="mt-2 text-sm text-[#076653]/80">
              Reference layout for presentations and digital materials (placeholder).
            </p>
            <div className="relative mt-6 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#E3EF26]/30 via-[#E2FBCE] to-[#076653]/20">
              <div className="rounded-2xl border border-white/40 bg-white/30 px-10 py-12 text-center shadow-inner backdrop-blur-sm">
                <span className="text-4xl text-[#076653]/80">✦</span>
                <p className="mt-3 font-serif text-sm font-medium text-[#0C342C]/80">Layout model</p>
                <p className="mt-1 text-xs text-[#076653]/65">Replace with your approved artwork</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-[#076653]/10 backdrop-blur-md">
            <h3 className="font-serif text-lg font-semibold text-[#0C342C]">Logo upload</h3>
            <p className="mt-2 text-sm text-[#076653]/80">PNG or SVG recommended — max 2MB for this preview.</p>
            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#076653]/25 bg-[#E2FBCE]/20 px-6 py-10 transition hover:border-[#E3EF26] hover:bg-[#E3EF26]/10">
              <span className="text-sm font-semibold text-[#0C342C]">Choose file</span>
              <span className="mt-1 text-xs text-[#076653]/70">Click to browse</span>
              <input type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
            </label>
            <div className="mt-6 flex min-h-[140px] items-center justify-center rounded-xl bg-[#0C342C]/5 p-6">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="Logo preview" className="max-h-32 max-w-full object-contain" />
              ) : (
                <p className="text-center text-sm text-[#076653]/55">No logo selected yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
