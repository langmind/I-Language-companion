// when users mouse-over a vowelbox, highlight the background and show the 
// details of the vowel in the large box 
function showVowel(vowel){
	var v = vowel.children; 
	document.getElementById('vowel-photo-large').style.backgroundImage = "url(' "+v[0].src+" ')";
	document.getElementById('vowel-photo-profile-large').style.backgroundImage = "url(' "+v[1].src+" ')";
	document.getElementById('vowel-feature').innerHTML = v[0].alt;
	// document.getElementById('vowel-feature').innerHTML = v[6].innerHTML;
	document.getElementById('vowel-orth-large').innerHTML = v[2].innerHTML;
	document.getElementById('vowel-ipa-large').innerHTML = v[3].innerHTML;
	document.getElementById('vowel-wave-large').style.backgroundImage = "url(' "+v[4].src+" ')";
	//vowel.style.backgroundColor =  "#fffa8b"   // "rgba(255,153,227,0.4)"
}

// when users click a vowel box, play the vowel sound
function playVowel(vowel){
	var v = vowel.children; 
	v[5].play();
}

// when users mouse-out from the vowel box, chang ethe background color back to the original 
//function fadeColor(vowel){
//	vowel.style.backgroundColor = "rgba(255,153,227,0.2)"
//}

// // -- For the feature selector -- // // 

// making a model of each vowel using feature matrix -- they are javascript objects
var VOWEL_I = {
	id: "vowel-I",
	height: "high",
	backness: "nonback",
	roundness: "nonround"
};

var VOWEL_Y = {
    id: "vowel-Y",
    height: "high",
    backness: "nonback",
    roundness: "round"
};

var VOWEL_LAXU = {
    id: "vowel-LAXU",
    height: "high",
    backness: "back",
    roundness: "nonround"
};

var VOWEL_U = {
    id: "vowel-U",
    height: "high",
    backness: "back",
    roundness: "round"
};

var VOWEL_E = {
    id: "vowel-E",
    height: "nonhigh",
    backness: "nonback",
    roundness: "nonround"
};

var VOWEL_RDE = {
    id: "vowel-RDE",
    height: "nonhigh",
    backness: "nonback",
    roundness: "round"
};

var VOWEL_O = {
    id: "vowel-O",
    height: "nonhigh",
    backness: "back",
    roundness: "round"
};

var VOWEL_A = {
	id: "vowel-A",
	height: "nonhigh",
	backness: "back",
	roundness: "nonround"
};

// throw those models into an array to use in array map() method below;  
// this is the 'vowel inventory' 
var VOWELS = [
	VOWEL_I,
    VOWEL_Y,
    VOWEL_LAXU, 
    VOWEL_U,
    VOWEL_E, 
    VOWEL_RDE,
    VOWEL_O,
	VOWEL_A
];

function highlightMatchingVowels(event){
    // Remove highlight from highlighted vowels each time the user uses a selector. 
    // This serves for "de-highlighting" unmatching vowels. 
    // getElementsByClassName returns a collection (NodeList) so we need to loop through it.
    // NodeList is a colletion of DOM elements. It is not an array (even though it looks like so)
    // and thus array methods (e.g. splice, reverse) can not be used. 
    // http://stackoverflow.com/questions/5501433/nodelist-object-in-javascript 
    // https://www.sitepoint.com/a-collection-is-not-an-array/ 
    var vowelBoxes = document.getElementsByClassName('vowel-box'); 
    console.log(vowelBoxes); 
    for (var i=0; i<vowelBoxes.length; i++){
        vowelBoxes[i].style.backgroundColor = '#ffffff' // 'rgba(255,153,227,0.2)'
    };

    // getting feature values from the selector 
    var height = document.getElementById('height').value;   
    var backness = document.getElementById('backness').value; 
    var roundness = document.getElementById('roundness').value; 
    
    var featuresSelected = {
        height: height,
        backness: backness,
        roundness: roundness
    };

    highlightVowels(featuresSelected);  
}


function highlightVowels(featuresSelected){ // featuresSelected = options chosen on the selector 
    console.log(featuresSelected);   

    // map() array method: https://www.discovermeteor.com/blog/understanding-javascript-map/ 
    // myArray.map(myFunction): map() operates the function on an array and creates a new array  
    // into which it puts the results of the operation.  
    // getMatchingVowels operates on each vowel in VOWELS array, checking its height, backness and 
    // roundness features to see if they match the selected feature specs. The results are thrown 
    // into the new array matchingVowels.
    var matchingVowels = VOWELS.map(function getMatchingVowels(vowel){ 
    	console.log(vowel);
    	// see the decision tree down below	
        if (vowel.height === featuresSelected.height){
            if (vowel.backness === featuresSelected.backness){
                if (vowel.roundness === featuresSelected.roundness){
                    return vowel;
                }else if (featuresSelected.roundness === 'both'){
                    return vowel;
                }                
            }else if (featuresSelected.backness === 'both'){
                if (vowel.roundness === featuresSelected.roundness){
                    return vowel;
                }else if (featuresSelected.roundness === 'both'){
                    return vowel;
                }               
            } 
        }else if (featuresSelected.height === 'both'){
            if (vowel.backness === featuresSelected.backness){
                if (vowel.roundness === featuresSelected.roundness){
                    return vowel;
                }else if (featuresSelected.roundness === 'both'){
                    return vowel;
                }
            }else if (featuresSelected.backness === 'both'){
                if (vowel.roundness === featuresSelected.roundness){
                    return vowel;
                }else if (featuresSelected.roundness === 'both'){
                    return vowel;  // return all the vowels if feature specs are not fussy about + or - 
                }
            }
        }    
    })

	console.log("before filter", matchingVowels) // showing an array contaiing undefined elements
    console.log(matchingVowels.length)
    // filter() array method: http://www.w3schools.com/jsref/jsref_filter.asp
    // myArrau.filter(myFunction) creates an array with myArray elements that have passed the test 
    // defined in myFunction  
    matchingVowels = matchingVowels.filter(function(vowel){
	    if (vowel) {
	    	return vowel;
	    } else {
	    	// removes undefined elements from the matchingVowels array
	    	return false;
	    }
    });

    console.log("after filter", matchingVowels); // an array with NO undefined element in it
    console.log(matchingVowels.length)


    // Now we have an array "matchingVowels", of which each item is an Object {key: value, kay: value, ...}. 
    // We want to get the value of the "id" key of each Object, use that id value to refer to the DOM element 
    // (which is a vowel-box), then change the background color of the DOM element. 
    matchingVowels.forEach(function(vowel){
        box_id = vowel.id
        console.log(box_id)
        document.getElementById(box_id).style.backgroundColor = "#fffa8b" // "rgba(255,153,227,0.5)"
    }); 
}  // highlightVowels

function clearSelection(event){
    document.getElementById('height').value = 'both';
    document.getElementById('backness').value = 'both';
    document.getElementById('roundness').value = 'both';
}

// map, filter, reduce: http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/ 


//      Height          Backness        Roundness
// ---- Specified ----- Specified ----- Specified
//   |              |               |
//   |              |               |-- Unspecified
//   |              |
//   |              |-- Unspecified --- Specified
//   |                              |
//   |                              |-- Unspecified   
//   |
//   |
//   |- Unspecified --- Specified ----- Specified 
//                   |              |
//                   |              |-- Unspecified 
//                   |
//                   |--Unspecified --- Specified 
//                                  | 
//                                  |-- Unspecified 
