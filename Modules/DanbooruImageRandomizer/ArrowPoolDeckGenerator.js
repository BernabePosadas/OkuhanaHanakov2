exports.createBernabeDeck = function () {
    var candidates = [
        "futaba_anzu",
        "crescent_(azur_lane)",
        "kohaku_(rune_factory)",
        "dolce_(rune_factory)",
        "kuko_(flower_knight_girl)",
        "heliotrope_(flower_knight_girl)",
        "flandre_scarlet",
        ""
    ]
    var probabilities = [
        108, // 54 % of 200 collections 
        20,  // 10 %
        10,  // 5 % 
        10,  // 5%
        10,  // 5%
        10,  // 5%
        31,  // 15.5%
        1    // 0.5%
    ]
    var deck = []
    candidates.forEach(function (value, index) {
        var count = probabilities[index]
        while (count != 0) {
            deck.push(value)
            count--
        }
    });
    return deck;
}


exports.createMarkDeck = function () {
    var candidates = [
        "abigail_williams_(fate/grand_order)",
        "kokkoro_(princess_connect!) "
    ]
    var probabilities = [
        8,  // 100 % of 2 collections 
        2
    ]
    var deck = []
    candidates.forEach(function (value, index) {
        var count = probabilities[index]
        while (count != 0) {
            deck.push(value)
            count--
        }
    });
    return deck;
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
    ]
    var probabilities = [
        2,  // 10 % of 20 collections 
        1,  // 5%
        2,  // 10%
        2,  // 10%
        6,  // 30%
        3,  // 15%
        4,  // 20%
    ]
    var deck = []
    candidates.forEach(function (value, index) {
        var count = probabilities[index]
        while (count != 0) {
            deck.push(value)
            count--
        }
    });
    return deck;
}
