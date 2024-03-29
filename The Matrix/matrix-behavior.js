export function generateMatrix(tableLocation, rows, columns, publicIdentifier, HTMLtag, attribute = null, attributeValue = null)
{
    function matrixSelector(col, row) {
        return tableLocation.getElementsByTagName("tr")[col].getElementsByTagName("th")[row];
    }

    function updateCellDimensions(cell)
    {
        cell.width = parseInt(1 / rows * 150).toString();
        cell.height = parseInt(1 / rows * 150).toString();
        cell.style.borderRadius = `${cell.width / 150}em`;
        cell.parentElement.parentElement.style.borderSpacing = `${1 / rows * 5}em`;
        setTimeout(updateCellDimensions, 100, cell)
    }

    if (tableLocation.childElementCount)
    {
        tableLocation.innerHTML = "";
        document.getElementById(`${publicIdentifier}Val`).remove();
        document.getElementById(`${publicIdentifier}Reset`).remove();
        document.getElementById(`${publicIdentifier}OK`).remove();
    }

    var p = document.createElement("p");
    p.id = `${publicIdentifier}Val`;

    var resButton = document.createElement("button");
    resButton.id = `${publicIdentifier}Reset`;
    resButton.className = "button";

    var okButton = document.createElement("button");
    okButton.id = `${publicIdentifier}OK`;
    okButton.className = "button";

    resButton.onclick = function () {
        generateMatrix(tableLocation, rows, columns, "matrixPrev", "th");
    }

    okButton.onclick = function () {
        generateMatrix(tableLocation, this.posX, this.posY, "matrixEnter", "text");
    }

    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        tableLocation.appendChild(tr);

        for (var x = 0; x < columns; x++)
        {
            var th = document.createElement(HTMLtag);
            th.id = publicIdentifier + (i + 1).toString() + (x + 1).toString();
            th.posX = i + 1;
            th.posY = x + 1;

            th.onmouseover = function () {
                for (var n = 0; n < rows; n++) {
                    for (var m = 0; m < columns; m++) {
                        if (this.posY > m && this.posX > n) {
                            matrixSelector(n, m).style.borderColor = "rgb(245, 2, 76)";
                            matrixSelector(n, m).style.backgroundColor = "rgb(245, 2, 76)";
                            matrixSelector(n, m).style.transform = "scale(1.2)";
                            p.innerHTML = `${this.posX} × ${this.posY}`
                        }
                    }
                }
            }
            th.onmouseleave = function () {
                for (var n = 0; n < rows; n++) {
                    for (var m = 0; m < columns; m++) {
                        if (this.posY > m && this.posX > n) {
                            matrixSelector(n, m).style.backgroundColor = "white";
                            matrixSelector(n, m).style.borderColor = "white";
                            matrixSelector(n, m).style.transform = "scale(1)";
                            p.innerHTML = "0 × 0";
                        }
                    }
                }
            }
            th.onmouseup = function () {
                for (var n = 0; n < rows; n++) {
                    for (var m = 0; m < columns; m++) {
                        matrixSelector(n, m).onmouseover = undefined;
                        matrixSelector(n, m).onmouseleave = undefined;
                        matrixSelector(n, m).onmouseup = undefined;
                        matrixSelector(n, m).style.transform = "scale(1)";
                        if (this.posY > m && this.posX > n) {
                            matrixSelector(n, m).style.backgroundColor = "rgb(245, 2, 76)";
                            matrixSelector(n, m).style.borderColor = "rgb(245, 2, 76)";
                        }
                        else if (this.posY <= m || this.posX <= n)
                        { 
                            matrixSelector(n, m).style.backgroundColor = "white";
                            matrixSelector(n, m).style.borderColor = null;
                        }
                    }
                }
                p.style.color = "white";
            }

            if (attribute) {
                th.setAttribute(attribute, attributeValue);
            }
            tr.appendChild(th); 
            updateCellDimensions(th);
        }
    }
    tableLocation.parentNode.appendChild(p);
    tableLocation.parentNode.appendChild(resButton);
    tableLocation.parentNode.appendChild(okButton);
    p.innerHTML = "0 × 0";
    resButton.innerHTML = "reset";
    okButton.innerHTML = "OK";
}