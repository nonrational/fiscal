// console.js
console.log('fiscal v0.0.1')

var HOURLY_CONSTANT = 60

// http://www.timlabonne.com/2013/07/parsing-a-time-string-with-javascript/
function parseTime(timeStr, dt) {
    if (!dt) {
        dt = new Date();
    }

    var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
    if (!time) {
        return NaN;
    }
    var hours = parseInt(time[1], 10);
    if (hours == 12 && !time[3]) {
        hours = 0;
    }
    else {
        hours += (hours < 12 && time[3]) ? 12 : 0;
    }

    dt.setHours(hours);
    dt.setMinutes(parseInt(time[2], 10) || 0);
    dt.setSeconds(0, 0);
    return dt;
}

function announce(){
    var guests = _guests(),
        duration = _duration(),
        cost = HOURLY_CONSTANT * guests * duration;

    if(guests > 0 && duration > 0) {
        console.log(guests + " guests for " + duration + " hours = $" + cost);
    }
}

setInterval(announce, 5000);

function _duration(){
    var startDateTime = _startTime(),
        endDateTime = _endTime();

    if(startDateTime === null || endDateTime === null) {
        return 0;
    }
    return Math.abs(endDateTime - startDateTime) / 36e5;
}

function _guests(){
    var guestList = document.querySelectorAll("div[id$=guests].ep-dp-guests div.ep-gl-guest")
    return guestList ? guestList.length : 0;
}

function _startTime(){
    var startInput = document.querySelectorAll("input[id$=st].text.dr-time")
    return startInput && startInput.length > 0 ? parseTime(startInput[0].value) : null;
}

function _endTime(){
    var endInput = document.querySelectorAll("input[id$=et].text.dr-time")
    return endInput && endInput.length > 0 ? parseTime(endInput[0].value) : null;
}
