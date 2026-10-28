'use client'

import { useEffect, useRef } from 'react'

const VERTEX = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`

const FRAGMENT = `
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
    float beam1 = exp(-d1 * 26.0) * 0.65 + exp(-d1 * 7.0) * 0.28;
    float beam2 = exp(-d2 * 20.0) * 0.35 + exp(-d2 * 5.0) * 0.18;
    float edgeFade = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x);
    vec3 finalColor = mix(bg, rayColor1, beam1 * 0.42 * edgeFade);
    finalColor = mix(finalColor, rayColor2, beam2 * 0.28 * edgeFade);
    float core = exp(-d1 * 70.0) * 0.45 * edgeFade;
    finalColor = mix(finalColor, vec3(0.85, 0.94, 1.0), core);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

// The animated blue wave behind the hero, plus a gentle parallax on scroll.
export default function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // WebGL wave animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }
    const vs = compile(gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    const position = gl.getAttribLocation(program, 'a_position')
    const resolution = gl.getUniformLocation(program, 'u_resolution')
    const time = gl.getUniformLocation(program, 'u_time')
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    // clientWidth/Height ignore the parallax transform; only resize when the size changes.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    // All wave frequencies are multiples of 0.05, so the animation repeats exactly
    // every 2*PI/0.05 seconds. Wrapping the time keeps it small and seamless.
    const loopSeconds = (2 * Math.PI) / 0.05
    const startTime = performance.now()
    let frame = 0
    let inView = true

    const render = (now: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(program)
      gl.enableVertexAttribArray(position)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      gl.uniform2f(resolution, canvas.width, canvas.height)
      gl.uniform1f(time, ((now - startTime) * 0.001) % loopSeconds)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frame = requestAnimationFrame(render)
    }
    const start = () => {
      if (!frame && inView && !document.hidden) frame = requestAnimationFrame(render)
    }
    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    // Do not draw while the hero is off-screen or the tab is hidden.
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) start()
      else stop()
    })
    viewObserver.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      viewObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Parallax: the background drifts and fades slightly as the hero scrolls away.
  useEffect(() => {
    const wrap = wrapRef.current
    const hero = wrap?.closest<HTMLElement>('.hero-section')
    if (!wrap || !hero) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 767px)')
    let ticking = false
    const update = () => {
      if (reduced.matches || mobile.matches) {
        wrap.style.setProperty('--hero-parallax-y', '0px')
        wrap.style.setProperty('--hero-parallax-scale', '1')
        wrap.style.setProperty('--hero-parallax-opacity', '1')
      } else {
        const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight)))
        wrap.style.setProperty('--hero-parallax-y', `${(window.scrollY * 0.35).toFixed(2)}px`)
        wrap.style.setProperty('--hero-parallax-scale', (1 - 0.05 * progress).toFixed(3))
        wrap.style.setProperty('--hero-parallax-opacity', (1 - 0.4 * progress).toFixed(3))
      }
      ticking = false
    }
    const request = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request, { passive: true })
    reduced.addEventListener('change', request)
    mobile.addEventListener('change', request)
    update()
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      reduced.removeEventListener('change', request)
      mobile.removeEventListener('change', request)
    }
  }, [])

  return (
    <div ref={wrapRef} className="hero-canvas-wrap" aria-hidden="true">
      <canvas ref={canvasRef} id="hero-shader-canvas" />
    </div>
  )
}
