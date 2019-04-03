// jQuery 
$(document).ready(function () {

    // game variables
    var totalTime;
    var timer;
    var questionCount;
    var correct;
    var incorrect;
    var unanswered;

    // trivia questions saved as an array of objects
    var trivia = [
        {
            question: "What food do Ross and Rachel Share in the pilot episode?",
            choices: ["An Oreo", "A Pop Tart", "An Oatmeal Raisin Cookie", "A Chocolate Chip Cookie"],
            answer: "An Oreo",
            img: "oreo.jpg"
        },

        {
            question: "Where does Chandler tell Janice he's been relocated?",
            choices: ["Yemen", "Russia", "Guam", "Minsk"],
            answer: "Yemen",
            img: "yemen.gif"
        },

        {
            question: "Who's Fiance Wants The Heavy Metal Band 'Carcass' At Their Wedding?",
            choices: ["Janice", "Megan", "Ursula", "Monica"],
            answer: "Megan",
            img: "megan.jpg"
        },
        {
            question: "How Many Roses Does Ross Send To Emily?",
            choices: ["76", "71", "74", "72"],
            answer: "72",
            img: "rose.jpg"
        },
        {
            question: "What Is The Name Of The Girl Chandler Has To Fire?",
            choices: ["Nina", "Nora", "Natalie", "Nicki"],
            answer: "Nina",
            img: "nina.jpg"
        },
        {
            question: "What Was Joey's Stuffed Penguin Called?",
            choices: ["Hugsy", "Maurice", "Cujo", "Michel"],
            answer: "Hugsy",
            img: "hugsy.gif"
        },
        {
            question: "What Car Did Phoebe Briefly Live In?",
            choices: ["A New York Cab", "A Pick up Truck", "A Buick Lesabre", "A Buick Wagon"],
            answer: "A Buick Lesabre",
            img: "lesabre.jpg"
        },
        {
            question: "When Carol Is In Labour With Ben, Joey Meets A Pregnant Woman. What Is Her Name?",
            choices: ["Lila", "Lysa", "Lyla", "Lydia"],
            answer: "Lydia",
            img: "lydia.png"
        },
        
        {
            question: "What Does Mona Bring Ross Back From A Trip?",
            choices: ["Rock Candy", "Strawberry Taffy", "Gummy Bears", "Saltwater Taffy"],
            answer: "Saltwater Taffy",
            img: "salt.png"
        },
        {
            question: "What Was The Name Of Ross And Monica's grandmother that passed away in the show?",
            choices: ["Marilyn", "Sylvia", "Sophia", "Althea"],
            answer: "Althea",
            img: "althea.png"
        },

        {
            question: "What Does Pete Bring Back From Japan For Monica?",
            choices: ["Hotel Toiletries", "Sweets", "Chocolate", "Cleaning Products"],
            answer: "Hotel Toiletries",
            img: "hotel.jpg"
        },

        {
            question: "What Is The Name Of The Cat Phoebe Thinks Is Her Mother?",
            choices: ["Chi Chi", "Julio", "Marcel", "Huey"],
            answer: "Julio",
            img: "julio.gif"
        },

        {
            question: "What was the name of the self help book that the girls loved?",
            choices: ["Be Your Own Person", "Be Your Own Cleansing Pool", "Be Your Own Windkeeper", "Be Your Own Lightning Bearer"],
            answer: "Be Your Own Windkeeper",
            img: "book.jpeg"
        },

        {
            question: "What is the 'giant poking device' made from?",
            choices: ["pencils", "sticks from a tree", "chopsticks", "straws"],
            answer: "chopstick",
            img: "poking.gif"
        },    
        {
            question: "What song did Ross sing to make Emma laugh?",
            choices: ["Milkshake","Baby got back", "Party in the USA", "Baby one more time"],
            answer: "Baby got back",
            img: "baby.gif"
        }  

    ]


    // when start button is clicked, game starts
    $('#start').click(function () {
        initialize();
        startGame();
    });

    // initialize game
    function initialize() {
        // initialize game variables  
        totalTime = 10;
        questionCount = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        // hide button, start image and background confetti
        $(this).addClass('hide');
        $('#pic').addClass('hide');
        $('.container').css("background-image", "none");
    }


    // start trivia questions
    function startGame() {
        // timer reset for every question
        totalTime = 10;
        // show game data: timer and trivia questions
        $('#game-wrapper').show();

        // display and start timer 
        $('#timer').text(totalTime);
        timer = setInterval(count, 1000);

        // display question and choices <div>
        var displayQuest = displayQuestionHTML();
        // make sure question area on html is empty before the next question
        $('#trivia-wrapper').empty();
        // add question and choice <div> to question area on html
        $('#trivia-wrapper').append(displayQuest);

    }

    // dynamically create HTML elements to display one question and choices. function returns a html div
    function displayQuestionHTML() {
        // store individual question object from trivia array in 'currentQuest'
        var currentQuest = trivia[questionCount];
        // create a <div> that wraps around the question object: question and choices, add class 'trivia' add data.
        var triviaBox = $('<div>').addClass('trivia').data('question', questionCount);
        // display question in <h3> and white
        var question = $('<h3>').text(currentQuest.question).addClass('quest');
        var br = $('<br><br>');
        $(question).css("color", "yellow").append(br);

        // create a div that wraps around all choices
        var choicebBox = $('<div>').addClass('choiceBox');
        // using a for each loop to create choice buttons
        currentQuest.choices.forEach(function (choice) {
            var choiceButton = $('<button>').text(choice);
            choiceButton.addClass("btn btn-outline-info option");
            var space = $('<br><br>');
            $(choicebBox).append(choiceButton, space);
        })
        // add question and choices to trivia box
        $(triviaBox).append(question, choicebBox);
        return triviaBox;
    }

    // create choice button clicking event
    $('#trivia-wrapper').on('click', '.option', function () {
        // get user answer.
        var userAnswer = $(this).text();
        // hide all the choices after clicking on one of them
        $('.choiceBox').slideUp();
        // stop timer
        clearInterval(timer);
        // creat img element, store answer image in 'image'
        var image = $('<img>').attr('src', "assets/images/" + trivia[questionCount].img).attr('alt', "trivia question").addClass('question-img');

        // check if answer is corrent 
        // let the user know if they were right or wrong
        // show answer image
        if (trivia[questionCount].answer === userAnswer) {
            correct++;
            var msg = $('<h2>').text('YOU ARE RIGHT!').css("color", "YellowGreen");
            var ans = $('<h2>').text('It was ' + userAnswer + "!").css("color", "YellowGreen");
            $('#trivia-wrapper').append(msg, ans);
        } else {
            incorrect++;
            var msg2 = $('<h2>').text('NOPE!').css("color", "red");
            var ans2 = $('<h2>').text('The answer is: ' + trivia[questionCount].answer).css("color", "red");
            $('#trivia-wrapper').append(msg2, ans2);
        }

        // add answer image
        $('#trivia-wrapper').append(image);

        // increase question count
        questionCount++;
        // 3 seconds pause before next question 
        timeout();
    });

    // count down and run out of time
    function count() {
        // totalTime decrease by 1
        totalTime--;
        $('#timer').text(totalTime);

        // if totalTime is 0, unanswered question count goes up by 1. 
        if (totalTime === 0) {
            // restart timer.
            clearInterval(timer);
            unanswered++;
            // display the answer after time runs out    
            displayAnswer();
            questionCount++;
            // 3 seconds pause before next question
            timeout();
        }
    }

    function displayAnswer() {
        // hide choices
        $('.choiceBox').slideUp();
        var image = $('<img>').attr('src', "assets/images/" + trivia[questionCount].img).attr('alt', "trivia question").addClass('question-img');
        var message = $('<h2>').text('OOPS! OUT OF TIME!').css("color", "DeepSkyBlue");
        var answer = $('<h2>').text("The answer is: " + trivia[questionCount].answer).css("color", "DeepSkyBlue");
        $('#trivia-wrapper').append(message, answer, image);
    }



    // timeout function trigger next question.
    function timeout() {
        setTimeout(function () {
            if (questionCount < trivia.length) {
                startGame();
            } // run out of quesitons. Then show correct,incorrect and unanswered, offer to start again
            else {
                $('#trivia-wrapper').empty();
                $('#game-data').addClass('hide');
                var gameOver = $('<h1>').text('GAME OVER!').css("color", "yellow");
                var correctScore = $('<p>').text("Total Correct Answers:" + correct);
                var incorrectScore = $('<p>').text("Total Incorrect answers:" + incorrect);
                var unansweredScore = $('<p>').text("Total Unanswered:" + unanswered);
                var startOver = $('<a>').attr('href', "index.html").text("Start Over?").addClass("btn btn-info again");
                $('#trivia-wrapper').append(gameOver, correctScore, incorrectScore, unansweredScore, startOver);

            }
        }, 3000);
    }
});

