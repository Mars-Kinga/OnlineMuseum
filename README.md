# Online Museum

A responsive digital museum experience built with Vue 3. The project presents Central Asian cultures through an interactive Silk Road map, country pages, and a 3D exhibition hall designed for both desktop and mobile interaction.

## Highlights

- Interactive map with country markers, cultural summaries, and route navigation.
- Dedicated pages for Kazakhstan, Uzbekistan, Kyrgyzstan, and Turkmenistan.
- A 3D exhibition hall with three selectable GLB exhibits and camera controls.
- Responsive navigation and touch-friendly exhibit exploration for mobile screens.
- A legacy puzzle activity linked from the museum interface.

## 3D exhibition hall

The exhibition hall uses [`<model-viewer>`](https://modelviewer.dev/) to display:

1. A Kazakh yurt
2. A Turkic stone statue
3. An anthropomorphic pottery vessel

Visitors can rotate and inspect each model, switch exhibits, and read the corresponding cultural introduction. The layout changes at the mobile breakpoint to keep model controls and exhibit details usable on smaller screens.

## Technology

- Vue 3
- Vue Router
- JavaScript
- Google `<model-viewer>`
- Responsive CSS
- GLB 3D assets

## Routes

| Route | Content |
| --- | --- |
| `/` | Interactive museum map |
| `/kazakhstan` | Kazakhstan exhibition page |
| `/uzbekistan` | Uzbekistan exhibition page |
| `/kyrgyzstan` | Kyrgyzstan exhibition page |
| `/turkmenistan` | Turkmenistan exhibition page |
| `/3d-hall` | Responsive 3D exhibition hall |

## Run locally

```bash
git clone https://github.com/Mars-Kinga/OnlineMuseum.git
cd OnlineMuseum
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The museum content is currently presented in Chinese.
