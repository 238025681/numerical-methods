"use strict";

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};


function calculate(number, rounder) {
    let parseInput = math.parse('x^3-x^2+8x+12');
    //x^5-2*x^4-x-3
    //x^2/4-sin(x)
    //2.216223158843886
    let code = parseInput.compile();
    console.dir(math.eval('x^3-x^2+8x+12',{x:-5}))
    console.dir(math.eval('x^3-x^2+8x+12',{x:5}))


    console.log(bisectionWrapper(parseInput));

}

function bisectionWrapper(func_alpha) {
    let a = 0;
    let low;
    let high;
    let i = 1;

    if (func_alpha.eval({x: a}) <= 0) {
        low = a;
        while (true) {
            if (func_alpha.eval({x: i}) > 0) {
                high = i;
                break;
            }
            if (func_alpha.eval({x: -i}) > 0) {
                high = -i;
                break;
            }
            i++;
        }
    } else {
        high = a;
        while (true) {
            if (func_alpha.eval({x: i}) < 0) {
                low = i;
                break;
            }
            if (func_alpha.eval({x: -i}) < 0) {
                low = -i;
                break;
            }
            i++;
        }
    }
    return bisectionMethod(-5, 5, func_alpha);
}

function bisectionMethod(min, max, func_alpha) {
    let low, high, middle;

    if (func_alpha.eval({x: min}) <= 0) {
        low = min;
        high = max;
    } else {
        low = max;
        high = min;
    }

    middle = (min + max) / 2;
    while (middle != low && middle != high) {
        if (func_alpha.eval({x: middle}) <= 0) {
            low = middle;
        } else {
            high = middle;
        }
        middle = low + (high - low) / 2;
    }
    return middle;
}


(function () {


    let methods = new Methods();

    /*
    let abs = methods.apsoluteAndReleventError('0.025e6', '0.026e6');

    let a = methods.calculateApproximation(5 / 11);
    let b = methods.calculateApproximation(2 / 3);
    let c = Number.parseFloat(a) + Number.parseFloat(b);
    let d = '111.222222222e12';

    console.log(abs);
    console.log(methods.format(d));
    console.log(methods.multiply(Math.PI, 22 / 7, 5));
    console.log(methods.sum(Math.PI, 22 / 7, 5));
    console.log(methods.divide(Math.PI, 22 / 7, 5));
    console.log(methods.subtract(Math.PI, 22 / 7, 5));

*/
    function byteNumberToDecimal(byte) {
        let byteNumber = byte;
        let sign = Number.parseInt(byteNumber[0]);
        let numA = byteNumber.slice(1, 12);
        let numB = byteNumber.slice(12);
        let c = 0;
        let fPrime = 0;
        for (let i = 0; i < numA.length; i++) {

            if (Number.parseInt(numA[i]) !== 0) {

                c += Number.parseInt(numA[i]) * Math.pow(2, numA.length - i - 1);
            }
        }

        if (sign === 0) {
            c -= 1023;
        } else {
            c -= 1024;
        }

        for (let i = 0; i < numB.length; i++) {
            if (Number.parseInt(numB[i]) !== 0) {

                fPrime += Number.parseInt(numB[i]) * Math.pow(1 / 2, i + 1);
            }

        }

        let finalNum = Math.pow(-1, sign) * Math.pow(2, c) * (1 + fPrime);

        console.log("Final result - " + finalNum);
    }


})();

