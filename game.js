
$(document).ready(function() {
    const $boardElement = $('#board');
    const $currentPlayerElement = $('#current-player');
    const $alertElement = $('#alert');
    const board = Array(9).fill(null); // Represents the board state
    let currentPlayer = 'X'; // Start with player 'X'

    // Create the squares
    for (let i = 0; i < 9; i++) {
        const $squareElement = $('<div class="square"></div>');
        $squareElement.on('click', () => handleSquareClick(i));
        $boardElement.append($squareElement);
    }

    // Handle square click
    function handleSquareClick(index) {
        if (board[index] || checkWinner()) return; // Ignore if already filled or game over

        board[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            return;
        }
        if (checkDraw()) {
            $alertElement.show();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        updateCurrentPlayer();
    }

    // Update the board UI
    function updateBoard() {
        $('.square').each((index, element) => {
            $(element).text(board[index]);
        });
    }

    // Update the current player heading
    function updateCurrentPlayer() {
        $currentPlayerElement.text(`Current Player: ${currentPlayer}`);
    }

    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    // Check for a draw
    function checkDraw() {
        return board.every(square => square !== null);
    }

    // Reset game
    $('#reset').on('click', function() {
        board.fill(null);
        updateBoard();
        currentPlayer = 'X'; // Next player starts with 'X'
        updateCurrentPlayer();
        $alertElement.hide();
    });

    // Initial update of the current player heading
    updateCurrentPlayer();
});




