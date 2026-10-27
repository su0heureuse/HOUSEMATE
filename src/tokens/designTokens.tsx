import React from 'react';

export const DesignTokensStyle: React.FC = () => (
  <style>{`
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

    :root {
      /* Primary Colors (절제된 그린) */
      --color-primary: #2F7D5B;
      --color-primary-hover: #256649;
      --color-primary-soft: #E8F4EE;

      /* Status Colors (긴급/주의 상태에만 절제하여 사용) */
      --color-status-normal: #2F7D5B;
      --color-status-normal-soft: #E8F4EE;
      --color-status-warning: #E39B1B;
      --color-status-warning-soft: #FDF5E6;
      --color-status-urgent: #DC4A3F;
      --color-status-urgent-soft: #FCECEB;

      /* Backgrounds (90% 오프화이트 & 화이트) */
      --bg-app: #FAF8F5;
      --bg-card: #FFFFFF;
      --bg-subtle: #F4F1EC;
      --border-hairline: #EEEAE4;

      /* Text Colors (또렷한 위계) */
      --text-primary: #1F2420;
      --text-secondary: #6B726D;
      --text-disabled: #A3A9A5;
      --text-on-primary: #FFFFFF;

      /* Typography (Pretendard 5단계, 굵기 400 / 600 만 사용) */
      --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
      --fs-hero-num: 38px;
      --fs-hero-title: 24px;
      --fs-title: 20px;
      --fs-card-title: 16px;
      --fs-body: 14px;
      --fs-sub: 13px;
      --fs-caption: 12px;

      /* Generous Spacing (1.5배 넉넉한 여백) */
      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-5: 22px;
      --space-6: 28px;
      --space-8: 40px;

      /* Border Radius (카드 20px) */
      --radius-chip: 6px;
      --radius-btn: 12px;
      --radius-card: 20px;
      --radius-sheet: 24px;

      /* Subtle Elevation (테두리 없이 아주 옅은 그림자) */
      --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.04);
      --shadow-floating: 0 8px 28px rgba(0, 0, 0, 0.10);

      /* Touch Target */
      --touch-min: 44px;
    }

    .dark-theme {
      --color-primary: #3B9B71;
      --color-primary-hover: #2F7D5B;
      --color-primary-soft: rgba(59, 155, 113, 0.14);

      --color-status-normal: #47B283;
      --color-status-normal-soft: rgba(71, 178, 131, 0.14);
      --color-status-warning: #F0AD32;
      --color-status-warning-soft: rgba(240, 173, 50, 0.14);
      --color-status-urgent: #E86258;
      --color-status-urgent-soft: rgba(232, 98, 88, 0.14);

      --bg-app: #121512;
      --bg-card: #1C201D;
      --bg-subtle: #232824;
      --border-hairline: #282E29;

      --text-primary: #ECEFEC;
      --text-secondary: #9CA39E;
      --text-disabled: #5E6560;
      --text-on-primary: #FFFFFF;

      --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.28);
      --shadow-floating: 0 12px 32px rgba(0, 0, 0, 0.50);
    }

    * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      margin: 0;
      font-family: var(--font-sans);
      background-color: var(--bg-app);
      color: var(--text-primary);
      font-size: var(--fs-body);
      font-weight: 400;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    .tabular-nums {
      font-variant-numeric: tabular-nums;
    }

    /* 타이포그래피 위계 (굵기 400 / 600 엄수) */
    .t-hero-num {
      font-size: var(--fs-hero-num);
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }
    .t-hero-title {
      font-size: var(--fs-hero-title);
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: -0.02em;
    }
    .t-title {
      font-size: var(--fs-title);
      font-weight: 600;
      line-height: 1.35;
      letter-spacing: -0.02em;
    }
    .t-card-title {
      font-size: var(--fs-card-title);
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: -0.02em;
    }
    .t-body {
      font-size: var(--fs-body);
      font-weight: 400;
      line-height: 1.5;
    }
    .t-body-semibold {
      font-size: var(--fs-body);
      font-weight: 600;
      line-height: 1.5;
    }
    .t-sub {
      font-size: var(--fs-sub);
      font-weight: 400;
      line-height: 1.45;
      color: var(--text-secondary);
    }
    .t-caption {
      font-size: var(--fs-caption);
      font-weight: 400;
      line-height: 1.4;
    }
    .t-caption-semibold {
      font-size: var(--fs-caption);
      font-weight: 600;
      line-height: 1.4;
    }

    /* 프리미엄 카드: 테두리 없음 + 흰 배경 + 아주 옅은 그림자 + 라운드 20px + 안쪽 여백 24px */
    .ui-card {
      background-color: var(--bg-card);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
      padding: var(--space-5) var(--space-6);
      transition: transform 200ms ease-out, background-color 200ms ease-out, opacity 200ms ease-out;
    }
    .ui-card-interactive:active {
      transform: scale(0.98);
    }

    .ui-card-highlight {
      box-shadow: 0 0 0 1.5px var(--color-primary), var(--shadow-floating);
    }

    /* 행 단위 얇은 리스트 (박스 중첩 금지, 행 사이 #EEEAE4 구분선) */
    .thin-list-container {
      background-color: var(--bg-card);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
      padding: var(--space-2) var(--space-5);
    }
    .thin-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
      padding: 16px 0;
      border-bottom: 1px solid var(--border-hairline);
      transition: transform 200ms ease-out, opacity 200ms ease-out, max-height 200ms ease-out;
    }
    .thin-row:last-child {
      border-bottom: none;
    }
    .thin-row-clickable {
      cursor: pointer;
    }
    .thin-row-clickable:active {
      transform: scale(0.98);
    }

    /* 리스트 순차 페이드인 (40ms 간격) */
    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .stagger-item {
      animation: fadeSlideUp 200ms ease-out both;
    }

    /* 완료되어 사라지는 카드/행 전환 */
    .collapsing-item {
      opacity: 0;
      transform: scale(0.96);
      max-height: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      overflow: hidden;
      transition: all 200ms ease-out;
    }

    /* 절제된 상태 칩 (필요한 곳에만 작고 연하게) */
    .ui-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: var(--radius-chip);
      font-size: var(--fs-caption);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .ui-chip-normal { color: var(--color-status-normal); background-color: var(--color-status-normal-soft); }
    .ui-chip-warning { color: var(--color-status-warning); background-color: var(--color-status-warning-soft); }
    .ui-chip-urgent { color: var(--color-status-urgent); background-color: var(--color-status-urgent-soft); }
    .ui-chip-subtle { color: var(--text-secondary); background-color: var(--bg-subtle); font-weight: 400; }

    /* 버튼 (Primary 초록 통일 + 아웃라인/텍스트 보조 버튼, 200ms ease-out, active scale 0.98) */
    .ui-btn {
      min-height: var(--touch-min);
      padding: 0 var(--space-4);
      border-radius: var(--radius-btn);
      font-size: var(--fs-body);
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      cursor: pointer;
      transition: transform 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out;
      border: 1px solid transparent;
      font-family: inherit;
    }
    .ui-btn:active {
      transform: scale(0.98);
    }
    .ui-btn-primary {
      background-color: var(--color-primary);
      color: var(--text-on-primary);
    }
    .ui-btn-primary:hover {
      background-color: var(--color-primary-hover);
    }
    .ui-btn-outline {
      background-color: transparent;
      border-color: var(--border-hairline);
      color: var(--text-primary);
    }
    .ui-btn-outline:hover {
      background-color: var(--bg-subtle);
    }
    .ui-btn-text {
      background-color: transparent;
      border-color: transparent;
      color: var(--text-secondary);
      padding: 0 var(--space-2);
    }
    .ui-btn-text:hover {
      color: var(--text-primary);
    }
    .ui-btn-icon {
      min-width: var(--touch-min);
      min-height: var(--touch-min);
      padding: 0;
      border-radius: var(--radius-btn);
      background-color: transparent;
      color: var(--text-secondary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: transform 200ms ease-out, color 200ms ease-out, background-color 200ms ease-out;
    }
    .ui-btn-icon:hover {
      color: var(--text-primary);
      background-color: var(--bg-subtle);
    }
    .ui-btn-icon:active {
      transform: scale(0.98);
    }

    /* 체크리스트 팝 애니메이션 + 왼쪽->오른쪽 취소선 */
    @keyframes checkPop {
      0% { transform: scale(0.8); }
      50% { transform: scale(1.18); }
      100% { transform: scale(1); }
    }
    .check-box-pop {
      animation: checkPop 200ms ease-out;
    }

    .strike-animated {
      position: relative;
      display: inline-block;
      transition: color 200ms ease-out;
    }
    .strike-animated::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      height: 1.5px;
      background-color: var(--text-disabled);
      width: 0%;
      transition: width 200ms ease-out;
    }
    .strike-animated.is-done {
      color: var(--text-disabled);
    }
    .strike-animated.is-done::after {
      width: 100%;
    }

    @keyframes shimmerPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.45; }
    }
    .skeleton-box {
      background-color: var(--bg-subtle);
      border-radius: var(--radius-btn);
      animation: shimmerPulse 1.4s infinite ease-in-out;
    }

    .os-widget-card {
      background-color: var(--bg-card);
      border-radius: var(--radius-sheet);
      box-shadow: var(--shadow-floating);
      padding: var(--space-5);
      transition: all 200ms ease-out;
    }

    .fridge-fab-wrapper {
      position: fixed;
      right: var(--space-5);
      bottom: 84px;
      z-index: 42;
    }

    /* 레이아웃 쉘 */
    .app-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--bg-app);
      color: var(--text-primary);
    }
    .desktop-sidebar {
      display: none;
    }
    .mobile-bottom-nav {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var(--bg-card);
      border-top: 1px solid var(--border-hairline);
      padding: var(--space-1) var(--space-2);
      z-index: 40;
      justify-content: space-around;
    }
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      padding-bottom: 96px;
    }
    .content-container {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      padding: var(--space-5) var(--space-4);
    }

    .section-grid-2 {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-5);
    }
    .section-grid-3 {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }

    @media (min-width: 768px) {
      .content-container {
        padding: var(--space-6);
      }
      .section-grid-2 {
        grid-template-columns: repeat(2, 1fr);
      }
      .section-grid-3 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1200px) {
      .app-shell {
        flex-direction: row;
      }
      .desktop-sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 256px;
        background-color: var(--bg-card);
        border-right: 1px solid var(--border-hairline);
        padding: var(--space-6) var(--space-5);
        flex-shrink: 0;
        position: sticky;
        top: 0;
        height: 100vh;
      }
      .mobile-bottom-nav {
        display: none;
      }
      .main-area {
        padding-bottom: var(--space-8);
      }
      .content-container {
        padding: var(--space-6) var(--space-8);
      }
      .section-grid-3 {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-5);
      }
      .fridge-fab-wrapper {
        right: var(--space-8);
        bottom: var(--space-8);
      }
    }

    /* 홈 전용 미니멀 오늘 화면 */
    .home-active {
      --bg-app: #F4F2EE;
      --bg-card: #FFFFFF;
      --text-primary: #1C1C1E;
      --text-secondary: #8A8A8E;
      --border-hairline: #E7E4DE;
      --color-primary: #2F7D5B;
      --color-primary-soft: #E6F2EC;
      font-family: var(--font-sans);
      font-weight: 400;
    }
    .dark-theme.home-active {
      --bg-app: #000000;
      --bg-card: #1C1C1E;
      --text-primary: #F2F2F7;
      --text-secondary: #98989D;
      --border-hairline: #2C2C2E;
      --color-primary: #4FB88A;
      --color-primary-soft: #16302A;
      --text-on-primary: #FFFFFF;
    }
    .home-active .desktop-sidebar { background: var(--bg-app); border-right: 0; }
    .home-active .home-sidebar-actions { display: none; }
    .home-active .home-sidebar-settings { display: none; }
    .home-active .home-content-container {
      width: 100%; max-width: 960px; padding: 20px 20px 32px;
      margin: 0 auto; box-sizing: border-box;
    }
    .home-screen { display: flex; flex-direction: column; gap: 24px; }
    .home-title-row { display: flex; align-items: center; justify-content: space-between; min-height: 56px; }
    .home-title-copy { display: flex; flex-direction: column; gap: 2px; }
    .home-date { margin: 0; color: var(--text-secondary); font-size: 13px; line-height: 18px; font-weight: 400; }
    .home-title { margin: 0; color: var(--text-primary); font-size: 32px; line-height: 38px; font-weight: 600; letter-spacing: -0.02em; }
    .home-title-actions { display: flex; align-items: center; gap: 8px; }
    .home-streak { display: inline-flex; align-items: center; justify-content: center; gap: 4px; min-height: 30px; padding: 0 10px; border-radius: 999px; background: var(--bg-card); color: var(--text-secondary); font-size: 12px; font-weight: 600; }
    .home-streak svg { color: var(--color-primary); }
    .home-bell { width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 12px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: transform 280ms cubic-bezier(.32,.72,0,1); }
    .home-hero-card { padding: 20px; border-radius: 20px; background: var(--bg-card); box-shadow: none; border: 0; }
    .home-hero-status { display: flex; align-items: center; gap: 7px; color: var(--color-primary); font-size: 12px; line-height: 17px; font-weight: 400; }
    .home-status-dot { width: 7px; height: 7px; flex: 0 0 7px; border-radius: 50%; background: var(--color-primary); }
    .home-hero-status.is-urgent { color: var(--color-status-urgent); }
    .home-hero-status.is-urgent .home-status-dot { background: var(--color-status-urgent); }
    .home-hero-title { margin: 10px 0 4px; color: var(--text-primary); font-size: 21px; line-height: 28px; font-weight: 600; letter-spacing: -0.02em; }
    .home-hero-description { margin: 0 0 18px; color: var(--text-secondary); font-size: 13px; line-height: 19px; font-weight: 400; }
    .home-hero-button { width: 100%; min-height: 46px; border-radius: 12px; box-shadow: none; }
    .home-today-section { display: flex; flex-direction: column; gap: 10px; }
    .home-section-label { margin: 0; color: var(--text-secondary); font-size: 13px; line-height: 18px; font-weight: 400; }
    .home-quick-list { overflow: hidden; border: 0; border-radius: 16px; background: var(--bg-card); box-shadow: none; }
    .home-quick-row { position: relative; width: 100%; min-height: 60px; display: flex; align-items: center; gap: 12px; padding: 8px 14px; border: 0; background: transparent; color: var(--text-primary); text-align: left; cursor: pointer; transition: transform 280ms cubic-bezier(.32,.72,0,1), background-color 280ms cubic-bezier(.32,.72,0,1); }
    .home-quick-row:not(:last-child)::after { content: ''; position: absolute; right: 0; bottom: 0; left: 58px; height: .5px; background: var(--border-hairline); }
    .home-quick-icon { width: 30px; height: 30px; flex: 0 0 30px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; background: var(--color-primary-soft); color: var(--color-primary); }
    .home-quick-title { min-width: 0; flex: 1; font-size: 15px; line-height: 20px; font-weight: 400; }
    .home-quick-status { color: var(--text-secondary); font-size: 15px; line-height: 20px; font-weight: 400; white-space: nowrap; }
    .home-quick-status.is-urgent { color: var(--color-status-urgent); }
    .home-quick-status.is-today { color: var(--color-primary); }
    .home-quick-chevron { width: 16px; height: 16px; flex: 0 0 16px; color: var(--text-secondary); }
    .home-plan-section { display: flex; flex-direction: column; gap: 8px; }
    .home-next-action { min-height: 78px; padding: 12px 16px; border-radius: 18px; background: var(--bg-card); }
    .home-next-action-button { width: 100%; min-height: 52px; display: flex; align-items: center; gap: 12px; border: 0; padding: 0; background: transparent; color: var(--text-primary); text-align: left; cursor: pointer; border-radius: 10px; }
    .home-next-action-content { min-height: 52px; display: flex; align-items: center; gap: 12px; }
    .home-next-dot { width: 9px; height: 9px; flex: 0 0 9px; border-radius: 50%; background: #98989D; }
    .home-next-dot.is-pulsing { background: var(--color-primary); animation: home-dot-pulse 1.5s ease-in-out infinite; }
    @keyframes home-dot-pulse { 0%,100% { opacity: 1; } 50% { opacity: .38; } }
    .home-next-copy { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 1px; }
    .home-next-label { color: var(--text-secondary); font-size: 12px; line-height: 16px; font-weight: 400; }
    .home-next-title { overflow: hidden; color: var(--text-primary); font-size: 15px; line-height: 21px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
    .home-next-go { min-width: 46px; min-height: 32px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: var(--color-primary-soft); color: var(--color-primary); font-size: 13px; font-weight: 600; }
    .home-room-scene { position: relative; width: 100%; aspect-ratio: 1.25; overflow: hidden; isolation: isolate; }
    .home-room-art { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: contain; transform: scale(1.3); clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
    .home-hotspot { position: absolute; z-index: 2; min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; padding: 0; transform: translateY(-50%); border: 0; border-radius: 12px; background: transparent; color: var(--text-primary); cursor: grab; user-select: none; touch-action: none; }
    .home-hotspot:active { cursor: grabbing; }
    .home-hotspot-hit { position: absolute; inset: 0; min-width: 44px; min-height: 44px; border-radius: 12px; }
    .home-hotspot-pill { position: relative; z-index: 1; height: 24px; display: inline-flex; align-items: center; gap: 5px; padding: 3px 4px 3px 8px; border-radius: 12px; background: #FFFFFF; color: #1C1C1E; box-shadow: 0 1px 5px rgba(0,0,0,.10); white-space: nowrap; font-size: 12px; line-height: 18px; font-weight: 600; }
    .home-hotspot-icon { display: none; }
    .home-hotspot-count { width: 18px; height: 18px; flex: 0 0 18px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: #FFFFFF; font-size: 10px; line-height: 18px; font-weight: 600; }
    .home-hotspot-count.tone-urgent, .tone-dot.urgent { background: #E0564B; }
    .home-hotspot-count.tone-today, .tone-dot.today { background: #2F7D5B; }
    .home-hotspot-count.tone-count, .tone-dot.count { background: #3A3A3C; }
    .home-hotspot.is-highlighted { z-index: 5; }
    .home-hotspot.is-highlighted .home-hotspot-pill { background: var(--color-primary); color: #FFFFFF; box-shadow: none; }
    .home-hotspot.is-highlighted .home-hotspot-count { background: rgba(255,255,255,.22); color: #FFFFFF; }
    .home-hotspot-ripple { position: absolute; z-index: 0; bottom: 0; left: 50%; width: 36px; height: 12px; border: 2px solid var(--color-primary); border-radius: 50%; transform: translate(-50%, 25%); animation: home-room-ripple 1.6s ease-out infinite; }
    @keyframes home-room-ripple { 0% { transform: translate(-50%, 25%) scale(.8); opacity: .9; } 100% { transform: translate(-50%, 25%) scale(1.25); opacity: 0; } }
    .home-hotspot-caption { position: absolute; top: calc(100% + 2px); left: 50%; z-index: 8; max-width: 220px; padding: 5px 8px; border-radius: 8px; background: var(--bg-card); color: var(--text-secondary); font-size: 11px; line-height: 15px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,.08); transform: translateX(-50%); }
    .home-room-hint { min-height: 18px; margin: 0; color: var(--text-secondary); text-align: center; font-size: 12px; line-height: 18px; }
    .home-drag-hint { position: fixed; z-index: 60; pointer-events: none; padding: 8px 12px; border-radius: 12px; background: var(--color-primary); color: #FFFFFF; font-size: 12px; line-height: 16px; font-weight: 600; box-shadow: 0 4px 18px rgba(0,0,0,.16); }
    .home-room-legend { display: flex; align-items: center; justify-content: center; gap: 14px; color: var(--text-secondary); font-size: 12px; line-height: 18px; }
    .home-room-legend span { display: inline-flex; align-items: center; gap: 5px; }
    .tone-dot { width: 8px; height: 8px; display: inline-block; border-radius: 50%; }
    .home-room-complete { position: absolute; top: 58%; left: 52%; z-index: 4; width: 34px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 12px 12px 12px 2px; background: var(--bg-card); color: var(--color-primary); box-shadow: 0 2px 8px rgba(0,0,0,.10); transform: translate(-50%,-50%); }
    .home-room-complete span { font-size: 18px; font-weight: 600; }
    .home-active .home-quick-list { margin-top: 0; }
    .home-active .mobile-bottom-nav { background: color-mix(in srgb, var(--bg-card) 82%, transparent); border-top: .5px solid var(--border-hairline); padding-bottom: calc(var(--space-1) + env(safe-area-inset-bottom)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
    .home-active .mobile-bottom-nav button { transition: color 280ms cubic-bezier(.32,.72,0,1), transform 280ms cubic-bezier(.32,.72,0,1); }
    .home-active .mobile-bottom-nav button:active, .home-quick-row:active, .home-bell:active, .home-hero-button:active { transform: scale(.97); }
    .home-active button, .home-active .ui-btn { transition-duration: 280ms; transition-timing-function: cubic-bezier(.32,.72,0,1); }
    @media (prefers-reduced-motion: reduce) { .home-hotspot-ripple, .home-next-dot.is-pulsing { animation: none !important; } }
    .sheet-handle { width: 36px; height: 5px; margin: 0 auto 12px; border-radius: 999px; background: var(--text-disabled); opacity: .55; }
    @media (min-width: 768px) and (max-width: 1199px) { .home-active .home-content-container { padding: 24px 20px 32px; } }
    @media (min-width: 1200px) { .home-active .home-content-container { max-width: 960px; padding: 32px 20px; } }
    @media (max-width: 390px) { .home-active .home-content-container { padding-right: 20px; padding-left: 20px; } .home-quick-row { gap: 9px; padding-right: 11px; padding-left: 11px; } .home-quick-status { font-size: 14px; } .home-hotspot-pill { font-size: 12px; } .home-room-scene { aspect-ratio: 1; } .home-room-art { transform: scale(1.45); } .home-room-legend { gap: 9px; font-size: 11px; } }
  `}</style>
);
