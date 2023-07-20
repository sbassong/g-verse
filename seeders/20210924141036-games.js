'use strict'
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let games = [
      {
        id: uuidv4(),
        title: 'Fifa 22',
        description:
          'Powered by Football™, EA SPORTS™ FIFA 22 brings the game even closer to the real thing with fundamental gameplay advances and a new season of innovation across every mode.',
        rating: 6.5,
        background_image:
          'https://image.api.playstation.com/vulcan/ap/rnd/202106/2914/W7cptuW6JeY8R4Dhqa9vmSSc.png',
        released: '9/27/2021',
        platform: 'PS4, Xbox, PC, Nintendo',
        price: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Mario Kart 8',
        description:
          'The Mario Kart 8 Deluxe game has 42 characters to choose from—the biggest roster in the series!',
        rating: 9,
        background_image:
          'https://cdn.vox-cdn.com/thumbor/qWGYII8dwlFgjB0kzTeeUOXqppY=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/54498501/MarioArt.0.jpg',
        released: '5/29/2014',
        platform: 'PS4, Xbox, PC, Nintendo',
        price: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: "Marvel's Spider-Man",
        description:
          "This isn’t the Spider-Man you’ve met or ever seen before. This is an experienced Peter Parker who’s more masterful at fighting big crime in Marvel's New York.",
        rating: 8,
        background_image:
          'https://insomniac.games/wp-content/uploads/2018/09/Swing_Day_Legal.jpg',
        released: '08/27/2019',
        platform: 'PS4',
        price: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: "Marvel's friendly neighborhood",
        description:
          "This isn’t the Spider-Man you’ve met or ever seen before. This is an experienced Peter Parker who’s more masterful at fighting big crime in Marvel's New York.",
        rating: 8.8,
        background_image:
          'https://insomniac.games/wp-content/uploads/2018/09/Swing_Day_Legal.jpg',
        released: '08/27/2023',
        platform: 'PS4',
        price: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'NBA 2K22',
        description:
          'NBA 2K22 puts the entire basketball universe in your hands. PLAY NOW in real NBA and WNBA environments against authentic teams and players.',
        rating: 6,
        background_image:
          'https://image.api.playstation.com/vulcan/ap/rnd/202106/3002/Eaq9uyUlyLZK8L5xTlsPl0rM.png',
        released: '9/10/2021',
        platform: 'PS4, Xbox, PC, Nintendo',
        price: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Rocket League',
        description:
          'WELCOME TO THE HIGH-POWERED HYBRID OF ARCADE-STYLE SOCCER AND VEHICULAR MAYHEM!',
        rating: 7.8,
        background_image:
          'https://upload.wikimedia.org/wikipedia/commons/e/e0/Rocket_League_coverart.jpg',
        released: '7/7/2015',
        platform: 'PS4, Xbox, PC, Nintendo',
        price: 28,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Among Us',
        description:
          'Crewmates work together to complete tasks before one or more Impostors can kill everyone aboard.',
        rating: 8,
        background_image:
          'http://thedailycougar.com/wp-content/uploads/2020/10/PRINT_NEWS_Among-Us_Juana-Garcia.png',
        released: '6/15/2018',
        platform: 'PS4, Xbox, PC, Nintendo',
        price: 25/10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Destiny 2',
        description:
          'Destiny 2 is an action MMO with a single evolving world that you and your friends can join anytime, anywhere, absolutely free.',
        rating: 5,
        background_image:
          'https://assets1.ignimgs.com/2017/04/06/destiny-2---button2-1491517619460.jpg',
        released: '9/28/2017',
        platform: 'PS4, Xbox, PC',
        price: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'League of Legends',
        description:
          "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.",
        rating: 9,
        background_image:
          'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcStJOZJ8I6GWv1kqOJVgJL7EsLYfLmiL-Vxbu7BpPrurPsUHXvE',
        released: 'October 27, 2009',
        platform: 'PS4, Xbox, Nintendo, PC',
        price: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Counter-Strike: Global Offensive',
        description:
          'Counter-Strike took the gaming industry by surprise when the unlikely MOD became the most played online PC action game in the world almost immediately after its release in August 1999, said Doug Lombardi at Valve.',
        rating: 7.7,
        background_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMvmDU360J83Bt_WZbAwf6LdTjKb1Xeo-bQ910enCHG6SZrTp',
        released: 'August 21, 2012',
        platform: 'PS4, Xbox, Nintendo, PC',
        price: 43,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Grand Theft Auto V',
        description:
          'Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games.',
        rating: 9,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
        released: 'September 17, 2013',
        platform: 'PS4, Xbox, Nintendo, PC',
        price: 59,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Valorant',
        description:
          'Valorant (stylized as VALORANT) is a free-to-play first-person hero shooter developed and published by Riot Games, for Microsoft Windows.',
        rating: 9,
        background_image:
          'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg',
        released: 'June 2, 2020',
        platform: 'PS4, Xbox, Nintendo, PC',
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Minecraft',
        description:
          'Minecraft is a sandbox video game developed by the Swedish video game developer Mojang Studios. The game was created by Markus Notch Persson in the Java programming language.',
        rating: 9.6,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
        released: '18/11/2011',
        platform: 'PS4, Xbox, Nintendo, PC',
        price: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Back 4 Blood',
        description:
          'Back 4 Blood is an upcoming multiplayer first-person shooter game developed by Turtle Rock Studios and published by Warner Bros. Interactive Entertainment.',
        rating: 4,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/6/60/Back_4_Blood_cover_art.jpg',
        released: 'October 12, 2021',
        platform: 'PS4, Xbox, Nintendo, PC',
        price: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Back 4 Blood: Ultimate',
        description:
          'Back 4 Blood is an upcoming multiplayer first-person shooter game developed by Turtle Rock Studios and published by Warner Bros. Interactive Entertainment.',
        rating: 5.2,
        background_image:
          'https://upload.wikimedia.org/wikipedia/en/6/60/Back_4_Blood_cover_art.jpg',
        released: 'November 24, 2022',
        platform: 'PS4, Xbox, Nintendo, PC',
        price: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    await queryInterface.bulkInsert('games', games)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('games')
  }
}
