const characterData = [
  {
    id: 0,
    name: "Select Character",
    completed: true
  },
  {
    id: 1,
    name: "Mario",
    value: "mario",
    number: "01",
    completed: true
  },
  {
    id: 2,
    name: "Donkey Kong",
    value: "donkey-kong",
    number: "02",
    completed: true
  },
  {
    id: 3,
    name: "Link",
    value: "link",
    number: "03",
    completed: false
  },
  {
    id: 4,
    name: "Samus",
    value: "samus",
    number: "04",
    completed: false
  },
  {
    id: 5,
    name: "Dark Samus",
    value: "dark-samus",
    number: "04e",
    completed: false
  },
  {
    id: 6,
    name: "Yoshi",
    value: "yoshi",
    number: "05",
    completed: false
  },
  {
    id: 7,
    name: "Kirby",
    value: "kirby",
    number: "06",
    completed: false
  },
  {
    id: 8,
    name: "Fox",
    value: "fox",
    number: "07",
    completed: false
  },
  {
    id: 9,
    name: "Pikachu",
    value: "pikachu",
    number: "08",
    completed: false
  },
  {
    id: 10,
    name: "Luigi",
    value: "luigi",
    number: "09",
    completed: false
  },
  {
    id: 11,
    name: "Ness",
    value: "ness",
    number: "10",
    completed: false
  },
  {
    id: 12,
    name: "Captain Falcon",
    value: "captain-falcon",
    number: "11",
    completed: false
  },
  {
    id: 13,
    name: "Jigglypuff",
    value: "jigglypuff",
    number: "12",
    completed: false
  },
  {
    id: 14,
    name: "Peach",
    value: "peach",
    number: "13",
    completed: false
  },
  {
    id: 15,
    name: "Daisy",
    value: "daisy",
    number: "13ε",
    completed: false
  },
  {
    id: 16,
    name: "Bowser",
    value: "bowser",
    number: "14",
    completed: false
  },
  {
    id: 17,
    name: "Ice Climbers",
    value: "ice-climbers",
    number: "15",
    completed: false
  },
  {
    id: 18,
    name: "Sheik",
    value: "sheik",
    number: "16",
    completed: false
  },
  {
    id: 19,
    name: "Zelda",
    value: "zelda",
    number: "17",
    completed: false
  },
  {
    id: 20,
    name: "Dr. Mario",
    value: "dr-mario",
    number: "18",
    completed: false
  },
  {
    id: 21,
    name: "Pichu",
    value: "pichu",
    number: "19",
    completed: false
  },
  {
    id: 22,
    name: "Falco",
    value: "falco",
    number: "20",
    completed: false
  },
  {
    id: 23,
    name: "Marth",
    value: "marth",
    number: "21",
    completed: false
  },
  {
    id: 24,
    name: "Lucina",
    value: "lucina",
    number: "21ε",
    completed: false
  },
  {
    id: 25,
    name: "Young Link",
    value: "young-link",
    number: "22",
    completed: false
  },
  {
    id: 26,
    name: "Ganondorf",
    value: "ganondorf",
    number: "23",
    completed: false
  },
  {
    id: 27,
    name: "Mewtwo",
    value: "mewtwo",
    number: "24",
    completed: false
  },
  {
    id: 28,
    name: "Roy",
    value: "roy",
    number: "25",
    completed: false
  },
  {
    id: 29,
    name: "Chrom",
    value: "chrom",
    number: "25ε",
    completed: false
  },
  {
    id: 30,
    name: "Mr. Game & Watch",
    value: "mr-game-watch",
    number: "26",
    completed: false
  },
  {
    id: 31,
    name: "Meta Knight",
    value: "meta-knight",
    number: "27",
    completed: false
  },
  {
    id: 32,
    name: "Pit",
    value: "pit",
    number: "28",
    completed: false
  },
  {
    id: 33,
    name: "Dark Pit",
    value: "dark-pit",
    number: "28ε",
    completed: false
  },
  {
    id: 34,
    name: "Zero Suit Samus",
    value: "zero-suit-samus",
    number: "29",
    completed: false
  },
  {
    id: 35,
    name: "Wario",
    value: "wario",
    number: "30",
    completed: false
  },
  {
    id: 36,
    name: "Snake",
    value: "snake",
    number: "31",
    completed: false
  },
  {
    id: 37,
    name: "Ike",
    value: "ike",
    number: "32",
    completed: false
  },
  {
    id: 38,
    name: "Squirtle",
    value: "squirtle",
    number: "33",
    completed: false
  },
  {
    id: 39,
    name: "Ivysaur",
    value: "ivysaur",
    number: "34",
    completed: false
  },
  {
    id: 40,
    name: "Charizard",
    value: "charizard",
    number: "35",
    completed: false
  },
  {
    id: 40,
    name: "Diddy Kong",
    value: "diddy-kong",
    number: "36",
    completed: false
  },
  {
    id: 41,
    name: "Lucas",
    value: "lucas",
    number: "37",
    completed: false
  },
  {
    id: 42,
    name: "Sonic",
    value: "sonic",
    number: "38",
    completed: false
  },
  {
    id: 43,
    name: "King Dedede",
    value: "king-dedede",
    number: "39",
    completed: false
  },
  {
    id: 44,
    name: "Olimar",
    value: "olimar",
    number: "40",
    completed: false
  },
  {
    id: 45,
    name: "Lucario",
    value: "lucario",
    number: "41",
    completed: false
  },
  {
    id: 46,
    name: "R.O.B.",
    value: "rob",
    number: "42",
    completed: false
  },
  {
    id: 47,
    name: "Toon Link",
    value: "toon-link",
    number: "43",
    completed: false
  },
  {
    id: 48,
    name: "Wolf",
    value: "wolf",
    number: "44",
    completed: false
  },
  {
    id: 49,
    name: "Villager",
    value: "villager",
    number: "45",
    completed: false
  },
  {
    id: 50,
    name: "Mega Man",
    value: "mega-man",
    number: "46",
    completed: false
  },
  {
    id: 51,
    name: "Wii Fit Trainer",
    value: "wii-fit-trainer",
    number: "47",
    completed: false
  },
  {
    id: 52,
    name: "Rosalina & Luma",
    value: "rosalina-luma",
    number: "48",
    completed: false
  },
  {
    id: 53,
    name: "Little Mac",
    value: "little-mac",
    number: "49",
    completed: false
  },
  {
    id: 54,
    name: "Greninja",
    value: "greninja",
    number: "50",
    completed: false
  },
  {
    id: 55,
    name: "Mii Brawler",
    value: "mii-brawler",
    number: "51",
    completed: false
  },
  {
    id: 56,
    name: "Mii Swordfighter",
    value: "mii-swordfighter",
    number: "52",
    completed: false
  },
  {
    id: 57,
    name: "Mii Gunner",
    value: "mii-gunner",
    number: "53",
    completed: false
  },
  {
    id: 58,
    name: "Palutena",
    value: "palutena",
    number: "54",
    completed: false
  },
  {
    id: 59,
    name: "Pac-Man",
    value: "pac-man",
    number: "55",
    completed: false
  },
  {
    id: 59,
    name: "Pac-Man",
    value: "pac-man",
    number: "55",
    completed: false
  },
  {
    id: 60,
    name: "Robin",
    value: "robin",
    number: "56",
    completed: false
  },
  {
    id: 61,
    name: "Shulk",
    value: "shulk",
    number: "57",
    completed: false
  },
  {
    id: 62,
    name: "Bowser Jr.",
    value: "bowser-jr",
    number: "58",
    completed: false
  },
  {
    id: 63,
    name: "Duck Hunt",
    value: "duck-hunt",
    number: "59",
    completed: false
  },
  {
    id: 64,
    name: "Ryu",
    value: "ryu",
    number: "60",
    completed: false
  },
  {
    id: 65,
    name: "Ken",
    value: "ken",
    number: "60ε",
    completed: false
  },
  {
    id: 66,
    name: "Cloud",
    value: "cloud",
    number: "61",
    completed: false
  },
  {
    id: 67,
    name: "Corrin",
    value: "corrin",
    number: "62",
    completed: false
  },
  {
    id: 68,
    name: "Bayonetta",
    value: "bayonetta",
    number: "63",
    completed: false
  },
  {
    id: 70,
    name: "Bayonetta",
    value: "bayonetta",
    number: "63",
    completed: false
  },
  {
    id: 71,
    name: "Inkling",
    value: "inkling",
    number: "64",
    completed: false
  },
  {
    id: 72,
    name: "Ridley",
    value: "ridley",
    number: "65",
    completed: false
  },
  {
    id: 73,
    name: "Simon",
    value: "simon",
    number: "66",
    completed: false
  },
  {
    id: 74,
    name: "Richter",
    value: "richter",
    number: "66ε",
    completed: false
  },
  {
    id: 75,
    name: "King K. Rool",
    value: "king-k-rool",
    number: "67",
    completed: false
  },
  {
    id: 76,
    name: "Isabelle",
    value: "isabelle",
    number: "68",
    completed: false
  },
  {
    id: 77,
    name: "Incineroar",
    value: "incineroar",
    number: "69",
    completed: false
  },
  {
    id: 78,
    name: "Piranha Plant",
    value: "piranha-plant",
    number: "70",
    completed: false
  },
  {
    id: 79,
    name: "Joker",
    value: "joker",
    number: "71",
    completed: false
  },
  {
    id: 80,
    name: "Hero",
    value: "hero",
    number: "72",
    completed: false
  },
  {
    id: 81,
    name: "Banjo & Kazooie",
    value: "banjo-kazooie",
    number: "73",
    completed: false
  },
  {
    id: 82,
    name: "Terry",
    value: "terry",
    number: "74",
    completed: false
  },
  {
    id: 82,
    name: "Byleth",
    value: "byleth",
    number: "75",
    completed: false
  },
]

export default characterData