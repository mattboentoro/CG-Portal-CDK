async function deleteMinistry(db, information) {
    const result = await db.collection("Ministries")
        .updateOne(
            {"name" :  information.name},
            {$pull: {
                'ministries': information.item,
            }},
        );

    return {
        statusCode: 200,
        body: JSON.stringify(result), // ensure the response body is a string
    };

}
    
module.exports = { deleteMinistry };