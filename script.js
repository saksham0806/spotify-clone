console.log("JavaScript is running")

let currentsong = new Audio();

function timeprocessor(time){
    let min = Math.floor(time/60);
    let sec = Math.floor(time%60);
    return ("00"+min).slice(-2) +":"+("00"+sec).slice(-2) ;

}

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
    currentsong.src = "\\songs\\"+track+".mp3";
    currentsong.play();
    pl.src = "images/pause.svg"
    currentsong.onloadedmetadata = function(){
        // document.querySelector(".songinfo").innerHTML = currentsong.src;
        document.querySelector(".songinfo").innerHTML = decodeURI(track).replaceAll("-"," ");
        setInterval(() => {    
            let ctime = currentsong.currentTime;
            let totalDuration = currentsong.duration;
            document.querySelector(".songtime").innerHTML = timeprocessor(ctime) +"/"+ timeprocessor(totalDuration);
            document.querySelector(".seekcircle").style.left = ctime/totalDuration*100 +"%";
        }, 100);
    }

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
                        </div>` ;                            
        songul.appendChild(tul)
    }
    
        Array.from(document.querySelector(".songsnames").getElementsByTagName("li")).forEach((song)=>{
            song.addEventListener("click",e=>{
                playmusic(song.getElementsByClassName("songname")[0].innerHTML.trim());
            })
        })
        pl.addEventListener("click",()=>{
            if(currentsong.paused){
                currentsong.play();
                pl.src = "images/pause.svg"
            }
            else{
                currentsong.pause();
                pl.src = "images/playbarplay.svg"
            }
        })

        document.querySelector(".seekbar").addEventListener("click",(e)=>{
            document.querySelector(".seekcircle").style.left = e.offsetX/e.target.getBoundingClientRect().width*100+"%";
            currentsong.currentTime = e.offsetX/e.target.getBoundingClientRect().width*currentsong.duration;
        })
    
}

async function main() {
    document.querySelector(".ham").addEventListener("click",(e)=>{
        document.querySelector(".left").style.left = "0%" ;
    })
}

leftbarsongslist();
main();

