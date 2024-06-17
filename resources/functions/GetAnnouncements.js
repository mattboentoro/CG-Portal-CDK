const { DateTime } = require("luxon");

const zone = "America/Los_Angeles";

function getNextDayOfWeek(date, dayOfWeek) {
    var currentDate = new Date(date);

    var resultDate = new Date(currentDate.getTime());

    resultDate.setUTCDate(currentDate.getUTCDate() + (7 + dayOfWeek - currentDate.getUTCDay()) % 7);

    let dateTime = DateTime.fromObject({
        day: resultDate.getUTCDate(),
        month: resultDate.getUTCMonth() + 1,
        year: resultDate.getUTCFullYear(),
        hour: 19,
        minute: 0
      }, {zone: zone});

    return new Date(dateTime.valueOf());
}

function getPreviousDayOfWeek(date, dayOfWeek) {
    var currentDate = new Date(date);

    var resultDate = new Date(currentDate.getTime());

    resultDate.setUTCDate(currentDate.getUTCDate() - (7 - dayOfWeek + currentDate.getUTCDay()) % 7);

    let dateTime = DateTime.fromObject({
        day: resultDate.getUTCDate(),
        month: resultDate.getUTCMonth() + 1,
        year: resultDate.getUTCFullYear(),
        hour: 19,
        minute: 0
      }, {zone: zone});

    return new Date(dateTime.valueOf());
}

function getNextTenDates() {
    let arrayDate = [];
    let nextDay = Date.now();

    for (let i = 0; i < 10; i++) {
        nextDay = getNextDayOfWeek(nextDay, 5);
        arrayDate.push(nextDay.valueOf());
        let newDate = new Date(nextDay);
        newDate.setUTCDate(newDate.getUTCDate() + 2);
        nextDay = newDate.valueOf();
    }

    return arrayDate;
}

function getNextTenDatesAndPrevTwoDates() {
    let arrayDate = [];
    let nextDay = Date.now();

    for (let i = 0; i < 3; i++) {
        nextDay = getPreviousDayOfWeek(nextDay, 5);
        arrayDate.push(nextDay.valueOf());
        let newDate = new Date(nextDay);
        newDate.setUTCDate(newDate.getUTCDate() - 2);
        nextDay = newDate.valueOf();
    }

    nextDay = Date.now();

    for (let i = 0; i < 10; i++) {
        nextDay = getNextDayOfWeek(nextDay, 5);
        if (nextDay.valueOf() !== arrayDate[0]) {
            arrayDate.push(nextDay.valueOf());
        }
        let newDate = new Date(nextDay);
        newDate.setUTCDate(newDate.getUTCDate() + 2);
        nextDay = newDate.valueOf();
    }

    arrayDate.sort();

    return arrayDate;
}



async function getAnnouncement(db, name, date, withPrevious) {
    let dates;

    if (withPrevious) {
        dates = getNextTenDatesAndPrevTwoDates(date);
        console.log("WITH PREVIOUS");

    } else {
        dates = getNextTenDates(date);
    }

    console.log(dates);

    // check if the roomId is free
    const aggCursor = db.collection("Volunteers").find(
        {
            "name": name,
            "date": {$in: dates}
        })
    const servingInformation = aggCursor.toArray();
    
    let ministryInformation = db.collection("Ministries")
        .findOne({ "name": name });
        
    const data = Promise.all([servingInformation, ministryInformation]);

    try {
        const values = await data;
        aggCursor.close();

        values[0].sort((a, b) => a.date - b.date);

        return {
            statusCode: 200,
            body: JSON.stringify({
                'serving-info': values[0], 
                'ministry-info': values[1]
            })
        }
    } catch (error) {
        console.log(error); // rejectReason of any first rejected promise
    }

}
    
module.exports = { getAnnouncement };