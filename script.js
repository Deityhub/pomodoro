var breakLength = 5,
	sessionLength = 25,
	timeLeft = sessionLength,
	count = 0,
	runTimer = false,
	isBreak = false,
	timerInterval,
	breakSec;
var alarm = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2016/06/Ringing-clock.mp3?_=1');
var secs = 60 * timeLeft;

$('#clockStatus').click(startTimer);

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s 
      ); 
}

function alterSession(num){
	if(!runTimer){
		sessionLength += num;
		sessionLength = sessionLength > 1 ? sessionLength : 1;
		timeLeft = sessionLength;
		secs = 60 * sessionLength;
		$('#workTime').text(sessionLength + ' min');
		$('#timeLeft').text(sessionLength);
		btnReset();
		isBreak = false;
	}
}

function alterBreak(num){
	if(!runTimer){
		breakLength += num;
		breakLength = breakLength > 1 ? breakLength : 1;
		breakSec = 60 * breakLength;
		if(isBreak){
			timeLeft = breakLength;
			breakSec = 60 * breakLength;
			$('#timeLeft').text(breakLength);
		}
		$('#breakTime').text(breakLength + ' min');
	}
}

function startTimer() {
  if (count == 0) {
  	runTimer = true;
    count += 1;
    if(!isBreak){
    	countDown(sessionLength, secs);
    	$('#status').text('Timer running...');
   		$('#clockStatus').text('Pause');
    }else{
    	breakTimer()
    }
    
  } else if (count == 1) {
	    btnReset();
	    count -= 1;
	    if(!isBreak){
	    	$('#status').text('Timer paused');
	    }else{
	    	$('#status').text('Break paused');
	    }
	    $('#clockStatus').text('Resume');
  }
}

breakSec = 60 * breakLength;
function breakTimer(){
	runTimer = true;
	if(breakSec != 0){
		if(isBreak){
			$('#status').text('Break Time!');
			timerInterval = setInterval(function(){
				breakSec -= 1;
				$('#timeLeft').text(secondsToHms(breakSec));
				breakSec = breakSec
				if(breakSec == 0){
					alarm.play();
					isBreak = false;
					breakSec = 60 * breakLength;
					clearInterval(timerInterval);
					secs = 60 * sessionLength;

					countDown(sessionLength, secs);
				}

			}, 1000)
		}
	}
}

function countDown(m, s){
	$('#status').text('Timer running...');
	timerInterval = setInterval(function(){
		if(s != 0){
			s -= 1;
			$('#timeLeft').text(secondsToHms(s));
			secs = s;
		}else{
			alarm.play();
			isBreak = true;
			$('#status').text('Break Time!');
			btnReset()
			secs = 60 * sessionLength;

			breakTimer()
			$('#timeLeft').text(secondsToHms(s));
		}
	}, 1000);
}

function btnReset(){
	$('#status').text('Hello!');
	runTimer = false;
	clearInterval(timerInterval)
}