document.getElementById('addModel').addEventListener('click', () => {
  const displayName = document.getElementById('displayName').value;
  const modelUrl = document.getElementById('modelUrl').value;

  if (!displayName || !modelUrl) return;

  chrome.storage.sync.get('models', (data) => {
    const models = data.models || [];
    models.push({ displayName, url: modelUrl });

    chrome.storage.sync.set({ models }, () => {
      updateModelList();
      document.getElementById('displayName').value = '';
      document.getElementById('modelUrl').value = '';
    });
  });
});

function updateModelList() {
  chrome.storage.sync.get('models', (data) => {
    const models = data.models || [];
    const modelList = document.getElementById('modelList');
    modelList.innerHTML = '';

    models.forEach((model, index) => {
      const listItem = document.createElement('li');
      listItem.style.display = 'flex';
      listItem.style.justifyContent = 'space-between';
      listItem.style.alignItems = 'center';
      listItem.style.marginBottom = '16px';

      const displayNameWrapper = document.createElement('div');
      displayNameWrapper.style.width = 'calc(33% - 8px)';

      const displayName = document.createElement('span');
      displayName.textContent = model.displayName;
      displayNameWrapper.appendChild(displayName);
      listItem.appendChild(displayNameWrapper);

      const modelUrlWrapper = document.createElement('div');
      modelUrlWrapper.style.width = 'calc(33% - 8px)';
      modelUrlWrapper.style.textAlign = 'center';

      const modelUrl = document.createElement('span');
      modelUrl.textContent = model.url;
      modelUrlWrapper.appendChild(modelUrl);

      listItem.appendChild(modelUrlWrapper);

      const deleteIcon = document.createElement('span');
      deleteIcon.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>';
      deleteIcon.style.cursor = 'pointer';
      deleteIcon.addEventListener('click', () => deleteModel(index));
      listItem.appendChild(deleteIcon);

      modelList.appendChild(listItem);
    });
  });
}


updateModelList();

function deleteModel(index) {
  chrome.storage.sync.get('models', (data) => {
    const models = data.models || [];
    models.splice(index, 1);

    chrome.storage.sync.set({ models }, () => {
      updateModelList();
    });
  });
}
