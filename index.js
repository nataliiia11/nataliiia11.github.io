 const mapEngGer = new Map([
        ['a', ".-"],
        ['b', "-..."],
        ['c', "-.-."],
        ['d', "-.."],
        ['e', "."],
        ['f', "..-."],
        ['g', "--."],
        ['h', "...."],
        ['i', ".."],
        ['j', ".---"],
        ['k', "-.-"],
        ['l', ".-.."],
        ['m', "--"],
        ['n', "-."],
        ['o', "---"],
        ['p', ".--."],
        ['q', "--.-"],
        ['r', ".-."],
        ['s', "..."],
        ['t', "-"],
        ['u', "..-"],
        ['v', "...-"],
        ['w', ".--"],
        ['x', "-..-"],
        ['y', "-.--"],
        ['z', "--.."],
        ['ü', "..--"],
        ['ö', "---."],
        ['ä', ".-.-"],
        ['ß', "...--.."],
        ['1', ".----"],
        ['2', "..---"],
        ['3', "...--"],
        ['4', "....-"],
        ['5', "-...."],
        ['6', "--..."],
        ['7', "--..."],
        ['8', "---.."],
        ['9', "----."],
        ['0', "-----"]
            ]);



const mapRus = new Map([
          ['а', ".-"],
          ['б', "-..."],
          ['в', ".--"],
          ['г', "--."],
          ['д', "-.."],
          ['е', "."],
          ['ё', "."],
          ['ж', "...-"],
          ['з',  "--.."],
          ['и', ".."],
          ['й', ".---"],
          ['к', "-.-"],
          ['л', ".-.."],
          ['м', "--"],
          ['н', "-."],
          ['о', "---"],
          ['п', ".--."],
          ['р', ".-."],
          ['с', "..."],
          ['т', "-"],
          ['у', "..-"],
          ['ф', "..-."],
          ['х', "...."],
          ['ц', "-.-."],
          ['ч', "---."],
          ['ш', "----"],
          ['щ', "--.-"],
          ['ъ', "-..-"],
          ['ы', "-.--"],
          ['ь', "-..-"],
          ['э', "..-.."],
          ['ю', "..--"],
          ['я', ".-.-"],
          ['1', ".----"],
          ['2', "..---"],
          ['3', "...--"],
          ['4', "....-"],
          ['5', "-...."],
          ['6', "--..."],
          ['7', "--..."],
          ['8', "---.."],
          ['9', "----."],
          ['0', "-----"],
          [' ', " "]
        
        ]);


      //check which language was selected and access the maps accordningly
      let langMap = new Map();
      langMap = mapEngGer;

      if (document.getElementById('russian').checked === true) {
        langMap = mapRus;
      } 

      // JQuery function works when submit button is clicked
      $('#encode').on('submit', function(ev) {
        ev.preventDefault();
        //get value of all input firlds, better change to id
        var value = $('input[name=text]').val().toLowerCase();
        //create an array of words withour spaces
        let words = value.split(/\s+/)
        var arrMorse = []
        //get array of characters arr from words
        var arr = Array.from(value)
        //throw exception if no message is entered
        if (arr.length == 0) {
          alert("Please Enter A Message!");
          throw "Please Enter A Message!";
        } else if(arr.length === 0 && words.length != 0) {
          alert("Please enter a valid message ");
          throw "Please enter a valid message";
        }

        // each character arr[k] is a key in engMap and we searching for a value (morse dashes and dots) using the key
        for (let k = 0; k < arr.length; k++) {
          if (arr[k] != null) {
            arrMorse[k] = langMap.get(arr[k]);
            if(arr[k] === " ") {
              arrMorse[k] === " "
            }
            if(langMap.get(arr[k]) === undefined) {
              arrMorse[k] = arr[k]
            }
          } 
        }
        console.log(arrMorse)
        
        document.getElementById("idEnc").innerHTML = arrMorse.join(' ')
      })


      //Seems like JS doesn't have build in function to get key by value
      //So I get a function here https://stackoverflow.com/questions/47135661/how-can-i-get-a-key-in-a-javascript-map-by-its-value
      function getByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
          if (value === searchValue) {
            return key;
          }
        }
      }


      $('#decode').on('submit', function(ev) {
        ev.preventDefault();
        //get value of all input firlds, better change to id
        var value = $('input[name=morseText]').val();
        //create an array of morse letters 
        let morseLetters = value.split(/\s/)
        let arrNormalLeters = []
        var arr = Array.from(value)
        console.log(morseLetters.length)

        //throw exception if no message is entered
        if (arr.length === 0) {
          alert("Please Enter A Message!");
          throw "Please Enter A Message!";
        } else if(arr.length > 1 && morseLetters.length === 1) {
          alert("Please enter a morse code message with spaces between symbols!");
        }

        for (let j = 0; j < morseLetters.length; j++) {
          arrNormalLeters[j] = getByValue(langMap, morseLetters[j])
          if(morseLetters[j] === " ") {
            arrNormalLeters[j] = "  "
          }
          if(getByValue(langMap, morseLetters[j]) === undefined) {
            arrNormalLeters[j] = morseLetters[j]
          }
        }
        console.log(morseLetters)
       
                document.getElementById("idDec").innerHTML = arrNormalLeters.join(' ')

      })
