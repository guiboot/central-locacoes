// ===== HEADER SCROLL =====
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.dif-card, .equip-card, .serv-card, .galeria-item, .contato-form, .contato-info, .section-header');
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== FORM -> WHATSAPP =====
const form = document.getElementById('contatoForm');
const PHONE = '5544988117615';

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome') || '';
  const telefone = data.get('telefone') || '';
  const email = data.get('email') || '';
  const servico = data.get('servico') || '';
  const metragem = data.get('metragem') || '';
  const mensagem = data.get('mensagem') || '';

  const linhas = [
    `*Solicitação de Orçamento - Central Locações*`,
    ``,
    `*Nome:* ${nome}`,
    `*Telefone:* ${telefone}`,
    email ? `*E-mail:* ${email}` : null,
    `*Serviço:* ${servico}`,
    metragem ? `*Metragem:* ${metragem} m²` : null,
    mensagem ? `*Detalhes:* ${mensagem}` : null,
  ].filter(Boolean);

  const texto = encodeURIComponent(linhas.join('\n'));
  window.open(`https://wa.me/${PHONE}?text=${texto}`, '_blank');
});

// ===== AUTOPLAY DE VÍDEOS (fallback mobile) =====
// iOS Safari e Chrome mobile bloqueiam autoplay em algumas condições
// (Low Power Mode, Data Saver, primeira visita). Forçamos o play
// quando o vídeo está pronto e tentamos de novo no primeiro gesto do usuário.
const autoplayVideos = document.querySelectorAll('video[autoplay]');

const tryPlay = (video) => {
  video.muted = true;            // garante muted antes do play
  const promise = video.play();
  if (promise && typeof promise.catch === 'function') {
    promise.catch(() => {
      // bloqueado - aguarda primeiro gesto do usuário e tenta de novo
      const retry = () => {
        autoplayVideos.forEach(v => v.play().catch(() => {}));
        ['touchstart','click','scroll','keydown'].forEach(ev =>
          document.removeEventListener(ev, retry)
        );
      };
      ['touchstart','click','scroll','keydown'].forEach(ev =>
        document.addEventListener(ev, retry, { passive: true, once: false })
      );
    });
  }
};

autoplayVideos.forEach(video => {
  video.muted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  if (video.readyState >= 2) {
    tryPlay(video);
  } else {
    video.addEventListener('loadedmetadata', () => tryPlay(video), { once: true });
    video.addEventListener('canplay',        () => tryPlay(video), { once: true });
  }

  video.addEventListener('error', () => { video.style.display = 'none'; });
});

// retoma reprodução ao voltar pra aba
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    autoplayVideos.forEach(v => { if (v.paused) v.play().catch(() => {}); });
  }
});
