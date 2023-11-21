/**
 *      - in: query
 *        name: search
 *        type: string
 *        description: Search by keyword
 *      - in: query
 *        name: page
 *        type: string
 *        description: Specify page number
 *      - in: query
 *        name: limit
 *        type: string
 *        description: Limit the number of rows returned from a query
 */

exports.query = async (req, res, next) => {
    const { search, page, limit } = req.query;

    req.search = search;

    req.pagination = {
        page: page && parseInt(page) > 1 ? parseInt(page) : 1,
        limit: limit && parseInt(limit) ? parseInt(limit) : 10,
        skip:
            ((page && parseInt(page) > 1 ? parseInt(page) : 1) - 1) *
            (limit && parseInt(limit) ? parseInt(limit) : 10)
    };

    next();
};