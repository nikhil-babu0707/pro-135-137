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
    if (Status != "") {
        objectDetector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : objects dectected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotresults);
                document.getElementById("object_status").innerHTML = object_name + "found";
                synth = window.speachSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_status").innerHTML = objects_name + "not found";
            }
        }
    }
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
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