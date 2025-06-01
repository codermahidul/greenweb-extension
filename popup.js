document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get("currentSite", (data) => {
    const info = data.currentSite;
    if (info) {
      document.getElementById("url").textContent = new URL(info.url).hostname;
      document.getElementById("size").textContent = info.sizeKB + " KB";
      document.getElementById("co2").textContent = info.co2 + " grams";
      document.getElementById("cleaner").textContent = info.cleanerThan !== "N/A"
        ? `${info.cleanerThan}% cleaner than other sites`
        : "N/A";
    }
  });
});
