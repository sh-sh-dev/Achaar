export default function (num) {
    if (typeof num === 'number') {
        num = num.toString()
    }
    let reg = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    num = num.replace(/[0-9]/g, n => reg[n])
    return num
}
