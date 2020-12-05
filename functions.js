 /**
  * sort array of objects objectArray
  * @param {array} objectArray = array of object to be sorted
  * @param {string} columnName = name of object property used for sorting
  * @param {string} sortOrder = 'ASC' or 'DESC'
  * @returns {undefined}
  */
 function sortObjectArray(objectArray, columnName, sortOrder) {     
     objectArray.sort((a, b) => {
        var x = a[columnName];
        var y = b[columnName];
        if (isNaN(x)) {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }        
        var result;
        if (x < y) {
            result = -1;
        }
        else if (x > y) {
            result = 1;
        }
        else {
            result = 0;
        }
        
        if (sortOrder === 'DESC') {
            result = -result;
        }
        return result;
    });
 }
 
module.exports = {sortObjectArray};