async function changePassword(db, information) {
    const result = await db.collection("Password")
        .findOne(
			{
				username : information.username,
				password: information.oldPassword
			});
	
		if (result) {
			// can change password
			const result = await db.collection("Password")
            .updateOne(
                {"username" :  information.username},
                {$set: {
                    'password': information.newPassword
                }}
            );
			return {
				statusCode: 200,
				body: "CHANGED"
			};
			
		} else {
			// cannot change password
			return {
				statusCode: 400,
                body: "NOT ALLOWED", // ensure the response body is a string
			}
		}
    }
    
module.exports = { changePassword };