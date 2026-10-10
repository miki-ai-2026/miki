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
    precision mediump float;
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

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
  };
  const startTime = performance.now();
  const render = (now) => {
    resize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
    gl.uniform1f(timeUniform, (now - startTime) * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  };

  window.addEventListener('resize', resize, { passive: true });
  requestAnimationFrame(render);
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

function setupEarlyAccess() {
  const button = document.getElementById('early-access');
  if (button) button.addEventListener('click', () => { window.location.href = 'mailto:hello@miki.si?subject=MiKi%20early%20access'; });
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

setupHeroCanvas();
setupRevealMotion();
setupLearnedPanel();
setupEarlyAccess();
setupFaq();
