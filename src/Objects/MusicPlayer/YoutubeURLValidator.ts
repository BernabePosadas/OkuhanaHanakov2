export function isYTURL(args : string) {
    var regex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/g;
    return regex.test(args);
}
export function isURL(args : string) {
    var regex = /^((http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/g;
    return regex.test(args);
}