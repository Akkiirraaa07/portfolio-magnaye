(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'circuit-bg';
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.45;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const GRID = 80;        // spacing between nodes
  const TRACE  = '#1a4a7a';
  const VIA    = '#2563a8';
  const PULSE  = '#38bdf8';

  let W, H, cols, rows, nodes, pulses;

  // ── Build grid ──────────────────────────────────────────────────────────────
  function build() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.ceil(W / GRID) + 1;
    rows = Math.ceil(H / GRID) + 1;

    // nodes: every grid intersection
    nodes = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        nodes.push({ x: c * GRID, y: r * GRID, glow: 0 });
      }
    }

    // edges: a deterministic subset of H/V connections (not every one, to look like a real board)
    // We'll draw them statically each frame from a fixed seed-based list
    buildEdges();
    buildPulses();
  }

  let edges = [];
  function buildEdges() {
    edges = [];
    const rng = seededRng(42);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // horizontal edge to the right — ~65% chance
        if (c < cols - 1 && rng() < 0.65) {
          edges.push({ x1: c * GRID, y1: r * GRID, x2: (c + 1) * GRID, y2: r * GRID });
        }
        // vertical edge downward — ~65% chance
        if (r < rows - 1 && rng() < 0.65) {
          edges.push({ x1: c * GRID, y1: r * GRID, x2: c * GRID, y2: (r + 1) * GRID });
        }
      }
    }
  }

  // ── Pulses: bright dots travelling along edges ──────────────────────────────
  function buildPulses() {
    pulses = [];
    // spawn a handful of pulses spread across the grid
    for (let i = 0; i < 18; i++) {
      spawnPulse(Math.random());
    }
  }

  function spawnPulse(progress) {
    if (edges.length === 0) return;
    const edge = edges[Math.floor(Math.random() * edges.length)];
    pulses.push({
      edge,
      t: progress,          // 0→1 along the edge
      speed: 0.004 + Math.random() * 0.006,
      size: 2.5 + Math.random() * 1.5,
      brightness: 0.7 + Math.random() * 0.3,
    });
  }

  // ── Simple seeded RNG (mulberry32) ──────────────────────────────────────────
  function seededRng(seed) {
    let s = seed;
    return () => {
      s |= 0; s = s + 0x6d2b79f5 | 0;
      let t = Math.imul(s ^ s >>> 15, 1 | s);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // ── Draw ────────────────────────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Traces
    ctx.strokeStyle = TRACE;
    ctx.lineWidth = 1;
    for (const e of edges) {
      ctx.beginPath();
      ctx.moveTo(e.x1, e.y1);
      ctx.lineTo(e.x2, e.y2);
      ctx.stroke();
    }

    // Via pads at every node that has ≥2 edges
    const degree = new Map();
    for (const e of edges) {
      const k1 = `${e.x1},${e.y1}`;
      const k2 = `${e.x2},${e.y2}`;
      degree.set(k1, (degree.get(k1) || 0) + 1);
      degree.set(k2, (degree.get(k2) || 0) + 1);
    }
    for (const [key, deg] of degree) {
      if (deg < 2) continue;
      const [x, y] = key.split(',').map(Number);
      ctx.strokeStyle = VIA;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = VIA;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pulses
    for (const p of pulses) {
      const { edge, t, size, brightness } = p;
      const x = edge.x1 + (edge.x2 - edge.x1) * t;
      const y = edge.y1 + (edge.y2 - edge.y1) * t;

      // halo
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
      grad.addColorStop(0,   `rgba(56,189,248,${0.55 * brightness})`);
      grad.addColorStop(0.4, `rgba(56,189,248,${0.18 * brightness})`);
      grad.addColorStop(1,   'rgba(56,189,248,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size * 4, 0, Math.PI * 2);
      ctx.fill();

      // core dot
      ctx.fillStyle = PULSE;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // light the trace behind the pulse
      ctx.strokeStyle = `rgba(56,189,248,${0.35 * brightness})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(edge.x1, edge.y1);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  // ── Tick ────────────────────────────────────────────────────────────────────
  function tick() {
    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].t += pulses[i].speed;
      if (pulses[i].t >= 1) {
        pulses.splice(i, 1);
        spawnPulse(0);
      }
    }
    draw();
    requestAnimationFrame(tick);
  }

  // ── Init ────────────────────────────────────────────────────────────────────
  build();
  tick();
  window.addEventListener('resize', build);
})();