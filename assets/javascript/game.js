// Functions for Kanye West Hangman

// Declare and fill dictionary of Kanye song: album [cover image] key pairs
// var songs = ["all|falls|down": "College_Dropout.jpg", "we|dont|care": "College_Dropout.jpg", "spaceship": "College_Dropout.jpg", "jesus|walks": "College_Dropout.jpg", 
//             "heard|em|say": "Late_Registration.jpg", "touch|the|sky": "Late_Registration.jpg", "gold|digger": "Late_Registration.jpg", "hey|mama": "Late_Registration.jpg", 
//             "good|morning": "Graduation.jpg", "stronger": "Graduation.jpg", "cant|tell|me|nothing": "Graduation.jpg", "flashing|lights": "Graduation.jpg",
//             "say|you|will": "808s_&_Heartbreak.jpg", "welcome|to|heartbreak": "808s_&_Heartbreak.jpg", "amazing": "808s_&_Heartbreak.jpg", "paranoid": "808s_&_Heartbreak.jpg",
//             "dark|fantasy": "My_Beautiful_Dark_Twisted_Fantasy.jpg", "power": "My_Beautiful_Dark_Twisted_Fantasy.jpg", "all|of|the|lights": "My_Beautiful_Dark_Twisted_Fantasy.jpg", "monster": "My_Beautiful_Dark_Twisted_Fantasy.jpg",
//             "new slaves": "Yeezus.png", "im in it": "Yeezus.png", "blood on the leaves": "Yeezus.png", "bound 2": "Yeezus.png", 
//             "ultralight beam": "Life_of_Pablo.jpg", "waves": "Life_of_Pablo.jpg", "wolves": "Life_of_Pablo.jpg", "real friends": "Life_of_Pablo.jpg", 
//             "i|thought|about|killing|you": "Ye.jpg", "all|mine": "Ye.jpg", "ghost|town": "Ye.jpg", "violent|crimes": "Ye.jpg"];

var songs = ["all|falls|down", "we|dont|care", "spaceship", "jesus|walks", 
            "heard|em|say", "touch|the|sky", "gold|digger", "hey|mama", 
            "good|morning", "stronger", "cant|tell|me|nothing", "flashing|lights",
            "say|you|will", "welcome|to|heartbreak", "amazing", "paranoid",
            "dark|fantasy", "power", "all|of|the|lights", "monster",
            "new|slaves", "im|in|it", "blood|on|the|leaves", "bound|2", 
            "ultralight|beam", "waves", "wolves", "real|friends", 
            "i|thought|about|killing|you", "all|mine", "ghost|town", "violent|crimes"]; 

var album0 = "College_Dropout.jpg";
var album1 = "Late_Registration.jpg";
var album2 = "Graduation.jpg";
var album3 = "808s_&_Heartbreak.jpg";
var album4 = "My_Beautiful_Dark_Twisted_Fantasy.jpg";
var album5 = "Yeezus.png";
var album6 = "Life_of_Pablo.jpg";
var album7 = "Ye.jpg";

// Declare object songObj with properties title and album 
// var songObj = {
//     title: "",
//     album: "",
//     initialBoard: title
// };


// Declare current song variable
var song = '';
// Declare index variable to get album img file from song
var ind;
// Declare current board variable
var board = [];
// Declare array to save guesses
var guesses = [];
// Declare variable to indicate whether or not letter has been guessed
var beenGuessed = false;
// Declare and assign value to correctGuess variable
var correctGuess = false;
// Declare guesses left variable
var guessesLeft = 6;
// Declare variable for album cover file
var albumCoverFile = '';


// Function to get random song
function getRandomSong () {
    ind = Math.floor(Math.random() * 31);
    song = songs[ind];
    console.log('song: '+song);
    console.log('---');
    return song;
}

function getBoard () {
    for (i=0; i<song.length; i++) {
        if (song[i] == '|') {
            board.push('|'); 
        } else {
            board.push('_');
        }
    }
    console.log('board: '+board);
    console.log('---');
    return board;
}

function getAlbumCoverFile () {
    if (ind<4) {
        return album0;
    } else if (ind<8) {
        return album1;
    } else if (ind<12) {
        return album2;
    } else if (ind<16) {
        return album3;
    } else if (ind<20) {
        return album4;
    } else if (ind<24) {
        return album5;
    } else if (ind<28) {
        return album6;
    } else if (ind<32) {
        return album7;
    }
}
        
// Set up game when window loads
$(document).ready(function() {
    // Get song
    song = getRandomSong();
    // Get album cover 
    albumCoverFile = 'assets/images/'+getAlbumCoverFile();
    console.log('albumCoverFile: '+albumCoverFile);
    console.log('---');
    // Set albumCover html element
    document.getElementById('album-cover').src = albumCoverFile;
    $("#albumCover").css("src", albumCoverFile);
    // Get board
    board = getBoard();
    // Set board html element
    document.getElementById('board').textContent = board.toString();
    console.log('board: '+document.getElementById('board').textContent);
    console.log('---');
});

// Function to reset turn
function reset () {
    guesses = [];
    beenGuessed = false;
    correctGuess = false;
    guessesLeft = 6;
    song = getRandomSong();
    board = getBoard();
}

// Function to check to see if need new song
function checkForReset () {
    if (guessesLeft<1) {
        alert("You're out of guesses!");
        document.getElementById('board').textContent = song;
    }
    if (confirm("Next song?")) {
        reset();
    }
}

// Function to show song title when user fails
function showSongTitle () {
    document.getElementById('board').textContent = song;
}

// Function to let user know they've already guessed letter
function alreadyGuessed () {
    document.getElementById("aviso").textContent = "You have already guessed " + currentGuess;
}

// Function to check if valid guess is correct
function checkValidGuess () {
    for (var i=0; i<song.length; i++) {
        if (song[i] == guess) {
            // Set correct guess to true
            correctGuess = true;
            // Set successful aviso 
            correctGuess();
            // Update board
            board[i] = guess;  
            return;            
        }
    }
    if (!correctGuess) {
        guessesLeft--;
        checkForReset();
        return;
    }
}

// Function to let user know they've won
function winConfirmed () {
    document.getElementById("aviso").textContent = "You've correctly guessed the song title!";
}

// Function to check to see if user has won
function checkForWin () {
    if (song == board) {
        winConfirmed();
    }
        
}

// Function to let user know they've guessed a correct letter
function correctGuess () {
    document.getElementById("aviso").textContent = "Nice!";
}

// Function to execute on each guess
function guessing () {
    // Assign value of key pressed to guess
    var guess = '';
    document.onkeyup = function (event) {
        guess = event.key;
        console.log('guess: '+guess);
        console.log('---');
        // If letter has been already guessed, then let user know and end function
        if (guesses.includes(guess)) {
            alreadyGuessed(); 
            return;
        // Else add the guess to guess array and check to see if it matches any letters in song title             
        } else { 
            guesses.push(guess);
            checkValidGuess();
        }
    }   
}
   


