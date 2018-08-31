const getBannerList = require('../mock/getBannerList')

const Data = {
    getBannerList(req, res, next) {
        res.json(getBannerList)
    }
}

module.exports = Data

