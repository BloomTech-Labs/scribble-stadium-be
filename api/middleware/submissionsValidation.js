const validateUpdateAllTasksParams = async ( req, res, next ) => {
    const { hasRead, hasDrawn, hasWritten } = req.body;
    if (!hasRead || !hasDrawn || !hasWritten) {
        console.log('nope!');
        res.status(400).json({ error: 'Missing hasRead, hasDrawn, or hasWritten value(s)' })
    }
    
    return;
};

module.exports = {
    validateUpdateAllTasksParams,
}
