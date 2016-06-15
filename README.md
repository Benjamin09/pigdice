- Player can roll a six-sided dice and the result is returned
Sample Input: Click the roll button
Sample Output: 5

- The player's roll score gets added to a temporary score
Sample Input: 4
Sample Output: Player Score: 4 (plus what was already there)

- The player's score gets reset if they roll a one
Sample Input: 1
Sample Output: Player Score: 0

- The player can hold their score, ending their turn and adding their temporary score to their permanent score.
Sample Input: Hold button is clicked
Sample Output: Permanent Score gets the temporary score added to it.

- The player can reset the game.
Sample Input: Reset button is clicked
Sample Output: Score becomes 0

- A turn count increases by 1 every time the player holds or rolls a 1.
Sample Input: Player rolls a 1
Sample Output: Turn count increases by 1.

- The game keeps two total score tallies; one is altered on odd turns (Player 1), the other altered on even turns (Player 2).
Sample Input: Turn count is 2 and the player holds.
Sample Output: Temporary score is added to Player 2's game score.

- Allow a user-defined number of players to play.
Sample Input: 4 players
Sample Output: Player 1, Player 2, Player 3, Player 4

- Prompt the user for player names.
Sample Input: Charlie
Sample Output: Player 1 is Charlie

- Ask the user how many AI players they want to play against.
Sample Input: 2
Sample Output: 2 Players added to turn rotation with "computer" as species.

- Create a button that rolls for AI players.
Sample Input: AI Roll button is clicked
Sample Output: 5, added to AI's total

- Create an AI that will roll twice on its turn, with the result going to the AI's score.
Sample Input: Turn goes to an AI players
Sample Output: The AI rolled a 3 and a 4 for a total of 7.

- At the end of the game, give the player the option to start the game over with same settings as the game they just finished.
Sample Input: Same Players button is clicked.
Sample Output: The same list of players is used.
