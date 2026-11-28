# Industry plug-ins

BizPlug has a standard plug-in for each of 89 industries. Each one is a package in [`plugins/<slug>/`](plugins), and every business in that industry can get its own copy, built from its own profile. This page explains what an industry plug-in is made of, and how to propose a new industry.

This page is generated with the rest of the repository, so please do not edit it by hand. A new industry is added with a pull request here that adds one file, `community/industries/<slug>.json`: once it is merged, that file is the industry ([below](#add-a-new-industry)). Never add a package to `plugins/` yourself: those folders are generated from the BizPlug website, so one added by hand would be overwritten by the next update.

## What an industry plug-in is

A plug-in is an MCP server, hosted by BizPlug, that answers customers in ChatGPT and Claude from a business's own published information and passes their requests to the business. The business confirms every request itself.

Each package is generated from the website's data files on every update:

```
plugins/<slug>/
  README.md                    what customers can do, the tools and what changed in each version
  plugin.json                  name, description, starter prompts and review test cases
  mcp.json                     the MCP server URL: https://mcp.bizplug.ai/plugin/<slug>
  assets/icon.png              the plug-in's logo
  data/requirements.json       the data files a business provides, column by column
  data/templates/*.csv         a CSV template per data file, with an example row
  data/AGENT_INSTRUCTIONS.md   how a person or an AI agent collects that data
```

Every tool with its inputs, engine by engine, and how to call a plug-in yourself on a sample business, is in [TOOLS.md](TOOLS.md). The definitions are in [`source/`](source): `industry-functions.ts` (each industry's engine, tool names and options), `plugins.ts` (tools, menu and test cases), `plugin-data.ts` (data files and columns) and `plugin-examples.ts` (the example rows).

### Built from an engine

Every industry runs on one of 5 engines. The engine decides the plug-in's three main tools (a look-up, a request and a status check), its menu and the data a business provides. An industry adds its own words: its name, the tool names, what is ordered, booked or requested, a sample customer question, and what the plug-in covers.

Every plug-in also has `show_menu`, `get_business_info`, `get_contact`, `my_registration`, and its data files always include `business.csv`, `services.csv`, `faqs.csv`, `social.csv`. A business that publishes forms of its own (a Google Form, for example) also gets `open_form`, which offers those forms with what the customer already said filled in; without forms, the tool is not listed. A customer's request is always sent to the business, which confirms it; nothing is charged in the chat.

### `order`

Browse a catalog with prices, send a pickup or delivery order, check its status.

- Tools, as Restaurants & Food Service names them: `browse_menu` (Browse and prices), `place_order` (Place the order), `get_order_status` (Order status). The tool names differ from industry to industry.
- Data the engine adds: `catalog.csv` (required).
- 14 industries: Restaurants & Food Service, Coffee Shops & Cafes, Florists & Flower Delivery, Food Delivery, Ghost & Cloud Kitchens, Meal Kits & Subscriptions, Grocery & Supermarkets, Convenience & C-Stores, Retail & E-commerce, Fashion & Apparel, Electronics & Gadgets, Furniture & Home Goods, Beauty E-commerce, Subscription Boxes.

### `stay`

Check what is free for dates and party size with the total price, send a booking request, check its status.

- Tools, as Hospitality & Hotels names them: `check_room_availability` (Availability and price), `request_booking` (Request the booking), `get_booking_status` (Booking status). The tool names differ from industry to industry.
- Data the engine adds: `inventory.csv` (required), `blocked-dates.csv`, `rates.csv`.
- A stay industry is booked one of 3 ways:
  - Booked by the night: Hospitality & Hotels, Casinos & Gaming, Vacation Rentals, Marinas & Boat Slips, Tourism Bureaus & Destinations.
  - Booked by the day, first and last day both counted: Events & Conferences, Car Rental, Coworking & Offices.
  - Booked for one date: Wedding & Events Pros, Bars & Nightlife, Travel & Tourism, Cruise Lines, Theme Parks & Attractions, Museums & Galleries, Sports Teams & Venues, Tour Operators, Activity Calendar.
- Priced per guest instead of per unit: Travel & Tourism, Cruise Lines, Theme Parks & Attractions, Museums & Galleries, Sports Teams & Venues, Tour Operators, Activity Calendar.
- 17 industries: Hospitality & Hotels, Casinos & Gaming, Events & Conferences, Wedding & Events Pros, Bars & Nightlife, Travel & Tourism, Cruise Lines, Theme Parks & Attractions, Museums & Galleries, Sports Teams & Venues, Vacation Rentals, Tour Operators, Car Rental, Coworking & Offices, Activity Calendar, Marinas & Boat Slips, Tourism Bureaus & Destinations.

### `appt`

Find open times on a day, request an appointment, check its status.

- Tools, as Healthcare & Clinics names them: `find_appointment_slots` (Open times), `request_appointment` (Request the appointment), `get_appointment_status` (Request status). The tool names differ from industry to industry.
- Data the engine adds: `bookable.csv` (required), `open-hours.csv` (required).
- 33 industries: Healthcare & Clinics, Dental Practices, Optometry & Eye Care, Dermatology & Skin, Chiropractic & PT, Mental Health & Therapy, Veterinary & Pet Care, Med Spas & Aesthetics, Beauty & Salons, Fitness & Gyms, Automotive & Dealerships, Home Health & Hospice, Senior Care & Communities, Real Estate, Legal Services, Tax & Accounting, Financial Services & Banking, Wealth & Investing, Lending & Mortgages, Tutoring & Test Prep, Childcare & Daycare, Photography & Creative, Education & Schools, Universities & Colleges, Consulting & Professional Services, Marketing Agencies, SaaS & Software, Developer Tools, Cybersecurity, Recruiting & Staffing, HR & Internal Comms, Religious Organizations, Restaurant Reservations.

### `quote`

Work out an estimate from published price rules, request a quote or a visit, check its status.

- Tools, as HVAC & Heating/Cooling names them: `get_service_estimate` (Price estimate), `request_service_visit` (Request the job), `get_job_status` (Job status). The tool names differ from industry to industry.
- Data the engine adds: `price-rules.csv` (required).
- 15 industries: HVAC & Heating/Cooling, Plumbing, Electricians, Local & Home Services, Cleaning Services, Landscaping & Lawn, Pest Control, Solar & Clean Energy, Moving & Storage, Destination Management Companies, Catering & Events, Logistics & Delivery, Insurance, Telecom & ISPs, Crypto & Fintech.

### `track`

Look up a reference the customer already has, send a new request, check its status.

- Tools, as Government & Public Sector names them: `lookup_case_status` (Look up a reference), `submit_service_request` (Send a request), `get_request_status` (Request status). The tool names differ from industry to industry.
- Data the engine adds: `records.csv`.
- 10 industries: Government & Public Sector, Utilities & Energy, Property Management, Nonprofits & Charities, Chambers of Commerce & Business Associations, Membership Associations, Political Campaigns & Advocacy, Airlines, Public Transit & Mobility, Pharmacies.

### Options

A few industries switch on an option that adds tools, menu options and data files. Each option is built by the BizPlug team with its own plug-in version; once it exists, a contributed industry can switch it on too (see [Options in your file](#options-in-your-file)).

| Option | What it adds | Tools | Data files | Industries |
| --- | --- | --- | --- | --- |
| `members` | The business may publish its member businesses. People search them and contact a member directly; nobody introduces or forwards. | `find_members`, `write_to_member` | `members.csv` | Coworking & Offices, Chambers of Commerce & Business Associations |
| `infoFirst` | The menu starts with Ask a question, because the plug-in mainly explains the business. Committees and News & events show when the business published them. | none | `committees.csv`, `news.csv`, `newsletter.csv` | Chambers of Commerce & Business Associations |
| `software` | A software product: the menu is Features, Pricing, Help & guides, Support and Book a demo. | `get_features`, `get_pricing`, `search_help`, `request_support` | `features.csv`, `plans.csv`, `guides.csv` | SaaS & Software |
| `visits` | The business may publish its locations, with tours and day passes. The business confirms each one. | `get_visit_options`, `book_tour`, `request_day_pass` | `locations.csv` | Coworking & Offices |
| `show` | A show or conference that published its programme gets an event guide (agenda, speakers, exhibitors and sponsors, enquiries) instead of the venue's menu. | `get_agenda`, `find_speakers`, `find_exhibitors`, `send_event_enquiry` | `sessions.csv`, `speakers.csv`, `exhibitors.csv`, `sponsors.csv` | Events & Conferences |

31 industries also carry a rule the assistant always follows, shown in their tool descriptions; for example, health plug-ins never give medical advice, and finance plug-ins never ask for account numbers.

### Groups

The website groups the industries like this:

| Group | Industries | For example |
| --- | --- | --- |
| Business essentials | 6 | Events & Conferences, Hospitality & Hotels, Marketing Agencies, Nonprofits & Charities, ... |
| Retail & food | 17 | Retail & E-commerce, Restaurants & Food Service, Coffee Shops & Cafes, Bars & Nightlife, ... |
| Property & auto | 3 | Real Estate, Local & Home Services, Automotive & Dealerships |
| Health & wellness | 13 | Healthcare & Clinics, Fitness & Gyms, Beauty & Salons, Dental Practices, ... |
| Community & public | 13 | Education & Schools, Logistics & Delivery, Government & Public Sector, Utilities & Energy, ... |
| Travel & leisure | 16 | Travel & Tourism, Airlines, Cruise Lines, Vacation Rentals, ... |
| Finance & B2B | 12 | Financial Services & Banking, Insurance, Legal Services, Lending & Mortgages, ... |
| Home & trades | 9 | HVAC & Heating/Cooling, Plumbing, Electricians, Cleaning Services, ... |

Added since the first 81: Tour Operators (`tour-operators`, 2026-11-25), Destination Management Companies (`dmc`, 2026-11-25), Vacation Rentals (`vacation-rentals`, 2026-11-23), Activity Calendar (`activity-calendar`, 2026-11-23), Tourism Bureaus & Destinations (`tourism-bureaus`, 2026-11-23), Florists & Flower Delivery (`florists`, 2026-11-21), Restaurant Reservations (`restaurant-reservations`, 2026-11-21), Chambers of Commerce & Business Associations (`chambers`, 2026-11-18).

## Contributed industries

Added by pull request in this repository; each file in [`community/industries/`](community/industries) is its industry's source.

| Industry | Contributed by | File |
| --- | --- | --- |
| Activity Calendar | BizPlug | [`activity-calendar.json`](community/industries/activity-calendar.json) |
| Marinas & Boat Slips | [Bart Cant](https://github.com/bartrtl) | [`marinas.json`](community/industries/marinas.json) |
| Restaurant Reservations | Bart Cant | [`restaurant-reservations.json`](community/industries/restaurant-reservations.json) |
| Tourism Bureaus & Destinations | BizPlug | [`tourism-bureaus.json`](community/industries/tourism-bureaus.json) |

## Add a new industry

A new industry is one file in this repository, `community/industries/<slug>.json`. You open a pull request that adds it; when the pull request is merged, the file is the industry: BizPlug serves its plug-in, gives it a page on the website and offers it to businesses in the portal. Nobody rebuilds it by hand, and the file stays here as its source: a later pull request that changes the file changes the industry.

An industry added this way runs on one of the engines above, and may switch on options that already exist (below). If it needs something no engine or option does (a new tool, menu option or data file), say so in an issue instead: that is built by the BizPlug team.

### Options in your file

Add `"options": [...]` to your file to switch on capabilities the plug-in already has, each on the engine it was built for. The check refuses an option on another engine, and your pull request's preview shows each option with made-up sample data.

| Option | What it adds | Engine | Built in on |
| --- | --- | --- | --- |
| `members` | The business may publish its member businesses (members.csv): people search them and write to one directly. Tools find_members, write_to_member. | stay or track | Coworking & Offices, Chambers of Commerce |
| `infoFirst` | The menu starts with Ask a question; Committees and News & events when the business publishes them (committees.csv, news.csv, newsletter.csv). | track | Chambers of Commerce |
| `software` | A software product: the menu is Features, Pricing, Help & guides, Support and Book a demo (features.csv, plans.csv, guides.csv). Tools get_features, get_pricing, search_help, request_support. | appt | SaaS & Software |
| `visits` | Locations with tours and day passes (locations.csv). Tools get_visit_options, book_tour, request_day_pass. | stay (span `days`) | Coworking & Offices |
| `show` | A show or conference that publishes its programme gets an event guide: agenda, speakers, exhibitors and sponsors, enquiries (sessions.csv, speakers.csv, exhibitors.csv, sponsors.csv). | stay (span `days`) | Events & Conferences |
| `concierge` | A rental concierge: the host's local picks, area guide and events, house guide, which home fits, a day-by-day stay plan (places.csv, area.csv, events.csv, house.csv). | stay (span `nights`) | Vacation Rentals |
| `tourItineraries` | Trips day by day: published itineraries, and a traveller's own trip by its code (trips.csv, trip_days.csv, trip_items.csv). | stay (span `single`) | Tour Operators |
| `dmcItineraries` | Tailor-made programmes day by day with a price breakdown, and a client's proposal by its code (trips.csv, trip_days.csv, trip_items.csv, trip_prices.csv). | quote | Destination Management Companies |

A business in your industry fills in the option's data files like any other; an option whose files are empty shows nothing.

### Collections in your file

The examples in this and the next two sections come from [`industries/example.json`](industries/example.json), a bike shop that uses each of them.

A collection is a searchable list your industry defines: bikes for sale, climbing routes, recipes, courses, wines, trails. You describe it in your file; BizPlug turns each one into a data file the business fills in (`<key>.csv`), a read-only tool that searches it, a menu option and a screen in the card (search, filter chips, rows or tiles, one entry on its own screen). No code: every value is shown as text, and links and pictures must be https. From plug-in version 0.62.0; at most 3 collections.

```json
"collections": [
  {
    "key": "bikes",
    "tool": "find_bikes",
    "title": "Bikes for sale",
    "noun": "bike",
    "description": "The bikes the shop has in stock, with their type, size and price.",
    "ask": "Do you have a hybrid bike in size M?",
    "layout": "grid",
    "columns": [
      {
        "key": "name",
        "label": "Bike",
        "type": "text",
        "search": true,
        "example": "Trailmaster Hybrid 3"
      },
      {
        "key": "type",
        "label": "Type",
        "type": "choice",
        "filter": true,
        "example": "Hybrid"
      },
      {
        "key": "size",
        "label": "Frame size",
        "type": "choice",
        "filter": true,
        "example": "M"
      },
      {
        "key": "price",
        "label": "Price",
        "type": "number",
        "example": "649"
      },
      {
        "key": "about",
        "label": "About it",
        "type": "longtext",
        "search": true,
        "example": "An upright hybrid for commuting, with mudguards and a rack."
      },
      {
        "key": "photo",
        "label": "Photo",
        "type": "image",
        "example": "https://www.example.com/bikes/trailmaster-3.jpg"
      },
      {
        "key": "page",
        "label": "Product page",
        "type": "link",
        "example": "https://www.example.com/bikes/trailmaster-3"
      }
    ],
    "sample": [
      {
        "name": "Trailmaster Hybrid 3",
        "type": "Hybrid",
        "size": "M",
        "price": "649",
        "about": "An upright hybrid for commuting, with mudguards and a rack."
      },
      {
        "name": "Swift Road 105",
        "type": "Road",
        "size": "L",
        "price": "1199",
        "about": "A light road bike with 22 gears."
      },
      {
        "name": "Little Rider 20",
        "type": "Kids",
        "size": "S",
        "price": "289",
        "about": "A 20-inch bike for ages 6 to 9."
      }
    ]
  }
]
```

| Field | What it holds |
| --- | --- |
| `key` | The data file's name (`key.csv`), lower case; not a file the plug-in already has |
| `tool` | The search tool's name, lower case with underscores; not a tool the plug-in already has |
| `title`, `noun` | The menu option's title (30 characters) and one entry in the singular |
| `description`, `ask` | What the list is (200 characters) and a question a customer would ask about it |
| `layout` | `list` (rows) or `grid` (tiles with the first `image` column) |
| `columns` | 2 to 12; the first is always `{ "key": "name", "type": "text" }`. `type`: `text`, `longtext`, `choice`, `number`, `date`, `link`, `image`. `search` on text, longtext or choice columns; `filter` on up to 2 choice columns (they become chips). Every column has an `example`: the template's example row |
| `sample` | Optional: 1 to 8 made-up rows for your pull request's preview and the sample business |

A collection lists things, not people: the check refuses columns for contact or personal details (email, phone, ID or account numbers, health). Your pull request's preview fills each collection with your `sample` rows (or the example row), so you can try the search in ChatGPT.

### Your industry's own words

The engine and the options name things in general words ("Open times", "Request the appointment"). Your file can name them in your customers' words, add rules, and suggest a card theme. From plug-in version 0.63.0 for the titles and rules; the theme needs no version.

```json
"menuTitles": {"lookup":"Repair times","request":"Book a repair","status":"Repair status"},
"rules": [
  "Never promise a repair is finished by a time; the workshop confirms it.",
  "Bikes for sale are as the shop lists them; the shop confirms stock and the price."
],
"cardTheme": "forest"
```

| Field | What it holds |
| --- | --- |
| `menuTitles` | A menu option's kind and its title in your words, at most 30 characters each. Kinds: `lookup`, `request`, `status` (the engine's three steps) and those of the options (`match`, `house`, `explore`, `members`…); the check lists them all. The tool the option calls takes the same title |
| `rules` | 1 to 5 more rules the assistant always follows, at most 300 characters each, after `rule` |
| `cardTheme` | A theme from [THEMES.md](THEMES.md) for the industry's businesses that chose no colours of their own |

When your industry switches on the `concierge` option, its answers speak of "the host", "homes" and "the house guide". Name them in your industry's words with `nouns` (from plug-in version 0.65.0), lower case, as they are used inside sentences:

```json
"nouns": { "host": "marina", "home": "berth", "homes": "berths", "houseGuide": "berth guide" }
```

`homes` defaults to `home` with an s, and `houseGuide` to `home` and "guide".

### Request forms in your file

Your industry can give every business a few request forms of its own, such as a warranty claim, a group enquiry or a trade-in. They use the same format as the Form Tool a business uses for its own forms: a tool name (`key`), a `title`, `when` to offer it, up to 10 `fields` and an optional `done` sentence. From plug-in version 0.64.0; at most 3.

```json
"forms": [
  {
    "key": "send_warranty_claim",
    "title": "Warranty claim",
    "when": "When a bike or part bought from the shop broke within its warranty.",
    "fields": [
      {
        "key": "bike",
        "label": "Bike or part",
        "type": "text",
        "required": true
      },
      {
        "key": "bought",
        "label": "When you bought it",
        "type": "date"
      },
      {
        "key": "problem",
        "label": "What went wrong",
        "type": "textarea",
        "required": true
      },
      {
        "key": "receipt",
        "label": "Do you have the receipt?",
        "type": "boolean"
      }
    ],
    "done": "The workshop replies within two working days."
  }
]
```

Field types: `text`, `textarea`, `select`, `number`, `date`, `time`, `boolean`; a `select` has 2 to 12 `options`. A form goes only to the business's own channels (its inbox, webhook, Slack or another destination), never to BizPlug, and is offered only to a business that has set one up; your pull request's sample business shows it and sends nothing. The check refuses a form that asks for payment card details, passwords, identity or bank numbers, or health details, or that says "BizPlug".

### First: does an existing industry fit?

Most businesses already have their industry here, often under another name. An industry is a kind of plug-in, not a business: every business that uses one gets its own plug-in, with its own name, summary, services, prices, hours, colours and menu layout, built from its own profile. So a dog groomer uses Veterinary & Pet Care or Beauty & Salons, a yoga studio uses Fitness & Gyms, and a vegan restaurant uses Restaurants & Food Service; none of them needs a new industry.

A new industry is right only when the existing ones would be wrong for its customers: what they mainly do (order, book dates, book a time, ask for a quote, follow a request) or the words of the plug-in (what is booked or ordered, its tools, its rules) do not fit any industry here. A different name, a niche, a city or a type of customer is not enough.

1. Look through the tables in the [README](README.md#the-89-industry-plug-ins) and the groups above, and search this page for the words your customers use.
2. Run the check below on your file: it lists the existing industries that look most like yours. Read each one's package in `plugins/<slug>/` and try it on its sample business.
3. If one fits, there is nothing to add here: the business signs up at https://www.bizplug.ai/portal, picks that industry, and gets its own plug-in. Close to fitting but missing something (a field, a tool, a menu option)? Ask for it with the [Propose a new industry](https://github.com/msg2ai/bizplug-plugins/issues/new?template=new-industry.yml) form, saying which industry it is for. The team then decides whether to add it to that industry, where every business in it would get it.
4. If none fits, say in your pull request which one is closest and what a customer does in yours that it cannot. The team does not merge an industry that an existing one already covers.

### With a pull request

[![Add a new industry to BizPlug, step by step (1:31, video)](assets/videos/add-a-new-industry-poster.jpg)](https://www.bizplug.ai/how-to/developers/add-theme-layout-industry#add-a-new-industry)

**Watch it step by step** (1:31, no sound): [play it on the how-to page](https://www.bizplug.ai/how-to/developers/add-theme-layout-industry#add-a-new-industry), or [download the video](assets/videos/add-a-new-industry.mp4). It shows every command below and what it prints.

You need a GitHub account, Git, and Node.js 18 or later. Nothing else: no account with BizPlug, no keys, no server of your own.

**1. Look at what your industry will get.** Pick the engine that fits what customers mainly want to do (the engines are above). [TOOLS.md](TOOLS.md) shows that engine's three tools and their exact inputs: your industry gets the same inputs under tool names you choose. Try an industry on the same engine first, on its sample business, which answers like a real one and never sends anything:

```bash
git clone https://github.com/msg2ai/bizplug-plugins && cd bizplug-plugins
npx tsx industries/test-industry.ts --plugin https://mcp.bizplug.ai/plugin/coffee-shops/demo-cafe
```

**2. Write your industry file.** Fork the repository (if your fork is older, update it first with **Sync fork** on its GitHub page; syncing from the command line asks for the `workflow` permission, `gh auth refresh -s workflow`, because this repository's workflows change), create a branch (for example `industry/bicycle-shops`) and add `community/industries/<slug>.json`, named after its `slug`, in the format below. Copy [`industries/example.json`](industries/example.json) to start.

**Lists to pick from.** [`industries/industry.schema.json`](industries/industry.schema.json) describes the file for editors. Keep the example's first line, `"$schema"`, which points to it, and open your file in VS Code or in github.dev (press `.` on any page of this repository): each field offers its allowed values (engines, groups, icons, colours, options, menu kinds, column and field types) as you type, and a wrong value is underlined. The schema is written from the same lists as the check; the check still has the last word, since it also checks what a schema cannot, such as an option on the wrong engine.

**3. Check it** from the root of your copy, and fix what it reports. When it passes, it also lists the existing industries most like yours, as a warning: read them again before you go on.

```bash
npx tsx industries/check-industry.ts community/industries/<slug>.json
```

**4. Open a pull request** against `main` that adds only that file, and fill in the industry part of its checklist. Two things then happen on their own:

- The **Check contributions** workflow runs the same check.
- The **Test industry proposals** workflow builds your industry as a real plug-in on the test server, at `https://mcp-test.bizplug.ai/plugin/proposal/<pull request number>`, runs the test below against it, and posts the result as a comment on your pull request. Each push updates the comment. On your first pull request, GitHub may wait for a maintainer to approve the workflows.

**5. Try your industry yourself.** The address in the comment is a working plug-in for a sample business made from your file, with your `example` item first. Nothing it does reaches anyone: a sample business never sends a request.

- In ChatGPT: open Settings, then Apps & Connectors, turn on developer mode, create a connector with that address, and ask it what it can do. Try your `ask` question.
- From your terminal, the same test the workflow runs:

```bash
npx tsx industries/test-industry.ts <pull request number>
```

It lists the tools and checks each step: the tool list and definitions, the menu, the look-up (with your example first), a request and its reference, the status of that reference, a request with nothing filled in (it must be refused), and the business's information and contact details. Paste its output in your pull request.

**6. Review and merge.** The BizPlug team reviews the file in the pull request and merges it once it is agreed. Merging is the release: see [After your pull request is merged](#after-your-pull-request-is-merged). Your preview stays available while the pull request is open.

```json
{
  "$schema": "https://raw.githubusercontent.com/msg2ai/bizplug-plugins/main/industries/industry.schema.json",
  "slug": "bicycle-shops",
  "name": "Bicycle Shops & Repair",
  "group": "Retail & food",
  "engine": "appt",
  "title": "Repair bookings",
  "tools": {
    "lookup": "find_repair_slots",
    "request": "book_repair",
    "status": "get_repair_status"
  },
  "noun": "repair",
  "ask": "Can you fix a flat tyre today, and what does it cost?",
  "covers": "repairs and prices, bikes for sale, rentals and opening hours",
  "rule": "Never give safety advice on a repair; the mechanic checks the bike.",
  "example": {
    "business": "Spoke & Chain",
    "item": "Flat tyre repair",
    "price": "15.00"
  },
  "who": "Independent bike shops with a repair workshop.",
  "author": "Your name or company",
  "authorUrl": "https://www.example.com",
  "github": "your-github-username",
  "icon": "Bike",
  "accent": "lime",
  "page": {
    "headline": "Repair bookings without the phone ringing in the workshop",
    "problem": "A mechanic with a bike on the stand cannot answer the phone. A plug-in shows your repairs with their prices and the times you take bookings, and sends the repair request to your shop to confirm.",
    "valueProps": [
      "Repairs with prices::Your published repairs, how long each takes and what it costs.",
      "Times you take bookings::Open times within your published hours.",
      "Requests to the workshop::Repair, day and time arrive ready to confirm."
    ],
    "moments": [
      "The flat tyre::A repair requested for this afternoon.",
      "The service before a trip::A full service requested for Saturday.",
      "The rental question::Answered from your profile.",
      "Did you get my booking?::A reference check instead of a call."
    ],
    "journeys": [
      "See repairs and prices",
      "Find a time",
      "Book a repair",
      "Check the booking"
    ],
    "faqs": [
      "Does it say what is wrong with the bike?::No. It never gives safety advice on a repair; the mechanic checks the bike.",
      "Is the repair confirmed in the chat?::No. Your shop confirms every booking."
    ]
  },
  "chat": {
    "business": "Spoke & Chain",
    "answer": [
      "🔧|Flat tyre repair|30 min|$15.00",
      "@Today: 14:00, *15:30, 16:00"
    ],
    "confirm": "15:30, please.",
    "sent": "Flat tyre repair · Today 15:30 · $15.00"
  },
  "collections": [
    {
      "key": "bikes",
      "tool": "find_bikes",
      "title": "Bikes for sale",
      "noun": "bike",
      "description": "The bikes the shop has in stock, with their type, size and price.",
      "ask": "Do you have a hybrid bike in size M?",
      "layout": "grid",
      "columns": [
        {
          "key": "name",
          "label": "Bike",
          "type": "text",
          "search": true,
          "example": "Trailmaster Hybrid 3"
        },
        {
          "key": "type",
          "label": "Type",
          "type": "choice",
          "filter": true,
          "example": "Hybrid"
        },
        {
          "key": "size",
          "label": "Frame size",
          "type": "choice",
          "filter": true,
          "example": "M"
        },
        {
          "key": "price",
          "label": "Price",
          "type": "number",
          "example": "649"
        },
        {
          "key": "about",
          "label": "About it",
          "type": "longtext",
          "search": true,
          "example": "An upright hybrid for commuting, with mudguards and a rack."
        },
        {
          "key": "photo",
          "label": "Photo",
          "type": "image",
          "example": "https://www.example.com/bikes/trailmaster-3.jpg"
        },
        {
          "key": "page",
          "label": "Product page",
          "type": "link",
          "example": "https://www.example.com/bikes/trailmaster-3"
        }
      ],
      "sample": [
        {
          "name": "Trailmaster Hybrid 3",
          "type": "Hybrid",
          "size": "M",
          "price": "649",
          "about": "An upright hybrid for commuting, with mudguards and a rack."
        },
        {
          "name": "Swift Road 105",
          "type": "Road",
          "size": "L",
          "price": "1199",
          "about": "A light road bike with 22 gears."
        },
        {
          "name": "Little Rider 20",
          "type": "Kids",
          "size": "S",
          "price": "289",
          "about": "A 20-inch bike for ages 6 to 9."
        }
      ]
    }
  ],
  "menuTitles": {
    "lookup": "Repair times",
    "request": "Book a repair",
    "status": "Repair status"
  },
  "rules": [
    "Never promise a repair is finished by a time; the workshop confirms it.",
    "Bikes for sale are as the shop lists them; the shop confirms stock and the price."
  ],
  "cardTheme": "forest",
  "forms": [
    {
      "key": "send_warranty_claim",
      "title": "Warranty claim",
      "when": "When a bike or part bought from the shop broke within its warranty.",
      "fields": [
        {
          "key": "bike",
          "label": "Bike or part",
          "type": "text",
          "required": true
        },
        {
          "key": "bought",
          "label": "When you bought it",
          "type": "date"
        },
        {
          "key": "problem",
          "label": "What went wrong",
          "type": "textarea",
          "required": true
        },
        {
          "key": "receipt",
          "label": "Do you have the receipt?",
          "type": "boolean"
        }
      ],
      "done": "The workshop replies within two working days."
    }
  ]
}
```

| Field | What to give |
| --- | --- |
| `slug` | Lower case with hyphens. It becomes the address `mcp.bizplug.ai/plugin/<slug>` and the folder `plugins/<slug>/` |
| `name` | The industry's name as businesses would look for it |
| `group` | One of the groups above |
| `engine` | One of the 5 engines above: `order`, `stay`, `appt`, `quote`, `track` |
| `title` | The plug-in's main function, short |
| `tools` | The names of the look-up, the request and the status check: lower case with underscores, saying what each does |
| `noun` | What is ordered, booked or requested, one short noun |
| `ask` | One question a customer would ask |
| `covers` | The topics the plug-in answers from the business's profile |
| `rule` | Optional: what the plug-in must never do or say in this industry |
| `span`, `perGuest` | Only for `stay`: how it is booked (`nights`, `days`, `single`) and whether it is priced per guest |
| `options` | Optional: capabilities to switch on, from [Options in your file](#options-in-your-file) |
| `collections` | Optional: searchable lists your industry defines, from [Collections in your file](#collections-in-your-file) |
| `menuTitles`, `rules`, `cardTheme`, `nouns` | Optional: your industry's own words, from [Your industry's own words](#your-industrys-own-words) |
| `forms` | Optional: request forms every business gets, from [Request forms in your file](#request-forms-in-your-file) |
| `example` | Optional: a made-up business and one thing it offers, with a price if it has one. It is the example row in the data templates and the first item of the sample business |
| `who` | Optional: who would use it |
| `author` | Who the industry is credited to: your name or your company's |
| `authorUrl`, `github` | Optional: your own https link (site or profile) and your GitHub username. With them, the credit on the industry's page and on [www.bizplug.ai/contributors](https://www.bizplug.ai/contributors) links to you. They are public, like the rest of the file |
| `icon`, `accent` | Optional: the industry's icon on the website (`AppWindow`, `Armchair`, `Award`, `Baby`, `Bike`, `Bitcoin`, `Bone`, `BookOpen`, `Boxes`, `Brain`, `Briefcase`, `Bug`, `Building`, `Building2`, `Bus`, `Calculator`, `Camera`, `Car`, `CarFront`, `ChefHat`, `Church`, `Code`, `Coffee`, `CookingPot`, `Dices`, `Droplets`, `Dumbbell`, `Eye`, `FerrisWheel`, `FileText`, `Flower`, `Gavel`, `Gem`, `GraduationCap`, `HandCoins`, `Handshake`, `Heart`, `HeartHandshake`, `HeartPulse`, `Hotel`, `Landmark`, `Lightbulb`, `Lock`, `Megaphone`, `Palette`, `PawPrint`, `Pill`, `Plane`, `PlaneTakeoff`, `RadioTower`, `Repeat`, `Salad`, `School`, `Scissors`, `ShieldCheck`, `Ship`, `Shirt`, `ShoppingBag`, `ShoppingCart`, `Smartphone`, `Sofa`, `Sparkles`, `SprayCan`, `Stethoscope`, `Store`, `Sun`, `Ticket`, `Trees`, `TrendingUp`, `Trophy`, `Truck`, `UserPlus`, `Users`, `Utensils`, `UtensilsCrossed`, `Vote`, `Wind`, `Wine`, `Wrench`, `Zap`) and its colour (`lime`, `mint`, `aqua`, `amber`, `sky`). Without them it gets a plain icon |
| `added` | Optional: the day it was added, as YYYY-MM-DD. Without it, the day the file was first merged |
| `page` | Optional: the words of the industry's page on the website. `headline`, `problem` (one paragraph), 3 `valueProps`, 4 `moments` and 2 `faqs` written as `"Title::description"`, and 4 short `journeys` (the steps a customer takes). Without it the page uses the engine's general words |
| `chat` | Optional: the worked example on that page. `business`, `ask` (defaults to the field above), `answer` (1 to 8 lines, below), `confirm` (what the customer answers) and `sent` (what the business receives). Without it the page shows a plain example made from `example` |

Each line of `chat.answer` is one element of the plug-in's answer: an option as `emoji|name|detail|price` (detail and price may be empty; `*` in front marks the one the customer picks), open times as `@Friday: 17:00, *19:00`, a status as `!reference|what|state|detail` with progress as `#Step>*Step>Step`, or a short note as `~text`.

What you write must be true of the plug-in: it answers from the business's published profile and sends requests the business confirms. Do not promise live availability, payment in the chat, or anything else the engine does not do; the description of each engine above says what it does.

### With an issue

Not on GitHub, or not sure of the engine? Open the [Propose a new industry](https://github.com/msg2ai/bizplug-plugins/issues/new?template=new-industry.yml) form and fill it in. The team replies in the issue and may ask questions there; an industry that fits an engine is then added as a file here, like any other. What the form asks for:

| Field | What to give | Example |
| --- | --- | --- |
| Name | The industry's name as businesses would look for it | Bicycle shops & repair |
| Group | One of the groups above | Retail & food |
| Engine | The engine that fits the main thing customers want to do, or "Not sure" | `appt`, for booking a repair |
| What is booked, ordered or requested | One short noun | repair service |
| A sample customer question | One question a customer would ask | Can you fix a flat tyre today, and what does it cost? |
| What customers ask about | The topics the plug-in should answer from the business's profile | services and prices, opening hours, rentals, repairs |
| The three steps | The look-up, the request and the status check in customer words | See repair times, book a repair, check the repair |
| Rules | Anything the plug-in must never do or say in this industry | Never give safety advice on a repair |
| Who would use it | Kinds of businesses, or a business you know (optional) | Independent bike shops |

A good proposal fits one of the 5 engines. Options, collections, your own words and request forms can all be written in the file itself (see [Add a new industry](#add-a-new-industry)). If it needs something none of them does, say what in the form: the team then decides whether it needs a new option, which takes longer.

Please do not put customers' personal data, passwords or other secrets in a proposal: issues and pull requests are public.

## After your pull request is merged

1. The **Publish contributed industries** workflow asks the BizPlug website to build again. Each build reads the industry files on `main` and checks them with the same check as your pull request; a file that fails is left out.
2. When that build is live, usually a few minutes later, the industry is on the website: its plug-in answers at `https://mcp.bizplug.ai/plugin/<slug>`, it has a page at https://www.bizplug.ai/industries/<slug>, and businesses can add it in the BizPlug portal (https://www.bizplug.ai/portal). A sample business answers at `.../plugin/<slug>/demo-sample`, so you can try it; it never sends a request.
3. The workflow waits for that build and then comments on your pull request that the industry is live, with its addresses. If the build has not picked the change up after 20 minutes, the comment says so.
4. With the next update of this repository, its package appears in `plugins/<slug>/`, and the README and this page list it with your name. The file in `community/industries/` stays: it is the industry's source.

To change the industry, open a pull request that changes its file. To take it down, open one that removes the file; a business that already has a plug-in in that industry would lose it, so the team agrees that with those businesses first.

If the workflow says the `BIZPLUG_DEPLOY_HOOK` secret is not set, the industry goes live with the website's next deployment instead of straight away.

Questions: info@bizplug.ai.
