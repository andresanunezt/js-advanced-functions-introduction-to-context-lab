// Your code here


function createEmployeeRecord(informationArray) {
   const emRecord =  {
    firstName: informationArray[0],
    familyName: informationArray[1],
    title: informationArray[2],
    payPerHour: informationArray[3],
    timeInEvents: [], 
    timeOutEvents: []
   }
   return emRecord
};

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord)
};

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}


function hoursWorkedOnDate(emRecordObj, dateYMD){
    const timeIn = emRecordObj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = emRecordObj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(emRecordObj, dateYMD){

    const wage = emRecordObj.payPerHour; 
    const hoursWorked = hoursWorkedOnDate(emRecordObj, dateYMD);
    return wage * hoursWorked;
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

function findEmployeeByFirstName(sourceArray, firstName){
    return sourceArray.find((employee) => employee.firstName === firstName)
}