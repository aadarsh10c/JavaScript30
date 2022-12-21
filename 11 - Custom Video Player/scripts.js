// Select all components
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
// const volume = player.querySelector('input[name="volume"]');
// const playback = player.querySelector('input[name="playbackRate"]');

const sliders = player.querySelectorAll('.player__slider');
const skip = player.querySelectorAll('[data-skip]');

//handler for differnet event listeners
function togglePlay(e){
    const method = video.paused ? 'play':'pause';
    video[method]();
}
 function updateIcon(e){
    //console.log('update icon');
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.innerHTML = icon;
  }

  function skipVideo(){
    //console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleSlider(e){
    //console.log(e);
    video[`${this.name}`] = this.value;
  }

  function updateProgress(){
    const progress = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = progress + '%';
  }

  
  function scrub (e){
    const time = (e.offsetX/progress.offsetWidth)* video.duration;
    video.currentTime = time;
  }

//all th event listenres

//toggle play/pause video
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);

//update play/pause icon
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);

//Skip video
skip.forEach( button => button.addEventListener('click',skipVideo));

//listen for sliders
sliders.forEach( slider => slider.addEventListener('change', handleSlider));

//listens for update in video
video.addEventListener( 'timeupdate' , updateProgress);

//listen for scrub
let ismousedown = false;
progress.addEventListener('click',scrub );
progress.addEventListener('mousemove',(e) => ismousedown && scrub(e) );
progress.addEventListener('mousedown', () => ismousedown = true );
progress.addEventListener('mouseup',() => ismousedown = false );



