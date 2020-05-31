const characterData = [
  {
    id: 1,
    name: "Mario",
    value: "mario",
    number: "01",
    completed: true,
    series: "super-mario"
  },
  {
    id: 2,
    name: "Donkey Kong",
    value: "donkey-kong",
    number: "02",
    completed: true,
    series: "donkey-kong"
  },
  {
    id: 3,
    name: "Link",
    value: "link",
    number: "03",
    completed: true,
    series: "legend-of-zelda"
  },
  {
    id: 4,
    name: "Samus",
    value: "samus",
    number: "04",
    completed: true,
    series: "metroid"
  },
  {
    id: 5,
    name: "Dark Samus",
    value: "dark-samus",
    number: "04e",
    completed: true,
    series: "metroid"
  },
  {
    id: 6,
    name: "Yoshi",
    value: "yoshi",
    number: "05",
    completed: true,
    series: "yoshi"
  },
  {
    id: 7,
    name: "Kirby",
    value: "kirby",
    number: "06",
    completed: true,
    series: "kirby"
  },
  {
    id: 8,
    name: "Fox",
    value: "fox",
    number: "07",
    completed: true,
    series: "star-fox"
  },
  {
    id: 9,
    name: "Pikachu",
    value: "pikachu",
    number: "08",
    completed: true,
    series: "pokemon"
  },
  {
    id: 10,
    name: "Luigi",
    value: "luigi",
    number: "09",
    completed: true,
    series: "super-mario"
  },
  {
    id: 11,
    name: "Ness",
    value: "ness",
    number: "10",
    completed: true,
    series: "earthbound"
  },
  {
    id: 12,
    name: "Captain Falcon",
    value: "captain-falcon",
    number: "11",
    completed: true,
    series: "f-zero"
  },
  {
    id: 13,
    name: "Jigglypuff",
    value: "jigglypuff",
    number: "12",
    completed: true,
    series: "pokemon"
  },
  {
    id: 14,
    name: "Peach",
    value: "peach",
    number: "13",
    completed: true,
    series: "super-mario"
  },
  {
    id: 15,
    name: "Daisy",
    value: "daisy",
    number: "13e",
    completed: true,
    series: "super-mario"
  },
  {
    id: 16,
    name: "Bowser",
    value: "bowser",
    number: "14",
    completed: true,
    series: "super-mario"
  },
  {
    id: 17,
    name: "Ice Climbers",
    value: "ice-climbers",
    number: "15",
    completed: false,
    series: "ice-climber"
  },
  {
    id: 18,
    name: "Sheik",
    value: "sheik",
    number: "16",
    completed: false,
    series: "legend-of-zelda"
  },
  {
    id: 19,
    name: "Zelda",
    value: "zelda",
    number: "17",
    completed: false,
    series: "legend-of-zelda"
  },
  {
    id: 20,
    name: "Dr. Mario",
    value: "dr-mario",
    number: "18",
    completed: false,
    series: "super-mario"
  },
  {
    id: 21,
    name: "Pichu",
    value: "pichu",
    number: "19",
    completed: false,
    series: "pokemon"
  },
  {
    id: 22,
    name: "Falco",
    value: "falco",
    number: "20",
    completed: false,
    series: "star-fox"
  },
  {
    id: 23,
    name: "Marth",
    value: "marth",
    number: "21",
    completed: false,
    series: "fire-emblem"
  },
  {
    id: 24,
    name: "Lucina",
    value: "lucina",
    number: "21ε",
    completed: false,
    series: "fire-emblem"
  },
  {
    id: 25,
    name: "Young Link",
    value: "young-link",
    number: "22",
    completed: false,
    series: "legend-of-zelda"
  },
  {
    id: 26,
    name: "Ganondorf",
    value: "ganondorf",
    number: "23",
    completed: false,
    series: "legend-of-zelda"
  },
  {
    id: 27,
    name: "Mewtwo",
    value: "mewtwo",
    number: "24",
    completed: false,
    series: "pokemon"
  },
  {
    id: 28,
    name: "Roy",
    value: "roy",
    number: "25",
    completed: false,
    series: "fire-emblem"
  },
  {
    id: 29,
    name: "Chrom",
    value: "chrom",
    number: "25ε",
    completed: false,
    series: "fire-emblem"
  },
  {
    id: 30,
    name: "Mr. Game & Watch",
    value: "mr-game-watch",
    number: "26",
    completed: false,
    series: "game-watch"
  },
  {
    id: 31,
    name: "Meta Knight",
    value: "meta-knight",
    number: "27",
    completed: false,
    series: "kirby"
  },
  {
    id: 32,
    name: "Pit",
    value: "pit",
    number: "28",
    completed: false,
    series: "kid-icarus"
  },
  {
    id: 33,
    name: "Dark Pit",
    value: "dark-pit",
    number: "28ε",
    completed: false,
    series: "kid-icarus"
  },
  {
    id: 34,
    name: "Zero Suit Samus",
    value: "zero-suit-samus",
    number: "29",
    completed: false,
    series: "metroid"
  },
  {
    id: 35,
    name: "Wario",
    value: "wario",
    number: "30",
    completed: false,
    series: "wario"
  },
  {
    id: 36,
    name: "Snake",
    value: "snake",
    number: "31",
    completed: false,
    series: "metal-gear"
  },
  {
    id: 37,
    name: "Ike",
    value: "ike",
    number: "32",
    completed: false,
    series: "fire-emblem"
  },
  {
    id: 38,
    name: "Squirtle",
    value: "squirtle",
    number: "33",
    completed: false,
    series: "pokemon"
  },
  {
    id: 39,
    name: "Ivysaur",
    value: "ivysaur",
    number: "34",
    completed: false,
    series: "pokemon"
  },
  {
    id: 40,
    name: "Charizard",
    value: "charizard",
    number: "35",
    completed: false,
    series: "pokemon"
  },
  {
    id: 41,
    name: "Diddy Kong",
    value: "diddy-kong",
    number: "36",
    completed: false,
    series: "donkey-kong"
  },
  {
    id: 42,
    name: "Lucas",
    value: "lucas",
    number: "37",
    completed: false,
    series: "earthbound"
  },
  {
    id: 43,
    name: "Sonic",
    value: "sonic",
    number: "38",
    completed: false,
    series: "sonic"
  },
  {
    id: 44,
    name: "King Dedede",
    value: "king-dedede",
    number: "39",
    completed: false,
    series: "kirby"
  },
  {
    id: 45,
    name: "Olimar",
    value: "olimar",
    number: "40",
    completed: false,
    series: "pikmin"
  },
  {
    id: 46,
    name: "Lucario",
    value: "lucario",
    number: "41",
    completed: false,
    series: "pokemon"
  },
  {
    id: 47,
    name: "R.O.B.",
    value: "rob",
    number: "42",
    completed: false,
    series: "rob"
  },
  {
    id: 48,
    name: "Toon Link",
    value: "toon-link",
    number: "43",
    completed: false,
    series: "legend-of-zelda"
  },
  {
    id: 49,
    name: "Wolf",
    value: "wolf",
    number: "44",
    completed: false,
    series: "star-fox"
  },
  {
    id: 50,
    name: "Villager",
    value: "villager",
    number: "45",
    completed: false,
    series: "animal-crossing"
  },
  {
    id: 51,
    name: "Mega Man",
    value: "mega-man",
    number: "46",
    completed: false,
    series: "mega-man"
  },
  {
    id: 52,
    name: "Wii Fit Trainer",
    value: "wii-fit-trainer",
    number: "47",
    completed: false,
    series: "wii-fit"
  },
  {
    id: 53,
    name: "Rosalina & Luma",
    value: "rosalina-luma",
    number: "48",
    completed: false,
    series: "super-mario"
  },
  {
    id: 54,
    name: "Little Mac",
    value: "little-mac",
    number: "49",
    completed: false,
    series: "punch-out"
  },
  {
    id: 55,
    name: "Greninja",
    value: "greninja",
    number: "50",
    completed: false,
    series: "pokemon"
  },
  {
    id: 56,
    name: "Mii Brawler",
    value: "mii-brawler",
    number: "51",
    completed: false,
    series: "smash-bros"
  },
  {
    id: 57,
    name: "Mii Swordfighter",
    value: "mii-swordfighter",
    number: "52",
    completed: false,
    series: "smash-bros"
  },
  {
    id: 58,
    name: "Mii Gunner",
    value: "mii-gunner",
    number: "53",
    completed: false,
    series: "smash-bros"
  },
  {
    id: 59,
    name: "Palutena",
    value: "palutena",
    number: "54",
    completed: false,
    series: "kid-icarus"
  },
  {
    id: 60,
    name: "Pac-Man",
    value: "pac-man",
    number: "55",
    completed: false,
    series: "pac-man"
  },
  {
    id: 61,
    name: "Robin",
    value: "robin",
    number: "56",
    completed: false,
    series: "fire-emblem"
  },
  {
    id: 62,
    name: "Shulk",
    value: "shulk",
    number: "57",
    completed: false,
    series: "xenoblade"
  },
  {
    id: 63,
    name: "Bowser Jr.",
    value: "bowser-jr",
    number: "58",
    completed: false,
    series: "super-mario"
  },
  {
    id: 64,
    name: "Duck Hunt",
    value: "duck-hunt",
    number: "59",
    completed: false,
    series: "duck-hunt"
  },
  {
    id: 65,
    name: "Ryu",
    value: "ryu",
    number: "60",
    completed: false,
    series: "street-fighter"
  },
  {
    id: 66,
    name: "Ken",
    value: "ken",
    number: "60ε",
    completed: false,
    series: "street-fighter"
  },
  {
    id: 67,
    name: "Cloud",
    value: "cloud",
    number: "61",
    completed: false,
    series: "final-fantasy"
  },
  {
    id: 68,
    name: "Corrin",
    value: "corrin",
    number: "62",
    completed: false,
    series: "fire-emblem"
  },
  {
    id: 69,
    name: "Bayonetta",
    value: "bayonetta",
    number: "63",
    completed: false,
    series: "bayonetta"
  },
  {
    id: 70,
    name: "Inkling",
    value: "inkling",
    number: "64",
    completed: false,
    series: "splatoon"
  },
  {
    id: 71,
    name: "Ridley",
    value: "ridley",
    number: "65",
    completed: false,
    series: "metroid"
  },
  {
    id: 72,
    name: "Simon",
    value: "simon",
    number: "66",
    completed: false,
    series: "castlevania"
  },
  {
    id: 73,
    name: "Richter",
    value: "richter",
    number: "66ε",
    completed: false,
    series: "castlevania"
  },
  {
    id: 74,
    name: "King K. Rool",
    value: "king-k-rool",
    number: "67",
    completed: false,
    series: "donkey-kong"
  },
  {
    id: 75,
    name: "Isabelle",
    value: "isabelle",
    number: "68",
    completed: false,
    series: "animal-crossing"
  },
  {
    id: 76,
    name: "Incineroar",
    value: "incineroar",
    number: "69",
    completed: false,
    series: "pokemon"
  },
  {
    id: 77,
    name: "Piranha Plant",
    value: "piranha-plant",
    number: "70",
    completed: false,
    series: "super-mario"
  },
  {
    id: 78,
    name: "Joker",
    value: "joker",
    number: "71",
    completed: false,
    series: "persona"
  },
  {
    id: 79,
    name: "Hero",
    value: "hero",
    number: "72",
    completed: false,
    series: "dragon-quest"
  },
  {
    id: 80,
    name: "Banjo & Kazooie",
    value: "banjo-kazooie",
    number: "73",
    completed: false,
    series: "banjo-kazooie"
  },
  {
    id: 81,
    name: "Terry",
    value: "terry",
    number: "74",
    completed: false,
    series: "fatal-fury"
  },
  {
    id: 82,
    name: "Byleth",
    value: "byleth",
    number: "75",
    completed: false,
    series: "fire-emblem"
  },
]

export default characterData