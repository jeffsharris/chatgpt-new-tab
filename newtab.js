document.addEventListener('DOMContentLoaded', async () => {
  // Get the selected model from chrome.storage
  chrome.storage.sync.get('selectedModel', async (data) => {
    const model = data.selectedModel || 'text-davinci-002-render-sha-br';
    const url = `https://chat.openai.com/?model=${model}`;

    // Get the current tab
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);

    // Update the current tab's URL and focus on the address bar
    chrome.tabs.update(tab.id, { url: url });
    chrome.windows.update(tab.windowId, { focused: true });
  });
});
