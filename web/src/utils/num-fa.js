export default function (num) {
    if (typeof num === 'number') {
        num = num.toString()
    }
    let reg = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    for (var i = 0; i < reg.length; i++) {
        num = num.replace(new RegExp(i.toString(), 'g'), reg[i])
    }
    return num
}
