exports.isNotURL = function (args) {
    var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    var regex = new RegExp(expression);
    if (!args.match(regex)) {
        return true;
    }
    return false;
}
