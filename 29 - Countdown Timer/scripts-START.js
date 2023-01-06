const displayTimeLeft = document.querySelector( '.display__time-left' );
const displayEndTime = document.querySelector( '.display__end-time' );
const btnList = document.querySelectorAll( '[data-time]');

let countdown;

function timer ( seconds ){
    clearInterval( countdown );
    const now = Date.now();
    const then = now + seconds * 1000; //in ms
    display_time_Left( seconds );
    display_end_time( then );
    countdown = setInterval( () => {
        const secondsLeft = Math.floor( ( then - Date.now() ) / 1000) ;
        if( secondsLeft < 0 ){
            clearInterval( countdown );
            return;
        }
        display_time_Left( secondsLeft );
    }, 1000 );

}

function display_time_Left( seconds ){
    //console.log( seconds );
    const min = Math.floor(seconds / 60);
    const remSec = seconds % 60 ; 
    const time = `${min}:${remSec < 10 ? '0':''}${remSec}`;
    displayTimeLeft.textContent = time ;
}

function display_end_time( timestamp ){
    const end = new Date( timestamp );
    const hours =  end.getHours();
    const min = end.getMinutes();
    displayEndTime.textContent = `Be back at ${hours}:${min < 10 ? '0':''}${min}`;
}

function startTimer ( ){
    const seconds = parseInt(this.dataset.time) ;
    timer( seconds );
}

btnList.forEach( btn => btn.addEventListener( 'click' , startTimer ));
document.customForm.addEventListener( 'submit' , function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer( mins * 60 );
})
    