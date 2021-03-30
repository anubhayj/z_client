const moment = require('moment')

function data_generator(base, email, name) {
    let data = []
    let user_data = {}
    user_data["name"] = name
    user_data["email"] = email
    for (let i = 1; i < 91; i++) {
        let mocked_data = {}
        let dateObj = moment(base).subtract(i, 'days')
        mocked_data["date"] = dateObj.format("YYYY-MM-DD")
        mocked_data["day"] = dateObj.format('dddd')
        mocked_data["meetings"] = Math.floor((Math.random() * 10) + 1);
        mocked_data["participants"] = Math.floor((Math.random() * 50) + 1);
        mocked_data["meeting_minutes"] = Math.floor((Math.random() * 250) + 1);
        data.push(mocked_data)
    }
    user_data["details"] = data
    return user_data
}

module.exports = function generate_random() {
    let base = moment(new Date())
    let data = []
    for (let i = 0; i < 100; i++) {
        data[i] = data_generator(base, `test${i}@test.com`, `test${i}`)
    }
    console.log("data ::::", data)
    return data
}