export function generateMatrix(tableLocation, rows, columns, publicIdentifier, HTMLtag, attribute = null, attributeValue = null)
{
    if (tableLocation.childElementCount)
    {
        tableLocation.innerHTML = "";
        document.getElementById(`${publicIdentifier}Val`).remove();
    }
    function matrixSelector(col, row)
    {
        return tableLocation.getElementsByTagName("tr")[col].getElementsByTagName("th")[row];
    }

    var p = document.createElement("p");
    p.id = `${publicIdentifier}Val`;

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
                            matrixSelector(n, m).style.transform = "scale(1.25)";
                            p.innerHTML = `${this.posX} × ${this.posY}`
                        }
                    }
                }
            }
            th.onmouseleave = function () {
                for (var n = 0; n < rows; n++) {
                    for (var m = 0; m < columns; m++) {
                        if (this.posY > m && this.posX > n) {
                            matrixSelector(n, m).style.backgroundColor = null;
                            matrixSelector(n, m).style.borderColor = "black";
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
                    }
                }
                p.style.color = "rgb(245, 2, 76)";
            }

            if (attribute) {
                th.setAttribute(attribute, attributeValue);
            }
            tr.appendChild(th);
        }
    }
    tableLocation.parentNode.appendChild(p);
    p.innerHTML = "0 × 0";
}