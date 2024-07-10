import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Python Backend',
    Svg: require('@site/static/img/python-4.svg').default,
    description: (
      <>
       Our geoprocessing steps include those of your favourtie data analytic tools.
       So you can easily improvise them into your own workflows.
      </>
    ),
  },
  {
    title: 'Contents Served Using Markdown & MDX',
    Svg: require('@site/static/img/Markdown-blue-solid.svg').default,
    description: (
      <>
        Markdown is the most widespread markup language, uses plain text formatting which could be edited anywhere by anyone.
      </>
    ),
  },
  {
    title: 'Optimized for Collaboration',
    Svg: require('@site/static/img/github-octocat.svg').default,
    description: (
      <>
        This documentation sites is hosted using GitHub Page, and the sources are under a 
        publicized repo, which makes it ideal for collaborative endeavour
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
