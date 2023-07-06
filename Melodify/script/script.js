
window.addEventListener('load',()=>{


    const music = document.querySelector("audio");
    const play = document.getElementById("play");
    const img = document.querySelector("img");
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    
    let progress = document.getElementById("progress");
    let current_time = document.getElementById("current_time");
    let dur = document.getElementById("duration");
    const progress_div = document.getElementById("progress_div");
    
    const songs = [
        {
            name:"music-1",
            title:"Save Your Tears",
            artist:"Weekend"
        },
        {
            name:"music-2",
            title:"Chukar mere man",
            artist:"Kishore Kumar"
        },
        {
            name:"music-3",
            title:"Swing Lynn",
            artist:"Harmless"
        },
        {
            name:"music-4",
            title:"Pretty Woman",
            artist:"Shankar Mahadevan"
        },
        {
            name:"music-5",
            title:"Tune Jo na Kaha",
            artist:"Mohit Chauhan"
        }
    ];
    
    // let isPlaying = false;
    // play.addEventListener('click',()=>{
    //     music.play();
    //     play.classList.replace("fa-play","fa-pause");
    //     img.classList.add("anime");
    // })
    
    let isPlaying = false;
    // for play
    const playMusic = ()=>{
        isPlaying = true;
        music.play();
        play.classList.replace("fa-play","fa-pause");
        img.classList.add("anime");
        
    }
    // for pause
    const pauseMusic = ()=>{
        isPlaying = false;
        music.pause();
        play.classList.replace("fa-pause","fa-play");
        img.classList.remove("anime");
    }
    
    play.addEventListener("click",()=>{
        isPlaying ? pauseMusic() : playMusic();
    })
    
    const loadSong = (song)=>{
        title.textContent = song.title;
        artist.textContent = song.artist;
        // music.src = "music/"+song.name+".mp3";
        music.src = `music/${song.name}.mp3`;
        img.src = "images/"+song.name+".png";
    };
    
    let songIndex = 0;
    loadSong(songs[songIndex]);
    
    const nextSong = ()=>{
        progress.style.width = "0%";
        songIndex = (songIndex+1)%songs.length;
        loadSong(songs[songIndex]);
        isPlaying ? playMusic() : pauseMusic();
    }
    const prevSong = ()=>{
        progress.style.width = "0%";
        songIndex = (songIndex-1);
        if(songIndex<0){
            songIndex = songs.length-1;
        }
        loadSong(songs[songIndex]);
        isPlaying ? playMusic() : pauseMusic();
    }
    
    // progress js work 
    music.addEventListener('timeupdate',(event)=>{
        // console.log(event);
        let { currentTime , duration } = event.target;//Same as currentTime = event.target.currentTime
        // console.log(currentTime);
        // console.log(duration);
        let song_played = (currentTime/duration)*100;
        progress.style.width = `${song_played}%`;
        
        if(!duration){
            duration = 0;
        }
        let min_duration = Math.floor(duration/60);
        let sec_duration = Math.floor(duration%60);
        if(sec_duration<10){
            sec_duration = '0'+sec_duration;
        }
        dur.innerText = `${min_duration}:${sec_duration}`;
        let min_curr = Math.floor(currentTime/60);
        let sec_curr = Math.floor(currentTime%60);
        if(sec_curr<10){
            sec_curr = '0'+sec_curr;
        }
        current_time.innerText = `${min_curr}:${sec_curr}`;
    });
    
    progress_div.addEventListener("click",(event)=>{
        // console.log(event);
        const {duration} = music;
        // const duration = music.duration;
        let move_progress = (event.offsetX/event.srcElement.clientWidth)*duration;
        // current time is property of music in sec
        // console.log(event.offsetX);
        // console.log(event.srcElement.clientWidth);
        // console.log(duration);
        // console.log(move_progress);
        music.currentTime = move_progress;
    })
    
    music.addEventListener("ended",nextSong);
    
    next.addEventListener("click",nextSong);
    prev.addEventListener("click",prevSong);



});    




