const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', '展开导航');
  nav?.classList.remove('is-open');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  nav?.classList.toggle('is-open', open);
});
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) { closeMenu(); menuButton?.focus(); }
});
window.matchMedia('(min-width: 621px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      nav?.querySelectorAll('a[href^="#"]').forEach(link => {
        const current = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
}
document.querySelector('.copy-email')?.addEventListener('click', async event => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(event.currentTarget.dataset.email); status.textContent = '邮箱已复制'; }
  catch { status.textContent = '请选中上方邮箱地址手动复制'; }
});
