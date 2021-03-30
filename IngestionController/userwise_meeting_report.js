const moment = require('moment')

function data_generator(base, email, name, team, days) {
    let data = []
    let user_data = {}
    user_data["name"] = name
    user_data["email"] = email
    for (let i = 1; i < days + 1; i++) {
        let mocked_data = {}
        let dateObj = moment(base).subtract(i, 'days')
        mocked_data["date"] = dateObj.format("YYYY-MM-DD")
        mocked_data["team"] = team
        mocked_data["day"] = dateObj.format('dddd')
        mocked_data["meetings"] = getMeetMinsByTeam(team)
        mocked_data["participants"] = Math.floor((Math.random() * 50) + 1);
        mocked_data["meeting_minutes"] = Math.floor((Math.random() * 250) + 1);
        data.push(mocked_data)
    }
    user_data["details"] = data
    return user_data
}

function getMeetMinsByTeam(team) {
    let rand;
    if (team === "Engineering") {
        rand = Math.floor((Math.random() * 5) + 1);
    } else if (team === "Support" || team === "Delivery") {
        rand = Math.floor((Math.random() * 7) + 1);
    } else {
        rand = Math.floor((Math.random() * 10) + 1);
    }

    return rand
}
module.exports = function generate_random(days) {
    let base = moment(new Date())
    let data = []
    let team = ["Recruitment", "Marketing", "Engineering", "Delivery", "Support", "HumanResources"]
    for (let i = 0; i < 100; i++) {
        data[i] = data_generator(base, `test${i}@test.com`, `test${i}`, team[Math.floor((Math.random() * 4) + 1)], days)
    }
    return data
}