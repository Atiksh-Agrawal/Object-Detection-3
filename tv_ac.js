function preload(){
    img1 = loadImage("2-500x500.jpg");
    img2 = loadImage("Tv_ac.PNG");
}

function setup(){
    canvas = createCanvas(700,480);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}

function draw(){
    image(img2 ,0,0,700,480);
    
    if(status != ""){
      for(i=0 ; i<objects.length ; i++){
        document.getElementById("status").innerHTML = "Status : Object detected !" ;
        document.getElementById("num_of_objects").innerHTML = "Number of objects detected : " + objects.length ;
        percent = floor(objects[i].confidence * 100);
        fill("red");
        stroke("red");
        text(objects[i].label  +" "+percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height);
      }
    }
    }

function modelLoaded(){
    console.log("CocoSsd is initialized");
    status = true;
    objectDetector.detect(img2,gotResult);
}

function gotResult(error,results){
    if(error){
       console.error(error);
 }
    else{
        console.log(results);
        objects = results;
 }
 }