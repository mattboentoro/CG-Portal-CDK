async function addInterest(db, information) {
    // check if the roomId is free
    let interestServing = {};
    interestServing[`interest-serving.${information.ministry}`] = {
        name: information.name,
        details: information.details,
        assigned: 0
    }

    const result = await db.collection("Volunteers")
        .updateOne(
            {
                "date" :  information.date,
                "name" : information['cg-name']
            },
            {
                $push: interestServing,
                $setOnInsert: {
                    "status": "ACTIVE",
                    "announcement": {
                        "text": "",
                        "location": "",
                        "topic": "",
                        "speaker": ""
                    },
                }
            },
            {upsert: true}
        );

    return {
        statusCode: 200,
        body: JSON.stringify(result), // ensure the response body is a string
    };

}
    
module.exports = { addInterest };