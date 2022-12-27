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
        localStream = await navigator.mediaDevices.getUserMedia({video : false , audio : false});

        console.log( localStream );
    } catch (error) {
        
    }

    
}

getVideo();