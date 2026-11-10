// Vinext streams long metadata HTML as a Flight T record followed by a
// separate string chunk. Localizing asset URLs changes that chunk's UTF-8
// length; retaining its old length makes React report "Connection closed".
export function normalizeDemoMetadataLengths(html) {
  const pattern = /\.rsc\.push\(("(?:[^"\\]|\\.)*")\)/g;
  const chunks = [...html.matchAll(pattern)].map(match => ({
    index: match.index,
    raw: match[0],
    value: JSON.parse(match[1]),
  }));
  const changes = [];
  for (let i = 0; i < chunks.length; i++) {
    const header = /^([0-9a-f]+:T)[0-9a-f]+,$/.exec(chunks[i].value);
    if (!header) continue;
    const payload = chunks[i + 1]?.value;
    // Fail explicitly if a future exporter splits metadata differently.
    if (!payload?.startsWith('<') || !payload.endsWith('>')) {
      throw new Error('Unsupported streamed demo metadata: expected a complete HTML chunk');
    }
    const value = header[1] + Buffer.byteLength(payload, 'utf8').toString(16) + ',';
    changes.push({ ...chunks[i], replacement: `.rsc.push(${JSON.stringify(value)})` });
  }
  for (const change of changes.reverse()) {
    html = html.slice(0, change.index) + change.replacement + html.slice(change.index + change.raw.length);
  }
  return html;
}
