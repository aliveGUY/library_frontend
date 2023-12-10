import { Trans } from "react-i18next"
import Section from "./Section"

const Footer = () => {

  return (
    <Section className="footer-section">
      <footer>
        <p>
          <Trans>This website, developed as part of my portfolio, serves as a product of my studies at MNTU. I, the author of this project, Illia, collaborated with Maria and Max in creating this site.</Trans>
        </p>

        <p>
          <Trans>The project has an open-source code and falls under the category of open projects. I encourage everyone interested to join the project, review, and contribute to the <a href="https://github.com/aliveGUY/library_frontend" target="_blank" rel="noopener">front-end</a> and <a href="https://github.com/aliveGUY/library_backend" target="_blank" rel="noopener">back-end</a> on GitHub. Your contribution matters.</Trans>
        </p>

        <p>
          <Trans>More information about my projects and activities can be found on my <a href="http://dubrovinonline.com/" target="_blank" rel="noopener">portfolio</a>. Look for me on social media at:</Trans>
        </p>

        <ul>
          <li><a href="http://dubrovinonline.com/" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/illia-dubrovin/" target="_blank" rel="noopener">Linkedin</a></li>
          <li><a href="https://twitter.com/Sciborskyy" target="_blank" rel="noopener">Twitter</a></li>
          <li><a href="https://www.instagram.com/illia._._._._/?next=%2F" target="_blank" rel="noopener">Instagram</a></li>
        </ul>
      </footer>
    </Section>
  )
}

export default Footer