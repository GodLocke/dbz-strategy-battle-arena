
// Character data for Dragon Ball Z Strategy Arena

interface Ability {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'physical' | 'energy' | 'defense' | 'special';
  kiCost: number;
  cooldown: number;
  currentCooldown: number;
  damage?: number;
  healing?: number;
  effects?: string[];
}

export interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  type: 'Melee' | 'Energy' | 'Defense' | 'Support';
  unlocked: boolean;
  stats: {
    health: number;
    ki: number;
    attack: number;
    defense: number;
    speed: number;
  };
  abilities: Ability[];
}

export const characterData: Character[] = [
  {
    id: 'goku',
    name: 'Goku',
    image: 'https://static.wikia.nocookie.net/dragonball/images/5/5b/Goku_DB_Ep_153_002v2.png',
    description: 'The main protagonist of Dragon Ball, known for his incredible strength and pure heart.',
    rarity: 'legendary',
    type: 'Energy',
    unlocked: true,
    stats: {
      health: 100,
      ki: 100,
      attack: 85,
      defense: 75,
      speed: 80
    },
    abilities: [
      {
        id: 'kamehameha',
        name: 'Kamehameha',
        description: 'A powerful beam of energy that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/7/70/KamehamehaGokuVsCell.png',
        type: 'energy',
        kiCost: 30,
        cooldown: 3,
        currentCooldown: 0,
        damage: 35
      },
      {
        id: 'spirit-bomb',
        name: 'Spirit Bomb',
        description: 'Gathers energy from all living things to create a devastating attack that hits all enemies.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/1/10/GokuSpiritBombKidBuu.png',
        type: 'energy',
        kiCost: 70,
        cooldown: 5,
        currentCooldown: 0,
        damage: 50
      },
      {
        id: 'dragon-fist',
        name: 'Dragon Fist',
        description: 'A powerful physical attack that deals massive damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/c/c9/GokuDragonFist.png',
        type: 'physical',
        kiCost: 40,
        cooldown: 4,
        currentCooldown: 0,
        damage: 45
      },
      {
        id: 'kaio-ken',
        name: 'Kaio-ken',
        description: 'Multiplies Goku\'s strength for 2 turns, increasing attack and speed.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/2/25/KaiokenGoku01.png',
        type: 'special',
        kiCost: 20,
        cooldown: 4,
        currentCooldown: 0,
        effects: ['BUFF_ATK_30', 'BUFF_SPD_20']
      }
    ]
  },
  {
    id: 'vegeta',
    name: 'Vegeta',
    image: 'https://static.wikia.nocookie.net/dragonball/images/6/69/Vegeta.png',
    description: 'The Prince of all Saiyans, a proud warrior with incredible power.',
    rarity: 'legendary',
    type: 'Melee',
    unlocked: true,
    stats: {
      health: 95,
      ki: 95,
      attack: 90,
      defense: 80,
      speed: 75
    },
    abilities: [
      {
        id: 'galick-gun',
        name: 'Galick Gun',
        description: 'A powerful energy blast that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/1/1a/GalickGun.png',
        type: 'energy',
        kiCost: 25,
        cooldown: 2,
        currentCooldown: 0,
        damage: 30
      },
      {
        id: 'final-flash',
        name: 'Final Flash',
        description: 'A devastating beam attack that deals massive damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/d/dd/Final_Flash_-_Vegeta.png',
        type: 'energy',
        kiCost: 60,
        cooldown: 4,
        currentCooldown: 0,
        damage: 55
      },
      {
        id: 'big-bang-attack',
        name: 'Big Bang Attack',
        description: 'A concentrated energy sphere that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/c/c8/BigBangAttackVegetaAndroid19.png',
        type: 'energy',
        kiCost: 35,
        cooldown: 3,
        currentCooldown: 0,
        damage: 40
      },
      {
        id: 'saiyan-pride',
        name: 'Saiyan Pride',
        description: 'Vegeta\'s pride boosts his attack power for 2 turns.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/e/e2/VegetaSaiyaFromPlanetVegeta.png',
        type: 'special',
        kiCost: 15,
        cooldown: 3,
        currentCooldown: 0,
        effects: ['BUFF_ATK_40']
      }
    ]
  },
  {
    id: 'piccolo',
    name: 'Piccolo',
    image: 'https://static.wikia.nocookie.net/dragonball/images/e/e1/PiccoloVsAndroid17..png',
    description: 'A wise Namekian warrior with regenerative abilities and strategic mind.',
    rarity: 'epic',
    type: 'Defense',
    unlocked: true,
    stats: {
      health: 90,
      ki: 85,
      attack: 70,
      defense: 90,
      speed: 70
    },
    abilities: [
      {
        id: 'special-beam-cannon',
        name: 'Special Beam Cannon',
        description: 'A focused beam attack that pierces through defenses and deals high damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/e/e3/SpecialBeamCannonPiccolovsFrieza.png',
        type: 'energy',
        kiCost: 40,
        cooldown: 3,
        currentCooldown: 0,
        damage: 45
      },
      {
        id: 'hellzone-grenade',
        name: 'Hellzone Grenade',
        description: 'Multiple energy spheres that hit all enemies for moderate damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/5/50/HellzoneGrenade.png',
        type: 'energy',
        kiCost: 50,
        cooldown: 4,
        currentCooldown: 0,
        damage: 25
      },
      {
        id: 'regeneration',
        name: 'Regeneration',
        description: 'Piccolo regenerates his body, healing a portion of his health.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/5/57/PiccoloNamek.png',
        type: 'defense',
        kiCost: 30,
        cooldown: 3,
        currentCooldown: 0,
        healing: 25
      },
      {
        id: 'stretching-arms',
        name: 'Stretching Arms',
        description: 'Extends arms to grab and damage a distant opponent.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/f/fc/PiccoloVsCell.png',
        type: 'physical',
        kiCost: 20,
        cooldown: 2,
        currentCooldown: 0,
        damage: 20,
        effects: ['STUN_1']
      }
    ]
  },
  {
    id: 'gohan',
    name: 'Gohan',
    image: 'https://static.wikia.nocookie.net/dragonball/images/7/70/Son_gohan_teen2.png',
    description: 'Goku\'s son with incredible hidden potential that can be unleashed in battle.',
    rarity: 'epic',
    type: 'Energy',
    unlocked: true,
    stats: {
      health: 85,
      ki: 90,
      attack: 80,
      defense: 75,
      speed: 75
    },
    abilities: [
      {
        id: 'masenko',
        name: 'Masenko',
        description: 'An energy attack learned from Piccolo that deals moderate damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/c/c8/Gohan-masenkoB.png',
        type: 'energy',
        kiCost: 20,
        cooldown: 2,
        currentCooldown: 0,
        damage: 25
      },
      {
        id: 'kamehameha',
        name: 'Kamehameha',
        description: 'A powerful beam of energy that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/7/70/KamehamehaGokuVsCell.png',
        type: 'energy',
        kiCost: 30,
        cooldown: 3,
        currentCooldown: 0,
        damage: 35
      },
      {
        id: 'potential-unleashed',
        name: 'Potential Unleashed',
        description: 'Gohan unleashes his hidden potential, boosting all stats for 3 turns.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/b/b3/UltimateGohanvsSupeBuu.png',
        type: 'special',
        kiCost: 50,
        cooldown: 5,
        currentCooldown: 0,
        effects: ['BUFF_ATK_25', 'BUFF_DEF_25', 'BUFF_SPD_25']
      },
      {
        id: 'father-son-kamehameha',
        name: 'Father-Son Kamehameha',
        description: 'A powerful team attack that deals massive damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/1/18/Father-Son_Kamehameha.png',
        type: 'energy',
        kiCost: 70,
        cooldown: 5,
        currentCooldown: 0,
        damage: 60
      }
    ]
  },
  {
    id: 'trunks',
    name: 'Future Trunks',
    image: 'https://static.wikia.nocookie.net/dragonball/images/c/c6/Future_Trunks_Sword.png',
    description: 'A warrior from the future who specializes in sword techniques and energy attacks.',
    rarity: 'epic',
    type: 'Melee',
    unlocked: true,
    stats: {
      health: 85,
      ki: 80,
      attack: 85,
      defense: 70,
      speed: 90
    },
    abilities: [
      {
        id: 'burning-attack',
        name: 'Burning Attack',
        description: 'A concentrated energy blast that deals moderate damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/9/9a/Future_Trunks_Burning_Attack.png',
        type: 'energy',
        kiCost: 25,
        cooldown: 2,
        currentCooldown: 0,
        damage: 30
      },
      {
        id: 'shining-sword-attack',
        name: 'Shining Sword Attack',
        description: 'A rapid sword combo that deals high physical damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/c/c2/Trunks_slices_freeza.jpg',
        type: 'physical',
        kiCost: 35,
        cooldown: 3,
        currentCooldown: 0,
        damage: 40
      },
      {
        id: 'heat-dome-attack',
        name: 'Heat Dome Attack',
        description: 'A powerful energy dome that deals high damage to all enemies.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/d/d4/FutureTrunksHeatDomeAttack.png',
        type: 'energy',
        kiCost: 50,
        cooldown: 4,
        currentCooldown: 0,
        damage: 30
      },
      {
        id: 'finish-buster',
        name: 'Finish Buster',
        description: 'A powerful energy sphere that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/5/59/TrunksFinishBusterGTGoku.png',
        type: 'energy',
        kiCost: 40,
        cooldown: 3,
        currentCooldown: 0,
        damage: 45
      }
    ]
  },
  {
    id: 'frieza',
    name: 'Frieza',
    image: 'https://static.wikia.nocookie.net/dragonball/images/8/83/Frieza_Final_Form.png',
    description: 'A galactic tyrant with immense power and cruelty.',
    rarity: 'legendary',
    type: 'Energy',
    unlocked: false,
    stats: {
      health: 90,
      ki: 100,
      attack: 85,
      defense: 75,
      speed: 80
    },
    abilities: [
      {
        id: 'death-beam',
        name: 'Death Beam',
        description: 'A precise energy beam that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/f/f8/FriezaDeathBeamKrillin.png',
        type: 'energy',
        kiCost: 20,
        cooldown: 1,
        currentCooldown: 0,
        damage: 25
      },
      {
        id: 'death-ball',
        name: 'Death Ball',
        description: 'A massive sphere of energy that deals very high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/9/9e/FriezaAttackingGoku.png',
        type: 'energy',
        kiCost: 60,
        cooldown: 4,
        currentCooldown: 0,
        damage: 55
      },
      {
        id: 'nova-strike',
        name: 'Nova Strike',
        description: 'Surrounds himself with energy and charges the opponent, dealing physical damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/5/5c/Frieza%27sNova.png',
        type: 'physical',
        kiCost: 35,
        cooldown: 3,
        currentCooldown: 0,
        damage: 35
      },
      {
        id: 'emperor-transformation',
        name: 'Emperor\'s Transformation',
        description: 'Transforms to increase power, boosting all stats for 3 turns.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/f/fa/DBZ_-_222_-_Bow_To_The_Prince_%28Funi%29_20110530173902.JPG',
        type: 'special',
        kiCost: 40,
        cooldown: 5,
        currentCooldown: 0,
        effects: ['BUFF_ATK_30', 'BUFF_DEF_20', 'BUFF_SPD_20']
      }
    ]
  },
  {
    id: 'cell',
    name: 'Perfect Cell',
    image: 'https://static.wikia.nocookie.net/dragonball/images/e/e7/CellPerfecto.png',
    description: 'A bio-android created to be the perfect warrior with abilities from multiple fighters.',
    rarity: 'legendary',
    type: 'Energy',
    unlocked: false,
    stats: {
      health: 100,
      ki: 95,
      attack: 90,
      defense: 85,
      speed: 75
    },
    abilities: [
      {
        id: 'kamehameha',
        name: 'Kamehameha',
        description: 'A powerful beam of energy that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/7/70/KamehamehaGokuVsCell.png',
        type: 'energy',
        kiCost: 30,
        cooldown: 3,
        currentCooldown: 0,
        damage: 35
      },
      {
        id: 'solar-flare',
        name: 'Solar Flare',
        description: 'Blinds all opponents, reducing their accuracy for 2 turns.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/c/c3/SolarFlare.png',
        type: 'special',
        kiCost: 20,
        cooldown: 3,
        currentCooldown: 0,
        effects: ['DEBUFF_ACC_50']
      },
      {
        id: 'absorption',
        name: 'Absorption',
        description: 'Absorbs energy from an opponent, dealing damage and restoring ki.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/7/77/CellAbsorbingGoku.png',
        type: 'special',
        kiCost: 15,
        cooldown: 4,
        currentCooldown: 0,
        damage: 20,
        effects: ['DRAIN_KI_30']
      },
      {
        id: 'perfect-barrier',
        name: 'Perfect Barrier',
        description: 'Creates an energy barrier that reduces incoming damage for 2 turns.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/6/6f/CellBarrier.png',
        type: 'defense',
        kiCost: 25,
        cooldown: 3,
        currentCooldown: 0,
        effects: ['BUFF_DEF_50']
      }
    ]
  },
  {
    id: 'buu',
    name: 'Majin Buu',
    image: 'https://static.wikia.nocookie.net/dragonball/images/e/ea/Kid_Buu.png',
    description: 'An ancient magical being with immense power and the ability to regenerate.',
    rarity: 'legendary',
    type: 'Energy',
    unlocked: false,
    stats: {
      health: 110,
      ki: 90,
      attack: 95,
      defense: 70,
      speed: 85
    },
    abilities: [
      {
        id: 'candy-beam',
        name: 'Candy Beam',
        description: 'Turns an opponent into candy, disabling them for 1 turn.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/3/35/CandyVegito.png',
        type: 'special',
        kiCost: 35,
        cooldown: 4,
        currentCooldown: 0,
        effects: ['STUN_1']
      },
      {
        id: 'vanishing-ball',
        name: 'Vanishing Ball',
        description: 'A powerful energy sphere that deals massive damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/f/fc/KidBuuSuperVanishingBallK.png',
        type: 'energy',
        kiCost: 60,
        cooldown: 4,
        currentCooldown: 0,
        damage: 60
      },
      {
        id: 'rapid-regeneration',
        name: 'Rapid Regeneration',
        description: 'Quickly regenerates body parts, healing a significant portion of health.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/c/c5/Buu_Healing.jpg',
        type: 'defense',
        kiCost: 40,
        cooldown: 3,
        currentCooldown: 0,
        healing: 40
      },
      {
        id: 'mankind-destruction-attack',
        name: 'Mankind Destruction Attack',
        description: 'Fires multiple energy blasts that damage all enemies.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/2/27/Buu_genocide_2.jpg',
        type: 'energy',
        kiCost: 50,
        cooldown: 4,
        currentCooldown: 0,
        damage: 30
      }
    ]
  },
  {
    id: 'krillin',
    name: 'Krillin',
    image: 'https://static.wikia.nocookie.net/dragonball/images/7/74/KrillinNamekSaga01.png',
    description: 'A skilled human fighter and longtime friend of Goku with unique techniques.',
    rarity: 'rare',
    type: 'Support',
    unlocked: true,
    stats: {
      health: 70,
      ki: 75,
      attack: 65,
      defense: 60,
      speed: 80
    },
    abilities: [
      {
        id: 'destructo-disc',
        name: 'Destructo Disc',
        description: 'A sharp energy disc that can cut through almost anything, dealing high damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/9/91/KrillinDestructoDiskATTier.png',
        type: 'energy',
        kiCost: 35,
        cooldown: 3,
        currentCooldown: 0,
        damage: 40
      },
      {
        id: 'solar-flare',
        name: 'Solar Flare',
        description: 'Blinds all opponents, reducing their accuracy for 2 turns.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/c/c3/SolarFlare.png',
        type: 'special',
        kiCost: 20,
        cooldown: 3,
        currentCooldown: 0,
        effects: ['DEBUFF_ACC_50']
      },
      {
        id: 'scatter-shot',
        name: 'Scatter Shot',
        description: 'Multiple energy blasts that hit all enemies for moderate damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/d/d2/ScatterShotVsGoku.png',
        type: 'energy',
        kiCost: 30,
        cooldown: 3,
        currentCooldown: 0,
        damage: 20
      },
      {
        id: 'senzu-bean',
        name: 'Senzu Bean',
        description: 'Gives a teammate a Senzu Bean, restoring their health and ki.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/8/8a/GokuSenzuBean.png',
        type: 'defense',
        kiCost: 50,
        cooldown: 5,
        currentCooldown: 0,
        healing: 50,
        effects: ['RESTORE_KI_30']
      }
    ]
  },
  {
    id: 'android18',
    name: 'Android 18',
    image: 'https://static.wikia.nocookie.net/dragonball/images/a/a7/Android18FutureNV.png',
    description: 'A powerful android with unlimited energy and precise attacks.',
    rarity: 'epic',
    type: 'Melee',
    unlocked: false,
    stats: {
      health: 85,
      ki: 999, // Infinite energy
      attack: 80,
      defense: 75,
      speed: 90
    },
    abilities: [
      {
        id: 'power-blitz',
        name: 'Power Blitz',
        description: 'A powerful energy sphere that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/6/6e/InfinityBullet18.png',
        type: 'energy',
        kiCost: 0, // No ki cost
        cooldown: 2,
        currentCooldown: 0,
        damage: 30
      },
      {
        id: 'energy-absorption',
        name: 'Energy Absorption',
        description: 'Absorbs energy attacks, negating damage and restoring health.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/5/56/Android_17_%26_18_absorb_energy.png',
        type: 'defense',
        kiCost: 0,
        cooldown: 4,
        currentCooldown: 0,
        healing: 25,
        effects: ['NEGATE_ENERGY_ATTACK']
      },
      {
        id: 'sadistic-18',
        name: 'Sadistic 18',
        description: 'A brutal melee combo that deals high physical damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/4/4b/Android_18_neck_flick.jpg',
        type: 'physical',
        kiCost: 0,
        cooldown: 3,
        currentCooldown: 0,
        damage: 35
      },
      {
        id: 'twin-attack',
        name: 'Twin Attack',
        description: 'A coordinated energy blast that deals high damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/d/db/17_and_18%27s_combined_blast.png',
        type: 'energy',
        kiCost: 0,
        cooldown: 4,
        currentCooldown: 0,
        damage: 45
      }
    ]
  },
  {
    id: 'yamcha',
    name: 'Yamcha',
    image: 'https://static.wikia.nocookie.net/dragonball/images/2/24/YamchaBuuVs.GohanNV.png',
    description: 'A former desert bandit who became a Z Fighter with unique wolf-based techniques.',
    rarity: 'common',
    type: 'Melee',
    unlocked: true,
    stats: {
      health: 65,
      ki: 60,
      attack: 60,
      defense: 55,
      speed: 70
    },
    abilities: [
      {
        id: 'wolf-fang-fist',
        name: 'Wolf Fang Fist',
        description: 'A rapid series of claw-like attacks that deal moderate physical damage.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/2/2b/Wolf_Fang_Fist_HD_DBZ_KAI.png',
        type: 'physical',
        kiCost: 20,
        cooldown: 2,
        currentCooldown: 0,
        damage: 25
      },
      {
        id: 'spirit-ball',
        name: 'Spirit Ball',
        description: 'A controllable energy sphere that can hit multiple times.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/6/61/BuuSpiritBallNV.png',
        type: 'energy',
        kiCost: 30,
        cooldown: 3,
        currentCooldown: 0,
        damage: 30
      },
      {
        id: 'kamehameha',
        name: 'Kamehameha',
        description: 'A beam of energy that deals moderate damage to a single target.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/7/70/KamehamehaGokuVsCell.png',
        type: 'energy',
        kiCost: 25,
        cooldown: 3,
        currentCooldown: 0,
        damage: 25
      },
      {
        id: 'play-dead',
        name: 'Play Dead',
        description: 'Yamcha fakes defeat, reducing enemy attention and increasing his evasion.',
        image: 'https://static.wikia.nocookie.net/dragonball/images/f/fc/YamchaDeadA.png',
        type: 'defense',
        kiCost: 15,
        cooldown: 4,
        currentCooldown: 0,
        effects: ['BUFF_EVASION_50']
      }
    ]
  }
];

// Function to get a character by ID
export const getCharacterById = (id: string): Character | undefined => {
  return characterData.find(character => character.id === id);
};

// Function to get all unlocked characters
export const getUnlockedCharacters = (): Character[] => {
  return characterData.filter(character => character.unlocked);
};

// Function to get all locked characters
export const getLockedCharacters = (): Character[] => {
  return characterData.filter(character => !character.unlocked);
};

// Function to get a character with battle stats
export const getBattleCharacter = (id: string) => {
  const character = getCharacterById(id);
  if (!character) return null;
  
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    health: character.stats.health,
    maxHealth: character.stats.health,
    ki: character.stats.ki,
    maxKi: character.stats.ki,
    abilities: character.abilities.map(ability => ({
      ...ability,
      currentCooldown: 0
    }))
  };
};

// Predefined teams for AI opponents
export const aiTeams = [
  // Beginner AI team
  ['piccolo', 'krillin', 'yamcha'],
  
  // Intermediate AI team
  ['vegeta', 'gohan', 'trunks'],
  
  // Advanced AI team
  ['goku', 'vegeta', 'piccolo'],
  
  // Expert AI team (requires unlocking)
  ['frieza', 'cell', 'buu']
];
