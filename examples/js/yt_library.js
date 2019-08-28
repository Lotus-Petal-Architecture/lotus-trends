// we are watching all three of these events, if any occur we re-determine the size
// and scroll the window back to the top

$(window).bind('orientationchange', function (event) {
        window.scrollTo(0,1);
});

// LIBRARY FUNCTIONS

function removeDuplicates(arr) {

    const result = [];
    const duplicatesIndices = [];

    // Loop through each item in the original array
    arr.forEach((current, index) => {

        if (duplicatesIndices.includes(index)) return;

        result.push(current);

        // Loop through each other item on array after the current one
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {

            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);

            // Check number of keys in objects
            if (currentKeys.length !== comparisonKeys.length) continue;

            // Check key names
            const currentKeysString = currentKeys.sort().join("").toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;


            // Check values
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if ( current[key] !== comparison[key] ) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);

        } // end for loop

    }); // end arr.forEach()

    return result;
}

       Number.range = function() {
                var start, end, step;
                var array = [];

                switch(arguments.length){
                        case 0:
                                throw new Error('range() expected at least 1 argument, got 0 - must be specified as [start,] stop[, step]');
                                return array;
                        case 1:
                                start = 0;
                                end = Math.floor(arguments[0]) - 1;
                                step = 1;
                                break;
                        case 2:
                        case 3:
                        default:
                                start = Math.floor(arguments[0]);
                                end = Math.floor(arguments[1]) - 1;
                                var s = arguments[2];
                                if (typeof s === 'undefined'){
                                        s = 1;
                                }
                        step = Math.floor(s) || (function(){ throw new Error('range() step argument must not be zero'); })();
                        break;
                }


                if (step > 0){
                        for (var i = start; i <= end; i += step){
                                array.push(i);
                        }
                } else if (step < 0) {
                        step = -step;
                        if (start > end){
                                for (var i = start; i > end + 1; i -= step){
                                        array.push(i);
                                }
                        }
                }
                return array;
        }

        function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                }
                return array;
        }
        function GetUrlValue(VarSearch){
                var SearchString = window.location.search.substring(1);
                var VariableArray = SearchString.split('&');
                for(var i = 0; i < VariableArray.length; i++){
                        var KeyValuePair = VariableArray[i].split('=');
                        if(KeyValuePair[0] == VarSearch){
                                return KeyValuePair[1];
                        }
                }
        }


