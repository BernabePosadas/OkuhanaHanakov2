exports.createBernabeDeck = function () {
    var candidates = [
        "futaba_anzu",
        "crescent_(azur_lane)",
        "kohaku_(rune_factory)",
        "dolce_(rune_factory)",
        "kuko_(flower_knight_girl)",
        "heliotrope_(flower_knight_girl)",
        "flandre_scarlet",
        "nepgear"
    ];
    var probabilities = [
        112, // 56 % of 200 collections 
        4,   // 2 %
        4,   // 2 % 
        4,   // 2 %
        4 ,  // 2 %
        4 ,  // 2 %
        41,  // 20.5 %
        27   // 13.5 %
    ];
    return createDeck(candidates, probabilities);
    
}


exports.createMarkDeck = function () {
    var candidates = [
        "abigail_williams_(fate/grand_order)",
        "kokkoro_(princess_connect!) "
    ];
    var probabilities = [
        8,  // 80 % of 10 collections 
        2   // 20%  
    ];
    return createDeck(candidates, probabilities);
}

exports.createIvanDeck = function () {
    var candidates = [
        "lavender_(flower_knight_girl)",
        "hagi_(flower_knight_girl)",
        "kinrenka_(flower_knight_girl)",
        "enokorogusa_(flower_knight_girl)",
        "jack_the_ripper_(fate/apocrypha)",
        "nursery_rhyme_(fate/extra)",
        "megumin" 
    ];
    var probabilities = [
        2,  // 10 % of 20 collections 
        1,  // 5%
        2,  // 10%
        2,  // 10%
        6,  // 30%
        3,  // 15%
        4,  // 20%
    ];
    return createDeck(candidates, probabilities);
}

function createDeck(candidates, probabilities){
    var deck = [];
    candidates.forEach(function (value, index) {
        var count = probabilities[index];
        while (count != 0) {
            deck.push(value);
            count--;
        }
    });
    return deck;
}