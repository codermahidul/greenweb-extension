chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.type === "getPageInfo") {
    const siteUrl = message.url;

    try {
      const response = await fetch(`https://api.websitecarbon.com/site?url=${encodeURIComponent(siteUrl)}`);
      const data = await response.json();

      const grams = data.statistics.co2.grid.grams.toFixed(2);
      const bytes = data.statistics.adjustedBytes;
      const cleanerThan = Math.round(data.cleanerThan * 100);

      chrome.storage.local.set({
        currentSite: {
          url: siteUrl,
          co2: grams,
          sizeKB: (bytes / 1024).toFixed(2),
          cleanerThan
        }
      });
    } catch (error) {
      console.error("Carbon API Error:", error);
      chrome.storage.local.set({
        currentSite: {
          url: siteUrl,
          co2: "N/A",
          sizeKB: "N/A",
          cleanerThan: "N/A"
        }
      });
    }
  }
});
