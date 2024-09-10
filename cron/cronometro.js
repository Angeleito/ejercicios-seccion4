const frameDiv = document.getElementById("frame");
const timeDiv = document.getElementById("time");
const lapsDiv = document.getElementById("laps");
let timeRef = Date.now();
let accumulated = 0;
let toTime = true;

setInterval(()=>{
    if(toTime){
        accumulated += Date.now() - timeRef;
    };
    timeRef = Date.now()
    timeDiv.innerHTML = formatearMs(accumulated)
}, 1000/60);

function formatearMs (ms){
    let MS = ms%1000;
    let S = Math.floor(((ms - MS)/1000)%60);
    let M = Math.floor((S/60) %60);
    let H = Math.floor((M/60));

    Number.prototype.ceros = function(n){
        return (this + "").padStart(n,0);
    };
    return H.ceros(2)+":"+M.ceros(2)+":"+S.ceros(2)+"."+MS.ceros(3)
}

function start(){
    toTime = true;
}

function stop(){
    toTime = false;
}

function reset(){
    accumulated = 0;
    lapsDiv.innerHTML = "";
}

function lap() {
    const lapTime = formatearMs(accumulated);
    const lapElement = document.createElement("div");
    lapElement.innerText = lapTime;
    lapsDiv.appendChild(lapElement);
}