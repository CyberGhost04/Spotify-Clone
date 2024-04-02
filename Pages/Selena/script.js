
let currentSong = new Audio();
let songs;

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/Selena"); // change this for each folder
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/Selena/")[1]); //change this for each folder
        }
    }
    return songs;
}

const playMusic = (track) => {
    //let audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/Selena/" + track;
    currentSong.play();
    document.querySelector(".songinfo").innerHTML = `<div>${track.replaceAll("%20", " ")}</div>`;
    document.querySelector(".songtime").innerHTML = "";

}

async function main() {

    songs = await getSongs();
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        <img src="/svgs/music.svg" class="invert" alt="">
        <div class="info" style="display:flex; justify-content:center; align-items:center;">
          <div>${song.replaceAll("%20", " ")}</div>
        </div>
        <div class="playnow">
          <img src="/svgs/play.svg" class="invert" alt="">
        </div>
         </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            play.src = "/svgs/pause.svg";
        })
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "/svgs/pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "/svgs/play-circle.svg";
        }
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0 + "%";
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = -100 + "%";
    })

    previous.addEventListener("click", () => {
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