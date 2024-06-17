async function signin(db, information) {
    const result = await db.collection("Password")
        .findOne(
			{
				username : information.username,
				password: information.password
			});
	
		if (result) {
			return result.name;
			
		} else {
			return false;
		}
    }
    
module.exports = { signin };