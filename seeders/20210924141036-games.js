'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let games = [
      {
        title: 'Sonic 2',
        description: 'Super fun game',
        rating: 9,
        background_image: 'https://d2skuhm0vrry40.cloudfront.net/2021/articles/2021-06-23-16-49/sonic-the-hedgehog-is-30-years-old-today-1624463363945.jpg/EG11/resize/1200x-1/sonic-the-hedgehog-is-30-years-old-today-1624463363945.jpg',
        released: '10/24/2021',
        platform: 'ps4',
        website: 'sonic.com',
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fifa 22',
        description:
          'Powered by Football™, EA SPORTS™ FIFA 22 brings the game even closer to the real thing with fundamental gameplay advances and a new season of innovation across every mode.',
        rating: 8,
        background_image:
          'https://image.api.playstation.com/vulcan/ap/rnd/202106/2914/W7cptuW6JeY8R4Dhqa9vmSSc.png',
        released: '9/27/2021',
        platform: 'PS4, Xbox, PC, Nintendo',
        website: 'https://www.ea.com/games/fifa/fifa-22/buy/pc',
        price: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mario Kart 8',
        description:
          'The Mario Kart 8 Deluxe game has 42 characters to choose from—the biggest roster in the series!',
        rating: 9,
        background_image:
          'https://cdn.vox-cdn.com/thumbor/qWGYII8dwlFgjB0kzTeeUOXqppY=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/54498501/MarioArt.0.jpg',
        released: '5/29/2014',
        platform: 'PS4, Xbox, PC, Nintendo',
        website: 'https://mariokart8.nintendo.com/',
        price: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Marvel's Spider-Man",
        description:
          "This isn’t the Spider-Man you’ve met or ever seen before. This is an experienced Peter Parker who’s more masterful at fighting big crime in Marvel's New York.",
        rating: 8.8,
        background_image:
          'https://insomniac.games/wp-content/uploads/2018/09/Swing_Day_Legal.jpg',
        released: '08/27/2019',
        platform: 'PS4',
        website: 'https://www.playstation.com/en-us/games/marvels-spider-man/',
        price: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'NBA 2K22',
        description:
          'NBA 2K22 puts the entire basketball universe in your hands. PLAY NOW in real NBA and WNBA environments against authentic teams and players.',
        rating: 6,
        background_image:
          'https://image.api.playstation.com/vulcan/ap/rnd/202106/3002/Eaq9uyUlyLZK8L5xTlsPl0rM.png',
        released: '9/10/2021',
        platform: 'PS4, Xbox, PC, Nintendo',
        website:
          'https://nba.2k.com/?release=nba-2k22-cross-gen-bundle-digital-only&platform=playstation-4-digital&region=usa&medium=digital',
        price: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Rocket League',
        description:
          'WELCOME TO THE HIGH-POWERED HYBRID OF ARCADE-STYLE SOCCER AND VEHICULAR MAYHEM!',
        rating: 7,
        background_image:
          'https://upload.wikimedia.org/wikipedia/commons/e/e0/Rocket_League_coverart.jpg',
        released: '7/7/2015',
        platform: 'PS4, Xbox, PC, Nintendo',
        website: 'https://www.rocketleague.com/',
        price: 28,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Among Us',
        description:
          'Crewmates work together to complete tasks before one or more Impostors can kill everyone aboard.',
        rating: 6,
        background_image:
          'http://thedailycougar.com/wp-content/uploads/2020/10/PRINT_NEWS_Among-Us_Juana-Garcia.png',
        released: '6/15/2018',
        platform: 'PS4, Xbox, PC, Nintendo',
        website: 'https://amongus-2.com/',
        price: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Destiny 2',
        description:
          'Destiny 2 is an action MMO with a single evolving world that you and your friends can join anytime, anywhere, absolutely free.',
        rating: 5,
        background_image:
          'https://assets1.ignimgs.com/2017/04/06/destiny-2---button2-1491517619460.jpg',
        released: '9/28/2017',
        platform: 'PS4, Xbox, PC',
        website: 'https://www.bungie.net/',
        price: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'League of Legends',
        description:
          "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.",
        rating: 9,
        background_image:
          'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcStJOZJ8I6GWv1kqOJVgJL7EsLYfLmiL-Vxbu7BpPrurPsUHXvE',
        released: 'October 27, 2009',
        platform: 'PS4, Xbox, Nintendo, PC',
        website:
          'https://www.leagueoflegends.com/en-us/how-to-play/#:~:text=League%20of%20Legends%20is%20a,battle%20your%20way%20to%20victory',
        price: 59,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Counter-Strike: Global Offensive',
        description:
          'Counter-Strike took the gaming industry by surprise when the unlikely MOD became the most played online PC action game in the world almost immediately after its release in August 1999, said Doug Lombardi at Valve.',
        rating: 7,
        background_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMvmDU360J83Bt_WZbAwf6LdTjKb1Xeo-bQ910enCHG6SZrTp',
        released: 'August 21, 2012',
        platform: 'PS4, Xbox, Nintendo, PC',
        website:
          'https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/',
        price: 43,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Grand Theft Auto V',
        description:
          'Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games.',
        rating: 9,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
        released: 'September 17, 2013',
        platform: 'PS4, Xbox, Nintendo, PC',
        website: 'https://store.steampowered.com/agecheck/app/271590/',
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Valorant',
        description:
          'Valorant (stylized as VALORANT) is a free-to-play first-person hero shooter developed and published by Riot Games, for Microsoft Windows.',
        rating: 9,
        background_image:
          'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg',
        released: 'June 2, 2020',
        platform: 'PS4, Xbox, Nintendo, PC',
        website: 'https://playvalorant.com/en-us/',
        price: 56,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Call of Duty: Modern Warfare',
        description:
          'The game takes place in a realistic and modern setting. The campaign follows a CIA officer and British SAS forces as they team up with rebels from the fictional country of Urzikstan, combating together against Russian forces who have invaded the country.',
        rating: 9,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/e/e9/CallofDutyModernWarfare%282019%29.jpg',
        released: 'October 25, 2019',
        platform: 'PS4, Xbox, Nintendo, PC',
        website: 'https://www.callofduty.com/modernwarfare',
        price: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Roblox',
        description:
          'Roblox is an online game platform and game creation system developed by Roblox Corporation. It allows users to program games and play games created by other users.',
        rating: 7,
        background_image:
          'https://upload.wikimedia.org/wikipedia/commons/8/80/Roblox_Logo_Black.svg',
        released: 'September 1, 2006',
        platform: 'PS4, Xbox, Nintendo, PC',
        website: 'https://www.roblox.com/',
        price: 54,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Minecraft',
        description:
          'Minecraft is a sandbox video game developed by the Swedish video game developer Mojang Studios. The game was created by Markus Notch Persson in the Java programming language.',
        rating: 8,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
        released: '18/11/2011',
        platform: 'PS4, Xbox, Nintendo, PC',
        website: 'https://www.minecraft.net/en-us',
        price: 46,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Back 4 Blood',
        description:
          'Back 4 Blood is an upcoming multiplayer first-person shooter game developed by Turtle Rock Studios and published by Warner Bros. Interactive Entertainment.',
        rating: 7,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/6/60/Back_4_Blood_cover_art.jpg',
        released: 'October 12, 2021',
        platform: 'PS4, Xbox, Nintendo, PC',
        website: 'https://www.back4blood.com/en-us',
        price: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dota 2',
        description:
          "Dota 2 is a multiplayer online battle arena (MOBA) video game developed and published by Valve. The game is a sequel to Defense of the Ancients (DotA), which was a community-created mod for Blizzard Entertainment's Warcraft III: Reign of Chaos.",
        rating: 7,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/0/0b/Dota_2_%28Steam_2019%29.jpg',
        released: 'July 9, 2013',
        platform: 'PS4, Xbox, Nintendo, PC',
        website: 'https://www.dota2.com/home',
        price: 47,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('games', games)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('games')
  }
}
