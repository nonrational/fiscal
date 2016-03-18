// console.js
console.log('fiscal v0.0.1');

var HOURLY_CONSTANT = 60;

var util = {
    // http://www.timlabonne.com/2013/07/parsing-a-time-string-with-javascript/
    parseTime: function(timeStr, dt) {
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
};

var gcal = (function(doc, util){

    function guestCount(){
        var guestList = Array.prototype.slice.apply(doc.querySelectorAll("div[id$=guests].ep-dp-guests div.ep-gl-guest"))
                .filter(function(n,i,a){ return n.title.indexOf('removed') < 0; });
        return guestList ? guestList.length : 0;
    }

    function startDateTime(){
        var startInput = document.querySelectorAll("input[id$=st].text.dr-time");
        return startInput && startInput.length > 0 ? util.parseTime(startInput[0].value) : null;
    }

    function endDateTime(){
        var endInput = document.querySelectorAll("input[id$=et].text.dr-time");
        return endInput && endInput.length > 0 ? util.parseTime(endInput[0].value) : null;
    }

    function duration(){
        var start = startDateTime(), finish = endDateTime();

        if(start === null || finish === null) {
            return 0;
        }

        return Math.abs(finish - start) / 36e5;
    }

    function cost(){
        return HOURLY_CONSTANT * guestCount() * duration();
    }

    function appendFooter(calculatedCost){
        var descriptionTextArea = document.querySelectorAll("div.ui-sch > textarea");

        if (!descriptionTextArea || descriptionTextArea.length === 0){
            return false;
        }

        var textArea = descriptionTextArea[0],
            prefix = "\n--\nFisCal",
            description = textArea.value,
            footerIdx = description.indexOf(prefix),
            originalMessage = description.substring(0, footerIdx >= 0 ? footerIdx : description.length),
            footer = prefix + " estimates that this meeting will cost $" + calculatedCost + ".\nhttp://github.com/nonrational/fiscal\n";

        textArea.value = originalMessage + footer;
        return true;
    }

    function dump(){
        console.log("guestCount=" + guestCount());
        console.log("duration=" + duration());
        console.log("HOURLY_CONSTANT=" + HOURLY_CONSTANT);
        console.log("cost=" + cost());
    }

    return {
        dump: dump,
        guestCount: guestCount,
        duration: duration,
        cost: cost,
        appendFooter: appendFooter
    };

})(document, util);

setInterval(function(){
    gcal.appendFooter(gcal.cost());
}, 2500);
