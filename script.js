const reserveDialog = document.querySelector('#reserve-dialog');
let lastFocusedElement = null;

document.querySelectorAll('.js-reserve').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    lastFocusedElement = button;
    if (reserveDialog && typeof reserveDialog.showModal === 'function') {
      reserveDialog.showModal();
    }
  });
});

if (reserveDialog) {
  reserveDialog.querySelectorAll('.dialog-close, .dialog-ok').forEach((button) => {
    button.addEventListener('click', () => reserveDialog.close());
  });

  reserveDialog.addEventListener('click', (event) => {
    if (event.target === reserveDialog) reserveDialog.close();
  });

  reserveDialog.addEventListener('close', () => lastFocusedElement?.focus());
}

document.querySelectorAll('[data-unavailable]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
  link.setAttribute('aria-disabled', 'true');
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  const summary = item.querySelector('summary');
  summary?.setAttribute('aria-expanded', String(item.open));
  item.addEventListener('toggle', () => {
    summary?.setAttribute('aria-expanded', String(item.open));
    if (!item.open) return;
    document.querySelectorAll('.faq-list details[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
