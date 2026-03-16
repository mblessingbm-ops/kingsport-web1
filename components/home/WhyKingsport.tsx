import { CheckCircle2, Clock, Cog, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Clock,
    title: "26+ Years Manufacturing",
    description:
      "Incorporated in 1998, Kingsport has been supplying Zimbabwe's largest organisations across every sector — from mining to hospitality to government.",
  },
  {
    icon: Cog,
    title: "100% Local Production",
    description:
      "Every stitch happens in Zimbabwe. Full control over quality, lead times, and compliance means you get consistent product, every time.",
  },
  {
    icon: CheckCircle2,
    title: "International Compliance",
    description:
      "Our PPE range meets EN ISO 20345, EN 397, and other internationally recognised standards — providing traceable protection for your workforce.",
  },
  {
    icon: Users,
    title: "End-to-End Service",
    description:
      "Design consultation, manufacturing, branding, and delivery. Kingsport is a single supplier for everything from a single polo to a 500-staff uniform rollout.",
  },
];

export default function WhyKingsport() {
  return (
    <section className="py-20 md:py-28 bg-[#0a0508] relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #800020 0, #800020 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
            <p className="text-[#800020] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Why Kingsport
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-white leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Built on trust,
              <br />
              <em>delivered in decades.</em>
            </h2>
            <p className="text-[#8a7578] leading-relaxed mb-8 max-w-lg">
              When a mine needs 200 conti suits tomorrow, or a bank needs 500 branded polos for a
              new branch rollout, they call Kingsport. We&apos;ve been the answer for over two decades —
              not because of promises, but because of delivery.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "60+", l: "Product Lines" },
                { n: "1998", l: "Year Founded" },
                { n: "3", l: "Group Entities" },
                { n: "∞", l: "Custom Colours" },
              ].map(({ n, l }) => (
                <div
                  key={l}
                  className="border border-[#800020]/20 rounded-sm p-4 bg-[#130810]"
                >
                  <p
                    className="text-2xl font-semibold text-[#800020]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {n}
                  </p>
                  <p className="text-[#7a6568] text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: pillars */}
          <div className="space-y-5">
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-sm border border-[#800020]/10 bg-[#130810] hover:border-[#800020]/30 transition-all group"
              >
                <div className="w-10 h-10 flex-shrink-0 bg-[#800020]/12 border border-[#800020]/20 rounded-sm flex items-center justify-center group-hover:bg-[#800020]/25 transition-colors">
                  <Icon className="w-5 h-5 text-[#800020]" />
                </div>
                <div>
                  <h3
                    className="text-white font-medium mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#7a6568] text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
