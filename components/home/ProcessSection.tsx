const STEPS = [
  {
    number: "01",
    title: "Enquire & Specify",
    description:
      "Submit your quote request with product type, quantities, sizes, and branding requirements. Our team responds within 24 hours.",
  },
  {
    number: "02",
    title: "Design & Sampling",
    description:
      "We create design mockups for your approval. Physical samples available for orders above minimum quantity.",
  },
  {
    number: "03",
    title: "Production",
    description:
      "100% local manufacturing at our Harare facility. Full quality checks throughout the production run.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Packaged and delivered to your door — Harare, Bulawayo, or anywhere in Zimbabwe. Export orders handled for regional clients.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0a0508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#800020] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            How It Works
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            From brief to delivery —{" "}
            <em>it&apos;s that straightforward.</em>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#800020]/30 to-transparent" />

          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Number circle */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#130810] border border-[#800020]/30 flex items-center justify-center mb-6 group-hover:border-[#800020] transition-all group-hover:bg-[#800020]/10">
                <span
                  className="text-[#800020] text-2xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="text-white font-medium mb-2 text-lg"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {step.title}
              </h3>
              <p className="text-[#7a6568] text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
