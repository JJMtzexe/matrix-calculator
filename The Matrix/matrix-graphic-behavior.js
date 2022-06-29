function generateMatrix(tableLocation, rows, columns, publicIdentifier, HTMLtag, attribute = null, attributeValue = null)
{
    for(var i = 0; i < rows; i++)
    {
        var tr = document.createElement("tr");
        tableLocation.appendChild(tr);

        for(var x = 0; x < columns; x++)
        {
            var th = document.createElement(HTMLtag);
            if(attribute)
            {
                th.setAttribute(attribute, attributeValue);
            }
            tr.appendChild(th);
        }
    }

    var p = document.createElement("p");
    p.innerHTML = "";
    p.id = `${publicIdentifier}Val`;
    tableLocation.appendChild(p);

    matrixBehavior(tableLocation, publicIdentifier);
}

function matrixBehavior(matrix, publicIdentifier) 
{
    function matrixSelector(col, row)
    {
        return matrix.getElementsByTagName("tr")[col].getElementsByTagName("th")[row];
    }

    var matrixRowsNum = matrix.getElementsByTagName("tr").length;
    var matrixColumnsNum = matrix.getElementsByTagName("tr")[0].getElementsByTagName("th").length;

    for(var i = 0; i < matrixRowsNum; i++)
    {
        for (var x = 0; x < matrixColumnsNum; x++)
        {
            matrixSelector(i, x).style.backgroundColor = null;
            matrixSelector(i, x).style.borderColor = "black";
            matrixSelector(i, x).style.transform = "scale(1)";
            
            matrixSelector(i, x).id = publicIdentifier + (i+1).toString() + (x+1).toString();
            matrixSelector(i, x).posX = i + 1;
            matrixSelector(i, x).posY = x + 1;

            matrixSelector(i, x).onmouseover = function()
            {
                for (var n = 0; n < matrixRowsNum; n++)
                {
                    for (var m = 0; m < matrixColumnsNum; m++)
                    {
                        if (this.posY > m && this.posX > n)
                        {
                            matrixSelector(n, m).style.borderColor = "rgb(245, 2, 76)";
                            matrixSelector(n, m).style.transform = "scale(1.25)";
                        }
                    }
                }
            }
            matrixSelector(i, x).onmouseleave = function()
            {
                for (var n = 0; n < matrixRowsNum; n++) {
                    for (var m = 0; m < matrixColumnsNum; m++) {
                        if (this.posY > m && this.posX > n) {
                            matrixSelector(n, m).style.backgroundColor = null;
                            matrixSelector(n, m).style.borderColor = "black";
                            matrixSelector(n, m).style.transform = "scale(1)";
                        }
                    }
                }
            }
            matrix.getElementsByTagName("tr")[i].getElementsByTagName("th")[x].onmouseup = function()
            {
                for (var n = 0; n < matrixRowsNum; n++) {
                    for (var m = 0; m < matrixColumnsNum; m++) {
                        matrixSelector(n, m).onmouseover = undefined;
                        matrixSelector(n, m).onmouseleave = undefined;
                        matrixSelector(n, m).onmouseup = undefined;
                        matrixSelector(n, m).style.transform = "scale(1)";
                        if (this.posY > m && this.posX > n) {
                            matrixSelector(n, m).style.backgroundColor = "lime";
                            matrixSelector(n, m).style.borderColor = "green";
                        }
                    }
                }
            }
        }
    }
}

export {generateMatrix};