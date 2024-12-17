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
            songs.push(element.href.split("/songs/")[1].split(".mp3")[0].replaceAll("-"," "));
        }
    }

    return songs;
}


async function main(){
    let songs = await getsongs();
    let songul = document.querySelector(".songsnames").getElementsByTagName("ul")[0]
    for(let i=0;i<songs.length;i++){
        let tul = document.createElement("li");
        tul.innerHTML = `<div class="song">
                            <img src="images/Music.svg" alt="">
                            <div class="songnameart">
                                <div class="songname">${songs[i]}</div>
                                <div class="artistname">Saksham</div>
                            </div>
                            <img src="images/play.svg" alt="">
                        </div>`;
        songul.appendChild(tul)
    }
}

main();
