  




function startGame(data) {


const word = data.toUpperCase();
const missedLetter = document.querySelector('.missed-letter');
let hiddenWord ="";
const password = document.querySelector('.password');
let correctArray = [];
let errorsArray =[];
let missedChances=0;
const iceberg = document.querySelectorAll('.ice');

console.log(word, iceberg.length);



function hideWord(){

    for (let i=0; i < word.length; i++) {

        if(i%3 == 0) {

        hiddenWord = hiddenWord + word[i];
        }

        else {

        hiddenWord = hiddenWord + "_";
        }
    }


}

hideWord();

function displayHiddenWord(){

    while (password.firstChild) {
             
        password.removeChild(password.firstChild);
        
        }

    for ( let i=0; i<hiddenWord.length; i++) {

        let div = document.createElement('div');

        div.append(hiddenWord[i]);

        password.appendChild(div);
        
    }

}

displayHiddenWord();


document.addEventListener('keypress', guess);

function guess(e) {

    let key = e.keyCode;
    let keyChart = String.fromCharCode(key).toUpperCase();
    let correctAnswer = false;

    console.log(key, keyChart, correctArray);

    if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122))      {

      

       for (let i = 0; i<word.length; i++) {

            if (word.charAt(i) == keyChart ) {

                hiddenWord= hiddenWord.showLetter(i,keyChart);
        
                correctAnswer = true;
            }
       }


        if (correctAnswer) {

            console.log("litera prawidłowa");

            checkCorrectArray(correctArray, keyChart);
            displayHiddenWord();

        }

        else {

            checkErrorArray(errorsArray, keyChart);
        }
   
    }


    if (hiddenWord==word) {

        console.log('victory');
    }

    if (missedChances > iceberg.length -1 ) {
        console.log('przegrales');
    }

}



    function checkCorrectArray(array,item) {

        if(array.indexOf(item) < 0) {

            array.push(item);
            console.log("odgadłeś literę!")
        }

        else {
            console.log("mamy to już w tablicy");
        }


    }

    function checkErrorArray(array,item) {

    
        if(array.indexOf(item) < 0) {

            array.push(item);
            missedChances++;
            document.querySelector('.level'+missedChances).classList.add('show');
            document.querySelector('.iceberg-piece'+missedChances).classList.add('hide');
            missedLetters(item);
           
        }

        else {
            console.log("mamy to już w tablicy");
        }


    }

    function missedLetters(item) {

        let errorLetter = document.createElement('div');
        errorLetter.classList.add("letter-box");
        errorLetter.innerHTML = item;
        missedLetter.appendChild(errorLetter);

    }








    String.prototype.showLetter = function (index, item) {

        if (index > this.length -1) this.toString();

        else {

            return this.substr(0,index)+item+ this.substr(index +1);


        }

    }


}



function readData() {
    const apiURL = 'https://api.datamuse.com/words?rel_jjb=ocean&fbclid=IwAR26oGUUf8wnHiz-tw8yeUUJaK_-FcQ_2imW5fhcFTDLiVjqAhe8iIoJ1Gk';

    $.ajax({
        
        url: apiURL,
        dataType: 'json'
    })
    
    .done(wordsApi => {
        
        const index = Math.floor(Math.random() * wordsApi.length);
        const random = wordsApi[index].word;
        startGame(random);
        
    });

}

readData();


