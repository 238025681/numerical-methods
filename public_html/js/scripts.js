"use strict";

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

/*
 function calculate(number, rounder) {
 //x^5-2*x^4-x-3
 //x^2/4-sin(x)
 //2.216223158843886
 
 console.log(number);
 console.log(rounder);
 // console.dir(math.eval('x^3-x^2+8x+12',{x:-5}))
 //console.dir(math.eval('x^3-x^2+8x+12',{x:5}))
 
 
 
 }
 */
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
    return bisectionMethod(0, 1, func_alpha);
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

function displayResult(result) {
    let container = document.getElementById("result");
    let node = document.createElement('p');
    let text = document.createTextNode(result);
    node.appendChild(text);
    container.appendChild(node);
}


(function () {


    let methods = new Methods();

    /*
     
     let a = methods.calculateApproximation(5 / 11);
     let b = methods.calculateApproximation(2 / 3);
     let c = Number.parseFloat(a) + Number.parseFloat(b);
     let d = '111.222222222e12';
     
     console.log(methods.format(d));
     console.log(methods.multiply(Math.PI, 22 / 7, 5));
     console.log(methods.divide(Math.PI, 22 / 7, 5));
     console.log(methods.subtract(Math.PI, 22 / 7, 5));
     
     */
//============================================================================================//
    
     //СТРАНИЦА 14 задача 2.5
     let abs = methods.apsoluteAndReleventError(math.factorial(9), Math.sqrt(18 * Math.PI) * Math.pow(9 / Math.E, 9));
     displayResult("СТРАНИЦА 14, зад 2.5:");
     displayResult("alphaP: " + abs.alphaP);
     displayResult("betaP: " + abs.betaP);
     displayResult("=======================================================================");
     
     //СТРАНИЦА 14 задача 3.1
     displayResult("СТРАНИЦА 14, зад 3.1:");
     displayResult(methods.sum(methods.divide(3, 25, 4), methods.divide(1, 6, 4), 4));
     displayResult("=======================================================================");
     console.log(methods.sum(methods.divide(3, 25, 4), methods.divide(1, 6, 4), 4));
     
     //СТРАНИЦА 26 задача 1
     let parseInput = math.parse('x^9-x^7+2x^2-1');
     let code = parseInput.compile();
     displayResult("СТРАНИЦА 26, зад 1: x^9-x^7+2x^2-1");
     displayResult("Разполовяване: ");
     displayResult(bisectionWrapper(parseInput));
     console.log("Разполовяване: " + bisectionWrapper(parseInput));
     displayResult("=======================================================================");
     
    displayResult("СТРАНИЦА 48, зад 6: 2x+3cos(x)-e^x=0");
    displayResult("Метода на хордите: ");
    hordi(1, 2, 10, 'e^x+2^-x+2*cos(x)-6');
    displayResult("=======================================================================");
    displayResult(interpolationLagranj());


})();





function interpolationLagranj() {
    let x = [-0.4, 0.6, 1.6, 2.6, 3.6, 4.6, 5.6, 6.6];
    let y = [-0.1508, 0.0582, 1,1817, 2.0095, 2.6144, 3.08465, 3.4676, 3.79];
    let fX = 2.53;
    let result = ((y[0] / ((x[0] - x[1]) * (x[0] - x[2]) * (x[0] - x[3]))) * ((fX - x[1]) * (fX - x[2]) * (fX - x[3]))) +
            ((y[1] / ((x[1] - x[0]) * (x[1] - x[2]) * (x[1] - x[3]))) * ((fX - x[0]) * (fX - x[2]) * (fX - x[3]))) +
            ((y[2] / ((x[2] - x[0]) * (x[2] - x[1]) * (x[2] - x[3]))) * ((fX - x[0]) * (fX - x[1]) * (fX - x[3]))) +
            ((y[3] / ((x[3] - x[0]) * (x[3] - x[1]) * (x[3] - x[2]))) * ((fX - x[0]) * (fX - x[1]) * (fX - x[2])));
    console.log(result);
    return result;
}



function inputFunction(formula, n) {
    return math.eval(formula, {x: n});
}

//Метод на Хордите//


function hordi(p1, c, n, formula) {
    let method = new Methods();
    let i = 2;
    let f1 = inputFunction(formula, p1);
    let fC = inputFunction(formula, c);
    let result = false;
    while (i <= n) {
        let p = c - fC * (p1 - c) / (f1 - fC);
        if (method.calculateApproximation(p - p1, 6) <= 0) {
            displayResult(method.calculateApproximation(p, 7));
            displayResult("Pn = " + (i + 1));
            result = true;
        }
        i++;
        p1 = p;
        f1 = inputFunction(formula, p);
    }

    if (!result) {

        displayResult("No solution found!")
    }


}
;

/*
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
 */