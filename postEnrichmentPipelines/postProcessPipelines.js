module.exports = {
    dailyUsagePipeline: [
        {
            '$facet': {
                'meet_minutes': [
                    {
                        '$group': {
                            '_id': {
                                'day': '$day'
                            },
                            'meetings': {
                                '$avg': '$meeting_minutes'
                            }
                        }
                    }, {
                        '$project': {
                            'day': '$_id.day',
                            'meeting_minutes': {
                                '$round': [
                                    '$meetings', 0
                                ]
                            },
                            '_id': 0
                        }
                    }
                ],
                'avg_meeting': [
                    {
                        '$group': {
                            '_id': null,
                            'meetings': {
                                '$avg': '$meetings'
                            }
                        }
                    }, {
                        '$project': {
                            'meetings': {
                                '$round': [
                                    '$meetings', 0
                                ]
                            },
                            '_id': 0
                        }
                    }
                ],
                'no_of_meetings': [
                    {
                        '$group': {
                            '_id': {
                                'day': '$day'
                            },
                            'meetings': {
                                '$avg': '$meetings'
                            }
                        }
                    }, {
                        '$project': {
                            'day': '$_id.day',
                            'meeting_minutes': {
                                '$round': [
                                    '$meetings', 0
                                ]
                            },
                            '_id': 0
                        }
                    }
                ]
            }
        }
    ],
    userWiseReport: [
        {
            '$unwind': '$details'
        }, {
            '$group': {
                '_id': {
                    'name': '$name'
                },
                'total_meetings': {
                    '$sum': '$details.meetings'
                },
                'avg_meetings': {
                    '$avg': '$details.meetings'
                },
                'participants': {
                    '$avg': '$details.participants'
                }
            }
        }, {
            '$project': {
                'name': '$_id.name',
                'total_meetings': '$total_meetings',
                'avg_meetings': {
                    '$round': [
                        '$avg_meetings', 0
                    ]
                },
                'participants': {
                    '$round': [
                        '$participants', 0
                    ]
                },
                '_id': 0
            }
        }
    ]
}