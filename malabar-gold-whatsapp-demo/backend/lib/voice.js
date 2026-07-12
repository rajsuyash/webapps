/*
 * Voice AI stubs (STT + multilingual TTS) for the WhatsApp voice-note experience.
 * DEMO: returns canned transcripts/synthesis metadata so flows are deterministic.
 * PRODUCTION: wire `transcribe()` to a speech-to-text provider (e.g. ASR with Indic-language
 * support) and `synthesize()` to a multilingual TTS voice. See docs/02-architecture.md §Voice AI.
 */
const SUPPORTED = ['en', 'hi', 'ta', 'te', 'ml', 'kn'];

const SAMPLE_TRANSCRIPTS = {
  ta: { text:'Vanakkam, en thangai kalyanathukku oru thali chain venum, budget oru lakh.', gloss:'Hello, I need a thali chain for my sister’s wedding, budget ₹1 lakh.' },
  ml: { text:'Namaskaram, ente ammaykku oru gold set venam, budget onnara lakh.', gloss:'Hello, I’d like a gold set for my mother, budget ₹1.5 lakh.' },
  hi: { text:'Mujhe Diwali ke liye sone ka sikka chahiye.', gloss:'I need a gold coin for Diwali.' },
};

// Mock speech-to-text. `audioRef` would be a WhatsApp media id in production.
async function transcribe(audioRef, langHint = 'auto') {
  const lang = SUPPORTED.includes(langHint) ? langHint : 'ta';
  const s = SAMPLE_TRANSCRIPTS[lang] || SAMPLE_TRANSCRIPTS.ta;
  return { lang, durationSec: 9, text: s.text, glossEn: s.gloss, confidence: 0.94, provider: 'stub-asr' };
}

// Mock text-to-speech. Returns metadata for a voice note the WhatsApp layer would attach.
async function synthesize(text, lang = 'en') {
  return {
    lang: SUPPORTED.includes(lang) ? lang : 'en',
    durationSec: Math.max(4, Math.round(text.length / 14)),
    voice: `malabar-maya-${lang}`,
    mediaType: 'audio/ogg; codecs=opus',
    provider: 'stub-tts',
    note: 'Demo stub — no audio rendered. Wire to a multilingual TTS voice in production.',
  };
}

module.exports = { transcribe, synthesize, SUPPORTED };
