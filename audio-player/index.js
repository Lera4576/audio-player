const audio = document.getElementById('song');
const playPauseButton = document.getElementById('play-pause');
const currentTimeDisplay = document.getElementById('currentTime');
const durationTimeDisplay = document.getElementById('durationTime');
const progressBar = document.getElementById('progress-bar');

const songs = [
    { title: "Don't Hurt Yourself", artist: 'Beyonce', src: 'audio/beyonce.mp3', background: 'image/lemonade.png', thumbnail: 'image/lemonade.png' },
    { title: "Dont't Start Now", artist: 'Dua Lipa', src: 'audio/dontstartnow.mp3', background: 'image/dontstartnow.png', thumbnail: 'image/dontstartnow.png'  }, // Добавьте пути к другим песням
];

let currentSongIndex = 0;

function playPause() {
    if (audio.paused) {
        audio.play(); 
        playPauseButton.src = 'svg/pause.png'; 
    } else {
        audio.pause(); 
        playPauseButton.src = 'svg/play.png'; 
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length; 
    loadSong(currentSongIndex);
}

function loadSong(index) {
    audio.src = songs[index].src;
    audio.load();
    audio.play(); 
    playPauseButton.src = 'svg/pause.png'; 
    updateSongInfo(index); 

    document.getElementById('background').src = songs[index].background;
    document.getElementById('thumbnail').src = songs[index].thumbnail; 
}

function updateSongInfo(index) {
    const songArtist = document.querySelector('.song-artist');
    const songTitle = document.querySelector('.song-title');
    songArtist.textContent = songs[index].artist;
    songTitle.textContent = songs[index].title;
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100; 
        currentTimeDisplay.textContent = formatTime(audio.currentTime); 
        durationTimeDisplay.textContent = formatTime(audio.duration); 
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function changeProgressBar() {
    const newTime = (progressBar.value / 100) * audio.duration; 
    audio.currentTime = newTime; 
}

audio.addEventListener('ended', () => {
    nextSong();
    audio.play(); 
    playPauseButton.src = 'svg/pause.png';
});

loadSong(currentSongIndex);