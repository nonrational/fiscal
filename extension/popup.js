function submit(e){
    e && e.preventDefault();

    console.log("hourly=" + hourly());
    return false;
}

function hourly(){
    return document.getElementById("hourly").value
}

document.getElementById("popsubmit").onclick = submit
