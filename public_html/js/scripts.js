/**
 * @file
 * Provides some feature.
 *
 * The extra line between the end of the @file docblock
 * and the file-closure is important.
 */






(function ($) {
    "use strict";

    String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    };

    var regex = /([\d]*[^\W\D\S\.]*[\d]+)/g;
    var testForZero = /^[\.]*[\d]*$/g;

    let byte = "11000000001110111001000100000000000000000000000000000000000000000";
    let arr = "2,71828182845904";

    byteNumberToDecimal(byte);
    apsoluteAndReleventError(Math.PI);



    /**
     * This method roundet decimal number by requested rounder.
     *
     * type@ {Decimal}
     * 
     * @param {String} 
     *   num is input number.
     * @param {int} 
     *   rounder is requested rounder.
     * @return {Decimal}
     *   Return rooundet decimal value.
     */
    function calculateApproximation(num, rounder =  num.toString().length - 1) {



        let finalNumber;
        let pattern = new RegExp(testForZero);
        let  number = num.toString();

        if (number.trim().length !== 0) {


            if (pattern.test(number)) {

                number = 0 + number;
            }

            let regArray = number.match(regex);

            let n = regArray[0].length;
            let k = rounder;
            let sumator = 5 * Math.pow(10, (n - k - 1));

            finalNumber = (Number.parseFloat(regArray[0] + "." + regArray[1]) + sumator).toString();
            if (Number.parseInt(finalNumber[k + 1]) <= 5) {

                finalNumber = finalNumber.replaceAt(k, finalNumber[k + 1]);
                finalNumber = finalNumber.slice(0, k + 1);
            } else {
                finalNumber = finalNumber.slice(0, k + 1);
            }

        }

        return finalNumber;
    }
    /**
     * This method convert byte number to decimal.
     *
     * type@ {Decimal}
     * 
     * @param {String} 
     *   byte is input byte number.
     * @return {Decimal}
     *   Return decimal value.
     */

    function byteNumberToDecimal(byte) {
        let byteNumber = byte;
        let sign = Number.parseInt(byteNumber[0]);
        let numA = byteNumber.slice(1, 12);
        let numB = byteNumber.slice(12);
        let c = 0;
        let fPrime = 0;
        for (var i = 0; i < numA.length; i++) {

            if (Number.parseInt(numA[i]) !== 0) {

                c += Number.parseInt(numA[i]) * Math.pow(2, numA.length - i - 1);
            }
        }

        if (sign === 0) {
            c -= 1023;
        } else {
            c -= 1024;
        }

        for (var i = 0; i < numB.length; i++) {
            if (Number.parseInt(numB[i]) !== 0) {

                fPrime += Number.parseInt(numB[i]) * Math.pow(1 / 2, i + 1);
            }

        }

        let finalNum = Math.pow(-1, sign) * Math.pow(2, c) * (1 + fPrime);

        console.log("Final result - " + finalNum);
    }


    function apsoluteAndReleventError(number, prime = calculateApproximation(22/7)) {

        let pPrime, pNumber, alphaP, betaP;

        pPrime = +prime;
        pNumber = Number.parseFloat(number);
        alphaP = Math.abs(pNumber - pPrime);
        betaP = alphaP / Math.abs(pNumber);
        let accuracy, count = 0;

        while (true) {
            accuracy = 5 * Math.pow(10, -(count + 1));
            if (betaP >= accuracy) {
                break;
            }
            count++;
        }

        console.log("number = " + pNumber);
        console.log("prime = " + pPrime);
        console.log("P BET = " + betaP);
        console.log("P COU = " + alphaP);
    }


})();
