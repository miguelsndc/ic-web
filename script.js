const API_KEY = "175371957c5eb598c740d96f7791afea"
const CLIENT_SECRET = "edd7a9911eb26ecedbed7038b5c556f4"

const url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sh8k&api_key=175371957c5eb598c740d96f7791afea&format=json&limit=1"

fetch(url).then(promise => promise.json()).then(data => handle(data))

function handle(data) {

    data.recenttracks.track.forEach(track => {
        const albumCover = track.image[1]['#text']
        const albumName = track.album['#text']
        const artistName = track.artist['#text']
        const date = track.date['#text']
        const name = track.name
        const markup = `
                <img src="${albumCover}" alt="${name}" />
                <div>
                    <strong>${name}</strong>
                    <span>${artistName}</span>
                </div>
        
        `

        const element = document.createElement('div')
        element.innerHTML = markup
        element.className = "scrobble"
        const scrobbleContainer = document.getElementById("scrobble")
        scrobbleContainer.appendChild(element)
    })
}

