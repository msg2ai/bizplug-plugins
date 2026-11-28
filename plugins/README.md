# Plug-in packages

BizPlug's plug-ins, one folder each: the 89 industry plug-ins and 2 startup directories. These folders are generated from the BizPlug website on each release, so please do not change them. Plug-ins from collaborators are in [`community/plugins/`](../community); to add yours, see [Contribute a plug-in](#contribute-a-plug-in). To propose a new industry, see [INDUSTRIES.md](../INDUSTRIES.md).

## What is in a package

```
plugins/<slug>/
  README.md                    what the plug-in does, its tools and what changed in each version
  plugin.json                  name, description, starter prompts and review test cases
  mcp.json                     the plug-in's MCP server URL (streamable HTTP, no sign-in)
  assets/icon.png              the plug-in's logo
  data/requirements.json       the datasets a business provides, column by column
  data/templates/*.csv         a CSV template per dataset, with an example row
  data/AGENT_INSTRUCTIONS.md   how a person or an AI agent collects and submits that data
```

## Set up a plug-in for your business

1. Find your industry below and read its `README.md` and `data/requirements.json`.
2. Sign up at https://www.bizplug.ai/portal and add that industry's plug-in. Pick a card theme and a menu layout there if you like.
3. Fill in the CSV templates from `data/templates/` with your own information and upload them in the portal, or give `data/AGENT_INSTRUCTIONS.md` to an AI agent to collect them.
4. Request a test deploy. BizPlug publishes your plug-in to a test address; try it in ChatGPT ([SETUP.md](../SETUP.md)), then request production.

To try a plug-in first, add its MCP server URL as a connector in ChatGPT developer mode: the industry URL serves every business in that industry, and the assistant asks which one you mean.

## The industry plug-ins

### Business essentials

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`events/`](events) | Events & Conferences: Venue availability, pricing and date holds | `https://mcp.bizplug.ai/plugin/events` |
| [`hospitality/`](hospitality) | Hospitality & Hotels: Room availability, rates and booking requests | `https://mcp.bizplug.ai/plugin/hospitality` |
| [`agencies/`](agencies) | Marketing Agencies: Book a strategy call | `https://mcp.bizplug.ai/plugin/agencies` |
| [`nonprofits/`](nonprofits) | Nonprofits & Charities: Volunteer and donation requests | `https://mcp.bizplug.ai/plugin/nonprofits` |
| [`saas/`](saas) | SaaS & Software: Book a product demo | `https://mcp.bizplug.ai/plugin/saas` |
| [`consulting/`](consulting) | Consulting & Professional Services: Book a discovery call | `https://mcp.bizplug.ai/plugin/consulting` |

### Retail & food

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`retail/`](retail) | Retail & E-commerce: Product search and reserve in store | `https://mcp.bizplug.ai/plugin/retail` |
| [`restaurants/`](restaurants) | Restaurants & Food Service: Order ahead and takeaway | `https://mcp.bizplug.ai/plugin/restaurants` |
| [`coffee-shops/`](coffee-shops) | Coffee Shops & Cafes: Mobile order-ahead for pickup | `https://mcp.bizplug.ai/plugin/coffee-shops` |
| [`bars-nightlife/`](bars-nightlife) | Bars & Nightlife: Table and guest-list requests | `https://mcp.bizplug.ai/plugin/bars-nightlife` |
| [`catering/`](catering) | Catering & Events: Catering price by headcount | `https://mcp.bizplug.ai/plugin/catering` |
| [`food-delivery/`](food-delivery) | Food Delivery: Delivery orders | `https://mcp.bizplug.ai/plugin/food-delivery` |
| [`meal-kits/`](meal-kits) | Meal Kits & Subscriptions: Pick a plan and order a weekly box | `https://mcp.bizplug.ai/plugin/meal-kits` |
| [`grocery/`](grocery) | Grocery & Supermarkets: Build a pickup or delivery list | `https://mcp.bizplug.ai/plugin/grocery` |
| [`ghost-kitchens/`](ghost-kitchens) | Ghost & Cloud Kitchens: Order from a cloud-kitchen brand | `https://mcp.bizplug.ai/plugin/ghost-kitchens` |
| [`fashion/`](fashion) | Fashion & Apparel: Find sizes and reserve for try-on | `https://mcp.bizplug.ai/plugin/fashion` |
| [`electronics/`](electronics) | Electronics & Gadgets: Check stock and reserve a gadget | `https://mcp.bizplug.ai/plugin/electronics` |
| [`furniture/`](furniture) | Furniture & Home Goods: Browse pieces and request an order | `https://mcp.bizplug.ai/plugin/furniture` |
| [`beauty-ecommerce/`](beauty-ecommerce) | Beauty E-commerce: Shop products and place an order | `https://mcp.bizplug.ai/plugin/beauty-ecommerce` |
| [`subscriptions/`](subscriptions) | Subscription Boxes: Choose a box and start a subscription request | `https://mcp.bizplug.ai/plugin/subscriptions` |
| [`florists/`](florists) | Florists & Flower Delivery: Bouquets for pickup or delivery | `https://mcp.bizplug.ai/plugin/florists` |
| [`convenience-stores/`](convenience-stores) | Convenience & C-Stores: Reserve items for quick pickup | `https://mcp.bizplug.ai/plugin/convenience-stores` |
| [`restaurant-reservations/`](restaurant-reservations) | Restaurant Reservations: Table reservations | `https://mcp.bizplug.ai/plugin/restaurant-reservations` |

### Property & auto

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`real-estate/`](real-estate) | Real Estate: Request property showings | `https://mcp.bizplug.ai/plugin/real-estate` |
| [`home-services/`](home-services) | Local & Home Services: Estimate a local home service | `https://mcp.bizplug.ai/plugin/home-services` |
| [`automotive/`](automotive) | Automotive & Dealerships: Book service and test drives | `https://mcp.bizplug.ai/plugin/automotive` |

### Health & wellness

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`healthcare/`](healthcare) | Healthcare & Clinics: Find and request appointments | `https://mcp.bizplug.ai/plugin/healthcare` |
| [`fitness/`](fitness) | Fitness & Gyms: Book classes, trials and tours | `https://mcp.bizplug.ai/plugin/fitness` |
| [`beauty/`](beauty) | Beauty & Salons: Book salon services with a stylist | `https://mcp.bizplug.ai/plugin/beauty` |
| [`dental/`](dental) | Dental Practices: Book cleanings, exams and consults | `https://mcp.bizplug.ai/plugin/dental` |
| [`optometry/`](optometry) | Optometry & Eye Care: Book eye exams and fittings | `https://mcp.bizplug.ai/plugin/optometry` |
| [`dermatology/`](dermatology) | Dermatology & Skin: Book skin-care visits | `https://mcp.bizplug.ai/plugin/dermatology` |
| [`chiropractic/`](chiropractic) | Chiropractic & PT: Book adjustments and therapy sessions | `https://mcp.bizplug.ai/plugin/chiropractic` |
| [`mental-health/`](mental-health) | Mental Health & Therapy: Request an intake or session | `https://mcp.bizplug.ai/plugin/mental-health` |
| [`veterinary/`](veterinary) | Veterinary & Pet Care: Book pet appointments | `https://mcp.bizplug.ai/plugin/veterinary` |
| [`pharmacy/`](pharmacy) | Pharmacies: Store services and callback requests | `https://mcp.bizplug.ai/plugin/pharmacy` |
| [`med-spa/`](med-spa) | Med Spas & Aesthetics: Book aesthetic treatments and consults | `https://mcp.bizplug.ai/plugin/med-spa` |
| [`senior-care/`](senior-care) | Senior Care & Communities: Schedule community tours | `https://mcp.bizplug.ai/plugin/senior-care` |
| [`home-health/`](home-health) | Home Health & Hospice: Request a care assessment | `https://mcp.bizplug.ai/plugin/home-health` |

### Community & public

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`education/`](education) | Education & Schools: Book campus visits and info sessions | `https://mcp.bizplug.ai/plugin/education` |
| [`logistics/`](logistics) | Logistics & Delivery: Shipping rate estimate and pickup request | `https://mcp.bizplug.ai/plugin/logistics` |
| [`government/`](government) | Government & Public Sector: Service requests and case status | `https://mcp.bizplug.ai/plugin/government` |
| [`utilities/`](utilities) | Utilities & Energy: Outage and service-request status | `https://mcp.bizplug.ai/plugin/utilities` |
| [`telecom/`](telecom) | Telecom & ISPs: Compare plans and request service | `https://mcp.bizplug.ai/plugin/telecom` |
| [`religious-orgs/`](religious-orgs) | Religious Organizations: RSVP to services and events, book pastoral time | `https://mcp.bizplug.ai/plugin/religious-orgs` |
| [`associations/`](associations) | Membership Associations: Membership applications and renewals | `https://mcp.bizplug.ai/plugin/associations` |
| [`childcare/`](childcare) | Childcare & Daycare: Schedule tours and enrollment calls | `https://mcp.bizplug.ai/plugin/childcare` |
| [`tutoring/`](tutoring) | Tutoring & Test Prep: Book tutoring sessions and prep trials | `https://mcp.bizplug.ai/plugin/tutoring` |
| [`universities/`](universities) | Universities & Colleges: Book campus tours and advising | `https://mcp.bizplug.ai/plugin/universities` |
| [`political-campaigns/`](political-campaigns) | Political Campaigns & Advocacy: Volunteer and event sign-ups | `https://mcp.bizplug.ai/plugin/political-campaigns` |
| [`public-transit/`](public-transit) | Public Transit & Mobility: Service alerts and issue reports | `https://mcp.bizplug.ai/plugin/public-transit` |
| [`coworking/`](coworking) | Coworking & Offices: Desk and office availability and rates | `https://mcp.bizplug.ai/plugin/coworking` |

### Travel & leisure

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`travel/`](travel) | Travel & Tourism: Tour and trip availability with price per traveller | `https://mcp.bizplug.ai/plugin/travel` |
| [`airlines/`](airlines) | Airlines: Flight status and support requests | `https://mcp.bizplug.ai/plugin/airlines` |
| [`cruise-lines/`](cruise-lines) | Cruise Lines: Sailing availability and cabin pricing | `https://mcp.bizplug.ai/plugin/cruise-lines` |
| [`vacation-rentals/`](vacation-rentals) | Vacation Rentals: Home availability, nightly rates and booking | `https://mcp.bizplug.ai/plugin/vacation-rentals` |
| [`tour-operators/`](tour-operators) | Tour Operators: Tour departures, price per traveller and trips day by day | `https://mcp.bizplug.ai/plugin/tour-operators` |
| [`dmc/`](dmc) | Destination Management Companies: Tailor-made packages with a price breakdown, and proposals day by day | `https://mcp.bizplug.ai/plugin/dmc` |
| [`car-rental/`](car-rental) | Car Rental: Vehicle availability and rental price | `https://mcp.bizplug.ai/plugin/car-rental` |
| [`theme-parks/`](theme-parks) | Theme Parks & Attractions: Ticket availability for a visit date | `https://mcp.bizplug.ai/plugin/theme-parks` |
| [`museums/`](museums) | Museums & Galleries: Timed tickets and exhibitions | `https://mcp.bizplug.ai/plugin/museums` |
| [`casinos/`](casinos) | Casinos & Gaming: Hotel rooms and show tickets (no wagering) | `https://mcp.bizplug.ai/plugin/casinos` |
| [`sports-teams/`](sports-teams) | Sports Teams & Venues: Seat availability and ticket requests | `https://mcp.bizplug.ai/plugin/sports-teams` |
| [`wedding-services/`](wedding-services) | Wedding & Events Pros: Check your date and request a consultation | `https://mcp.bizplug.ai/plugin/wedding-services` |
| [`photography/`](photography) | Photography & Creative: Book a shoot or consultation | `https://mcp.bizplug.ai/plugin/photography` |
| [`activity-calendar/`](activity-calendar) | Activity Calendar: Activities by date, with places per person | `https://mcp.bizplug.ai/plugin/activity-calendar` |
| [`marinas/`](marinas) | Marinas & Boat Slips: Visitor berths by the night and harbour services | `https://mcp.bizplug.ai/plugin/marinas` |
| [`tourism-bureaus/`](tourism-bureaus) | Tourism Bureaus & Destinations: Places to stay and things to do, with booking requests | `https://mcp.bizplug.ai/plugin/tourism-bureaus` |

### Finance & B2B

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`financial-services/`](financial-services) | Financial Services & Banking: Book a banker or advisor meeting | `https://mcp.bizplug.ai/plugin/financial-services` |
| [`insurance/`](insurance) | Insurance: Quote request intake | `https://mcp.bizplug.ai/plugin/insurance` |
| [`legal/`](legal) | Legal Services: Book an initial consultation | `https://mcp.bizplug.ai/plugin/legal` |
| [`lending/`](lending) | Lending & Mortgages: Book a loan or mortgage consultation | `https://mcp.bizplug.ai/plugin/lending` |
| [`wealth/`](wealth) | Wealth & Investing: Book an intro meeting with an advisor | `https://mcp.bizplug.ai/plugin/wealth` |
| [`crypto/`](crypto) | Crypto & Fintech: Fee estimate and onboarding request | `https://mcp.bizplug.ai/plugin/crypto` |
| [`accounting/`](accounting) | Tax & Accounting: Book a tax or bookkeeping consult | `https://mcp.bizplug.ai/plugin/accounting` |
| [`chambers/`](chambers) | Chambers of Commerce & Business Associations: Chamber information, membership enquiries and member businesses | `https://mcp.bizplug.ai/plugin/chambers` |
| [`recruiting/`](recruiting) | Recruiting & Staffing: Book an intro call for employers or candidates | `https://mcp.bizplug.ai/plugin/recruiting` |
| [`hr-comms/`](hr-comms) | HR & Internal Comms: Book a platform demo | `https://mcp.bizplug.ai/plugin/hr-comms` |
| [`cybersecurity/`](cybersecurity) | Cybersecurity: Book a security assessment call | `https://mcp.bizplug.ai/plugin/cybersecurity` |
| [`dev-tools/`](dev-tools) | Developer Tools: Book a technical demo or onboarding | `https://mcp.bizplug.ai/plugin/dev-tools` |

### Home & trades

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`hvac/`](hvac) | HVAC & Heating/Cooling: Instant estimate and service visit request | `https://mcp.bizplug.ai/plugin/hvac` |
| [`plumbing/`](plumbing) | Plumbing: Estimate and book a plumber | `https://mcp.bizplug.ai/plugin/plumbing` |
| [`electricians/`](electricians) | Electricians: Estimate and book an electrician | `https://mcp.bizplug.ai/plugin/electricians` |
| [`cleaning/`](cleaning) | Cleaning Services: Price a clean by home size and book | `https://mcp.bizplug.ai/plugin/cleaning` |
| [`landscaping/`](landscaping) | Landscaping & Lawn: Estimate lawn and landscape work | `https://mcp.bizplug.ai/plugin/landscaping` |
| [`pest-control/`](pest-control) | Pest Control: Estimate treatment and request a visit | `https://mcp.bizplug.ai/plugin/pest-control` |
| [`moving-storage/`](moving-storage) | Moving & Storage: Moving estimate and storage rates | `https://mcp.bizplug.ai/plugin/moving-storage` |
| [`solar/`](solar) | Solar & Clean Energy: Rough system estimate and site survey request | `https://mcp.bizplug.ai/plugin/solar` |
| [`property-management/`](property-management) | Property Management: Maintenance requests and status | `https://mcp.bizplug.ai/plugin/property-management` |

## Startup directories

| Folder | Plug-in | MCP server URL |
| --- | --- | --- |
| [`websummit-qatar/`](websummit-qatar) | Web Summit Qatar Startups for Investors | `https://mcp.bizplug.ai/plugin/startups/websummit-qatar` |
| [`gener8tor-charlotte/`](gener8tor-charlotte) | gener8tor Charlotte Startups for Investors | `https://mcp.bizplug.ai/plugin/startups/gener8tor-charlotte` |

## Contribute a plug-in

A plug-in of your own (an MCP server you built) is added in `community/plugins/<name>/`, never here. [CONTRIBUTING.md](../CONTRIBUTING.md) says what it must contain.

1. Fork https://github.com/msg2ai/bizplug-plugins and add your package as `community/plugins/<name>/`, with the same layout as the packages above: at least `plugin.json`, `mcp.json` and `README.md`, and `data/` only if a business must provide data.
2. Check that it works in ChatGPT developer mode with your MCP server URL ([SETUP.md](../SETUP.md#setup)).
3. Open a pull request against `main` that adds only that folder, and fill in its checklist: who hosts the server, your privacy policy and terms, and a screenshot in ChatGPT. The **Check contributions** workflow checks the package.
4. We review the tools, descriptions, test cases and data handling in the pull request, and merge it once approved.
5. Once merged, it is listed in the [BizPlug marketplace](https://www.bizplug.ai/marketplace) within about fifteen minutes, from its `plugin.json` and `mcp.json`. A business that adds it asks the BizPlug team to set it up with its plug-in, at your own endpoint unless we agree with you to host it.

Not on GitHub? Submit at https://www.bizplug.ai/marketplace#submit instead.
