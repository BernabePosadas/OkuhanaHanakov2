exports.RandomGet = function (deck){
    candidates = shuffle(deck);
    return candidates[Math.floor(Math.random() * candidates.length)];
     
}
exports.RandomSurpriseShoot= function(){
  var results = ["mark", "ivan", "me", "all"];
  results = shuffle(results);
  return results[Math.floor(Math.random() * 3)];
}

exports.RandomSpeechReplies = function(){
  var result = ["ehehe (^-^) mitsuketta. \n> ***shoots arrow***", "surprise ehehe. \n> ***shoots arrow***", "Ta-da, \n> ***shoots arrow***", "touh! \n> ***shoots arrow***", "yah! \n> ***shoots arrow***", "ehehe \n> ***shoots arrow***"];
  result = shuffle(result);
  return result[Math.floor(Math.random() * 5)];
}

// from :  https://github.com/coolaj86/knuth-shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
