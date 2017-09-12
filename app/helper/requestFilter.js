exports.checkRequireSongBody = function (req, res) {
    if (req.body === undefined || req.body.name === undefined || req.body.name === '') {
        res.json({
            success: false,
            err: "body or song name not allow null or empty ",
            data: null
        });
        return false;
    }
    return true;
};
exports.checkRequireSongParams = function (req, res) {
    if (!req.params || !req.params.song_id || req.params.song_id === '') {
        res.json({
            success: false,
            err: "ID song name not allow null or empty ",
            data: null
        });
        return false;
    }
    return true;
};
exports.checkRequireUserBody = function (req, res) {
    if (req.body === undefined || req.body.userName === undefined || req.body.userName === '' || req.body.passWord === undefined || req.body.passWord === '') {
        res.json({
            success: false,
            err: "user name and password not allow null or empty ",
            data: null
        });
        return false;
    }
    return true;
};