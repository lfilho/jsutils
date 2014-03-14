function Encode(){
    var unsafeString = "\"<>%\\^[]`\+\$\,",
    hexVals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F" ];

    Encode.prototype.code = function (val){
        var len     = val.length;
        var i       = 0;

        var newStr  = "";
        var original = val;

        for (i=0;i<len;i++) {
            // hack to eliminate the rest of unicode from this
            if (val.substring(i,i+1).charCodeAt(0) < 255) {
                if (isUnsafe(val.substring(i,i+1)) === false){
                    newStr = newStr + val.substring(i,i+1);
                } else {
                    newStr = newStr + convert(val.substring(i,i+1));
                }
            } else {

                console.log("Found a non-ISO-8859-1 character at position: " + (i+1) +
                ",\nPlease eliminate before continuing.");
                newStr = original;
                i=len; // short-circuit the loop and exit
            }
        }
        return newStr;
    };

    /**
     * This function checks if a char is URL unsafe.
     * Returns bool result. True = unsafe, False = safe
     */
    var isUnsafe = function (compareChar) {
        var comp =  (unsafeString.indexOf(compareChar) === -1 &&
                    compareChar.charCodeAt(0) > 32 &&
                    compareChar.charCodeAt(0) < 123);

        return !comp;
    };

    /**
     * This converts a given char to url hex form
     */
    var convert = function(val) {
        return  "%" + decToHex(val.charCodeAt(0), 16);
    };

    /**
     * Part of the hex-ifying this functionality
     */
    var decToHex = function(num, radix) {
        var hexString = "";
        while (num >= radix) {
            temp = num % radix;
            num = Math.floor(num / radix);
            hexString += hexVals[temp];
        }
        hexString += hexVals[num];
        return reversal(hexString);
    };

    /**
     * Part of the hex-ifying this functionality
     */
    var reversal = function(s){
        var len = s.length;
        var trans = "";
        for (i=0; i<len; i++) {
            trans = trans + s.substring(len-i-1, len-i);
        }
    return trans;
    };
}

// if you are using it in NodeJS
module.exports = Encode;
//Use in a controller
	// Encode = require('./encode');
	// enc = new Encode();
    // string = enc.code("Açaí");
//Out: A%E7a%ED

