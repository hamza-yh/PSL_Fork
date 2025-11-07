function getPersonId() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id")) return params.get("id");
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;  // last two digits
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function truncateAtWord(str, maxLength) {
    console.log(str)
    console.log(str.length)
    if (str.length <= maxLength) return str;
    const trimmed = str.substr(0, maxLength);
    return trimmed.substr(0, trimmed.lastIndexOf(' '));
}

// Truncate a number to `decimals` decimal places without rounding.
// Returns a string with fixed decimals (e.g. 1.234 -> "1.23").
function truncateNumber(num, decimals = 3) {
    if (typeof num !== 'number' || !isFinite(num)) return null;
    const factor = Math.pow(10, decimals);
    const truncated = Math.trunc(num * factor) / factor;
    return truncated.toFixed(decimals);
}

const toEmbed = url => {
  const u = new URL(url);
  const id = u.pathname.split("/").pop();
  const si = u.searchParams.get("si");
  const t = +u.searchParams.get("t") + 1 || 0;
  return `https://www.youtube.com/embed/${id}?&amp;start=${t}`;
};

function renderMatch(match, data) {
    return `
        <div class="match-item">
            <div class="match-header">
                <div class="comp-name"> 
                    <div class="justify-right">${data.name}</div>
                    <div class="match-score ${match.setWins > match.setLosses ?"win":"loss"}">${match.setWins}</div>
                </div>  
                <div class="opp-name">
                    <div class="match-score ${match.setWins > match.setLosses ?"loss":"win"}">${match.setLosses}</div>
                    <div class="justify-left">${match.opponent}</div>
                </div>
            </div>
            <div class="match-sets">
            ${match.sets.map(set => `
                <div class="set glass hover">
                    <div class="set-header">
                        <div class="align-right">${set.solveWins}</div>
                        <div class="set-info">
                            <div class="${set.solveWins > set.solveLosses ?"win":"loss"}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>
                            </div>
                            <div>Set ${set.set}</div>
                            <div class="${set.solveWins > set.solveLosses ?"loss":"win"}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>                            
                            </div>
                        </div>
                        <div class="align-left">${set.solveLosses}</div>

                   <div class="set-toggle ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.482a1 1 0 0 1-1.506 0z"/>
                    </svg>
                    </div>

                    </div> 
                    <div class="set-solve collapsed">    
                        ${set.solves.map((solve, i) => `
                            <div class="align-right solve-time ${solve.win ?"":"dark"}">${solve.competitorTime ?? "N/A"}</div>
                            <div class="align-center solve-info">
                                <div class="link"><a target="_blank" href="${solve.competitorYoutubeUrl.replace('/embed/', '/live/')}" ><svg class="${solve.win ?"":"dark-link"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M290.4 19.8C295.4 7.8 307.1 0 320 0L480 0c17.7 0 32 14.3 32 32l0 160c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9L400 157.3 246.6 310.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L354.7 112 297.4 54.6c-9.2-9.2-11.9-22.9-6.9-34.9zM0 176c0-44.2 35.8-80 80-80l80 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-80 0c-8.8 0-16 7.2-16 16l0 256c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-80c0-17.7 14.3-32 32-32s32 14.3 32 32l0 80c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 176z"/></svg></a></div>
                                <div>${i}</div>
                                <div class="link"><a target="_blank" href="${solve.opponentYoutubeUrl.replace('/embed/', '/live/')}" ><svg class="${solve.win ?"dark-link":""}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M290.4 19.8C295.4 7.8 307.1 0 320 0L480 0c17.7 0 32 14.3 32 32l0 160c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9L400 157.3 246.6 310.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L354.7 112 297.4 54.6c-9.2-9.2-11.9-22.9-6.9-34.9zM0 176c0-44.2 35.8-80 80-80l80 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-80 0c-8.8 0-16 7.2-16 16l0 256c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-80c0-17.7 14.3-32 32-32s32 14.3 32 32l0 80c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 176z"/></svg></a></div>
                            </div>
                            <div class="align-left solve-time ${solve.win ?"dark":""}">${solve.opponentTime ?? "N/A"}</div>
                        `).join("")}
                    </div>
                </div>
            `).join("")}

        </div>
        </div>
    `;

    // <div class="match-footer">
    // <div>${match.matchName}</div>
    // <div class="link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M290.4 19.8C295.4 7.8 307.1 0 320 0L480 0c17.7 0 32 14.3 32 32l0 160c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9L400 157.3 246.6 310.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L354.7 112 297.4 54.6c-9.2-9.2-11.9-22.9-6.9-34.9zM0 176c0-44.2 35.8-80 80-80l80 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-80 0c-8.8 0-16 7.2-16 16l0 256c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-80c0-17.7 14.3-32 32-32s32 14.3 32 32l0 80c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 176z"/></svg></div>
    // </div>
}

async function renderProfile() {
    const id = getPersonId();
    const footer = document.querySelector("#navbar");
    const addSection = (html) => footer.insertAdjacentHTML("afterend", html);

    const response = await fetch(`https://api.timebase.live/psl/competitor-profile?name=${encodeURIComponent(id)}`);
    const data = await response.json();
    console.log(data);
    if (!id) {                      
        profileDiv.textContent = "No ID provided in the URL.";
        return;
    }

    // profile's header

    const sectionSeason = `
    <div class="season title" >Season ${data.season}</div>`

    const sectionHeader = `
    <section class="profile-header">
        <div>
            <h1 class="title rank fade-down">Ranked ${ordinal(data.seasonRank)}</h1>
            <h1 class="title name fade-down">${data.name}</h1>
        </div>
        <div class="profile-image-container">
        <img src="${`/assets/profile_images/${data.name}.png`}" alt="Profile Image" class="profile-image">
        </div>
    </section>`;

    // profile stats
 
    const sectionStats = `
    <section class="profile-stats glass">
    <div>
        <div>
            <h2 class="stats-title">Season ${data.season} Stats</h2>
        </div>
        <div class="left-stats">
            <div>
                <div class="value solve-time">${data.bestSingle ?? "-"}</div>
                <div class="label">BEST SINGLE</div>
            </div>
            <div >
                <div class="value solve-time">${data.seasonMean ?? "-"}</div>
                <div class="label">SEASON MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${data.elimMean ?? "-"}</div>
                <div class="label">ELIMINATION MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${data.solveVariance ?? "-"}</div>
                <div class="label">SOLVE VARIANCE</div>
            </div>
            <div class="stat-item">
                <div class="value solve-time">${data.matchWins}-${data.matchLosses}</div>
                <div class="label">WIN LOSS RECORD</div>
            </div>
        </div>
    </div>
        <div class="mid-stats">
            <div class="stat-item">
                <div class="value solve-time">${data.totalEvents ?? "-"}</div>
                <div class="label">TOTAL MATCHES</div>
            </div>
            <div class="stat-item">
                <div class="value">${data.totalSeasons ?? "-"}</div>
                <div class="label">TOTAL SEASONS</div>
            </div>
        </div>

    <div>
        <div>
            <h2 class="stats-title">Career Stats</h2>
        </div>
        <div class="right-stats">
            <div>
                <div class="value solve-time">${data.bestSingle ?? "-"}</div>
                <div class="label">BEST SINGLE</div>
            </div>
            <div >
                <div class="value solve-time">${data.seasonMean ?? "-"}</div>
                <div class="label">SEASON MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${data.elimMean ?? "-"}</div>
                <div class="label">ELIMINATION MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${data.solveVariance ?? "-"}</div>
                <div class="label">SOLVE VARIANCE</div>
            </div>
            <div class="stat-item">
                <div class="value solve-time">${data.matchWins}-${data.matchLosses}</div>
                <div class="label ">WIN LOSS RECORD</div>
            </div>
        </div>
    </div>
    </section>`;

    // profile videos
    function findBestSolveUrl(data) {
        let best = { time: Infinity, url: null };
        data.matches.forEach(match =>
            match.sets.forEach(set =>
            set.solves.forEach(solve => {
                if (solve.competitorTime < best.time && solve.competitorTime !== -1) {
                best = { time: solve.competitorTime, url: solve.competitorYoutubeUrl };
                }
            })
            )
        );
        return best.url;
    }

    let bestUrl = findBestSolveUrl(data);

    if (bestUrl && bestUrl.includes("live")) {
        bestUrl = toEmbed(bestUrl);
    }
    
    const sectionVideos = `
    <section class="videos-section">
        <div>
            <h1 class="title">${data.bestSingle}</h1>
            <h1 >Best Single Solve</h1>
        </div>
        <div class="video"><iframe width="560" height="315" src=${bestUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
    </section>`;

    // profile matches
    const sectionMatches = `
    <section class="matches-list">
        <h1 class="matches-title title">Recent Matches</h1>
        ${data.matches.map(match => renderMatch(match, data)).join("")}
    </section>`;

    [sectionSeason, sectionHeader, sectionStats, sectionVideos, sectionMatches].reverse().forEach(addSection);
}



document.addEventListener("DOMContentLoaded", async () => {
    // render the profile
    await renderProfile();

document.querySelectorAll('.set.glass').forEach(setDiv => {
  setDiv.addEventListener('click', function(e) {
    if (e.target.closest('a') || e.target.closest('button')) return;
    const setSolve = setDiv.querySelector('.set-solve');
    const icon = setDiv.querySelector('.set-toggle');

    if (setSolve) {
      setSolve.classList.toggle('collapsed');

      // toggle icon rotation
      if (icon) icon.classList.toggle('rotated');
    }
  });
});
});