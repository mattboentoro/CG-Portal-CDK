const { changePassword } = require('./functions/ChangePassword');
const { connectToDatabase } = require('./mongodb/mongoDbClient');
const CryptoJS = require('node-cryptojs-aes').CryptoJS;

exports.main = async (event) => {
    try {

        // decrypt first
        var decrypted = CryptoJS.AES.decrypt(event.body, "CareGroup!!");
    
        let userInformation = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
        
        const db = await connectToDatabase();
        const res = await changePassword(db, userInformation);
        return res;
      
    } catch (error) {
        console.error(error);
      
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }), // ensure the response body is a string
        };
    }
  
  };