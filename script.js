// script.js — Veríssimo Sodré Site (3D + GSAP)
(function() {
  'use strict';

  // === MOBILE MENU ===
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      nav.classList.toggle('open');
      var spans = menuBtn.querySelectorAll('span');
      if (nav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    nav.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        var spans = menuBtn.querySelectorAll('span');
        if (spans[0]) spans[0].style.transform = '';
        if (spans[1]) spans[1].style.opacity = '';
        if (spans[2]) spans[2].style.transform = '';
      });
    });
  }

  // === HEADER SCROLL SHADOW ===
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }

  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === FAQ ACCORDION (nativo: <details> abre a janela de resposta abaixo, igual ao mobile) ===

  // === SCROLL TO TOP ===
  var scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) scrollTop.classList.add('show');
      else scrollTop.classList.remove('show');
    });
    scrollTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === LOADER ===
  window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(function() { loader.style.display = 'none'; }, 600);
    }
  });

  // === GSAP SCROLL ANIMATIONS ===
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in cards on scroll
    gsap.utils.toArray('.area-card, .article-card, .team-card, .case-card').forEach(function(card, i) {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.05,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(function(title) {
      gsap.from(title, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // === THREE.JS PARTICLE HERO ===
  if (typeof THREE !== 'undefined') {
    initHero3D();
  }

  function initHero3D() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    var hero = document.getElementById('hero');
    if (!hero) return;

    var width = hero.offsetWidth;
    var height = hero.offsetHeight;

    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    var particleCount = 2000;
    var positions = new Float32Array(particleCount * 3);
    var colors = new Float32Array(particleCount * 3);
    var goldColor = new THREE.Color('#d4a843');
    var whiteColor = new THREE.Color('#ffffff');

    for (var i = 0; i < particleCount; i++) {
      var i3 = i * 3;
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      var r = 2 + Math.random() * 3;
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      var color = Math.random() > 0.7 ? goldColor : whiteColor;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    var material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    var particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    var mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', function(e) {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Resize
    window.addEventListener('resize', function() {
      width = hero.offsetWidth;
      height = hero.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();
  }

  console.log('✅ Veríssimo Sodré 3D site loaded');
})();