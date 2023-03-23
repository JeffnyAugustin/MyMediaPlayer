const video_container = document.querySelector('.video_container');


// ------- VIDEO ------
const video = document.createElement('video');
video.classList.add('clip');
video_container.appendChild(video);
const source = document.createElement('source')
source.setAttribute("src", "../media/Brooklyn99.mp4");
video.appendChild(source);


// ------- DIV -------
const controls = document.createElement('div');
controls.classList.add('controls');
video_container.appendChild(controls);


// ------ BOUTON PLAY --------
const playButton = document.createElement('button');
playButton.classList.add('play');
controls.appendChild(playButton);
const playImg = document.createElement('img');
playImg.classList.add('icoPlay');
playImg.setAttribute("src", "media/ico/play-regular-36.png");
playButton.appendChild(playImg);

// ------- BOUTON STOP --------
const stopButton = document.createElement('button');
stopButton.classList.add('stop');
controls.appendChild(stopButton);
const stopImg = document.createElement('img');
stopImg.setAttribute("src", "media/ico/stop-regular-36.png");
stopButton.appendChild(stopImg);

// ----- BOUTTON REVENIR EN ARRIERE -------
const forwardBtn = document.createElement('button');
forwardBtn.classList.add('forward');
controls.appendChild(forwardBtn);
const forwardImg = document.createElement('img');
forwardImg.setAttribute("src", "media/ico/icons8-passé-36.png");
forwardBtn.appendChild(forwardImg);

// ------- DUREE DE LA VIDEO ---------
const sliderBar = document.createElement('input');
sliderBar.classList.add('seekslider');
sliderBar.setAttribute("type", "range");
sliderBar.setAttribute('min', '0');
sliderBar.setAttribute('max', '100');
sliderBar.setAttribute('value', '0');
sliderBar.setAttribute('step', '1');
controls.appendChild(sliderBar);

// ---------- TIMER ----------
const time = document.createElement('div');
time.classList.add('time');
time.innerText = ' 00:00/00:00 ';
controls.appendChild(time);

// -------- CONTROLE DE SONS --------
const fullSoundBtn = document.createElement('button');
fullSoundBtn.classList.add('sound');
controls.appendChild(fullSoundBtn);
const fullSoundImg = document.createElement('img');
fullSoundImg.setAttribute("src", "media/ico/full-sound.png");
fullSoundBtn.appendChild(fullSoundImg);
const soundBar = document.createElement('input');
soundBar.classList.add('soundslider');
soundBar.setAttribute("type", "range");
soundBar.setAttribute('min', '0');
soundBar.setAttribute('max', '100');
soundBar.setAttribute('value', '100');
soundBar.setAttribute('step', '1');
fullSoundBtn.appendChild(soundBar);

// ------- PLEINE ECRAN ---------
const fullScreenBtn = document.createElement('button');
fullScreenBtn.classList.add('full');
controls.appendChild(fullScreenBtn);
const fullScreenImg = document.createElement('img');
fullScreenImg.setAttribute("src", "media/ico/full-screen.png");
fullScreenBtn.appendChild(fullScreenImg);





var playBtn = document.querySelector('.play');
var icoPlay = document.querySelector('.icoPlay');
var stopBtn = document.querySelector('.stop');
var rwdBtn = document.querySelector('.rwd');
var seekSlider = document.querySelector('.seekslider');
var timeLabel = document.querySelector('.time');
var soundBtn = document.querySelector('.sound');
var icoSound = document.querySelector('.icoSound');
var soundSlider = document.querySelector('.soundslider');

var fullBtn = document.querySelector('.full');

// var clip = document.querySelector('.clip');
// var main = document.querySelector('.controls');



video.removeAttribute('controls');

// play
video.onclick = function() {
   if(video.paused){
     video.play();
     icoPlay.setAttribute("src", "media/ico/pause-regular-36.png");

   } else{
     video.pause();
     icoPlay.setAttribute("src", "media/ico/play-regular-36.png");
   }
 };


 playBtn.onclick = function() {
   if(video.paused){
     video.play();
     icoPlay.setAttribute("src", "media/ico/pause-regular-36.png");

   } else{
     video.pause();
     icoPlay.setAttribute("src", "media/ico/play-regular-36.png");
   }
 };
 
// stop
stopBtn.onclick = function(){
   video.currentTime = 0
};

// rewind
rwdBtn.onclick = function() {
   video.currentTime -= 15;
 };


// seekslider
seekSlider.onchange = function(){
  var seekto = video.duration * (seekSlider.value / 100);
  video.currentTime = seekto;
}

video.ontimeupdate = function (){
  var nt = video.currentTime * (100 / video.duration);
  seekSlider.value = nt; 
}
 

//  timer
 video.ontimeupdate = function() {
   var minutesAll = Math.floor(video.duration / 60);
   var secondsAll = Math.round(video.duration / 10);
   var minutes = "0" + Math.floor(video.currentTime / 60);
   var seconds = Math.floor(video.currentTime - minutes * 60);
 
  if(seconds < 10)
  {
    seconds = "0" +  Math.floor(video.currentTime - minutes * 60);
  }else{
    seconds = seconds
  }

   mediaTime = minutes + ":" + seconds;
   mediaAll = "0" + minutesAll + ":" + secondsAll;

   timeLabel.textContent = mediaTime + "/" + mediaAll;
 };

//sound
soundBtn.onmouseover = function(){
    soundSlider.style.display = "block";
     $('soundSlider').fadeOut();
     $('soundSlider').fadeIn();
}

soundBtn.onmouseleave = function(){
    soundSlider.style.display = "none";
  }

icoSound.onclick = function(){
    if(video.muted){
        video.muted = false;
        icoSound.setAttribute("src", "media/ico/full-sound.png");
        }else {
        video.muted = true;
        icoSound.setAttribute("src", "media/ico/mute.png");
     
    }
 };
 

// soundslider
soundSlider.onchange = function(){
  video.volume = soundSlider.value / 100;

    if(soundSlider.value <= 70){
    icoSound.setAttribute("src", "media/ico/low-sound.png");
    }else{
      icoSound.setAttribute("src", "media/ico/full-sound.png");
    }
    if(soundSlider.value <= 30){
      icoSound.setAttribute("src", "media/ico/volume.png");
    }
    if(soundSlider.value <= 0){
      icoSound.setAttribute("src", "media/ico/mute.png");
    }
  }


// full screen
fullBtn.onclick = function() { 
   video.requestFullscreen();
}
