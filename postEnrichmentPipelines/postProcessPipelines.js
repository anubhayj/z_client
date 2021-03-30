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
    ],
    datewiseReport: [
        {
            '$unwind': '$details'
        }, {
            '$project': {
                'name': '$name',
                'email': '$email',
                'date': '$details.date',
                'day': '$details.day',
                'meetings': '$details.meetings',
                'participants': '$details.participants',
                'meeting_minutes': '$details.meeting_minutes'
            }
        }, {
            '$group': {
                '_id': {
                    'date': '$date'
                },
                'meetings': {
                    '$avg': '$meetings'
                },
                'total_meetings': {
                    '$sum': '$meetings'
                },
                'avg_participants': {
                    '$avg': '$participants'
                },
                'meet_minuts': {
                    '$avg': '$meeting_minutes'
                }
            }
        }, {
            '$project': {
                '_id': 0,
                'date': '$_id.date',
                'meetings': '$meetings',
                'total_meetings': '$total_meetings',
                'avg_participants': '$avg_participants',
                'meet_minuts': '$meet_minuts'
            }
        },
        { '$sort': { "date": -1 } }
    ],
    teamWiseReport: [
        {
            '$unwind': '$details'
        }, {
            '$project': {
                '_id': 0,
                'date': '$details.date',
                'day': '$details.day',
                'team': '$details.team',
                'meetings': '$details.meetings',
                'participants': '$details.participants',
                'meeting_minutes': '$details.meeting_minutes'
            }
        }, {
            '$group': {
                '_id': {
                    'team': '$team'
                },
                'total_meetings': {
                    '$sum': '$meetings'
                },
                'avg_meetings': {
                    '$avg': '$meetings'
                },
                'participants': {
                    '$avg': '$participants'
                }
            }
        }, {
            '$project': {
                '_id': 0,
                'team': '$_id.team',
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
                }
            }
        }
    ],
    teamAndOtherDimension: [
        {
            '$unwind': '$details'
        }, {
            '$project': {
                '_id': 0,
                'date': '$details.date',
                'name': '$name',
                'day': '$details.day',
                'team': '$details.team',
                'meetings': '$details.meetings',
                'participants': '$details.participants',
                'meeting_minutes': '$details.meeting_minutes'
            }
        }, {
            '$group': {
                '_id': {
                    'team': '$team',
                    'date': '$date'
                },
                'total_meetings': {
                    '$sum': '$meetings'
                },
                'participants': {
                    '$avg': '$participants'
                }
            }
        }, {
            '$project': {
                '_id': 0,
                'team': '$_id.team',
                'date': '$_id.date',
                'name': '$_id.user',
                'total_meetings': {
                    '$sum': '$total_meetings'
                },
                'participants': {
                    '$round': [
                        '$participants', 0
                    ]
                }
            }
        }
    ]
}