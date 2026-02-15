/* ═══════════════════════════════════════════
   MANAS VARDHAN — WebGL + Interactions
   ═══════════════════════════════════════════ */

(() => {
  'use strict';

  // ── WebGL Shader Background ──────────────

  const canvas = document.getElementById('bg-canvas');
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: false });

  if (!gl) {
    canvas.style.display = 'none';
    document.body.style.background = 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%)';
  }

  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_scroll;

    //
    // Simplex-style 3D noise (compact, no textures)
    //
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // FBM with domain warping
    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.1;
      }
      return value;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

      float t = u_time * 0.08;

      // Mouse influence — creates a warping field around cursor
      vec2 mouse = u_mouse * 2.0 - 1.0;
      mouse.x *= u_resolution.x / u_resolution.y;
      float mouseDist = length(p - mouse);
      vec2 mouseWarp = (p - mouse) * 0.3 * exp(-mouseDist * 1.5);

      // Scroll-based palette shift
      float scrollPhase = u_scroll * 0.3;

      // Domain warping — the magic sauce
      vec3 q = vec3(p + mouseWarp, t);
      float n1 = fbm(q);
      vec3 r = vec3(p.x + n1 * 1.2 + t * 0.15, p.y + n1 * 0.8 + t * 0.12, t * 0.5);
      float n2 = fbm(r * 1.5 + vec3(n1 * 0.5));

      // Second layer of domain warping for extra depth
      vec3 s = vec3(p.x + n2 * 0.6 + t * 0.1, p.y + n2 * 0.9 - t * 0.08, t * 0.3 + n1 * 0.2);
      float n3 = fbm(s * 2.0);

      // Combined noise value
      float finalNoise = n2 * 0.6 + n3 * 0.4;

      // Color palette — deep, rich tones
      vec3 col1 = vec3(0.039, 0.039, 0.102);  // deep navy #0a0a1a
      vec3 col2 = vec3(0.831, 0.647, 0.455);  // warm amber #d4a574
      vec3 col3 = vec3(0.545, 0.133, 0.322);  // deep crimson #8b2252
      vec3 col4 = vec3(0.165, 0.435, 0.498);  // cool teal #2a6f7f
      vec3 col5 = vec3(0.06, 0.05, 0.12);     // darker navy

      // Mix colors based on noise + scroll position
      float colorIndex = finalNoise * 0.5 + 0.5;
      colorIndex = clamp(colorIndex + scrollPhase * 0.15, 0.0, 1.0);

      vec3 color = col1;
      color = mix(color, col5, smoothstep(0.0, 0.25, colorIndex));
      color = mix(color, col4 * 0.5, smoothstep(0.2, 0.45, colorIndex) * 0.6);
      color = mix(color, col3 * 0.4, smoothstep(0.4, 0.65, colorIndex) * 0.5);
      color = mix(color, col2 * 0.3, smoothstep(0.6, 0.85, colorIndex) * 0.35);
      color = mix(color, col1, smoothstep(0.8, 1.0, colorIndex));

      // Add subtle luminous highlights
      float highlight = smoothstep(0.55, 0.7, finalNoise) * 0.15;
      color += col2 * highlight;
      color += col4 * smoothstep(0.6, 0.75, n1) * 0.08;

      // Mouse glow — subtle warm light near cursor
      float mouseGlow = exp(-mouseDist * 2.5) * 0.12;
      color += col2 * mouseGlow;

      // Vignette — cinematic darkening at edges
      float vignette = 1.0 - smoothstep(0.4, 1.4, length(p * 0.7));
      color *= mix(0.5, 1.0, vignette);

      // Very subtle overall brightness pulse
      color *= 0.95 + 0.05 * sin(t * 2.0);

      // Gamma correction
      color = pow(color, vec3(0.95));

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  let program, timeLocation, mouseLocation, scrollLocation, resolutionLocation;
  let mouseX = 0.5, mouseY = 0.5;
  let targetMouseX = 0.5, targetMouseY = 0.5;
  let scrollY = 0;
  let startTime = Date.now();

  function compileShader(src, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  function initWebGL() {
    if (!gl) return;

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const vertices = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    timeLocation = gl.getUniformLocation(program, 'u_time');
    mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    scrollLocation = gl.getUniformLocation(program, 'u_scroll');
    resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    resize();
    render();
  }

  function resize() {
    if (!gl) return;
    const dpr = Math.min(window.devicePixelRatio, 1.5); // Cap for perf
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function render() {
    if (!gl || !program) return;

    // Smooth mouse
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const elapsed = (Date.now() - startTime) * 0.001;

    gl.uniform1f(timeLocation, elapsed);
    gl.uniform2f(mouseLocation, mouseX, mouseY);
    gl.uniform1f(scrollLocation, scrollY);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }

  // ── Mouse Tracking ──────────────────────

  let mouseThrottle = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - mouseThrottle < 16) return;
    mouseThrottle = now;

    targetMouseX = e.clientX / window.innerWidth;
    targetMouseY = 1.0 - (e.clientY / window.innerHeight);

    // Custom cursor
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    if (cursor) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }
    if (dot) {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    }
  });

  // Cursor hover scaling
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('a, button, .project-panel, .text-link, .contact__email');
    if (el) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest('a, button, .project-panel, .text-link, .contact__email');
    if (el) document.body.classList.remove('cursor-hover');
  });

  // ── Scroll Tracking ─────────────────────

  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollY = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }, { passive: true });

  window.addEventListener('resize', resize);

  // ── Intersection Observer — Reveals ─────

  const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Section Navigation Observer ─────────

  const sections = document.querySelectorAll('.section');
  const navDots = document.querySelectorAll('.side-nav__dot');
  const navLabel = document.getElementById('nav-label');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navDots.forEach(dot => {
          dot.classList.toggle('active', dot.dataset.section === id);
          if (dot.dataset.section === id && navLabel) {
            navLabel.textContent = dot.dataset.label;
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => navObserver.observe(s));

  // ── Horizontal Scroll Gallery ───────────

  const gallery = document.getElementById('projects-gallery');
  const track = document.getElementById('projects-track');

  if (gallery && track) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let currentTranslate = 0;
    let targetTranslate = 0;

    const getMaxScroll = () => track.scrollWidth - gallery.clientWidth;

    gallery.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollLeft = currentTranslate;
      gallery.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      targetTranslate = Math.max(-getMaxScroll(), Math.min(0, scrollLeft + dx));
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      gallery.style.cursor = 'grab';
    });

    // Wheel → horizontal scroll
    gallery.addEventListener('wheel', (e) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetTranslate = Math.max(-getMaxScroll(), Math.min(0, targetTranslate - delta));
      e.preventDefault();
    }, { passive: false });

    // Smooth animation loop for gallery
    function animateGallery() {
      currentTranslate += (targetTranslate - currentTranslate) * 0.1;
      track.style.transform = `translateX(${currentTranslate}px)`;
      requestAnimationFrame(animateGallery);
    }
    animateGallery();

    // Touch support
    let touchStartX = 0;
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      scrollLeft = currentTranslate;
    }, { passive: true });

    gallery.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].pageX - touchStartX;
      targetTranslate = Math.max(-getMaxScroll(), Math.min(0, scrollLeft + dx));
    }, { passive: true });
  }

  // ── Smooth scroll for nav links ─────────

  document.querySelectorAll('.side-nav__dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(dot.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Init ────────────────────────────────

  initWebGL();

  // Reveal hero immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-text, .hero .reveal-fade').forEach(el => {
      el.classList.add('revealed');
    });
  }, 300);

})();
