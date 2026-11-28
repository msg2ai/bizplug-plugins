<img src="assets/msg2ai-logo.png" alt="msg2ai" width="160" align="right">

# BizPlug plug-ins for ChatGPT

Published by **Bart Cant - msg2ai**.

The standard BizPlug plug-in for each of 89 industries. A plug-in is an MCP (Model Context Protocol) server, hosted by BizPlug, that lets a business's customers ask questions and send orders, bookings or requests from inside ChatGPT. The business confirms every request itself. Customers pay the business directly: a Pay online button after a request opens the business's own payment page (Stripe is the official payment provider; PayPal, Square and other payment pages work too), and the money never passes through BizPlug.

This repository holds the plug-in **packages**: what each plug-in is called, what its tools do, where its server lives and what data a business provides to get its own copy. It is generated from the BizPlug website's data files on every release, so please do not edit it by hand. It also holds the source files those packages are generated from (see below). The server that answers the tools and all business data are not part of this repository.

## Start here: create a new plug-in

Everyone who builds a plug-in for BizPlug starts in this repository. First decide which kind yours is:

| Your idea | What you do here |
| --- | --- |
| **A business** that fits one of the 89 industries below (a yoga studio is Fitness & Gyms, a vegan restaurant is Restaurants & Food Service) | Nothing here: the business signs up at https://www.bizplug.ai/portal, picks its industry and gets its own plug-in |
| **A new industry**: what its customers do, or the words its plug-in needs, fit none of the industries | **One JSON file**, `community/industries/<slug>.json`. No code: the file defines the plug-in, and BizPlug serves it. Steps below |
| **Your own MCP server or tool** (open source, or one you host) | A package in `community/plugins/<name>/`: see [CONTRIBUTING.md](CONTRIBUTING.md) |

**A new industry, step by step**

1. **Start the file.** Easiest: the [**industry builder**](https://www.bizplug.ai/industries/new), a form with lists to pick from that checks your file as you fill it in and then opens GitHub with it, ready to commit. Or [**create it in your browser**](https://github.com/msg2ai/bizplug-plugins/new/main?filename=community%2Findustries%2Fmy-industry.json&value=%7B%0A%20%20%22%24schema%22%3A%20%22https%3A%2F%2Fraw.githubusercontent.com%2Fmsg2ai%2Fbizplug-plugins%2Fmain%2Findustries%2Findustry.schema.json%22%2C%0A%20%20%22slug%22%3A%20%22my-industry%22%2C%0A%20%20%22name%22%3A%20%22My%20Industry%22%2C%0A%20%20%22group%22%3A%20%22Retail%20%26%20food%22%2C%0A%20%20%22engine%22%3A%20%22appt%22%2C%0A%20%20%22title%22%3A%20%22What%20the%20plug-in%20mainly%20does%22%2C%0A%20%20%22tools%22%3A%20%7B%0A%20%20%20%20%22lookup%22%3A%20%22find_open_times%22%2C%0A%20%20%20%20%22request%22%3A%20%22request_a_booking%22%2C%0A%20%20%20%20%22status%22%3A%20%22get_booking_status%22%0A%20%20%7D%2C%0A%20%20%22noun%22%3A%20%22booking%22%2C%0A%20%20%22ask%22%3A%20%22A%20question%20a%20customer%20would%20ask%3F%22%2C%0A%20%20%22covers%22%3A%20%22what%20customers%20ask%20about%2C%20such%20as%20services%2C%20prices%20and%20opening%20hours%22%2C%0A%20%20%22example%22%3A%20%7B%0A%20%20%20%20%22business%22%3A%20%22A%20made-up%20business%22%2C%0A%20%20%20%20%22item%22%3A%20%22One%20thing%20it%20offers%22%2C%0A%20%20%20%20%22price%22%3A%20%2220.00%22%0A%20%20%7D%2C%0A%20%20%22author%22%3A%20%22Your%20name%20or%20company%22%2C%0A%20%20%22github%22%3A%20%22your-github-username%22%0A%7D%0A): GitHub opens its editor with a starter file, makes your own copy of this repository (a fork) and, when you commit, offers to open the pull request. Or, with Git and Node.js, fork, clone, and copy [`industries/example.json`](industries/example.json). **Want lists to pick from?** Open the file in an editor that reads JSON Schema, such as VS Code or github.dev (press `.` on any page of this repository): every field then offers its allowed values as you type and marks a wrong one, from [`industries/industry.schema.json`](industries/industry.schema.json), which the starter file already points to.
2. **Write what your plug-in does.** Pick the engine (what customers mainly do: order, book dates, book a time, ask for a quote, follow a request), name its three tools and the words customers use. Then, optionally, make it richer with no code: switch on existing **options**, define your own searchable **collections** (a shop's bikes for sale), name the menu in your **own words**, and give every business **request forms** (a warranty claim). [`industries/example.json`](industries/example.json), a bike shop, uses each of them; [INDUSTRIES.md](INDUSTRIES.md#add-a-new-industry) explains every field.
3. **Open the pull request** against `main`, adding only your file. Its checklist asks which existing industry is closest and why it does not fit.
4. **Read what the checks say.** **Check contributions** runs the same check as `npx tsx industries/check-industry.ts community/industries/<slug>.json` and lists what to fix. **Test industry proposals** builds your industry as a working plug-in for a made-up sample business at `https://mcp-test.bizplug.ai/plugin/proposal/<pull request number>` and comments the address on your pull request. Each new commit updates both.
5. **Try your plug-in** at that address in ChatGPT (developer mode, a connector) or Claude (a custom connector): ask your customer question, open your lists and forms. A sample business never sends anything.
6. **Merge is the release.** Once the team approves and merges it, your industry is live within minutes: its plug-in at `https://mcp.bizplug.ai/plugin/<slug>`, its page on www.bizplug.ai, credited to you, and offered to businesses in the portal. A comment on the pull request says when.

Prefer not to write the file? Describe the industry in the [Propose a new industry](https://github.com/msg2ai/bizplug-plugins/issues/new?template=new-industry.yml) form instead.

## About this repository

- Website: https://www.bizplug.ai
- Every plug-in on one page: https://www.bizplug.ai/plugins
- Blog: https://www.bizplug.ai/blog
- Contact: info@bizplug.ai
- Set up, configure and test a plug-in: [SETUP.md](SETUP.md)
- Submit your own plug-in to the marketplace: [CONTRIBUTING.md](CONTRIBUTING.md)
- Industry plug-ins, and how to propose a new industry: [INDUSTRIES.md](INDUSTRIES.md)
- Every tool with its inputs, and how to call a plug-in yourself: [TOOLS.md](TOOLS.md) ([tools.json](tools.json))
- Card themes, and how to propose one: [THEMES.md](THEMES.md)
- Menu layouts, with desktop and mobile pictures, and how to code one: [LAYOUTS.md](LAYOUTS.md)
- Contribute a plug-in, a theme or a layout: [Contribute](#contribute-plug-ins-themes-and-layouts)
- Skills for AI agents, such as building a business's plug-in from its website: [Skills](#skills-for-ai-agents)

## Repository layout

```
README.md            this page: what is here, every plug-in, and how to contribute
LICENSE              MIT: everything here, contributions included
SETUP.md             set up, configure and test a plug-in
CONTRIBUTING.md      what a valid plug-in contains, and how to contribute one
INDUSTRIES.md        what an industry plug-in is made of, and how to add a new industry
TOOLS.md             every tool with its inputs, and how to call a plug-in yourself; tools.json, the same as data
THEMES.md            the card's colour themes, and how to add one
LAYOUTS.md           the card's menu layouts, with pictures, and how to build one
plugins/             BizPlug's plug-in packages, one folder each (plugins/README.md)
themes/              one JSON file per card theme, check-theme.ts and preview.ts (themes/README.md)
industries/          check-industry.ts, test-industry.ts and an example, for writing and testing a new industry (INDUSTRIES.md)
layouts/             BizPlug's menu layouts, the template, check-layout.ts, preview.ts and sample businesses
skills/              skills for AI agents, one folder with a SKILL.md each (README: Skills for AI agents)
community/           what collaborators contributed (community/README.md)
  plugins/<name>/      a contributed plug-in package
  layouts/<id>/        a contributed menu layout
  industries/<slug>.json   a contributed industry: the file is its source (INDUSTRIES.md)
source/              the files the packages are generated from, copied from the BizPlug website (read only)
assets/              the publisher's logo, and the step-by-step contribution videos
.github/
  pull_request_template.md   the checklist every pull request starts with
  ISSUE_TEMPLATE/            forms to propose a new industry, or a theme or a layout without a pull request
  workflows/                 the checks that run on pull requests, and the one that publishes a merged industry
```

## What is in a package

```
plugins/<industry>/
  README.md                    what the plug-in does, its tools and what changed in each version
  plugin.json                  name, description, starter prompts and review test cases
  mcp.json                     the plug-in's MCP server URL (streamable HTTP, no sign-in)
  data/requirements.json       the datasets a business provides, column by column
  data/templates/*.csv         a CSV template per dataset, with an example row
  data/AGENT_INSTRUCTIONS.md   how a person or an AI agent collects and submits that data
```

Every plug-in has the same six tools: a menu (`show_menu`), a look-up, a request, a status check, `get_business_info` and `get_contact`. The look-up, request and status tools are named for the industry, for example `get_menu`, `place_pickup_order` and `get_order_status` for Coffee Shops & Cafes. Chambers of Commerce & Business Associations, Coworking & Offices have one more, `find_members`, which finds the member businesses a business has published; a person contacts a member directly. Coworking & Offices also has `get_visit_options`, `book_tour` and `request_day_pass`, for tours and day passes at the locations a business has published; the business confirms each one.

## Source

`source/` holds the files the packages are generated from, copied from the BizPlug website. They are here to be read: they import website files that are not published, so they do not build on their own.

```
source/
  plugins.ts                   each plug-in's name, description, tools, menu and test cases
  industry-functions.ts        the main function and tool names of each industry
  plugin-data.ts               the datasets and columns a business provides, and the agent instructions
  plugin-examples.ts           the example rows used in the CSV templates
  plugin-addons.ts             what a plug-in can be bundled with, and the status of each
  plugin-versions.ts           every plug-in version and what changed in it
  widgets/plugin-widget.ts     the card a plug-in shows in ChatGPT
  card-themes.ts               the card's colour themes a business can pick, and their checks
```

## Try a plug-in in ChatGPT

1. In ChatGPT, open Settings, then Apps & Connectors, and turn on developer mode.
2. Create a connector with a plug-in's MCP server URL from the tables below (no sign-in needed).
3. Start a new chat, pick the connector and ask "What can this plug-in do?"

An industry URL serves every business in that industry, so the assistant asks which business you mean. A business with its own plug-in has its own URL: `https://mcp.bizplug.ai/plugin/coffee-shops/<business>`.

## Get a plug-in for your business

Sign up at https://www.bizplug.ai/portal, pick your industry and provide the data its package lists, by uploading the CSV files or through the data API. BizPlug publishes the plug-in to a test address first and to production when you ask. The plug-in is $24.99 a month or $199 a year, for businesses in any country; plan details are confirmed with you before any payment.

## Skills for AI agents

`skills/` holds skills: instructions an AI agent loads when a task calls for them, one folder with a `SKILL.md` each, in the format Claude Code and the Claude apps read.

| Skill | What it does |
| --- | --- |
| [`build-a-bizplug-plugin`](skills/build-a-bizplug-plugin/SKILL.md) | Builds a business's plug-in from its own website with the BizPlug CLI (`@bizplug/cli`): picks the industry, writes the files its package lists, sends them to your account, checks them, and asks you before any deploy request. |

To use one in Claude Code, copy its folder into `.claude/skills/` in your project, or `~/.claude/skills/` for every project. Each skill needs only what it names, here Node.js and a BizPlug account.

## Contribute: plug-ins, themes, layouts and industries

Collaborators can add four kinds of work to this repository with a pull request:

| What | Add in your pull request | Check before you open it | Once merged |
| --- | --- | --- | --- |
| A **card theme** (five colours) | `themes/<id>.json` ([themes/README.md](themes/README.md), [THEMES.md](THEMES.md)) | `npx tsx themes/check-theme.ts themes/<id>.json` | Listed in the [BizPlug marketplace](https://www.bizplug.ai/marketplace) within about fifteen minutes; offered on every business's plug-in when featured, otherwise once a business adds it |
| A **menu layout** (how the card's menu is drawn) | `community/layouts/<id>/` ([LAYOUTS.md](LAYOUTS.md)) | `npx tsx layouts/check-layout.ts community/layouts/<id>` | Listed in the [BizPlug marketplace](https://www.bizplug.ai/marketplace) within about fifteen minutes, with you as its author; offered on every business's plug-in when featured, otherwise once a business adds it |
| A **plug-in** (an MCP server of your own) | `community/plugins/<name>/` ([CONTRIBUTING.md](CONTRIBUTING.md)) | It works in ChatGPT developer mode ([SETUP.md](SETUP.md#setup)) | Listed in the [BizPlug marketplace](https://www.bizplug.ai/marketplace) within about fifteen minutes; a business that adds it asks the BizPlug team to set it up with its plug-in |
| A **new industry** (an industry plug-in on one of the engines) | `community/industries/<slug>.json` ([INDUSTRIES.md](INDUSTRIES.md#add-a-new-industry)) | `npx tsx industries/check-industry.ts community/industries/<slug>.json`; once the pull request is open, a workflow previews it on the test server and comments the results of `industries/test-industry.ts` | The file is the industry: the website is built again with it, and its plug-in, its page and its place in the portal go live with that build. Its package appears in `plugins/<slug>/` with this repository's next update |

The **Check contributions** and **Check card themes** workflows run the checks on every pull request.

Step-by-step videos, with every command and what it prints:

- [Add a card theme to BizPlug, step by step](https://www.bizplug.ai/how-to/developers/add-theme-layout-industry#add-a-card-theme) (1:04)
- [Add a menu layout to BizPlug, step by step](https://www.bizplug.ai/how-to/developers/add-theme-layout-industry#add-a-menu-layout) (1:20)
- [Add a new industry to BizPlug, step by step](https://www.bizplug.ai/how-to/developers/add-theme-layout-industry#add-a-new-industry) (1:31)

### How to open a pull request

1. Fork https://github.com/msg2ai/bizplug-plugins and create a branch, for example `theme/harbour`, `layout/magazine`, `industry/bicycle-shops` or `plugin/acme-bookings`.
2. Add only the files of your contribution, in the folder the table names. Everything else is generated from the BizPlug website on every release (the packages in `plugins/`, `layouts/`, `source/` and the pages at the top), so a change there would be overwritten; the checks fail a pull request that changes it.
3. Run the check for your kind of contribution and fix what it reports.
4. Open a pull request against `main`. Its description starts with a checklist ([`.github/pull_request_template.md`](.github/pull_request_template.md)): keep the part for your kind of contribution, paste the check's output, and add a screenshot.
5. The checks run on the pull request, and the BizPlug team reviews it: on real cards, in dark and light mode, for a theme or a layout, and in ChatGPT for a plug-in. Changes are asked for in the pull request.
6. Once approved, it is merged into `main` and stays in this repository, credited to you, through every release.

On your first pull request to this repository, GitHub may wait for a maintainer to approve running the checks (it says so on the pull request). They run as soon as someone on the team approves them.

Not sure which engine a new industry needs? Use the [Propose a new industry](https://github.com/msg2ai/bizplug-plugins/issues/new?template=new-industry.yml) form instead, and the team works it out with you.

By opening a pull request you agree that your contribution is published under this repository's [MIT License](LICENSE).

Not on GitHub? Use the forms instead: [Propose a card theme](https://github.com/msg2ai/bizplug-plugins/issues/new?template=card-theme.yml), [Propose a menu layout](https://github.com/msg2ai/bizplug-plugins/issues/new?template=menu-layout.yml), or https://www.bizplug.ai/marketplace#submit for a plug-in. Questions: info@bizplug.ai.

## Version 0.65.0

All 89 plug-ins share one version. What changed in each:

- **0.65.0** (28 November 2026): The concierge speaks your industry's words: a marina's picks and its berths, not a host's and homes.
- **0.64.0** (28 November 2026): Industry forms: request forms your industry gives every business, such as a warranty claim, sent to your own inbox.
- **0.63.0** (28 November 2026): Industry words: an industry's menu speaks its own language, with its own titles and rules.
- **0.62.0** (28 November 2026): Collections: searchable lists an industry defines, such as climbing routes or recipes, each with its own data file and card screen.
- **0.61.0** (28 November 2026): Vacation rentals: the booking screen speaks of homes and the host, not rooms and the hotel.
- **0.60.0** (27 November 2026): A plug-in can offer Claude a shorter list of tools than ChatGPT, at the same address.
- **0.59.0** (27 November 2026): My registration: attendees can add their LinkedIn profile, which, with their agreement, is looked up and sent to your CRM.
- **0.58.0** (27 November 2026): Events: attendees can open and correct their own registration from the card, after a code sent to their email.
- **0.57.0** (27 November 2026): Events: on a computer, a speaker or an agenda session opens in a panel beside the list, with its details, as exhibitors already do.
- **0.56.0** (26 November 2026): Events: connect your Humanitix account, and your plug-in shows your upcoming Humanitix events and tickets with the page to buy them.
- **0.55.0** (26 November 2026): Events with Ticket Tailor: a Tickets button in the card, with each event's tickets and a Buy tickets button.
- **0.54.0** (26 November 2026): Events: connect your Ticket Tailor box office, and your plug-in shows your upcoming events and tickets with the link to buy them.
- **0.53.0** (25 November 2026): Tool descriptions say only what each tool does; how to use them is in the plug-in's instructions, as Claude's connector directory asks.
- **0.52.0** (25 November 2026): Every tool's title is also in its annotations, as Claude's connector directory asks.
- **0.51.0** (25 November 2026): Vacation rentals: name your local picks yourself, such as "Harrison's Suggestions", in place of Explore the area.
- **0.50.0** (25 November 2026): Tour operators and DMCs: trips day by day in the card, with a picture per day, each day opening on its flights, hotels and activities by the hour; My trip by code; and a proposal's price breakdown.
- **0.49.0** (25 November 2026): Ask ChatGPT from the card without losing it: the question is answered in the chat, the card floats beside the answer on a computer, and the menu opens full screen.
- **0.48.0** (25 November 2026): Vacation rentals: a concierge in the card. The host's local picks, an area guide with events on the guest's dates, a house guide, Which home fits, Plan my stay with the price for the dates, and Continue on WhatsApp.
- **0.47.0** (24 November 2026): Direct offers in the card: Price for your dates, the host's offer as a screen, and Book & pay on the host's own website.
- **0.46.0** (24 November 2026): Direct offers: a rental or hotel whose own website publishes signed offers by the Vacation Rental Protocol is quoted from its site, with the exact total, the terms and its own booking link.
- **0.45.0** (23 November 2026): Member, exhibitor and sponsor lists as a grid of tiles with logo, name and category.
- **0.44.0** (23 November 2026): A Featured row above the events calendar: the events you pick, as large cards to swipe through.
- **0.43.0** (23 November 2026): On a computer, an event, a member or an exhibitor opens in a panel beside its list, with its links and Ask for more.
- **0.42.0** (23 November 2026): An events calendar: events with fixed dates, month by month, with categories, search and each event's own links.
- **0.41.0** (23 November 2026): Book on WhatsApp for more than hotel nights: bookings by the day or for one date, and activities next to rooms.
- **0.40.0** (22 November 2026): Checkout for AI agents: an agent acting for a customer can take them to your own checkout, where the customer approves and pays.
- **0.39.0** (22 November 2026): More card languages: Hindi, Spanish, French, Bengali, Portuguese, Russian, Indonesian, Urdu, German, Italian and Dutch, next to Arabic, Korean and Japanese.
- **0.38.0** (22 November 2026): Card languages: the card can be switched to Arabic, Korean or Japanese, with the business's own translations of its data.
- **0.37.0** (21 November 2026): Delivery fees: an order plug-in adds the business's published delivery fee to a delivery order's total and checkout.
- **0.36.0** (21 November 2026): Your forms come first: when a customer wants to do what one of your forms is for, the assistant opens that form instead of sending you a request.
- **0.35.0** (21 November 2026): YouTube videos play inside the card: tap a video in Social media and it plays there, with YouTube Shorts shown upright.
- **0.34.0** (21 November 2026): Agent mode: other companies' AI agents can use your plug-in without a card, and must show the customer a preview before a request is sent.
- **0.33.0** (21 November 2026): Your own forms: build short forms in the portal, and customers fill them in on your card or ask the assistant to.
- **0.32.0** (20 November 2026): Forms: your own forms in Google Forms, Microsoft Forms, Typeform, Jotform, Tally and other tools, offered at the right moment and opened with what the customer already said filled in.
- **0.31.0** (20 November 2026): Menu layouts: choose how your card's menu is organised, from the Ask bar, App and Story layouts or one from the open-source layout directory.
- **0.30.0** (20 November 2026): Social media on the card: the business's latest posts with their pictures, from its feeds and the posts it pins, and where to follow it.
- **0.29.0** (20 November 2026): The booking calendar for car rental, tickets, desks and venues, with prices that change by day.
- **0.28.0** (20 November 2026): Event guides: exhibitor and sponsor logos, and a More about panel for each company with Ask ChatGPT for more.
- **0.27.0** (20 November 2026): Hotels: a booking screen with a calendar of free nights, adults, children and rooms, room cards with nightly prices, the hotel's policies, and a booking button on each room.
- **0.26.0** (20 November 2026): Member details: each member's address, LinkedIn page and a More about panel, with Ask ChatGPT for more.
- **0.25.0** (20 November 2026): Showcase: the business's logo on its card, member logos, and committees, the newsletter, and news and events on their own screens.
- **0.24.0** (20 November 2026): Password sign-in: parts of a plug-in that only the people on the business's own list can use, after they sign in with an email and password.
- **0.23.0** (20 November 2026): The card also shows in Claude: the menu, the forms and the results are drawn there as they are in ChatGPT.
- **0.22.0** (20 November 2026): Coworking & Offices: Book a tour and Day pass at the business's own locations, continued with the business's WhatsApp assistant when it has one.
- **0.21.0** (20 November 2026): Card banner: a business's own wide picture at the top of its card's menu. Member messages: on a member list, the card drafts a first message to a member, sent from the person's own email or WhatsApp.
- **0.20.0** (19 November 2026): Send from the account menu: a record's screen can open the customer's own mail app or WhatsApp with a text from it filled in, such as a follow-up draft.
- **0.19.0** (19 November 2026): Account menu: the account tools of a business's own server get buttons in the card, with a form or a list for each, so signed-in customers tap instead of typing.
- **0.18.0** (19 November 2026): Event guide: an Events & Conferences plug-in for a show or conference answers with its agenda, speakers, exhibitors and sponsors, and sends exhibiting, sponsoring and visiting enquiries.
- **0.17.0** (19 November 2026): Account tools: a business that runs its own MCP server can offer its tools in its plug-in, so signed-in customers work in their own account from ChatGPT.
- **0.16.0** (19 November 2026): Customer sign-in with Clerk: a business that runs its own Clerk application can make its plug-in answer only its signed-in customers or members.
- **0.15.0** (18 November 2026): Software & SaaS plug-ins get a menu made for software (Features, Pricing, Help & guides, Support, Book a demo), and every business's plug-in describes only the business to ChatGPT.
- **0.14.0** (18 November 2026): A business's plug-in shows its full name in ChatGPT, the business's name with what it is, and its own logo as the plug-in's icon.
- **0.13.0** (18 November 2026): A pay step in the card after a request with checkout: the total, a Pay now button to the business's own checkout page, and an I've paid button that checks the payment.
- **0.12.0** (17 November 2026): Coworking & Offices: a business can publish its member businesses, so people can find a member by name, kind of business or what they need or offer, and contact it directly.
- **0.11.0** (17 November 2026): Every tool states whether it only reads, whether its action can be taken back and whether it reaches outside the business's own data, as ChatGPT's plug-in directory requires.
- **0.10.0** (17 November 2026): The plug-in introduces itself to ChatGPT and other clients with a description and a website, and BizPlug's industry-wide plug-ins with the BizPlug logo, privacy policy, terms and support contact.
- **0.9.0** (16 November 2026): Checkout on the business's own Stripe or Checkout.com account, when it has connected one: customers pay for an order or booking right after the request, and the status check asks the provider whether it was paid.
- **0.8.0** (16 November 2026): Clear answers on how to pay: the business's own payment page when it has one, offered whenever a customer asks, and payment never taken in the chat.
- **0.7.0** (16 November 2026): The business's own buttons (WhatsApp, booking, directions, reviews, social media) on the menu card and next to availability, with presses counted for the business.
- **0.6.0** (16 November 2026): Buttons to the business's own pages, when it has saved them in the portal: a payment page after a sent request, and its booking page, directions and review page with its contact details.
- **0.5.0** (16 November 2026): A WhatsApp button to the business's own number, with its contact details and after a sent request, when the business has saved its number in the portal.
- **0.4.0** (16 November 2026): Browsing by tapping in the card: quick options on each form, search and category filters on a list, an item or option on its own screen with Back, the business's published questions and answers, and choosing the business on an industry-wide plug-in.
- **0.3.0** (16 November 2026): Results show inside the card (prices, availability, open times, estimates and statuses), and a request can be sent straight from a result.
- **0.2.0** (16 November 2026): A menu card in ChatGPT, with a button and a short form for each thing a customer can do.
- **0.1.0** (15 November 2026): The plug-in's tools for the industry, answers from the business's own information, and a text menu of what it can do.

A business's own plug-in stays on the version it was published with until the business upgrades it.

## Plug-ins on the platform

The plug-ins BizPlug serves besides the industry plug-ins, newest first, as on https://www.bizplug.ai/plugins. The startup directories have their package in `plugins/`; the others are built from a business's own profile. Names belong to their owners and show whose published information a plug-in is built on; BizPlug is not affiliated with or endorsed by them, except msg2ai, the company behind BizPlug, and the plug-ins listed under msg2ai. Businesses that list their own plug-in from the portal are on the website only.

| Plug-in | Kind | Added | What it does | MCP server URL |
| --- | --- | --- | --- | --- |
| Rethink Labs | msg2ai | 2026-11-18 | AI and blockchain consulting for businesses. Ask about the services and book an AI discovery call. | `https://mcp.bizplug.ai/plugin/consulting/rethink-labs` |
| msg2ai | msg2ai | 2026-11-18 | AI messaging for hotels, vacation rentals and events: AI Ambassador, ChatGPT apps and WhatsApp concierges. | `https://mcp.bizplug.ai/plugin/consulting/msg2ai` |
| AI Ambassador | msg2ai | 2026-11-18 | An AI assistant that answers guests and attendees around the clock on WhatsApp, SMS and RCS. | `https://mcp.bizplug.ai/plugin/consulting/ai-ambassador` |
| ActionNotes.ai | msg2ai | 2026-11-18 | AI note-taking for conferences: contacts, conversations and commitments, with follow-ups. | `https://mcp.bizplug.ai/plugin/consulting/actionnotes` |
| Doha Metro Guide | City guide | 2026-11-15 | Plan Doha Metro journeys and find what to see and do near each station. | `https://mcp.bizplug.ai/plugin/public-transit/doha-metro` |
| [gener8tor Charlotte Startups for Investors](plugins/gener8tor-charlotte) | Startup directory | 2026-11-15 | Find the gBETA Charlotte startups that match your investment thesis. | `https://mcp.bizplug.ai/plugin/startups/gener8tor-charlotte` |
| [Web Summit Qatar Startups for Investors](plugins/websummit-qatar) | Startup directory | 2026-11-14 | Find Web Summit Qatar 2026 startups that match your investment thesis. | `https://mcp.bizplug.ai/plugin/startups/websummit-qatar` |

## The 89 industry plug-ins

The standard plug-in of each industry, as on https://www.bizplug.ai/plugins/industries. A business gets its own copy, built from its profile.

### Business essentials

| Industry | What it does | MCP server URL |
| --- | --- | --- |
| [Events & Conferences](plugins/events) | Venue availability, pricing and date holds | `https://mcp.bizplug.ai/plugin/events` |
| [Hospitality & Hotels](plugins/hospitality) | Room availability, rates and booking requests | `https://mcp.bizplug.ai/plugin/hospitality` |
| [Marketing Agencies](plugins/agencies) | Book a strategy call | `https://mcp.bizplug.ai/plugin/agencies` |
| [Nonprofits & Charities](plugins/nonprofits) | Volunteer and donation requests | `https://mcp.bizplug.ai/plugin/nonprofits` |
| [SaaS & Software](plugins/saas) | Book a product demo | `https://mcp.bizplug.ai/plugin/saas` |
| [Consulting & Professional Services](plugins/consulting) | Book a discovery call | `https://mcp.bizplug.ai/plugin/consulting` |

### Retail & food

| Industry | What it does | MCP server URL |
| --- | --- | --- |
| [Retail & E-commerce](plugins/retail) | Product search and reserve in store | `https://mcp.bizplug.ai/plugin/retail` |
| [Restaurants & Food Service](plugins/restaurants) | Order ahead and takeaway | `https://mcp.bizplug.ai/plugin/restaurants` |
| [Coffee Shops & Cafes](plugins/coffee-shops) | Mobile order-ahead for pickup | `https://mcp.bizplug.ai/plugin/coffee-shops` |
| [Bars & Nightlife](plugins/bars-nightlife) | Table and guest-list requests | `https://mcp.bizplug.ai/plugin/bars-nightlife` |
| [Catering & Events](plugins/catering) | Catering price by headcount | `https://mcp.bizplug.ai/plugin/catering` |
| [Food Delivery](plugins/food-delivery) | Delivery orders | `https://mcp.bizplug.ai/plugin/food-delivery` |
| [Meal Kits & Subscriptions](plugins/meal-kits) | Pick a plan and order a weekly box | `https://mcp.bizplug.ai/plugin/meal-kits` |
| [Grocery & Supermarkets](plugins/grocery) | Build a pickup or delivery list | `https://mcp.bizplug.ai/plugin/grocery` |
| [Ghost & Cloud Kitchens](plugins/ghost-kitchens) | Order from a cloud-kitchen brand | `https://mcp.bizplug.ai/plugin/ghost-kitchens` |
| [Fashion & Apparel](plugins/fashion) | Find sizes and reserve for try-on | `https://mcp.bizplug.ai/plugin/fashion` |
| [Electronics & Gadgets](plugins/electronics) | Check stock and reserve a gadget | `https://mcp.bizplug.ai/plugin/electronics` |
| [Furniture & Home Goods](plugins/furniture) | Browse pieces and request an order | `https://mcp.bizplug.ai/plugin/furniture` |
| [Beauty E-commerce](plugins/beauty-ecommerce) | Shop products and place an order | `https://mcp.bizplug.ai/plugin/beauty-ecommerce` |
| [Subscription Boxes](plugins/subscriptions) | Choose a box and start a subscription request | `https://mcp.bizplug.ai/plugin/subscriptions` |
| [Florists & Flower Delivery](plugins/florists) | Bouquets for pickup or delivery | `https://mcp.bizplug.ai/plugin/florists` |
| [Convenience & C-Stores](plugins/convenience-stores) | Reserve items for quick pickup | `https://mcp.bizplug.ai/plugin/convenience-stores` |
| [Restaurant Reservations](plugins/restaurant-reservations) | Table reservations | `https://mcp.bizplug.ai/plugin/restaurant-reservations` |

### Property & auto

| Industry | What it does | MCP server URL |
| --- | --- | --- |
| [Real Estate](plugins/real-estate) | Request property showings | `https://mcp.bizplug.ai/plugin/real-estate` |
| [Local & Home Services](plugins/home-services) | Estimate a local home service | `https://mcp.bizplug.ai/plugin/home-services` |
| [Automotive & Dealerships](plugins/automotive) | Book service and test drives | `https://mcp.bizplug.ai/plugin/automotive` |

### Health & wellness

| Industry | What it does | MCP server URL |
| --- | --- | --- |
| [Healthcare & Clinics](plugins/healthcare) | Find and request appointments | `https://mcp.bizplug.ai/plugin/healthcare` |
| [Fitness & Gyms](plugins/fitness) | Book classes, trials and tours | `https://mcp.bizplug.ai/plugin/fitness` |
| [Beauty & Salons](plugins/beauty) | Book salon services with a stylist | `https://mcp.bizplug.ai/plugin/beauty` |
| [Dental Practices](plugins/dental) | Book cleanings, exams and consults | `https://mcp.bizplug.ai/plugin/dental` |
| [Optometry & Eye Care](plugins/optometry) | Book eye exams and fittings | `https://mcp.bizplug.ai/plugin/optometry` |
| [Dermatology & Skin](plugins/dermatology) | Book skin-care visits | `https://mcp.bizplug.ai/plugin/dermatology` |
| [Chiropractic & PT](plugins/chiropractic) | Book adjustments and therapy sessions | `https://mcp.bizplug.ai/plugin/chiropractic` |
| [Mental Health & Therapy](plugins/mental-health) | Request an intake or session | `https://mcp.bizplug.ai/plugin/mental-health` |
| [Veterinary & Pet Care](plugins/veterinary) | Book pet appointments | `https://mcp.bizplug.ai/plugin/veterinary` |
| [Pharmacies](plugins/pharmacy) | Store services and callback requests | `https://mcp.bizplug.ai/plugin/pharmacy` |
| [Med Spas & Aesthetics](plugins/med-spa) | Book aesthetic treatments and consults | `https://mcp.bizplug.ai/plugin/med-spa` |
| [Senior Care & Communities](plugins/senior-care) | Schedule community tours | `https://mcp.bizplug.ai/plugin/senior-care` |
| [Home Health & Hospice](plugins/home-health) | Request a care assessment | `https://mcp.bizplug.ai/plugin/home-health` |

### Community & public

| Industry | What it does | MCP server URL |
| --- | --- | --- |
| [Education & Schools](plugins/education) | Book campus visits and info sessions | `https://mcp.bizplug.ai/plugin/education` |
| [Logistics & Delivery](plugins/logistics) | Shipping rate estimate and pickup request | `https://mcp.bizplug.ai/plugin/logistics` |
| [Government & Public Sector](plugins/government) | Service requests and case status | `https://mcp.bizplug.ai/plugin/government` |
| [Utilities & Energy](plugins/utilities) | Outage and service-request status | `https://mcp.bizplug.ai/plugin/utilities` |
| [Telecom & ISPs](plugins/telecom) | Compare plans and request service | `https://mcp.bizplug.ai/plugin/telecom` |
| [Religious Organizations](plugins/religious-orgs) | RSVP to services and events, book pastoral time | `https://mcp.bizplug.ai/plugin/religious-orgs` |
| [Membership Associations](plugins/associations) | Membership applications and renewals | `https://mcp.bizplug.ai/plugin/associations` |
| [Childcare & Daycare](plugins/childcare) | Schedule tours and enrollment calls | `https://mcp.bizplug.ai/plugin/childcare` |
| [Tutoring & Test Prep](plugins/tutoring) | Book tutoring sessions and prep trials | `https://mcp.bizplug.ai/plugin/tutoring` |
| [Universities & Colleges](plugins/universities) | Book campus tours and advising | `https://mcp.bizplug.ai/plugin/universities` |
| [Political Campaigns & Advocacy](plugins/political-campaigns) | Volunteer and event sign-ups | `https://mcp.bizplug.ai/plugin/political-campaigns` |
| [Public Transit & Mobility](plugins/public-transit) | Service alerts and issue reports | `https://mcp.bizplug.ai/plugin/public-transit` |
| [Coworking & Offices](plugins/coworking) | Desk and office availability and rates | `https://mcp.bizplug.ai/plugin/coworking` |

### Travel & leisure

| Industry | What it does | MCP server URL |
| --- | --- | --- |
| [Travel & Tourism](plugins/travel) | Tour and trip availability with price per traveller | `https://mcp.bizplug.ai/plugin/travel` |
| [Airlines](plugins/airlines) | Flight status and support requests | `https://mcp.bizplug.ai/plugin/airlines` |
| [Cruise Lines](plugins/cruise-lines) | Sailing availability and cabin pricing | `https://mcp.bizplug.ai/plugin/cruise-lines` |
| [Vacation Rentals](plugins/vacation-rentals) | Home availability, nightly rates and booking | `https://mcp.bizplug.ai/plugin/vacation-rentals` |
| [Tour Operators](plugins/tour-operators) | Tour departures, price per traveller and trips day by day | `https://mcp.bizplug.ai/plugin/tour-operators` |
| [Destination Management Companies](plugins/dmc) | Tailor-made packages with a price breakdown, and proposals day by day | `https://mcp.bizplug.ai/plugin/dmc` |
| [Car Rental](plugins/car-rental) | Vehicle availability and rental price | `https://mcp.bizplug.ai/plugin/car-rental` |
| [Theme Parks & Attractions](plugins/theme-parks) | Ticket availability for a visit date | `https://mcp.bizplug.ai/plugin/theme-parks` |
| [Museums & Galleries](plugins/museums) | Timed tickets and exhibitions | `https://mcp.bizplug.ai/plugin/museums` |
| [Casinos & Gaming](plugins/casinos) | Hotel rooms and show tickets (no wagering) | `https://mcp.bizplug.ai/plugin/casinos` |
| [Sports Teams & Venues](plugins/sports-teams) | Seat availability and ticket requests | `https://mcp.bizplug.ai/plugin/sports-teams` |
| [Wedding & Events Pros](plugins/wedding-services) | Check your date and request a consultation | `https://mcp.bizplug.ai/plugin/wedding-services` |
| [Photography & Creative](plugins/photography) | Book a shoot or consultation | `https://mcp.bizplug.ai/plugin/photography` |
| [Activity Calendar](plugins/activity-calendar) | Activities by date, with places per person | `https://mcp.bizplug.ai/plugin/activity-calendar` |
| [Marinas & Boat Slips](plugins/marinas) | Visitor berths by the night and harbour services | `https://mcp.bizplug.ai/plugin/marinas` |
| [Tourism Bureaus & Destinations](plugins/tourism-bureaus) | Places to stay and things to do, with booking requests | `https://mcp.bizplug.ai/plugin/tourism-bureaus` |

### Finance & B2B

| Industry | What it does | MCP server URL |
| --- | --- | --- |
| [Financial Services & Banking](plugins/financial-services) | Book a banker or advisor meeting | `https://mcp.bizplug.ai/plugin/financial-services` |
| [Insurance](plugins/insurance) | Quote request intake | `https://mcp.bizplug.ai/plugin/insurance` |
| [Legal Services](plugins/legal) | Book an initial consultation | `https://mcp.bizplug.ai/plugin/legal` |
| [Lending & Mortgages](plugins/lending) | Book a loan or mortgage consultation | `https://mcp.bizplug.ai/plugin/lending` |
| [Wealth & Investing](plugins/wealth) | Book an intro meeting with an advisor | `https://mcp.bizplug.ai/plugin/wealth` |
| [Crypto & Fintech](plugins/crypto) | Fee estimate and onboarding request | `https://mcp.bizplug.ai/plugin/crypto` |
| [Tax & Accounting](plugins/accounting) | Book a tax or bookkeeping consult | `https://mcp.bizplug.ai/plugin/accounting` |
| [Chambers of Commerce & Business Associations](plugins/chambers) | Chamber information, membership enquiries and member businesses | `https://mcp.bizplug.ai/plugin/chambers` |
| [Recruiting & Staffing](plugins/recruiting) | Book an intro call for employers or candidates | `https://mcp.bizplug.ai/plugin/recruiting` |
| [HR & Internal Comms](plugins/hr-comms) | Book a platform demo | `https://mcp.bizplug.ai/plugin/hr-comms` |
| [Cybersecurity](plugins/cybersecurity) | Book a security assessment call | `https://mcp.bizplug.ai/plugin/cybersecurity` |
| [Developer Tools](plugins/dev-tools) | Book a technical demo or onboarding | `https://mcp.bizplug.ai/plugin/dev-tools` |

### Home & trades

| Industry | What it does | MCP server URL |
| --- | --- | --- |
| [HVAC & Heating/Cooling](plugins/hvac) | Instant estimate and service visit request | `https://mcp.bizplug.ai/plugin/hvac` |
| [Plumbing](plugins/plumbing) | Estimate and book a plumber | `https://mcp.bizplug.ai/plugin/plumbing` |
| [Electricians](plugins/electricians) | Estimate and book an electrician | `https://mcp.bizplug.ai/plugin/electricians` |
| [Cleaning Services](plugins/cleaning) | Price a clean by home size and book | `https://mcp.bizplug.ai/plugin/cleaning` |
| [Landscaping & Lawn](plugins/landscaping) | Estimate lawn and landscape work | `https://mcp.bizplug.ai/plugin/landscaping` |
| [Pest Control](plugins/pest-control) | Estimate treatment and request a visit | `https://mcp.bizplug.ai/plugin/pest-control` |
| [Moving & Storage](plugins/moving-storage) | Moving estimate and storage rates | `https://mcp.bizplug.ai/plugin/moving-storage` |
| [Solar & Clean Energy](plugins/solar) | Rough system estimate and site survey request | `https://mcp.bizplug.ai/plugin/solar` |
| [Property Management](plugins/property-management) | Maintenance requests and status | `https://mcp.bizplug.ai/plugin/property-management` |

---

Published by Bart Cant - msg2ai under the [MIT License](LICENSE). BizPlug is built and run by msg2ai (https://msg2.ai) and is not affiliated with OpenAI. ChatGPT is a trademark of OpenAI.
