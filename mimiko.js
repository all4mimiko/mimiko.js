(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const log = (msg) => {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'black',
      color: 'white',
      padding: '6px 10px',
      borderRadius: '5px',
      fontSize: '14px',
      zIndex: 9999,
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Wait for page and card input field to load
  await sleep(8000);
  const cardInput = document.querySelector('#Field-numberInput');
  if (!cardInput) return log('❌ Card input not found');

  // Focus the card field
  cardInput.focus();
  const rect = cardInput.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  // Simulate native mousedown + mouseup
  ['mousedown', 'mouseup'].forEach((type) => {
    const evt = new MouseEvent(type, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    });
    cardInput.dispatchEvent(evt);
  });

  log('🟢 Triggered autofill on card input');

  // Wait for the popup to render
  await sleep(2000);

  // Simulate ↓ and Enter
  const downArrow = new KeyboardEvent('keydown', {
    key: 'ArrowDown',
    code: 'ArrowDown',
    keyCode: 40,
    which: 40,
    bubbles: true,
  });
  const enterKey = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
  });

  document.dispatchEvent(downArrow);
  await sleep(200);
  document.dispatchEvent(enterKey);

  log('✅ Autofill attempt sent');

  // Wait a moment before clicking Pay Now
  await sleep(3000);

  const payNow = document.querySelector(
    '#__next > div > div > div.css-spk3mf button[type="submit"]'
  );
  if (payNow) {
    payNow.click();
    log('💸 Clicked Pay Now');
  } else {
    log('❌ Pay Now button not found');
  }
})();
