export const initialGameState = {
    "game_id": "test",

    "owner": "dsch",

    "factions": [
        {
            "faction_id": "1",
            "name": "My Kingdom",
            "controlled_by": "dsch"
        }
    ],

    "cities": [
        {
            "isCapital": true,
            "coords": [6, 7],
            "faction": "1",
            "city_id": "c1"
        }
    ],

    "continents": [
        {
            "outline": [
                [1, 2], 
                [3, 4],
                [5, 6]
            ]
        }
    ],

    "territory": [{
        "faction_id": "1",
        "outline": [
            [1, 2], 
            [3, 4],
            [5, 6]
        ],
        "territory_id": "t1"
    }],

    "ports": [
        {
            "coords": [6, 7],
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
            "coords": [6, 7],
            "faction_id": "1",
            "number": 50,
            "army_id": "a1"
        }
    ]
    
}