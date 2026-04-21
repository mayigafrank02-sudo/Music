// Music Player Logic
document.addEventListener('DOMContentLoaded', function() {
    const audio = new Audio();
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.time-current');
    const totalTimeEl = document.querySelector('.time-total');
    const volumeSlider = document.getElementById('volume-slider');
    const speedSelect = document.getElementById('speed');
    const songItems = document.querySelectorAll('.song-item');
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Mock playlist data (replace with your actual songs)
    const playlist = [
        {
            title: "Midnight City",
            artist: "M83",
            album: "Hurry Up, We're Dreaming",
            src: "https://assets.codepen.io/4358584/M83+-+Midnight+City.mp3",
            duration: "4:04",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
        },
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            src: "https://assets.codepen.io/4358584/The+Weeknd+-+Blinding+Lights.mp3",
            duration: "3:22",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            src: "https://assets.codepen.io/4358584/Dua+Lipa+-+Levitating.mp3",
            duration: "3:24",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
        }
    ];
    
    // Initialize first song
    loadSong(currentSongIndex);
    
    // Load song
    function loadSong(index) {
        const song = playlist[index];
        audio.src = song.src;
        
        // Update UI
        document.querySelector('.current-title').textContent = song.title;
        document.querySelector('.current-artist').textContent = song.artist;
        document.querySelector('.current-album').textContent = song.album;
        document.querySelector('.album-art img').src = song.image;
        totalTimeEl.textContent = song.duration;
        
        // Update active song in playlist
        songItems.forEach(item => item.classList.remove('active'));
        if (songItems[index]) {
            songItems[index].classList.add('active');
        }
        
        // Play if was playing
        if (isPlaying) {
            playSong();
        }
    }
    
    // Play/Pause
    function playSong() {
        isPlaying = true;
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    function pauseSong() {
        isPlaying = false;
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // Toggle play/pause
    playBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });
    
    // Next song
    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    });
    
    // Previous song
    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    });
    
    // Click on playlist item
    songItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
    });
    
    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audio;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            // Update time
            currentTimeEl.textContent = formatTime(currentTime);
        }
    });
    
    // Click on progress bar to seek
    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    });
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });
    
    // Playback speed
    speedSelect.addEventListener('change', (e) => {
        audio.playbackRate = e.target.value;
    });
    
    // When song ends
    audio.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    });
    
    // Format time helper
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Shuffle and Repeat functionality (basic)
    document.getElementById('shuffle').addEventListener('click', function() {
        this.classList.toggle('active');
        // Implement shuffle logic here
    });
    
    document.getElementById('repeat').addEventListener('click', function() {
        this.classList.toggle('active');
        audio.loop = !audio.loop;
    });
});
