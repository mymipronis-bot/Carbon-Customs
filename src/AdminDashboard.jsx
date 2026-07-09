import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hfbohbvaqeauwrcgbcur.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmYm9oYnZhcWVhdXdyY2diY3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3OTIyMDksImV4cCI6MjA5ODM2ODIwOX0.8O1gPIUcffo7-TMxFGuhPUzpNNPSUPPYI1uEy30Gn8o";
const supabase = createClient(supabaseUrl, supabaseKey);

const CATEGORIES = ["Sport", "Racing", "Street","Body Parts","Luxury"];
const formatPrice = (p) => "$" + Number(p).toLocaleString("en-US");

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #080808; --surface: #0D0D0D; --card: #111111; --border: #1C1C1C;
    --blue: #0066FF; --blue-dim: #0044CC; --red: #FF3B3B; --green: #25D366;
    --white: #F0F0F0; --muted: #555; --radius: 3px;
  }
  body { background: var(--black); color: var(--white); font-family: 'Inter', serif; font-size: 15px; -webkit-font-smoothing: antialiased; }
  .admin-wrap { min-height: 100vh; }

  /* LOGIN */
  .login-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
  .login-box { width: 100%; max-width: 380px; background: var(--card); border: 1px solid var(--border); padding: 2.5rem 2rem; border-radius: var(--radius); }
  .login-logo { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 1.6rem; letter-spacing: 0.1em; text-transform: uppercase; text-align: center; margin-bottom: 0.4rem; }
  .login-logo span { color: var(--blue); }
  .login-sub { text-align: center; color: var(--muted); font-size: 0.78rem; margin-bottom: 2rem; }
  .login-error { background: rgba(255,59,59,0.1); border: 1px solid var(--red); color: var(--red); font-size: 0.78rem; padding: 0.7rem 1rem; border-radius: var(--radius); margin-bottom: 1rem; }
  .field-group { margin-bottom: 1.1rem; display: flex; flex-direction: column; gap: 0.4rem; }
  .field-label { font-family: 'Space Mono', monospace; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); }
  .field-input { background: #0a0a0a; color: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.8rem 1rem; font-family: 'Inter', serif; font-size: 0.88rem; width: 100%; }
  .field-input:focus { outline: none; border-color: var(--blue); }
  .field-select { background: #0a0a0a; color: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.8rem 1rem; font-family: 'Inter', serif; font-size: 0.85rem; width: 100%; }
  .field-select:focus { outline: none; border-color: var(--blue); }
  .login-btn { width: 100%; background: var(--blue); color: #fff; border: none; padding: 0.9rem; font-family: 'Space Mono', monospace; font-size: 0.74rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); margin-top: 0.5rem; transition: background 0.2s; }
  .login-btn:hover { background: var(--blue-dim); }
  .login-btn:disabled { opacity: 0.5; cursor: default; }

  /* HEADER */
  .admin-header { position: sticky; top: 0; z-index: 50; background: rgba(8,8,8,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); padding: 1rem 5vw; display: flex; align-items: center; justify-content: space-between; }
  .admin-logo { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 1.3rem; letter-spacing: 0.08em; text-transform: uppercase; }
  .admin-logo span { color: var(--blue); }
  .admin-badge { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-left: 0.6rem; }
  .logout-btn { background: transparent; color: var(--muted); border: 1px solid var(--border); padding: 0.45rem 1rem; font-family: 'Space Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); transition: all 0.2s; }
  .logout-btn:hover { border-color: var(--red); color: var(--red); }

  /* TABS */
  .admin-tabs { display: flex; border-bottom: 1px solid var(--border); padding: 0 5vw; background: var(--surface); }
  .admin-tab { padding: 0.9rem 1.2rem; font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; background: none; border-left: none; border-right: none; border-top: none; }
  .admin-tab.active { color: var(--blue); border-bottom-color: var(--blue); }

  /* BODY */
  .admin-body { padding: 2rem 5vw 5rem; }
  .admin-toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
  .admin-title { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 2rem; letter-spacing: -0.01em; text-transform: uppercase; }
  .admin-count { font-family: 'Playfair Display', serif; font-size: 0.7rem; color: var(--muted); }
  .add-btn { background: var(--blue); color: #fff; border: none; padding: 0.7rem 1.3rem; font-family: 'Playfair Display', serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); transition: background 0.2s; }
  .add-btn:hover { background: var(--blue-dim); }

  /* PRODUCT LIST */
  .product-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .product-row { background: var(--card); padding: 1rem 1.2rem; display: flex; align-items: center; gap: 1rem; }
  .row-img { width: 56px; height: 56px; border-radius: var(--radius); object-fit: contain; flex-shrink: 0; background: #1a1a1a; padding: 2px; }
  .row-info { flex: 1; min-width: 0; }
  .row-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 0.02em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row-meta { font-size: 0.72rem; color: var(--muted); font-family: 'Space Mono', monospace; margin-top: 0.2rem; }
  .row-price { font-family: 'Playfair Display', serif; font-weight: 700; color: var(--red); font-size: 1rem; white-space: nowrap; }
  .row-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
  .row-btn { background: transparent; border: 1px solid var(--border); color: var(--muted); width: 34px; height: 34px; border-radius: var(--radius); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; transition: all 0.2s; }
  .row-btn.edit:hover { border-color: var(--blue); color: var(--blue); }
  .row-btn.delete:hover { border-color: var(--red); color: var(--red); }
  .empty-state { text-align: center; padding: 4rem 1rem; color: var(--muted); font-size: 0.85rem; border: 1px dashed var(--border); }

  /* HERO GALLERY */
  .hero-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 1.5rem; }
  .hero-gallery-item { background: var(--card); position: relative; aspect-ratio: 16/9; }
  .hero-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .hero-gallery-remove { position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.7); border: none; color: var(--red); width: 26px; height: 26px; border-radius: 50%; cursor: pointer; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
  .hero-gallery-remove:hover { background: var(--red); color: #fff; }

  /* LOGO SECTION */
  .logo-preview { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); background: #1a1a1a; margin-bottom: 1rem; }
  .settings-card { background: var(--card); border: 1px solid var(--border); padding: 1.5rem; margin-bottom: 1rem; border-radius: var(--radius); }
  .settings-card-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 1rem; }

  /* UPLOAD BTN */
  .upload-btn { display: flex; align-items: center; justify-content: center; background: transparent; border: 1px dashed var(--blue); color: var(--blue); padding: 0.7rem; font-family: 'Space Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); transition: background 0.2s; width: 100%; }
  .upload-btn:hover { background: rgba(0,102,255,0.08); }
  .upload-error-text { color: var(--red); font-size: 0.72rem; margin-top: 0.4rem; }
  .image-preview { width: 100%; max-height: 200px; object-fit: contain; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 0.6rem; background: #0a0a0a; padding: 0.5rem; }

  /* MODAL FORM */
  .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.9); backdrop-filter: blur(8px); display: flex; align-items: flex-start; justify-content: center; padding: 1rem; overflow-y: auto; }
  .modal-form { background: var(--card); border: 1px solid var(--border); max-width: 460px; width: 100%; border-radius: var(--radius); margin: 2rem 0; }
  .modal-form-header { padding: 1.3rem 1.5rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .modal-form-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.02em; }
  .modal-form-close { background: #1a1a1a; border: none; color: var(--muted); width: 28px; height: 28px; border-radius: 50%; cursor: pointer; }
  .modal-form-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .form-row { display: flex; gap: 1rem; }
  .form-row > * { flex: 1; }
  .specs-input-row { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
  .specs-input-row .field-input { flex: 1; }
  .specs-remove { background: transparent; border: 1px solid var(--border); color: var(--red); width: 38px; border-radius: var(--radius); cursor: pointer; flex-shrink: 0; }
  .specs-add { background: transparent; border: 1px dashed var(--border); color: var(--muted); padding: 0.5rem; font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); width: 100%; }
  .specs-add:hover { border-color: var(--blue); color: var(--blue); }
  .modal-form-footer { padding: 1.2rem 1.5rem; border-top: 1px solid var(--border); display: flex; gap: 0.8rem; }
  .btn-cancel { flex: 1; background: transparent; border: 1px solid var(--border); color: var(--muted); padding: 0.8rem; font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); }
  .btn-save { flex: 2; background: var(--blue); border: none; color: #fff; padding: 0.8rem; font-family: 'Space Mono', monospace; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: var(--radius); transition: background 0.2s; }
  .btn-save:hover { background: var(--blue-dim); }
  .btn-save:disabled { opacity: 0.5; cursor: default; }

  .toast { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); background: var(--green); color: #fff; padding: 0.8rem 1.5rem; border-radius: var(--radius); font-size: 0.82rem; z-index: 300; box-shadow: 0 8px 30px rgba(0,0,0,0.4); }
  .toast.error { background: var(--red); }

  @media (max-width: 600px) { .form-row { flex-direction: column; } .row-meta { display: none; } }
`;

// ── UPLOAD HELPER ─────────────────────────────────────────────────────────────
async function uploadImage(file, bucket = "product-images") {
  if (file.size > 10 * 1024 * 1024) throw new Error("Image too large. Max 10MB.");
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(fileName, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) { setError("Incorrect email or password."); return; }
    onLogin(data.session);
  };

  return (
    <div className="login-screen">
      <div className="login-box">
        <p className="login-logo">CARBON<span>CUSTOMS</span></p>
        <p className="login-sub">Admin Dashboard</p>
        {error && <div className="login-error">{error}</div>}
        <div className="field-group">
          <label className="field-label">Email</label>
          <input className="field-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
        </div>
        <div className="field-group">
          <label className="field-label">Password</label>
          <input className="field-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
        </div>
        <button className="login-btn" onClick={handleLogin} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
      </div>
    </div>
  );
}

// ── PRODUCT FORM ──────────────────────────────────────────────────────────────
function ProductFormModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || "", price: product?.price || "",
    category: product?.category || CATEGORIES[0],
    image_url: product?.image_url || "", badge: product?.badge || "",
    specs: product?.specs?.length > 0 ? [...product.specs] : [""],
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadError(""); setUploading(true);
    try {
      const url = await uploadImage(file, "product-images");
      setForm((f) => ({ ...f, image_url: url }));
    } catch (err) { setUploadError(err.message || "Upload failed."); }
    finally { setUploading(false); }
  };

  const updateSpec = (i, v) => { const s = [...form.specs]; s[i] = v; setForm((f) => ({ ...f, specs: s })); };
  const addSpec = () => setForm((f) => ({ ...f, specs: [...f.specs, ""] }));
  const removeSpec = (i) => setForm((f) => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category) return;
    setSaving(true);
    const payload = { name: form.name, price: parseInt(form.price, 10), category: form.category, image_url: form.image_url, badge: form.badge || null, specs: form.specs.filter((s) => s.trim() !== "") };
    await onSave(payload, product?.id);
    setSaving(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-form" onClick={(e) => e.stopPropagation()}>
        <div className="modal-form-header">
          <p className="modal-form-title">{product ? "Edit Product" : "New Product"}</p>
          <button className="modal-form-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-form-body">
          <div className="field-group">
            <label className="field-label">Product Name *</label>
            <input className="field-input" value={form.name} onChange={set("name")} placeholder="e.g. GT Carbon Wheel" />
          </div>
          <div className="form-row">
            <div className="field-group">
              <label className="field-label">Price (USD) *</label>
              <input className="field-input" type="number" value={form.price} onChange={set("price")} placeholder="499" />
            </div>
            <div className="field-group">
              <label className="field-label">Category *</label>
              <select className="field-select" value={form.category} onChange={set("category")}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="field-group">
            <label className="field-label">Product Photo</label>
            {form.image_url && <img src={form.image_url} alt="Preview" className="image-preview" />}
            <label className="upload-btn">
              {uploading ? "Uploading..." : form.image_url ? "Change Photo" : "Upload Photo"}
              <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: "none" }} />
            </label>
            {uploadError && <p className="upload-error-text">{uploadError}</p>}
            <input className="field-input" value={form.image_url} onChange={set("image_url")} placeholder="Or paste an image URL" style={{ marginTop: "0.5rem" }} />
          </div>
          <div className="field-group">
            <label className="field-label">Badge (optional)</label>
            <input className="field-input" value={form.badge} onChange={set("badge")} placeholder="e.g. New, Bestseller, Premium" />
          </div>
          <div className="field-group">
            <label className="field-label">Specifications</label>
            {form.specs.map((s, i) => (
              <div className="specs-input-row" key={i}>
                <input className="field-input" value={s} onChange={(e) => updateSpec(i, e.target.value)} placeholder="e.g. 3K Carbon Fiber Weave" />
                <button className="specs-remove" onClick={() => removeSpec(i)}>✕</button>
              </div>
            ))}
            <button className="specs-add" onClick={addSpec}>+ Add Spec</button>
          </div>
        </div>
        <div className="modal-form-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Product"}</button>
        </div>
      </div>
    </div>
  );
}

// ── PRODUCTS TAB ──────────────────────────────────────────────────────────────
function ProductsTab({ showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: true });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async (payload, existingId) => {
    try {
      if (existingId) {
        const { error } = await supabase.from("products").update(payload).eq("id", existingId);
        if (error) throw error;
        showToast("Product updated successfully");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        showToast("Product added successfully");
      }
      setFormOpen(false); setEditingProduct(null); fetchProducts();
    } catch (err) { showToast(err.message || "Something went wrong", true); }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", product.id);
    if (error) { showToast(error.message, true); } else { showToast("Product deleted"); fetchProducts(); }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Products</h1>
          <p className="admin-count">{products.length} item{products.length !== 1 ? "s" : ""} in catalogue</p>
        </div>
        <button className="add-btn" onClick={() => { setEditingProduct(null); setFormOpen(true); }}>+ Add Product</button>
      </div>
      {loading ? <div className="empty-state">Loading...</div> : products.length === 0 ? (
        <div className="empty-state">No products yet. Click "Add Product" to create your first one.</div>
      ) : (
        <div className="product-list">
          {products.map((p) => (
            <div className="product-row" key={p.id}>
              <img src={p.image_url} alt={p.name} className="row-img" />
              <div className="row-info">
                <p className="row-name">{p.name}</p>
                <p className="row-meta">{p.category}{p.badge ? ` · ${p.badge}` : ""}</p>
              </div>
              <span className="row-price">{formatPrice(p.price)}</span>
              <div className="row-actions">
                <button className="row-btn edit" onClick={() => { setEditingProduct(p); setFormOpen(true); }}>✎</button>
                <button className="row-btn delete" onClick={() => handleDelete(p)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {formOpen && (
        <ProductFormModal product={editingProduct} onClose={() => { setFormOpen(false); setEditingProduct(null); }} onSave={handleSave} />
      )}
    </>
  );
}

// ── HERO IMAGES TAB ───────────────────────────────────────────────────────────
function HeroTab({ showToast }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    const { data } = await supabase.from("hero_images").select("*").order("sort_order", { ascending: true });
    setImages(data || []);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i], "product-images");
        const { error } = await supabase.from("hero_images").insert({ image_url: url, sort_order: images.length + i + 1 });
        if (error) throw error;
      }
      showToast(`${files.length} image${files.length > 1 ? "s" : ""} added`);
      fetchImages();
    } catch (err) { showToast(err.message || "Upload failed", true); }
    finally { setUploading(false); }
  };

  const handleDelete = async (img) => {
    const { error } = await supabase.from("hero_images").delete().eq("id", img.id);
    if (error) { showToast(error.message, true); } else { showToast("Image removed"); fetchImages(); }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Hero Gallery</h1>
          <p className="admin-count">{images.length} image{images.length !== 1 ? "s" : ""} — slideshow auto</p>
        </div>
        <label className="add-btn" style={{ cursor: "pointer" }}>
          {uploading ? "Uploading..." : "+ Add Photos"}
          <input type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} style={{ display: "none" }} />
        </label>
      </div>
      {images.length === 0 ? (
        <div className="empty-state">No hero images yet. Add photos to display them in the slideshow.</div>
      ) : (
        <div className="hero-gallery-grid">
          {images.map((img) => (
            <div className="hero-gallery-item" key={img.id}>
              <img src={img.image_url} alt="" />
              <button className="hero-gallery-remove" onClick={() => handleDelete(img)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ── SETTINGS TAB ──────────────────────────────────────────────────────────────
function SettingsTab({ showToast }) {
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.from("settings").select("value").eq("key", "logo_url").single()
      .then(({ data }) => { if (data) setLogoUrl(data.value); });
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "product-images");
      const { error } = await supabase.from("settings").upsert({ key: "logo_url", value: url, updated_at: new Date().toISOString() });
      if (error) throw error;
      setLogoUrl(url);
      showToast("Logo updated successfully");
    } catch (err) { showToast(err.message || "Upload failed", true); }
    finally { setUploading(false); }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Settings</h1>
          <p className="admin-count">Manage logo and site settings</p>
        </div>
      </div>
      <div className="settings-card">
        <p className="settings-card-title">Site Logo</p>
        <img src={logoUrl} alt="Current logo" className="logo-preview" />
        <label className="upload-btn" style={{ marginTop: "0.5rem" }}>
          {uploading ? "Uploading..." : "Change Logo"}
          <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading} style={{ display: "none" }} />
        </label>
        <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.6rem" }}>
          Recommended: square image (PNG/JPG), min 200×200px
        </p>
      </div>
    </>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null); };

  if (checking) return <><style>{css}</style><div className="login-screen" /></>;
  if (!session) return <><style>{css}</style><LoginScreen onLogin={setSession} /></>;

  return (
    <>
      <style>{css}</style>
      <div className="admin-wrap">
        <header className="admin-header">
          <div>
            <span className="admin-logo">CARBON<span>CUSTOMS</span></span>
            <span className="admin-badge">Admin</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </header>

        <div className="admin-tabs">
          {[["products", "Products"], ["hero", "Hero Gallery"], ["settings", "Settings"]].map(([key, label]) => (
            <button key={key} className={`admin-tab${activeTab === key ? " active" : ""}`} onClick={() => setActiveTab(key)}>{label}</button>
          ))}
        </div>

        <main className="admin-body">
          {activeTab === "products" && <ProductsTab showToast={showToast} />}
          {activeTab === "hero" && <HeroTab showToast={showToast} />}
          {activeTab === "settings" && <SettingsTab showToast={showToast} />}
        </main>
      </div>

      {toast && <div className={`toast${toast.isError ? " error" : ""}`}>{toast.message}</div>}
    </>
  );
        }
