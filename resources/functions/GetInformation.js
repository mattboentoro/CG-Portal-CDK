async function getInformation(db, date, name) {
    // check if the roomId is free
    let servingInformation = db.collection("Volunteers")
        .findOne({ 
            "date": date,
            "name": name
        });
    let ministryInformation = db.collection("Ministries")
        .findOne({ "name": name });
        
    const data = Promise.all([servingInformation, ministryInformation]);
    
    try {
        const values = await data;
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
    
module.exports = { getInformation };