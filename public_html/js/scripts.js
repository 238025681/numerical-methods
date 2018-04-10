/**
 * @file
 * Provides some feature.
 *
 * The extra line between the end of the @file docblock
 * and the file-closure is important.
 */
(function () {
    "use strict";
//==============================================Start Working library==================================================//

    const regex = /([\d]*[^\W\D\S.]*[\d]+)/g;
    const testForZero = /^[.]*[\d]*$/g;
    const regexExpo = /^(\d+)(?:\.*)(\d*)([e+-\\d]*)$/g;

    const MyMethods = (function () {

        function MyMethods() {
        }
        MyMethods.prototype.sum = function (x, y, rounder) {
            let numbers = parseNumber(x, y, rounder);
            return this.calculateApproximation(numbers.x + numbers.y, rounder);
        };

        MyMethods.prototype.subtract = function (x, y, rounder) {
            let numbers = parseNumber(x, y, rounder);
            return this.calculateApproximation(numbers.x - numbers.y, rounder);
        };

        MyMethods.prototype.multiply = function (x, y, rounder) {
            let numbers = parseNumber(x, y, rounder);
            return this.calculateApproximation(numbers.x * numbers.y, rounder);
        };

        MyMethods.prototype.divide = function (x, y, rounder) {
            let numbers = parseNumber(x, y, rounder);
            return this.calculateApproximation(numbers.x / numbers.y, rounder);
        };

        MyMethods.prototype.format = function (number) {

            if (("" + number)[0] === '0') {

                return number + "";
            }

            let regX = new RegExp(regexExpo);
            let result = number + "";

            if (number[0] !== 0) {

                let index = 1; // default to the first capturing group
                let matches = [];

                let match = regX.exec(result);
                let isResult = regX.test(result);
                if (!isResult) {
                    while (index < match.length) {

                        matches.push(match[index]);
                        index++;
                    }

                }

                let exponent;

                if (matches.length === 3 && new RegExp('e').test(matches[2])) {
                    exponent = Number.parseInt(matches[0].length) + Number.parseInt(matches[2].slice(1, matches[2].length));

                } else {
                    exponent = Number.parseInt(matches[0].length);

                }


                result = Number.parseFloat("0." + matches[0] + matches[1]) + "e" + exponent;
            }

            return result;
        };


        MyMethods.prototype.calculateApproximation = function (num, rounder = num.toString().length - 1) {


            let finalNumber;
            let pattern = new RegExp(testForZero);
            let number = num + "";

            if (number.length !== 0) {


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
        };

        MyMethods.prototype.apsoluteAndReleventError = function (number, prime) {

            let pPrime, pNumber, alphaP, betaP;
            pPrime = prime === undefined ? +new MyMethods().calculateApproximation(number) : prime;
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

            console.log("P BETA = " + pPrime);
            console.log("P ALPHA = " + pNumber);
            return {
                alphaP: new MyMethods().format(alphaP),
                betaP: new MyMethods().format(betaP)
            };
        };

        function parseNumber(x, y, rounder) {
            let method = new MyMethods();
            return {
                x: Number.parseFloat(method.calculateApproximation(x, rounder)),
                y: Number.parseFloat(method.calculateApproximation(y, rounder))
            };
        }

        return MyMethods;
    })();

    String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    };


//==============================================End Working library==================================================//


    let methods = new MyMethods();
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

    /*
        function calculateApproximation(num, rounder = num.toString().length - 1) {


            let finalNumber;
            let pattern = new RegExp(testForZero);
            let number = num.toString();

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
        } */

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


