let cv_ln = document.getElementById("titleLine").getContext("2d");
let titleLore = document.getElementById("lore");

function fillCanvas(canvasWithContext, color)
{
    const cv = canvasWithContext;
    const w = cv.canvas.width;
    const h = cv.canvas.height;

    cv.beginPath();
    cv.strokeStyle = color;
    cv.lineWidth = parseInt(h);
    cv.moveTo(0, h/2);
    cv.lineTo(w, h/2);
    cv.stroke();
    cv.closePath();
}

function randomString(size)
{
    var text = "";
    var possible = "01";

    for (var i = 0; i < size; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function randomRange(min, max)
{
    return parseInt(Math.floor(Math.random() * (max + 1 - min)) + min);
}

function repeatAssignSubtitle()
{
    titleLore.innerHTML = randomString(50);
    setTimeout(repeatAssignSubtitle, 100);
}

fillCanvas(cv_ln, "#cddcdc");
repeatAssignSubtitle();

