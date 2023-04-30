const hardcodedModels = [
  {
    displayName: 'Default (GPT-3.5) with browsing alpha',
    url: 'text-davinci-002-render-sha-br',
  },
  {
    displayName: 'Default (GPT-3.5)',
    url: 'ext-davinci-002-render-sha',
  },
  {
    displayName: 'GPT-4',
    url: 'gpt-4',
  },
];

function loadModels(callback) {
  chrome.storage.sync.get('models', (data) => {
    const models = data.models || [];
    callback([...hardcodedModels, ...models]);
  });
}

function createModelListItems(models) {
  const list = document.querySelector('#modelList');
  list.innerHTML = '';

  models.forEach((model) => {
    const listItem = document.createElement('li');
    listItem.dataset.model = model.url;
    listItem.textContent = model.displayName;
    listItem.addEventListener('click', () => {
      clearSelected();
      listItem.classList.add('selected');

      // Save the selected model to chrome.storage
      chrome.storage.sync.set({ selectedModel: model.url }, () => {
        window.close();
      });
    });

    list.appendChild(listItem);
  });

  // Set the current model as selected
  chrome.storage.sync.get('selectedModel', (data) => {
    const currentModel = data.selectedModel || 'text-davinci-002-render-sha-br';
    const currentModelItem = document.querySelector(`li[data-model="${currentModel}"]`);

    if (currentModelItem) {
      clearSelected();
      currentModelItem.classList.add('selected');
    }
  });
}

function clearSelected() {
  const listItems = document.querySelectorAll('li[data-model]');
  for (const listItem of listItems) {
    listItem.classList.remove('selected');
  }
}

// Load the models from chrome.storage.sync when the popup is opened
document.addEventListener('DOMContentLoaded', () => {
  loadModels((models) => {
    createModelListItems(models);
  });
});

// Open the options page when the "Settings" button is clicked
document.getElementById('settings').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});
