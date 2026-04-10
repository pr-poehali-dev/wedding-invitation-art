import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const COUPLE_PHOTO_URL = "https://cdn.poehali.dev/projects/ba4017f8-131f-49fb-92ba-f57e82f93ca9/bucket/7598d144-ddf0-4058-9c0e-73fca6d7d62a.jpeg";
const FLORAL_BG_URL = "https://cdn.poehali.dev/projects/ba4017f8-131f-49fb-92ba-f57e82f93ca9/files/428c9347-28da-4292-8be1-a760f2584fc2.jpg";

const PROXY_URL = "https://functions.poehali.dev/2229a973-ea11-4863-b54f-c13531af3e6d";

async function urlToBase64(url: string): Promise<string> {
  const resp = await fetch(`${PROXY_URL}?url=${encodeURIComponent(url)}`);
  const text = await resp.text();
  return text;
}

const cardStyle: React.CSSProperties = {
  width: "378px",
  height: "567px",
  background: "#faf7f3",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
  flexShrink: 0,
};

function DownloadButton({ cardRef, filename }: { cardRef: React.RefObject<HTMLDivElement>; filename: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setLoading(true);
    try {
      const el = cardRef.current;

      // Загружаем оба изображения как base64
      const [coupleB64, floralB64] = await Promise.all([
        urlToBase64(COUPLE_PHOTO_URL),
        urlToBase64(FLORAL_BG_URL),
      ]);

      // Временно подменяем src у <img> и убираем filter
      const imgs = el.querySelectorAll<HTMLImageElement>("img");
      const origSrcs: string[] = [];
      const origFilters: string[] = [];
      imgs.forEach((img) => {
        origSrcs.push(img.src);
        origFilters.push(img.style.filter);
        if (img.src.includes("7598d144")) {
          img.src = coupleB64;
          img.style.filter = "none";
        }
      });

      // Временно подменяем background-image у div с флоральным фоном
      const bgDivs = el.querySelectorAll<HTMLElement>("[style]");
      const origBgs: string[] = [];
      bgDivs.forEach((div) => {
        const bg = div.style.backgroundImage;
        origBgs.push(bg);
        if (bg && bg.includes("428c9347")) {
          div.style.backgroundImage = `url(${floralB64})`;
        }
      });

      // Ждём загрузки шрифтов и перерисовки
      await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 200));

      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: false,
        allowTaint: false,
        backgroundColor: "#faf7f3",
        imageTimeout: 0,
      });

      // Восстанавливаем оригинальные значения
      imgs.forEach((img, i) => {
        img.src = origSrcs[i];
        img.style.filter = origFilters[i];
      });
      bgDivs.forEach((div, i) => { if (origBgs[i]) div.style.backgroundImage = origBgs[i]; });

      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{
        marginTop: "10px",
        padding: "9px 28px",
        background: loading ? "#b8a06a" : "linear-gradient(135deg, #c9a84c, #e8d48b, #c9a84c)",
        color: "#3d2b1a",
        border: "none",
        borderRadius: "6px",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "13px",
        letterSpacing: "2px",
        textTransform: "uppercase" as const,
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: "0 2px 8px rgba(201,168,76,0.35)",
        fontWeight: 600,
        transition: "opacity 0.2s",
      }}
    >
      {loading ? "Сохранение..." : "⬇ Скачать карточку"}
    </button>
  );
}

export default function Index() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#e8e3dc] flex flex-col items-center py-10 px-4 gap-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Great+Vibes&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-serif-el { font-family: 'Cormorant Garamond', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .gold-line {
          border: none; height: 1px;
          background: linear-gradient(to right, transparent, #c9a84c, #e8d48b, #c9a84c, transparent);
          display: block;
        }
        .pearl-dot {
          width: 7px; height: 7px;
          background: radial-gradient(circle at 35% 35%, #fff, #e8e0d4, #d4c9bc);
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          display: inline-block;
        }
        .sec-div {
          display: flex; align-items: center; gap: 10px; width: 100%;
        }
        .sec-div::before, .sec-div::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, #c9a84c, transparent);
        }
        .dress-swatch {
          width: 30px; height: 30px; border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0,0,0,0.12);
          border: 2px solid rgba(255,255,255,0.85);
        }
        .card-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #8a7560;
        }
      `}</style>

      {/* КАРТОЧКА 1 — Фото + имена + текст */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="card-label text-center mb-3" style={{ letterSpacing: "4px" }}>Карточка 1 из 2</p>
        <div ref={card1Ref} style={cardStyle}>
          {/* Floral bg */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `url(${FLORAL_BG_URL})`,
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15,
          }} />

          {/* Top ornament */}
          <div style={{ position: "relative", zIndex: 10, paddingTop: "14px", paddingLeft: "20px", paddingRight: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
              <div className="pearl-dot" /><div className="pearl-dot" /><div className="pearl-dot" />
            </div>
            <div className="gold-line" style={{ width: "100%", marginBottom: "3px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="gold-line" style={{ width: "40px" }} />
              <span className="card-label" style={{ fontSize: "8px", letterSpacing: "3px", whiteSpace: "nowrap" }}>Свадебное приглашение</span>
              <div className="gold-line" style={{ width: "40px" }} />
            </div>
            <div className="gold-line" style={{ width: "100%", marginTop: "3px" }} />
          </div>

          {/* Общее фото */}
          <div style={{ position: "relative", zIndex: 10, padding: "10px 50px 0" }}>
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "2px solid #e8d48b", boxShadow: "0 4px 16px rgba(0,0,0,0.14)" }}>
              <img
                src={COUPLE_PHOTO_URL}
                alt="Александр и Ангелина"
                style={{ width: "100%", height: "340px", objectFit: "cover", objectPosition: "center 20%", display: "block", filter: "brightness(1.03) contrast(0.97)" }}
              />
            </div>
          </div>

          {/* Имена в одну линию */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginTop: "8px" }}>
            <h2 className="font-script" style={{ fontSize: "34px", color: "#3d5a3e", lineHeight: 1.1 }}>
              Александр &amp; Ангелина
            </h2>
          </div>

          {/* Разделитель */}
          <div style={{ position: "relative", zIndex: 10, padding: "2px 22px" }}>
            <div className="sec-div">
              <span style={{ color: "#c9a84c", fontSize: "13px" }}>✦</span>
            </div>
          </div>

          {/* Текст приглашения */}
          <div style={{ position: "relative", zIndex: 10, padding: "0 26px", textAlign: "center" }}>
            <p className="font-serif-el" style={{ fontSize: "13px", fontStyle: "italic", color: "#5a3e2b", lineHeight: 1.7, marginBottom: "4px" }}>
              Привет!
            </p>
            <p className="font-serif-el" style={{ fontSize: "12.5px", fontStyle: "italic", color: "#5a3e2b", lineHeight: 1.7 }}>
              Мы приглашаем тебя на нашу свадьбу и будем очень рады видеть тебя в этот день.
            </p>
          </div>

          {/* Bottom ornament */}
          <div style={{ position: "absolute", bottom: "12px", left: "20px", right: "20px", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div className="gold-line" style={{ width: "100%" }} />
            <div style={{ display: "flex", gap: "6px" }}>
              <div className="pearl-dot" /><div className="pearl-dot" /><div className="pearl-dot" />
            </div>
          </div>
        </div>
        <DownloadButton cardRef={card1Ref} filename="приглашение-карточка-1.jpg" />
      </div>

      {/* КАРТОЧКА 2 — Дата + место + дресс-код */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="card-label text-center mb-3" style={{ letterSpacing: "4px" }}>Карточка 2 из 2</p>
        <div ref={card2Ref} style={cardStyle}>
          {/* Floral bg */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `url(${FLORAL_BG_URL})`,
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15,
          }} />

          {/* Top ornament */}
          <div style={{ position: "relative", zIndex: 10, paddingTop: "14px", paddingLeft: "20px", paddingRight: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
              <div className="pearl-dot" /><div className="pearl-dot" /><div className="pearl-dot" />
            </div>
            <div className="gold-line" style={{ width: "100%", marginBottom: "3px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="gold-line" style={{ width: "40px" }} />
              <span className="card-label" style={{ fontSize: "8px", letterSpacing: "3px", whiteSpace: "nowrap" }}>24 · Июня · 2026</span>
              <div className="gold-line" style={{ width: "40px" }} />
            </div>
            <div className="gold-line" style={{ width: "100%", marginTop: "3px" }} />
          </div>

          {/* Дата */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "8px 22px 4px" }}>
            <p className="font-serif-el" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7560", marginBottom: "4px", lineHeight: 1.6 }}>
              Приглашаем вас на торжество,<br/>посвящённое дню нашего бракосочетания
            </p>
            <p className="font-playfair" style={{ fontSize: "32px", fontWeight: 700, color: "#2d2416", letterSpacing: "1px", lineHeight: 1.1 }}>
              24 ИЮНЯ 2026
            </p>
            <div className="gold-line" style={{ width: "100%", marginTop: "6px" }} />
          </div>

          {/* Время и место */}
          <div style={{ position: "relative", zIndex: 10, padding: "6px 16px", display: "flex", gap: "10px" }}>
            {/* ЗАГС */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "8px 6px", borderRadius: "8px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.28)" }}>
              <p className="card-label" style={{ fontSize: "8px", marginBottom: "4px", lineHeight: 1.5 }}>Торжественная<br/>регистрация</p>
              <p className="font-playfair" style={{ fontSize: "22px", fontWeight: 700, color: "#2d2416" }}>15:00</p>
              <span style={{ fontSize: "16px", margin: "2px 0" }}>💍</span>
              <p className="font-serif-el" style={{ fontSize: "11px", color: "#5a3e2b", lineHeight: 1.6 }}>
                г. Тюмень<br/>ул. Малыгина, 85<br/>ЗАГС
              </p>
            </div>
            {/* Банкет */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "8px 6px", borderRadius: "8px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.28)" }}>
              <p className="card-label" style={{ fontSize: "8px", marginBottom: "4px", lineHeight: 1.5 }}>Праздничный<br/>ужин</p>
              <p className="font-playfair" style={{ fontSize: "18px", fontWeight: 700, color: "#2d2416", lineHeight: 1.2 }}>18:30–00:30</p>
              <span style={{ fontSize: "16px", margin: "2px 0" }}>🥂</span>
              <p className="font-serif-el" style={{ fontSize: "11px", color: "#5a3e2b", lineHeight: 1.6 }}>
                г. Тюмень<br/>ул. Н. Фёдорова, 9<br/>Рест. «Грин Хаус»
              </p>
            </div>
          </div>

          {/* Дресс-код */}
          <div style={{ position: "relative", zIndex: 10, padding: "2px 18px 0" }}>
            <div className="sec-div" style={{ marginBottom: "3px" }}>
              <span style={{ color: "#c9a84c", fontSize: "13px" }}>✦</span>
            </div>
            <div style={{ padding: "5px 12px", borderRadius: "8px", background: "rgba(250,245,235,0.85)", border: "1px solid rgba(201,168,76,0.22)", textAlign: "center" }}>
              <h3 className="font-script" style={{ fontSize: "24px", color: "#3d2b1a", lineHeight: 1.1, marginBottom: "2px" }}>Дресс-код</h3>
              <p className="font-serif-el" style={{ fontSize: "11px", fontStyle: "italic", color: "#5a3e2b", lineHeight: 1.5, marginBottom: "2px" }}>
                Для нас самое главное — ваше присутствие!
              </p>
              <p className="font-serif-el" style={{ fontSize: "10.5px", fontStyle: "italic", color: "#5a3e2b", lineHeight: 1.5, marginBottom: "4px" }}>
                Но мы будем очень благодарны, если поддержите цветовую гамму нашей свадьбы 🥰
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "7px" }}>
                <div className="dress-swatch" style={{ background: "#d4c5b0" }} />
                <div className="dress-swatch" style={{ background: "#e8a0a8" }} />
                <div className="dress-swatch" style={{ background: "#c4b0d4" }} />
                <div className="dress-swatch" style={{ background: "#a8bfd4" }} />
                <div className="dress-swatch" style={{ background: "#9db89e" }} />
                <div className="dress-swatch" style={{ background: "#d8e490" }} />
              </div>
            </div>
          </div>

          {/* Финальная фраза */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "3px 22px 0" }}>
            <div className="sec-div" style={{ marginBottom: "2px" }}>
              <span style={{ color: "#c9a84c", fontSize: "11px" }}>✦</span>
            </div>
            <p className="font-script" style={{ fontSize: "20px", color: "#3d5a3e", lineHeight: 1.2 }}>
              До встречи на нашей свадьбе!
            </p>
            <p className="font-serif-el" style={{ fontSize: "12px", fontStyle: "italic", color: "#7a6550", letterSpacing: "1px" }}>
              Александр и Ангелина
            </p>
          </div>

          {/* Bottom ornament */}
          <div style={{ position: "absolute", bottom: "10px", left: "20px", right: "20px", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div className="gold-line" style={{ width: "100%" }} />
            <div style={{ display: "flex", gap: "6px" }}>
              <div className="pearl-dot" /><div className="pearl-dot" /><div className="pearl-dot" />
            </div>
          </div>
        </div>
        <DownloadButton cardRef={card2Ref} filename="приглашение-карточка-2.jpg" />
      </div>

      <p className="card-label text-center" style={{ fontFamily: "'Cormorant Garamond', serif", marginTop: "4px" }}>
        Каждая карточка — 10×15 см · Распечатайте на фотобумаге
      </p>
    </div>
  );
}