/** Styles. Colours only through DSH theme tokens, so light and dark follow the Web UI. */

export const STYLE_ID = 'dsh-ui-kit-style'

const ACCENT = 'var(--dsw-alias-state-business-primary)'

export const CSS = `
.uk-icon{flex:none;display:inline-block;vertical-align:middle}
.uk-tile{flex:none;display:inline-grid;place-items:center;width:var(--uk-size);height:var(--uk-size);border-radius:calc(var(--uk-size) * .3);background:color-mix(in srgb,currentColor 13%,transparent)}
.uk-chip{gap:5px;max-width:100%;min-width:0}
.uk-chip .uk-icon{margin-left:-2px}
.uk-chipText{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uk-time{font-variant-numeric:tabular-nums;white-space:nowrap}
.uk-countdown{font-variant-numeric:tabular-nums}
.uk-countdown-big{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:0 10px}
.uk-countdownPart b{font-size:40px;font-weight:600;line-height:44px;letter-spacing:-.02em}
.uk-countdownPart small{margin-left:3px;font-size:16px;font-weight:500;color:var(--dsw-alias-label-secondary)}
@media (width<=640px){.uk-countdownPart b{font-size:34px;line-height:38px}}
.uk-ring{position:relative;flex:none;display:inline-grid;place-items:center}
.uk-ring svg{position:absolute;inset:0;overflow:visible}
.uk-ringTrack{fill:none;stroke:var(--dsw-alias-border-l2)}
.uk-ringText{position:relative;display:flex;flex-direction:column;align-items:center;font-size:13px;font-weight:600;line-height:1.15;text-align:center;font-variant-numeric:tabular-nums}
.uk-ringText small{font-size:10px;font-weight:500;color:var(--dsw-alias-label-tertiary)}
.uk-spark{display:block;min-width:0}
.uk-spark svg{display:block;overflow:visible}
.uk-sparkDot{stroke:var(--dsw-alias-bg-base);stroke-width:1.5}
.uk-progress{display:flex;align-items:center;min-width:0}
.uk-progressLabelled{gap:10px}
.uk-progressTrack{position:relative;flex:1;min-width:24px;height:6px;border-radius:3px;background:var(--dsw-alias-border-l2);overflow:hidden}
.uk-progressFill{position:absolute;inset:0 auto 0 0;border-radius:3px}
.uk-progressLabel{flex:none;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap}
.uk-live{display:inline-flex;align-items:center;gap:6px;min-width:0}
.uk-live>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uk-wash{position:relative;animation:uk-wash 2s ease-out}
.uk-washAgain{animation-name:uk-wash-again}
.uk-wash::before{content:"";position:absolute;left:0;top:6px;bottom:6px;width:3px;border-radius:2px;background:${ACCENT};animation:uk-wash-bar 2s ease-out forwards;pointer-events:none}
@keyframes uk-wash{0%,40%{background-color:color-mix(in srgb,${ACCENT} 9%,transparent)}100%{background-color:transparent}}
@keyframes uk-wash-again{0%,40%{background-color:color-mix(in srgb,${ACCENT} 9%,transparent)}100%{background-color:transparent}}
@keyframes uk-wash-bar{0%,60%{opacity:1}100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.uk-wash,.uk-washAgain{animation:none}.uk-wash::before{display:none}}
.uk-justNow{font-size:11px;font-weight:500;line-height:16px;color:${ACCENT};white-space:nowrap}
.uk-newDot{flex:none;display:inline-block;width:7px;height:7px;border-radius:50%;background:${ACCENT}}
.uk-history ol{margin:8px 0 0;padding:0 0 0 12px;list-style:none;border-left:.5px solid var(--dsw-alias-border-l3);display:flex;flex-direction:column;gap:2px}
.uk-history li{display:flex;gap:10px;min-width:0;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary)}
.uk-history time{flex:none;min-width:38px;font-size:12px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
.uk-history li span{min-width:0;overflow-wrap:anywhere}
.uk-historyToggle{margin:4px 0 0 4px}
.uk-suggested{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding-top:10px;border-top:.5px dashed var(--dsw-alias-border-l3)}
.uk-suggestedLabel{display:inline-flex;align-items:center;gap:5px;margin-right:2px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}
.uk-suggested .ua-bar{display:contents}
.uk-surface{position:relative;isolation:isolate;overflow:hidden;min-width:0;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-xl);background:var(--dsw-alias-bg-layer-1)}
.uk-surfaceBackdropped{background:var(--dsw-alias-bg-base)}
.uk-surfaceBackdrop{position:absolute;inset:-48px;z-index:-2;background:center/cover no-repeat;filter:blur(40px) saturate(1.4);opacity:.5;pointer-events:none}
.uk-surfaceBackdropped::before{content:"";position:absolute;inset:0;z-index:-1;background:color-mix(in srgb,var(--dsw-alias-bg-base) 62%,transparent);pointer-events:none}
.uk-segmentsLabelled{display:flex;align-items:center;gap:10px;min-width:0}
.uk-segments{flex:1;display:flex;gap:3px;min-width:0}
.uk-segment{flex:1 1 0;min-width:2px;height:5px;border-radius:3px;background:var(--dsw-alias-border-l2)}
.uk-segment[data-state=done]{background:${ACCENT}}
.uk-segment[data-state=current]{background:color-mix(in srgb,${ACCENT} 45%,transparent)}
.uk-segment[data-state=ready]{background:color-mix(in srgb,var(--dsw-alias-label-tertiary) 45%,transparent)}
.uk-segmentsEnd{flex:none;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);white-space:nowrap}
@media (pointer:coarse){.uk-touch{min-height:40px}}
`
