export default function (num, shouldBeNumber) {
    if (typeof num === 'number') {
        num = num.toString()
    }

    let reg = [0,1,2,3,4,5,6,7,8,9];
    num = num.replace(/[۰-۹]/g, n => reg[n].toString())
    
    return shouldBeNumber ? Number(num) : num
}
