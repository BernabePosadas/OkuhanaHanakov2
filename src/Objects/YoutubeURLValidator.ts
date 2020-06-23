export function isYTURL(args : string) {
    var expression = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/g
    var regex = new RegExp(expression);
    if (!args.match(regex)) {
        return true;
    }
    return false;
}