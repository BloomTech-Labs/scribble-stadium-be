
/**
 * This middleware is designed to be called during the '/submit/update-all/:id' PUT request.
 * The function validates that hasRead, hasDrawn, and hasWritten all exist and are strictly of type boolean
 * By testing if typeof === 'boolean' we are able to reject undefined, null, string, etc, validating the variable's existence AND type.
 * 
 */
const validateUpdateAllTasksParams = async ( req, res, next ) => {
    const { hasRead, hasDrawn, hasWritten } = req.body;
    
    if ( typeof hasRead !== 'boolean' || typeof hasDrawn !== 'boolean' || typeof hasWritten !== 'boolean') {
        return res.status(400).json({ error: "Required inputs hasRead, hasDrawn, and hasWritten must be of boolean type" });
    };
    return next();
};

module.exports = {
    validateUpdateAllTasksParams,
}
