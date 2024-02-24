
let currentSong = new Audio();
let songs;

function convertSecondsToMinutesSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playMusic = (track) => {
    //let audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track;
    currentSong.play();
    document.querySelector(".songinfo").innerHTML = `${track.replaceAll("%20", " ")}`;
    document.querySelector(".songtime").innerHTML = "";

}

async function main() {

    songs = await getSongs();
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
        <img src="vynil-02.svg" class="invert" alt="">
        <div class="info">
          <div>${song.replaceAll("%20", " ")}</div>
          <div>retr0</div>
        </div>
        <div class="playnow">
          <img src="play.svg" class="invert" alt="">
        </div>
         </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            //console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            play.src = "pause.svg";
        })
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "play-circle.svg";
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        //console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutesSeconds(currentSong.currentTime)}/${convertSecondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekBar").addEventListener("click", e => {
        //console.log(e.offsetX/e.target.getBoundingClientRect().width)*100; 
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0 + "%";
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = -100 + "%";
    })

    previous.addEventListener("click", () => {
        //console.log("clicked");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) > length) {
            playMusic(songs[index + 1]);
        }
    })

    arrnext.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) > length) {
            playMusic(songs[index + 1]);
        }
    })
    arrprev.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    })

}

main();