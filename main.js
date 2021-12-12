// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
  
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
  
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");


var beep = new Audio('Sounds/Beep.wav');

let month1 = 0;
let day1 = 0;
let hour1 = 0;
let minute1 = 0;
let background1;


  
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
  
// Create the audio element for the player
let curr_track = document.createElement('audio');
  
// Define the list of tracks that have to be played





let track_list = [
  {
    name: "December 6th 2:40PM",
    month: 12,
    day: 6,
    hour: 2,
    minute: 40,
    path: "Messages/RE1f16e438fb00a29f5de159cf58e9e7af.mp3",
  },
  {
    name: "December 9th 4:22PM",
    month: 12,
    day: 9,
    hour: 4,
    minute: 22,
    path: "Messages/2.mp3",
  },
  {
    name: "December 13th 9:15PM",
    month: 12,
    day: 13,
    hour: 9,
    minute: 15,
    path: "Messages/3.mp3",
  },
];






function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  
  // Update details of the track
  track_art.style.backgroundImage = 
     "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = 
     "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  month1 = track_list[track_index].month;
  day1 = track_list[track_index].day;
  hour1 = track_list[track_index].hour;
  minute1 = track_list[track_index].month;
  
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
  
  // Apply a random background color
  document.body.style.background = "rgb(0, 0, 0)";
  
}
  
  
// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}


function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}
  
function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
  background1.amp(0.2)
  background1.loop()

  
  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
  
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
  background1.pause()
  
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
  
function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  beep.play();

  if (track_index < track_list.length - 1)
    track_index += 1
  else track_index = 0;
  
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}
  
function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;
    
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}


function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider 
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);
  
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
  
function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}
  
function seekUpdate() {
  let seekPosition = 0;
  
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
  
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the tracklist
loadTrack(track_index);

function preload(){
  background1 = loadSound('Sounds/Background.mp3');
}


function setup(){
  canvas = createCanvas(800, 1000, WEBGL);
  setAttributes('antialias', true);
 
  strokeWeight(0.5);
  canvas.parent("canvas");
  background(255)
  }
  
  function draw (){


    background(0);
    // normalMaterial();
    noFill()
    stroke(255);
    rotateY(frameCount * 0.01);
    // rotateX();
    rotateZ(frameCount * 0.01);
    apple();

  }

  function apple() {
    beginShape(TRIANGLE_FAN);
  
    size = 20;
  
    for (let u = 0; u < TWO_PI; u += 0.1) {
        for (let v = -PI; v < PI; v += 0.1) {
      x = cos(u * month1) * (4 + month1 * cos(v))
      y = sin(u * day1) * (4 + day1 * cos(v))     
      z = (cos(v * minute1) + sin(hour1) -1) * (1+sin(v)) * log(1-PI * v/hour1)+7.5 * sin(v)
      //point(size * x, size * y, size * z);
      vertex(minute1 * x, size * y, size * z);
        }
    }
  
    endShape(CLOSE);
  }