export const initialGameState = {
    "game_id": "test",

    "owner": "dsch",

    "is_game_over": false,

    "provinces": [
        {
            "province_id": "1",
            "faction_id": "1",
            "border": [[.10, .20],
                       [.30, .80],
                       [.50, .60], 
                       [.40, .40]],
            "centroid": [.32, .50],
            "name": "p1",
            "city": false,
            "army": {
                "faction_id": "1",
                "numbers": 100
                    },
            "port": false,
            "fort": true,
            "neighbors": []

        },
        {
            "province_id": "2",
            "faction_id": "2",
            "border": [[.40, .60],
                       [.70, .80],
                       [.80, .60], 
                       [.40, .40]],
            "centroid": [.10, .10],
            "name": "p2",
            "city": false,
            "army": {
                "faction_id": "2",
                "numbers": 50
                    },
            "port": true,
            "fort": false,
            "neighbors": []

        }
    ],

    "continents": [
        {
            "outline": [
                [0, 1], 
                [0, 0],
                [.5, 0],
                [.5, .5]
            ]
        },
        {
            "outline": [
                [.50, .50], 
                [.63, .110],
                [.80, .30]
            ]
        }
    ],

    "factions": [
        {
            "faction_id": "1",
            "name": "Red",
            "is_avaliable": true,
            "is_defended": false,
            "turn_ended": false,
        }
    ]
    
}