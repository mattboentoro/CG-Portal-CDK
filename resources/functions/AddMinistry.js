async function addMinistry(db, information) {
    const result = await db.collection("Ministries")
        .updateOne(
            {"name" :  information.name},
            {$push: {
                'ministries': information.item,
            }},
            {upsert: true}
        );

    return {
        statusCode: 200,
        body: JSON.stringify(result), // ensure the response body is a string
    };

}
    
module.exports = { addMinistry };