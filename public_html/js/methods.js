"use strict";
const regex = /([\d]*[^\W\D\S.]*[\d]+)/g;
const testForZero = /^[.]*[\d]*$/g;

const regexExpo = /^(\d+)(?:\.*)(\d*)([e+-\\d]*)$/g;

const Methods = (function () {

    function Methods() {
    }

    Methods.prototype.sum = function (x, y, rounder) {
        let numbers = parseNumber(x, y, rounder);
        return this.calculateApproximation(numbers.x + numbers.y, rounder);
    };

    Methods.prototype.subtract = function (x, y, rounder) {
        let numbers = parseNumber(x, y, rounder);
        return this.calculateApproximation(numbers.x - numbers.y, rounder);
    };

    Methods.prototype.multiply = function (x, y, rounder) {
        let numbers = parseNumber(x, y, rounder);
        return this.calculateApproximation(numbers.x * numbers.y, rounder);
    };

    Methods.prototype.divide = function (x, y, rounder) {
        let numbers = parseNumber(x, y, rounder);
        return this.calculateApproximation(numbers.x / numbers.y, rounder);
    };

    Methods.prototype.format = function (number) {

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


    Methods.prototype.calculateApproximation = function (num, rounder = num.toString().length - 1) {


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

    Methods.prototype.apsoluteAndReleventError = function (number, prime) {

        let pPrime, pNumber, alphaP, betaP;
        pPrime = prime === undefined ? +new Methods().calculateApproximation(number) : prime;
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
            alphaP: new Methods().format(alphaP),
            betaP: new Methods().format(betaP)
        };
    };

    function parseNumber(x, y, rounder) {
        let method = new Methods();
        return {
            x: Number.parseFloat(method.calculateApproximation(x, rounder)),
            y: Number.parseFloat(method.calculateApproximation(y, rounder))
        };
    }

    return Methods;
})();