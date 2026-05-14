interface EnrollButtonProps {
  enrolled?: boolean;
}

export default function EnrollButton({ enrolled }: EnrollButtonProps) {
  if (enrolled) {
    return (
      <button className="w-full rounded-2xl bg-[#d6ff00]/10 px-3 py-2 text-xs font-semibold text-[#d6ff00] transition-colors hover:bg-[#d6ff00]/20">
        Continue Learning
      </button>
    );
  }

  return (
    <button className="w-full rounded-2xl bg-[#2e7d52]/30 px-3 py-2 text-xs font-semibold text-[#a5ff63] transition-colors hover:bg-[#2e7d52]/50">
      Enroll Now
    </button>
  );
}
