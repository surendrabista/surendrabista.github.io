/* =========================================================
   PORTFOLIO JAVASCRIPT — Dr. Priya Sharma Public Health Portfolio
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---------------------------------------------------------
  // 1. AOS (Animate on Scroll) Init
  // ---------------------------------------------------------
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  // ---------------------------------------------------------
  // 2. Navbar — Scrolled state
  // ---------------------------------------------------------
  const navbar = document.getElementById('mainNav');
  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Close mobile nav on link click
  document.querySelectorAll('#navContent .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const collapse = document.getElementById('navContent');
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // ---------------------------------------------------------
  // 3. Active nav link on scroll (ScrollSpy enhancement)
  // ---------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#mainNav .nav-link[href^="#"]');

  function onScroll() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------------------------------------------------------
  // 4. Animated Counter (Stats Bar)
  // ---------------------------------------------------------
  const counters = document.querySelectorAll('.stat-number[data-count]');

  function animateCounters() {
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const step = Math.ceil(target / (duration / 30));
      let current = 0;
      const timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current;
      }, 30);
    });
  }

  // Trigger counters when stats bar is in view
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(statsBar);
  }

  // ---------------------------------------------------------
  // 5. Skill Progress Bar Animations
  // ---------------------------------------------------------
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(function (fill) {
    skillObserver.observe(fill);
  });

  // ---------------------------------------------------------
  // 6. Research Publication Filter
  // ---------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const researchItems = document.querySelectorAll('.research-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      researchItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
          // Animate re-entry
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(function () {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ---------------------------------------------------------
  // 7. Contact Form Validation & Submission
  // ---------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      contactForm.classList.add('was-validated');

      if (!contactForm.checkValidity()) {
        return;
      }

      // Show loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      btnText.classList.add('d-none');
      btnLoading.classList.remove('d-none');
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual backend/EmailJS)
      setTimeout(function () {
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
        submitBtn.disabled = false;

        formAlert.className = 'alert alert-success';
        formAlert.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong>Message sent!</strong> Thank you for reaching out. Dr. Sharma will reply within 2–3 business days.';

        contactForm.reset();
        contactForm.classList.remove('was-validated');

        setTimeout(function () {
          formAlert.className = 'alert d-none';
        }, 6000);
      }, 1800);
    });
  }

  // ---------------------------------------------------------
  // 8. Back to Top Button
  // ---------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------------------------------------------------
  // 9. Footer Year
  // ---------------------------------------------------------
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------------------------------------------------------
  // 10. Navbar link smooth scroll (handles both #anchor & href)
  // ---------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------------------------------------------------------
  // 11. Hero image parallax tilt (subtle)
  // ---------------------------------------------------------
  const heroImg = document.getElementById('hero-profile-img');
  if (heroImg && window.innerWidth > 768) {
    document.addEventListener('mousemove', function (e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      heroImg.style.transform = 'scale(1) rotate3d(' + (-y * 0.05) + ',' + (x * 0.05) + ', 0, ' + Math.sqrt(x * x + y * y) * 0.3 + 'deg)';
    });

    document.addEventListener('mouseleave', function () {
      heroImg.style.transform = '';
    });
  }

  // ---------------------------------------------------------
  // 12. Tool chip hover sparkle effect (minor)
  // ---------------------------------------------------------
  document.querySelectorAll('.tool-chip').forEach(function (chip) {
    chip.addEventListener('mouseenter', function () {
      chip.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // ---------------------------------------------------------
  // 13. Public Health Background Canvas Animations
  // ---------------------------------------------------------
  initBgHealthCanvas();
  initHeroHealthCanvas();

});


/* =========================================================
   BACKGROUND CANVAS — Blood cells · Atoms · DNA fragments
   ========================================================= */
function initBgHealthCanvas() {
  var canvas = document.getElementById('bgHealthCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ---- Particle class ---- */
  function BgSymbol(init) {
    this.reset(init);
  }
  BgSymbol.prototype.reset = function (initial) {
    this.x = Math.random() * W;
    this.y = initial ? Math.random() * H : H + 40;
    this.size = 10 + Math.random() * 22;
    this.speed = 0.10 + Math.random() * 0.32;
    this.alpha = 0.022 + Math.random() * 0.050;
    this.drift = (Math.random() - 0.5) * 0.22;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSp = (Math.random() - 0.5) * 0.005;
    this.type = Math.floor(Math.random() * 4);
    // 0 = medical cross, 1 = heart outline, 2 = globe circle+lines, 3 = DNA dots
  };
  BgSymbol.prototype.update = function () {
    this.y -= this.speed;
    this.x += this.drift;
    this.rot += this.rotSp;
    if (this.y + this.size < 0 || this.x < -60 || this.x > W + 60) {
      this.reset(false);
    }
  };
  BgSymbol.prototype.draw = function () {
    var s = this.size, a = this.alpha;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);

    if (this.type === 0) {
      /* Medical cross */
      var t = s * 0.30;
      ctx.fillStyle = 'rgba(15,125,91,' + a + ')';
      ctx.fillRect(-t / 2, -s / 2, t, s);
      ctx.fillRect(-s / 2, -t / 2, s, t);

    } else if (this.type === 1) {
      /* Heart outline */
      ctx.strokeStyle = 'rgba(15,125,91,' + a + ')';
      ctx.lineWidth = Math.max(1, s * 0.07);
      ctx.beginPath();
      ctx.moveTo(0, s * 0.30);
      ctx.bezierCurveTo(-s * 0.50, s * 0.08, -s * 0.50, -s * 0.26, 0, -s * 0.05);
      ctx.bezierCurveTo(s * 0.50, -s * 0.26, s * 0.50, s * 0.08, 0, s * 0.30);
      ctx.stroke();

    } else if (this.type === 2) {
      /* Globe / WHO circle with cross-lines */
      ctx.strokeStyle = 'rgba(15,125,91,' + a + ')';
      ctx.lineWidth = Math.max(1, s * 0.06);
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.42); ctx.lineTo(0, s * 0.42);
      ctx.moveTo(-s * 0.42, 0); ctx.lineTo(s * 0.42, 0);
      ctx.stroke();

    } else {
      /* DNA dot helix */
      ctx.fillStyle = 'rgba(15,125,91,' + a + ')';
      var steps = 5;
      for (var i = 0; i < steps; i++) {
        var py = -s / 2 + i * (s / steps);
        var px = Math.sin(i * 1.2) * s * 0.30;
        ctx.beginPath(); ctx.arc(px, py, s * 0.06, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(-px, py, s * 0.06, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
  };

  /* Create particles spread across the full page */
  var COUNT = 50;
  var particles = [];
  for (var i = 0; i < COUNT; i++) {
    particles.push(new BgSymbol(true));
  }

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(loop);
  })();
}

/* =========================================================
   HERO HEALTH CANVAS — ECG heartbeat line + floating symbols
   ========================================================= */
function initHeroHealthCanvas() {
  var canvas = document.getElementById('heroHealthCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    var section = canvas.parentElement;
    canvas.width = section.offsetWidth || window.innerWidth;
    canvas.height = section.offsetHeight || window.innerHeight;
  }
  resize();

  /* Resize when hero section changes size */
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
  }
  window.addEventListener('resize', resize, { passive: true });

  /* ---- ECG waveform function ---- */
  function ecgVal(t) {
    var p = ((t % 1) + 1) % 1;
    if (p < 0.08) return Math.sin(p / 0.08 * Math.PI) * 0.12;        // P wave
    if (p < 0.18) return 0;                                             // PQ flat
    if (p < 0.22) return Math.sin((p - 0.18) / 0.04 * Math.PI) * 0.08;   // Q dip
    if (p < 0.30) return -Math.sin((p - 0.22) / 0.08 * Math.PI);           // R spike ↑
    if (p < 0.36) return Math.sin((p - 0.30) / 0.06 * Math.PI) * 0.12;   // S dip
    if (p < 0.52) return 0;                                             // ST flat
    if (p < 0.70) return Math.sin((p - 0.52) / 0.18 * Math.PI) * 0.28;   // T wave
    return 0;
  }

  /* ---- Hero symbol class ---- */
  function HeroSymbol() { this.reset(true); }
  HeroSymbol.prototype.reset = function (init) {
    var W = canvas.width, H = canvas.height;
    this.x = Math.random() * W;
    this.y = init ? Math.random() * H : H + 55;
    this.size = 18 + Math.random() * 42;
    this.speed = 0.45 + Math.random() * 1.1;
    this.alpha = 0.05 + Math.random() * 0.16;
    this.drift = (Math.random() - 0.5) * 0.65;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSp = (Math.random() - 0.5) * 0.009;
    this.type = Math.floor(Math.random() * 5);
    this.teal = Math.random() < 0.72;
  };
  HeroSymbol.prototype.update = function () {
    this.y -= this.speed;
    this.x += this.drift;
    this.rot += this.rotSp;
    if (this.y + this.size < 0) this.reset(false);
  };
  HeroSymbol.prototype.draw = function () {
    var s = this.size, a = this.alpha;
    var col = this.teal
      ? 'rgba(26,173,128,' + a + ')'
      : 'rgba(130,200,255,' + (a * 0.75) + ')';
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);

    if (this.type === 0) {
      /* Medical cross */
      var t = s * 0.30;
      ctx.fillStyle = col;
      ctx.fillRect(-t / 2, -s / 2, t, s);
      ctx.fillRect(-s / 2, -t / 2, s, t);

    } else if (this.type === 1) {
      /* Filled heart */
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.30);
      ctx.bezierCurveTo(-s * 0.50, s * 0.08, -s * 0.50, -s * 0.26, 0, -s * 0.05);
      ctx.bezierCurveTo(s * 0.50, -s * 0.26, s * 0.50, s * 0.08, 0, s * 0.30);
      ctx.fill();

    } else if (this.type === 2) {
      /* DNA double helix */
      var steps = 8, sh = s / steps;
      ctx.strokeStyle = col;
      ctx.lineWidth = Math.max(1.5, s * 0.04);
      ctx.lineCap = 'round';
      for (var st = 0; st < 2; st++) {
        ctx.beginPath();
        for (var k = 0; k <= steps; k++) {
          var py = -s / 2 + k * sh;
          var px = Math.sin(k * 0.9 + st * Math.PI) * s * 0.28;
          k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      /* Rungs */
      for (var k = 1; k < steps; k += 2) {
        var py = -s / 2 + k * sh;
        var px1 = Math.sin(k * 0.9) * s * 0.28;
        var px2 = Math.sin(k * 0.9 + Math.PI) * s * 0.28;
        ctx.globalAlpha = 0.45;
        ctx.beginPath(); ctx.moveTo(px1, py); ctx.lineTo(px2, py); ctx.stroke();
        ctx.globalAlpha = 1;
      }

    } else if (this.type === 3) {
      /* Circle + cross (WHO emblem style) */
      ctx.strokeStyle = col;
      ctx.lineWidth = Math.max(1.5, s * 0.06);
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.42, 0, Math.PI * 2);
      ctx.stroke();
      var t = s * 0.22;
      ctx.fillStyle = col;
      ctx.fillRect(-t * 0.14, -t * 0.6, t * 0.28, t * 1.2);
      ctx.fillRect(-t * 0.6, -t * 0.14, t * 1.2, t * 0.28);

    } else {
      /* Stethoscope simplified */
      ctx.strokeStyle = col;
      ctx.lineWidth = Math.max(1.5, s * 0.07);
      ctx.lineCap = 'round';
      /* Earpiece circle */
      ctx.beginPath();
      ctx.arc(0, -s * 0.30, s * 0.18, 0, Math.PI * 2);
      ctx.stroke();
      /* Tube + chest piece */
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.12);
      ctx.lineTo(0, s * 0.08);
      ctx.bezierCurveTo(0, s * 0.28, s * 0.28, s * 0.28, s * 0.28, s * 0.08);
      ctx.bezierCurveTo(s * 0.28, -s * 0.08, 0, -s * 0.08, 0, s * 0.08);
      ctx.stroke();
    }
    ctx.restore();
  };

  /* Create 22 hero symbols */
  var heroSymbols = [];
  for (var i = 0; i < 22; i++) {
    heroSymbols.push(new HeroSymbol());
  }

  var phase = 0;

  (function loop() {
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    /* Draw floating symbols */
    for (var i = 0; i < heroSymbols.length; i++) {
      heroSymbols[i].update();
      heroSymbols[i].draw();
    }

    /* ---- ECG Heartbeat Line ---- */
    phase += 0.0018;
    var ecgY = H * 0.87;
    var amp = H * 0.075;
    var cycles = 4.5;

    /* Outer glow pass */
    ctx.strokeStyle = 'rgba(26,173,128,0.10)';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (var x = 0; x <= W; x += 3) {
      var t = phase + (x / W) * cycles;
      var y = ecgY - ecgVal(t) * amp;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* Mid glow */
    ctx.strokeStyle = 'rgba(26,173,128,0.20)';
    ctx.lineWidth = 5;
    ctx.stroke();

    /* Main crisp ECG line */
    ctx.strokeStyle = 'rgba(26,173,128,0.55)';
    ctx.lineWidth = 2;
    ctx.stroke();

    /* Travelling bright dot at the wave peak */
    var dotX = (((phase * 0.6) % 1 + 1) % 1) * W;
    var dotT = phase + (dotX / W) * cycles;
    var dotY = ecgY - ecgVal(dotT) * amp;
    var grad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12);
    grad.addColorStop(0, 'rgba(26,173,128,0.85)');
    grad.addColorStop(0.4, 'rgba(26,173,128,0.35)');
    grad.addColorStop(1, 'rgba(26,173,128,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 12, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(loop);
  })();
}
