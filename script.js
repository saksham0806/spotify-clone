console.log("JavaScript is running")

async function getsongs(){
    let get = await fetch("http://127.0.0.1:3000/songs/")
    let response = await get.text()
    let div = document.createElement("div");
    div.innerHTML = response;
    let a = div.getElementsByTagName("a");
    let songs = []
    for(let i=0;i<a.length;i++){
        let element = a[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
    }

    return songs;
}

async function playmusic(track){
    let audio = new Audio("\\songs\\"+track);
    console.log(audio.duration);
    audio.play;
}

async function leftbarsongslist(){
    let songs = await getsongs();
    let songul = document.querySelector(".songsnames").getElementsByTagName("ul")[0]
    for(let i=0;i<songs.length;i++){
        let tul = document.createElement("li");
        tul.innerHTML = `<div class="song">
                            <img src="images/Music.svg" alt="">
                            <div class="songnameart">
                                <div class="songname">${songs[i].split(".mp3")[0].replaceAll("%20", " ")}</div>
                                <div class="artistname">Saksham</div>
                            </div>
                            <img src="images/playbarplay.svg" alt="">
                        </div>`;
        songul.appendChild(tul)
    }

    let currentsongs;
    Array.from(document.querySelector(".songsnames").getElementsByTagName("li")).forEach((song)=>{
        song.addEventListener("click",e=>{
            playmusic(song.getElementsByClassName("songname")[0].innerHTML.trim());
            console.log("clicked")
        })
        console.log(song.getElementsByClassName("songname")[0].innerHTML);
    })
}

leftbarsongslist();

async function main() {


}

main();

