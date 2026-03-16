import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#0f0a0b]">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #44000f 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#800020 1px, transparent 1px), linear-gradient(90deg, #800020 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#800020] text-xs tracking-[0.3em] uppercase font-medium mb-4">
          Get Started Today
        </p>
        <h2
          className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Your workforce deserves
          <br />
          <em>to look the part.</em>
        </h2>
        <p className="text-[#8a7578] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether it&apos;s 10 polos for a new office or 1,000 conti suits for a mine rollout — submit your
          brief and we&apos;ll come back with a detailed quote within one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-10 py-4 bg-[#800020] text-white font-medium rounded-sm hover:bg-[#a0002a] transition-all hover:shadow-lg hover:shadow-[#800020]/30"
          >
            Request a Quote
          </Link>
          <Link
            href="/catalog"
            className="px-10 py-4 border border-[#800020]/40 text-[#c8b8bb] font-medium rounded-sm hover:border-[#800020] hover:text-white transition-all"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
