/* Fallback line illustrations, one per technology family. Used when a
   photo cannot load (offline, blocked host) so every card still shows
   what kind of machine the project runs. Colours come from CSS tokens. */
window.ILLUSTRATIONS = (function () {
  const wrap = (inner) => `<svg viewBox="0 0 160 100" class="illus" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  return {
    sidewalk: wrap(`<path d="M10 82h140" opacity=".35"/><rect x="42" y="34" width="66" height="34" rx="9"/><path d="M52 34v-6h46v6"/><circle cx="56" cy="72" r="8"/><circle cx="80" cy="72" r="8"/><circle cx="104" cy="72" r="8"/><path d="M58 48h16M58 55h30"/><circle cx="96" cy="46" r="3" fill="currentColor" stroke="none"/><path d="M116 40l10-8M118 50h12"/>`),
    road: wrap(`<path d="M10 84h140" opacity=".35"/><path d="M30 70V48q0-8 8-8h58l20 12h16q6 0 6 6v12"/><path d="M40 40l8-12h46l14 12"/><circle cx="52" cy="72" r="9"/><circle cx="112" cy="72" r="9"/><path d="M62 52h34M62 60h24"/><rect x="24" y="22" width="18" height="10" rx="2"/><path d="M33 22v-6"/>`),
    drone: wrap(`<path d="M20 26l24 12M140 26l-24 12"/><ellipse cx="32" cy="26" rx="18" ry="4"/><ellipse cx="128" cy="26" rx="18" ry="4"/><rect x="56" y="36" width="48" height="16" rx="6"/><path d="M80 52v22"/><rect x="66" y="74" width="28" height="18" rx="3"/><path d="M60 44h-8M108 44h8"/><circle cx="80" cy="44" r="3" fill="currentColor" stroke="none"/>`),
    middle: wrap(`<path d="M8 82h144" opacity=".35"/><rect x="18" y="32" width="72" height="40" rx="3"/><path d="M90 46h30q10 0 14 8l8 12v6H90z"/><circle cx="40" cy="76" r="8"/><circle cx="118" cy="76" r="8"/><path d="M96 52h22l6 10H96z"/><path d="M30 44h30M30 52h48"/><path d="M114 30l6-8M124 34l8-6"/>`),
    instore: wrap(`<path d="M12 86h136" opacity=".35"/><path d="M20 14v72M20 26h40M20 44h40M20 62h40" opacity=".55"/><rect x="88" y="20" width="30" height="58" rx="8"/><path d="M96 34h14M96 44h14M96 54h14"/><circle cx="103" cy="24" r="0"/><path d="M84 80h38"/><circle cx="92" cy="82" r="4"/><circle cx="114" cy="82" r="4"/><path d="M118 40l16-8M118 56l16 0" opacity=".7"/>`),
    mfc: wrap(`<path d="M16 30h128M16 50h128M16 70h128M40 20v60M72 20v60M104 20v60M136 20v60M16 20v60" opacity=".45"/><rect x="44" y="34" width="24" height="12" rx="2" fill="currentColor" stroke="none" opacity=".9"/><rect x="108" y="54" width="24" height="12" rx="2" fill="currentColor" stroke="none" opacity=".9"/><path d="M78 40h24l-6-4M102 40l-6 4"/>`),
  };
})();
