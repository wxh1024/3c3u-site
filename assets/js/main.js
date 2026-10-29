/* 3C3U 非官方网站 — 交互 */
(function () {
  'use strict';

  /* ---------- 导航滚动状态 ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('is-open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('is-open');
    });
  }

  /* ---------- 当前页高亮 ---------- */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === path) a.classList.add('is-active');
  });

  /* ---------- 复制 IP ---------- */
  document.querySelectorAll('.ipbox__copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.parentElement.querySelector('.ipbox__val').textContent.trim();
      var done = function () {
        var old = btn.textContent;
        btn.textContent = '已复制';
        btn.classList.add('is-done');
        setTimeout(function () {
          btn.textContent = old.indexOf('复制') === 0 ? old : '复制地址';
          btn.classList.remove('is-done');
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done).catch(fallback);
      } else fallback();

      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = val;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- 滚动显现 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 数字滚动 ---------- */
  function animate(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = (el.getAttribute('data-dec') || '0') | 0;
    var dur = 1400, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      var v = target * e;
      el.textContent = dec ? v.toFixed(dec) : Math.floor(v).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = dec ? target.toFixed(dec) : target.toLocaleString('en-US');
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); io2.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io2.observe(c); });
  }

  /* ---------- 时间线筛选 ---------- */
  var filters = document.querySelectorAll('.filters button');
  if (filters.length) {
    filters.forEach(function (b) {
      b.addEventListener('click', function () {
        filters.forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        var k = b.getAttribute('data-filter');
        document.querySelectorAll('[data-kind]').forEach(function (item) {
          var show = k === 'all' || item.getAttribute('data-kind').indexOf(k) > -1;
          item.style.display = show ? '' : 'none';
        });
        document.querySelectorAll('.year').forEach(function (y) {
          var visible = y.querySelectorAll('[data-kind]:not([style*="display: none"])').length;
          y.style.display = visible ? '' : 'none';
        });
      });
    });
  }

  /* ---------- 首页方块粒子 ---------- */
  var canvas = document.getElementById('hero-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, blocks = [];

    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      blocks = [];
      var n = Math.min(Math.round((W * H) / 34000), 90);
      for (var i = 0; i < n; i++) {
        blocks.push({
          x: Math.random() * W,
          y: Math.random() * H,
          s: Math.random() < 0.82 ? 4 : 8,
          v: 0.06 + Math.random() * 0.28,
          a: 0.05 + Math.random() * 0.16,
          hot: Math.random() < 0.16
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i];
        ctx.fillStyle = b.hot
          ? 'rgba(255,92,22,' + (b.a * 1.7) + ')'
          : 'rgba(200,198,190,' + b.a + ')';
        ctx.fillRect(Math.round(b.x), Math.round(b.y), b.s, b.s);
        b.y -= b.v;
        if (b.y < -12) { b.y = H + 10; b.x = Math.random() * W; }
      }
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }

  /* ---------- 页脚年份 ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
