# 🌿 PhD Presentation Website: 'A New Holistic and Integrated Tool for the Eco-Design of Industrial Processes'

 This repository hosts the development of a dynamic and interactive presentation website for my PhD defense. The website is built using Astro, reveal.js, and Tailwind CSS, and is designed to elegantly showcase my research on developing an innovative eco-design framework. 
 
 The framework, eco2des, integrates process simulation, life cycle assessment (LCA), and life cycle costing (LCC) for optimizing industrial processes with a focus on sustainability. The site aims to provide a clear and engaging platform for academics, industry professionals, and policymakers to understand the significance and impact of this research in advancing sustainability in the industrial sector.

## 🚀 Project Structure

The project is structured as follows:

```text
/
├── public/
│   └── # Static assets like images
├── src/
│   ├── components/
│   │   └── # Web components
│   ├── layouts/
│   │   └── # Layout templates
│   └── pages/
│       └── # Page files, each representing a route
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory to create routes. Components and layouts are organized in their respective directories.

## 🧞 Commands

Use these commands to manage the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |