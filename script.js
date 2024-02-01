
async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/"); 
    let response = await a.text();
    let div = document.createElement("div"); 
    div.innerHTML = response; 
    let as = div.getElementsByTagName("a"); 
    let songs = []; 
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playMusic = (track)=> {
    let audio = new Audio("/songs/" + track);
    audio.play();

}

async function main(){
    let currentSong;

    let songs = await getSongs();
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
        <img src="vynil-02.svg" class="invert" alt="">
        <div class="info">
          <div>${song.replaceAll("%20"," ")}</div>
          <div>retr0</div>
        </div>
        <div class="playnow">
          <img src="play.svg" class="invert" alt="">
        </div>
         </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML);
        })
    })

    
}

main();