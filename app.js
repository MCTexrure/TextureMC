:root {
  --bg: #0b1020;
  --panel: rgba(19, 26, 46, 0.9);
  --panel-border: rgba(148, 163, 184, 0.18);
  --panel-alt: rgba(10, 14, 24, 0.9);
  --text: #e5eefc;
  --muted: #a7b2c4;
  --accent: #67e8f9;
  --accent-strong: #22c55e;
  --warn: #fbbf24;
  --shadow: rgba(15, 23, 42, 0.8);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 32%),
    linear-gradient(160deg, #090d17 0%, #101a2b 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}

button,
input {
  font: inherit;
}

.page-shell {
  width: min(1400px, 100%);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  padding: 18px 18px 10px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #67e8f9, #22c55e);
  color: #06191d;
  font-weight: 800;
  font-size: 1.25rem;
  box-shadow: 0 12px 30px rgba(34, 197, 94, 0.25);
}

.eyebrow {
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

h1 {
  margin: 0;
  font-size: clamp(1.7rem, 2vw, 2.5rem);
}

.layout {
  display: grid;
  grid-template-columns: 330px minmax(320px, 1fr) 340px;
  gap: 22px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: 18px;
  box-shadow: 0 18px 40px var(--shadow);
  backdrop-filter: blur(8px);
}

.sidebar,
.preview-panel,
.files-panel {
  padding: 18px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.1rem;
}

.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  padding: 18px;
  border: 1.5px dashed rgba(103, 232, 249, 0.5);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.7);
  text-align: center;
  color: var(--muted);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.upload-box:hover {
  transform: translateY(-1px);
  border-color: rgba(103, 232, 249, 0.9);
}

.upload-box input {
  display: none;
}

.meta-card {
  margin-top: 18px;
  background: rgba(8, 12, 22, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 14px;
  padding: 14px;
}

.meta-card h3 {
  margin: 0 0 12px;
  font-size: 0.95rem;
  color: var(--muted);
}

.meta-empty {
  color: var(--muted);
  line-height: 1.5;
}

.primary-btn,
.secondary-btn {
  border: 0;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.2s ease, opacity 0.2s ease;
}

.primary-btn {
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #031316;
  box-shadow: 0 12px 28px rgba(34, 197, 94, 0.35);
}

.secondary-btn {
  width: 100%;
  background: rgba(103, 232, 249, 0.12);
  color: var(--text);
  border: 1px solid rgba(103, 232, 249, 0.2);
  margin-bottom: 10px;
}

button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  filter: brightness(1.06);
}

.preview-panel {
  min-height: 580px;
}

.preview-pane {
  min-height: 500px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.12);
  background: linear-gradient(180deg, rgba(6, 10, 18, 0.8), rgba(17, 24, 39, 0.8));
  display: grid;
  place-items: center;
  overflow: hidden;
}

.preview-pane img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  padding: clamp(12px, 2vw, 28px);
}

.preview-pane.empty {
  color: var(--muted);
}

.empty-state {
  text-align: center;
  display: grid;
  gap: 12px;
  padding: 24px;
}

.empty-icon {
  font-size: 3rem;
}

.texture-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  max-height: 540px;
  overflow: auto;
}

.texture-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.12);
  background: rgba(15, 23, 42, 0.75);
  color: var(--text);
  padding: 10px 12px;
  border-radius: 12px;
  text-align: left;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.texture-item:hover,
.texture-item.active {
  border-color: rgba(103, 232, 249, 0.8);
  transform: translateX(2px);
}

.texture-thumb {
  width: 42px;
  height: 42px;
  border-radius: 9px;
  object-fit: cover;
  background: rgba(148, 163, 184, 0.08);
}

.texture-name {
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.placeholder {
  color: var(--muted);
  padding: 12px 14px;
}

@media (max-width: 980px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .preview-panel {
    min-height: 420px;
  }
}
