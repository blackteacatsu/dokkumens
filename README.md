# Documentation Page for The Amazon HydroViewer

https://user-images.githubusercontent.com/6877923/115474571-03c75800-a23e-11eb-8096-8973aad5fa9f.mp4

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npx create-docusaurus@latest my-website classic
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Local Build & Serving

```
$ npm run build
$ npm run serve
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Triggering deployment using GitHub Actions

This website uses GtiHub Action for auto deployment, the GitHub pipeline files are stored under `.github/workflows/deploy.yml`. The source repo and deployment repo are the same repository. Therefore, committing and pushing from a remote repo to the `main` branch of this GitHub repo will automatically trigger this GitHub Pipeline.

```mermaid
flowchart LR
    A([Build Docusaurus]) 
    B([Deploy to https://blackteacatsu.github.io/dokkuments/])
    A --> B
```

### Math Equations
This site uses LaTex syntax to show math components. For inline math
```
$y = mx +b$
```

And for outstanding block of math expression use the following,
```
$$
y = mx + b
$$
```

### Diagrams & Flowcharts
This sites' code block support native [Mermaid](https://mermaid.js.org/) snippet rendering. To create new Mermaid figures, add new Mermaid code block in your Markdown file.

### Embedding Videos
This site uses `react-player` to showcase video, at beginning of `.md` add the following command:

```
import ReactPlayer from "react-player"
import MyVideoUrl from './video/myVideo.mp4';
```

Then, insert `<ReactPlayer>` tag at the appropriate location,
```
<ReactPlayer playing controls url='video.mp4' />
```