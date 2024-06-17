async function assignInterest(db, information) {
    // assume the result is there already
    /*
        information = 

        {
            date: <epoch>,
            ministry: <string>,
            changes: [
                {
                    name: <string>,
                    assigned: 0 | 1,
                    index: <int>
                },
            ]
        }
    */

    let changes = {};

    for (let i = 0; i < information.changes.length; i++) {
        changes[`interest-serving.${information.ministry}.${information.changes[i].index}.assigned`] = information.changes[i].assigned;
    }

    const result = await db.collection("Volunteers")
        .updateOne(
            {
                "date" :  information.date,
                "name": information.name
            },
            {$set: changes},
        );

    return {
        statusCode: 200,
        body: JSON.stringify(result), // ensure the response body is a string
    };

    

}
    
module.exports = { assignInterest };