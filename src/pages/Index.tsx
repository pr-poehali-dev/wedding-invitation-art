import { useRef } from "react";

const COUPLE_PHOTO = "https://cdn.poehali.dev/projects/ba4017f8-131f-49fb-92ba-f57e82f93ca9/bucket/0bc44a41-3ce7-476b-812f-c0cc67edc7da.jpeg";
const FLORAL_BG = "https://cdn.poehali.dev/projects/ba4017f8-131f-49fb-92ba-f57e82f93ca9/files/428c9347-28da-4292-8be1-a760f2584fc2.jpg";

export default function Index() {
  const inviteRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col items-center py-8 px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Great+Vibes&display=swap');
        
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-serif-elegant { font-family: 'Cormorant Garamond', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        
        .gold-line {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a84c, #e8d48b, #c9a84c, transparent);
        }
        .gold-ornament::before, .gold-ornament::after {
          content: '✦';
          color: #c9a84c;
          font-size: 10px;
          margin: 0 12px;
        }
        .pearl-dot { 
          width: 8px; height: 8px; 
          background: radial-gradient(circle at 35% 35%, #fff, #e8e0d4, #d4c9bc);
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          display: inline-block;
        }
        .invite-border {
          border: 1.5px solid transparent;
          background-clip: padding-box;
          position: relative;
        }
        .invite-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #c9a84c 0%, #e8d48b 25%, #c9a84c 50%, #e8d48b 75%, #c9a84c 100%);
          border-radius: inherit;
          z-index: -1;
        }
        .section-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
        .section-divider::before, .section-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a84c, transparent);
        }
        .dress-swatch {
          width: 36px; height: 36px; border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          border: 2px solid rgba(255,255,255,0.8);
        }
      `}</style>

      <div ref={inviteRef} className="w-full max-w-[480px] relative overflow-hidden rounded-2xl shadow-2xl" style={{ background: "#faf7f3" }}>
        
        {/* Floral background overlay */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{
          backgroundImage: `url(${FLORAL_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
        }} />

        {/* Top gold border ornament */}
        <div className="relative z-10 pt-6 px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="pearl-dot" />
            <div className="pearl-dot" />
            <div className="pearl-dot" />
          </div>
          <div className="gold-line w-full mb-1" />
          <div className="flex items-center gap-3">
            <div className="gold-line w-16" />
            <span style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>Свадебное приглашение</span>
            <div className="gold-line w-16" />
          </div>
          <div className="gold-line w-full mt-1" />
          <div className="flex items-center gap-2 mt-1">
            <div className="pearl-dot" />
            <div className="pearl-dot" />
            <div className="pearl-dot" />
          </div>
        </div>

        {/* SECTION 1: "Эти двое наконец-то женятся!" */}
        <div className="relative z-10 px-8 pt-6 pb-4 flex flex-col items-center text-center">
          <p className="font-script text-[#7a6550] mb-1" style={{ fontSize: "15px", letterSpacing: "1px" }}>
            с радостью сообщаем:
          </p>
          <h1 className="font-script" style={{ fontSize: "38px", color: "#5a3e2b", lineHeight: 1.2 }}>
            Эти двое наконец-то
          </h1>
          <h1 className="font-script" style={{ fontSize: "38px", color: "#5a3e2b", lineHeight: 1.2 }}>
            женятся!
          </h1>
          <div className="mt-3 section-divider">
            <span style={{ color: "#c9a84c", fontSize: "16px" }}>✦</span>
          </div>
        </div>

        {/* SECTION 2: Два фото — жених и невеста маленькими */}
        <div className="relative z-10 px-8 pb-5 flex gap-4 justify-center">
          <div className="flex-1 max-w-[180px] rounded-xl overflow-hidden shadow-lg" style={{ border: "2px solid #e8d48b" }}>
            <img
              src={COUPLE_PHOTO}
              alt="Жених и невеста"
              className="w-full object-cover"
              style={{ height: "200px", objectPosition: "top center", filter: "brightness(1.04) contrast(0.97)" }}
            />
            <div className="py-2 text-center" style={{ background: "rgba(250,247,243,0.95)" }}>
              <p className="font-serif-elegant italic" style={{ fontSize: "13px", color: "#7a6550" }}>Александр</p>
            </div>
          </div>
          <div className="flex-1 max-w-[180px] rounded-xl overflow-hidden shadow-lg" style={{ border: "2px solid #e8d48b" }}>
            <img
              src={COUPLE_PHOTO}
              alt="Жених и невеста"
              className="w-full object-cover"
              style={{ height: "200px", objectPosition: "30% center", filter: "brightness(1.04) contrast(0.97)" }}
            />
            <div className="py-2 text-center" style={{ background: "rgba(250,247,243,0.95)" }}>
              <p className="font-serif-elegant italic" style={{ fontSize: "13px", color: "#7a6550" }}>Ангелина</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Имена */}
        <div className="relative z-10 px-8 pb-2 flex flex-col items-center text-center">
          <h2 className="font-script" style={{ fontSize: "48px", color: "#3d5a3e", lineHeight: 1.1 }}>
            Александр
          </h2>
          <p className="font-serif-elegant" style={{ fontSize: "22px", color: "#c9a84c", marginTop: "-4px", marginBottom: "-4px" }}>&amp;</p>
          <h2 className="font-script" style={{ fontSize: "48px", color: "#3d5a3e", lineHeight: 1.1 }}>
            Ангелина
          </h2>
          <div className="mt-4 section-divider">
            <span style={{ color: "#c9a84c", fontSize: "16px" }}>✦</span>
          </div>
        </div>

        {/* SECTION 4: Краткое приглашение */}
        <div className="relative z-10 px-10 py-5 flex flex-col items-center text-center">
          <p className="font-serif-elegant italic" style={{ fontSize: "17px", color: "#5a3e2b", lineHeight: 1.8 }}>
            Привет!
          </p>
          <p className="font-serif-elegant italic" style={{ fontSize: "16px", color: "#5a3e2b", lineHeight: 1.9 }}>
            Мы приглашаем тебя на нашу свадьбу и будем очень рады видеть тебя в этот день.
          </p>
          <div className="my-3 gold-line w-24" />
          <p className="font-serif-elegant italic" style={{ fontSize: "15px", color: "#5a3e2b", lineHeight: 1.9 }}>
            Можешь приехать в ЗАГС, поддержать и быть с нами с самого начала, а можешь приехать сразу на банкет. Мы будем очень рады тебе 🥰
          </p>
          <div className="mt-4 section-divider">
            <span style={{ color: "#c9a84c", fontSize: "16px" }}>✦</span>
          </div>
        </div>

        {/* SECTION 5: Дата, время, место */}
        <div className="relative z-10 px-8 py-5 flex flex-col items-center text-center">
          <p className="font-serif-elegant uppercase" style={{ fontSize: "11px", letterSpacing: "3px", color: "#8a7560", marginBottom: "8px" }}>
            Приглашаем вас на торжество,<br/>посвящённое дню нашего бракосочетания
          </p>
          <div className="gold-line w-full mb-4" />
          <p className="font-playfair" style={{ fontSize: "42px", fontWeight: 700, color: "#2d2416", letterSpacing: "1px" }}>
            24 ИЮНЯ 2026
          </p>
          <div className="gold-line w-full mt-3 mb-6" />

          <div className="flex w-full gap-3">
            {/* ЗАГС */}
            <div className="flex-1 flex flex-col items-center p-4 rounded-xl" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <p className="font-serif-elegant uppercase" style={{ fontSize: "9px", letterSpacing: "2.5px", color: "#8a7560", marginBottom: "6px" }}>
                Торжественная<br/>регистрация
              </p>
              <p className="font-playfair" style={{ fontSize: "30px", fontWeight: 700, color: "#2d2416" }}>15:00</p>
              <span style={{ fontSize: "22px", margin: "4px 0" }}>💍</span>
              <p className="font-serif-elegant" style={{ fontSize: "12px", color: "#5a3e2b", lineHeight: 1.6, marginTop: "4px" }}>
                г. Тюмень<br/>ул. Малыгина, 85<br/>ЗАГС
              </p>
            </div>
            {/* Банкет */}
            <div className="flex-1 flex flex-col items-center p-4 rounded-xl" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <p className="font-serif-elegant uppercase" style={{ fontSize: "9px", letterSpacing: "2.5px", color: "#8a7560", marginBottom: "6px" }}>
                Праздничный<br/>ужин
              </p>
              <p className="font-playfair" style={{ fontSize: "26px", fontWeight: 700, color: "#2d2416" }}>18:30–00:30</p>
              <span style={{ fontSize: "22px", margin: "4px 0" }}>🥂</span>
              <p className="font-serif-elegant" style={{ fontSize: "12px", color: "#5a3e2b", lineHeight: 1.6, marginTop: "4px" }}>
                г. Тюмень<br/>ул. Николая Фёдорова, 9<br/>Ресторан «Грин Хаус»
              </p>
            </div>
          </div>

          <div className="mt-5 section-divider">
            <span style={{ color: "#c9a84c", fontSize: "16px" }}>✦</span>
          </div>
        </div>

        {/* SECTION 6: Дресс-код */}
        <div className="relative z-10 px-8 py-4 flex flex-col items-center text-center">
          <p className="font-serif-elegant uppercase" style={{ fontSize: "9px", letterSpacing: "3px", color: "#8a7560", marginBottom: "4px" }}>
            0 3
          </p>
          <h3 className="font-script" style={{ fontSize: "38px", color: "#3d2b1a", marginBottom: "2px" }}>Дресс-код</h3>
          <div className="gold-line w-20 mb-4" />
          <div className="w-full p-5 rounded-xl" style={{ background: "rgba(250,245,235,0.8)", border: "1px solid rgba(201,168,76,0.25)" }}>
            <p className="font-serif-elegant italic" style={{ fontSize: "16px", color: "#5a3e2b", marginBottom: "10px" }}>
              Для нас самое главное — ваше присутствие!
            </p>
            <div className="gold-line w-16 mx-auto mb-4" />
            <p className="font-serif-elegant italic" style={{ fontSize: "14px", color: "#5a3e2b", lineHeight: 1.8, marginBottom: "14px" }}>
              Но мы будем очень благодарны, если поддержите цветовую гамму нашей свадьбы 🥰
            </p>
            <div className="flex justify-center gap-3 mb-3">
              <div className="dress-swatch" style={{ background: "#d4c5b0" }} />
              <div className="dress-swatch" style={{ background: "#e8a0a8" }} />
              <div className="dress-swatch" style={{ background: "#c4b0d4" }} />
              <div className="dress-swatch" style={{ background: "#a8bfd4" }} />
              <div className="dress-swatch" style={{ background: "#9db89e" }} />
              <div className="dress-swatch" style={{ background: "#d8e490" }} />
            </div>
            <p className="font-serif-elegant uppercase" style={{ fontSize: "9px", letterSpacing: "3px", color: "#8a7560" }}>
              Пастельные тона · Коктейльный стиль
            </p>
          </div>
          <div className="mt-5 section-divider">
            <span style={{ color: "#c9a84c", fontSize: "16px" }}>✦</span>
          </div>
        </div>

        {/* SECTION 7: До встречи + финал */}
        <div className="relative z-10 px-8 pb-8 pt-2 flex flex-col items-center text-center">
          <p className="font-serif-elegant italic" style={{ fontSize: "20px", color: "#5a3e2b", marginBottom: "8px" }}>
            До встречи на нашей свадьбе!
          </p>
          <h2 className="font-script" style={{ fontSize: "44px", color: "#3d5a3e", lineHeight: 1.2 }}>
            Александр и Ангелина
          </h2>
          <p className="font-serif-elegant uppercase mt-3" style={{ fontSize: "11px", letterSpacing: "3px", color: "#8a7560" }}>
            24 · Июня · 2026
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="pearl-dot" />
            <div className="pearl-dot" />
            <div className="pearl-dot" />
          </div>
        </div>

        {/* Bottom gold border */}
        <div className="relative z-10 pb-5 px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="pearl-dot" />
            <div className="pearl-dot" />
            <div className="pearl-dot" />
          </div>
          <div className="gold-line w-full" />
        </div>
      </div>

      {/* Кнопка скачать — инструкция */}
      <div className="mt-6 text-center max-w-sm">
        <p className="font-serif-elegant italic text-[#8a7560] text-sm">
          Чтобы сохранить как картинку — нажмите правой кнопкой → «Сохранить как изображение» или сделайте скриншот
        </p>
      </div>
    </div>
  );
}
