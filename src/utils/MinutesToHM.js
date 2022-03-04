export default function minutesToHM(d) {
    d = Number(d);
    var h = Math.floor(d % 3600 / 60);
    var m = Math.floor(d % 3600 % 60);
    return ('' + h).slice(-2) + "ч " + ('0' + m).slice(-2) + "м";
}