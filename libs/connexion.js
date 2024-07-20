



/**
 * Description
 * @param {any} req
 * @param {any} jwt
 * @returns {any}
 */

module.decodeTokenAuthorization = (req,jwt)=>{
    const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token,"RANDOM_TOKEN_SECRET")
        req.auth = {
            id:decodedToken.idUser
        }
}


