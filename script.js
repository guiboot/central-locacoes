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

// ===== HERO VIDEO FALLBACK =====
// Se o navegador não tocar o .MOV automaticamente, escurece um pouco mais o overlay
document.querySelectorAll('video').forEach(v => {
  v.addEventListener('error', () => {
    v.style.display = 'none';
  });
});
