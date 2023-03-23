// Création de Div

const container = document.createElement("div");
container.className = "player";

document.body.appendChild(container)

const BigTitle = document.createElement('h1');
BigTitle.className ="titre";
container.appendChild(BigTitle);

const Media = document.createElement("div");
Media.className = "Media_video";
container.appendChild(Media);

// Titre Media Player


const textNode = document.createTextNode("My Media Player");
BigTitle.appendChild(textNode);

const MyFigure = document.createElement("figure");
Media.appendChild(MyFigure);

const MyfigCap = document.createElement("figCaption");
MyFigure.appendChild(MyfigCap);

const video = document.createElement("video");
MyfigCap.appendChild(video);
video.height = 900; // in px
video.width = 1200; // in px

// media video
const source = document.createElement("source");
source.setAttribute("src", "/media/Brooklyn99.mp4");
source.setAttribute("class", "Player_Video");
video.appendChild(source);



// Création de bouton play 

const barreMedia = document.createElement("div");
barreMedia.className = "player__controls";
container.appendChild(barreMedia);

// Bouton Play 

const playBttn = document.createElement("button");
playBttn.setAttribute("id", "playpause");
playBttn.setAttribute("type", "button");
playBttn.append('<i class="fa-sharp fa-solid fa-play-pause"></i>');
barreMedia.appendChild(playBttn);

// Barre de progression
const progressBar = document.createElement("div");
progressBar.setAttribute("class", "progress");
barreMedia.appendChild(progressBar);

const fullProgress = document.createElement("div");
fullProgress.className = "progress__filled";
progressBar.appendChild(fullProgress);






// Bouton volume
const player_input = document.createElement("input");
player_input.setAttribute("type", "range");
player_input.setAttribute("name", "volume");
player_input.setAttribute("class", "player__slider");
player_input.setAttribute("min", "0");
player_input.setAttribute("max", "1");
player_input.setAttribute("step","0.1");
player_input.setAttribute("value", "0.5");
barreMedia.appendChild(player_input);

const playBack = document.createElement("input");
playBack.setAttribute("type", "range");
playBack.setAttribute("name", "playbackRate");
playBack.setAttribute("class", "player__slider");
playBack.setAttribute("min", "0.5");
playBack.setAttribute("max", "2");
playBack.setAttribute("step","0.1");
playBack.setAttribute("value", "1");
barreMedia.appendChild(playBack);

const btnBackward = document.createElement("button");
btnBackward.setAttribute("data-skip", "-10");
btnBackward.setAttribute("class", "button_backward");
barreMedia.appendChild(btnBackward);


const btnForward = document.createElement("button");
btnForward.setAttribute("data-skip", "-10");
btnForward.setAttribute("class", "button_forward");
barreMedia.appendChild(btnForward);

const fullScreen= document.createElement("button");
fullScreen.setAttribute("class", "button_fullscreen");
barreMedia.appendChild(fullScreen);




// play Video
video.onclick = function() {
    if(video.paused){
      video.play();
      iconPlay.innerHTML("");

    } else{
      video.pause();
      iconPlay.innerHTML("");
    }
    
  };


  playBttn.onclick = function() {
    if(video.paused){
      video.play();
      iconPlay.innerHTML("");

    } else{
      video.pause();
      iconPlay.innerHTML("");
    }
  };
  
// // stop
// stopBtn.onclick = function(){
//     video.currentTime = 0
// };



// Partie Media

const videomedia = document.querySelector(".video");
const toggleButton = document.querySelector(".toggleButton");
const progress = document.querySelector(".progress");
const barProgress = document.querySelector(".progress__filled");
const sliders = document.querySelectorAll(".controls__slider");
const skipBtns = document.querySelectorAll("[data-skip]");

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

function updateToggleButton() {
  toggleButton.innerHTML = video.paused ? "►" : "❚❚";
}

function handleProgress() {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleSliderUpdate() {
  video[this.name] = this.value;
}

function handleSkip() {
  video.currentTime += +this.dataset.skip;
}

toggleButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleButton);
video.addEventListener("pause", updateToggleButton);
video.addEventListener("timeupdate", handleProgress);

sliders.forEach((slider) => {
  slider.addEventListener("change", handleSliderUpdate);
});

skipBtns.forEach((btn) => {
  btn.addEventListener("click", handleSkip);
});

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mouseup", () => (mousedown = false));

sliders.forEach((slider) => {
  slider.addEventListener("change", handleSliderUpdate);
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") togglePlay();
});
