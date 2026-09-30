/** @param {number} p @param {number} t */
export function qualityPercent(p,t){if(!Number.isFinite(p)||!Number.isFinite(t)||t<=0)return 0;return Math.round(p/t*100)}
/** @param {string} p */
export function safePath(p){return !/(^|\/)\.env$|\.(pem|key)$/i.test(p)}
