import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Kemojo3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      35, 1, 0.1, 100
    )

    camera.position.set(6, 4.5, 9)
    camera.lookAt(0, 0.4, 0)

    let renderer

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      })
    } catch {
      container.textContent =
        'Visualisasi 3D tidak didukung perangkat ini.'
      return
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    )

    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.4

    container.appendChild(renderer.domElement)

    // LIGHTING

    scene.add(
      new THREE.HemisphereLight(
        0xfff5cf,
        0x183b20,
        2.5
      )
    )

    const mainLight = new THREE.DirectionalLight(
      0xffe5b0,
      4
    )

    mainLight.position.set(4, 7, 5)
    scene.add(mainLight)

    const rimLight = new THREE.DirectionalLight(
      0xffcc6b,
      2
    )

    rimLight.position.set(-5, 3, -4)
    scene.add(rimLight)

    const group = new THREE.Group()
    scene.add(group)

    // MATERIAL BOLU

    const cakeMaterial = new THREE.MeshStandardMaterial({
      color: 0x66852c,
      roughness: 0.85,
      metalness: 0,
    })

    // Bentuk cetakan bunga kamboja.

    const segments = 160

    const profile = [
      [0, -0.5],
      [1.25, -0.5],
      [1.48, -0.4],
      [1.57, -0.15],
      [1.6, 0.15],
      [1.48, 0.48],
      [1.28, 0.67],
      [0.95, 0.73],
      [0.4, 0.77],
      [0, 0.78],
    ]

    const vertices = []
    const indices = []

    profile.forEach(([radius, y]) => {
      for (let i = 0; i <= segments; i++) {
        const angle =
          (i / segments) * Math.PI * 2

        const flower =
          1 + 0.12 * Math.cos(angle * 8)

        const r = radius * flower

        vertices.push(
          Math.cos(angle) * r,
          y,
          Math.sin(angle) * r
        )
      }
    })

    for (let row = 0; row < profile.length - 1; row++) {
      for (let i = 0; i < segments; i++) {
        const a = row * (segments + 1) + i
        const b = a + segments + 1

        indices.push(
          a, b, a + 1,
          b, b + 1, a + 1
        )
      }
    }

    const cakeGeometry = new THREE.BufferGeometry()

    cakeGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )

    cakeGeometry.setIndex(indices)
    cakeGeometry.computeVertexNormals()

    const cake = new THREE.Mesh(
      cakeGeometry,
      cakeMaterial
    )

    cake.position.y = 0.4
    group.add(cake)

    // Tekstur permukaan bolu.

    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256

    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.fillStyle = '#888888'
      ctx.fillRect(0, 0, 256, 256)

      for (let i = 0; i < 10000; i++) {
        const shade = 70 + Math.random() * 120

        ctx.fillStyle =
          `rgb(${shade}, ${shade}, ${shade})`

        ctx.beginPath()

        ctx.arc(
          Math.random() * 256,
          Math.random() * 256,
          Math.random() * 1.5,
          0,
          Math.PI * 2
        )

        ctx.fill()
      }
    }

    // UV coordinates untuk tekstur.

    const uvs = []

    profile.forEach((_, row) => {
      for (let i = 0; i <= segments; i++) {
        uvs.push(
          i / segments,
          row / (profile.length - 1)
        )
      }
    })

    cakeGeometry.setAttribute(
      'uv',
      new THREE.Float32BufferAttribute(uvs, 2)
    )

    const texture = new THREE.CanvasTexture(canvas)

    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(5, 2)

    cakeMaterial.bumpMap = texture
    cakeMaterial.bumpScale = 0.055

    // PIRING

    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x163d29,
      roughness: 0.28,
      metalness: 0.25,
    })

    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(
        2.05, 1.8, 0.18, 100
      ),
      plateMaterial
    )

    plate.position.y = -0.23
    group.add(plate)

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af61,
      metalness: 0.8,
      roughness: 0.28,
    })

    const plateRing = new THREE.Mesh(
      new THREE.TorusGeometry(
        1.99, 0.025, 12, 100
      ),
      goldMaterial
    )

    plateRing.rotation.x = Math.PI / 2
    plateRing.position.y = -0.13
    group.add(plateRing)

    // DAUN PANDAN

    const leafShape = new THREE.Shape()

    leafShape.moveTo(0, 0)

    leafShape.quadraticCurveTo(
      -0.42, 1.3, 0.28, 2.9
    )

    leafShape.quadraticCurveTo(
      0.65, 1.1, 0, 0
    )

    const leafGeometry = new THREE.ShapeGeometry(
      leafShape
    )

    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x47852d,
      side: THREE.DoubleSide,
      roughness: 0.65,
    })

    const leaves = []

    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(
        leafGeometry,
        leafMaterial
      )

      const angle = (i / 5) * Math.PI * 2

      leaf.position.set(
        Math.cos(angle) * 1.9,
        -0.1,
        Math.sin(angle) * 1.9
      )

      leaf.rotation.set(
        -0.65,
        angle,
        -0.8 + i * 0.3
      )

      leaf.scale.setScalar(0.65 + i * 0.04)

      group.add(leaf)
      leaves.push(leaf)
    }

    // PERCIKAN SANTAN

    const coconutMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xfff5df,
        roughness: 0.3,
      })

    const splash = new THREE.Group()
    group.add(splash)

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          Math.cos(angle) * 1.7,
          -0.25,
          Math.sin(angle) * 1.7
        ),
        new THREE.Vector3(
          Math.cos(angle + 0.3) * 2.2,
          0.3,
          Math.sin(angle + 0.3) * 2.2
        ),
        new THREE.Vector3(
          Math.cos(angle + 0.6) * 2.5,
          0.9,
          Math.sin(angle + 0.6) * 2.5
        ),
      ])

      const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(
          curve, 40, 0.045, 8, false
        ),
        coconutMaterial
      )

      splash.add(mesh)
    }

    const drops = []

    for (let i = 0; i < 15; i++) {
      const drop = new THREE.Mesh(
        new THREE.SphereGeometry(
          0.045 + Math.random() * 0.065,
          16,
          16
        ),
        coconutMaterial
      )

      const angle = Math.random() * Math.PI * 2
      const radius = 2.1 + Math.random() * 0.6

      drop.position.set(
        Math.cos(angle) * radius,
        Math.random() * 1.8,
        Math.sin(angle) * radius
      )

      drop.scale.y = 1.5

      drop.userData.baseY = drop.position.y
      drop.userData.phase = Math.random() * Math.PI * 2

      group.add(drop)
      drops.push(drop)
    }

    // PARTIKEL EMAS

    const particles = []

    for (let i = 0; i < 30; i++) {
      const particle = new THREE.Mesh(
        new THREE.OctahedronGeometry(
          0.025 + Math.random() * 0.065
        ),
        goldMaterial
      )

      particle.position.set(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3
      )

      particle.userData.baseY = particle.position.y
      particle.userData.phase = Math.random() * 6

      scene.add(particle)
      particles.push(particle)
    }

    // RESPONSIVE CANVAS

    function resize() {
      const width = container.clientWidth
      const height = container.clientHeight

      if (!width || !height) return

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(container)

    resize()

    // INTERAKSI KURSOR

    let mouseX = 0
    let mouseY = 0

    function handlePointer(event) {
      const rect = container.getBoundingClientRect()

      mouseX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2

      mouseY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    function resetPointer() {
      mouseX = 0
      mouseY = 0
    }

    container.addEventListener(
      'pointermove', handlePointer
    )

    container.addEventListener(
      'pointerleave', resetPointer
    )

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let animationId
    const start = performance.now()

    function animate(now) {
      const time = reducedMotion
        ? 0
        : (now - start) / 1000

      group.position.y =
        Math.sin(time * 1.5) * 0.15

      const targetY =
        Math.sin(time * 0.35) * 0.35 +
        mouseX * 0.35

      group.rotation.y +=
        (targetY - group.rotation.y) * 0.04

      group.rotation.x +=
        (-mouseY * 0.1 - group.rotation.x) * 0.04

      drops.forEach((drop) => {
        drop.position.y =
          drop.userData.baseY +
          Math.sin(time * 1.5 + drop.userData.phase) * 0.15
      })

      particles.forEach((particle) => {
        particle.position.y =
          particle.userData.baseY +
          Math.sin(
            time + particle.userData.phase
          ) * 0.25

        particle.rotation.y = time
      })

      renderer.render(scene, camera)

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      observer.disconnect()

      container.removeEventListener(
        'pointermove', handlePointer
      )

      container.removeEventListener(
        'pointerleave', resetPointer
      )

      scene.traverse((object) => {
        object.geometry?.dispose()

        if (object.material) {
          object.material.dispose()
        }
      })

      texture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="kemojo-3d"
      role="img"
      aria-label="Ilustrasi tiga dimensi Bolu Kemojo dengan daun pandan"
    />
  )
}