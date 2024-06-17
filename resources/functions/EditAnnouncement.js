async function editAnnouncement(db, information) {
    const result = await db.collection("Volunteers")
        .updateOne(
            {
                "date" :  information.date,
                "name" : information.name
            },
            {
                $set: {
                    "announcement": information.announcement
                },
                $setOnInsert: {
                    "status": "ACTIVE",
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
    
module.exports = { editAnnouncement };