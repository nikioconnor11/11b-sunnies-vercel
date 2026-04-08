import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  RotateCcw,
  Download,
  Move,
  ZoomIn,
  Sparkles,
  ShoppingBag,
  Eye,
  Sun,
  Waves,
  ArrowRight,
  Check,
  Menu,
  Heart,
} from "lucide-react";

const brand = {
  name: "11b Sunnies",
  tagline: "Designed to Disrupt",
  accent: "from-amber-400 via-orange-400 to-yellow-300",
  dark: "from-zinc-950 via-stone-950 to-black",
};

const starterFrames = [
  {
    id: 1,
    name: "Kaiteriteri Float",
    price: "$89",
    color: "Matte Black",
    badge: "Best Seller",
    material: "Skateboard Wood",
    vibe: "Bold and everyday",
    image:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="900" height="280" viewBox="0 0 900 280">
          <g fill="none" stroke="#111" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
            <rect x="110" y="70" rx="70" ry="70" width="250" height="145" />
            <rect x="540" y="70" rx="70" ry="70" width="250" height="145" />
            <path d="M360 130 C405 112, 495 112, 540 130" />
            <path d="M108 125 C70 118, 45 124, 20 140" />
            <path d="M792 125 C830 118, 855 124, 880 140" />
          </g>
        </svg>
      `),
  },
  {
    id: 2,
    name: "Mapua Drift",
    price: "$94",
    color: "Walnut Brown",
    badge: "New Drop",
    material: "Wood Frame",
    vibe: "Warm coastal tone",
    image:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="900" height="280" viewBox="0 0 900 280">
          <g fill="none" stroke="#5a3b20" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="240" cy="142" r="82" />
            <circle cx="660" cy="142" r="82" />
            <path d="M322 142 C405 110, 495 110, 578 142" />
            <path d="M158 94 C108 94, 70 106, 20 142" />
            <path d="M742 94 C792 94, 830 106, 880 142" />
          </g>
        </svg>
      `),
  },
  {
    id: 3,
    name: "Tasman Smoke",
    price: "$99",
    color: "Crystal Smoke",
    badge: "Polarized",
    material: "Bamboo + TAC Lens",
    vibe: "Clean and premium",
    image:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="900" height="280" viewBox="0 0 900 280">
          <g fill="rgba(120,120,120,0.08)" stroke="#666" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
            <rect x="115" y="72" rx="42" ry="42" width="245" height="140" />
            <rect x="540" y="72" rx="42" ry="42" width="245" height="140" />
            <path d="M360 132 L540 132" />
            <path d="M113 122 C78 118, 50 124, 18 142" />
            <path d="M786 122 C822 118, 848 124, 882 142" />
          </g>
        </svg>
      `),
  },
  {
    id: 4,
    name: "Abel Flash",
    price: "$92",
    color: "Sand Fade",
    badge: "Floats",
    material: "Lightweight Wood",
    vibe: "Beach-day energy",
    image:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="900" height="280" viewBox="0 0 900 280">
          <g fill="none" stroke="#7d5a3a" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
            <rect x="120" y="78" rx="35" ry="35" width="238" height="132" />
            <rect x="542" y="78" rx="35" ry="35" width="238" height="132" />
            <path d="M358 138 C410 128, 490 128, 542 138" />
            <path d="M120 128 C92 122, 58 126, 24 142" />
            <path d="M780 128 C808 122, 842 126, 876 142" />
          </g>
        </svg>
      `),
  },
];

const perks = [
  { icon: Waves, title: "They Float", text: "Built for beach days, boats, and accidental drops." },
  { icon: Sun, title: "Polarized Lenses", text: "UV400-style coverage and glare-cutting comfort." },
  { icon: Sparkles, title: "Designed to Disrupt", text: "A standout look with bold wood-inspired attitude." },
];

function Btn({ children, onClick, kind = "primary", className = "", disabled = false, type = "button" }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition";
  const styles =
    kind === "primary"
      ? "bg-gradient-to-r from-amber-400 to-orange-400 text-black hover:opacity-95"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[28px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur ${className}`}>{children}</div>;
}

function Badge({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

function Range({ label, value, onChange, min, max, step = 1, icon = null }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-medium text-zinc-200">
          {icon}
          {label}
        </span>
        <span className="text-zinc-400">{value}</span>
      </div>
      <input
        type="range"
        value={typeof value === "string" ? Number(String(value).replace(/[^0-9.-]/g, "")) : value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700"
      />
    </div>
  );
}

function NavBar({ cartCount, onNavigate }) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${brand.accent}`} />
          <div>
            <div className="text-lg font-bold tracking-tight text-white">{brand.name}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-amber-300">{brand.tagline}</div>
          </div>
        </div>

        <div className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          <button onClick={() => onNavigate("home")} className="transition hover:text-white">Home</button>
          <button onClick={() => onNavigate("shop")} className="transition hover:text-white">Shop</button>
          <button onClick={() => onNavigate("tryon")} className="transition hover:text-white">Try-On</button>
          <button onClick={() => onNavigate("cart")} className="transition hover:text-white">Cart ({cartCount})</button>
        </div>

        <Btn kind="secondary" className="md:hidden px-3 py-2">
          <Menu className="h-4 w-4" />
        </Btn>
      </div>
    </div>
  );
}

function Hero({ onNavigate, heroFaceUrl, heroFaceName, onHeroFaceUpload, heroFrame }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className={`absolute inset-0 bg-gradient-to-br ${brand.dark}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.18),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <Badge className="mb-4 border-0 bg-white/10 text-amber-200">11b Sunnies Virtual Store</Badge>
          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
            Good shade. <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent">Bold attitude.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-300 md:text-xl">
            Try on frames online, shop your favourites, and find the pair that actually suits your face before you buy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-95">
              Upload Face Now <Upload className="ml-2 h-4 w-4" />
              <input type="file" accept="image/*" onChange={onHeroFaceUpload} className="hidden" />
            </label>
            <Btn onClick={() => onNavigate("shop")} kind="secondary">
              Shop Frames
            </Btn>
          </div>
          {heroFaceName && <p className="mt-3 text-sm text-zinc-400">Loaded: {heroFaceName}</p>}

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.title} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <Icon className="mb-3 h-5 w-5 text-amber-300" />
                  <div className="font-semibold text-white">{perk.title}</div>
                  <div className="mt-1 text-sm text-zinc-400">{perk.text}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-400">Live Try-On</div>
                <div className="text-2xl font-bold text-white">{heroFrame.name}</div>
              </div>
              <Badge className="bg-amber-300 text-black">{heroFrame.badge}</Badge>
            </div>
            <div className="flex min-h-[440px] items-center justify-center rounded-[28px] bg-gradient-to-br from-zinc-900 to-black p-6">
              <div className="grid w-full gap-6 md:grid-cols-[1fr_.9fr] md:items-center">
                <div className="rounded-[28px] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-3">
                  <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-[22px] bg-zinc-200 text-zinc-500">
                    {!heroFaceUrl ? (
                      <div className="text-center">
                        <Upload className="mx-auto mb-3 h-10 w-10 text-zinc-500" />
                        <div className="text-base">Upload your face</div>
                        <div className="mt-1 text-sm text-zinc-500">See the frames on you instantly</div>
                      </div>
                    ) : (
                      <>
                        <img src={heroFaceUrl} alt="Homepage try-on" className="h-full w-full object-contain" />
                        <img
                          src={heroFrame.image}
                          alt={heroFrame.name}
                          className="pointer-events-none absolute left-1/2 top-[39%] w-[34%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <img src={heroFrame.image} alt={heroFrame.name} className="mx-auto h-24 w-auto object-contain" />
                  <div className="mt-5 text-center">
                    <div className="text-lg font-semibold text-white">{heroFrame.name}</div>
                    <div className="mt-1 text-sm text-zinc-400">{heroFrame.material} • Polarized • Floats</div>
                    <div className="mt-4 text-3xl font-black text-white">{heroFrame.price}</div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <Btn onClick={() => onNavigate("tryon")} className="w-full justify-center">
                      Open Full Try-On <ArrowRight className="ml-2 h-4 w-4" />
                    </Btn>
                    <Btn onClick={() => onNavigate("shop")} kind="secondary" className="w-full justify-center">
                      Shop This Frame
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ShopSection({ frames, addToCart, toggleWishlist, wishlist, onNavigate }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-amber-300">Shop the Range</div>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-white">Find your next pair</h2>
        </div>
        <Btn onClick={() => onNavigate("tryon")} kind="secondary">
          Try before you buy
        </Btn>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {frames.map((frame) => (
          <Card key={frame.id}>
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <Badge className="bg-white/10 text-amber-200">{frame.badge}</Badge>
                <button onClick={() => toggleWishlist(frame.id)} className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:text-white">
                  <Heart className={`h-4 w-4 ${wishlist.includes(frame.id) ? "fill-current text-amber-300" : ""}`} />
                </button>
              </div>
              <div className="mb-5 flex h-44 items-center justify-center rounded-[24px] bg-white p-4">
                <img src={frame.image} alt={frame.name} className="max-h-20 w-auto object-contain" />
              </div>
              <div className="text-xl font-bold text-white">{frame.name}</div>
              <div className="mt-1 text-sm text-zinc-400">{frame.material}</div>
              <div className="mt-1 text-sm text-zinc-500">{frame.vibe}</div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-white">{frame.price}</div>
                  <div className="text-xs text-zinc-400">{frame.color}</div>
                </div>
                <Btn onClick={() => addToCart(frame)} className="px-4">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Add
                </Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TryOnSection({ frames, addToCart }) {
  const [faceFile, setFaceFile] = useState(null);
  const [customFrames, setCustomFrames] = useState([]);
  const [faceUrl, setFaceUrl] = useState("");
  const [selectedFrameId, setSelectedFrameId] = useState(frames[0].id);
  const [glassesUrl, setGlassesUrl] = useState(frames[0].image);
  const [scale, setScale] = useState(34);
  const [rotation, setRotation] = useState(0);
  const [x, setX] = useState(50);
  const [y, setY] = useState(39);
  const [opacity, setOpacity] = useState(100);
  const [tryOnMode, setTryOnMode] = useState("smart");
  const [eyeDistance, setEyeDistance] = useState(36);

  const frameLibrary = useMemo(() => [...frames, ...customFrames], [frames, customFrames]);
  const selectedFrame = useMemo(() => frameLibrary.find((item) => item.id === selectedFrameId) || frameLibrary[0], [frameLibrary, selectedFrameId]);

  const handleFaceUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFaceFile(file);
    setFaceUrl(url);
  };

  const handleCustomFrameUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newFrame = {
      id: Date.now(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      price: "$95",
      color: "Custom Upload",
      badge: "Uploaded",
      material: "PNG Overlay",
      vibe: "Your own product image",
      image: url,
    };
    setCustomFrames((prev) => [newFrame, ...prev]);
    setSelectedFrameId(newFrame.id);
    setGlassesUrl(url);
  };

  const chooseFrame = (frame) => {
    setSelectedFrameId(frame.id);
    setGlassesUrl(frame.image);
  };

  useEffect(() => {
    if (!faceUrl) return;
    if (tryOnMode === "smart") {
      setScale(Math.max(26, Math.min(48, eyeDistance + 2)));
      setX(50);
      setY(38);
      setRotation(0);
    }
  }, [faceUrl, tryOnMode, eyeDistance]);

  const resetOverlay = () => {
    setScale(34);
    setRotation(0);
    setX(50);
    setY(39);
    setOpacity(100);
    setEyeDistance(36);
  };

  const downloadPreview = async () => {
    if (!faceUrl || !glassesUrl) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const faceImg = new Image();
    const glassesImg = new Image();
    faceImg.crossOrigin = "anonymous";
    glassesImg.crossOrigin = "anonymous";
    faceImg.src = faceUrl;
    glassesImg.src = glassesUrl;
    await Promise.all([
      new Promise((resolve) => (faceImg.onload = resolve)),
      new Promise((resolve) => (glassesImg.onload = resolve)),
    ]);
    canvas.width = faceImg.width;
    canvas.height = faceImg.height;
    ctx.drawImage(faceImg, 0, 0);
    const overlayWidth = faceImg.width * (scale / 100);
    const overlayHeight = (glassesImg.height / glassesImg.width) * overlayWidth;
    const centerX = faceImg.width * (x / 100);
    const centerY = faceImg.height * (y / 100);
    ctx.save();
    ctx.globalAlpha = opacity / 100;
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(glassesImg, -overlayWidth / 2, -overlayHeight / 2, overlayWidth, overlayHeight);
    ctx.restore();
    const link = document.createElement("a");
    link.download = `${selectedFrame?.name || "11b-sunnies"}-preview.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.25em] text-amber-300">Virtual Try-On</div>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-white">See what suits your face</h2>
        <p className="mt-2 max-w-2xl text-zinc-400">Upload your face, test different 11b frames, then add your favourite pair to cart.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr_320px]">
        <Card>
          <div className="border-b border-white/10 px-6 py-5 text-xl font-bold text-white">Setup</div>
          <div className="space-y-6 p-6">
            <div className="space-y-3">
              <label htmlFor="face-upload" className="block text-sm font-medium text-zinc-200">Upload face photo</label>
              <input id="face-upload" type="file" accept="image/*" onChange={handleFaceUpload} className="block w-full cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white file:mr-3 file:rounded-xl file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white" />
              {faceFile && <p className="text-sm text-zinc-300">Loaded: {faceFile.name}</p>}
            </div>

            <div className="space-y-3">
              <label htmlFor="frame-upload" className="block text-sm font-medium text-zinc-200">Upload your own frame PNG</label>
              <input id="frame-upload" type="file" accept="image/*" onChange={handleCustomFrameUpload} className="block w-full cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white file:mr-3 file:rounded-xl file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white" />
              <p className="text-xs text-zinc-500">Transparent PNGs work best.</p>
            </div>

            <div className="rounded-2xl bg-black/20 p-1">
              <div className="grid grid-cols-2 gap-1">
                <button onClick={() => setTryOnMode("smart")} className={`rounded-2xl px-4 py-2 text-sm font-semibold ${tryOnMode === "smart" ? "bg-white text-black" : "text-zinc-300"}`}>Smart Fit</button>
                <button onClick={() => setTryOnMode("manual")} className={`rounded-2xl px-4 py-2 text-sm font-semibold ${tryOnMode === "manual" ? "bg-white text-black" : "text-zinc-300"}`}>Manual Fit</button>
              </div>
            </div>

            {tryOnMode === "smart" ? (
              <div className="space-y-4">
                <Range label="Estimated eye width" value={`${eyeDistance}%`} onChange={setEyeDistance} min={24} max={46} icon={<Sparkles className="h-4 w-4" />} />
                <p className="text-xs text-zinc-500">This is a polished MVP simulation of auto-placement.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <Range label="Size" value={`${scale}%`} onChange={setScale} min={10} max={80} icon={<ZoomIn className="h-4 w-4" />} />
                <Range label="X Position" value={`${x}%`} onChange={setX} min={0} max={100} icon={<Move className="h-4 w-4" />} />
                <Range label="Y Position" value={`${y}%`} onChange={setY} min={0} max={100} />
                <Range label="Rotation" value={`${rotation}°`} onChange={setRotation} min={-45} max={45} />
                <Range label="Opacity" value={`${opacity}%`} onChange={setOpacity} min={20} max={100} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Btn kind="secondary" onClick={resetOverlay}><RotateCcw className="mr-2 h-4 w-4" /> Reset</Btn>
              <Btn onClick={downloadPreview}><Download className="mr-2 h-4 w-4" /> Export</Btn>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Live Preview</h3>
                <p className="text-sm text-zinc-400">Front-on photos work best.</p>
              </div>
              <Badge className="bg-white/10 text-zinc-100"><Eye className="mr-1 h-3.5 w-3.5" /> Live</Badge>
            </div>
            <div className="relative flex min-h-[680px] items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-zinc-900 to-black p-4">
              {!faceUrl ? (
                <div className="text-center text-zinc-500"><Upload className="mx-auto mb-3 h-12 w-12" /><p className="max-w-sm text-sm">Upload a face photo to test the frames.</p></div>
              ) : (
                <motion.div key={faceUrl} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-3xl">
                  <img src={faceUrl} alt="Face preview" className="mx-auto max-h-[650px] w-auto rounded-[24px] object-contain shadow-2xl" />
                  {glassesUrl && (
                    <img src={glassesUrl} alt="Glasses overlay" className="pointer-events-none absolute left-0 top-0" style={{ left: `${x}%`, top: `${y}%`, width: `${scale}%`, transform: `translate(-50%, -50%) rotate(${rotation}deg)`, opacity: opacity / 100, filter: "drop-shadow(0 10px 20px rgba(0,0,0,.35))" }} />
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <div className="border-b border-white/10 px-6 py-5 text-xl font-bold text-white">Pick a Frame</div>
          <div className="space-y-4 p-6">
            {frameLibrary.map((frame) => (
              <button key={frame.id} onClick={() => chooseFrame(frame)} className={`w-full rounded-[24px] border p-4 text-left transition ${selectedFrameId === frame.id ? "border-amber-300/50 bg-white/10" : "border-white/10 bg-black/20 hover:bg-white/5"}`}>
                <div className="mb-3 flex h-24 items-center justify-center rounded-2xl bg-white"><img src={frame.image} alt={frame.name} className="max-h-16 w-auto object-contain" /></div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white">{frame.name}</div>
                    <div className="text-sm text-zinc-400">{frame.material}</div>
                  </div>
                  <div className="text-sm font-medium text-white">{frame.price}</div>
                </div>
              </button>
            ))}
            {selectedFrame && (
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Selected</div>
                <div className="mt-2 text-lg font-semibold text-white">{selectedFrame.name}</div>
                <div className="mt-1 text-sm text-zinc-400">{selectedFrame.color}</div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xl font-black text-white">{selectedFrame.price}</div>
                  <Btn onClick={() => addToCart(selectedFrame)}><ShoppingBag className="mr-2 h-4 w-4" /> Add</Btn>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}

function CartSection({ cart, updateQty, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.numericPrice * item.qty, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.25em] text-amber-300">Cart</div>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-white">Your 11b picks</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card>
          <div className="p-5">
            {cart.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-white/10 p-10 text-center text-zinc-500">Your cart is empty.</div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-24 w-28 items-center justify-center rounded-2xl bg-white p-3"><img src={item.image} alt={item.name} className="max-h-12 w-auto object-contain" /></div>
                      <div>
                        <div className="text-lg font-semibold text-white">{item.name}</div>
                        <div className="text-sm text-zinc-400">{item.material}</div>
                        <div className="mt-1 text-sm text-zinc-500">{item.price}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Btn kind="secondary" onClick={() => updateQty(item.id, -1)} className="px-3">-</Btn>
                      <div className="min-w-8 text-center font-semibold text-white">{item.qty}</div>
                      <Btn kind="secondary" onClick={() => updateQty(item.id, 1)} className="px-3">+</Btn>
                      <Btn kind="secondary" onClick={() => removeFromCart(item.id)} className="text-red-300">Remove</Btn>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="border-b border-white/10 px-6 py-5 text-xl font-bold text-white">Checkout Summary</div>
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between text-zinc-300"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex items-center justify-between text-zinc-300"><span>Shipping</span><span>Calculated later</span></div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-xl font-black text-white"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <Btn className="w-full">Proceed to Checkout</Btn>
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">
              This is a branded prototype checkout flow. Next step would be wiring this to Shopify, Stripe, or your website cart.
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:px-6 md:grid-cols-3">
        <div>
          <div className="text-xl font-bold text-white">11b Sunnies</div>
          <div className="mt-2 text-sm text-zinc-400">Good sunnies. Good shade. Designed to disrupt.</div>
        </div>
        <div>
          <div className="font-semibold text-white">Why people buy</div>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-300" /> Wooden styles with attitude</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-300" /> Virtual try-on confidence</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-300" /> Market and online-ready brand look</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Next upgrade</div>
          <div className="mt-3 text-sm text-zinc-400">Connect real product photos, payments, shipping, and true eye-detection to make this fully live.</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [heroFaceUrl, setHeroFaceUrl] = useState("");
  const [heroFaceName, setHeroFaceName] = useState("");

  const heroFrame = starterFrames[0];

  const handleHeroFaceUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setHeroFaceUrl(url);
    setHeroFaceName(file.name);
  };

  const addToCart = (frame) => {
    const numericPrice = Number(String(frame.price).replace(/[^0-9.]/g, "")) || 0;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === frame.id);
      if (existing) {
        return prev.map((item) => (item.id === frame.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...frame, numericPrice, qty: 1 }];
    });
    setPage("cart");
  };

  const updateQty = (id, delta) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-stone-950 to-black text-white">
      <NavBar cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} onNavigate={setPage} />
      <Hero onNavigate={setPage} heroFaceUrl={heroFaceUrl} heroFaceName={heroFaceName} onHeroFaceUpload={handleHeroFaceUpload} heroFrame={heroFrame} />

      {page === "home" && (
        <>
          <ShopSection frames={starterFrames} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} onNavigate={setPage} />
          <TryOnSection frames={starterFrames} addToCart={addToCart} />
        </>
      )}

      {page === "shop" && <ShopSection frames={starterFrames} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} onNavigate={setPage} />}
      {page === "tryon" && <TryOnSection frames={starterFrames} addToCart={addToCart} />}
      {page === "cart" && <CartSection cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} />}

      <Footer />
    </div>
  );
}