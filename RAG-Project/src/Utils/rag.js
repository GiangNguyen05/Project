// ── FILE READERS ──

export const readTxt = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file, "UTF-8");
  });

export const readPDF = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const str = new TextDecoder("latin1").decode(new Uint8Array(e.target.result));
        let text = "";
        const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
        let match;
        while ((match = streamRegex.exec(str)) !== null) {
          const textRegex = /\(([^)\\]|\\.)*\)/g;
          let t;
          while ((t = textRegex.exec(match[1])) !== null) {
            const cleaned = t[0]
              .slice(1, -1)
              .replace(/\\n/g, "\n")
              .replace(/\\r/g, "\r")
              .replace(/\\t/g, "\t")
              .replace(/\\\\/g, "\\")
              .replace(/\\(.)/g, "$1");
            if (cleaned.trim().length > 2) text += cleaned + " ";
          }
        }
        if (text.trim().length < 50)
          text = str.replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ");
        resolve(text.trim() || "Không đọc được PDF.");
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

// ── CHUNKING ──

export function chunkText(text, src, size = 500, overlap = 50) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + size;
    if (end < text.length) {
      const breakAt = text.lastIndexOf(".", end);
      if (breakAt > start + size * 0.6) end = breakAt + 1;
    }
    const chunk = text.slice(start, end).trim();
    if (chunk.length > 20) chunks.push({ text: chunk, src, i: chunks.length });
    start = end - overlap;
    if (start >= text.length) break;
  }
  return chunks;
}

// ── RETRIEVAL ──

const tokenize = (t) =>
  t.toLowerCase().replace(/[^\w\sÀ-ỹ]/g, " ").split(/\s+/).filter((x) => x.length > 1);

const toTF = (tokens) => {
  const freq = {};
  tokens.forEach((t) => (freq[t] = (freq[t] || 0) + 1));
  const total = tokens.length;
  Object.keys(freq).forEach((k) => (freq[k] /= total));
  return freq;
};

function cosine(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0, na = 0, nb = 0;
  for (const k of keys) {
    const av = a[k] || 0, bv = b[k] || 0;
    dot += av * bv; na += av * av; nb += bv * bv;
  }
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

export function retrieve(docs, query, topK = 5) {
  const allChunks = docs.filter((d) => d.status === "ready").flatMap((d) => d.chunks);
  if (!allChunks.length) return [];
  const qt = tokenize(query);
  const qtf = toTF(qt);
  return allChunks
    .map((chunk) => {
      const kw = qt.filter((t) => chunk.text.toLowerCase().includes(t)).length / (qt.length || 1);
      return { ...chunk, score: cosine(qtf, toTF(tokenize(chunk.text))) * 0.5 + kw * 0.5 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((c) => c.score > 0.01);
}
