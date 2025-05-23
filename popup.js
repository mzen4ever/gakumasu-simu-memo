document.getElementById("export").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const error = document.getElementById("error");
  status.textContent = "";
  error.textContent = "";

  // Webhook URL の取得（オプション設定から）
  chrome.storage.sync.get(['webhookUrl'], async ({ webhookUrl }) => {
    if (!webhookUrl) {
      error.textContent = "❌ Webhook URLが未設定です。拡張機能のオプションから設定してください。";
      return;
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // スコア取得
        const tds = document.querySelectorAll("table.SimulatorResult_stats__nyeMw tbody td");
        const values = Array.from(tds).map(td => td.innerText);

        // ステージ名取得（例：24-1）
        const span = document.querySelector("div.Simulator_pItemsRow__T_G_R span");
        const stage = span ? span.innerText.trim() : "Unknown";

        // URL取得
        const urlElement = document.querySelector("div.Simulator_url__ZdNaT");
        const url = urlElement ? urlElement.innerText.trim() : "";

        if (values.length === 0) {
          return { error: "❌ スコアが取得できませんでした。" };
        }

        return { values, stage, url };
      }
    });

    if (!result || result.error || !result.values || result.values.length === 0) {
      error.textContent = result?.error || "❌ データが取得できませんでした。";
      return;
    }

    // Webhook に送信
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: result.values,
          stage: result.stage,
          url: result.url
        })
      });
      const text = await response.text();
      status.textContent = "✅ 送信成功: " + text;
    } catch (err) {
      error.textContent = "❌ 送信失敗: " + err.message;
    }
  });
});
