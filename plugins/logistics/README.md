# BizPlug Logistics & Delivery

Version 0.65.0. Shipping rate estimate and pickup request for logistics & delivery businesses.

- Main function: Shipping rate estimate and pickup request
- MCP server URL: `https://mcp.bizplug.ai/plugin/logistics` (streamable HTTP, no sign-in)
- A business's own plug-in: `https://mcp.bizplug.ai/plugin/logistics/<business>`
- About this plug-in: https://www.bizplug.ai/industries/logistics

## What a customer can do

- **Price estimate**: Get an estimate from the published price list. It is never a final price.
- **Request the job**: Send your request and estimate so the business can confirm a price and a time.
- **Ask a question**: Answers from the business's own information: services, coverage, cut-off times and quote requests.
- **Job status**: Check a request with its reference.
- **Forms**: The business's own forms, such as an application, a registration or a survey, opened with what you already said filled in.
- **Social media**: The latest posts from the business's social media, with their pictures, and where to follow it.
- **Contact the business**: Phone, email, website and opening hours.

## Tools

| Tool | What it does |
| --- | --- |
| `show_menu` | Return this plug-in's menu: what the customer can do here, each with a short title, a one-line description and a question to try. Call it when the customer asks what this can do, asks for a menu or options, or opens without a question. ChatGPT shows the menu as a card with a button and a short form for each option; where there is no card, show the options exactly as returned (same titles, same order). Creates nothing. |
| `get_shipping_estimate` | Work out a price estimate for a shipment from the business's published price list, or list what can be estimated. Creates nothing and is never a final price. |
| `request_pickup` | Send the customer's shipment request and estimate to the business so it can confirm a price and a time. Use only once the customer agrees to send it. |
| `track_shipment` | Look up the status of a request by its reference. |
| `get_business_info` | Answer a general question about this logistics & delivery business using only its published profile: services, coverage, cut-off times and quote requests. Creates nothing. If the profile does not cover the question, say so and use get_contact. |
| `get_contact` | Return the business's published contact details and opening hours for anything the other tools cannot do. |
| `open_form` | Open one of this logistics & delivery business's own forms (an application, registration, survey or intake form it published in Google Forms, Typeform, Jotform, Tally or another form tool) as a link with what the customer already said filled in. Use it when the customer wants to apply, register, sign up, give feedback or do what one of the forms is for. Nothing is submitted: the customer checks the form and submits it on the form tool's page. |
| `my_registration` | Open the customer's own registration with this business in its Ticket Tailor or Humanitix account, after a 6-digit code sent to the email they registered with, and change the name, email or phone on it. Called by the card only. |

## Changes

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

## Files

- `plugin.json`: name, description, starter prompts and review test cases
- `mcp.json`: the plug-in's MCP server URL
- `data/`: the datasets a business provides, with CSV templates and instructions

Generated from the BizPlug website's data files. Do not edit by hand.
