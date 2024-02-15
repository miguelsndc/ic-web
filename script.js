const API_KEY = "175371957c5eb598c740d96f7791afea"
const CLIENT_SECRET = "edd7a9911eb26ecedbed7038b5c556f4"

const url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sh8k&api_key=175371957c5eb598c740d96f7791afea&format=json&limit=1"

function getScrobbles(url) {
    fetch(url).then(promise => promise.json()).then(data => handle(data))
}


function handle(data) {
    const track = data.recenttracks.track[0]
    const albumCover = track.image[1]['#text']
    const albumName = track.album['#text']
    const artistName = track.artist['#text']
    const name = track.name
    let nowPlaying;
    let date;
    if (track["@attr"]?.nowplaying) {
        nowPlaying = track["@attr"].nowplaying
    } else if (track?.date['#text']) {
        date = track.date['#text']
    }

    const markup = `
                <div class="lastfm">
                    <div>
                        <img src="lastfm.png" alt="LastFM">
                        <span class="${nowPlaying ? "now-scrobbling" : ''}">${nowPlaying ? "Now Scrobbling" : "Last Scrobbled"}:</span>
                    </div>
                    <span class="date">${nowPlaying ? "Now" : date}</span>
                </div>
                <div class="song">
                    <img src="${albumCover}" alt="${name}" />
                    <div>
                    <strong>${name}</strong>
                    <span>${artistName}: ${albumName}</span>
                    </div>
                </div>
        
        `

    const scrobbleContainer = document.getElementById("scrobble")
    scrobbleContainer.innerHTML = markup
}

async function getCats(url) {
    const container = document.getElementById("cats-container")
    const loader = document.createElement('h2')
    loader.className = "loader serif"
    loader.textContent = "Pera um pouquinho tá"
    container.appendChild(loader)
    const promise = await fetch(url, {
        headers: {
            'x-api-key': "live_QJpJ1Vsjn9kCe7Kmb674pBG1jJ3pqVF2U0TGeSE3kRLhWzQ6g9d8d5hqjZEVY0rq"
        }
    })
    const data = await promise.json()

    container.removeChild(loader)
    return handleCats(data)
}

function handleCats(cats) {
    const container = document.getElementById("cats-container")
    cats.forEach(cat => {
        const img = document.createElement('img')
        img.src = cat.url
        img.alt = cat.id
        img.className = "cat"
        img.loading = "lazy"
        container.appendChild(img)
    })
}


Promise.all([
    getCats("https://api.thecatapi.com/v1/images/search?limit=100"),
    getScrobbles(url)
])

document.onvisibilitychange = (ev) => {
    if (document.visibilityState == 'visible') {
        getScrobbles(url)
    }
}

let audioPlayer;
const surpriseButton = document.getElementById("surprise")
const devious = document.getElementById('devious')

devious.onclick = () => surpriseButton.click()
surpriseButton.onclick = function (event) {
    if (audioPlayer && !audioPlayer.paused) {
        audioPlayer.currentTime = 0
        return
    }

    audioPlayer = document.createElement('audio')
    const source = document.createElement('source')
    source.src = "./surpresa.mp3"
    source.type = "audio/mpeg"
    audioPlayer.appendChild(source)
    audioPlayer.autoplay = true
}