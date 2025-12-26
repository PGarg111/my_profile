function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    // if (!pageId) {
    //     const params = new URLSearchParams(window.location.search);
    //     pageId = params.get("pageid");
    // }

    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.remove("hidden");
        } else {
            page.classList.add("hidden");
        }
    });


    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
}

const LASTFM_API_KEY = '2cc4a24276ba82035845fe6bddbc00f5';
const LASTFM_USERNAME = 'pgarg111';

const widget = document.getElementById('musicWidget');

async function fetchNowPlaying() {
    try {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
        );

        const data = await response.json();

        if (data.recenttracks && data.recenttracks.track) {
            const track = data.recenttracks.track[0];
            displayTrack(track);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Error fetching track:', error);
        showError();
    }
}

function displayTrack(track) {
    const isPlaying = track['@attr']?.nowplaying === 'true';
    const trackName = track.name;
    const artist = track.artist['#text'];
    const album = track.album['#text'];
    const image = track.image[3]['#text'];
    const url = track.url;

    const iconSVG = isPlaying
        ? '<svg class="status-icon pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>'
        : '<svg class="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>';

    widget.innerHTML = `
                <div class="status-badge">
                    ${iconSVG}
                    <span>${isPlaying ? 'NOW PLAYING' : 'LAST PLAYED'}</span>
                </div>
                <div class="track-container">
                    ${image ? `<img src="${image}" alt="${album}" class="album-art">` : ''}
                    <div class="track-info">
                        <a href="${url}" target="_blank" rel="noopener noreferrer" class="track-name">
                            ${trackName}
                        </a>
                        <div class="track-artist">${artist}</div>
                        ${album ? `<div class="track-album">${album}</div>` : ''}
                    </div>
                </div>
                ${isPlaying ? `
                    <div class="live-indicator">
                        <div class="equalizer">
                            <div class="bar"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                        </div>
                        <span>LIVE</span>
                    </div>
                ` : ''}
            `;
}

function showError() {
    widget.innerHTML = `
                <div class="error-state">
                    Nothing playing right now
                </div>
            `;
}

fetchNowPlaying();

setInterval(fetchNowPlaying, 30000);

