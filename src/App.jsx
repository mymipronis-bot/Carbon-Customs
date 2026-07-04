import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hfbohbvaqeauwrcgbcur.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmYm9oYnZhcWVhdXdyY2diY3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3OTIyMDksImV4cCI6MjA5ODM2ODIwOX0.8O1gPIUcffo7-TMxFGuhPUzpNNPSUPPYI1uEy30Gn8o";
const supabase = createClient(supabaseUrl, supabaseKey);

const FALLBACK_PRODUCTS = [
  { id: 1, name: "GT Carbon Wheel", price: 449, category: "Sport", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", badge: "Bestseller", specs: ["3K Carbon Fiber Weave", "Hand-stitched Nappa Leather", "350mm Diameter"] },
  { id: 2, name: "Race Edition Wheel", price: 549, category: "Racing", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80", badge: "Premium", specs: ["2×2 Twill Carbon", "Alcantara Suede Grip", "330mm Diameter"] },
  { id: 3, name: "Street Custom Wheel", price: 349, category: "Street", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80", badge: null, specs: ["3K Carbon Fiber", "Perforated Leather", "370mm Diameter"] },
  { id: 4, name: "Drift Pro Wheel", price: 499, category: "Racing", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", badge: "New", specs: ["Forged Carbon", "Dual-tone Suede", "340mm Diameter"] },
  { id: 5, name: "Classic Carbon Wheel", price: 399, category: "Sport", image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&q=80", badge: null, specs: ["3K Carbon Fiber", "Smooth Leather Wrap", "360mm Diameter"] },
  { id: 6, name: "Signature Series Wheel", price: 699, category: "Luxury", image: "https://images.unsplash.com/photo-1568844293986-ca9c5c0b3b61?w=600&q=80", badge: "Exclusive", specs: ["Premium Forged Carbon", "Full-grain Leather", "350mm Diameter"] },
];

const FALLBACK_HERO = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
];

const BODY_PARTS = [
  "Steering Wheel", "Side Mirrors", "Hood", "Trunk Lid",
  "Spoiler", "Door Panels", "Dashboard Trim", "Shift Knob",
  "Seat Covers", "Roof", "Side Skirts", "Other",
];
const TESTIMONIALS = [
  { name: "Frank Martins", city: "New York City", text: "The team was super helpful in guiding me through the selection process. The carbon fiber wheel I purchased was easy to install and gave my car the aggressive look I wanted.", rating: 5 },
  { name: "James Reyes", city: "Miami, FL", text: "Build quality is next level. Fit was perfect and the leather stitching is flawless. Worth every dollar.", rating: 5 },
  { name: "Diana Cole", city: "Austin, TX", text: "Fast communication on WhatsApp, shipped exactly when promised. My Mustang's interior looks completely different now.", rating: 5 },
];
const PAYMENT_METHODS = ["Zelle", "Apple Pay", "Chime","Credit Card","Bitcoin"];
const CATEGORIES = ["All", "Sport", "Racing", "Street","Body Parts","Luxury"];
const WHATSAPP_NUMBER = "18392288550";
const INSTAGRAM = "https://www.instagram.com/customs_carbon";
const EMAIL = "carboncustoms792@gmail.com";

const formatPrice = (p) => "$" + Number(p).toLocaleString("en-US");

const buildWhatsAppMsg = (form, product) => {
  const lines = [
    `🔥 *New Order — Carbon Customs*`, ``,
    `👤 *Customer:* ${form.name}`,
    `📞 *Phone:* ${form.phone}`,
    `📍 *Address:* ${form.address}`,
    `🚗 *Car Make & Model:* ${form.car}`, ``,
    `🛞 *Product:* ${product ? product.name : form.product}`,
    `💰 *Price:* ${product ? formatPrice(product.price) : "—"}`,
    `💳 *Payment Method:* ${form.paymentMethod}`,
    form.parts.length > 0 ? `🔧 *Body Parts:* ${form.parts.join(", ")}` : ``,
    ``, form.note ? `📝 *Notes:* ${form.note}` : ``,
  ].filter((l) => l !== undefined).join("\n");
  return encodeURIComponent(lines);
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #080808; --surface: #0D0D0D; --card: #111111; --border: #1C1C1C;
    --blue: #0066FF; --blue-dim: #0044CC; --blue-glow: rgba(0,102,255,0.12);
    --red: #FF3B3B; --red-dim: #CC2222; --white: #F0F0F0; --muted: #505050; --radius: 3px;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--black); color: var(--white); font-family: 'Inter', serif; font-size: 15px; line-height: 1.6; -webkit-font-smoothing: antialiased; }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 5vw; height: 64px; background: rgba(8,8,8,0.96); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.55rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--white); text-decoration: none; display: flex; align-items: center; gap: 0.6rem; }
  .nav-logo img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  .nav-logo span { color: var(--blue); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { color: var(--muted); text-decoration: none; font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; transition: color 0.2s; }
  .nav-links a:hover { color: var(--white); }
  .nav-cta { background: var(--blue); color: #fff; border: none; padding: 0.48rem 1.3rem; font-family: 'Space Mono', monospace; font-size: 0.66rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); transition: background 0.2s, box-shadow 0.2s; }
  .nav-cta:hover { background: var(--blue-dim); box-shadow: 0 0 20px var(--blue-glow); }

  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 5vw 9vh; position: relative; overflow: hidden; background: #080808; }
  .hero-carbon-texture { position: absolute; inset: 0; z-index: 0; background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 8px); background-size: 8px 8px; }
  .hero-slideshow { position: absolute; inset: 0; z-index: 1; }
  .hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1s ease-in-out; }
  .hero-slide.active { opacity: 1; }
  .hero-slide img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7) saturate(1.15) contrast(1.1); }
  .hero-bg { position: absolute; inset: 0; z-index: 2; background: linear-gradient(180deg, rgba(8,8,8,0.05) 0%, rgba(8,8,8,0.35) 55%, #080808 100%), linear-gradient(90deg, rgba(8,8,8,0.2) 0%, transparent 50%, rgba(8,8,8,0.2) 100%); }
  .hero-dots { position: absolute; bottom: 3.5vh; left: 5vw; z-index: 4; display: flex; gap: 0.5rem; }
  .hero-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.25); border: none; cursor: pointer; transition: background 0.3s, transform 0.3s; padding: 0; }
  .hero-dot.active { background: var(--blue); transform: scale(1.4); }
  .hero-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.66rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--blue); margin-bottom: 1.4rem; position: relative; z-index: 3; display: flex; align-items: center; gap: 0.8rem; }
  .hero-eyebrow::before { content: ''; display: inline-block; width: 28px; height: 1px; background: var(--blue); flex-shrink: 0; }
  .hero-title { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(4rem, 11vw, 9.5rem); line-height: 0.9; letter-spacing: -0.01em; text-transform: uppercase; position: relative; z-index: 3; max-width: 14ch; }
  .hero-title-outline { -webkit-text-stroke: 1.5px rgba(255,255,255,0.12); color: transparent; display: block; }
  .hero-title em { color: var(--blue); font-style: normal; display: block; }
  .hero-sub { max-width: 420px; color: var(--muted); font-size: 0.88rem; line-height: 1.85; margin-top: 1.8rem; position: relative; z-index: 3; }
  .hero-actions { display: flex; gap: 1rem; margin-top: 2.6rem; position: relative; z-index: 3; flex-wrap: wrap; }
  .btn-primary { background: var(--blue); color: #fff; border: none; padding: 0.9rem 2.2rem; font-family: 'Space Mono', monospace; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
  .btn-primary:hover { background: var(--blue-dim); transform: translateY(-2px); box-shadow: 0 8px 30px var(--blue-glow); }
  .btn-outline { background: transparent; color: var(--white); border: 1px solid #252525; padding: 0.9rem 2.2rem; font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); transition: border-color 0.2s, color 0.2s; }
  .btn-outline:hover { border-color: var(--blue); color: var(--blue); }
  .hero-stats { position: absolute; right: 5vw; bottom: 9vh; z-index: 3; display: flex; flex-direction: column; gap: 2rem; text-align: right; }
  .stat-num { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 2.8rem; color: var(--blue); line-height: 1; letter-spacing: -0.02em; }
  .stat-label { font-size: 0.62rem; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; font-family: 'Space Mono', monospace; }

  .section { padding: 6rem 5vw; }
  .section-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.63rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blue); margin-bottom: 0.7rem; display: flex; align-items: center; gap: 0.7rem; }
  .section-eyebrow::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--blue); flex-shrink: 0; }
  .section-title { font-family: 'Playfair Display', serif; font-weight: 800; font-size: clamp(2.4rem, 5.5vw, 4rem); letter-spacing: -0.01em; text-transform: uppercase; line-height: 0.95; }
  .section-header { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem; }

  .filter-bar { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .filter-btn { background: transparent; color: var(--muted); border: 1px solid var(--border); padding: 0.38rem 1rem; font-family: 'Space Mono', monospace; font-size: 0.63rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: all 0.18s; }
  .filter-btn:hover { color: var(--white); border-color: #333; }
  .filter-btn.active { background: var(--blue); color: #fff; border-color: var(--blue); box-shadow: 0 0 14px var(--blue-glow); }

  .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5px; background: var(--border); border: 1px solid var(--border); }
  .product-card { background: var(--card); cursor: pointer; transition: background 0.2s; position: relative; overflow: hidden; }
  .product-card:hover { background: #161616; }
  .product-card:hover .card-img { transform: scale(1.03); }
  .product-card:hover .card-hover-line { transform: scaleX(1); }
  .card-hover-line { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--blue); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
  .card-img-wrap { overflow: hidden; background: #0a0a0a; display: flex; align-items: center; justify-content: center; min-height: 220px; max-height: 360px; }
  .card-img { width: 100%; max-height: 360px; object-fit: contain; display: block; transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); padding: 0.6rem; }
  .card-badge { position: absolute; top: 12px; left: 12px; background: var(--red); color: #fff; font-family: 'Space Mono', monospace; font-size: 0.56rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.22rem 0.55rem; }
  .card-body { padding: 1.2rem 1.4rem 1.5rem; }
  .card-cat { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--red-dim); margin-bottom: 0.3rem; font-family: 'Space Mono', monospace; }
  .card-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.35rem; letter-spacing: 0.02em; line-height: 1.05; text-transform: uppercase; margin-bottom: 0.85rem; }
  .card-specs { list-style: none; margin-bottom: 1rem; }
  .card-specs li { font-size: 0.72rem; color: var(--muted); padding: 0.26rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.5rem; }
  .card-specs li::before { content: "—"; color: var(--blue); font-size: 0.5rem; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem; }
  .card-price { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.1rem; color: var(--red); letter-spacing: 0.02em; }
  .card-btn { background: transparent; color: var(--blue); border: 1px solid var(--blue); padding: 0.38rem 0.9rem; font-family: 'Space Mono', monospace; font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); transition: background 0.2s, color 0.2s; }
  .card-btn:hover { background: var(--blue); color: #fff; }

  .process-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-top: 3rem; }
  .process-step { background: var(--card); padding: 2rem; transition: background 0.2s; }
  .process-step:hover { background: #161616; }
  .step-num { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 4rem; color: #1e1e1e; line-height: 1; margin-bottom: 1rem; letter-spacing: -0.02em; }
  .step-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.2rem; letter-spacing: 0.03em; text-transform: uppercase; margin-bottom: 0.6rem; }
  .step-desc { font-size: 0.79rem; color: var(--muted); line-height: 1.78; }

  .order-section { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .order-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5vw; align-items: start; }
  .order-info h2 { font-family: 'Playfair Display', serif; font-weight: 800; font-size: clamp(2.2rem, 4.5vw, 3.5rem); letter-spacing: -0.01em; text-transform: uppercase; line-height: 0.95; margin-bottom: 1.2rem; }
  .order-info p { color: var(--muted); font-size: 0.85rem; line-height: 1.85; margin-bottom: 1.2rem; }
  .order-guarantee { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2rem; }
  .guarantee-item { display: flex; align-items: center; gap: 0.8rem; font-size: 0.79rem; color: var(--muted); }
  .guarantee-icon { color: var(--red); font-size: 0.75rem; flex-shrink: 0; }

  .order-form { display: flex; flex-direction: column; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  .form-label { font-family: 'Space Mono', monospace; font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
  .form-input, .form-select, .form-textarea { background: #0a0a0a; color: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.75rem 1rem; font-family: 'Inter', sans-serif; font-size: 0.85rem; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; }
  .form-input:focus, .form-select:focus, .form-textarea:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(0,102,255,0.08); }
  .form-select option { background: #0a0a0a; }
  .form-textarea { resize: vertical; min-height: 80px; }

  /* Body parts checkboxes */
  .parts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
  .part-check { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.6rem; border: 1px solid var(--border); border-radius: var(--radius); cursor: pointer; transition: border-color 0.2s, background 0.2s; font-size: 0.75rem; color: var(--muted); }
  .part-check.selected { border-color: var(--blue); background: rgba(0,102,255,0.08); color: var(--white); }
  .part-check-dot { width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid var(--muted); flex-shrink: 0; transition: background 0.2s, border-color 0.2s; }
  .part-check.selected .part-check-dot { background: var(--blue); border-color: var(--blue); }

  .form-submit { background: #25D366; color: #fff; border: none; padding: 1rem; font-family: 'Space Mono', monospace; font-size: 0.76rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; gap: 0.6rem; transition: background 0.2s, transform 0.15s; margin-top: 0.5rem; }
  .form-submit:hover { background: #1ebe5a; transform: translateY(-1px); }

  .footer { background: var(--black); border-top: 1px solid var(--border); padding: 3rem 5vw 2rem; }
  .footer-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border); }
  .footer-logo { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 1.7rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .footer-logo span { color: var(--blue); }
  .footer-tagline { font-size: 0.74rem; color: var(--muted); margin-top: 0.4rem; letter-spacing: 0.05em; }
  .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center; }
  .footer-links a { color: var(--muted); text-decoration: none; font-size: 0.78rem; transition: color 0.2s; }
  .footer-links a:hover { color: var(--blue); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding-top: 1.5rem; }
  .footer-copy { font-size: 0.68rem; color: #2e2e2e; }
  .footer-made { font-size: 0.68rem; color: #2a2a2a; }
  .footer-made span { color: var(--blue-dim); }

  .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .modal { background: var(--card); border: 1px solid var(--border); max-width: 560px; width: 100%; max-height: 90vh; overflow-y: auto; border-radius: 2px; position: relative; }
  .modal-top-bar { height: 3px; background: linear-gradient(90deg, var(--blue) 0%, var(--red) 100%); }
  .modal-close { position: absolute; top: 1rem; right: 1rem; background: #1a1a1a; border: none; color: var(--muted); width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; transition: background 0.2s, color 0.2s; }
  .modal-close:hover { background: var(--blue); color: #fff; }
  .modal-img { width: 100%; max-height: 420px; object-fit: contain; display: block; background: #0a0a0a; padding: 1rem; }
  .modal-body { padding: 1.5rem; }
  .modal-cat { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--red-dim); font-family: 'Space Mono', monospace; }
  .modal-name { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 2.1rem; letter-spacing: 0.02em; text-transform: uppercase; margin: 0.4rem 0 1rem; line-height: 1; }
  .modal-specs { list-style: none; margin-bottom: 1.2rem; }
  .modal-specs li { font-size: 0.79rem; color: var(--muted); padding: 0.4rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.5rem; }
  .modal-specs li::before { content: "◆"; color: var(--blue); font-size: 0.4rem; }
  .modal-price { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.5rem; color: var(--red); margin-bottom: 1.2rem; letter-spacing: 0.02em; }
  .modal-order-btn { width: 100%; background: #25D366; color: #fff; border: none; padding: 0.9rem; font-family: 'Space Mono', monospace; font-size: 0.74rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; gap: 0.6rem; transition: background 0.2s; }
  .modal-order-btn:hover { background: #1ebe5a; }
  .search-bar { position: relative; margin-bottom: 1.5rem; max-width: 360px; }
  .search-input { width: 100%; background: #0a0a0a; color: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.7rem 1rem 0.7rem 2.4rem; font-family: 'Inter', sans-serif; font-size: 0.82rem; transition: border-color 0.2s, box-shadow 0.2s; }
  .search-input:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(0,102,255,0.08); }
  .search-input::placeholder { color: var(--muted); }
  .search-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 0.85rem; pointer-events: none; }
  .search-empty { color: var(--muted); font-size: 0.85rem; padding: 2rem 0; text-align: center; grid-column: 1 / -1; }
  .payment-list { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: #0a0a0a; }
  .payment-option { display: flex; align-items: center; gap: 0.7rem; padding: 0.85rem 1rem; cursor: pointer; border-bottom: 1px solid var(--border); transition: background 0.15s; }
  .payment-option:last-child { border-bottom: none; }
  .payment-option:hover { background: #131313; }
  .payment-radio { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid var(--muted); flex-shrink: 0; position: relative; }
  .payment-option.selected .payment-radio { border-color: var(--blue); }
  .payment-option.selected .payment-radio::after { content: ''; position: absolute; inset: 3px; border-radius: 50%; background: var(--blue); }
  .payment-option-label { font-size: 0.82rem; color: var(--white); }
  .payment-reveal { padding: 0.85rem 1rem; background: #0d0d0d; border-bottom: 1px solid var(--border); font-size: 0.76rem; color: var(--muted); line-height: 1.6; }
  .testimonial-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5px; background: var(--border); border: 1px solid var(--border); margin-top: 3rem; }
  .testimonial-card { background: var(--card); padding: 2rem; transition: background 0.2s; }
  .testimonial-card:hover { background: #161616; }
  .testimonial-stars { color: var(--blue); font-size: 0.85rem; letter-spacing: 0.15em; margin-bottom: 1rem; }
  .testimonial-text { font-size: 0.83rem; color: var(--muted); line-height: 1.85; margin-bottom: 1.5rem; font-style: italic; }
  .testimonial-author { display: flex; align-items: center; gap: 0.7rem; }
  .testimonial-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--blue); color: #fff; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-weight: 700; font-size: 0.8rem; flex-shrink: 0; }
  .testimonial-name { font-size: 0.82rem; font-weight: 600; color: var(--white); }
  .testimonial-city { font-size: 0.68rem; color: var(--muted); }
    @media (max-width: 768px) {
    .hero-stats { display: none; }
    .order-inner { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .footer-top { flex-direction: column; }
    .parts-grid { grid-template-columns: 1fr 1fr; }
    .nav-logo { font-size: 1.15rem; gap: 0.4rem; }
    .nav-logo img { width: 30px; height: 30px; }
    .nav-cta { padding: 0.4rem 0.8rem; font-size: 0.58rem; }
    .nav { padding: 0 4vw; }
  }
`;

function HeroSlideshow({ images }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <>
      <div className="hero-slideshow">
        {images.map((url, i) => (
          <div key={i} className={`hero-slide${i === current ? " active" : ""}`}>
            <img src={url} alt="" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="hero-dots">
          {images.map((_, i) => (
            <button key={i} className={`hero-dot${i === current ? " active" : ""}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
      )}
    </>
  );
}

function ProductModal({ product, onClose, onOrder }) {
  if (!product) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-bar" />
        <button className="modal-close" onClick={onClose}>✕</button>
        <img src={product.image} alt={product.name} className="modal-img" />
        <div className="modal-body">
          <p className="modal-cat">{product.category}</p>
          <h3 className="modal-name">{product.name}</h3>
          {product.badge && (
            <span style={{ background: "var(--red)", color: "#fff", fontSize: "0.58rem", fontFamily: "'Space Mono',monospace", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.2rem 0.55rem", display: "inline-block", marginBottom: "0.8rem" }}>
              {product.badge}
            </span>
          )}
          <ul className="modal-specs">
            {product.specs.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p className="modal-price">{formatPrice(product.price)}</p>
          <button className="modal-order-btn" onClick={() => onOrder(product)}>
            <span>📲</span> Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
function ReturnPolicyModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-bar" />
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <p className="modal-cat">Customer Care</p>
          <h3 className="modal-name" style={{ fontSize: "1.7rem" }}>Return Policy</h3>
          <p style={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.85, marginBottom: "1rem" }}>
            At Carbon Customs, your satisfaction is our priority. We offer a 30-day return
            window from the date of delivery for unwanted or faulty products.
          </p>
          <ul className="modal-specs">
            <li>Unwanted items must be returned unused, in original condition and packaging.</li>
            <li>Faulty or damaged items are eligible for a full refund or free replacement.</li>
            <li>Return shipping is free for faulty products; buyer covers return shipping for unwanted items.</li>
            <li>Refunds are processed within 5–7 business days after we receive the returned item.</li>
            <li>To start a return, contact us via WhatsApp or email with your order details.</li>
          </ul>
          <p style={{ color: "var(--muted)", fontSize: "0.78rem", lineHeight: 1.8 }}>
            Questions? Reach us at <a href={`mailto:${EMAIL}`} style={{ color: "var(--blue)" }}>{EMAIL}</a> or via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
function OrderForm({ preselectedProduct, products }) {
  const [form, setForm] = useState({
    name: "", phone: "", address: "", car: "",
    product: preselectedProduct?.name || "", parts: [], note: "",
    paymentMethod: "Zelle Pay"
  });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const togglePart = (part) => {
    setForm((f) => ({
      ...f,
      parts: f.parts.includes(part) ? f.parts.filter((p) => p !== part) : [...f.parts, part]
    }));
  };

  const handleSubmit = (method) => {
    if (!form.name || !form.phone || !form.product) return;
    const product = products.find((p) => p.name === form.product);
    const msg = buildWhatsAppMsg(form, product);

    if (method === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    } else {
      const emailSubject = encodeURIComponent(`New Order — ${form.name}`);
      const emailBody = decodeURIComponent(msg).replace(/\*/g, "");
      window.location.href = `mailto:${EMAIL}?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;
    }

    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="order-form">
      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input className="form-input" placeholder="e.g. James Wilson" value={form.name} onChange={set("name")} />
      </div>
      <div className="form-group">
        <label className="form-label">Payment Method</label>
        <div className="payment-list">
          {PAYMENT_METHODS.map((method) => (
            <div key={method}>
              <div
                className={`payment-option${form.paymentMethod === method ? " selected" : ""}`}
                onClick={() => setForm((f) => ({ ...f, paymentMethod: method }))}
              >
                <span className="payment-radio" />
                <span className="payment-option-label">{method}</span>
              </div>
              {form.paymentMethod === method && (
                <div className="payment-reveal">
                  Proceed with your order, we will provide you with {method} details.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Phone (WhatsApp) *</label>
        <input className="form-input" placeholder="e.g. (555) 123-4567" value={form.phone} onChange={set("phone")} />
      </div>
      <div className="form-group">
        <label className="form-label">Address</label>
        <input className="form-input" placeholder="e.g. 123 Main St, Los Angeles, CA" value={form.address} onChange={set("address")} />
      </div>
      <div className="form-group">
        <label className="form-label">Car Make & Model</label>
        <input className="form-input" placeholder="e.g. Lexus IS350, Ford Mustang GT" value={form.car} onChange={set("car")} />
      </div>
      <div className="form-group">
        <label className="form-label">Desired Product *</label>
        <select className="form-select" value={form.product} onChange={set("product")}>
          <option value="">— Select a product —</option>
          {products.map((p) => (
            <option key={p.id} value={p.name}>{p.name} — {formatPrice(p.price)}</option>
          ))}
          <option value="Full Custom">Full Custom Build (quote on request)</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Body Parts Needed</label>
        <div className="parts-grid">
          {BODY_PARTS.map((part) => (
            <div
              key={part}
              className={`part-check${form.parts.includes(part) ? " selected" : ""}`}
              onClick={() => togglePart(part)}
            >
              <span className="part-check-dot" />
              {part}
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Additional Notes</label>
        <textarea className="form-textarea" placeholder="Thread color, leather type, initials, special requests..." value={form.note} onChange={set("note")} />
      </div>
      <div style={{ display: "flex", gap: "0.7rem" }}>
        <button className="form-submit" style={{ flex: 1 }} onClick={() => handleSubmit("whatsapp")}>
          <span>📲</span>
          {sent ? "Redirecting..." : "Send via WhatsApp"}
        </button>
        <button className="form-submit" style={{ flex: 1, background: "#0066FF" }} onClick={() => handleSubmit("email")}>
          <span>📧</span>
          {sent ? "Redirecting..." : "Send via Email"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [heroImages, setHeroImages] = useState(FALLBACK_HERO);
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [{ data: prodData }, { data: heroData }, { data: settingsData }] = await Promise.all([
          supabase.from("products").select("*").order("created_at", { ascending: true }),
          supabase.from("hero_images").select("*").order("sort_order", { ascending: true }),
          supabase.from("settings").select("*"),
        ]);
        if (!mounted) return;
        if (prodData?.length > 0) setProducts(prodData.map((p) => ({ id: p.id, name: p.name, price: p.price, category: p.category, image: p.image_url, badge: p.badge, specs: p.specs || [] })));
        if (heroData?.length > 0) setHeroImages(heroData.map((h) => h.image_url));
        if (settingsData) {
          const logo = settingsData.find((s) => s.key === "logo_url");
          if (logo) setLogoUrl(logo.value);
        }
      } catch (err) {
        console.error("Supabase fetch failed:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  const handleOrder = (product) => {
    setSelectedProduct(null);
    setOrderProduct(product);
    setTimeout(() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <>
      <style>{css}</style>

      <nav className="nav">
        <a href="#" className="nav-logo">
          <img src={logoUrl} alt="Carbon Customs" />
          CARBON<span>CUSTOMS</span>
        </a>
        <ul className="nav-links">
          <li><a href="#catalogue">Catalogue</a></li>
          <li><a href="#process">Our Process</a></li>
          <li><a href="#order">Order Now</a></li>
        </ul>
        <button
          className="nav-cta"
          onClick={() => document.getElementById("order").scrollIntoView({ behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", padding: 0, borderRadius: "50%" }}
        >
          🛒
        </button>
      </nav>

      <section className="hero">
        <div className="hero-carbon-texture" />
        <HeroSlideshow images={heroImages} />
        <div className="hero-bg" />
        <p className="hero-eyebrow">Handcrafted · USA</p>
        <h1 className="hero-title">
          <span className="hero-title-outline">Your Wheel.</span>
          <em>Your Identity.</em>
        </h1>
        <p className="hero-sub">Premium custom carbon fiber steering wheels, handbuilt to order. Every stitch, every layer — made for you.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById("catalogue").scrollIntoView({ behavior: "smooth" })}>Browse Catalogue</button>
          <button className="btn-outline" onClick={() => document.getElementById("order").scrollIntoView({ behavior: "smooth" })}>Build My Wheel</button>
        </div>
        <div className="hero-stats">
          <div><p className="stat-num">120+</p><p className="stat-label">Wheels Delivered</p></div>
          <div><p className="stat-num">3K</p><p className="stat-label">Carbon Weave</p></div>
          <div><p className="stat-num">100%</p><p className="stat-label">Custom Built</p></div>
        </div>
      </section>

      <section className="section" id="catalogue">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Collection</p>
            <h2 className="section-title">Our Products</h2>
          </div>
          {!loading && (
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#2a8a3e", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2a8a3e", display: "inline-block" }} />
              Live Inventory
            </span>
          )}
        </div>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search a product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-bar">
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`filter-btn${activeCategory === cat ? " active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>
        <div className="product-grid">
          {filtered.length === 0 && <p className="search-empty">No products match your search.</p>}
          {filtered.map((product) => (
          
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              {product.badge && <span className="card-badge">{product.badge}</span>}
              <div className="card-img-wrap">
                <img src={product.image} alt={product.name} className="card-img" />
              </div>
              <div className="card-body">
                <p className="card-cat">{product.category}</p>
                <h3 className="card-name">{product.name}</h3>
                <ul className="card-specs">{product.specs.map((s, i) => <li key={i}>{s}</li>)}</ul>
                <div className="card-footer">
                  <span className="card-price">{formatPrice(product.price)}</span>
                  <button className="card-btn" onClick={(e) => { e.stopPropagation(); handleOrder(product); }}>Order</button>
                </div>
              </div>
              <div className="card-hover-line" />
            </div>
          ))}
        </div>
      </section>
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="section-eyebrow">Reviews</p>
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-stars">{"★".repeat(t.rating)}</p>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <span className="testimonial-avatar">{t.name.charAt(0)}</span>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-city">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="process" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <p className="section-eyebrow">How It Works</p>
        <h2 className="section-title">From Choice to Delivery</h2>
        <div className="process-grid">
          {[
            { n: "01", t: "Pick Your Model", d: "Browse our catalogue and choose the product that matches your style and your vehicle." },
            { n: "02", t: "Customize It", d: "Select your carbon weave, leather, thread color, and any personal details you want." },
            { n: "03", t: "Order via WhatsApp", d: "Send your order on WhatsApp. We'll confirm lead time and final price within 24h." },
            { n: "04", t: "Delivered Nationwide", d: "Handbuilt in 7–14 days. Shipped anywhere in the USA." },
          ].map((s) => (
            <div key={s.n} className="process-step">
              <p className="step-num">{s.n}</p>
              <h3 className="step-title">{s.t}</h3>
              <p className="step-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section order-section" id="order">
        <div className="order-inner">
          <div className="order-info">
            <p className="section-eyebrow">Order</p>
            <h2>Place Your<br />Order</h2>
            <p>Fill out the form and you'll be redirected to WhatsApp to finalize your order with our team.</p>
            <p>All parts are handcrafted by specialists in carbon fiber. Build time: 7 to 14 days.</p>
            <div className="order-guarantee">
              {[["✦","Secure online payment"],["✦","Shipping anywhere in the USA"],["✦","30-day satisfaction guarantee"],["✦","Installation included on request"]].map(([icon, text]) => (
                <div key={text} className="guarantee-item"><span className="guarantee-icon">{icon}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
          <OrderForm preselectedProduct={orderProduct} products={products} />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <p className="footer-logo">CARBON<span>CUSTOMS</span></p>
            <p className="footer-tagline">Carbon Fiber · Made in the USA</p>
          </div>
          <div className="footer-links">
            <a href="#catalogue">Catalogue</a>
            <a href="#process">Process</a>
            <a href="#order">Order</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowReturnPolicy(true); }}>Return Policy</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Carbon Customs. All rights reserved.</p>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onOrder={handleOrder} />
      )}
      {showReturnPolicy && (
        <ReturnPolicyModal onClose={() => setShowReturnPolicy(false)} />
      )}
    </>
  );
            }
