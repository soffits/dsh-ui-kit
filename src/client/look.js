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
.uk-mention{padding:0 2px;border-radius:4px;color:${ACCENT};background:color-mix(in srgb,${ACCENT} 10%,transparent);font-weight:500}
.uk-mentionMe{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 24%,transparent)}
.uk-msg{display:flex;align-items:flex-end;gap:8px;min-width:0;animation:uk-msg-in .18s ease-out}
.uk-msg[data-side=end]{flex-direction:row-reverse}
.uk-msgBubble{display:flex;flex-direction:column;gap:6px;min-width:0;max-width:min(620px,86%);box-sizing:border-box;padding:10px 14px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-xl);background:var(--dsw-alias-bg-base);font-size:var(--dsh-content-font-size,14px);line-height:calc(22px + var(--dsh-content-font-delta,0px));overflow-wrap:anywhere;line-break:strict;transition:border-color .15s,box-shadow .15s}
.uk-msg[data-side=end] .uk-msgBubble{border-color:transparent;background:var(--dsw-specific-bubble)}
.uk-msg[data-highlight] .uk-msgBubble{border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 70%,transparent);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-state-warn-primary) 18%,transparent)}
.uk-msg[data-folded] .uk-msgBubble{flex-direction:row;align-items:center;padding:4px 12px;border:1px dashed var(--dsw-alias-border-l3);background:transparent;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px}
.uk-msgAuthor{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;min-width:0;font-size:13px;line-height:20px;font-weight:500;color:var(--dsw-alias-label-secondary)}
.uk-msgQuote{padding-left:8px;border-left:2px solid color-mix(in srgb,currentColor 35%,transparent);font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.uk-msgBody{min-width:0;white-space:pre-wrap}
.uk-msgFooter{display:flex;flex-wrap:wrap;align-items:center;gap:6px}
.uk-msgTime{flex:none;padding-bottom:2px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary));font-variant-numeric:tabular-nums;white-space:nowrap}
@keyframes uk-msg-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.uk-chatDivider{display:flex;align-items:center;justify-content:center;gap:10px;margin:4px 0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}
.uk-chatDivider span{display:inline-block;padding:1px 10px;border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.uk-chatDivider span::first-letter{text-transform:uppercase}
.uk-chatDivider[data-tone=accent]{color:${ACCENT}}
.uk-chatDivider[data-tone=accent]::before,.uk-chatDivider[data-tone=accent]::after{content:"";flex:1;height:.5px;background:color-mix(in srgb,${ACCENT} 55%,transparent)}
.uk-chatDivider[data-tone=accent] span{background:none;padding:0}
.uk-convo{display:flex;align-items:center;gap:12px;width:100%;min-height:56px;box-sizing:border-box;padding:8px 10px;border:0;border-radius:12px;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;transition:background-color .12s,transform .12s}
@media (hover:hover){.uk-convo:hover{background:var(--dsw-alias-interactive-bg-hover)}}
.uk-convo:active{transform:scale(.985);background:var(--dsw-alias-interactive-bg-hover)}
.uk-convo[aria-current=true]{background:var(--dsw-alias-bg-layer-2)}
.uk-convoIcon{flex:none;display:inline-flex}
.uk-convoMain{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
.uk-convoTop,.uk-convoBottom{display:flex;align-items:center;gap:6px;min-width:0}
.uk-convoTitle{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary)}
.uk-convo[data-unread] .uk-convoTitle{font-weight:500}
.uk-convoTime{flex:none;margin-left:auto;padding-left:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap}
.uk-convoPreview{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary)}
.uk-convoCount,.uk-convoMention{flex:none;min-width:18px;height:18px;box-sizing:border-box;padding:0 5px;border-radius:9px;background:${ACCENT};color:#fff;font-size:11px;font-weight:600;line-height:18px;text-align:center;font-variant-numeric:tabular-nums}
.uk-convoCount[data-quiet]{background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-secondary)}
.uk-convoMention{background:var(--dsw-alias-state-error-primary)}
.uk-composer{position:relative;display:flex;flex-direction:column;gap:6px;min-width:0}
.uk-composerRow{display:flex;align-items:flex-end;gap:6px;padding:6px 6px 6px 8px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-xl);background:var(--dsw-alias-bg-base);transition:border-color .15s}
.uk-composerRow:focus-within{border-color:${ACCENT}}
.uk-composerInput{flex:1;min-width:0;min-height:32px;max-height:168px;box-sizing:border-box;margin:0;padding:5px 4px;border:0;outline:0;resize:none;background:transparent;color:inherit;font:inherit;font-size:var(--dsh-content-font-size,14px);line-height:22px;line-break:strict}
.uk-composerAt{flex:none;min-width:32px;font-weight:600}
.uk-composerSend{flex:none}
.uk-composerQuote,.uk-composerTo,.uk-composerError{display:flex;align-items:center;gap:6px;min-width:0;padding:0 8px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}
.uk-composerQuote>span:first-child{flex:1;min-width:0;padding-left:8px;border-left:2px solid ${ACCENT};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uk-composerError{color:var(--dsw-alias-state-error-primary)}
.uk-picker{position:absolute;left:0;right:0;bottom:calc(100% + 6px);z-index:20;max-height:min(320px,50vh);overflow:auto;padding:4px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-base);box-shadow:0 8px 28px rgba(0,0,0,.14);animation:uk-msg-in .12s ease-out}
.uk-pickerItem{display:flex;align-items:center;gap:8px;width:100%;min-height:36px;padding:6px 10px;border:0;border-radius:8px;background:none;color:inherit;font:inherit;font-size:14px;text-align:left;cursor:pointer}
.uk-pickerItem[aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover)}
.uk-pickerName{flex:none;max-width:50%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uk-pickerToken,.uk-pickerDetail{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:var(--dsw-alias-label-tertiary)}
.uk-pickerDetail{flex:1;text-align:right}
.uk-pickerEmpty{padding:8px 10px;font-size:13px;color:var(--dsw-alias-label-tertiary)}
/* Chrome is not selectable; message text is. */
.uk-msgAuthor,.uk-msgTime,.uk-chatDivider,.uk-convo,.uk-picker,.uk-composerTo,.uk-composerQuote,.uk-msg[data-folded]{-webkit-user-select:none;user-select:none}
.uk-msgBody{-webkit-user-select:text;user-select:text}
@media (pointer:coarse){.uk-pickerItem{min-height:44px}.uk-composerAt,.uk-composerSend{min-height:40px;min-width:40px}.uk-composerInput{min-height:40px;padding-block:9px}}
@media (width<=420px){.uk-composerSendText{display:none}}
@media (prefers-reduced-motion:reduce){.uk-msg,.uk-picker{animation:none}.uk-convo,.uk-convo:active{transition:none;transform:none}}
@media (pointer:coarse){.uk-touch{min-height:40px}}
`
