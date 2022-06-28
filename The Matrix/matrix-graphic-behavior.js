let test = document.getElementById("matrixPreviewTable");

function cellLocator(matrix, column, row) {
    return matrix.getElementsByTagName("tr")[column - 1].getElementsByTagName("th")[row - 1];
}

function detectCellOnHover(matrix) {

    var matrixRowsNum = matrix.getElementsByTagName("tr").length;
    var matrixColumnsNum = matrix.getElementsByTagName("tr")[0].getElementsByTagName("th").length;
    var x, i;

    for(i = 0; i < matrixRowsNum; i++)
    {
        for (x = 0; x < matrixColumnsNum; x++)
        {
            matrix.getElementsByTagName("tr")[i].getElementsByTagName("th")[x].addEventListener("mouseover",()=>
            {
                console.log(i+x)
            });
        }
    }
}

detectCellOnHover(test);

// test.addEventListener("mouseover", () => {
//     alert(test.getElementsByTagName("tr")[2].getElementsByTagName("th")[2]);
// });