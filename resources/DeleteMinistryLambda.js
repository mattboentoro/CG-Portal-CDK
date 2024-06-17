const { deleteMinistry } = require('./functions/DeleteMinistry');
const { connectToDatabase } = require('./mongodb/mongoDbClient');

exports.main = async (event) => {
    try {
    
        let itemsToBeDeleted = JSON.parse(event.body);
        const db = await connectToDatabase();
        const res = await deleteMinistry(db, itemsToBeDeleted);     
        return res;
        
    } catch (error) {
        console.error(error);
      
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }), // ensure the response body is a string
        };
    }
  
  };