"use client";

import { useEffect } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import WebRequestForm from "@/components/WebRequestForm";

const WEB_CSS = "\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');\n\n.oriavision-web-exact {\n  min-height: 100vh;\n  background: #fff;\n}\n\n\n    /* â”€â”€ RESET â”€â”€ */\n    .oriavision-web-exact, .oriavision-web-exact *, .oriavision-web-exact *::before, .oriavision-web-exact *::after { box-sizing: border-box; }\n    .oriavision-web-exact * { margin: 0; padding: 0; }\n    html { scroll-behavior: smooth; }\n\n    :root {\n      --navy:     #0A1F6E;\n      --royal:    #1456C8;\n      --bright:   #0091D5;\n      --cyan:     #1EC8F0;\n      --bg:       #FFFFFF;\n      --off:      #F2F8FF;\n      --text:     #0A1F6E;\n      --muted:    #5A6E8C;\n      --line:     #DCE8F6;\n      --white:    #FFFFFF;\n      --grad:     linear-gradient(120deg, #0A1F6E 0%, #1456C8 52%, #1EC8F0 100%);\n      --grad-h:   linear-gradient(120deg, #1456C8 0%, #0091D5 60%, #1EC8F0 100%);\n    }\n\n    .oriavision-web-exact {\n      font-family: 'Inter', system-ui, sans-serif;\n      color: var(--text);\n      background: var(--bg);\n      overflow-x: hidden;\n      -webkit-font-smoothing: antialiased;\n    }\n\n    .oriavision-web-exact a { color: inherit; text-decoration: none; }\n    .oriavision-web-exact img { max-width: 100%; display: block; }\n\n    .wrap {\n      width: min(1160px, calc(100% - 40px));\n      margin-inline: auto;\n    }\n\n    /* â”€â”€ LOADER â”€â”€ */\n    #loader {\n      position: fixed;\n      inset: 0;\n      background: var(--white);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 9999;\n      transition: opacity .55s ease, visibility .55s;\n    }\n\n    #loader.out { opacity: 0; visibility: hidden; }\n\n    .loader-inner { text-align: center; }\n\n    .loader-logo {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 30px;\n      font-weight: 800;\n      letter-spacing: -.03em;\n      text-transform: uppercase;\n      background: var(--grad);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      animation: logoPulse .9s ease-in-out infinite alternate;\n    }\n\n    .loader-track {\n      margin: 24px auto 0;\n      width: 180px;\n      height: 2px;\n      background: var(--line);\n      border-radius: 2px;\n      overflow: hidden;\n    }\n\n    .loader-fill {\n      height: 100%;\n      background: var(--grad);\n      border-radius: 2px;\n      animation: loaderFill .85s cubic-bezier(.4,0,.2,1) forwards;\n    }\n\n    @keyframes logoPulse {\n      from { opacity: .3; }\n      to   { opacity: 1; }\n    }\n\n    @keyframes loaderFill {\n      from { width: 0%; }\n      to   { width: 100%; }\n    }\n\n    /* â”€â”€ SCROLL PROGRESS â”€â”€ */\n    #progress {\n      position: fixed;\n      top: 0; left: 0;\n      height: 3px;\n      width: 0%;\n      background: var(--grad);\n      z-index: 200;\n      transition: width .1s linear;\n    }\n\n    /* â”€â”€ NAV â”€â”€ */\n    .nav-wrap {\n      position: sticky;\n      top: 0;\n      z-index: 100;\n      background: rgba(255,255,255,.96);\n      backdrop-filter: blur(20px);\n      -webkit-backdrop-filter: blur(20px);\n      border-bottom: 1px solid var(--line);\n      transition: box-shadow .3s;\n    }\n\n    .nav-wrap.scrolled { box-shadow: 0 4px 24px rgba(10,31,110,.07); }\n\n    .nav {\n      height: 66px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n    }\n\n    .nav-logo {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-weight: 800;\n      font-size: 19px;\n      letter-spacing: .03em;\n      text-transform: uppercase;\n      background: var(--grad);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .nav-links { display: flex; gap: 2px; }\n\n    .nav-links a {\n      font-family: 'Inter', sans-serif;\n      font-size: 14px;\n      font-weight: 600;\n      color: var(--muted);\n      padding: 8px 14px;\n      border-radius: 7px;\n      transition: color .18s, background .18s;\n    }\n\n    .nav-links a:hover { color: var(--navy); background: var(--off); }\n\n    .nav-btn {\n      display: inline-flex;\n      align-items: center;\n      height: 40px;\n      padding: 0 20px;\n      border-radius: 8px;\n      background: var(--grad);\n      color: #ffffff !important;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 13.5px;\n      font-weight: 800;\n      letter-spacing: .02em;\n      text-transform: uppercase;\n      transition: opacity .18s, transform .18s, box-shadow .18s;\n    }\n\n    .nav-btn:hover { opacity: .90; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(20,86,200,.30); }\n\n    .nav-ham {\n      display: none;\n      flex-direction: column;\n      gap: 5px;\n      width: 40px; height: 40px;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n      border-radius: 8px;\n      background: var(--off);\n      border: 1px solid var(--line);\n    }\n\n    .nav-ham span {\n      display: block;\n      width: 17px; height: 1.5px;\n      background: var(--navy);\n      border-radius: 2px;\n      transition: transform .3s, opacity .3s;\n    }\n\n    /* â”€â”€ REVEAL SYSTEM â”€â”€ */\n    .rv {\n      opacity: 0;\n      transform: translateY(32px);\n      transition: opacity .72s cubic-bezier(.25,.46,.45,.94),\n                  transform .72s cubic-bezier(.25,.46,.45,.94);\n    }\n\n    .rv.rl { transform: translateX(-36px); }\n    .rv.rr { transform: translateX(36px); }\n    .rv.rs { transform: scale(.95) translateY(14px); }\n\n    .rv.in { opacity: 1; transform: none !important; }\n\n    .d1 { transition-delay: .08s !important; }\n    .d2 { transition-delay: .16s !important; }\n    .d3 { transition-delay: .24s !important; }\n    .d4 { transition-delay: .32s !important; }\n    .d5 { transition-delay: .40s !important; }\n    .d6 { transition-delay: .48s !important; }\n\n    /* â”€â”€ WIPE REVEAL â”€â”€ */\n    .wipe { position: relative; overflow: hidden; }\n\n    .wipe::after {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: var(--bright);\n      transform: translateX(0%);\n      transition: transform .9s cubic-bezier(.77,0,.175,1);\n      z-index: 2;\n    }\n\n    .wipe img {\n      transform: scale(1.07);\n      transition: transform .9s cubic-bezier(.25,.46,.45,.94) .1s;\n    }\n\n    .wipe.in::after { transform: translateX(101%); }\n    .wipe.in img    { transform: scale(1); }\n\n    /* â”€â”€ HERO â”€â”€ */\n    .hero {\n      position: relative;\n      padding: clamp(72px, 8vw, 112px) 0 clamp(72px, 8vw, 104px);\n      background: var(--white);\n      overflow: hidden;\n      isolation: isolate;\n    }\n\n    /* Imagen integrada al encabezado sobre fondo blanco */\n    .hero::before {\n      content: '';\n      position: absolute;\n      top: clamp(44px, 6vw, 76px);\n      right: max(20px, calc((100vw - 1160px) / 2));\n      bottom: clamp(38px, 5vw, 70px);\n      width: min(54vw, 660px);\n      border-radius: 34px;\n      background-image: url('/web-visuals/hero-web-responsive-clean.png');\n      background-size: cover;\n      background-position: center center;\n      box-shadow: 0 34px 90px rgba(10,31,110,.16);\n      z-index: 0;\n    }\n\n    /* Fundido blanco: une texto e imagen sin que parezcan dos bloques separados */\n    .hero::after {\n      content: '';\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      width: 72%;\n      background:\n        linear-gradient(90deg, #fff 0%, rgba(255,255,255,.98) 28%, rgba(255,255,255,.78) 48%, rgba(255,255,255,.18) 72%, rgba(255,255,255,0) 100%);\n      pointer-events: none;\n      z-index: 1;\n    }\n\n    .hero-eye-deco {\n      position: absolute;\n      top: 50%;\n      right: -5%;\n      transform: translateY(-50%);\n      width: 680px; height: 340px;\n      border-radius: 50%;\n      border: 1px solid rgba(20,86,200,.055);\n      pointer-events: none;\n      z-index: 0;\n    }\n\n    .hero-eye-deco::before {\n      content: '';\n      position: absolute;\n      top: 50%; left: 50%;\n      transform: translate(-50%, -50%);\n      width: 460px; height: 230px;\n      border-radius: 50%;\n      border: 1px solid rgba(20,86,200,.04);\n    }\n\n    .hero-eye-deco::after {\n      content: '';\n      position: absolute;\n      top: 50%; left: 50%;\n      transform: translate(-50%, -50%);\n      width: 240px; height: 120px;\n      border-radius: 50%;\n      border: 1px solid rgba(20,86,200,.04);\n    }\n\n    .hero-glow {\n      position: absolute;\n      width: 640px; height: 640px;\n      top: 50%; right: -120px;\n      transform: translateY(-50%);\n      background: radial-gradient(circle, rgba(30,200,240,.10) 0%, rgba(20,86,200,.05) 40%, transparent 70%);\n      pointer-events: none;\n      z-index: 0;\n      border-radius: 50%;\n    }\n\n    .hero-inner {\n      position: relative;\n      z-index: 2;\n      display: grid;\n      grid-template-columns: minmax(0, 620px);\n      gap: 0;\n      align-items: center;\n      min-height: 560px;\n    }\n\n    .hero-copy {\n      max-width: 620px;\n      padding: 0;\n      background: transparent;\n      border: 0;\n      box-shadow: none;\n    }\n\n    .hero-label {\n      display: inline-flex;\n      align-items: center;\n      gap: 10px;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: .14em;\n      text-transform: uppercase;\n      color: var(--bright);\n      margin-bottom: 28px;\n      opacity: 0;\n      animation: fadeUp .7s .5s cubic-bezier(.25,.46,.45,.94) forwards;\n    }\n\n    .hero-label::before {\n      content: '';\n      width: 22px; height: 2px;\n      background: var(--grad-h);\n      border-radius: 2px;\n    }\n\n    .hero-h1 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: clamp(44px, 5.6vw, 80px);\n      font-weight: 800;\n      line-height: .94;\n      letter-spacing: -.03em;\n      color: var(--navy);\n      margin-bottom: 26px;\n      overflow: hidden;\n    }\n\n    .h1-line { display: block; overflow: hidden; }\n\n    .h1-inner {\n      display: block;\n      transform: translateY(110%);\n      animation: slideUp .88s cubic-bezier(.25,.46,.45,.94) forwards;\n    }\n\n    .h1-line:nth-child(1) .h1-inner { animation-delay: .58s; }\n    .h1-line:nth-child(2) .h1-inner { animation-delay: .70s; }\n    .h1-line:nth-child(3) .h1-inner { animation-delay: .82s; }\n\n    .hero-h1 mark {\n      background: var(--grad);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      background-size: 200% auto;\n      animation: gradShift 4s linear infinite;\n    }\n\n    @keyframes gradShift {\n      0%   { background-position: 0% center; }\n      50%  { background-position: 100% center; }\n      100% { background-position: 0% center; }\n    }\n\n    .hero-p {\n      font-size: 17px;\n      color: var(--muted);\n      line-height: 1.70;\n      max-width: 460px;\n      margin-bottom: 42px;\n      font-weight: 500;\n      opacity: 0;\n      animation: fadeUp .7s 1.0s cubic-bezier(.25,.46,.45,.94) forwards;\n    }\n\n    .hero-actions {\n      display: flex;\n      gap: 12px;\n      flex-wrap: wrap;\n      opacity: 0;\n      animation: fadeUp .7s 1.12s cubic-bezier(.25,.46,.45,.94) forwards;\n    }\n\n    /* â”€â”€ BUTTONS â”€â”€ */\n    .btn-blue {\n      display: inline-flex;\n      align-items: center;\n      gap: 9px;\n      height: 52px;\n      padding: 0 26px;\n      border-radius: 10px;\n      background: var(--grad);\n      color: #ffffff !important;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 14.5px;\n      font-weight: 700;\n      letter-spacing: .02em;\n      text-transform: uppercase;\n      box-shadow: 0 8px 24px rgba(20,86,200,.28);\n      transition: transform .22s, box-shadow .22s, opacity .22s;\n      white-space: nowrap;\n      position: relative;\n      overflow: hidden;\n    }\n\n    .btn-blue::after {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: rgba(255,255,255,.12);\n      opacity: 0;\n      transition: opacity .2s;\n    }\n\n    .btn-blue:hover::after { opacity: 1; }\n    .btn-blue svg {\n      color: #ffffff !important;\n      opacity: 1;\n      flex-shrink: 0;\n    }\n\n    .btn-blue:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(20,86,200,.36); }\n\n    .btn-outline {\n      display: inline-flex;\n      align-items: center;\n      height: 52px;\n      padding: 0 24px;\n      border-radius: 10px;\n      background: transparent;\n      border: 1.5px solid var(--line);\n      color: var(--navy);\n      font-family: 'Inter', sans-serif;\n      font-size: 14px;\n      font-weight: 700;\n      transition: border-color .2s, background .2s, transform .2s;\n      white-space: nowrap;\n    }\n\n    .btn-outline:hover {\n      border-color: var(--bright);\n      background: var(--off);\n      transform: translateY(-1px);\n    }\n\n    /* â”€â”€ HERO VISUAL â”€â”€ */\n    .hero-visual {\n      display: none;\n    }\n\n    .mockups-stack { position: relative; height: auto; }\n\n    .mockup {\n      position: relative;\n      border-radius: 22px;\n      overflow: hidden;\n      border: 1px solid var(--line);\n      background: #fff;\n      box-shadow: 0 24px 60px rgba(10,31,110,.14);\n    }\n\n    .mockup-2 { display: none; }\n\n    .mockup-chrome { display: none; }\n\n    .mockup-screen {\n      height: 280px;\n      overflow: hidden;\n    }\n\n    .mockup-screen img {\n      width: 100%; height: 100%;\n      object-fit: cover;\n      object-position: center;\n      transition: transform .5s ease;\n    }\n\n    .mockup:hover .mockup-screen img { transform: scale(1.03); }\n\n    /* â”€â”€ TICKER â”€â”€ */\n    .ticker-wrap {\n      background: var(--cyan);\n      overflow: hidden;\n      padding: 13px 0;\n    }\n\n    .ticker-track {\n      display: flex;\n      animation: tickerScroll 24s linear infinite;\n      white-space: nowrap;\n    }\n\n    .ticker-item {\n      display: inline-flex;\n      align-items: center;\n      gap: 28px;\n      padding: 0 18px;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 11.5px;\n      font-weight: 800;\n      letter-spacing: .12em;\n      text-transform: uppercase;\n      color: var(--navy);\n    }\n\n    .ticker-item .t-sep {\n      display: inline-block;\n      width: 20px; height: 1.5px;\n      background: var(--navy);\n      opacity: .25;\n    }\n\n    @keyframes tickerScroll {\n      from { transform: translateX(0); }\n      to   { transform: translateX(-50%); }\n    }\n\n    /* â”€â”€ STATS â”€â”€ */\n    .stats-band {\n      background: var(--navy);\n      padding: 64px 0 68px;\n    }\n\n    .stats-row {\n      display: flex;\n      justify-content: space-around;\n      align-items: center;\n      flex-wrap: wrap;\n      gap: 32px;\n    }\n\n    .stat-divider {\n      width: 1px;\n      height: 64px;\n      background: rgba(255,255,255,.10);\n    }\n\n    .stat-item { text-align: center; }\n\n    .stat-num {\n      display: block;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: clamp(42px, 5vw, 68px);\n      font-weight: 800;\n      color: #ffffff !important;\n      letter-spacing: -.04em;\n      line-height: 1;\n    }\n\n    .stat-num .accent {\n      background: var(--grad-h);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .stat-item small {\n      display: block;\n      font-size: 12.5px;\n      color: rgba(255,255,255,.40);\n      font-weight: 600;\n      margin-top: 8px;\n      letter-spacing: .04em;\n      text-transform: uppercase;\n    }\n\n    /* â”€â”€ SECTION HELPERS â”€â”€ */\n    .section { padding: 100px 0; }\n    .section-off { background: var(--off); }\n\n    .eyebrow {\n      display: inline-flex;\n      align-items: center;\n      gap: 9px;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: .14em;\n      text-transform: uppercase;\n      color: var(--bright);\n      margin-bottom: 14px;\n    }\n\n    .eyebrow::before {\n      content: '';\n      width: 18px; height: 2px;\n      background: var(--grad-h);\n      border-radius: 2px;\n    }\n\n    .eyebrow-light { color: #ffffff !important; opacity: .75; }\n    .eyebrow-light::before { background: rgba(255,255,255,.4); }\n\n    .sec-h2 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: clamp(36px, 5vw, 64px);\n      font-weight: 800;\n      line-height: .94;\n      letter-spacing: -.03em;\n      color: var(--navy);\n    }\n\n    .sec-h2-white { color: #ffffff !important; }\n\n    .portfolio-mobile-space { display: none; }\n\n    .sec-p {\n      font-size: 16.5px;\n      color: var(--muted);\n      line-height: 1.70;\n      max-width: 480px;\n      margin-top: 16px;\n      font-weight: 500;\n    }\n\n    .sec-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-end;\n      gap: 24px;\n      margin-bottom: 56px;\n      flex-wrap: wrap;\n    }\n\n    /* â”€â”€ PORTFOLIO â”€â”€ */\n    .port-featured {\n      position: relative;\n      overflow: hidden;\n      border-radius: 22px;\n      height: 420px;\n      margin-bottom: 14px;\n      border: 1px solid var(--line);\n    }\n\n\n\n    .port-featured img {\n      width: 100%; height: 100%;\n      object-fit: cover; object-position: top center;\n      transition: transform .8s ease;\n    }\n\n    .port-featured img[alt='Ercas'] {\n      object-fit: contain;\n      object-position: center center;\n      background: #111b9f;\n      padding: 12px;\n    }\n\n\n\n    .port-featured:hover img { transform: scale(1.04); }\n\n    .port-overlay {\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(to top, rgba(10,31,110,.88) 0%, rgba(10,31,110,.25) 50%, transparent 100%);\n      z-index: 1;\n    }\n\n    .port-featured-info {\n      position: absolute;\n      bottom: 32px; left: 32px;\n      z-index: 2;\n    }\n\n    .port-tag {\n      display: inline-flex;\n      align-items: center;\n      height: 24px;\n      padding: 0 11px;\n      background: var(--cyan);\n      color: var(--navy);\n      border-radius: 4px;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 10.5px;\n      font-weight: 800;\n      letter-spacing: .10em;\n      text-transform: uppercase;\n      margin-bottom: 10px;\n    }\n\n    .port-featured-info h3 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 28px;\n      font-weight: 800;\n      color: #ffffff !important;\n      letter-spacing: -.02em;\n      margin-bottom: 6px;\n    }\n\n    .port-featured-info p { font-size: 14px; color: rgba(255,255,255,.65); max-width: 380px; }\n\n    .port-grid-4 {\n      display: grid;\n      grid-template-columns: repeat(5, 1fr);\n      gap: 12px;\n    }\n\n    .port-card {\n      position: relative;\n      border-radius: 16px;\n      overflow: hidden;\n      height: 218px;\n      border: 1px solid var(--line);\n      cursor: pointer;\n    }\n\n    .port-card img {\n      width: 100%; height: 100%;\n      object-fit: cover;\n      object-position: center center;\n      transition: none;\n    }\n\n    /* Desktop portfolio: los assets ya tienen la proporción exacta de la card.\n       No escalar ni forzar recortes sobre las miniaturas. */\n    @media (min-width: 769px) {\n      .oriavision-web-exact #portfolio .port-card picture {\n        display: block;\n        width: 100%;\n        height: 100%;\n      }\n\n      .oriavision-web-exact #portfolio .port-card img {\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n        object-position: center center;\n        transform: none !important;\n        padding: 0;\n      }\n\n      .oriavision-web-exact #portfolio .port-card:hover img {\n        transform: none !important;\n      }\n    }\n\n    .port-card-info {\n      position: absolute;\n      bottom: 14px; left: 14px;\n      z-index: 2;\n    }\n\n    .port-card-info h3 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 15px;\n      font-weight: 700;\n      color: #ffffff !important;\n      letter-spacing: -.01em;\n    }\n\n    /* â”€â”€ SERVICES â”€â”€ */\n    .svc-rows { margin-top: 60px; }\n\n    .svc-row {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 64px;\n      align-items: center;\n      padding: 60px 0;\n      border-top: 1px solid var(--line);\n      position: relative;\n    }\n\n    .svc-row.rev { direction: rtl; }\n    .svc-row.rev > * { direction: ltr; }\n\n    /* Ghost number decorative */\n    .svc-ghost-num {\n      position: absolute;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: clamp(130px, 15vw, 210px);\n      font-weight: 900;\n      letter-spacing: -.06em;\n      color: rgba(20,86,200,.035);\n      top: 50%;\n      transform: translateY(-50%);\n      right: 0;\n      pointer-events: none;\n      user-select: none;\n      line-height: 1;\n    }\n\n    .svc-num-label {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: .14em;\n      text-transform: uppercase;\n      color: var(--bright);\n      margin-bottom: 14px;\n    }\n\n    .svc-text h3 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: clamp(24px, 2.8vw, 38px);\n      font-weight: 800;\n      color: var(--navy);\n      letter-spacing: -.03em;\n      line-height: 1.06;\n      margin-bottom: 14px;\n    }\n\n    .svc-text p {\n      font-size: 15.5px;\n      color: var(--muted);\n      line-height: 1.70;\n      margin-bottom: 22px;\n      font-weight: 500;\n    }\n\n    .svc-list {\n      list-style: none;\n      display: flex;\n      flex-direction: column;\n      gap: 7px;\n      margin-bottom: 24px;\n    }\n\n    .svc-list li {\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n      font-size: 12px;\n      color: var(--muted);\n      font-weight: 500;\n    }\n\n    .svc-list li::before {\n      content: '→';\n      color: var(--bright);\n      flex-shrink: 0;\n      margin-top: 1px;\n      font-weight: 700;\n    }\n\n    .svc-link {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 13.5px;\n      font-weight: 700;\n      letter-spacing: .04em;\n      text-transform: uppercase;\n      background: var(--grad-h);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      border-bottom: 1.5px solid rgba(0,145,213,.25);\n      padding-bottom: 3px;\n      transition: border-color .2s, gap .2s;\n    }\n\n    .svc-link:hover { border-color: var(--bright); gap: 12px; }\n\n    .svc-img-wrap {\n      border-radius: 20px;\n      overflow: hidden;\n      height: 360px;\n      border: 1px solid var(--line);\n    }\n\n    .svc-img-wrap img {\n      width: 100%; height: 100%;\n      object-fit: cover;\n      transition: transform .7s ease;\n    }\n\n    .svc-img-wrap:hover img { transform: scale(1.04); }\n\n    /* â”€â”€ WHY US â”€â”€ */\n    .why-inner {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 80px;\n      align-items: center;\n    }\n\n    .why-img {\n      border-radius: 22px;\n      overflow: hidden;\n      aspect-ratio: 4/5;\n      max-height: 520px;\n      border: 1px solid var(--line);\n    }\n\n    .why-img img {\n      width: 100%; height: 100%;\n      object-fit: cover;\n      object-position: center;\n      transition: transform .7s ease;\n    }\n\n    .why-img:hover img { transform: scale(1.04); }\n\n    .why-points { margin-top: 38px; display: flex; flex-direction: column; gap: 26px; }\n\n    .why-point {\n      display: grid;\n      grid-template-columns: 44px 1fr;\n      gap: 14px;\n      align-items: flex-start;\n    }\n\n    .why-num {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 13px;\n      font-weight: 800;\n      background: var(--grad-h);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      padding-top: 2px;\n      letter-spacing: .04em;\n    }\n\n    .why-point h4 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 16px;\n      font-weight: 700;\n      color: var(--navy);\n      letter-spacing: -.02em;\n      margin-bottom: 5px;\n    }\n\n    .why-point p { font-size: 14px; color: var(--muted); line-height: 1.65; font-weight: 500; }\n\n    /* â”€â”€ TRUST STRIP â”€â”€ */\n    .trust-strip {\n      background: var(--grad);\n      padding: 52px 0;\n      position: relative;\n      overflow: hidden;\n    }\n\n    .trust-strip::before {\n      content: '';\n      position: absolute;\n      top: -80px; right: -120px;\n      width: 400px; height: 400px;\n      border-radius: 50%;\n      background: rgba(30,200,240,.12);\n      pointer-events: none;\n    }\n\n    .trust-row {\n      position: relative;\n      z-index: 1;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      flex-wrap: wrap;\n      gap: 28px;\n    }\n\n    .trust-item {\n      display: flex;\n      align-items: center;\n      gap: 14px;\n    }\n\n    .trust-icon {\n      width: 46px; height: 46px;\n      border-radius: 12px;\n      background: rgba(255,255,255,.14);\n      border: 1px solid rgba(255,255,255,.18);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n      font-size: 20px;\n    }\n\n    .trust-text strong {\n      display: block;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 15px;\n      font-weight: 700;\n      color: #ffffff !important;\n      letter-spacing: -.01em;\n    }\n\n    .trust-text span {\n      font-size: 12.5px;\n      color: rgba(255,255,255,.60);\n      font-weight: 500;\n      margin-top: 2px;\n      display: block;\n    }\n\n    .trust-divider {\n      width: 1px;\n      height: 40px;\n      background: rgba(255,255,255,.15);\n    }\n\n    /* â”€â”€ GALLERY â”€â”€ */\n    .img-gallery {\n      display: grid;\n      grid-template-columns: 1.35fr 1fr 1fr;\n      grid-template-rows: 240px 240px;\n      gap: 10px;\n      margin-top: 56px;\n    }\n\n    .gallery-item {\n      position: relative;\n      overflow: hidden;\n      border-radius: 14px;\n      border: 1px solid var(--line);\n    }\n\n    .gallery-item.tall { grid-row: span 2; }\n\n    .gallery-item img {\n      width: 100%; height: 100%;\n      object-fit: cover;\n      transition: transform .75s ease;\n    }\n\n    .gallery-item:hover img { transform: scale(1.07); }\n\n    .gallery-caption {\n      position: absolute;\n      bottom: 0; left: 0; right: 0;\n      padding: 24px 14px 12px;\n      background: linear-gradient(transparent, rgba(10,31,110,.65));\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 11px;\n      font-weight: 700;\n      color: rgba(255,255,255,.7);\n      letter-spacing: .08em;\n      text-transform: uppercase;\n      opacity: 0;\n      transition: opacity .3s;\n    }\n\n    .gallery-item:hover .gallery-caption { opacity: 1; }\n\n    /* â”€â”€ SERVICE CARDS (3-col) â”€â”€ */\n    .svc-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 20px;\n      margin-top: 52px;\n    }\n\n    .svc-card {\n      background: var(--bg);\n      border: 1px solid var(--line);\n      border-radius: 20px;\n      padding: 0 28px 28px;\n      position: relative;\n      overflow: hidden;\n      display: flex;\n      flex-direction: column;\n      transition: transform .32s cubic-bezier(.25,.46,.45,.94), box-shadow .32s, border-color .25s;\n    }\n\n    .svc-card-img {\n      width: calc(100% + 56px);\n      margin: 0 -28px 20px;\n      height: 190px;\n      object-fit: cover;\n      object-position: center;\n      flex-shrink: 0;\n      border-radius: 19px 19px 0 0;\n      transition: transform .4s ease;\n    }\n\n    .svc-card:hover .svc-card-img { transform: scale(1.04); }\n\n    .svc-card:hover {\n      transform: translateY(-6px);\n      box-shadow: 0 24px 56px rgba(10,31,110,.11);\n      border-color: rgba(20,86,200,.28);\n    }\n\n    .svc-card-bar {\n      width: calc(100% + 56px);\n      margin: 0 -28px 0 -28px;\n      padding: 24px 28px;\n      height: auto;\n      background: var(--grad);\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 18px;\n      font-weight: 700;\n      letter-spacing: .08em;\n      text-transform: uppercase;\n      color: #ffffff !important;\n      display: flex;\n      align-items: center;\n      margin-bottom: 20px;\n      transition: padding .3s ease;\n    }\n\n    .svc-card:hover .svc-card-bar { padding: 28px 28px; }\n\n    .svc-card.card-1 .svc-card-bar { background: #2C3E50; }\n    .svc-card.card-2 .svc-card-bar { background: #E74C3C; }\n    .svc-card.card-3 .svc-card-bar { background: #1ABC9C; }\n\n    .svc-card-ghost {\n      display: none;\n    }\n\n    .svc-card-label {\n      display: none;\n    }\n\n    .svc-card h3 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 14px;\n      font-weight: 800;\n      color: var(--navy);\n      letter-spacing: -.02em;\n      line-height: 1.2;\n      margin-bottom: 9px;\n    }\n\n    .svc-card > p {\n      font-size: 12px;\n      color: var(--muted);\n      line-height: 1.58;\n      margin-bottom: 16px;\n      font-weight: 500;\n    }\n\n    .svc-card .svc-list { flex: 1; margin-bottom: 28px; }\n\n    .svc-card-cta {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: .04em;\n      text-transform: uppercase;\n      background: var(--grad-h);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      border-bottom: 1.5px solid rgba(0,145,213,.25);\n      padding-bottom: 3px;\n      transition: border-color .2s, gap .2s;\n      margin-top: auto;\n    }\n\n    .svc-card-cta:hover { border-color: var(--bright); gap: 12px; }\n\n    /* â”€â”€ PROCESS â”€â”€ */\n    .process-grid {\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: 18px;\n      margin-top: 60px;\n    }\n\n    .proc {\n      position: relative;\n      border-radius: 20px;\n      overflow: hidden;\n      height: 340px;\n      border: 1px solid var(--line);\n    }\n\n    .proc-img {\n      position: absolute;\n      inset: 0;\n    }\n\n    .proc-img img {\n      width: 100%; height: 100%;\n      object-fit: cover;\n      transition: transform .7s ease;\n    }\n\n    .proc:hover .proc-img img { transform: scale(1.08); }\n\n    .proc::after {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(to top, rgba(10,31,110,.94) 0%, rgba(10,31,110,.55) 50%, rgba(10,31,110,.10) 100%);\n      z-index: 1;\n    }\n\n    .proc-body {\n      position: absolute;\n      bottom: 0; left: 0; right: 0;\n      padding: 22px 20px 24px;\n      z-index: 2;\n    }\n\n    .proc-step {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 13px;\n      font-weight: 800;\n      letter-spacing: .14em;\n      text-transform: uppercase;\n      color: var(--cyan);\n      margin-bottom: 8px;\n    }\n\n    .proc-body h3 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 17px;\n      font-weight: 700;\n      letter-spacing: -.02em;\n      color: #ffffff !important;\n      margin-bottom: 6px;\n    }\n\n    .proc-body p { font-size: 13px; color: rgba(255,255,255,.62); line-height: 1.60; font-weight: 400; }\n\n    /* â”€â”€ BIG QUOTE â”€â”€ */\n    .bigquote {\n      background: var(--navy);\n      padding: 100px 0;\n      position: relative;\n      overflow: hidden;\n    }\n\n    .bigquote::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(135deg, rgba(20,86,200,.45) 0%, transparent 60%),\n                  linear-gradient(315deg, rgba(30,200,240,.12) 0%, transparent 50%);\n      pointer-events: none;\n    }\n\n    .bigquote-inner {\n      max-width: 880px;\n      margin: 0 auto;\n      text-align: center;\n      position: relative;\n      z-index: 1;\n    }\n\n    .bq-mark {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 96px;\n      background: var(--grad-h);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      line-height: .75;\n      margin-bottom: 28px;\n      opacity: .65;\n    }\n\n    .bq-text {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: clamp(21px, 3vw, 34px);\n      font-weight: 600;\n      color: #ffffff !important;\n      line-height: 1.32;\n      letter-spacing: -.02em;\n      margin-bottom: 48px;\n    }\n\n    .bq-author { display: flex; align-items: center; gap: 14px; justify-content: center; }\n\n    .bq-avatar {\n      width: 50px; height: 50px;\n      border-radius: 50%;\n      overflow: hidden;\n      border: 2px solid rgba(255,255,255,.15);\n      flex-shrink: 0;\n    }\n\n    .bq-avatar img { width: 100%; height: 100%; object-fit: cover; }\n\n    .bq-name strong { display: block; color: #ffffff !important; font-size: 15px; font-weight: 700; }\n    .bq-name span { color: rgba(255,255,255,.42); font-size: 13px; }\n\n    /* â”€â”€ TESTIMONIALS â”€â”€ */\n    .testi-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 18px;\n      margin-top: 56px;\n    }\n\n    .testi {\n      border-radius: 20px;\n      background: var(--bg);\n      border: 1px solid var(--line);\n      padding: 28px;\n      box-shadow: 0 4px 20px rgba(10,31,110,.04);\n      transition: transform .35s cubic-bezier(.25,.46,.45,.94), box-shadow .35s, border-color .25s;\n    }\n\n    .testi:hover {\n      transform: translateY(-5px);\n      box-shadow: 0 20px 52px rgba(10,31,110,.10);\n      border-color: rgba(20,86,200,.20);\n    }\n\n    .testi-stars {\n      font-size: 14px;\n      letter-spacing: 2px;\n      margin-bottom: 16px;\n      background: var(--grad-h);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .testi-text { font-size: 14.5px; color: var(--text); line-height: 1.72; font-weight: 500; margin-bottom: 24px; }\n\n    .testi-author { display: flex; align-items: center; gap: 12px; }\n\n    .testi-ava {\n      width: 42px; height: 42px;\n      border-radius: 50%;\n      overflow: hidden;\n      background: var(--off);\n      flex-shrink: 0;\n    }\n\n    .testi-ava img { width: 100%; height: 100%; object-fit: cover; }\n\n    .testi-name { font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 700; color: var(--navy); letter-spacing: -.01em; }\n    .testi-role { font-size: 12px; color: var(--muted); margin-top: 2px; }\n\n    /* â”€â”€ FAQ â”€â”€ */\n    .faq-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 9px;\n      margin-top: 56px;\n    }\n\n    .faq-item {\n      border-radius: 14px;\n      background: var(--bg);\n      border: 1px solid var(--line);\n      overflow: hidden;\n      transition: border-color .25s, box-shadow .25s;\n    }\n\n    .faq-item:hover { border-color: rgba(20,86,200,.22); }\n\n    .faq-item.open {\n      border-color: rgba(20,86,200,.32);\n      box-shadow: 0 4px 20px rgba(20,86,200,.07);\n    }\n\n    .faq-btn {\n      width: 100%;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 20px 22px;\n      background: none;\n      border: none;\n      cursor: pointer;\n      text-align: left;\n      gap: 14px;\n    }\n\n    .faq-btn span {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 14.5px;\n      font-weight: 700;\n      color: var(--navy);\n      letter-spacing: -.01em;\n    }\n\n    .faq-ico {\n      width: 26px; height: 26px;\n      border-radius: 50%;\n      background: var(--off);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n      color: var(--bright);\n      font-size: 20px;\n      line-height: 1;\n      transition: transform .3s cubic-bezier(.34,1.56,.64,1), background .25s;\n    }\n\n    .faq-item.open .faq-ico {\n      background: rgba(20,86,200,.10);\n      transform: rotate(45deg);\n    }\n\n    .faq-ans {\n      max-height: 0;\n      overflow: hidden;\n      transition: max-height .4s cubic-bezier(.25,.46,.45,.94), padding .3s;\n      font-size: 14px;\n      color: var(--muted);\n      line-height: 1.70;\n      padding: 0 22px;\n      font-weight: 500;\n    }\n\n    .faq-item.open .faq-ans { max-height: 200px; padding: 0 22px 20px; }\n\n    /* â”€â”€ FINAL CTA â”€â”€ */\n    .final-cta {\n      position: relative;\n      background: linear-gradient(120deg, #0A1F6E 0%, #1456C8 62%, #1EC8F0 100%);\n      overflow: hidden;\n      isolation: isolate;\n    }\n\n    .cta-img-wrap {\n      position: relative;\n      min-height: 520px;\n      background: linear-gradient(120deg, #0A1F6E 0%, #1456C8 62%, #1EC8F0 100%);\n    }\n\n    .cta-img-wrap::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background:\n        radial-gradient(circle at 18% 20%, rgba(255,255,255,.08) 0%, rgba(255,255,255,0) 28%),\n        radial-gradient(circle at 82% 18%, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 24%),\n        linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px),\n        linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px);\n      background-size: auto, auto, 38px 38px, 38px 38px;\n      background-position: center;\n      opacity: .38;\n      z-index: 0;\n    }\n\n    .cta-img-wrap img {\n      display: none;\n    }\n\n    .cta-overlay {\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(120deg, rgba(10,31,110,.08) 0%, rgba(20,86,200,.10) 55%, rgba(30,200,240,.06) 100%);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 1;\n    }\n\n    .cta-content {\n      text-align: center;\n      padding: 0 24px;\n      max-width: 720px;\n    }\n\n    .cta-content .eyebrow { color: var(--cyan); }\n    .cta-content .eyebrow::before { background: var(--cyan); opacity: .6; }\n\n    .cta-content h2 {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: clamp(32px, 4.5vw, 60px);\n      font-weight: 800;\n      color: #ffffff !important;\n      letter-spacing: -.03em;\n      line-height: .96;\n      margin-bottom: 20px;\n    }\n\n    .cta-content p {\n      font-size: 16px;\n      color: rgba(255,255,255,.72);\n      max-width: 460px;\n      margin: 0 auto 40px;\n      line-height: 1.68;\n      font-weight: 500;\n    }\n\n    .cta-btns { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }\n\n    .btn-wsp {\n      display: inline-flex;\n      align-items: center;\n      gap: 10px;\n      height: 56px;\n      padding: 0 28px;\n      border-radius: 12px;\n      background: #25D366;\n      color: #ffffff !important;\n      font-family: 'Inter', system-ui, sans-serif;\n      font-size: 14px;\n      font-weight: 700;\n      letter-spacing: .04em;\n      text-transform: uppercase;\n      box-shadow: 0 8px 28px rgba(37,211,102,.30);\n      transition: transform .22s, box-shadow .22s;\n      white-space: nowrap;\n      animation: wsppulse 2.5s 3s ease-in-out infinite;\n    }\n\n    .btn-wsp:hover {\n      transform: translateY(-3px);\n      box-shadow: 0 18px 44px rgba(37,211,102,.40);\n      animation: none;\n    }\n\n    @keyframes wsppulse {\n      0%, 100% { box-shadow: 0 8px 28px rgba(37,211,102,.30); }\n      50%       { box-shadow: 0 8px 28px rgba(37,211,102,.30), 0 0 0 8px rgba(37,211,102,.10); }\n    }\n\n    .btn-light {\n      display: inline-flex;\n      align-items: center;\n      height: 56px;\n      padding: 0 26px;\n      border-radius: 12px;\n      background: rgba(255,255,255,.12);\n      border: 1px solid rgba(255,255,255,.22);\n      color: rgba(255,255,255,.85);\n      font-size: 14px;\n      font-weight: 600;\n      transition: background .2s, transform .2s;\n      white-space: nowrap;\n    }\n\n    .btn-light:hover { background: rgba(255,255,255,.22); transform: translateY(-2px); }\n\n    /* â”€â”€ FOOTER â”€â”€ */\n    .footer { padding: 36px 0 44px; border-top: 1px solid var(--line); background: var(--bg); }\n\n    .footer-inner {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      flex-wrap: wrap;\n      gap: 18px;\n    }\n\n    .footer-logo {\n      font-family: 'Inter', system-ui, sans-serif;\n      font-weight: 800;\n      font-size: 17px;\n      letter-spacing: .04em;\n      text-transform: uppercase;\n      background: var(--grad);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .footer-nav { display: flex; gap: 22px; }\n\n    .footer-nav a {\n      font-family: 'Inter', sans-serif;\n      font-size: 14px;\n      font-weight: 600;\n      color: var(--muted);\n      transition: color .18s;\n    }\n\n    .footer-nav a:hover { color: var(--royal); }\n\n    .footer-copy { font-size: 13px; color: var(--muted); }\n\n    /* â”€â”€ KEYFRAMES â”€â”€ */\n    @keyframes fadeUp {\n      from { opacity: 0; transform: translateY(22px); }\n      to   { opacity: 1; transform: translateY(0); }\n    }\n\n    @keyframes slideUp {\n      from { transform: translateY(110%); }\n      to   { transform: translateY(0); }\n    }\n\n    @keyframes slideInRight {\n      from { opacity: 0; transform: translateX(44px); }\n      to   { opacity: 1; transform: translateX(0); }\n    }\n\n    /* â”€â”€ RESPONSIVE â”€â”€ */\n    @media (max-width: 1024px) {\n      .hero::before {\n        width: min(56vw, 590px);\n        right: 20px;\n        background-position: 52% center;\n      }\n      .hero-inner { min-height: 520px; }\n      .hero-eye-deco { display: none; }\n      .port-grid-4 { grid-template-columns: 1fr 1fr; }\n      .svc-grid { grid-template-columns: 1fr; }\n      .process-grid { grid-template-columns: 1fr 1fr; }\n      .why-inner { grid-template-columns: 1fr; }\n      .why-img { aspect-ratio: 16/9; max-height: none; }\n\n      .why-img img {\n        object-position: center top;\n      }\n      .process-grid { grid-template-columns: 1fr 1fr; }\n      .testi-grid { grid-template-columns: 1fr 1fr; }\n      .faq-grid { grid-template-columns: 1fr; }\n\n      .why-img {\n        aspect-ratio: 4/3;\n      }\n      .why-img img {\n        object-position: center top;\n      }\n      .img-gallery { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }\n      .gallery-item.tall { grid-row: span 1; }\n      .stats-row { justify-content: space-around; flex-wrap: nowrap; }\n      .stat-item { flex: 1; min-width: 0; }\n      .stat-num { font-size: clamp(32px, 8vw, 48px); }\n      .stat-item small { font-size: 10px; }\n      .stat-divider { display: none; }\n    }\n\n    @media (max-width: 768px) {\n      .ticker-wrap { display: none; }\n      .trust-row { flex-direction: column; align-items: flex-start; }\n      .trust-divider { display: none; }\n      .nav-links, .nav-btn { display: none; }\n      .nav-ham { display: flex; }\n\n      /* HERO MOBILE: imagen visible + texto limpio sobre blanco */\n      .hero {\n        padding: 0 0 58px;\n        background: #fff;\n        min-height: auto;\n      }\n\n      .hero::before {\n        display: block;\n        top: 24px;\n        left: 18px;\n        right: 18px;\n        bottom: auto;\n        width: auto;\n        height: clamp(270px, 40vh, 360px);\n        border-radius: 30px;\n        background-size: cover;\n        background-position: 50% center;\n        box-shadow: 0 26px 64px rgba(10,31,110,.14);\n        opacity: 1;\n      }\n\n      .hero::after {\n        display: block;\n        top: 180px;\n        left: 0;\n        right: 0;\n        bottom: auto;\n        width: auto;\n        height: 230px;\n        background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.92) 48%, #fff 82%);\n        pointer-events: none;\n        z-index: 1;\n      }\n\n      .hero-glow {\n        display: block;\n        width: 340px;\n        height: 340px;\n        top: 180px;\n        right: -150px;\n        opacity: .55;\n      }\n\n      .hero-inner {\n        display: block;\n        min-height: auto;\n        padding-top: clamp(255px, 39vh, 340px);\n      }\n\n      .hero-visual { display: none !important; }\n\n      .hero-copy {\n        position: relative;\n        z-index: 3;\n        width: 100%;\n        max-width: 620px;\n        margin-top: -46px;\n        padding: 30px 2px 0;\n        background: linear-gradient(180deg, rgba(255,255,255,.96) 0%, #fff 58%);\n        border-radius: 28px 28px 0 0;\n      }\n\n      .hero-h1 {\n        font-size: clamp(35px, 9.7vw, 47px);\n        line-height: .98;\n        letter-spacing: -.045em;\n        margin-bottom: 19px;\n        max-width: 690px;\n      }\n\n      .hero-p {\n        font-size: 15.5px;\n        line-height: 1.55;\n        margin-bottom: 24px;\n        max-width: 95%;\n      }\n\n      .section { padding: 68px 0; }\n      .port-featured {\n        height: auto;\n        background: #fff;\n        border-radius: 24px;\n      }\n      .port-featured img,\n      .port-card img {\n        width: 100%;\n        height: auto;\n        aspect-ratio: 16 / 10;\n        object-fit: cover;\n        object-position: top center;\n      }\n      .port-featured img[alt='Ercas'] {\n        object-fit: cover;\n        object-position: top center;\n        background: #fff;\n        padding: 0;\n      }\n      .port-grid-4 { grid-template-columns: 1fr 1fr; }\n      .port-card {\n        height: auto;\n        background: #fff;\n        border-radius: 24px;\n      }\n      .port-overlay { display: none; }\n      .port-featured-info,\n      .port-card-info {\n        position: static;\n        padding: 18px 18px 22px;\n        background: #fff;\n      }\n      .port-featured-info h3 {\n        font-size: 28px;\n        margin-bottom: 8px;\n        color: var(--navy) !important;\n      }\n      .port-featured-info p {\n        color: var(--muted);\n        max-width: none;\n      }\n      .port-card-info h3 {\n        font-size: 17px;\n        color: var(--navy) !important;\n      }\n      .svc-grid { grid-template-columns: 1fr; }\n      .process-grid { grid-template-columns: 1fr; }\n      .testi-grid { grid-template-columns: 1fr; }\n      .img-gallery { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }\n      .sec-header { flex-direction: column; align-items: flex-start; }\n      .cta-img-wrap { height: 580px; }\n    }\n\n    @media (max-width: 480px) {\n      .wrap { width: min(100% - 28px, 1160px); }\n      .hero { padding-bottom: 52px; }\n      .hero::before {\n        top: 18px;\n        left: 12px;\n        right: 12px;\n        height: clamp(250px, 36vh, 315px);\n        border-radius: 24px;\n        background-position: 50% center;\n      }\n      .hero::after {\n        top: 160px;\n        height: 220px;\n      }\n      .hero-inner { padding-top: clamp(238px, 37vh, 306px); }\n      .hero-copy {\n        margin-top: -38px;\n        padding-top: 28px;\n      }\n      .hero-h1 { font-size: clamp(34px, 9.9vw, 44px); }\n      .hero-actions { flex-direction: row; gap: 8px; flex-wrap: wrap; justify-content: center; }\n      .hero-actions .btn-blue,\n      .hero-actions .btn-outline { white-space: nowrap; font-size: 13px; }\n      .port-grid-4 { grid-template-columns: 1fr; }\n\n      #portfolio .portfolio-title-mobile-one {\n        font-size: clamp(20px, 6.2vw, 25px);\n        line-height: 1.08;\n        letter-spacing: -.045em;\n        white-space: normal;\n        max-width: 100%;\n      }\n\n      #portfolio .portfolio-title-mobile-one .portfolio-desktop-break {\n        display: none;\n      }\n\n      #portfolio .portfolio-title-mobile-one .portfolio-mobile-space {\n        display: inline;\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .oriavision-web-exact *, .oriavision-web-exact *::before, .oriavision-web-exact *::after {\n        animation-duration: .01ms !important;\n        animation-iteration-count: 1 !important;\n        transition-duration: .01ms !important;\n      }\n      .rv { opacity: 1 !important; transform: none !important; }\n      .wipe::after { display: none; }\n      .wipe img { transform: none !important; }\n      .ticker-track { animation: none !important; }\n    }\n  .wsp-icon { width: 20px; height: 20px; flex-shrink: 0; }\n\n/* LEGIBILITY FIX /web only: mejora contraste y lectura sin tocar el resto del sitio */\n.oriavision-web-exact {\n  --muted: #334B68;\n  --text: #071B52;\n  color: var(--text);\n  text-rendering: geometricPrecision;\n}\n\n.oriavision-web-exact .hero-h1,\n.oriavision-web-exact .sec-h2,\n.oriavision-web-exact .svc-card h3,\n.oriavision-web-exact .svc-text h3,\n.oriavision-web-exact .why-point h4,\n.oriavision-web-exact .faq-btn span {\n  color: #071B52 !important;\n}\n\n.oriavision-web-exact .hero-p,\n.oriavision-web-exact .sec-p,\n.oriavision-web-exact .svc-card > p,\n.oriavision-web-exact .svc-list li,\n.oriavision-web-exact .svc-text p,\n.oriavision-web-exact .why-point p,\n.oriavision-web-exact .testi-text,\n.oriavision-web-exact .faq-ans,\n.oriavision-web-exact .footer-copy,\n.oriavision-web-exact .footer-nav a {\n  color: #334B68 !important;\n  opacity: 1 !important;\n  font-weight: 600;\n}\n\n.oriavision-web-exact .hero-label,\n.oriavision-web-exact .eyebrow,\n.oriavision-web-exact .svc-card-cta,\n.oriavision-web-exact .svc-link {\n  color: #005EB8 !important;\n  opacity: 1 !important;\n}\n\n.oriavision-web-exact .stat-item small,\n.oriavision-web-exact .trust-text span,\n.oriavision-web-exact .port-featured-info p,\n.oriavision-web-exact .proc-body p,\n.oriavision-web-exact .bq-name span,\n.oriavision-web-exact .cta-content p,\n.oriavision-web-exact .btn-light {\n  color: rgba(255,255,255,.88) !important;\n  opacity: 1 !important;\n}\n\n.oriavision-web-exact .proc-body h3,\n.oriavision-web-exact .port-featured-info h3,\n.oriavision-web-exact .port-card-info h3,\n.oriavision-web-exact .trust-text strong,\n.oriavision-web-exact .cta-content h2,\n.oriavision-web-exact .sec-h2-white {\n  color: #ffffff !important;\n  opacity: 1 !important;\n}\n\n@media (max-width: 768px) {\n  .oriavision-web-exact .hero-copy {\n    background: #ffffff;\n    box-shadow: 0 -18px 42px rgba(255,255,255,.95);\n  }\n\n  .oriavision-web-exact .hero-p {\n    max-width: 100%;\n  }\n}\n";

const WEB_HTML = "\n\n\n<div id=\"loader\">\n<div class=\"loader-inner\">\n<div class=\"loader-logo\">Oriavision</div>\n<div class=\"loader-track\"><div class=\"loader-fill\"></div></div>\n</div>\n</div>\n\n<div id=\"progress\"></div>\n\n<section class=\"hero\">\n<div aria-hidden=\"true\" class=\"hero-eye-deco\"></div>\n<div aria-hidden=\"true\" class=\"hero-glow\"></div>\n<div class=\"wrap\">\n<div class=\"hero-inner\">\n<div class=\"hero-copy\">\n<h1 class=\"hero-h1\">\n<span class=\"h1-line\"><span class=\"h1-inner\">Páginas web para</span></span>\n<span class=\"h1-line\"><span class=\"h1-inner\">negocios que quieren</span></span>\n<span class=\"h1-line\"><span class=\"h1-inner\"><mark>vender mejor online</mark></span></span>\n</h1>\n<p class=\"hero-p\">Desarrollamos sitios modernos, rápidos y profesionales para marcas, comercios y emprendedores que necesitan mostrarse mejor, generar confianza y recibir más consultas.</p>\n<div class=\"hero-actions\">\n<a class=\"btn-blue\" data-magnetic=\"\" data-wa=\"\" data-wa-loc=\"hero\" href=\"https://wa.me/5491127575675?text=Hola%20Oriavision%2C%20vi%20la%20publicidad%20de%20p%C3%A1ginas%20web%20y%20quiero%20consultar%20por%20una%20web%20para%20mi%20negocio.\" target=\"_blank\" rel=\"noreferrer\"><svg viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\" style=\"width:18px;height:18px;flex-shrink:0;\"><path d=\"M16.01 3.2c-7.04 0-12.77 5.64-12.77 12.58 0 2.22.6 4.39 1.74 6.29L3.13 28.8l6.95-1.8a12.95 12.95 0 0 0 5.93 1.45c7.04 0 12.77-5.64 12.77-12.58S23.05 3.2 16.01 3.2Zm0 22.99c-1.91 0-3.78-.51-5.4-1.48l-.39-.23-4.13 1.07 1.1-4-.26-.41a10.15 10.15 0 0 1-1.56-5.36c0-5.69 4.77-10.32 10.64-10.32 5.86 0 10.63 4.63 10.63 10.32 0 5.69-4.77 10.41-10.63 10.41Zm5.83-7.74c-.32-.16-1.9-.93-2.2-1.04-.3-.1-.51-.16-.72.16-.21.31-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.55-.95-.84-1.59-1.88-1.77-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.72-1.71-.98-2.35-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.58 0 1.53 1.13 3 1.29 3.21.16.21 2.23 3.36 5.41 4.71.76.33 1.35.53 1.81.68.76.24 1.45.21 2 .13.61-.09 1.9-.76 2.17-1.5.27-.74.27-1.37.19-1.5-.08-.13-.29-.21-.61-.37Z\"/></svg>Pedir asesoría inicial sin cargo</a>\n<a class=\"btn-outline\" href=\"#portfolio\">Ver trabajos realizados</a>\n</div>\n<p class=\"hero-support\">Atención personalizada en CABA y GBA. Podemos coordinar una reunión o revisar tu proyecto juntos.</p>\n</div>\n<div aria-hidden=\"true\" class=\"hero-visual\">\n<div class=\"mockups-stack\">\n<div class=\"mockup mockup-1\">\n<div class=\"mockup-chrome\">\n<div class=\"m-dots\"><span></span><span></span><span></span></div>\n<div class=\"m-url\"></div>\n</div>\n<div class=\"mockup-screen\">\n<img alt=\"Proyecto web Oriavision\" loading=\"eager\" src=\"/web-exact/web-exact-01.jpg\"/>\n</div>\n</div>\n<div class=\"mockup mockup-2\">\n<div class=\"mockup-chrome\">\n<div class=\"m-dots\"><span></span><span></span><span></span></div>\n<div class=\"m-url\"></div>\n</div>\n<div class=\"mockup-screen\">\n<img alt=\"Collage de proyectos web\" loading=\"eager\" src=\"/web-visuals/mockup-slide-collage.png\"/>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n\n<section class=\"conv-trust\">\n<div class=\"wrap\">\n<div class=\"conv-trust-row\">\n<span class=\"conv-pill\">Asesoría inicial sin cargo</span>\n<span class=\"conv-pill\">Atención personalizada en CABA y GBA</span>\n<span class=\"conv-pill\">Presupuesto según el tipo de proyecto</span>\n<span class=\"conv-pill\">Landing, web institucional o sistema a medida</span>\n</div>\n<div class=\"conv-cta conv-cta-top\">\n<div class=\"conv-cta-text\"><strong>¿No sabés qué tipo de web necesitás?</strong><span>Te orientamos sin cargo y te ayudamos a elegir el camino más conveniente para empezar.</span></div>\n<a class=\"btn-wa\" data-wa=\"\" data-wa-loc=\"after_intro\" href=\"https://wa.me/5491127575675?text=Hola%20Oriavision%2C%20vi%20la%20publicidad%20de%20p%C3%A1ginas%20web%20y%20quiero%20consultar%20por%20una%20web%20para%20mi%20negocio.\" target=\"_blank\" rel=\"noreferrer\">Consultar por WhatsApp</a>\n</div>\n</div>\n</section>\n\n<div aria-hidden=\"true\" class=\"ticker-wrap\">\n<div class=\"ticker-track\">\n<div class=\"ticker-item\">Diseño web profesional<span class=\"t-sep\"></span>Landing pages<span class=\"t-sep\"></span>Entrega en 7 días<span class=\"t-sep\"></span>Optimizado para Google<span class=\"t-sep\"></span>Tu presencia online<span class=\"t-sep\"></span></div>\n<div class=\"ticker-item\">Diseño web profesional<span class=\"t-sep\"></span>Landing pages<span class=\"t-sep\"></span>Entrega en 7 días<span class=\"t-sep\"></span>Optimizado para Google<span class=\"t-sep\"></span>Tu presencia online<span class=\"t-sep\"></span></div>\n<div class=\"ticker-item\">Diseño web profesional<span class=\"t-sep\"></span>Landing pages<span class=\"t-sep\"></span>Entrega en 7 días<span class=\"t-sep\"></span>Optimizado para Google<span class=\"t-sep\"></span>Tu presencia online<span class=\"t-sep\"></span></div>\n<div class=\"ticker-item\">Diseño web profesional<span class=\"t-sep\"></span>Landing pages<span class=\"t-sep\"></span>Entrega en 7 días<span class=\"t-sep\"></span>Optimizado para Google<span class=\"t-sep\"></span>Tu presencia online<span class=\"t-sep\"></span></div>\n</div>\n</div>\n\n<div class=\"stats-band\">\n<div class=\"wrap\">\n<div class=\"stats-row\">\n<div class=\"stat-item rv d1\">\n<span class=\"stat-num\"><span data-count=\"7\">7</span></span>\n<small>Días para una landing</small>\n</div>\n<div class=\"stat-divider\"></div>\n<div class=\"stat-item rv d2\">\n<span class=\"stat-num\"><span data-count=\"100\" data-suffix=\"%\">100%</span></span>\n<small>Entregados en fecha</small>\n</div>\n<div class=\"stat-divider\"></div>\n<div class=\"stat-item rv d3\">\n<span class=\"stat-num\">0</span>\n<small>Sorpresas en el precio</small>\n</div>\n</div>\n</div>\n</div>\n\n<section class=\"section section-off\" id=\"opciones\">\n<div class=\"wrap\">\n<h2 class=\"sec-h2 rv\">Opciones que<br/>desarrollamos.</h2>\n<p class=\"sec-p rv d1\">Si no sabés cuál necesitás, no importa: te orientamos sin cargo y elegimos juntos la mejor opción para empezar.</p>\n<div class=\"svc-grid\">\n<div class=\"svc-card card-1 rv d1\">\n<picture class=\"svc-card-picture\"><source media=\"(max-width: 768px)\" srcset=\"/web-mobile/landing-page-mobile.jpg?v=8\"/><img alt=\"Landing page\" class=\"svc-card-img\" loading=\"lazy\" src=\"/web-exact/web-exact-03.jpg\"/></picture>\n<div class=\"svc-card-bar\">Landing page</div>\n<h3>La forma más directa de conseguir consultas de clientes.</h3>\n<p>Para presentar un servicio, captar consultas o validar una idea. Una sola página pensada para convertir cada visita en un mensaje.</p>\n<ul class=\"svc-list\">\n<li>Diseño personalizado para tu rubro</li>\n<li>Texto optimizado para convertir</li>\n<li>Botón de WhatsApp y formulario</li>\n<li>Optimizada para Google desde el día uno</li>\n<li>Lista en 3 a 7 días hábiles</li>\n</ul>\n<a class=\"svc-card-cta\" href=\"#formulario\">Consultá el precio →</a>\n</div>\n<div class=\"svc-card card-2 rv d2\">\n<picture class=\"svc-card-picture\"><source media=\"(max-width: 768px)\" srcset=\"/web-mobile/web-completa-mobile.jpg?v=8\"/><img alt=\"Web completa\" class=\"svc-card-img\" loading=\"lazy\" src=\"/web-steps/paso-03-diseno.png\"/></picture>\n<div class=\"svc-card-bar\">Web institucional</div>\n<h3>Para presentar tu marca, actividad o proyecto en la web.</h3>\n<p>Para negocios, marcas y profesionales que necesitan una presencia sólida y confiable. Información, portfolio y opiniones reales para que tu cliente confíe antes de contactarte.</p>\n<ul class=\"svc-list\">\n<li>Varias páginas y secciones</li>\n<li>Catálogo o portfolio de propuestas</li>\n<li>Panel para editar el contenido</li>\n<li>Integración con redes sociales</li>\n<li>Optimizada para celular y Google</li>\n</ul>\n<a class=\"svc-card-cta\" href=\"#formulario\">Consultá el precio →</a>\n</div>\n<div class=\"svc-card card-3 rv d3\">\n<picture class=\"svc-card-picture\"><source media=\"(max-width: 768px)\" srcset=\"/web-mobile/sistema-simple-mobile.jpg?v=8\"/><img alt=\"Sistema simple\" class=\"svc-card-img\" loading=\"lazy\" src=\"/web-steps/paso-04-online.png\"/></picture>\n<div class=\"svc-card-bar\">Sistema web a medida</div>\n<h3>Para digitalizar tu gestión sin depender de plataformas caras.</h3>\n<p>Para proyectos que necesitan usuarios, paneles, base de datos o funcionalidades específicas. Sin licencias, sin tecnicismos, sin complicaciones.</p>\n<ul class=\"svc-list\">\n<li>Panel de administración propio</li>\n<li>Carga y edición de datos</li>\n<li>Acceso con usuario y contraseña</li>\n<li>Adaptado exactamente a tu flujo</li>\n<li>Sin licencias mensuales</li>\n</ul>\n<a class=\"svc-card-cta\" href=\"#formulario\">Consultá el precio →</a>\n</div>\n</div>\n</div>\n</section>\n\n<div class=\"conv-cta-wrap\">\n<div class=\"wrap\">\n<div class=\"conv-cta rv\">\n<div class=\"conv-cta-text\"><strong>¿No sabés cuál te conviene?</strong><span>Te ayudamos a elegir si te conviene una landing, una web institucional o un sistema a medida. Sin cargo.</span></div>\n<a class=\"btn-wa\" data-wa=\"\" data-wa-loc=\"after_services\" href=\"https://wa.me/5491127575675?text=Hola%20Oriavision%2C%20vi%20la%20publicidad%20de%20p%C3%A1ginas%20web%20y%20quiero%20consultar%20por%20una%20web%20para%20mi%20negocio.\" target=\"_blank\" rel=\"noreferrer\">Pedir asesoría inicial sin cargo</a>\n</div>\n</div>\n</div>\n\n<section class=\"section\" id=\"portfolio\">\n<div class=\"wrap\">\n<div class=\"sec-header\">\n<div>\n<h2 class=\"sec-h2 portfolio-title-mobile-one rv\">Proyectos que<br class=\"portfolio-desktop-break\"/><span class=\"portfolio-mobile-space\"> </span>ya están online.</h2>\n</div>\n<a class=\"btn-outline rv d2\" href=\"#formulario\">Quiero algo parecido →</a>\n</div>\n<div class=\"rv rs\">\n<a class=\"port-featured wipe\" href=\"https://ercas.com.ar/\" rel=\"noopener noreferrer\" target=\"_blank\">\n<picture><source media=\"(max-width: 768px)\" srcset=\"/portfolio-mobile/ercas-mobile.jpg?v=13\"/><img alt=\"Ercas\" loading=\"lazy\" src=\"/portfolio/ercas.png\"/></picture>\n<div class=\"port-overlay\"></div>\n<div class=\"port-featured-info\">\n<div class=\"port-tag\">E-commerce</div>\n<h3>Ercas</h3>\n<p>Tienda online de tecnología, celulares, tintas y accesorios.</p>\n</div>\n</a>\n</div>\n<div class=\"port-grid-4\">\n<a class=\"port-card rv d1 wipe\" href=\"https://www.myriamrodriguez.com.ar/\" rel=\"noopener noreferrer\" target=\"_blank\">\n<picture><source media=\"(max-width: 768px)\" srcset=\"/portfolio-mobile/myriam-rodriguez-card-mobile.jpg\"/><img alt=\"Myriam Rodríguez Inmuebles\" loading=\"lazy\" src=\"/portfolio/myriam-rodriguez-card.jpg\"/></picture>\n<div class=\"port-overlay\"></div>\n<div class=\"port-card-info\">\n<div class=\"port-tag\">Web inmobiliaria</div>\n<h3>Myriam Rodríguez Inmuebles</h3>\n</div>\n</a>\n<a class=\"port-card rv d1 wipe\" href=\"https://web-siempredeguardia.vercel.app/\" rel=\"noopener noreferrer\" target=\"_blank\">\n<picture><source media=\"(max-width: 768px)\" srcset=\"/portfolio-mobile/siempre-de-guardia-mobile.jpg?v=12\"/><img alt=\"Siempre de Guardia\" loading=\"lazy\" src=\"/web-exact/web-exact-06.png\"/></picture>\n<div class=\"port-overlay\"></div>\n<div class=\"port-card-info\">\n<div class=\"port-tag\">Sistema web</div>\n<h3>Siempre de Guardia</h3>\n</div>\n</a>\n<a class=\"port-card rv d1 wipe\" href=\"https://quirvo.com.ar/\" rel=\"noopener noreferrer\" target=\"_blank\">\n<picture><source media=\"(max-width: 768px)\" srcset=\"/portfolio-mobile/quirvo-mobile.jpg?v=12\"/><img alt=\"Quirvo\" loading=\"lazy\" src=\"/web-exact/web-exact-07.png\"/></picture>\n<div class=\"port-overlay\"></div>\n<div class=\"port-card-info\">\n<div class=\"port-tag\">Landing</div>\n<h3>Quirvo</h3>\n</div>\n</a>\n<a class=\"port-card rv d2 wipe\" href=\"https://calculadoraml.oriavision.com.ar/\" rel=\"noopener noreferrer\" target=\"_blank\">\n<picture><source media=\"(max-width: 768px)\" srcset=\"/portfolio-mobile/calculadora-ml-mobile.jpg?v=12\"/><img alt=\"Calculadora ML\" loading=\"lazy\" src=\"/web-exact/web-exact-05.jpg\"/></picture>\n<div class=\"port-overlay\"></div>\n<div class=\"port-card-info\">\n<div class=\"port-tag\">Herramienta</div>\n<h3>Calculadora ML</h3>\n</div>\n</a>\n<a class=\"port-card rv d3 wipe\" href=\"https://www.orientadordepreciosml.oriavision.com.ar/\" rel=\"noopener noreferrer\" target=\"_blank\">\n<picture><source media=\"(max-width: 768px)\" srcset=\"/portfolio-mobile/orientador-precios-mobile.jpg?v=12\"/><img alt=\"Orientador de precios ML\" loading=\"lazy\" src=\"/web-exact/web-exact-09.png\"/></picture>\n<div class=\"port-overlay\"></div>\n<div class=\"port-card-info\">\n<div class=\"port-tag\">Herramienta</div>\n<h3>Orientador de precios ML</h3>\n</div>\n</a>\n<a class=\"port-card rv d4 wipe\" href=\"https://dbengotech.com.ar/\" rel=\"noopener noreferrer\" target=\"_blank\">\n<picture><source media=\"(max-width: 768px)\" srcset=\"/portfolio-mobile/dbengotech-mobile.jpg?v=12\"/><img alt=\"dbengotech\" loading=\"lazy\" src=\"/web-exact/web-exact-10.png\"/></picture>\n<div class=\"port-overlay\"></div>\n<div class=\"port-card-info\">\n<div class=\"port-tag\">Web profesional</div>\n<h3>dbengotech</h3>\n</div>\n</a>\n</div>\n</div>\n</section>\n\n<div class=\"conv-cta-wrap\">\n<div class=\"wrap\">\n<div class=\"conv-cta rv\">\n<div class=\"conv-cta-text\"><strong>¿Querés una web con este nivel de presentación para tu negocio?</strong><span>Contanos qué necesitás y armamos una propuesta a tu medida.</span></div>\n<a class=\"btn-wa\" data-wa=\"\" data-wa-loc=\"after_portfolio\" href=\"https://wa.me/5491127575675?text=Hola%20Oriavision%2C%20vi%20la%20publicidad%20de%20p%C3%A1ginas%20web%20y%20quiero%20consultar%20por%20una%20web%20para%20mi%20negocio.\" target=\"_blank\" rel=\"noreferrer\">Hablemos de tu proyecto</a>\n</div>\n</div>\n</div>\n\n<section class=\"section\">\n<div class=\"wrap\">\n<div class=\"why-inner\">\n<div class=\"why-img wipe rv rl\">\n<img alt=\"Equipo Oriavision\" loading=\"lazy\" src=\"/web-exact/web-exact-11.jpg\"/>\n</div>\n<div>\n<h2 class=\"sec-h2 rv\">Por qué elegirnos.</h2>\n<p class=\"sec-p rv d2\">Diseñamos soluciones claras, con criterio comercial, plazos reales y precios transparentes.</p>\n<div class=\"why-points\">\n<div class=\"why-point rv d1\">\n<div class=\"why-num\">01</div>\n<div>\n<h4>Respondemos y entregamos</h4>\n<p>Respondemos rápido, ordenamos el proceso y respetamos los plazos.</p>\n</div>\n</div>\n<div class=\"why-point rv d2\">\n<div class=\"why-num\">02</div>\n<div>\n<h4>Diseño que comunica</h4>\n<p>Cada página se piensa para tu cliente específico y para el objetivo real del proyecto.</p>\n</div>\n</div>\n<div class=\"why-point rv d3\">\n<div class=\"why-num\">03</div>\n<div>\n<h4>Claro, ordenado y justo</h4>\n<p>Buscamos la opción adecuada para empezar, con una propuesta clara y fácil de entender.</p>\n</div>\n</div>\n<div class=\"why-point rv d4\">\n<div class=\"why-num\">04</div>\n<div>\n<h4>Seguimos después del lanzamiento</h4>\n<p>Si algo falla o querés mejorarlo, estamos. Tu web crece con tu negocio.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n\n<div class=\"trust-strip\">\n<div class=\"wrap\">\n<div class=\"trust-row\">\n<div class=\"trust-item rv d1\">\n<div class=\"trust-icon\">⚡</div>\n<div class=\"trust-text\">\n<strong>Entrega en 3 a 7 días</strong>\n<span>Landings listas sin demoras</span>\n</div>\n</div>\n<div class=\"trust-divider\"></div>\n<div class=\"trust-item rv d2\">\n<div class=\"trust-icon\">🎯</div>\n<div class=\"trust-text\">\n<strong>Diseño para convertir</strong>\n<span>Cada página pensada para tu cliente</span>\n</div>\n</div>\n<div class=\"trust-divider\"></div>\n<div class=\"trust-item rv d3\">\n<div class=\"trust-icon\">📱</div>\n<div class=\"trust-text\">\n<strong>100% mobile-first</strong>\n<span>Optimizada para celular y Google</span>\n</div>\n</div>\n<div class=\"trust-divider\"></div>\n<div class=\"trust-item rv d4\">\n<div class=\"trust-icon\">💬</div>\n<div class=\"trust-text\">\n<strong>Soporte post-lanzamiento</strong>\n<span>Acompañamos después de entregar</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n\n<section class=\"section\" id=\"proceso\">\n<div class=\"wrap\">\n<h2 class=\"sec-h2 rv\">De la idea<br/>a la web online en 4 pasos.</h2>\n<div class=\"process-grid\">\n<div class=\"proc rv d1\">\n<div class=\"proc-img\">\n<img alt=\"Idea inicial del proyecto enviada por WhatsApp o formulario\" loading=\"lazy\" src=\"/web-steps/paso-01-idea.png\"/>\n</div>\n<div class=\"proc-body\">\n<div class=\"proc-step\">Paso 01</div>\n<h3>Nos contás tu idea</h3>\n<p>Por WhatsApp o mail. Nos decís qué hacés, qué querés lograr y te hacemos las preguntas correctas.</p>\n</div>\n</div>\n<div class=\"proc rv d2\">\n<div class=\"proc-img\">\n<img alt=\"Análisis y recomendación de la mejor opción para el proyecto\" loading=\"lazy\" src=\"/web-steps/paso-02-recomendacion.png\"/>\n</div>\n<div class=\"proc-body\">\n<div class=\"proc-step\">Paso 02</div>\n<h3>Definimos juntos el proyecto</h3>\n<p>Analizamos qué necesitás, qué objetivo querés lograr y cuál es la opción más conveniente para empezar.</p>\n</div>\n</div>\n<div class=\"proc rv d3\">\n<div class=\"proc-img\">\n<img alt=\"Diseño y armado de una página web profesional\" loading=\"lazy\" src=\"/web-steps/paso-03-diseno.png\"/>\n</div>\n<div class=\"proc-body\">\n<div class=\"proc-step\">Paso 03</div>\n<h3>Diseñamos y armamos</h3>\n<p>Te mostramos avances para pedir cambios durante el proceso, no al final.</p>\n</div>\n</div>\n<div class=\"proc rv d4\">\n<div class=\"proc-img\">\n<img alt=\"Sitio web publicado online y verificado en distintos dispositivos\" loading=\"lazy\" src=\"/web-steps/paso-04-online.png\"/>\n</div>\n<div class=\"proc-body\">\n<div class=\"proc-step\">Paso 04</div>\n<h3>La dejamos online</h3>\n<p>Publicamos, verificamos en celular y computadora, y te enseñamos a manejarte.</p>\n</div>\n</div>\n</div>\n</div>\n</section>\n\n<div class=\"conv-cta-wrap\">\n<div class=\"wrap\">\n<div class=\"conv-cta rv\">\n<div class=\"conv-cta-text\"><strong>Contanos qué necesitás</strong><span>Y te decimos cuál es el camino más conveniente para empezar. Asesoría inicial sin cargo.</span></div>\n<a class=\"btn-wa\" data-wa=\"\" data-wa-loc=\"before_faq\" href=\"https://wa.me/5491127575675?text=Hola%20Oriavision%2C%20vi%20la%20publicidad%20de%20p%C3%A1ginas%20web%20y%20quiero%20consultar%20por%20una%20web%20para%20mi%20negocio.\" target=\"_blank\" rel=\"noreferrer\">Consultar ahora</a>\n</div>\n</div>\n</div>\n\n<section class=\"section\">\n<div class=\"wrap\">\n<div style=\"text-align:center;\">\n<h2 class=\"sec-h2 rv\" style=\"text-align:center;\">Preguntas frecuentes<br/>antes de arrancar.</h2>\n</div>\n<div class=\"faq-grid\">\n<div class=\"faq-item rv d1\">\n<button class=\"faq-btn\">\n<span>¿Cuánto tarda en estar lista?</span>\n<div class=\"faq-ico\">+</div>\n</button>\n<div class=\"faq-ans\">Una landing: 3 a 7 días hábiles. Una web completa: 2 a 4 semanas. En todos los casos te damos un plazo claro antes de arrancar y lo respetamos.</div>\n</div>\n<div class=\"faq-item rv d2\">\n<button class=\"faq-btn\">\n<span>¿Necesito saber de tecnología?</span>\n<div class=\"faq-ico\">+</div>\n</button>\n<div class=\"faq-ans\">Para nada. Nos contás qué hacés y qué querés lograr, nosotros nos encargamos del resto. Si algo no se entiende, lo explicamos sin tecnicismos.</div>\n</div>\n<div class=\"faq-item rv d1\">\n<button class=\"faq-btn\">\n<span>¿Qué pasa si quiero cambiar algo después?</span>\n<div class=\"faq-ico\">+</div>\n</button>\n<div class=\"faq-ans\">Incluimos ajustes durante el desarrollo. Una vez entregada, podemos acordar soporte mensual o cambios puntuales. No te dejamos solo.</div>\n</div>\n<div class=\"faq-item rv d2\">\n<button class=\"faq-btn\">\n<span>¿Cómo es el proceso de pago?</span>\n<div class=\"faq-ico\">+</div>\n</button>\n<div class=\"faq-ans\">Generalmente: mitad al confirmar, mitad al entregar. Los detalles los hablamos puntualmente según el proyecto.</div>\n</div>\n<div class=\"faq-item rv d1\">\n<button class=\"faq-btn\">\n<span>¿La web aparece en Google?</span>\n<div class=\"faq-ico\">+</div>\n</button>\n<div class=\"faq-ans\">Sí, todas las webs están configuradas correctamente para que Google las indexe desde el primer día. El posicionamiento orgánico lleva tiempo, pero arrancás bien hecho.</div>\n</div>\n<div class=\"faq-item rv d2\">\n<button class=\"faq-btn\">\n<span>¿Puedo ver el trabajo antes de pagar todo?</span>\n<div class=\"faq-ico\">+</div>\n</button>\n<div class=\"faq-ans\">Sí. Te mostramos avances durante el proceso y podés pedir cambios. No te mostramos algo terminado al final y te pedimos que aceptes: trabajamos en conjunto.</div>\n</div>\n</div>\n</div>\n</section>\n\n<section class=\"final-cta\">\n<div class=\"cta-img-wrap\">\n<div class=\"cta-overlay\">\n<div class=\"cta-content\">\n<div class=\"eyebrow rv\">Asesoría inicial sin cargo · CABA y GBA</div>\n<h2 class=\"rv d1\">¿Querés una web profesional para tu negocio?</h2>\n<p class=\"rv d2\">Contanos qué necesitás y te ayudamos a encontrar la mejor opción: landing, web institucional o sistema a medida.</p>\n<div class=\"cta-btns rv d3\">\n<a class=\"btn-wsp\" data-wa=\"\" data-wa-loc=\"final_cta\" href=\"https://wa.me/5491127575675?text=Hola%20Oriavision%2C%20vi%20la%20publicidad%20de%20p%C3%A1ginas%20web%20y%20quiero%20consultar%20por%20una%20web%20para%20mi%20negocio.\" target=\"_blank\" rel=\"noreferrer\"><svg viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\" style=\"width:19px;height:19px;flex-shrink:0;\"><path d=\"M16.01 3.2c-7.04 0-12.77 5.64-12.77 12.58 0 2.22.6 4.39 1.74 6.29L3.13 28.8l6.95-1.8a12.95 12.95 0 0 0 5.93 1.45c7.04 0 12.77-5.64 12.77-12.58S23.05 3.2 16.01 3.2Zm0 22.99c-1.91 0-3.78-.51-5.4-1.48l-.39-.23-4.13 1.07 1.1-4-.26-.41a10.15 10.15 0 0 1-1.56-5.36c0-5.69 4.77-10.32 10.64-10.32 5.86 0 10.63 4.63 10.63 10.32 0 5.69-4.77 10.41-10.63 10.41Zm5.83-7.74c-.32-.16-1.9-.93-2.2-1.04-.3-.1-.51-.16-.72.16-.21.31-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.55-.95-.84-1.59-1.88-1.77-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.72-1.71-.98-2.35-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.58 0 1.53 1.13 3 1.29 3.21.16.21 2.23 3.36 5.41 4.71.76.33 1.35.53 1.81.68.76.24 1.45.21 2 .13.61-.09 1.9-.76 2.17-1.5.27-.74.27-1.37.19-1.5-.08-.13-.29-.21-.61-.37Z\"/></svg>Pedir propuesta por WhatsApp</a>\n<a class=\"btn-light\" href=\"#portfolio\">Ver trabajos realizados</a>\n</div>\n</div>\n</div>\n</div>\n</section>\n\n";

const WEB_CSS_MOBILE_FIX = `
/* MOBILE IMAGE SIZE FIX /web: solo celular. No afecta desktop. */
@media (max-width: 768px) {
  .oriavision-web-exact #opciones .svc-grid {
    gap: 26px !important;
  }

  .oriavision-web-exact #opciones .svc-card {
    overflow: hidden !important;
    border-radius: 24px !important;
  }

  /* Las imágenes de las 3 opciones estaban quedando bajas y recortadas.
     En celular les damos alto real para que el contenido entre. */
  .oriavision-web-exact #opciones .svc-card-img {
    display: block !important;
    width: calc(100% + 48px) !important;
    height: clamp(250px, 72vw, 330px) !important;
    max-height: none !important;
    margin: 0 -24px 0 !important;
    aspect-ratio: auto !important;
    object-fit: cover !important;
    object-position: center center !important;
    background: #071B52 !important;
    padding: 0 !important;
    border-radius: 24px 24px 0 0 !important;
    transform: none !important;
  }

  .oriavision-web-exact #opciones .svc-card-img[alt='Landing page'] {
    object-position: center center !important;
  }

  .oriavision-web-exact #opciones .svc-card-img[alt='Web completa'] {
    height: clamp(285px, 82vw, 380px) !important;
    object-fit: cover !important;
    object-position: center 42% !important;
  }

  .oriavision-web-exact #opciones .svc-card-img[alt='Sistema simple'] {
    height: clamp(285px, 82vw, 380px) !important;
    object-fit: cover !important;
    object-position: center 45% !important;
  }

  .oriavision-web-exact #opciones .svc-card:hover .svc-card-img {
    transform: none !important;
  }

  .oriavision-web-exact #opciones .svc-card-bar {
    width: calc(100% + 48px) !important;
    margin: 0 -24px 20px !important;
    padding: 20px 24px !important;
    min-height: 68px !important;
    border-radius: 0 !important;
  }

  /* Portfolio mobile: thumbnails más altos para que los screenshots no queden cortados. */
  .oriavision-web-exact #portfolio .port-featured,
  .oriavision-web-exact #portfolio .port-card {
    overflow: hidden !important;
    border-radius: 24px !important;
    background: #ffffff !important;
  }

  .oriavision-web-exact #portfolio .port-featured img {
    display: block !important;
    width: 100% !important;
    height: clamp(225px, 64vw, 310px) !important;
    max-height: none !important;
    aspect-ratio: auto !important;
    object-fit: cover !important;
    object-position: center center !important;
    background: #071B52 !important;
    padding: 0 !important;
    transform: none !important;
  }

  .oriavision-web-exact #portfolio .port-featured img[alt='Ercas'] {
    object-fit: cover !important;
    object-position: center center !important;
  }

  .oriavision-web-exact #portfolio .port-card img {
    display: block !important;
    width: 100% !important;
    height: clamp(210px, 60vw, 285px) !important;
    max-height: none !important;
    aspect-ratio: auto !important;
    object-fit: cover !important;
    object-position: center top !important;
    background: #071B52 !important;
    padding: 0 !important;
    transform: none !important;
  }

  .oriavision-web-exact #portfolio .port-card img[alt='Siempre de Guardia'],
  .oriavision-web-exact #portfolio .port-card img[alt='Quirvo'] {
    object-fit: cover !important;
    object-position: center top !important;
  }

  .oriavision-web-exact #portfolio .port-card img[alt='Calculadora ML'],
  .oriavision-web-exact #portfolio .port-card img[alt='Orientador de precios ML'],
  .oriavision-web-exact #portfolio .port-card img[alt='dbengotech'] {
    object-fit: cover !important;
    object-position: center center !important;
  }

  .oriavision-web-exact #portfolio .wipe::after {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .oriavision-web-exact #opciones .svc-card-img[alt='Web completa'],
  .oriavision-web-exact #opciones .svc-card-img[alt='Sistema simple'] {
    height: clamp(300px, 88vw, 390px) !important;
  }

  .oriavision-web-exact #portfolio .port-featured img {
    height: clamp(230px, 68vw, 315px) !important;
  }

  .oriavision-web-exact #portfolio .port-card img {
    height: clamp(220px, 66vw, 300px) !important;
  }
}
`;


const WEB_CSS_MOBILE_FIX_V3 = `
/* MOBILE FIX V3 /web: tamaños y colores reales para celular */
@media (max-width: 768px) {
  .oriavision-web-exact #opciones .svc-card {
    padding: 0 18px 24px !important;
    border-radius: 24px !important;
    overflow: hidden !important;
  }

  .oriavision-web-exact #opciones .svc-card-img {
    display: block !important;
    width: calc(100% + 36px) !important;
    margin: 0 -18px 0 !important;
    height: clamp(210px, 58vw, 260px) !important;
    min-height: 0 !important;
    aspect-ratio: auto !important;
    object-fit: cover !important;
    object-position: center center !important;
    background: #0B215F !important;
    padding: 0 !important;
    border-radius: 24px 24px 0 0 !important;
  }

  .oriavision-web-exact #opciones .svc-card-img[alt='Web completa'] {
    object-position: center 34% !important;
  }

  .oriavision-web-exact #opciones .svc-card-img[alt='Sistema simple'] {
    object-position: center 38% !important;
  }

  .oriavision-web-exact #opciones .svc-card-bar {
    width: calc(100% + 36px) !important;
    margin: 0 -18px 18px !important;
    padding: 20px 18px !important;
  }

  .oriavision-web-exact #portfolio .port-featured,
  .oriavision-web-exact #portfolio .port-card {
    height: auto !important;
    min-height: 0 !important;
    background: #FFFFFF !important;
    overflow: hidden !important;
  }

  .oriavision-web-exact #portfolio .port-featured img,
  .oriavision-web-exact #portfolio .port-card img {
    display: block !important;
    width: 100% !important;
    height: clamp(200px, 54vw, 270px) !important;
    min-height: 0 !important;
    aspect-ratio: auto !important;
    object-fit: cover !important;
    object-position: center top !important;
    padding: 0 !important;
    background: #FFFFFF !important;
  }

  .oriavision-web-exact #portfolio .port-featured img[alt='Ercas'] {
    object-position: center top !important;
  }

  .oriavision-web-exact #portfolio .port-overlay {
    display: none !important;
  }

  .oriavision-web-exact #portfolio .port-featured-info,
  .oriavision-web-exact #portfolio .port-card-info {
    position: static !important;
    inset: auto !important;
    display: block !important;
    background: #FFFFFF !important;
    padding: 16px 16px 20px !important;
  }

  .oriavision-web-exact #portfolio .port-featured-info h3,
  .oriavision-web-exact #portfolio .port-card-info h3 {
    color: #071B52 !important;
    opacity: 1 !important;
  }

  .oriavision-web-exact #portfolio .port-featured-info h3 {
    font-size: 1.75rem !important;
    margin-bottom: 8px !important;
  }

  .oriavision-web-exact #portfolio .port-card-info h3 {
    font-size: 1.05rem !important;
    margin-top: 8px !important;
  }

  .oriavision-web-exact #portfolio .port-featured-info p,
  .oriavision-web-exact #portfolio .port-card-info p {
    color: #334B68 !important;
    opacity: 1 !important;
    font-weight: 600 !important;
  }

  .oriavision-web-exact #portfolio .port-tag {
    margin-bottom: 8px !important;
  }
}

@media (max-width: 480px) {
  .oriavision-web-exact #portfolio .port-grid-4 {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}
`;


const WEB_CSS_MOBILE_FIX_V4 = `
/* MOBILE FIX V4 /web: las 3 tarjetas con misma resolución y encuadre */
@media (max-width: 768px) {
  .oriavision-web-exact #opciones .svc-grid {
    gap: 24px !important;
  }

  .oriavision-web-exact #opciones .svc-card {
    padding: 0 0 24px !important;
    border-radius: 24px !important;
    overflow: hidden !important;
  }

  .oriavision-web-exact #opciones .svc-card-picture {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    overflow: hidden !important;
    border-radius: 24px 24px 0 0 !important;
    background: #071B52 !important;
  }

  .oriavision-web-exact #opciones .svc-card-img {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    aspect-ratio: 4 / 3 !important;
    margin: 0 !important;
    object-fit: cover !important;
    object-position: center center !important;
    background: #071B52 !important;
    border-radius: 0 !important;
    transform: none !important;
  }

  .oriavision-web-exact #opciones .svc-card:hover .svc-card-img {
    transform: none !important;
  }

  .oriavision-web-exact #opciones .svc-card-bar {
    width: 100% !important;
    margin: 0 0 18px !important;
    padding: 20px 24px !important;
    min-height: 0 !important;
    border-radius: 0 !important;
  }

  .oriavision-web-exact #opciones .svc-card > h3,
  .oriavision-web-exact #opciones .svc-card > p,
  .oriavision-web-exact #opciones .svc-card > .svc-list,
  .oriavision-web-exact #opciones .svc-card > .svc-card-cta {
    margin-left: 24px !important;
    margin-right: 24px !important;
  }

  .oriavision-web-exact #opciones .svc-card > h3 {
    font-size: 18px !important;
    line-height: 1.18 !important;
    margin-bottom: 12px !important;
  }

  .oriavision-web-exact #opciones .svc-card > p,
  .oriavision-web-exact #opciones .svc-list li {
    font-size: 14px !important;
    line-height: 1.55 !important;
  }

  .oriavision-web-exact #opciones .svc-card > p {
    margin-bottom: 18px !important;
  }

  .oriavision-web-exact #opciones .svc-card > .svc-list {
    margin-bottom: 24px !important;
  }

  .oriavision-web-exact #opciones .svc-card > .svc-card-cta {
    align-self: flex-start !important;
  }
}
`;


const WEB_CSS_MOBILE_FIX_V6 = `
/* MOBILE FIX V6 /web: imagenes consistentes y más grandes en celular */
@media (max-width: 768px) {
  .oriavision-web-exact #opciones .svc-grid {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }

  .oriavision-web-exact #opciones .svc-card-picture {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    overflow: hidden !important;
    border-radius: 24px 24px 0 0 !important;
    background: #071B52 !important;
  }

  .oriavision-web-exact #opciones .svc-card-img {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    aspect-ratio: 4 / 3 !important;
    object-fit: cover !important;
    object-position: center center !important;
    margin: 0 !important;
    border-radius: 0 !important;
    background: #071B52 !important;
  }
}
`;


const WEB_CSS_DESKTOP_OPTIONS_FIX_V7 = `
/* DESKTOP FIX V7 /web: las 3 fotos de opciones con misma resolución visual */
@media (min-width: 769px) {
  .oriavision-web-exact #opciones .svc-grid {
    align-items: stretch !important;
  }

  .oriavision-web-exact #opciones .svc-card {
    padding: 0 0 28px !important;
    overflow: hidden !important;
  }

  .oriavision-web-exact #opciones .svc-card-picture {
    display: block !important;
    width: 100% !important;
    aspect-ratio: 4 / 3 !important;
    margin: 0 0 0 !important;
    overflow: hidden !important;
    background: #071B52 !important;
  }

  .oriavision-web-exact #opciones .svc-card-img {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    aspect-ratio: 4 / 3 !important;
    object-fit: cover !important;
    object-position: center center !important;
    margin: 0 !important;
    border-radius: 0 !important;
    transform: none !important;
  }

  .oriavision-web-exact #opciones .svc-card:hover .svc-card-img {
    transform: none !important;
  }

  .oriavision-web-exact #opciones .svc-card-bar {
    width: 100% !important;
    margin: 0 0 20px !important;
    padding: 24px 28px !important;
  }

  .oriavision-web-exact #opciones .svc-card > h3,
  .oriavision-web-exact #opciones .svc-card > p,
  .oriavision-web-exact #opciones .svc-card > .svc-list,
  .oriavision-web-exact #opciones .svc-card > .svc-card-cta {
    margin-left: 28px !important;
    margin-right: 28px !important;
  }
}
`;


const WEB_CSS_MOBILE_RECT_FIX_V9 = `
/* MOBILE RECT FIX V9 /web: mismo tamaño de rectángulo en las 3 cards */
@media (max-width: 768px) {
  .oriavision-web-exact #opciones .svc-card-picture {
    width: 100% !important;
    height: clamp(250px, 72vw, 340px) !important;
    min-height: clamp(250px, 72vw, 340px) !important;
    max-height: clamp(250px, 72vw, 340px) !important;
    display: block !important;
    overflow: hidden !important;
    border-radius: 24px 24px 0 0 !important;
  }

  .oriavision-web-exact #opciones .svc-card-img {
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    max-height: 100% !important;
    aspect-ratio: auto !important;
    object-fit: cover !important;
    object-position: center center !important;
    display: block !important;
  }
}
`;


const WEB_CSS_MOBILE_PORTFOLIO_FIT_V10 = `
/* MOBILE PORTFOLIO FIT V10 /web: mejorar encuadre de cards del portfolio solo en celular */
@media (max-width: 768px) {
  .oriavision-web-exact #portfolio .port-card {
    overflow: hidden !important;
  }

  .oriavision-web-exact #portfolio .port-card img {
    width: 100% !important;
    height: clamp(235px, 68vw, 300px) !important;
    min-height: clamp(235px, 68vw, 300px) !important;
    max-height: clamp(235px, 68vw, 300px) !important;
    object-fit: cover !important;
    object-position: center center !important;
    display: block !important;
  }

  .oriavision-web-exact #portfolio .port-card img[alt='Siempre de Guardia'] {
    object-position: center 16% !important;
  }

  .oriavision-web-exact #portfolio .port-card img[alt='Quirvo'] {
    object-position: center 14% !important;
  }

  .oriavision-web-exact #portfolio .port-card img[alt='Calculadora ML'] {
    object-position: center 18% !important;
  }

  .oriavision-web-exact #portfolio .port-card img[alt='Orientador de precios ML'] {
    object-position: center 12% !important;
  }

  .oriavision-web-exact #portfolio .port-card img[alt='dbengotech'] {
    object-position: 34% 18% !important;
  }
}
`;


const WEB_CSS_MOBILE_PORTFOLIO_IMAGES_V11 = `
/* MOBILE PORTFOLIO IMAGES V11 /web: usar imágenes mobile con misma resolución */
@media (max-width: 768px) {
  .oriavision-web-exact #portfolio .port-featured picture,
  .oriavision-web-exact #portfolio .port-card picture {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
  }

  .oriavision-web-exact #portfolio .port-featured picture > img,
  .oriavision-web-exact #portfolio .port-card picture > img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center center !important;
    display: block !important;
  }
}
`;


const WEB_CSS_MOBILE_PORTFOLIO_IMAGES_V12 = `
/* MOBILE PORTFOLIO IMAGES V12 /web: todas las imágenes mobile con misma proporción visible */
@media (max-width: 768px) {
  .oriavision-web-exact #portfolio .port-featured picture,
  .oriavision-web-exact #portfolio .port-card picture {
    display: block !important;
    width: 100% !important;
    aspect-ratio: 4 / 3 !important;
    height: auto !important;
    overflow: hidden !important;
    background: #eef3f8 !important;
  }

  .oriavision-web-exact #portfolio .port-featured picture > img,
  .oriavision-web-exact #portfolio .port-card picture > img {
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    max-height: 100% !important;
    object-fit: cover !important;
    object-position: center center !important;
    display: block !important;
  }

  .oriavision-web-exact #portfolio .port-featured img[alt='Ercas'],
  .oriavision-web-exact #portfolio .port-card img[alt='Siempre de Guardia'],
  .oriavision-web-exact #portfolio .port-card img[alt='Quirvo'],
  .oriavision-web-exact #portfolio .port-card img[alt='Calculadora ML'],
  .oriavision-web-exact #portfolio .port-card img[alt='Orientador de precios ML'],
  .oriavision-web-exact #portfolio .port-card img[alt='dbengotech'] {
    object-position: center center !important;
  }
}
`;




const WEB_CSS_MOBILE_PORTFOLIO_CENTER_V34 = `
/* V34: ajustar tamaño y centrado de imágenes del portfolio en celular sin agrandarlas de más */
@media (max-width: 768px) {
  .oriavision-web-exact #portfolio .port-featured picture,
  .oriavision-web-exact #portfolio .port-card picture {
    display: block !important;
    width: 100% !important;
    aspect-ratio: 16 / 9 !important;
    height: auto !important;
    overflow: hidden !important;
    background: #ffffff !important;
  }

  .oriavision-web-exact #portfolio .port-featured picture > img,
  .oriavision-web-exact #portfolio .port-card picture > img {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    max-height: 100% !important;
    object-fit: cover !important;
    transform: none !important;
    background: #ffffff !important;
  }

  .oriavision-web-exact #portfolio .port-featured picture > img[alt='Ercas'] {
    object-position: center 24% !important;
  }

  .oriavision-web-exact #portfolio .port-card picture > img[alt='Siempre de Guardia'] {
    object-position: center 20% !important;
  }

  .oriavision-web-exact #portfolio .port-card picture > img[alt='Quirvo'] {
    object-position: center 18% !important;
  }

  .oriavision-web-exact #portfolio .port-card picture > img[alt='Calculadora ML'] {
    object-position: center 22% !important;
  }

  .oriavision-web-exact #portfolio .port-card picture > img[alt='Orientador de precios ML'] {
    object-position: 34% 18% !important;
  }

  .oriavision-web-exact #portfolio .port-card picture > img[alt='dbengotech'] {
    object-position: 38% 18% !important;
  }
}
`;



const WEB_CSS_MOBILE_PORTFOLIO_CONTAIN_V35 = `
/* V35: en celular mostrar completas las capturas del portfolio dentro del rectángulo, sin corte */
@media (max-width: 768px) {
  .oriavision-web-exact #portfolio .port-featured picture,
  .oriavision-web-exact #portfolio .port-card picture {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    aspect-ratio: 16 / 9 !important;
    overflow: hidden !important;
    background: #f4f7fb !important;
    padding: 10px !important;
    box-sizing: border-box !important;
  }

  .oriavision-web-exact #portfolio .port-featured picture > img,
  .oriavision-web-exact #portfolio .port-card picture > img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    object-position: center top !important;
    background: transparent !important;
    transform: none !important;
  }
}
`;


const WEB_CSS_MOBILE_HERO_TITLE_V36 = `
/* MOBILE HERO TITLE V36 /web: forzar 3 líneas correctas solo en celular */
@media (max-width: 768px) {
  .oriavision-web-exact .hero-h1 {
    font-size: clamp(44px, 8.8vw, 64px) !important;
    line-height: 0.98 !important;
    letter-spacing: -0.045em !important;
    margin-bottom: 18px !important;
  }

  .oriavision-web-exact .hero-h1 .h1-line {
    display: block !important;
    overflow: visible !important;
    white-space: nowrap !important;
  }

  .oriavision-web-exact .hero-h1 .h1-inner {
    display: block !important;
    white-space: nowrap !important;
  }

  .oriavision-web-exact .hero-h1 mark {
    white-space: nowrap !important;
  }
}
`;

const WEB_PORTFOLIO_LINK_FIX_V20 = `
/* V20: todas las cards del portfolio son links reales sin cambiar diseño. */
.oriavision-web-exact #portfolio a.port-featured,
.oriavision-web-exact #portfolio a.port-card {
  display: block;
  color: inherit;
  text-decoration: none;
}

.oriavision-web-exact #portfolio a.port-featured:focus-visible,
.oriavision-web-exact #portfolio a.port-card:focus-visible {
  outline: 3px solid rgba(30,200,240,.65);
  outline-offset: 4px;
}
`;


const WEB_CSS_CONVERSION_V37 = `
/* CONVERSION V37 /web: mejoras de conversión para tráfico de Meta Ads. No altera la estética base. */
.oriavision-web-exact .hero-support {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.6;
  margin-top: 18px;
  max-width: 470px;
  font-weight: 500;
  opacity: 0;
  animation: fadeUp .7s 1.24s cubic-bezier(.25,.46,.45,.94) forwards;
}

/* Franja de confianza cerca del inicio */
.oriavision-web-exact .conv-trust {
  background: var(--off);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 22px 0;
}
.oriavision-web-exact .conv-trust-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.oriavision-web-exact .conv-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 16px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--navy);
  box-shadow: 0 2px 8px rgba(10,31,110,.04);
}
.oriavision-web-exact .conv-pill::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--grad-h);
  flex-shrink: 0;
}

/* Bandas de CTA reutilizables */
.oriavision-web-exact .conv-cta-wrap { padding: 46px 0; }
.oriavision-web-exact .conv-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 28px 34px;
  border-radius: 20px;
  border: 1px solid var(--line);
  border-left: 4px solid var(--bright);
  background: linear-gradient(120deg, #F2F8FF 0%, #FFFFFF 78%);
  box-shadow: 0 6px 26px rgba(10,31,110,.05);
}
.oriavision-web-exact .conv-cta-top { margin-top: 18px; }
.oriavision-web-exact .conv-cta-text { max-width: 640px; }
.oriavision-web-exact .conv-cta-text strong {
  display: block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(18px, 2.3vw, 23px);
  font-weight: 800;
  color: var(--navy);
  letter-spacing: -.02em;
  line-height: 1.2;
}
.oriavision-web-exact .conv-cta-text span {
  display: block;
  font-size: 14px;
  color: var(--muted);
  margin-top: 7px;
  font-weight: 500;
  line-height: 1.6;
}

/* Botón WhatsApp verde (CTAs intermedios) */
.oriavision-web-exact .btn-wa {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 52px;
  padding: 0 26px;
  border-radius: 10px;
  background: #25D366;
  color: #ffffff !important;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: .02em;
  text-transform: uppercase;
  box-shadow: 0 8px 22px rgba(37,211,102,.28);
  transition: transform .2s, box-shadow .2s;
  white-space: nowrap;
  flex-shrink: 0;
}
.oriavision-web-exact .btn-wa:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(37,211,102,.4);
}

@media (max-width: 768px) {
  .oriavision-web-exact .hero-support { margin-top: 14px; font-size: 13px; max-width: 95%; }
  .oriavision-web-exact .conv-trust { padding: 18px 0; }
  .oriavision-web-exact .conv-trust-row { justify-content: flex-start; }
  .oriavision-web-exact .conv-pill { font-size: 12px; padding: 8px 13px; }
  .oriavision-web-exact .conv-cta-wrap { padding: 34px 0; }
  .oriavision-web-exact .conv-cta { flex-direction: column; align-items: flex-start; padding: 22px; }
  .oriavision-web-exact .conv-cta .btn-wa { width: 100%; }
}
`;

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

// Medición de clics a WhatsApp. Nunca bloquea ni rompe la navegación:
// si gtag / dataLayer no están cargados, el link funciona igual.
function trackWhatsAppClick(location: string) {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = {
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      content: params.get("utm_content") || "",
    };
    const detail = { event: "whatsapp_click", page: "web", location, ...utm };
    const w = window as AnalyticsWindow;
    if (typeof w.gtag === "function") {
      w.gtag("event", "whatsapp_click", { page: "web", location, ...utm });
    }
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push(detail);
    }
    window.dispatchEvent(new CustomEvent("whatsapp_click", { detail }));
  } catch {
    /* silencioso a propósito: la medición nunca debe afectar el click */
  }
}

export default function WebPage() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".oriavision-web-exact");
    if (!root) return;

    const loader = root.querySelector("#loader");
    const loaderTimer = window.setTimeout(() => loader?.classList.add("out"), 520);

    const progress = root.querySelector("#progress") as HTMLElement | null;
    const onScroll = () => {
      if (progress) {
        const max = document.body.scrollHeight - window.innerHeight;
        progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const revealObserver = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealObserver?.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 })
      : null;

    root.querySelectorAll(".rv, .wipe").forEach((el) => {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add("in");
    });

    const animatedCounters = new WeakSet<Element>();
    const animateCount = (el: Element) => {
      if (animatedCounters.has(el)) return;
      animatedCounters.add(el);
      const target = parseInt((el as HTMLElement).dataset.count || "0", 10);
      const prefix = (el as HTMLElement).dataset.prefix || "";
      const suffix = (el as HTMLElement).dataset.suffix || "";
      const duration = 1800;
      const step = 16;
      const increment = target / (duration / step);
      let current = 0;
      const timer = window.setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          window.clearInterval(timer);
        }
        el.textContent = prefix + Math.floor(current).toString() + suffix;
      }, step);
    };

    const counterObserver = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              counterObserver?.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 })
      : null;

    root.querySelectorAll("[data-count]").forEach((el) => {
      if (counterObserver) counterObserver.observe(el);
      else animateCount(el);
    });

    const magneticButtons = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magneticHandlers = magneticButtons.map((btn) => {
      const move = (event: Event) => {
        const mouse = event as MouseEvent;
        const rect = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(mouse.clientX - rect.left - rect.width / 2) * 0.22}px, ${(mouse.clientY - rect.top - rect.height / 2) * 0.22}px)`;

      };
      const leave = () => {
        btn.style.transform = "";
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      return { btn, move, leave };
    });

    const faqButtons = Array.from(root.querySelectorAll<HTMLElement>(".faq-item button, .faq-q"));
    const onFaqClick = (event: Event) => {
      const btn = event.currentTarget as HTMLElement;
      const item = btn.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      root.querySelectorAll(".faq-item.open").forEach((openItem) => openItem.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    };
    faqButtons.forEach((btn) => btn.addEventListener("click", onFaqClick));

    // Medición de clics a WhatsApp en los CTAs renderizados dentro del HTML.
    const waLinks = Array.from(root.querySelectorAll<HTMLElement>("a[data-wa]"));
    const onWaClick = (event: Event) => {
      const el = event.currentTarget as HTMLElement;
      trackWhatsAppClick(el.dataset.waLoc || "unknown");
    };
    waLinks.forEach((a) => a.addEventListener("click", onWaClick));

    return () => {
      window.clearTimeout(loaderTimer);
      window.removeEventListener("scroll", onScroll);
      revealObserver?.disconnect();
      counterObserver?.disconnect();
      magneticHandlers.forEach(({ btn, move, leave }) => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
      faqButtons.forEach((btn) => btn.removeEventListener("click", onFaqClick));
      waLinks.forEach((a) => a.removeEventListener("click", onWaClick));
    };
  }, []);

  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20Oriavision%2C%20vi%20la%20publicidad%20de%20p%C3%A1ginas%20web%20y%20quiero%20consultar%20por%20una%20web%20para%20mi%20negocio.";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: WEB_CSS + WEB_PORTFOLIO_LINK_FIX_V20 + WEB_CSS_MOBILE_FIX + WEB_CSS_MOBILE_FIX_V3 + WEB_CSS_MOBILE_FIX_V4 + WEB_CSS_MOBILE_FIX_V6 + WEB_CSS_DESKTOP_OPTIONS_FIX_V7 + WEB_CSS_MOBILE_RECT_FIX_V9 + WEB_CSS_MOBILE_PORTFOLIO_FIT_V10 + WEB_CSS_MOBILE_PORTFOLIO_IMAGES_V11 + WEB_CSS_MOBILE_PORTFOLIO_IMAGES_V12 + WEB_CSS_MOBILE_PORTFOLIO_CENTER_V34 + WEB_CSS_MOBILE_PORTFOLIO_CONTAIN_V35 + WEB_CSS_MOBILE_HERO_TITLE_V36 + WEB_CSS_CONVERSION_V37 }} />
      <div className="oriavision-web-exact" dangerouslySetInnerHTML={{ __html: WEB_HTML }} />

      <section id="formulario" className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <WebRequestForm />
        </div>
      </section>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar por WhatsApp"
        data-wa=""
        data-wa-loc="floating"
        onClick={() => trackWhatsAppClick("floating")}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] right-4 z-[9999] inline-flex items-center justify-center rounded-full bg-[#25D366] p-4 font-extrabold text-white shadow-2xl shadow-emerald-900/30 transition hover:-translate-y-1 hover:shadow-emerald-900/50 sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+24px)] sm:gap-2 sm:px-5 sm:py-3"
      >
        <WhatsAppIcon className="h-6 w-6" />

        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </>
  );
}

