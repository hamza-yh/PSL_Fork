async function loadRankings() {
  try {
    const response = await fetch("https://api.timebase.live/psl/competitor-rankings");
    const data = await response.json();
    const table = document.querySelector('.table');
    
    data.sort((a, b) => (a.bestSingle || Infinity) - (b.bestSingle || Infinity));

let rank = 1; // counter for displayed rows only

data.forEach((player) => {
  const [win, loss] = (player.winLoss?.split("-")) || [0, 0];

  // Skip players with 0-0 record
  if (win == 0 && loss == 0) return;

  const row = document.createElement("div");
  row.className = "row data";

  row.innerHTML = `
    <div class="rank">${rank}</div>
    <div class="stats glass hover">
      <div class="player">${player.name || "N/A"}</div>
      <div>${player.bestSingle?.toFixed(3)}</div>
      <div>${player.seasonMean?.toFixed(3)}</div>
      <div>${player.elimMean?.toFixed(3)}</div>
      <div>${player.solveVariance?.toFixed(3)}</div>
      <div><span class="win">${win}</span> / <span class="loss">${loss}</span></div>
    </div>
  `;

  table.appendChild(row);
  rank++;
});

    
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  await loadRankings();

  document.querySelectorAll('.stats.glass').forEach(statsDiv => {
    statsDiv.style.cursor = "pointer";
    statsDiv.addEventListener('click', function() {
      // Replace with your actual profile page URL and player id variable
      const playerId = statsDiv.querySelector('.player').textContent.trim();
      window.location.href = `/pages/profile.html?id=${encodeURIComponent(playerId)}`;
    });
  });
});