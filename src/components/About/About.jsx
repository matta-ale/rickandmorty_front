import React from 'react';
import styles from './About.module.css';
import myPic from '../../img/about.png'
import github from'../../img/github.png'
import linkedin from'../../img/linkedin.png'

export default function about() {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.dataAndImageContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.dataSubContainer}>
            <div className={styles.nameDiv}>
              <h2 className={styles.h2Text}>Alexis Mattaruco</h2>
            </div>
            <div className={styles.bulletPointsContainer}>
              <ul className={styles.unOrderedList}>
                <li>FullStack Developer</li>
                <li>Industrial Engineer</li>
                <li>Master degree in Finance</li>
                <li>Looking onto a career change</li>
              </ul>
              <div className={styles.links}>
                <a href="https://www.linkedin.com/in/alexis-santiago-mattaruco-64037b231/"><img src={linkedin} alt="linkedin" /></a>
                <a href="https://github.com/matta-ale"><img src={github} alt="github" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.detailImage} src={myPic} alt='character' />
        </div>
      <div className = {styles.textContainerWrapper}>  
        <div className={styles.dataTextContainer}>
            <p className={styles.p2Text}>
              I'm an Industrial Engineer with a Master's degree in Finance,
              now transitioning into the exciting world of web development as
              a Full Stack Developer. With a passion for technology and a
              drive for continuous learning, I'm pursuing new opportunities in
              this dynamic field. Specializing in React and NodeJS with
              Express and Posgresql, I create engaging and interactive web
              applications. My background in engineering and finance provides
              a unique perspective, blending meticulous attention to detail,
              analytical thinking, and problem-solving skills with my
              expertise in web development. Embracing a growth mindset, I
              believe in continuous learning to deliver high-quality
              solutions. As a dedicated and adaptable Full Stack Developer, I
              am eager to collaborate with teams that share a passion for
              innovation, creativity, and user-centered design. Explore my
              portfolio and let's connect! Together, we can create meaningful
              and impactful digital experiences.
            </p>
          </div>
        </div>    
      </div>
    </div>
  );
}
