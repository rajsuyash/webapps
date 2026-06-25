/*
 * RAG retriever (server). Mirrors js/engine/rag.js.
 * Demo uses keyword scoring over a curated knowledge base. In production this is
 * embeddings + a vector store (see docs/02-architecture.md). Swap `retrieve()` for a
 * vector-similarity call and the rest of the pipeline is unchanged.
 */
const { KNOWLEDGE } = require('./data');

function retrieve(query, k = 2) {
  const q = String(query || '').toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/).filter(Boolean);
  return KNOWLEDGE.map(doc => {
    let s = 0;
    doc.tags.forEach(t => { if (q.includes(t)) s += 3; });
    tokens.forEach(tok => { if (doc.tags.some(t => t.includes(tok)) || doc.text.toLowerCase().includes(tok)) s += 1; });
    return { doc, score: s };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, k).map(x => ({ ...x.doc, score: x.score }));
}

function answer(query) {
  const hits = retrieve(query, 1);
  if (!hits.length) return null;
  return { text: hits[0].text, source: hits[0].cites, grounded: true };
}

module.exports = { retrieve, answer };
