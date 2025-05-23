document.getElementById("export").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const error = document.getElementById("error");
  status.textContent = "";
  error.textContent = "";

  chrome.storage.sync.get(['webhookUrl'], async ({ webhookUrl }) => {
    if (!webhookUrl) {
      error.textContent = "Webhook URLが未設定です。拡張機能のオプションから設定してください。";
      return;
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const tds = document.querySelectorAll("table.SimulatorResult_stats__nyeMw tbody td");
        const values = Array.from(tds).map(td => td.innerText);

        const span = document.querySelector("div.Simulator_pItemsRow__T_G_R span");
        const stage = span ? span.innerText.trim() : "Unknown";

        const urlElement = document.querySelector("div.Simulator_url__ZdNaT");
        const url = urlElement ? urlElement.innerText.trim() : "";

        if (values.length === 0) {
          return { error: "スコアが取得できませんでした。" };
        }

        return { values, stage, url };
      }
    });

    if (!result || result.error || !result.values || result.values.length === 0) {
      error.textContent = result?.error || "データが取得できませんでした。";
      return;
    }

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
      status.textContent = "送信成功: " + text;
    } catch (err) {
      error.textContent = "送信失敗: " + err.message;
    }
  });
});

// 「んにゃあ」→「ん”に”ゃ”あ”」変換機能
document.getElementById("quoteInput").addEventListener("input", () => {
  const input = document.getElementById("quoteInput").value;
  let result = "";
  for (let i = 0; i < input.length; i++) {
    if (i === 0) {
      result += input[i];
    } else {
      result += input[i] + "”"; // 全角ダブルクォート
    }
  }
  document.getElementById("quoteResult").textContent = result;
  document.getElementById("copyStatus").textContent = ""; // コピー状態をクリア
});

// コピー処理
document.getElementById("copyButton").addEventListener("click", () => {
  const resultText = document.getElementById("quoteResult").textContent;
  if (!resultText) return;

  navigator.clipboard.writeText(resultText).then(() => {
    document.getElementById("copyStatus").textContent = "コピーしました";
  }).catch(err => {
    document.getElementById("copyStatus").textContent = "コピーに失敗しました";
  });
});
