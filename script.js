console.log("JavaScript is running")

let currentsong = new Audio();

function timeprocessor(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return ("00" + min).slice(-2) + ":" + ("00" + sec).slice(-2);

}

async function getsongs(path = "Independant") {
    let get = await fetch("/songs/"+path+"/");
    let response = await get.text()
    let div = document.createElement("div");
    div.innerHTML = response;
    let a = div.getElementsByTagName("a");
    let songs = []
    for (let i = 0; i < a.length; i++) {
        let element = a[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/Independant/")[1]);
        }
    }

    return songs;
}

async function getalbums() {
    let get = await fetch("/songs/");
    let response = await get.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let a = div.getElementsByTagName("a");
    let albums = []
    for (let i = 0; i < a.length; i++) {
        let element = a[i];
        if (element.href.endsWith("/")) {
            albums.push(element.href.split("/songs/")[1]);
        }
    }

    return albums;
}


async function playmusic(track,path = "\\independant\\") {
    currentsong.src = "\\songs\\"+path + track + ".mp3";
    currentsong.play();
    pl.src = "images/pause.svg"
    currentsong.onloadedmetadata = function () {
        // document.querySelector(".songinfo").innerHTML = currentsong.src;
        document.querySelector(".songinfo").innerHTML = decodeURI(track).replaceAll("-", " ");
        setInterval(() => {
            let ctime = currentsong.currentTime;
            let totalDuration = currentsong.duration;
            document.querySelector(".songtime").innerHTML = timeprocessor(ctime) + "/" + timeprocessor(totalDuration);
            document.querySelector(".seekcircle").style.left = ctime / totalDuration * 100 + "%";
        }, 100);
    }
}

async function displayplaylists(){
    let playlists = await getalbums();
    let cards = document.querySelector(".playlisttiles");
    console.log(playlists);
    for(let i=1;i<playlists.length;i++){
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<img class="playbutton" src="/images/play.svg" alt="">
                    <img src="https://www.nowbali.co.id/wp-content/uploads/2016/08/Lake-Buyan-5-1024x685.jpg"
                    alt="bali lake image" class="balilake">
                    <div class="description">
                        <h3>${playlists[i].replace("/","")}</h3>
                        <p>Lorem ipsum dolor sit amet.</p>             
                    </div>`;
        cards.append(div);
    }
    let albumsarray = Array.from(document.querySelector(".playlisttiles").getElementsByClassName("card"));
    let albumnamearray = [];
    console.log(albumsarray);

    // albumsarray.forEach((album)=>{
    //     albumnamearray.push(album.getElementsByTagName("h3")[0].innerHTML);
    //     album.getElementsByTagName("img")[0].addEventListener("click",()=>{
    //         console.log("clicked"+album.getElementsByTagName("h3")[0].innerHTML);
    //         let songsInFolder = await getsongs(album.getElementsByTagName("h3")[0].innerHTML);
    //         console.log(songsInFolder);
    //     })
    // })

    console.log(albumnamearray);
    
}

async function leftbarsongslist() {
    let songs = await getsongs();
    let songul = document.querySelector(".songsnames").getElementsByTagName("ul")[0]
    for (let i = 0; i < songs.length; i++) {
        let tul = document.createElement("li");
        tul.innerHTML = `<div class="song">
        <img src="images/Music.svg" alt="">
        <div class="songnameart">
        <div class="songname">${songs[i].split(".mp3")[0].replaceAll("%20", " ")}</div>
                                <div class="artistname">Saksham</div>
                            </div>
                            <img src="images/playbarplay.svg" alt="">
                        </div>` ;
        songul.appendChild(tul)
    }
    let songsarray = Array.from(document.querySelector(".songsnames").getElementsByTagName("li"));
    let songsnamearray = [];
    let songindex = 0;
    songsarray.forEach((song) => {
        songsnamearray.push(song.getElementsByClassName("songname")[0].innerHTML.trim());
        song.addEventListener("click", e => {
            songindex = songsnamearray.indexOf(song.getElementsByClassName("songname")[0].innerHTML.trim());
            playmusic(song.getElementsByClassName("songname")[0].innerHTML.trim());
        })
    })

    pl.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            pl.src = "images/pause.svg";
        }
        else {
            currentsong.pause();
            pl.src = "images/playbarplay.svg";
        }
    })
    next.addEventListener("click",(e)=>{
        if(songindex==songsnamearray.length-1){
            songindex=0;
            playmusic(songsnamearray[songindex]);
        }
        else{
            playmusic(songsnamearray[++songindex]);
        }
    })
    prev.addEventListener("click",(e)=>{
        if(songindex==0){
            songindex=songsnamearray.length;
            playmusic(songsnamearray[songsnamearray.length-1]);
        }
        else{
            playmusic(songsnamearray[--songindex]);
        }
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        document.querySelector(".seekcircle").style.left = e.offsetX / e.target.getBoundingClientRect().width * 100 + "%";
        currentsong.currentTime = e.offsetX / e.target.getBoundingClientRect().width * currentsong.duration;
    })

}

async function main() {
    document.querySelector(".right").addEventListener("click", (e) => {
        if (document.querySelector(".left").style.left == "0%") {
            document.querySelector(".left").style.left = "-100%";
        }
    })
    document.querySelector(".ham").addEventListener("click", (e) => {
        document.querySelector(".left").style.left = "0%";
    })
    console.log(window.location.pathname);
}

displayplaylists();
leftbarsongslist();
main();

