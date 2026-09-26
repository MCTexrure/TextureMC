const zipInput = document.getElementById('zipInput');
const packMeta = document.getElementById('packMeta');
const textureList = document.getElementById('textureList');
const previewPane = document.getElementById('previewPane');
const replaceBtn = document.getElementById('replaceBtn');
const replaceInput = document.getElementById('replaceInput');
const downloadBtn = document.getElementById('downloadBtn');

const state = {
  zip: null,
  textureFiles: [],
  selectedTexture: null,
  replacements: {},
};

function setMeta(message) {
  packMeta.innerHTML = message;
}

function renderTextureList() {
  if (!state.textureFiles.length) {
    textureList.innerHTML = '<li class="placeholder">No textures yet.</li>';
    return;
  }

  textureList.innerHTML = state.textureFiles
    .map((file) => {
      const isActive = state.selectedTexture === file.path;
      return `
        <li>
          <button class="texture-item ${isActive ? 'active' : ''}" data-path="${file.path}" type="button">
            <img class="texture-thumb" src="${file.previewUrl}" alt="${file.path}" />
            <span class="texture-name">${file.path}</span>
          </button>
        </li>
      `;
    })
    .join('');

  textureList.querySelectorAll('.texture-item').forEach((button) => {
    button.addEventListener('click', () => selectTexture(button.dataset.path));
  });
}

function setPreviewFromPath(path, url) {
  previewPane.classList.remove('empty');
  previewPane.innerHTML = `<img src="${url}" alt="${path}" />`;
}

function updatePreview() {
  if (!state.selectedTexture) {
    previewPane.classList.add('empty');
    previewPane.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🧩</div>
        <p>Select a texture to preview it here.</p>
      </div>
    `;
    return;
  }

  const texture = state.textureFiles.find((item) => item.path === state.selectedTexture);
  if (!texture) return;

  const replacement = state.replacements[texture.path];
  const source = replacement || texture.previewUrl;
  setPreviewFromPath(texture.path, source);
}

function selectTexture(path) {
  state.selectedTexture = path;
  renderTextureList();
  updatePreview();
  replaceBtn.disabled = false;
}

async function readZip(file) {
  const zip = await JSZip.loadAsync(file);
  const entries = Object.keys(zip.files).filter((name) => !zip.files[name].dir);
  const textureEntries = entries.filter((name) => /\.(png|jpe?g|gif|webp)$/i.test(name));

  const texts = await Promise.all(
    textureEntries.map(async (path) => {
      const blob = await zip.file(path).async('blob');
      const previewUrl = URL.createObjectURL(blob);
      return { path, previewUrl };
    })
  );

  state.textureFiles = texts;
  state.zip = zip;

  if (!state.textureFiles.length) {
    setMeta('<strong>No textures found.</strong><br>Upload a resource pack with PNG or JPG textures.');
    textureList.innerHTML = '<li class="placeholder">No image textures detected.</li>';
    downloadBtn.disabled = true;
    return;
  }

  let packInfo = '<strong>Pack loaded.</strong><br>';

  const packMetaPath = entries.find((name) => name.toLowerCase() === 'pack.mcmeta') || entries.find((name) => /pack\.mcmeta$/i.test(name));
  if (packMetaPath) {
    const metaText = await zip.file(packMetaPath).async('string');
    try {
      const packJson = JSON.parse(metaText);
      const description = packJson.pack?.description || 'Custom resource pack';
      const format = packJson.pack?.pack_format ?? 'unknown';
      packInfo += `Description: ${description}<br>Format: ${format}<br>`;
    } catch (e) {
      packInfo += 'pack.mcmeta is present but could not be parsed.<br>';
    }
  }

  packInfo += `Texture files: ${state.textureFiles.length}`;
  setMeta(packInfo);

  state.selectedTexture = state.textureFiles[0].path;
  renderTextureList();
  updatePreview();
  downloadBtn.disabled = false;
}

zipInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    await readZip(file);
  } catch (error) {
    console.error(error);
    setMeta('<strong>Could not read this zip file.</strong><br>Please upload a valid Minecraft resource pack.');
  }
});

replaceBtn.addEventListener('click', () => {
  if (!state.selectedTexture) return;
  replaceInput.click();
});

replaceInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const source = await file.arrayBuffer();
  state.replacements[state.selectedTexture] = { url, buffer: source };
  updatePreview();
  replaceInput.value = '';
});

async function downloadPack() {
  if (!state.zip) return;

  const newZip = new JSZip();

  for (const [path, entry] of Object.entries(state.zip.files)) {
    if (entry.dir) continue;
    const replacement = state.replacements[path];
    if (replacement) {
      newZip.file(path, replacement.buffer);
      continue;
    }

    const content = await state.zip.file(path).async('uint8array');
    newZip.file(path, content);
  }

  const blob = await newZip.generateAsync({ type: 'blob' });
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = 'modified-texture-pack.zip';
  a.click();
  URL.revokeObjectURL(href);
}

downloadBtn.addEventListener('click', downloadPack);

// Make the app ready for a nice first impression if the user opens it in the browser.
setMeta('<strong>TextureMC is ready.</strong><br>Upload a Minecraft resource pack to inspect, remix, and export it.');
