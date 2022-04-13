Status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 380, 380);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "status : Decting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelloaded() {
    console.log("I am loaded!");
    Status = true;
}