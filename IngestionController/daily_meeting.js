const moment = require('moment')

function data_generator(x, base) {
    let mocked_data = {}
    let dateObj = moment(base).subtract(x, 'days')
    mocked_data["_id"] = dateObj.format("YYYY-MM-DD")
    mocked_data["day"] = dateObj.format('dddd')
    mocked_data["new_users"] = Math.floor((Math.random() * 10) + 1);
    mocked_data["meetings"] = Math.floor((Math.random() * 50) + 1);
    mocked_data["participants"] = Math.floor((Math.random() * 50) + 1);
    mocked_data["meeting_minutes"] = Math.floor((Math.random() * 200) + 1);
    return mocked_data
}

module.exports = function generate_random(days) {
    let base = moment(new Date())
    let data = []
    for (let i = 0; i < days; i++) {
        data[i] = data_generator(i + 1, base)
    }
    return data
}
