document.addEventListener("DOMContentLoaded", () => {
  // 送信ボタン処理
  document.getElementById("export").addEventListener("click", async () => {
    const status = document.getElementById("status");
    const error = document.getElementById("error");
    const note = document.getElementById("noteInput").value;

    status.textContent = "送信中…";
    error.textContent = "";

    chrome.storage.sync.get(['webhookUrl'], async ({ webhookUrl }) => {
      if (!webhookUrl) {
        status.textContent = "";
        error.textContent = "Webhook URLが未設定です。オプションで設定してください。";
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

<<<<<<< HEAD
          const urlElement = document.querySelector("div.Simulator_url__ZdNaT");
          const url = urlElement ? urlElement.innerText.trim() : "";
=======
          const meta = document.querySelector('meta[property="og:image"]');
          const imageUrl = meta ? meta.getAttribute("content") : "";
>>>>>>> master

          if (values.length === 0) {
            return { error: "スコアが取得できませんでした。" };
          }

<<<<<<< HEAD
          return { values, stage, url };
=======
          return { values, stage, imageUrl };
>>>>>>> master
        }
      });

      if (!result || result.error || !result.values || result.values.length === 0) {
        status.textContent = "";
        error.textContent = result?.error || "データが取得できませんでした。";
        return;
      }

<<<<<<< HEAD
=======
      // og:image URLからSimulator URLを復元
      let simulatorUrl = "";
      if (result.imageUrl) {
        const queryIndex = result.imageUrl.indexOf("?");
        if (queryIndex !== -1) {
          const query = result.imageUrl.slice(queryIndex + 1);
          simulatorUrl = `https://gktools.ris.moe/simulator/?${query}`;
        }
      }

>>>>>>> master
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            values: result.values,
            stage: result.stage,
<<<<<<< HEAD
            url: result.url,
=======
            url: simulatorUrl,
>>>>>>> master
            note: note
          })
        });
        const text = await response.text();
        status.textContent = "送信成功: " + text;
      } catch (err) {
        status.textContent = "";
        error.textContent = "送信失敗: " + err.message;
      }
    });
  });

  // 鳴き声変換
  document.getElementById("quoteInput").addEventListener("input", () => {
    const input = document.getElementById("quoteInput").value;
    const result = Array.from(input).map(char => char + "゛").join("");
    document.getElementById("quoteResult").textContent = result;
    document.getElementById("copyStatus").textContent = "";
  });

  // コピー
  document.getElementById("copyButton").addEventListener("click", () => {
    const result = document.getElementById("quoteResult").textContent;
    navigator.clipboard.writeText(result).then(() => {
      document.getElementById("copyStatus").textContent = "コピーしました！";
    });
  });
});
