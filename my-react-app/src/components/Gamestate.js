export const initialGameState = {
    "game_id": "test",

    "owner": "dsch",

    "factions": [
        {
            "faction_id": "1",
            "name": "My Kingdom",
            "controlled_by": "dsch"
        },
        {
            "faction_id": "2",
            "name": "My Kingdom 2",
            "controlled_by": "dsch"
        }
    ],

    "cities": [
        {
            "isCapital": true,
            "coords": [60, 70],
            "faction_id": "1",
            "city_id": "c1"
        },
        {
            "isCapital": false,
            "coords": [80, 60],
            "faction_id": "2",
            "city_id": "c2"
        }
    ],

    "continents": [
        {
            "outline": [
                [10, 20], 
                [30, 80],
                [50, 60],
                [40, 40]
            ]
        },
        {
            "outline": [
                [50, 50], 
                [63, 110],
                [80, 30]
            ]
        }
    ],

    "territory": [
        {
        "faction_id": "1",
        "outline": [
            [10, 20], 
            [3, 4],
            [50, 60]
        ],
        "territory_id": "t1"
        },
        {
        "faction_id": "2",
        "outline": [
            [15, 16], 
            [39, 61],
            [11, 21]
        ],
        "territory_id": "t2"
    }
],

    "ports": [
        {
            "coords": [30, 40],
            "faction_id": "1",
            "port_id": "p1"
        }
    ],

    "ships": [
        {
            "coords": [1, 2],
            "faction_id": "1",
            "number": 50,
            "fleet_id": "s1"
        }
    ],

    "armies": [
        {
            "coords": [20, 17],
            "faction_id": "1",
            "number": 50,
            "army_id": "a1"
        }
    ]
    
}