# simon_game

https://eglital.github.io/simon_game/

A version of Simon Game. You win if you get a series of 20 steps right. You can play in regular or in strict mode.

# About
The user is presented with a random series of button presses.
Each time the user inputs a series of button presses correctly, he sees the same series of button presses but with an additional step.

The user hears a sound that corresponds to each button both when the series of button presses plays, and when he personally presses a button.

If the user presses the wrong button, he is notified that he has done so, and that series of button presses starts again to remind him of the pattern so he can try again.

The user can see how many steps are in the current series of button presses.

If the user wants to restart, he can hit a button to do so, and the game will return to a single step.

The user can play in strict mode where if he gets a button press wrong, it notifies him that he has done so, and the game restarts at a new random series of button presses.

The user can win the game by getting a series of 20 steps correct. He is notified of his victory, then the game starts over.

# Built with:
* JavaScript
* jQuery
* SASS
