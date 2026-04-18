import React, { useRef, useState } from "react";

const INVITE_VARIANTS = [
  { label: "Мама", text: "Дорогая Мама, приглашаем тебя на нашу свадьбу! Будем очень рады, если ты будешь рядом с нами в этот день." },
  { label: "Бабушка и дедушка", text: "Дорогие бабушка и дедушка, приглашаем вас на нашу свадьбу! Будем очень рады, если вы будете рядом с нами в этот день." },
  { label: "Папа Константин и Елена", text: "Дорогой папа Константин и дорогая Елена, приглашаем вас (и детей🥰) на нашу свадьбу! Будем очень рады, если вы будете рядом с нами в этот день." },
  { label: "Дядя Коля и тётя Лена", text: "Дорогие дядя Коля и тётя Лена, приглашаем вас и Серафима на нашу свадьбу! Будем очень рады, если вы будете рядом с нами в этот день." },
  { label: "Дарья и Тимофей", text: "Дорогие Дарья и Тимофей, приглашаем вас на нашу свадьбу! Будем очень рады, если вы будете рядом с нами в этот день." },
  { label: "Бабушка Дина и Бабушка Света", text: "Дорогая бабушка Дина и Бабушка Света, приглашаем вас на нашу свадьбу! Будем очень рады, если вы будете рядом с нами в этот день." },
  { label: "Мама и папа", text: "Дорогие мама и папа, приглашаем вас на нашу свадьбу! Будем очень рады, если вы будете рядом с нами в этот день." },
  { label: "Андрей", text: "Дорогой Андрей, приглашаем тебя на нашу свадьбу! Будем очень рады, если ты будешь рядом с нами в этот день." },
  { label: "Светлана и Родион", text: "Дорогие Светлана и Родион, приглашаем вас на нашу свадьбу! Будем очень рады, если вы будете рядом с нами в этот день." },
];

const COUPLE_PHOTO_URL = "https://cdn.poehali.dev/projects/ba4017f8-131f-49fb-92ba-f57e82f93ca9/bucket/7598d144-ddf0-4058-9c0e-73fca6d7d62a.jpeg";
const FLORAL_BG_URL = "https://cdn.poehali.dev/projects/ba4017f8-131f-49fb-92ba-f57e82f93ca9/files/428c9347-28da-4292-8be1-a760f2584fc2.jpg";
const PROXY_URL = "https://functions.poehali.dev/2229a973-ea11-4863-b54f-c13531af3e6d";

const W = 378;
const H = 567;
const S = 3; // scale

async function loadImageFromProxy(url: string): Promise<HTMLImageElement> {
  const resp = await fetch(`${PROXY_URL}?url=${encodeURIComponent(url)}`);
  const b64 = await resp.text();
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = b64;
  });
}

async function loadFonts() {
  const fonts = [
    new FontFace("Marck Script", "url(https://fonts.gstatic.com/s/marckscript/v15/nwpTtK2oNgBA3Or78gapdwuCzw.woff2)"),
    new FontFace("Great Vibes", "url(https://fonts.gstatic.com/s/greatvibes/v19/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlCZA.woff2)"),
    new FontFace("Playfair Display", "url(https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.woff2)", { weight: "700" }),
    new FontFace("Cormorant Garamond", "url(https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw-NMg.woff2)", { style: "italic" }),
    new FontFace("Cormorant Garamond", "url(https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjQEl5fug.woff2)"),
  ];
  await Promise.all(fonts.map(async (f) => {
    await f.load();
    document.fonts.add(f);
  }));
}

function goldGradient(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number) {
  const g = ctx.createLinearGradient(x1 * S, y * S, x2 * S, y * S);
  g.addColorStop(0, "transparent");
  g.addColorStop(0.3, "#c9a84c");
  g.addColorStop(0.5, "#e8d48b");
  g.addColorStop(0.7, "#c9a84c");
  g.addColorStop(1, "transparent");
  return g;
}

function drawGoldLine(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  ctx.beginPath();
  ctx.strokeStyle = goldGradient(ctx, x, x + w, y);
  ctx.lineWidth = 1 * S;
  ctx.moveTo(x * S, y * S);
  ctx.lineTo((x + w) * S, y * S);
  ctx.stroke();
}

function drawPearls(ctx: CanvasRenderingContext2D, cx: number, y: number) {
  const positions = [-10, 0, 10];
  positions.forEach((offset) => {
    const px = (cx + offset) * S;
    const py = y * S;
    const r = 3.5 * S;
    const g = ctx.createRadialGradient(px - r * 0.35, py - r * 0.35, 0, px, py, r);
    g.addColorStop(0, "#fff");
    g.addColorStop(0.5, "#e8e0d4");
    g.addColorStop(1, "#d4c9bc");
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 3 * S;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function drawTopOrnament(ctx: CanvasRenderingContext2D, label: string) {
  const cx = W / 2;
  drawPearls(ctx, cx, 21);
  drawGoldLine(ctx, 20, 28, W - 40);
  // label
  ctx.fillStyle = "#8a7560";
  ctx.font = `${8 * S}px 'Cormorant Garamond'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = `${3 * S}px`;
  ctx.fillText(label.toUpperCase(), cx * S, 33.5 * S);
  ctx.letterSpacing = "0px";
  drawGoldLine(ctx, 20, 37, W - 40);
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function drawCard1(coupleImg: HTMLImageElement, floralImg: HTMLImageElement, inviteText: string): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = W * S;
  canvas.height = H * S;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#faf7f3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Floral bg
  ctx.globalAlpha = 0.15;
  ctx.drawImage(floralImg, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  // Top ornament
  drawTopOrnament(ctx, "Свадебное приглашение");

  // Photo
  const photoX = 50, photoY = 48, photoW = W - 100, photoH = 320;
  ctx.save();
  ctx.beginPath();
  const r = 8;
  ctx.moveTo((photoX + r) * S, photoY * S);
  ctx.lineTo((photoX + photoW - r) * S, photoY * S);
  ctx.quadraticCurveTo((photoX + photoW) * S, photoY * S, (photoX + photoW) * S, (photoY + r) * S);
  ctx.lineTo((photoX + photoW) * S, (photoY + photoH - r) * S);
  ctx.quadraticCurveTo((photoX + photoW) * S, (photoY + photoH) * S, (photoX + photoW - r) * S, (photoY + photoH) * S);
  ctx.lineTo((photoX + r) * S, (photoY + photoH) * S);
  ctx.quadraticCurveTo(photoX * S, (photoY + photoH) * S, photoX * S, (photoY + photoH - r) * S);
  ctx.lineTo(photoX * S, (photoY + r) * S);
  ctx.quadraticCurveTo(photoX * S, photoY * S, (photoX + r) * S, photoY * S);
  ctx.clip();

  // draw photo centered top
  const scale = Math.max(photoW / coupleImg.width, photoH / coupleImg.height);
  const dw = coupleImg.width * scale;
  const dh = coupleImg.height * scale;
  const dx = photoX + (photoW - dw) / 2;
  const dy = photoY;
  ctx.drawImage(coupleImg, dx * S, dy * S, dw * S, dh * S);
  ctx.restore();

  // Gold border around photo
  ctx.strokeStyle = "#e8d48b";
  ctx.lineWidth = 2 * S;
  ctx.beginPath();
  ctx.moveTo((photoX + r) * S, photoY * S);
  ctx.lineTo((photoX + photoW - r) * S, photoY * S);
  ctx.quadraticCurveTo((photoX + photoW) * S, photoY * S, (photoX + photoW) * S, (photoY + r) * S);
  ctx.lineTo((photoX + photoW) * S, (photoY + photoH - r) * S);
  ctx.quadraticCurveTo((photoX + photoW) * S, (photoY + photoH) * S, (photoX + photoW - r) * S, (photoY + photoH) * S);
  ctx.lineTo((photoX + r) * S, (photoY + photoH) * S);
  ctx.quadraticCurveTo(photoX * S, (photoY + photoH) * S, photoX * S, (photoY + photoH - r) * S);
  ctx.lineTo(photoX * S, (photoY + r) * S);
  ctx.quadraticCurveTo(photoX * S, photoY * S, (photoX + r) * S, photoY * S);
  ctx.stroke();

  // Names
  const namesY = photoY + photoH + 22;
  ctx.fillStyle = "#3d5a3e";
  ctx.font = `${28 * S}px 'Marck Script'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Александр & Ангелина", (W / 2) * S, namesY * S);

  // Divider
  const divY = namesY + 18;
  drawGoldLine(ctx, 20, divY, W - 40);
  ctx.fillStyle = "#c9a84c";
  ctx.font = `${13 * S}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✦", (W / 2) * S, divY * S);
  drawGoldLine(ctx, 20, divY, W - 40);

  // Invite text
  const t1Y = divY + 16;
  ctx.fillStyle = "#5a3e2b";
  ctx.font = `italic ${15 * S}px 'Cormorant Garamond'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lines = wrapText(ctx, inviteText, (W - 50) * S);
  lines.forEach((line, i) => {
    ctx.fillText(line, (W / 2) * S, (t1Y + i * 20) * S);
  });

  // Bottom ornament
  const botY = H - 14;
  drawGoldLine(ctx, 20, botY, W - 40);
  drawPearls(ctx, W / 2, botY + 8);

  return canvas;
}

async function drawCard2(floralImg: HTMLImageElement): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = W * S;
  canvas.height = H * S;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#faf7f3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Floral bg
  ctx.globalAlpha = 0.15;
  ctx.drawImage(floralImg, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  // Top ornament
  drawTopOrnament(ctx, "24 · Июня · 2026");

  // Subtitle
  const sub1Y = 55;
  ctx.fillStyle = "#8a7560";
  ctx.font = `${9 * S}px 'Cormorant Garamond'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ПРИГЛАШАЕМ ВАС НА ТОРЖЕСТВО,", (W / 2) * S, sub1Y * S);
  ctx.fillText("ПОСВЯЩЁННОЕ ДНЮ НАШЕГО БРАКОСОЧЕТАНИЯ", (W / 2) * S, (sub1Y + 13) * S);

  // Big date
  const dateY = 90;
  ctx.fillStyle = "#2d2416";
  ctx.font = `bold ${32 * S}px 'Playfair Display'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("24 ИЮНЯ 2026", (W / 2) * S, dateY * S);

  // Bottom block — line + boxes + dresscode + signature
  // все элементы снизу через абсолютные координаты от низа
  const botOrnY = H - 14;
  drawGoldLine(ctx, 20, botOrnY, W - 40);
  drawPearls(ctx, W / 2, botOrnY + 8);

  // Signature
  const sigY = botOrnY - 10;
  ctx.fillStyle = "#7a6550";
  ctx.font = `italic ${12 * S}px 'Cormorant Garamond'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("Александр и Ангелина", (W / 2) * S, sigY * S);

  // "До встречи"
  const untilY = sigY - 6;
  ctx.fillStyle = "#3d5a3e";
  ctx.font = `${26 * S}px 'Great Vibes'`;
  ctx.textBaseline = "bottom";
  ctx.fillText("До встречи на нашей свадьбе!", (W / 2) * S, untilY * S);

  // divider star above "до встречи"
  const starY = untilY - 26;
  drawGoldLine(ctx, 20, starY, W - 40);
  ctx.fillStyle = "#c9a84c";
  ctx.font = `${11 * S}px serif`;
  ctx.textBaseline = "middle";
  ctx.fillText("✦", (W / 2) * S, starY * S);

  // Dresscode block
  const dcBotY = starY - 8;
  const dcH = 90;
  const dcTopY = dcBotY - dcH;
  ctx.fillStyle = "rgba(250,245,235,0.85)";
  roundRect(ctx, 20 * S, dcTopY * S, (W - 40) * S, dcH * S, 8 * S);
  ctx.fill();
  ctx.strokeStyle = "rgba(201,168,76,0.22)";
  ctx.lineWidth = 1 * S;
  roundRect(ctx, 20 * S, dcTopY * S, (W - 40) * S, dcH * S, 8 * S);
  ctx.stroke();

  // dresscode title
  ctx.fillStyle = "#3d2b1a";
  ctx.font = `${28 * S}px 'Great Vibes'`;
  ctx.textBaseline = "top";
  ctx.fillText("Дресс-код", (W / 2) * S, (dcTopY + 2) * S);

  // dresscode text
  ctx.fillStyle = "#5a3e2b";
  ctx.font = `italic ${10 * S}px 'Cormorant Garamond'`;
  ctx.textBaseline = "top";
  ctx.fillText("Для нас самое главное — ваше присутствие!", (W / 2) * S, (dcTopY + 36) * S);
  ctx.font = `italic ${9.5 * S}px 'Cormorant Garamond'`;
  ctx.fillText("Но мы будем рады, если поддержите цветовую гамму 🥰", (W / 2) * S, (dcTopY + 52) * S);

  // swatches
  const swatchColors = ["#d4c5b0", "#e8a0a8", "#c4b0d4", "#a8bfd4", "#9db89e", "#d8e490"];
  const swR = 12 * S;
  const swY = (dcTopY + 72) * S;
  const totalW = swatchColors.length * (swR * 2 + 4 * S) - 4 * S;
  let swX = (W / 2) * S - totalW / 2 + swR;
  swatchColors.forEach((color) => {
    ctx.beginPath();
    ctx.arc(swX, swY, swR, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2 * S;
    ctx.stroke();
    swX += swR * 2 + 4 * S;
  });

  // divider star above dresscode
  const dc_divY = dcTopY - 8;
  drawGoldLine(ctx, 20, dc_divY, W - 40);
  ctx.fillStyle = "#c9a84c";
  ctx.font = `${13 * S}px serif`;
  ctx.textBaseline = "middle";
  ctx.fillText("✦", (W / 2) * S, dc_divY * S);

  // Time boxes
  const boxBotY = dc_divY - 10;
  const boxH = 105;
  const boxTopY = boxBotY - boxH;
  const boxW = (W - 40 - 10) / 2;

  function drawBox(x: number, label: string, time: string, emoji: string, addr: string[]) {
    ctx.fillStyle = "rgba(201,168,76,0.07)";
    roundRect(ctx, x * S, boxTopY * S, boxW * S, boxH * S, 8 * S);
    ctx.fill();
    ctx.strokeStyle = "rgba(201,168,76,0.28)";
    ctx.lineWidth = 1 * S;
    roundRect(ctx, x * S, boxTopY * S, boxW * S, boxH * S, 8 * S);
    ctx.stroke();

    const cx = (x + boxW / 2) * S;
    ctx.textAlign = "center";

    // label
    ctx.fillStyle = "#8a7560";
    ctx.font = `${7.5 * S}px 'Cormorant Garamond'`;
    ctx.textBaseline = "top";
    ctx.fillText(label, cx, (boxTopY + 7) * S);

    // time
    ctx.fillStyle = "#2d2416";
    ctx.font = `bold ${20 * S}px 'Playfair Display'`;
    ctx.textBaseline = "middle";
    ctx.fillText(time, cx, (boxTopY + 34) * S);

    // emoji
    ctx.font = `${15 * S}px serif`;
    ctx.fillText(emoji, cx, (boxTopY + 54) * S);

    // address
    ctx.fillStyle = "#5a3e2b";
    ctx.font = `${10 * S}px 'Cormorant Garamond'`;
    addr.forEach((line, i) => {
      ctx.fillText(line, cx, (boxTopY + 68 + i * 13) * S);
    });
  }

  drawBox(20, "ТОРЖЕСТВЕННАЯ РЕГИСТРАЦИЯ", "15:00", "💍", ["г. Тюмень", "ул. Малыгина, 85 · ЗАГС"]);
  drawBox(20 + boxW + 10, "ПРАЗДНИЧНЫЙ УЖИН", "18:30–00:30", "🥂", ["г. Тюмень", "ул. Н. Фёдорова, 9", "Рест. «Грин Хаус»"]);

  // Gold line above boxes
  const lineAboveBoxY = boxTopY - 8;
  drawGoldLine(ctx, 20, lineAboveBoxY, W - 40);

  return canvas;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
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

function DownloadButton({ cardNum, inviteText, variantLabel }: { cardNum: 1 | 2; inviteText?: string; variantLabel?: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await loadFonts();
      const [coupleImg, floralImg] = await Promise.all([
        loadImageFromProxy(COUPLE_PHOTO_URL),
        loadImageFromProxy(FLORAL_BG_URL),
      ]);
      const canvas = cardNum === 1
        ? await drawCard1(coupleImg, floralImg, inviteText ?? INVITE_VARIANTS[0].text)
        : await drawCard2(floralImg);
      const link = document.createElement("a");
      link.download = `приглашение-${variantLabel ?? "карточка-1"}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.97);
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
        textTransform: "uppercase",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: "0 2px 8px rgba(201,168,76,0.35)",
        fontWeight: 600,
      }}
    >
      {loading ? "Сохранение..." : "⬇ Скачать карточку"}
    </button>
  );
}

export default function Index() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const [variantIdx, setVariantIdx] = useState(0);
  const currentVariant = INVITE_VARIANTS[variantIdx];

  return (
    <div className="min-h-screen bg-[#e8e3dc] flex flex-col items-center py-10 px-4 gap-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Great+Vibes&family=Marck+Script&display=swap');
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
        .variant-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid #c9a84c;
          background: transparent;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          color: #5a3e2b;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .variant-btn.active {
          background: linear-gradient(135deg, #c9a84c, #e8d48b);
          color: #3d2b1a;
          font-weight: 600;
        }
      `}</style>

      {/* КАРТОЧКА 1 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
        <p className="card-label text-center mb-3" style={{ letterSpacing: "4px" }}>Карточка 1 из 2</p>

        {/* Переключатель вариантов */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", maxWidth: "420px", marginBottom: "14px" }}>
          {INVITE_VARIANTS.map((v, i) => (
            <button
              key={i}
              className={`variant-btn${variantIdx === i ? " active" : ""}`}
              onClick={() => setVariantIdx(i)}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div ref={card1Ref} style={cardStyle}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `url(${FLORAL_BG_URL})`,
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15,
          }} />

          {/* Top ornament */}
          <div style={{ position: "absolute", top: "14px", left: "20px", right: "20px", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
              <div className="pearl-dot" /><div className="pearl-dot" /><div className="pearl-dot" />
            </div>
            <div className="gold-line" style={{ width: "100%", marginBottom: "3px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="gold-line" style={{ width: "40px" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", color: "#8a7560", whiteSpace: "nowrap" }}>Свадебное приглашение</span>
              <div className="gold-line" style={{ width: "40px" }} />
            </div>
            <div className="gold-line" style={{ width: "100%", marginTop: "3px" }} />
          </div>

          {/* Фото */}
          <div style={{ position: "relative", zIndex: 10, padding: "58px 50px 0" }}>
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "2px solid #e8d48b", boxShadow: "0 4px 16px rgba(0,0,0,0.14)" }}>
              <img src={COUPLE_PHOTO_URL} alt="Александр и Ангелина"
                style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
          </div>

          {/* Имена */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginTop: "10px" }}>
            <h2 style={{ fontFamily: "'Marck Script', cursive", fontSize: "28px", color: "#3d5a3e", lineHeight: 1.1, margin: 0 }}>
              Александр &amp; Ангелина
            </h2>
          </div>

          {/* Текст + нижняя полоска — единый абсолютный блок от имён до низа */}
          <div style={{ position: "absolute", top: "430px", bottom: "30px", left: "20px", right: "20px", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
            <div className="sec-div" style={{ marginBottom: "8px" }}><span style={{ color: "#c9a84c", fontSize: "13px" }}>✦</span></div>
            <p className="font-serif-el" style={{ fontSize: "15px", fontStyle: "italic", color: "#5a3e2b", lineHeight: 1.5, marginBottom: "0", textAlign: "center" }}>
              {currentVariant.text}
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
        <DownloadButton cardNum={1} inviteText={currentVariant.text} variantLabel={currentVariant.label} />
      </div>

      {/* КАРТОЧКА 2 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="card-label text-center mb-3" style={{ letterSpacing: "4px" }}>Карточка 2 из 2</p>
        <div ref={card2Ref} style={cardStyle}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `url(${FLORAL_BG_URL})`,
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15,
          }} />

          {/* Top ornament */}
          <div style={{ position: "absolute", top: "14px", left: "20px", right: "20px", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
              <div className="pearl-dot" /><div className="pearl-dot" /><div className="pearl-dot" />
            </div>
            <div className="gold-line" style={{ width: "100%", marginBottom: "3px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="gold-line" style={{ width: "40px" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", color: "#8a7560", whiteSpace: "nowrap" }}>24 · Июня · 2026</span>
              <div className="gold-line" style={{ width: "40px" }} />
            </div>
            <div className="gold-line" style={{ width: "100%", marginTop: "3px" }} />
          </div>

          {/* Дата */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", paddingTop: "68px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7560", lineHeight: 1.5, margin: "0 0 6px" }}>
              Приглашаем вас на торжество,<br />посвящённое дню нашего бракосочетания
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: "#2d2416", letterSpacing: "1px", lineHeight: 1, margin: 0 }}>
              24 ИЮНЯ 2026
            </p>
          </div>

          {/* Линия + окошки + дресс-код + финал — всё прижато к низу */}
          <div style={{ position: "absolute", bottom: "10px", left: "20px", right: "20px", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
            <div className="gold-line" style={{ marginBottom: "8px" }} />

            {/* Окошки */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "8px 6px", borderRadius: "8px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.28)" }}>
                <div style={{ height: "26px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7560", lineHeight: 1.2 }}>Торжественная регистрация</span>
                </div>
                <div style={{ height: "30px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#2d2416" }}>15:00</span>
                </div>
                <span style={{ fontSize: "16px", margin: "2px 0" }}>💍</span>
                <div style={{ height: "52px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: "#5a3e2b", lineHeight: 1.5 }}>г. Тюмень<br />ул. Малыгина, 85<br />ЗАГС</span>
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "8px 6px", borderRadius: "8px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.28)" }}>
                <div style={{ height: "26px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7560", lineHeight: 1.2 }}>Праздничный ужин</span>
                </div>
                <div style={{ height: "30px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#2d2416" }}>18:30–00:30</span>
                </div>
                <span style={{ fontSize: "16px", margin: "2px 0" }}>🥂</span>
                <div style={{ height: "52px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: "#5a3e2b", lineHeight: 1.5 }}>г. Тюмень<br />ул. Н. Фёдорова, 9<br />Рест. «Грин Хаус»</span>
                </div>
              </div>
            </div>

            {/* Дресс-код */}
            <div>
              <div className="sec-div" style={{ marginBottom: "3px" }}>
                <span style={{ color: "#c9a84c", fontSize: "13px" }}>✦</span>
              </div>
              <div style={{ padding: "5px 12px", borderRadius: "8px", background: "rgba(250,245,235,0.85)", border: "1px solid rgba(201,168,76,0.22)", textAlign: "center" }}>
                <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "26px", color: "#3d2b1a", lineHeight: 1.1, margin: "0 0 2px" }}>Дресс-код</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10.5px", fontStyle: "italic", color: "#5a3e2b", lineHeight: 1.4, margin: "0 0 2px" }}>Для нас самое главное — ваше присутствие!</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", fontStyle: "italic", color: "#5a3e2b", lineHeight: 1.4, margin: "0 0 4px" }}>Но мы будем очень благодарны, если поддержите цветовую гамму нашей свадьбы 🥰</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "7px" }}>
                  {["#d4c5b0","#e8a0a8","#c4b0d4","#a8bfd4","#9db89e","#d8e490"].map(c => (
                    <div key={c} className="dress-swatch" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Финал */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", marginTop: "3px" }}>
              <div className="sec-div" style={{ marginBottom: "1px" }}>
                <span style={{ color: "#c9a84c", fontSize: "11px" }}>✦</span>
              </div>
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "22px", color: "#3d5a3e", lineHeight: 1.2, margin: 0 }}>До встречи на нашей свадьбе!</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontStyle: "italic", color: "#7a6550", letterSpacing: "1px", margin: "0 0 3px" }}>Александр и Ангелина</p>
              <div className="gold-line" style={{ width: "100%" }} />
              <div style={{ display: "flex", gap: "6px", marginTop: "2px" }}>
                <div className="pearl-dot" /><div className="pearl-dot" /><div className="pearl-dot" />
              </div>
            </div>
          </div>
        </div>
        <DownloadButton cardNum={2} />
      </div>

      <p className="card-label text-center" style={{ fontFamily: "'Cormorant Garamond', serif", marginTop: "4px" }}>
        Каждая карточка — 10×15 см · Распечатайте на фотобумаге
      </p>
    </div>
  );
}