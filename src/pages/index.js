import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons} style={{marginBottom:18}}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tutorial-getting started/First step">
            Read full documentation 📃
          </Link>
        </div>
        <div className={styles.buttons}> 
          <Link
            className="button button--secondary button--lg"
            to="https://experience.arcgis.com/experience/716928d07a9d4ab595b477b1a402a4b1/page/Historical-data-exploror">
            See our app in action 🕹️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <iframe src='http://127.0.0.1:5501/marqueen%20design/imgmarquee.html'width="100%"></iframe>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
