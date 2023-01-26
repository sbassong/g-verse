import React from 'react'

const About = () => {
  return (
    <div className="Main-Container">
      <h1 className="about-h1" >GameStart Developers</h1>
      <div className="about-us-container">
        <section className="about-card">
          <div className="image-div">
            <img
              className="about-image1"
              src="https://i.imgur.com/7kUML8d.png"
              alt="Jin"
            />
          </div>
          <h2>Jin Im Brancalhao</h2>
          <div className="links">
            <a
              href="https://www.linkedin.com/in/jinimb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            &nbsp;&nbsp;
            <a
              href="https://github.com/jinimbrancalhao"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>
        <section className="about-card">
          <div className="image-div">
            <img
              className="about-image"
              src="https://i.imgur.com/s640xPu.png"
              alt="Sam"
            />
          </div>
          <h2>Sam Bassong</h2>
          <div className="links">
            <a
              href="https://www.linkedin.com/in/sambassong/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            &nbsp;&nbsp;
            <a
              href="https://github.com/sbassong"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>
        <section className="about-card">
          <div className="image-div">
            <img
              className="about-image"
              src="https://i.imgur.com/bzFZVBi.png"
              alt="Raza"
            />
          </div>
          <h2>Raza Khalid</h2>
          <div className="links">
            <a
              href="https://www.linkedin.com/in/razaskhalid/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn{' '}
            </a>
            &nbsp;&nbsp;
            <a
              href="https://github.com/Raza-Khalid"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>
      </div>
      <div className="Team">
        <img src="https://i.imgur.com/YhPQNUK.png" alt="Team" />
      </div>
    </div>
  )
}

export default About
