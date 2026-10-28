const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupHeroCanvas() {
  const canvas = document.getElementById('hero-shader-canvas');
  if (!canvas || prefersReducedMotion) return;
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const vertexSource = `
    attribute vec2 a_position;
    void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
  `;
  const fragmentSource = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    uniform vec2 u_resolution;
    uniform float u_time;
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec3 bg = vec3(1.0, 1.0, 1.0);
      float wave1 = sin(uv.x * 3.8 + u_time * 0.95) * 0.12 + sin(uv.x * 7.5 - u_time * 0.45) * 0.05 + 0.52;
      float d1 = abs(uv.y - wave1);
      float wave2 = sin(uv.x * 2.8 - u_time * 0.7 + 1.2) * 0.15 + sin(uv.x * 5.2 + u_time * 0.6) * 0.04 + 0.46;
      float d2 = abs(uv.y - wave2);
      vec3 rayColor1 = vec3(0.08, 0.42, 0.94);
      vec3 rayColor2 = vec3(0.25, 0.68, 1.0);
      vec3 softCyan = vec3(0.40, 0.78, 0.98);
      float beam1 = exp(-d1 * 26.0) * 0.65 + exp(-d1 * 7.0) * 0.28;
      float beam2 = exp(-d2 * 20.0) * 0.35 + exp(-d2 * 5.0) * 0.18;
      float edgeFade = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x);
      vec3 finalColor = mix(bg, rayColor1, beam1 * 0.42 * edgeFade);
      finalColor = mix(finalColor, rayColor2, beam2 * 0.28 * edgeFade);
      float core = exp(-d1 * 70.0) * 0.45 * edgeFade;
      finalColor = mix(finalColor, vec3(0.85, 0.94, 1.0), core);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  const createShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };
  const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return;
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  const positionAttribute = gl.getAttribLocation(program, 'a_position');
  const resolutionUniform = gl.getUniformLocation(program, 'u_resolution');
  const timeUniform = gl.getUniformLocation(program, 'u_time');
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

  // Layout size (clientWidth/Height) is unaffected by the parallax scale transform,
  // and the buffer is only resized when the size actually changes.
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  };

  // All wave frequencies are multiples of 0.05 rad/s, so the animation repeats exactly
  // every 2*PI/0.05 s. Wrapping keeps u_time small and the animation seamless.
  const loopSeconds = (2 * Math.PI) / 0.05;
  const startTime = performance.now();
  let frameId = 0;
  let inView = true;

  const render = (now) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
    gl.uniform1f(timeUniform, ((now - startTime) * 0.001) % loopSeconds);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    frameId = requestAnimationFrame(render);
  };
  const start = () => {
    if (!frameId && inView && !document.hidden) frameId = requestAnimationFrame(render);
  };
  const stop = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  };

  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize, { passive: true });

  // Do not burn battery drawing while the hero is off-screen or the tab is hidden.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      inView ? start() : stop();
    }).observe(canvas);
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  start();
}

function setupShrinkingHeader() {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero-section');
  if (!header || !hero) return;

  let ticking = false;
  const update = () => {
    const passedHero = hero.getBoundingClientRect().bottom <= header.offsetHeight + 8;
    header.classList.toggle('is-scrolled', passedHero);
    ticking = false;
  };
  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  update();
}

function setupHeroParallax() {
  const hero = document.querySelector('.hero-section');
  const background = document.querySelector('.hero-canvas-wrap');
  if (!hero || !background) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileViewport = window.matchMedia('(max-width: 767px)');
  let ticking = false;

  const update = () => {
    if (reducedMotion.matches || mobileViewport.matches) {
      background.style.setProperty('--hero-parallax-y', '0px');
      background.style.setProperty('--hero-parallax-scale', '1');
      background.style.setProperty('--hero-parallax-opacity', '1');
      ticking = false;
      return;
    }

    const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight)));
    background.style.setProperty('--hero-parallax-y', `${(window.scrollY * 0.35).toFixed(2)}px`);
    background.style.setProperty('--hero-parallax-scale', (1 - (0.05 * progress)).toFixed(3));
    background.style.setProperty('--hero-parallax-opacity', (1 - (0.4 * progress)).toFixed(3));
    ticking = false;
  };
  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  reducedMotion.addEventListener?.('change', requestUpdate);
  mobileViewport.addEventListener?.('change', requestUpdate);
  update();
}

function setupRevealMotion() {
  const elements = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
}

function setupFaqSlideMotion() {
  const section = document.querySelector('.faq-section');
  const halves = section?.querySelectorAll('.faq-slide-left, .faq-slide-right');
  if (!section || !halves?.length) return;

  const reveal = () => halves.forEach((half) => half.classList.add('is-visible'));
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      reveal();
      instance.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(section);
}

function setupLearnedPanel() {
  const panel = document.querySelector('.learned-panel');
  const edit = document.getElementById('edit-settings');
  const reset = document.getElementById('reset-settings');
  const inputs = [...document.querySelectorAll('.learned-row input')];
  if (!panel || !edit || !reset) return;
  edit.addEventListener('click', () => {
    const isEditing = panel.classList.toggle('is-editing');
    edit.textContent = isEditing ? 'Done' : 'Edit';
    if (isEditing) inputs[0]?.focus();
  });
  reset.addEventListener('click', () => inputs.forEach((input) => { input.checked = false; }));
}

function setupFaq() {
  const triggers = document.querySelectorAll('.faq-trigger');
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      triggers.forEach((otherTrigger) => {
        const content = document.getElementById(otherTrigger.getAttribute('aria-controls'));
        const shouldOpen = otherTrigger === trigger && !isExpanded;
        otherTrigger.setAttribute('aria-expanded', String(shouldOpen));
        content?.classList.toggle('is-open', shouldOpen);
      });
    });
  });
}

function setupScrollRevealBlur() {
  const paragraphs = [...document.querySelectorAll('[data-reveal-blur]')];
  if (!paragraphs.length) return;

  const words = paragraphs.flatMap((paragraph) => {
    const text = paragraph.textContent.trim();
    paragraph.replaceChildren();
    return text.split(/\s+/).map((word, index, allWords) => {
      const span = document.createElement('span');
      span.className = 'reveal-blur-word';
      span.textContent = word;
      paragraph.append(span);
      if (index < allWords.length - 1) paragraph.append(document.createTextNode(' '));
      return span;
    });
  });

  let ticking = false;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const update = () => {
    const viewportHeight = window.innerHeight;
    const revealStart = viewportHeight * 0.84;
    const revealEnd = viewportHeight * 0.38;
    const revealRange = revealStart - revealEnd;
    words.forEach((word) => {
      const progress = clamp((revealStart - word.getBoundingClientRect().top) / revealRange, 0, 1);
      word.style.setProperty('--reveal-progress', progress.toFixed(3));
      word.style.setProperty('--reveal-blur', `${(8 * (1 - progress)).toFixed(2)}px`);
      word.style.setProperty('--reveal-opacity', (0.15 + (0.85 * progress)).toFixed(3));
    });
    ticking = false;
  };
  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  update();
}

function setupDemo() {
  const log = document.getElementById('chat-log');
  const actions = document.getElementById('chat-actions');
  const chips = document.querySelectorAll('.demo-moments .chip');
  if (!log || !actions) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const flows = {
    brief: { say: ['Good morning. Here is your brief, top three items only.', '1. Aisle 4: check after the 10:00 delivery.', '2. Friday evening: I will warn you about queues 10 minutes earlier.', '3. Two open tasks from yesterday\u2019s handover.'],
      options: { 'Got it': 'Done. I will keep your brief to three items.', 'Remind me at 10:00': 'Reminder set for 10:00. I will use WhatsApp first, then call if you do not reply.' } },
    alert: { say: ['Unusual activity near the Aisle 4 exit camera. I have a short clip ready.', 'You decide what happens next.'],
      options: { 'Notify security': 'Security has been told by text. You stay in the loop.', 'Call me': 'Calling you now.', 'Dismiss': 'Dismissed. I will note it so I learn what is normal here.' } },
    handover: { say: ['End of shift. Handover for the next manager:', 'Open tasks: 2. Alerts today: 1, handled by you.'],
      options: { 'Send handover': 'Handover sent to the next manager.', 'Add note: re-check Aisle 4 shelf': 'Added to the handover. Send it when you are ready.' } }
  };
  let timers = [];
  const wait = (fn, ms) => { if (reduce) fn(); else timers.push(setTimeout(fn, ms)); };
  const add = (text, who) => { const el = document.createElement('div'); el.className = 'msg msg-' + who; el.textContent = text; log.appendChild(el); log.scrollTop = log.scrollHeight; };
  const play = (key) => {
    timers.forEach(clearTimeout); timers = [];
    log.textContent = ''; actions.textContent = '';
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.flow === key)));
    const flow = flows[key];
    flow.say.forEach((line, i) => wait(() => add(line, 'miki'), 500 + i * 900));
    wait(() => {
      Object.keys(flow.options).forEach((label) => {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = label;
        b.addEventListener('click', () => { actions.textContent = ''; add(label, 'user'); wait(() => add(flow.options[label], 'miki'), 500); });
        actions.appendChild(b);
      });
    }, 500 + flow.say.length * 900);
  };
  chips.forEach((c) => c.addEventListener('click', () => play(c.dataset.flow)));
  play('brief');
}

function setupJoinForm() {
  const form = document.getElementById('join-form');
  const status = document.getElementById('join-status');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    form.elements.name.setAttribute('aria-invalid', String(!name));
    form.elements.email.setAttribute('aria-invalid', String(!emailOk));
    if (!name || !emailOk) { status.textContent = 'Please add your name and a valid work email.'; return; }
    const body = ['Name: ' + name, 'Email: ' + email, 'Company: ' + (data.get('company') || ''), 'Number of stores: ' + (data.get('stores') || '')].join('\n');
    status.textContent = 'Opening your email app. If nothing opens, write to hello@miki.si.';
    window.location.href = 'mailto:hello@miki.si?subject=' + encodeURIComponent('MiKi early access') + '&body=' + encodeURIComponent(body);
  });
}

setupHeroCanvas();
setupShrinkingHeader();
setupHeroParallax();
setupRevealMotion();
setupFaqSlideMotion();
setupScrollRevealBlur();
setupLearnedPanel();
setupFaq();
setupDemo();
setupJoinForm();
