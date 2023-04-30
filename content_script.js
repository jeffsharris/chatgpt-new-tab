window.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault(); // Prevent the default Tab key behavior

    const elementToFocus = document.querySelector('textarea[tabindex="0"][data-id="root"][placeholder="Send a message."]');
    if (elementToFocus) {
      elementToFocus.focus();
    }
  }
});
