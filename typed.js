let words =[
    [ 
        "next",
        "short",
        "nice",
        "bottle",
        "full",
        "soda",
        "vast",
        "glue",
        "close",
        "hurry",
        "robin",
        "trace",
        "rock",
        "absent",
        "cover",
        "note",
        "burst",
        "relax",
        "group",
        "sad",
        "rob",
        "yell",
        "pop",
        "mix",
        "fix",
        "hot",
        "pin",
        "hill",
        "wiry",
        "dirt",
    ],
    [
        "paddle",
        "answer",
        "awesome",
        "distance",
        "fertile",
        "wakeful",
        "belief",
        "slippery",
        "bizarre",
        "learned",
        "vivacious",
        "grandmother",
        "illegal",
        "thirsty",
        "wholesale",
        "tenuous",
        "skillful",
        "deteriorate",
        "poised",
        "humorous",
        "scrape",
        "replace",
        "languid",
        "adjoining",
        "interesting",
        "stranger",
        "polite",
        "scissors",
        "brainy",
        "interrogation",  
    ],
    [
        "return;",
        "#include",
        "'helloworld'",
        "obj:1",
        "call()",
        "&lt;html&gt;",
        "not_easy",
        "more-dashes",
        "camelCase",
        "ASCII",
        "array[]",
        "printf('')",
        "&lt;/html&gt;",
        "^regex$",
        "System.out.println()",
    ],
    [

        
    ],
]

let pointer = 0;
let level = 0;
let current = words[level][pointer];
let input = document.getElementById("input");
let box = document.getElementById("scrollingwords");
let orignamOffset = 133;
let offset = 133;
let nextOffset = 31;
let red = 0, green = 255, blue = 0;
let rotationOffset = -90;
let colorAddition = 25.5;
let rotationAddition = 9;
let countdown = 4;
let quaters = document.querySelectorAll('.quaters');
let score = 0;
let highscore = 0;

window.onload = function() {
    let final = "";
    for(let i = 0; i < words[level].length; i++) {
        final += "<li>" + words[level][i] + "</li>";
    }
    document.querySelectorAll(".bouncy")[0].classList.add("bouncyIntro");
    document.querySelector("#q1").classList.add("q1c");
    document.querySelector("#q2").classList.add("q2c");
    document.querySelector("#q3").classList.add("q3c");
    document.querySelector("#q4").classList.add("q4c");
    document.querySelectorAll("ul")[0].innerHTML = final;
    document.querySelector("#word").textContent = current;
    let currentScroll = document.querySelectorAll("li")[pointer];
    currentScroll.style.fontSize = "19pt";
    currentScroll.style.fontWeight = "bold";
    currentScroll.style.color = "rgba(255, 255, 255, 0.7)";
}

input.onfocus = function() {
    input.placeholder = "";
}

input.onblur = function() {
    input.placeholder = "Type the text above to begin...";
}

function setColors() {
    if (green === 255 && red < 255 && blue === 0) {
        red += colorAddition;
        rotationOffset += rotationAddition;
        for (let i = 1; i < 4; i++) {
            document.querySelectorAll('.movers')[i].style.transform = "rotate(" + rotationOffset.toString() + "deg)";
        }
    }
    else if (green > 0 && red === 255 && blue === 0) {
        green -= colorAddition;
        rotationOffset += rotationAddition;
        for (let i = 2; i < 4; i++) {
            document.querySelectorAll('.movers')[i].style.transform = "rotate(" + rotationOffset.toString() + "deg)";
        }
    }
    else if (green === 0 && red === 255 && blue < 255) {
        blue += colorAddition;
        rotationOffset += rotationAddition;
        for (let i = 3; i < 4; i++) {
            document.querySelectorAll('.movers')[i].style.transform = "rotate(" + rotationOffset.toString() + "deg)";
        }
    }
}

function changeLevel(newLevel) {
    input.value = "";
    document.querySelector("#q1").classList.add("q1c");
    document.querySelector("#q2").classList.add("q2c");
    document.querySelector("#q3").classList.add("q3c");
    document.querySelector("#q4").classList.add("q4c");
    red = blue = 0;
    green = 255;
    rotationOffset = -90;
    quaters.forEach(quater => {
        let c = "rgb(" + red.toString() + "," + green.toString() + "," + blue.toString() + ")";
        quater.style.borderLeftColor = c;
        quater.style.borderTopColor = c;
        quater.style.transform = "rotate(" + rotationOffset.toString() + "deg)";
    })
    level = newLevel;
    pointer = 0;
    current = words[level][pointer];
    let final = "";
    for(let i = 0; i < words[level].length; i++) {
        final += "<li>" + words[level][i] + "</li>";
    }
    document.querySelectorAll("ul")[0].innerHTML = final;
    document.querySelector("#word").textContent = current;
    offset = orignamOffset;
    let currentScroll = document.querySelectorAll("li")[pointer];
    currentScroll.style.fontSize = "19pt";
    currentScroll.style.fontWeight = "bold";
    currentScroll.style.color = "rgba(255, 255, 255, 0.7)";
    let setLevel = level===2?"Coding":level;
    document.querySelector("#message").textContent = "Level-" + level.toString();
    box.style.marginTop = offset.toString() + "px";
}

function setScore() {
    score += countdown;
    document.querySelector("#score").innerHTML = score.toString();
}

function setHighScore() {
    if (score > highscore) {
        highscore = score;
        document.querySelector("#highscore").innerHTML = highscore.toString();
    }
    score = 0;
    document.querySelector("#score").innerHTML = score.toString();
}

input.oninput = function() {
    if (level === 0 && pointer === 0 && input.value.length === 1) {
        let timed = setInterval(clockHandler, 1000);
        function clockHandler() {
            if (countdown > 0) {
                countdown--;
                if (countdown === 0) {
                    document.querySelector("#message").textContent = "Game Over";
                    input.blur();
                    input.value = "";
                    setTimeout(() => {
                        clearInterval(timed);    
                        changeLevel(0);
                        countdown = 4;
                        setHighScore();
                        document.querySelector("#secs").textContent = countdown;
                    }, 1000);
                }
            }
            document.querySelector("#secs").textContent = countdown;
        }
    }
    document.querySelectorAll(".bouncy")[0].classList.remove("bouncyIntro");
    document.querySelectorAll(".bouncy")[0].style.opacity = "1";
    document.querySelector("#q1").classList.remove("q1c");
    document.querySelector("#q2").classList.remove("q2c");
    document.querySelector("#q3").classList.remove("q3c");
    document.querySelector("#q4").classList.remove("q4c");
    document.querySelectorAll(".bouncy")[0].classList.remove("bounce");
    if (input.value === words[level][pointer]) {
        setColors();
        setScore();
        if (level === 0 && pointer >=19 && pointer != 29)
            countdown = 3;
        else
            countdown = 4;
        document.querySelector("#secs").textContent = countdown;
        if (blue === 255) {
            let n = level + 1;
            changeLevel(n);
        }
        else {
            pointer += 1;
            current = words[level][pointer];
            document.getElementById("word").innerHTML = current;
            let currentScroll = document.querySelectorAll("li")[pointer-1];
            currentScroll.style.fontSize = "13pt";
            currentScroll.style.fontWeight = "";
            currentScroll.style.color = "rgba(255, 255, 255, 0.2)";
            currentScroll = document.querySelectorAll("li")[pointer];
            currentScroll.style.fontSize = "19pt";
            currentScroll.style.fontWeight = "bold";
            currentScroll.style.color = "rgba(255, 255, 255, 0.7)";
          
            offset = offset - nextOffset;
            quaters.forEach(quater => {
                let c = "rgb(" + red.toString() + "," + green.toString() + "," + blue.toString() + ")";
                quater.style.borderLeftColor = c;
                quater.style.borderTopColor = c;
            })
            box.style.marginTop = offset.toString() + "px";
            input.value = "";
        }   
    }
}