// Création div container qui contient tous mes éléments

const container = document.createElement("div");
container.id = "mediaPlayer";


const title = document.createElement("h1");
title.id = "titre";
title.textContent = "My Media Player";


//  Création div contenant la vidéo 

const videoContain = document.createElement("div");
videoContain.id = "divVideo";


// Création lecteur video

const videoPlay = document.createElement("video");
videoPlay.id = "mediaVideo";
videoPlay.src = "/assets/video/Brooklyn99.mp4";


// Création div contenant les boutons
const divBttn = document.createElement("div")
divBttn.id = "divBtn";


// Création bouton play 

const btnPlay = document.createElement("button");
btnPlay.id = 'play';
btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';

// Création bouton pour reculer la vidéo 
const btnBackward = document.createElement('button');
btnBackward.id = "skipBackward";
btnBackward.innerHTML = '<i class="fa-solid fa-backward"></i>';

// Création Barre de progression

const progressBar = document.createElement('input');
progressBar.type = 'range';
progressBar.className = "progressBar"
progressBar.min = '0';
progressBar.max = '100';
progressBar.value = "0";


// Création bouton volume

const divSound = document.createElement("div");
divSound.id = 'sound';

const btnSound = document.createElement("button");
btnSound.id = 'btnSound';
btnSound.innerHTML = '<i class="fa-solid fa-volume-high"></i>';


const volume = document.createElement('input');
volume.id = "volume";
volume.type = 'range';
volume.min = '0';
volume.max = '1';
volume.step = '0.1'
volume.value = "1";

console.log(volume.step);

const btnForward = document.createElement('button');
btnForward.id = "skipForward";
btnForward.innerHTML = '<i class="fa-solid fa-forward"></i>';

// Création bouton fullScreen 

const btnFullscreen = document.createElement('button');
btnFullscreen.id = "fullScreen";
btnFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i>';


// Création bouton upload :

const uploadbtn = document.createElement('input')
uploadbtn.type = "file";
uploadbtn.id = "upload";
uploadbtn.textContent = "Parcourir";




// Aller du container vers les enfants

divBttn.append(btnPlay, btnBackward, progressBar, divSound, btnFullscreen, uploadbtn, btnForward );
divSound.append(btnSound, volume)
videoContain.appendChild(videoPlay);
container.append(title, videoContain, divBttn);
// pour faire appel au dom, .body pour injecter dans le body
document.body.appendChild(container);


// -------------------- Déclaration de nos fonctions -------------------------

// Fonction pour lancer la vidéo
btnPlay.addEventListener("click", PlayVideo);

function PlayVideo() {
    
    // paused on verifie l'état de la video, si la video joue ou pas
    if (videoPlay.paused) {
        btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
        videoPlay.play();
    }

    else {
        btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        // ça c'est une méthode pour arreter la video et la mettre sur pause
        videoPlay.pause();
    }
}

//  videoPlay = videoPlay.paused ? videoPlay.play() : videoPlay.pause;
// Fonction ternaire


progressBar.addEventListener('input', () => {
    videoPlay.currentTime = videoPlay.duration*(progressBar.value/100);

// la propriété HTMLMediaElement de l'interface currenTime specifie le temps de lecture en secondes. 
// currenTime permet de recuperer de la valeur
//  duration : temps total de la video
})


// la propriété en lecture seule indique la longueur du média de l'élément en secondes.
videoPlay.addEventListener ("timeupdate", () => {
    const progress = (videoPlay.currentTime/videoPlay.duration)*100;
    progressBar.value = progress;
})

// Bouton Volume 
const volumeRange = document.querySelector("#volume");


volume.addEventListener("input", () => {
    videoPlay.volume = volume.value;
    // volume.innerhtml = '<i class="fa-sharp fa-solid fa-volume-high"></i>';

})

// Bouton volume

volume.addEventListener("change", () => {
    if (volume.value >= 0.5) {
        btnSound.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
       
    }


    else if (volume.value >= 0.1) {
        btnSound.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
        
    }

    else if (volume.value == 0){
        btnSound.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
})

// Bouton Plein d'écran

btnFullscreen.addEventListener("click", () => {
    if (videoPlay.fullscreenElement) {
        videoPlay.exiFullscreen();
        videoPlay.controls = "false";

    }else {
        videoPlay.requestFullscreen();
        videoPlay.controls = "true";
    }
})


//  bouton pour avancer de 15 secondes

btnForward.addEventListener('click', function() {
    videoPlay.currentTime += 15;
}) 

//  bouton pour revenir en arrière de 15 secondes

btnBackward.addEventListener('click', function() {
    videoPlay.currentTime -= 15;
}) 


// Bouton upload

const inputUpload = document.getElementById("upload");
inputUpload.addEventListener('change', function(event) {
    // Pour choper le 1er élement
    const files = event.target.files[0];
    // Met l'url de la video qu'on a upload
    const urlFile = URL.createObjectURL(files);
    document.querySelector('#mediaVideo').style.display = "block";
    document.querySelector('#mediaVideo').src = urlFile;
    console.log(urlFile);

    
})
