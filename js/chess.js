const chessDesck = {
    getBlockElements: document.getElementById('chess'),

    generateChessDesck() {
        this.getBlockElements.setAttribute('class', 'tableChess');
        const rowsNumber = [0, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        const colsName = [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 0];

        for (let rows = 0; rows < rowsNumber.length; rows++) {
            const tr = document.createElement('tr');
            this.getBlockElements.appendChild(tr);

            for (let cols = 0; cols < colsName.length; cols++) {
                const td = document.createElement('td');
                tr.appendChild(td);

                if (colsName[cols] != 0 && rowsNumber[rows] == 0) {
                    td.innerHTML = colsName[cols];
                } else if (colsName[cols] == 0 && rowsNumber[rows] != 0) {
                    td.innerHTML = rowsNumber[rows];
                }

                td.setAttribute('class', this.colorCell(cols, rows));
            }
        }

    },
    colorCell(rowsNum, colsNum) {
        if (rowsNum == 0 || colsNum == 0 || rowsNum == 9 || colsNum == 9) {
            return 'celWhite';
        } else if ((rowsNum + colsNum) % 2 == 0) {
            return 'celBlack celBorder';
        }
        return 'celWhite celBorder';
    }
}
chessDesck.generateChessDesck();