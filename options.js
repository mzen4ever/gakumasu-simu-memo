document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('webhookUrl');
  const status = document.getElementById('status');

  chrome.storage.sync.get(['webhookUrl'], (result) => {
    if (result.webhookUrl) {
      input.value = result.webhookUrl;
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const url = input.value.trim();
    if (url.startsWith("https://script.google.com/macros/")) {
      chrome.storage.sync.set({ webhookUrl: url }, () => {
        status.textContent = "✅ 保存しました";
      });
    } else {
      status.textContent = "❌ 無効なURLです";
    }
  });
});
