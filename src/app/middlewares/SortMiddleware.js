module.exports = function _SortMiddleware(req, res, next) {
    //biến _sort sẽ dc chuyển qua view
    res.locals._sort = {
        enabled: false,
        type: 'default'
    }
    if (req.query.hasOwnProperty('_sort')) {
        res.locals._sort.enabled = true;
        res.locals._sort.type = req.query.type;
        res.locals._sort.column = req.query.column;

        //bằng vs cấu trúc trên
        // Object.assign(res.locals._sort, {
        //     enabled: true,
        //     type: req.query.type,
        //     column: req.query.column
        // });
    }

    next();
};