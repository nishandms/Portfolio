tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dev: {
                    bg: '#0a0a0a', // True black/dark gray for premium feel
                    card: '#171717',
                    accent: '#ffffff', // High contrast white instead of blue
                    text: '#f5f5f5',
                    muted: '#a3a3a3',
                },
                photo: {
                    bg: '#fafafa',
                    card: '#ffffff',
                    accent: '#171717',
                    text: '#171717',
                    muted: '#737373',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
                serif: ['Merriweather', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
};

let currentView = 'dev';

function switchView(viewId) {
    window.scrollTo(0, 0);

    const body = document.getElementById('body');
    const navbar = document.getElementById('navbar');
    const navLogo = document.getElementById('nav-logo');
    const menuBtnIcon = document.getElementById('menu-icon');

    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    if (menuBtnIcon) {
        menuBtnIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    }

    if (viewId === 'dev') {
        if (body) body.className = 'font-sans theme-dark bg-dev-bg text-dev-text transition-colors duration-500 overflow-x-hidden';
        if (navbar) navbar.className = 'fixed w-full z-50 transition-all duration-300 bg-dev-bg/80 backdrop-blur-lg border-b border-white/5 text-white';
        if (navLogo) navLogo.className = 'text-xl font-semibold tracking-tight text-white';
        setupNavLinks('dev');
    }
    else if (viewId === 'photo') {
        if (body) body.className = 'font-sans theme-light bg-photo-bg text-photo-text transition-colors duration-500 overflow-x-hidden';
        if (navbar) navbar.className = 'fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-lg border-b border-neutral-200 text-neutral-900';
        if (navLogo) navLogo.className = 'text-xl font-semibold tracking-tight text-neutral-900';
        setupNavLinks('photo');
    }

    currentView = viewId;
}

function setupNavLinks(activeView) {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;
    const devClasses = activeView === 'dev' ? 'text-white' : (activeView === 'photo' ? 'text-neutral-500 hover:text-neutral-900' : 'text-dev-muted hover:text-white');
    const photoClasses = activeView === 'photo' ? 'text-neutral-900' : 'text-dev-muted hover:text-white';
    navLinks.innerHTML = `
        <button id="nav-btn-dev" onclick="switchView('dev')" class="text-sm font-medium transition-colors ${devClasses}">Software Engineering</button>
        <button id="nav-btn-photo" onclick="switchView('photo')" class="text-sm font-medium transition-colors ${photoClasses}">Photography</button>
    `;
}

function toggleCaseStudy(button) {
    const wrapper = button.nextElementSibling;
    const arrow = button.querySelector('.project-arrow');
    const isExpanded = wrapper.classList.contains('expanded');

    document.querySelectorAll('.case-study-wrapper').forEach(w => w.classList.remove('expanded'));
    document.querySelectorAll('.project-arrow').forEach(a => a.classList.remove('expanded-arrow'));

    if (!isExpanded) {
        wrapper.classList.add('expanded');
        arrow.classList.add('expanded-arrow');
    }
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const menuBtnIcon = document.getElementById('menu-icon');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        if (menu.classList.contains('hidden')) {
            if (menuBtnIcon) menuBtnIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            if (menuBtnIcon) menuBtnIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            menu.className = currentView === 'dev'
                ? 'absolute w-full bg-dev-bg/95 backdrop-blur-xl border-b border-white/10 shadow-2xl text-white z-50'
                : 'absolute w-full bg-white/95 backdrop-blur-xl border-b border-neutral-200 shadow-2xl text-neutral-900 z-50';
        }
    });
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-neutral-900', 'text-white');
                b.classList.add('bg-transparent', 'text-neutral-600', 'border-neutral-300');
            });

            btn.classList.add('bg-neutral-900', 'text-white');
            btn.classList.remove('bg-transparent', 'text-neutral-600', 'border-neutral-300');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.animation = 'none';
                    item.offsetHeight;
                    item.style.animation = null;
                    item.classList.add('animate-fade-in');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initPremiumThreeJS() {
    const container = document.getElementById('three-network-container');
    if (!container || typeof THREE === 'undefined') return;

    if (container.querySelector('canvas')) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 400, 1200);
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Refined configuration for "Senior" look: Slower, fewer nodes, extremely subtle.
    const particleCount = 200;
    const r = 1200;
    const maxDistance = 180;

    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * r;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * r;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * r;

        // Extremely slow movement
        particleVelocities.push({
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
            z: (Math.random() - 0.5) * 0.2
        });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

    // Pure white, tiny nodes
    const pMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2.5,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
    });

    const pointCloud = new THREE.Points(particles, pMaterial);
    scene.add(pointCloud);

    // Connecting Lines Setup
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    const lineColors = new Float32Array(particleCount * particleCount * 3);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.25
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Parallax Camera movement based on mouse
        targetX = mouseX * 2;
        targetY = mouseY * 2;
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        let vertexpos = 0;
        let colorpos = 0;
        let numConnected = 0;

        for (let i = 0; i < particleCount; i++) {
            // Update positions based on velocity
            particlePositions[i * 3] += particleVelocities[i].x;
            particlePositions[i * 3 + 1] += particleVelocities[i].y;
            particlePositions[i * 3 + 2] += particleVelocities[i].z;

            // Seamless wrap-around instead of harsh bouncing
            if (particlePositions[i * 3] > r / 2) particlePositions[i * 3] = -r / 2;
            if (particlePositions[i * 3] < -r / 2) particlePositions[i * 3] = r / 2;
            if (particlePositions[i * 3 + 1] > r / 2) particlePositions[i * 3 + 1] = -r / 2;
            if (particlePositions[i * 3 + 1] < -r / 2) particlePositions[i * 3 + 1] = r / 2;
            if (particlePositions[i * 3 + 2] > r / 2) particlePositions[i * 3 + 2] = -r / 2;
            if (particlePositions[i * 3 + 2] < -r / 2) particlePositions[i * 3 + 2] = r / 2;

            for (let j = i + 1; j < particleCount; j++) {
                const dx = particlePositions[i * 3] - particlePositions[j * 3];
                const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDistance) {
                    const alpha = 1.0 - dist / maxDistance;

                    linePositions[vertexpos++] = particlePositions[i * 3];
                    linePositions[vertexpos++] = particlePositions[i * 3 + 1];
                    linePositions[vertexpos++] = particlePositions[i * 3 + 2];

                    linePositions[vertexpos++] = particlePositions[j * 3];
                    linePositions[vertexpos++] = particlePositions[j * 3 + 1];
                    linePositions[vertexpos++] = particlePositions[j * 3 + 2];

                    // Subtle white connections fading out
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

        // Strict Parallax: Global rotation removed, only relies on mouse movement
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        if (currentView === 'dev' && container) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });
}

// Expose globally for inline HTML event handlers
window.switchView = switchView;
window.toggleCaseStudy = toggleCaseStudy;

function init() {
    setupMobileMenu();
    setupFilters();
    switchView('dev');
    setTimeout(initPremiumThreeJS, 100);
}

// Initialize application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}