


	       ..._              ____  ___   ________  ______    _   __
	     .'     `.          / __ \/   | / ____/  |/  /   |  / | / /
	    :  o   _.-'        / /_/ / /| |/ /   / /|_/ / /| | /  |/ / 
	    :     `-._        / ____/ ___ / /___/ /  / / ___ |/ /|  /  
	    `.       .'      /_/   /_/  |_\____/_/  /_/_/  |_/_/ |_/   
	      `-...-'                                                  


	         Developed by: Zi Wang (ziw), Bingying Xia (bxia)






               	 	//////// How to Play /////////

 On welcome screen, press S to start the game.
 Use arrow keys or WASD to move, Q to pause, E to resume, and R to restart.
 Gaming mechanics is just like the original Pacman.

 In case you were living under a rock and doesn't know what Pacman is (or too 
 young to know), here's a brief summary (of the parts that we implemented):
 - Eat pellets to earn points.
 - Don't get eaten by ghosts or you'll die a very painful death.
 - Eat power pellets to briefly enter freight mode, where you can take revenge.
 - Each ghost has a different personality, so study it well to win.

 Scoring is as follows:
 - 10 pts for each pellet
 - 50 pts for each power pellet
 - 200 for the first ghost eaten in freight mode, double the previous score for
   each additional ghost eaten in the same occurance of freight mode (i.e. 200
   for the 1st, 400 for the 2nd, 800 for the 3rd, resets for every freight mode).


			 *******!!! SUPER ULTRA SECRET CHEAT !!!*******
			 * Press G at start screen to enter GOD MODE. *
			 * (You didn't hear it from us.)              *
			 **********************************************


 References used for gaming mechanics: 

 Understanding Pac-Man Ghost Behavior -- GameIntervals
 http://gameinternals.com/post/2072558330/understanding-pac-man-ghost-behavior

 The Pac-Man Dossier -- Jamie Pittman
 http://home.comcast.net/~jpittman2/pacman/pacmandossier.html






             	   //////// Concepts Used /////////

JavaScript

 - Function callbacks
   setInterval() used to refresh game, setTimeOut() used to pause screen 
   shortly during countdown to start.

 - Anonymous function
   Used with setTimeOut during countdown.

 - Optional parameters
   Run() takes an optional parameter of isGodMode to determine whether or not
   to enter god mode.

 - Arrays
   Used for constructing game board grids (2-D array), keeping record of ghosts
   and lives left, and an assortment of other various elements.

 - Objects
   Pacman, ghosts, and grids are all objects. 
   They have constructors, properties, parameters, prototypes, overridden 
   toString() methods, etc.


HTML5 Canvas

 - Rectangles, rectangles everywhere.
   Used for grids, covering up areas that need to be refreshed, etc.

 - Strokes and fills
   For drawing everything.

 - Paths, arcs, circles
   For drawing Pacman and ghosts.

 - Text
   For showing welcome screen, instructions, and scores.

 - Keyboard events
   Used to make Pacman move.
