import { redirect } from "next/navigation";

export default function LMSIndexPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/lms/login`);

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href="/lms/login"
            className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3 text-center font-semibold text-[#091913] shadow-lg shadow-amber-400/30 hover:shadow-[0_0_25px_rgba(250,202,21,0.65)]"
          >
            Login
          </Link>
          <Link
            href="/lms/register"
            className="rounded-xl border border-white/20 bg-[#0B2B26]/80 px-6 py-3 text-center font-semibold text-white hover:bg-[#235347]"
          >
            Register
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/10 p-4 text-center text-sm text-[#c7e2d3]">
          <p className="font-semibold text-white">Try sample credentials</p>
          <p>Student: student@example.com / Password123!</p>
          <p>Teacher: teacher@example.com / Teacher123!</p>
          <p>Administrator: admin@example.com / Admin123!</p>
        </div>
      </div>
    </main>
  );
}
