async function toggleStatus(db, information) {
    const result = await db.collection("Volunteers")
        .updateOne(
            {
                "date" :  information.date,
                "name" : information.name
            },
            {
                $set: {
                    "status": information.status
                },
                $setOnInsert: {
                    "announcement": {
                        "text": "",
                        "location": "",
                        "topic": "",
                        "speaker": ""
                    },
                    "interest-serving": {}
                }
            },
            {upsert: true}
        );

    return {
        statusCode: 200,
        body: JSON.stringify(result), // ensure the response body is a string
    };

}
    
module.exports = { toggleStatus };