import jwt from 'jsonwebtoken';

const auth = async(req,res,next) => {//next means do something then move to the next thing
    try {
        const token = req.headers.authorization.split(' ')[1];//getting the token from the req
        
        const isCustomAuth = token.length < 500; //differentiates our token from the google auth token < 500 means our token
    
        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');//decode the token from res.creditionals from front end using JWT
            console.log(decodedData);
            req.userId = decodedData?.id;
        } else { //if this is the googles token
            console.log(token);
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //sub to make sure we different googles accounts from each other
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;