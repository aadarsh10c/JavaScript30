const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


//get video
async function getVideo(){
    let localStream = null;
    console.log( 'inside function');
    try {
        localStream = await navigator.mediaDevices.getUserMedia({video : true , audio : false});

        //get the local stream url add it to video element
        video.srcObject = localStream;
        video.play();

    } catch (error) {
        alert(error);
    }

    
}

//get the video stream to canavas
function paintToCanavas(){
    
    const width = video.videoWidth;
    const height = video.videoHeight;
    
    //set cancavas width height same as image
    canvas.width = width;
    canvas.height = height;
    console.log(canvas.width , canvas.height);

    return setInterval( () => {
        ctx.drawImage( video , 0 , 0 , width , height);
        let pixels = ctx.getImageData(0 , 0 , width , height);
        //console.log( pixels );
        pixels = splitPixels( pixels );
        ctx.putImageData( pixels , 0 , 0);



    },16);
}

function redEffect( pixels ){
    for( i = 0 ; i < pixels.data.length ; i+=4){
        pixels.data[ i + 0] = pixels.data[ i + 0] + 200 //red   
        pixels.data[ i + 1] = pixels.data[ i + 1] + 10 // green
        pixels.data[ i + 2] = pixels.data[ i + 2] - 100 //blue
    }
    return pixels;
}

function splitPixels( pixels ){
    for( i = 0 ; i < pixels.data.length ; i+=4){
        pixels.data[ i - 150] = pixels.data[ i + 0]  ;//red   
        pixels.data[ i + 100] = pixels.data[ i + 1]  ;// green
        pixels.data[ i - 150] = pixels.data[ i + 2] ; //blue
    }
    return pixels;

}

function takePhoto(){

    //asound for phot capture
    snap.currentTime = 0;
    snap.play();

    //capture the photo from canvas
    const data = canvas.toDataURL('image/jpeg');
    
    //create a link to for the picture
    const link = document.createElement('a');
    link.href = data ;
    link.setAttribute( 'download' , 'Handsome');
    link.innerHTML = 'Download yer mug';
    strip.insertBefore( link , strip.firstChild );
}



getVideo();
video.addEventListener( 'canplay', paintToCanavas);