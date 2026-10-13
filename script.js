/**
 * Nishand M S — Portfolio Interaction & Animation Engine
 * Minimal, Fast, Smooth AOS & Background Pattern Animation
 */

// Toast feedback system
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast) return;

  if (toastText) toastText.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function copyEmail(email = 'nishandms06@gmail.com') {
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied ${email} to clipboard`);
  }).catch(() => {
    showToast(`Email: ${email}`);
  });
}

// Mobile navigation toggle
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-nav-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    const isExpanded = !menu.classList.contains('hidden');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form handler
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value || '';
    const email = document.getElementById('form-email')?.value || '';
    const message = document.getElementById('form-message')?.value || '';

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    showToast('Opening your email client...');
    setTimeout(() => {
      window.location.href = `mailto:nishandms06@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
  });
}

// Back to Top button
function setupBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// AOS Animation Setup
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 50
    });
  }
}

// Background Pattern Animation Engine (Three.js with 2D Canvas Fallback)
function initBackgroundPattern() {
  const container = document.getElementById('three-network-container');
  if (!container) return;

  if (typeof THREE !== 'undefined') {
    initThreeJSPattern(container);
  } else {
    initCanvas2DPattern(container);
  }
}

function initThreeJSPattern(container) {
  if (container.querySelector('canvas')) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x09090b, 300, 1100);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1500);
  camera.position.z = 700;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const particleCount = 140;
  const boundX = 1200;
  const boundY = 800;
  const boundZ = 500;
  const maxDistance = 150;

  const particles = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * boundX;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * boundY;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * boundZ;

    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.18,
      y: (Math.random() - 0.5) * 0.18,
      z: (Math.random() - 0.5) * 0.18
    });
  }

  particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

  const pMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2.2,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true
  });

  const pointCloud = new THREE.Points(particles, pMaterial);
  scene.add(pointCloud);

  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(particleCount * particleCount * 3);
  const lineColors = new Float32Array(particleCount * particleCount * 3);

  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.2
  });

  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.04;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.04;
  });

  function animate() {
    requestAnimationFrame(animate);

    targetX = mouseX * 1.8;
    targetY = mouseY * 1.8;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (-targetY - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    const hX = boundX / 2;
    const hY = boundY / 2;
    const hZ = boundZ / 2;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] += particleVelocities[i].x;
      particlePositions[i * 3 + 1] += particleVelocities[i].y;
      particlePositions[i * 3 + 2] += particleVelocities[i].z;

      if (particlePositions[i * 3] > hX) particlePositions[i * 3] = -hX;
      if (particlePositions[i * 3] < -hX) particlePositions[i * 3] = hX;
      if (particlePositions[i * 3 + 1] > hY) particlePositions[i * 3 + 1] = -hY;
      if (particlePositions[i * 3 + 1] < -hY) particlePositions[i * 3 + 1] = hY;
      if (particlePositions[i * 3 + 2] > hZ) particlePositions[i * 3 + 2] = -hZ;
      if (particlePositions[i * 3 + 2] < -hZ) particlePositions[i * 3 + 2] = hZ;

      for (let j = i + 1; j < particleCount; j++) {
        const dx = particlePositions[i * 3] - particlePositions[j * 3];
        const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
        const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions[vertexpos++] = particlePositions[i * 3];
          linePositions[vertexpos++] = particlePositions[i * 3 + 1];
          linePositions[vertexpos++] = particlePositions[i * 3 + 2];

          linePositions[vertexpos++] = particlePositions[j * 3];
          linePositions[vertexpos++] = particlePositions[j * 3 + 1];
          linePositions[vertexpos++] = particlePositions[j * 3 + 2];

          lineColors[colorpos++] = 1; lineColors[colorpos++] = 1; lineColors[colorpos++] = 1;
          lineColors[colorpos++] = 1; lineColors[colorpos++] = 1; lineColors[colorpos++] = 1;

          numConnected++;
        }
      }
    }

    linesMesh.geometry.setDrawRange(0, numConnected * 2);
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;
    pointCloud.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    if (renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  });
}

function initCanvas2DPattern(container) {
  if (container.querySelector('canvas')) return;
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = 55;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  let mouseX = -1000, mouseY = -1000;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      const mDist = Math.hypot(p.x - mouseX, p.y - mouseY);
      if (mDist < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - mDist / 140)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initBackgroundPattern();
  setupMobileNav();
  setupContactForm();
  setupBackToTop();
});

// Refresh AOS on window load
window.addEventListener('load', () => {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
});

// Expose globally
window.copyEmail = copyEmail;
window.showToast = showToast;