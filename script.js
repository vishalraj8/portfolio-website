document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section, .skills-column, .about-text, .about-image, #contact');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); 
          }
      });
  }, { threshold: 0.2 });

  sections.forEach(el => {
      el.classList.add('hidden');
      observer.observe(el);
  });
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
const audio = document.getElementById('audio');
audio.volume = 0.2;
const playPauseBtn = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progress = document.getElementById('progress');
const time = document.getElementById('time');

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  } else {
    audio.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
});

audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    progress.style.background = `linear-gradient(to right, white 0%, white ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%, rgba(255,255,255,0.2) 100%)`;

    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    if (seconds < 10) seconds = '0' + seconds;
    time.textContent = `${minutes}:${seconds}`;
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
    progress.style.background = `linear-gradient(to right, white 0%, white ${progress.value}%, rgba(255,255,255,0.2) ${progress.value}%, rgba(255,255,255,0.2) 100%)`;
  }
});
