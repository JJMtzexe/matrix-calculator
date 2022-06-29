import * as bhv from './matrix-graphic-behavior.js';
let cv_ln = document.getElementById("titleLine").getContext("2d");
let titleLore = document.getElementById("lore");
let table = document.getElementById("matrixPreviewTable");

function fillCanvas(canvasWithContext, color)
{
    const cv = canvasWithContext;
    const w = cv.canvas.width;
    const h = cv.canvas.height;

    cv.beginPath();
    cv.strokeStyle = color;
    cv.lineWidth = parseInt(h);
    cv.moveTo(w*0.1, h/2);
    cv.lineTo(w*0.9, h/2);
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
bhv.generateMatrix(table, 5, 5, "matrixPrev", "th");
