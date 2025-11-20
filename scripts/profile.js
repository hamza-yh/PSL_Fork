function getPersonId() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id")) return params.get("id");
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;  // last two digits
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function displayTime(num) {
    if (num=== null || num === undefined) return "N/A";
    if (Math.floor(num)==-1) return "DNF";
    if (Math.floor(num)==-2) return "DNS";
    return num.toFixed(3);
}

const toEmbed = url => {
  const u = new URL(url);
  const id = u.pathname.split("/").pop();
  const si = u.searchParams.get("si");
  const t = +u.searchParams.get("t") + 1 || 0;
  return `https://www.youtube.com/embed/${id}?&amp;start=${t}`;
};

function renderMatch(match, data, matchIndex = 0) {
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
            ${match.sets.map((set, si) => `
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
            <div class="set-solve ${ (matchIndex === 0 && si === 0) ? '' : 'collapsed' }">    
                    ${set.solves.map((solve, i) => `
                        <div class="align-right solve-time ${solve.win ?"":"dark"}">${displayTime(solve.competitorTime)}</div>
                            <div class="align-center solve-info">
                            <div class="link"><a target="_blank" href="${solve.competitorYoutubeUrl.replace('/embed/', '/live/')}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white">
                                    <path d="M 284.44444444444446 128 Q 297.77777777777777 128.88888888888889 298.6666666666667 142.22222222222223 L 298.6666666666667 369.77777777777777 L 298.6666666666667 369.77777777777777 Q 297.77777777777777 383.1111111111111 284.44444444444446 384 L 56.888888888888886 384 L 56.888888888888886 384 Q 43.55555555555556 383.1111111111111 42.666666666666664 369.77777777777777 L 42.666666666666664 142.22222222222223 L 42.666666666666664 142.22222222222223 Q 43.55555555555556 128.88888888888889 56.888888888888886 128 L 284.44444444444446 128 L 284.44444444444446 128 Z M 56.888888888888886 85.33333333333333 Q 32.888888888888886 86.22222222222223 16.88888888888889 102.22222222222223 L 16.88888888888889 102.22222222222223 L 16.88888888888889 102.22222222222223 Q 0.8888888888888888 118.22222222222223 0 142.22222222222223 L 0 369.77777777777777 L 0 369.77777777777777 Q 0.8888888888888888 393.77777777777777 16.88888888888889 409.77777777777777 Q 32.888888888888886 425.77777777777777 56.888888888888886 426.6666666666667 L 284.44444444444446 426.6666666666667 L 284.44444444444446 426.6666666666667 Q 308.44444444444446 425.77777777777777 324.44444444444446 409.77777777777777 Q 340.44444444444446 393.77777777777777 341.3333333333333 369.77777777777777 L 341.3333333333333 340.44444444444446 L 341.3333333333333 340.44444444444446 L 341.3333333333333 171.55555555555554 L 341.3333333333333 171.55555555555554 L 341.3333333333333 142.22222222222223 L 341.3333333333333 142.22222222222223 Q 340.44444444444446 118.22222222222223 324.44444444444446 102.22222222222223 Q 308.44444444444446 86.22222222222223 284.44444444444446 85.33333333333333 L 56.888888888888886 85.33333333333333 L 56.888888888888886 85.33333333333333 Z M 469.3333333333333 160.88888888888889 L 469.3333333333333 351.1111111111111 L 469.3333333333333 160.88888888888889 L 469.3333333333333 351.1111111111111 L 369.77777777777777 306.6666666666667 L 369.77777777777777 306.6666666666667 L 369.77777777777777 353.77777777777777 L 369.77777777777777 353.77777777777777 L 462.22222222222223 395.55555555555554 L 462.22222222222223 395.55555555555554 Q 469.3333333333333 398.22222222222223 477.3333333333333 398.22222222222223 Q 491.55555555555554 398.22222222222223 501.3333333333333 387.55555555555554 Q 512 377.77777777777777 512 363.55555555555554 L 512 149.33333333333334 L 512 149.33333333333334 Q 512 134.22222222222223 501.3333333333333 124.44444444444444 Q 491.55555555555554 113.77777777777777 477.3333333333333 113.77777777777777 Q 469.3333333333333 113.77777777777777 462.22222222222223 117.33333333333333 L 369.77777777777777 158.22222222222223 L 369.77777777777777 158.22222222222223 L 369.77777777777777 205.33333333333334 L 369.77777777777777 205.33333333333334 L 469.3333333333333 160.88888888888889 L 469.3333333333333 160.88888888888889 Z M 135.11111111111111 170.66666666666666 Q 115.55555555555556 172.44444444444446 113.77777777777777 192 Q 115.55555555555556 211.55555555555554 135.11111111111111 213.33333333333334 L 183.11111111111111 213.33333333333334 L 183.11111111111111 213.33333333333334 L 91.55555555555556 304.8888888888889 L 91.55555555555556 304.8888888888889 Q 79.11111111111111 320 91.55555555555556 335.1111111111111 Q 106.66666666666667 347.55555555555554 121.77777777777777 335.1111111111111 L 213.33333333333334 243.55555555555554 L 213.33333333333334 243.55555555555554 L 213.33333333333334 291.55555555555554 L 213.33333333333334 291.55555555555554 Q 215.11111111111111 311.1111111111111 234.66666666666666 312.8888888888889 Q 254.22222222222223 311.1111111111111 256 291.55555555555554 L 256 192 L 256 192 Q 254.22222222222223 172.44444444444446 234.66666666666666 170.66666666666666 L 135.11111111111111 170.66666666666666 L 135.11111111111111 170.66666666666666 Z"/>
                                </svg>
                            </a></div>
                            <div>${i}</div>
                            <div class="link"><a target="_blank" href="${solve.opponentYoutubeUrl.replace('/embed/', '/live/')}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white">
                                    <path d="M 284.44444444444446 128 Q 297.77777777777777 128.88888888888889 298.6666666666667 142.22222222222223 L 298.6666666666667 369.77777777777777 L 298.6666666666667 369.77777777777777 Q 297.77777777777777 383.1111111111111 284.44444444444446 384 L 56.888888888888886 384 L 56.888888888888886 384 Q 43.55555555555556 383.1111111111111 42.666666666666664 369.77777777777777 L 42.666666666666664 142.22222222222223 L 42.666666666666664 142.22222222222223 Q 43.55555555555556 128.88888888888889 56.888888888888886 128 L 284.44444444444446 128 L 284.44444444444446 128 Z M 56.888888888888886 85.33333333333333 Q 32.888888888888886 86.22222222222223 16.88888888888889 102.22222222222223 L 16.88888888888889 102.22222222222223 L 16.88888888888889 102.22222222222223 Q 0.8888888888888888 118.22222222222223 0 142.22222222222223 L 0 369.77777777777777 L 0 369.77777777777777 Q 0.8888888888888888 393.77777777777777 16.88888888888889 409.77777777777777 Q 32.888888888888886 425.77777777777777 56.888888888888886 426.6666666666667 L 284.44444444444446 426.6666666666667 L 284.44444444444446 426.6666666666667 Q 308.44444444444446 425.77777777777777 324.44444444444446 409.77777777777777 Q 340.44444444444446 393.77777777777777 341.3333333333333 369.77777777777777 L 341.3333333333333 340.44444444444446 L 341.3333333333333 340.44444444444446 L 341.3333333333333 171.55555555555554 L 341.3333333333333 171.55555555555554 L 341.3333333333333 142.22222222222223 L 341.3333333333333 142.22222222222223 Q 340.44444444444446 118.22222222222223 324.44444444444446 102.22222222222223 Q 308.44444444444446 86.22222222222223 284.44444444444446 85.33333333333333 L 56.888888888888886 85.33333333333333 L 56.888888888888886 85.33333333333333 Z M 469.3333333333333 160.88888888888889 L 469.3333333333333 351.1111111111111 L 469.3333333333333 160.88888888888889 L 469.3333333333333 351.1111111111111 L 369.77777777777777 306.6666666666667 L 369.77777777777777 306.6666666666667 L 369.77777777777777 353.77777777777777 L 369.77777777777777 353.77777777777777 L 462.22222222222223 395.55555555555554 L 462.22222222222223 395.55555555555554 Q 469.3333333333333 398.22222222222223 477.3333333333333 398.22222222222223 Q 491.55555555555554 398.22222222222223 501.3333333333333 387.55555555555554 Q 512 377.77777777777777 512 363.55555555555554 L 512 149.33333333333334 L 512 149.33333333333334 Q 512 134.22222222222223 501.3333333333333 124.44444444444444 Q 491.55555555555554 113.77777777777777 477.3333333333333 113.77777777777777 Q 469.3333333333333 113.77777777777777 462.22222222222223 117.33333333333333 L 369.77777777777777 158.22222222222223 L 369.77777777777777 158.22222222222223 L 369.77777777777777 205.33333333333334 L 369.77777777777777 205.33333333333334 L 469.3333333333333 160.88888888888889 L 469.3333333333333 160.88888888888889 Z M 135.11111111111111 170.66666666666666 Q 115.55555555555556 172.44444444444446 113.77777777777777 192 Q 115.55555555555556 211.55555555555554 135.11111111111111 213.33333333333334 L 183.11111111111111 213.33333333333334 L 183.11111111111111 213.33333333333334 L 91.55555555555556 304.8888888888889 L 91.55555555555556 304.8888888888889 Q 79.11111111111111 320 91.55555555555556 335.1111111111111 Q 106.66666666666667 347.55555555555554 121.77777777777777 335.1111111111111 L 213.33333333333334 243.55555555555554 L 213.33333333333334 243.55555555555554 L 213.33333333333334 291.55555555555554 L 213.33333333333334 291.55555555555554 Q 215.11111111111111 311.1111111111111 234.66666666666666 312.8888888888889 Q 254.22222222222223 311.1111111111111 256 291.55555555555554 L 256 192 L 256 192 Q 254.22222222222223 172.44444444444446 234.66666666666666 170.66666666666666 L 135.11111111111111 170.66666666666666 L 135.11111111111111 170.66666666666666 Z"/>
                                </svg>                               
                            </a></div>
                            </div>
                            <div class="align-left solve-time ${solve.win ?"dark":""}">${displayTime(solve.opponentTime)}</div>
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

    // invalid profile
    if (data.bestSingle==0) {
        addSection(`<div class="loading">Invalid ID</div>`);
        return;
    }

    // profile's header
    const sectionSeason = `
    <div class="season title">Season ${data.season}</div>`

    const sectionHeader = `
    <section class="profile-header">
        <div>
            <h1 class="title rank fade-down">Ranked ${ordinal(data.rank)}</h1>
            <h1 class="title name fade-down">${data.name}</h1>
        </div>
        <div class="profile-image-container">
        <img src="${`/assets/profile_images/${data.name}.png`}" alt="Profile Image" class="profile-image">
        </div>
    </section>`;

    // profile stats
    console.log(data.totalErrors,data.totalSolves)
    const sectionStats = `
    <section class="profile-stats glass">
    <div>
        <div>
            <h2 class="stats-title">Season ${data.season} Stats</h2>
        </div>
        <div class="left-stats">
            <div>
                <div class="value solve-time">${displayTime(data.bestSingle)}</div>
                <div class="label">BEST SINGLE</div>
            </div>
            <div>
                <div class="value solve-time">${displayTime(data.seasonMean)}</div>
                <div class="label">SEASON MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${displayTime(data.elimMean)}</div>
                <div class="label">ELIMINATION MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${displayTime(data.solveVariance)}</div>
                <div class="label">SOLVE VARIANCE</div>
            </div>
            <div>
                <div class="value solve-time">${(data.totalErrors/data.totalSolves * 100).toFixed(3)}%</div>
                <div class="label">ERROR RATE</div>
            </div>
            <div class="stat-item">
                <div class="value solve-time"><span class="win">${data.matchWins}</span> - <span class="loss">${data.matchLosses}</span></div>
                <div class="label">SET RECORD</div>
            </div>
        </div>
    </div>
    <div class="mid-stats">
        <div class="stat-item">
            <div class="value solve-time">${data.totalEvents}</div>
            <div class="label">TOTAL MATCH${data.totalEvents !== 1 ? 'ES' : ''} </div>
        </div>
        <div class="stat-item">
            <div class="value">${data.totalSeasons ?? "-"}</div>
            <div class="label">TOTAL SEASON${data.totalSeasons !== 1 ? 'S' : ''}</div>
        </div>
    </div>
    <div>
        <div>
            <h2 class="stats-title">Career Stats</h2>
        </div>
        <div class="right-stats">
            <div>
                <div class="value solve-time">${displayTime(data.bestSingle)}</div>
                <div class="label">BEST SINGLE</div>
            </div>
            <div >
                <div class="value solve-time">${displayTime(data.seasonMean)}</div>
                <div class="label">SEASON MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${displayTime(data.elimMean)}</div>
                <div class="label">ELIMINATION MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${displayTime(data.solveVariance)}</div>
                <div class="label">SOLVE VARIANCE</div>
            </div>
            <div>
                <div class="value solve-time">${(data.totalErrors/data.totalSolves * 100).toFixed(3)}%</div>
                <div class="label">ERROR RATE</div>
            </div>
            <div class="stat-item">
                <div class="value solve-time"><span class="win">${data.matchWins}</span> - <span class="loss">${data.matchLosses}</span></div>
                <div class="label">SET RECORD</div>
            </div>
        </div>
    </div>
    </section>`;

    if (!data.bestSolveUrl || !(data.bestSolveUrl.includes("live") || data.bestSolveUrl.includes("embed"))) {
        data.bestSolveUrl = null;
    }

    if (data.bestSolveUrl && data.bestSolveUrl.includes("live")) data.bestSolveUrl = toEmbed(data.bestSolveUrl);

    const sectionVideos = `
    <section class="videos-section">
        <div>
            <h1 class="title">${data.bestSingle}</h1>
            <h1>Best Single Solve</h1>
        </div>
        ${data.bestSolveUrl === null ? 
            `<h1 class="no-video">No video available for this solve.</h1>`:
            `<div class="video"><iframe width="560" height="315" src=${data.bestSolveUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`
        }
    </section>`;

    // profile matches
    const sectionMatches = `
    <section class="matches-list">
        <h1 class="matches-title title">Recent Matches</h1>
        <h3> Click on the video icon to watch a solve from any PSL match!</h3>
    ${data.matches.slice().reverse().map((match, mi) => renderMatch(match, data, mi)).join("")}
    </section>`;

    [sectionSeason, sectionHeader, sectionStats, sectionVideos, sectionMatches].reverse().forEach(addSection);
}

document.addEventListener("DOMContentLoaded", async () => {
    // render the profile
    await renderProfile();
    // hide loader
    const loader = document.getElementById("loading");
    loader.style.display = "none"; 

    document.querySelectorAll('.set.glass').forEach(setDiv => {
        setDiv.addEventListener('click', function(e) {
            if (e.target.closest('a') || e.target.closest('button')) return;

            const setSolve = setDiv.querySelector('.set-solve');
            const icon = setDiv.querySelector('.set-toggle');

            if (setSolve) {
                setSolve.classList.toggle('collapsed');
                if (icon) icon.classList.toggle('rotated');
            }
        });
    });
});