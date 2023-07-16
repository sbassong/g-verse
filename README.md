# [G-verse](https://peaceful-everglades-79165.herokuapp.com/)


## **_Description_**

Gverse is a fully functional, intuitive, engaging full-stack application through which game enthusiasts can browse games, manage their personal account, and a library of their favorite games. The application leverages the PERN stack, utilizes the Sequelize ORM and JSON Web Tokens for Authentication and Authorization.

 ## **_Tech Stack_**

- [PostgreSQL](https://www.postgresql.org/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Sequelize](https://sequelize.org/master/)
- [Heroku](https://www.heroku.com/home)

<br>

## **Requirements for machine**
Node, npm, and PostgreSQL are necessary to run this application. If needed, please follow the installation guidelines **[below](#requirements)**



## **Getting Started**
 Once the requirements are met, we're ready to run the application. Follow the steps below to set up and launch the application server.

Copy this repo's HTTPS URL and clone it onto your local machine's terminal:
  ```sh 
  git clone https://github.com/sbassong/g-verse.git
  ```

  #### *From here you will need to have 2 terminals open to run both the frontend and backend*
  ### A. Client / React app / Frontend
  1. Change directory into the newly cloned folder's client folder then install dependencies
      ```sh 
      cd g-verse/client
      npm install
      ```
  1. Run the app on port 3000 
      ```sh 
      npm start
      ```

  ### B. Server + Database / Express app / Backend
  1. Change directory into the newly cloned folder then install dependencies
      ```sh 
      cd g-verse/client
      npm install
      ```
1.  In the g-verse root folder, add a `.env` file containing **both** the following variables 
      ```sh 
      SALT_ROUNDS=<12 or 16>
      APP_SECRET=<WhateverCombinationOfCharactersYouWant.Add889aAndSpecialChars&&##!Throughout>
      ```


1.  Use the sequelize-cli to create the `g-verse_development` database on postgres (databases have a different name based on environment. Can be found in `config/config.json`).

    *PostgreSQL needs to be running from here on ou*

    ```sh 
    sequelize db:create
    ```
1.  Migrate the database with app's models with 
    ```sh 
    sequelize db:migrate
    ```
1.  *Recommended*: Run the following to seed the database with some initial games. (already set up in the `seeders/20210924141036-games` file)

    *Feel free to modify the game objects or add your own, following the Game model guidelines*

    ```sh 
    sequelize db:seed:all
    ```
1.  Finally, run the server on port 3001
    ```sh 
    npm run dev 
    ```

---

## Future Updates


- [x] Integrate a UI Library
- [x] Polish User authentication and authorization
- [ ] Add UX features, alerts, tooltips...
- [ ] Full update to MUI *(in progress)*
- [ ] Filter by Sidebar


**_Credits_**

- Inspiration: GameStop, Rawg
- Pictures: [Google Images](https://google.com)
- Logo: [Canva](http://canva.com)
- Fonts: [Google Fonts](https://fonts.google.com/)

---

 **_Contributors_**
- **[Jin Im Brancalhao](https://www.linkedin.com/in/jinimb/)**
- **[Raza Khalid](https://www.linkedin.com/in/razaskhalid/)**
  
  <br>


 <details><summary><h1> Backend Requirements</h1></summary>
  Node, npm, and postgreSQL are necessary to run this application. please follow the installation guidelines below:

* ### ***Node + npm***
    * *Recommended*: Go to the Node Version Manager ([NVM](https://github.com/nvm-sh/nvm)) github and follow the instructions to install both both Node and npm
    * *Alternatively*: Go to [Node.js](https://nodejs.org/en/) and use the installer appropriate for your system to install node and npm

        *Verify that both node and npm have been installed by running the following in your CLI*

            node -v
            npm -v

* ### ***PostgreSQL***
    * Head to the official [PostgreSQL](https://www.postgresql.org/download/) documentation, choose your operating system family and follow your preferred installation route
    * My preferred installation method for Linux/MacOS:

        1. install homebrew by running this command in your termninal

                /bin/bash -c "$(curl -fsSL https://raw githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        2. follow this each of the following line **one by one**

            use brew to install postgres

                brew install postgres
            
            confirm installation with:

                postgres --version

            To start Postgres and keep it running on your machine

                brew services start postgresql

            To test the above, create a database with your local profile/account name

                createdb <account name>
            
            Confirm you can enter the postgres shell with the following command:
            
                psql

            Exit shell with:
</details>
