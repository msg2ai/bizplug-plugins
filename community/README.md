# Community contributions

Plug-ins, menu layouts and industries that collaborators added to this repository with a pull request. Everything in `community/` is kept as its authors wrote it: the release that rewrites the rest of the repository never changes it. Card themes are contributed in [`themes/`](../themes) instead.

## Plug-ins: `community/plugins/<name>/`

None yet: yours can be the first.

A plug-in package has the same layout as the ones in [`plugins/`](../plugins): at least `plugin.json`, `mcp.json` and `README.md`, and `data/` only if a business must provide data. [CONTRIBUTING.md](../CONTRIBUTING.md) says what each file must contain.

## Menu layouts: `community/layouts/<id>/`

- [`sports/`](layouts/sports)
- [`storefront/`](layouts/storefront)

A layout has `layout.json`, `layout.js`, `layout.css`, `preview-desktop.png` and `preview-mobile.png`. Start from [`layouts/_template/`](../layouts/_template), and see [LAYOUTS.md](../LAYOUTS.md) for what `render(ctx)` gets and the rules.

## Industries: `community/industries/<slug>.json`

- [`activity-calendar.json`](industries/activity-calendar.json)
- [`marinas.json`](industries/marinas.json)
- [`restaurant-reservations.json`](industries/restaurant-reservations.json)
- [`tourism-bureaus.json`](industries/tourism-bureaus.json)

One file per industry, in the format of [`industries/example.json`](../industries/example.json) ([INDUSTRIES.md](../INDUSTRIES.md#add-a-new-industry)). A file here is a live industry on BizPlug: the website reads these files each time it is built, and the generated package is in [`plugins/<slug>/`](../plugins). Changing a file changes the industry, and removing one takes it down.

## Add yours

The steps are in the repository's README, [How to open a pull request](../README.md#how-to-open-a-pull-request); for a new industry, [INDUSTRIES.md](../INDUSTRIES.md#add-a-new-industry) walks you through every step.

Everything here is published under the repository's [MIT License](https://github.com/msg2ai/bizplug-plugins/blob/main/LICENSE), like the rest of it. What merging does and does not do: your work is published here for anyone to read and use. Merging also lists a theme, a layout or a plug-in in the [BizPlug marketplace](https://www.bizplug.ai/marketplace), where businesses add it to their plug-in; a plug-in is then set up with each business by the BizPlug team, at your own endpoint unless we agree with you to host it.
