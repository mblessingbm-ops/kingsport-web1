"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle } from "lucide-react";
import { products, categories } from "@/data/products";
import type { ProductCategory as Category } from "@/types";

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "" as Category | "",
    products: [] as string[],
    quantity: "",
    message: "",
    deadline: "",
  });

  // Pre-fill from URL param
  useEffect(() => {
    const productSlug = searchParams.get("product");
    const note = searchParams.get("note");
    if (productSlug) {
      const p = products.find((x) => x.slug === productSlug);
      if (p) {
        setForm((prev) => ({
          ...prev,
          category: p.category,
          products: [p.id],
          message: note ? `${p.name} — ${note}` : prev.message,
        }));
      }
    }
  }, [searchParams]);

  const filteredProducts = form.category
    ? products.filter((p) => p.category === form.category)
    : products;

  const toggleProduct = (id: string) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(id)
        ? prev.products.filter((x) => x !== id)
        : [...prev.products, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#800020]/15 border border-[#800020]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#800020]" />
          </div>
          <h2
            className="text-3xl font-light text-white mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Quote Request Received
          </h2>
          <p className="text-[#8a7578] leading-relaxed mb-6">
            Thank you, <strong className="text-[#c8b8bb]">{form.name}</strong>. Our team will review your
            requirements and respond to{" "}
            <strong className="text-[#c8b8bb]">{form.email}</strong> within one business day.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "", company: "", email: "", phone: "", category: "",
                products: [], quantity: "", message: "", deadline: "",
              });
            }}
            className="text-[#800020] text-sm hover:underline"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact info */}
      <div>
        <h3
          className="text-white text-xl font-medium mb-5 pb-3 border-b border-[#800020]/15"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Your Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name *", key: "name", type: "text", required: true, placeholder: "John Doe" },
            { label: "Company / Organisation *", key: "company", type: "text", required: true, placeholder: "Acme Corp Ltd" },
            { label: "Email Address *", key: "email", type: "email", required: true, placeholder: "john@example.com" },
            { label: "Phone Number", key: "phone", type: "tel", required: false, placeholder: "+263 77 000 0000" },
          ].map(({ label, key, type, required, placeholder }) => (
            <div key={key}>
              <label className="block text-[#7a6568] text-xs uppercase tracking-widest font-medium mb-2">
                {label}
              </label>
              <input
                type={type}
                required={required}
                placeholder={placeholder}
                value={form[key as keyof typeof form] as string}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                className="w-full bg-[#1a0c0f] border border-[#800020]/20 rounded-sm px-4 py-3 text-[#f0ece8] text-sm placeholder:text-[#4a3538] focus:outline-none focus:border-[#800020]/60 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product selection */}
      <div>
        <h3
          className="text-white text-xl font-medium mb-5 pb-3 border-b border-[#800020]/15"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Product Requirements
        </h3>

        {/* Category filter */}
        <div className="mb-4">
          <label className="block text-[#7a6568] text-xs uppercase tracking-widest font-medium mb-2">
            Filter by Category
          </label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value as Category | "", products: [] }))
            }
            className="w-full bg-[#1a0c0f] border border-[#800020]/20 rounded-sm px-4 py-3 text-sm text-[#f0ece8] focus:outline-none focus:border-[#800020]/60 transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product checkboxes */}
        <div className="max-h-52 overflow-y-auto border border-[#800020]/15 rounded-sm bg-[#0f0a0b] p-1">
          {filteredProducts.map((product) => (
            <label
              key={product.id}
              className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-sm transition-colors group ${
                form.products.includes(product.id)
                  ? "bg-[#800020]/10"
                  : "hover:bg-[#1a0c0f]"
              }`}
            >
              <div
                className={`w-4 h-4 border rounded-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                  form.products.includes(product.id)
                    ? "bg-[#800020] border-[#800020]"
                    : "border-[#800020]/30 group-hover:border-[#800020]/60"
                }`}
              >
                {form.products.includes(product.id) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={form.products.includes(product.id)}
                onChange={() => toggleProduct(product.id)}
                className="sr-only"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[#c8b8bb] text-sm truncate">{product.name}</p>
                <p className="text-[#5a4548] text-[10px] uppercase tracking-wider">
                  {categories.find(c => c.id === product.category)?.label}
                </p>
              </div>
            </label>
          ))}
        </div>

        {form.products.length > 0 && (
          <p className="text-[#800020] text-xs mt-2">
            {form.products.length} product{form.products.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      {/* Quantity & deadline */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#7a6568] text-xs uppercase tracking-widest font-medium mb-2">
            Approximate Quantity *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 150 units, 50 sets"
            value={form.quantity}
            onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))}
            className="w-full bg-[#1a0c0f] border border-[#800020]/20 rounded-sm px-4 py-3 text-sm text-[#f0ece8] placeholder:text-[#4a3538] focus:outline-none focus:border-[#800020]/60 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[#7a6568] text-xs uppercase tracking-widest font-medium mb-2">
            Required By Date
          </label>
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))}
            className="w-full bg-[#1a0c0f] border border-[#800020]/20 rounded-sm px-4 py-3 text-sm text-[#f0ece8] focus:outline-none focus:border-[#800020]/60 transition-colors [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-[#7a6568] text-xs uppercase tracking-widest font-medium mb-2">
          Additional Notes
        </label>
        <textarea
          rows={4}
          placeholder="Branding requirements, size breakdowns, special customisations, delivery location…"
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="w-full bg-[#1a0c0f] border border-[#800020]/20 rounded-sm px-4 py-3 text-sm text-[#f0ece8] placeholder:text-[#4a3538] focus:outline-none focus:border-[#800020]/60 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#800020] text-white font-medium rounded-sm hover:bg-[#a0002a] transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#800020]/30"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Quote Request
          </>
        )}
      </button>

      <p className="text-[#5a4548] text-xs text-center">
        We respond to all enquiries within one business day.
      </p>
    </form>
  );
}
