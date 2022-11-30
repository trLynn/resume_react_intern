/**
 * Check Number Between Two Value
 *
 * @param number, check value1, check value2
 * @reutrn True (valid) | False (not valid)
 */
export const validateEmail = (email) => {
    var re = /^(([^<>()[\]{}\\.,;:\s@$%#!*&*"^_]+(\.[^<>()[\]{}\\.,;:\s@$%#&!*"^_]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Check null or blank
 *
 * @param num
 * @reutrn True (has value) | False (null or blank)
 */
export function checkNullOrBlank(value) {
    if (value == '' || value == null) {
        return false;
    }
    return true;
}

/**
  * Test empty or not
  *
  * @param value
  * @reutrn boolean
  * @author 
  * @date 2021-02-10
  */
 export const isEmpty = (val) =>{
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

 /**
  * Validate Integer Only
  *
  * @param num
  * @reutrn True (valid) | False (not valid)
  */
  export const validateIntegerOnly = (num)=>{
    var re = /^(\s*|\d+)$/;
    return re.test(num);
}