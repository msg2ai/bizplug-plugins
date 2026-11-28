// The versions of the industry plug-ins, oldest first. The last entry is the current one (PLUGIN_VERSION in
// plugins.ts; `pnpm plugins:check` fails if they differ). A plug-in published from the client portal is pinned
// to the version it was published with and keeps that version's behaviour until the client upgrades it in the
// portal (portal/publish.ts). Plug-ins served from profile files and the industry-wide plug-ins always run the
// current version.
//
// When a change alters what customers see or what the assistant is told, add a version here with its notes
// and a feature flag, and keep the old behaviour behind the flag in plugin-mcp.ts.

export type PluginFeatures = {
  /** show_menu renders the ChatGPT card with buttons and short forms (widgets/plugin-widget.ts). */
  menuCard: boolean;
  /**
   * The card runs the tools itself and draws their results (a price list, availability, open times, an
   * estimate, a status, a sent request), and results from the chat render in it too.
   */
  cardResults: boolean;
  /**
   * Browsing in the card: tap-to-choose options on the forms (the business's own categories and services, date
   * and party-size shortcuts), category filters and search on a list, an item or option opened on its own
   * screen with Back, the business's published questions and answers in the card, and, on the industry-wide
   * plug-in, choosing the business in the card.
   */
  cardNavigation: boolean;
  /**
   * The business's own WhatsApp number, saved by the client in the portal, is offered with its contact details
   * and after a sent request, as a link that opens a chat with the business's message filled in.
   */
  whatsappContact: boolean;
  /**
   * Buttons to the business's own pages, saved by the client in the portal: a payment page after a sent request;
   * its booking page, directions and review page with its contact details.
   */
  businessLinks: boolean;
  /**
   * The business's buttons where they help: on the menu card, a booking button next to availability and open
   * times, and the assistant is told which ones exist. Presses are counted for the business's dashboard.
   */
  quickActions: boolean;
  /**
   * The assistant is told how the business takes payment: on its own payment page when it saved one (Stripe,
   * PayPal, Square or another), otherwise directly with the business. Never in the chat. get_contact also returns
   * the payment page, so a customer can find it before or without a request.
   */
  paymentAnswers: boolean;
  /**
   * Checkout on the business's own Stripe account (stripe-checkout.ts), when it connected one in the portal: a request
   * with a firm price opens a Stripe Checkout page in the business's name, and the status tool asks Stripe whether it
   * was paid. Test mode only for now.
   */
  stripeCheckout: boolean;
  /**
   * The plug-in says who it is when a client connects: a description, its website and, for BizPlug's own
   * industry-wide plug-ins, the BizPlug logo, with the privacy policy, terms and support contact.
   */
  listingDetails: boolean;
  /**
   * Every tool states all three hints a directory review asks for: whether it only reads, whether what it does
   * cannot be taken back (a request, once sent, cannot), and whether it reaches outside the business's own data.
   */
  fullAnnotations: boolean;
  /**
   * Coworking & Offices only: the business's member businesses in the plug-in (members.csv). find_members
   * searches them by name, kind of business, or what a person needs or offers; the card gets a Members button
   * with search, filters, each member on its own screen and "Find a collaborator". Contact is direct, with the
   * details the business lists for the member: nobody introduces or forwards.
   */
  members: boolean;
  /**
   * The card's pay step: after a request with a checkout, the card shows the total, a Pay now button to the
   * business's checkout and an I've paid button that asks the status tool; card details are only ever entered on the
   * provider's own page.
   */
  payCard: boolean;
  /**
   * A business's plug-in tells ChatGPT its full name: the business's name and what it is (its profile's tagline,
   * or the industry plug-in's name), e.g. "msg2ai – AI messaging for hotels, rentals and events", and its logo as
   * the plug-in's icon when it has one.
   */
  fullName: boolean;
  /**
   * Software products (industry-functions.ts `software`): the menu is Features, Pricing, Help & guides, Support,
   * Book a demo, Request status and Contact, with get_features, get_pricing, search_help and request_support
   * (software.ts). A business listed in ChatGPT's directory shows no plans in Pricing, only its pricing page.
   */
  softwareMenu: boolean;
  /**
   * A business's own plug-in describes only the business to ChatGPT: its instructions no longer present it as
   * "the … plug-in from BizPlug" with BizPlug's address, and its answers no longer ask ChatGPT to mention BizPlug.
   * The card's Contact BizPlug bar stays. Industry-wide plug-ins, which are BizPlug's own, are unchanged.
   */
  businessOnlyInstructions: boolean;
  /**
   * Customer sign-in with Clerk (customer-sign-in.ts): when the business saved its Clerk keys under Integrations,
   * its plug-in answers only customers signed in to the business's own Clerk application. ChatGPT asks them to sign
   * in when they add the plug-in. Without saved keys nothing changes.
   */
  customerSignIn: boolean;
  /**
   * Account tools (app-tools.ts): a software business that runs its own MCP server can offer that server's tools
   * in its plug-in, for customers signed in with its Clerk application. While they are saved, sign-in is asked
   * only for those tools and the rest of the plug-in stays open. Without a saved address nothing changes.
   */
  appTools: boolean;
  /**
   * Account menu (app-tools.ts, AppMenuItem): the buttons a business's own server declares for its account tools
   * show in the card (a new note, a list, a report), with a form or a list for each, so a signed-in customer taps
   * instead of typing. Needs `appTools` and a saved address whose tool list carries a menu.
   */
  accountMenu: boolean;
  /**
   * Send from the account menu (AppMenuItem `open.send`): a record's screen can carry Send by email and Send on
   * WhatsApp buttons, which open the customer's own mail app or WhatsApp with a text from the record filled in.
   * The customer sends it; nothing is sent by the card, BizPlug or the business's server.
   */
  accountSend: boolean;
  /**
   * Card banner (0.21.0): a business's own wide picture at the top of its card's menu, like the event pictures of
   * Visit Pass cards. Set on the plug-in page in the portal (`integrations.banner`) or as `banner` in a profile
   * file, and served through BizPlug's own site (`/banner/<industry>/<slug>`), the only image origin the card
   * declares. Without a banner nothing changes.
   */
  cardBanner: boolean;
  /**
   * Member messages (0.21.0): on a plug-in with members, write_to_member drafts a first message from the person to
   * one member, and the card's member screen offers Write to them. The person sends it from their own email or
   * WhatsApp; nothing is sent by the card, the business or BizPlug.
   */
  memberMessages: boolean;
  /**
   * Events (industry-functions.ts `show`): a show or conference that published its programme (sessions.csv,
   * speakers.csv, exhibitors.csv, sponsors.csv) gets the event guide: the menu is About the event, Agenda, Speakers,
   * Exhibitors & sponsors, Send an enquiry and Contact, with get_agenda, find_speakers, find_exhibitors and
   * send_event_enquiry (event-guide.ts), and no venue holds. A venue, with no programme, keeps the venue menu.
   */
  eventGuide: boolean;
  /**
   * Coworking & Offices (industry-functions.ts `visits`): tours and day passes at the business's locations
   * (locations.csv). get_visit_options lists them, book_tour and request_day_pass ask for one (visits.ts), and the
   * menu gets Book a tour and Day pass for a business that published a location offering them. With the business's
   * msg2ai WhatsApp assistant or its own WhatsApp number saved, the customer continues there with the message to
   * send; otherwise the request is sent like a booking request.
   */
  visits: boolean;
  /**
   * The card also shows in Claude. An MCP Apps host that is not ChatGPT (it names the MCP Apps extension when it
   * connects) is given the card under its own address, served as text/html;profile=mcp-app, and the card talks to
   * that host with JSON-RPC messages instead of window.openai (plugin-widget.ts). ChatGPT is served as before.
   * Without the flag such a host gets the tools and their text answers, and no card.
   */
  claudeCard: boolean;
  /**
   * Password sign-in (password-sign-in.ts): the business chooses which of its plug-in's tools are restricted and
   * keeps a list of emails and passwords. A restricted tool asks the customer to sign in on BizPlug's login page
   * (OAuth, BizPlug as the authorization server); everything else stays open.
   */
  passwordSignIn: boolean;
  /**
   * Showcase (card-logos.ts): the business's logo at the top of its card, each member's logo in the member list, and
   * the business's committees, newsletter, and news and events on their own card screens (get_business_info with a
   * `section`) when it publishes them. Without the flag the card shows the store icon and members without logos.
   */
  showcase: boolean;
  /**
   * Member details (members.ts): a member's screen shows its address and LinkedIn page, and a More about panel with
   * a longer profile, highlights and where they came from, plus Ask ChatGPT for more, which asks the chat; there, and
   * only when the person asks, the assistant may add what it knows or finds, saying it is not from the business's list.
   */
  memberDetails: boolean;
  /**
   * 0.27.0: a hotel's booking screen, after msg2ai's Visit Pass card (stay-booking.ts): a month calendar of free and
   * full nights, adults, children and rooms, room cards with the night-by-night price and how many are left, the
   * hotel's policies, and Book & pay, Book on WhatsApp or Request the booking on each room. A hotel with a Visit
   * Pass door shows the door's live availability. Without the flag the card shows two date fields and a list.
   */
  stayCalendar: boolean;
  /**
   * 0.28.0: an event guide's exhibitors and sponsors with their logos, and a More about panel (the profile from the
   * company's own site, highlights, LinkedIn, sources) with Ask ChatGPT for more, as members have from 0.26.0
   * (event-guide.ts). Speakers are people, so they get no Ask ChatGPT. Without the flag the list has no logos.
   */
  eventDetails: boolean;
  /**
   * 0.29.0: the booking screen by the day (car rental, coworking, venues: a first and a last day) and for one date
   * (tickets: theme parks, museums, cruises, tours, matches; adults and children), with each day at its own published
   * rate (day-rates.ts: weekday rates and rates by date). Without the flag those plug-ins keep the date fields and list.
   */
  dateCalendar: boolean;
  /**
   * 0.30.0: Social media on the card (social-feed.ts, every industry): where to follow the business, its latest posts
   * from public feeds (YouTube, podcasts, blogs, Substack, Medium, Bluesky, Mastodon) and the posts it pinned, with
   * their pictures served through BizPlug. Shown only for a business that published social media.
   */
  socialFeed: boolean;
  /**
   * 0.31.0: menu layouts (card-layouts.ts): the business picks how its card's menu is organised (Tiles, Ask bar,
   * App, Story, or a layout package an independent developer contributed, layouts/<id>/). Without the flag, Tiles.
   */
  menuLayouts: boolean;
  /**
   * 0.32.0: Forms (form-links.ts, every industry): the business's own forms in Google Forms, Microsoft Forms, Typeform,
   * Jotform, Tally and others, as a Forms option on the card and the open_form tool, opened prefilled with what the
   * customer said. Shown only for a business that saved forms.
   */
  formLinks: boolean;
  /**
   * 0.33.0: the BizPlug Form Tool (custom-forms.ts): the forms a business built in the portal are menu options on
   * its card and tools the assistant can call, sent like any other request. Without the flag, none are offered.
   */
  customForms: boolean;
  /**
   * 0.34.0: agent mode (agent-mode.ts): a client with no card that asks for it when it connects, and is neither
   * ChatGPT nor Claude, gets results as declared data, a describe_business tool, and a preview before any request
   * is sent. Without the flag every client is served as before.
   */
  agentMode: boolean;
  /**
   * 0.35.0: a YouTube video in Social media plays inside the card (social-feed.ts `youtubeVideo`): YouTube's own
   * player, built when the customer taps the post, with a Short upright. Only for a business's own plug-in whose
   * social media has YouTube videos; its card may then frame youtube-nocookie.com and nothing else. Without the
   * flag every post opens on its network and the card frames nothing.
   */
  socialVideo: boolean;
  /**
   * 0.36.0: forms first (form-links.ts): for a business that linked forms of its own, the assistant opens the form
   * that fits what the customer wants with open_form instead of sending them a request or enquiry, and the request
   * tools say so. A request tool is used only when no form fits or the customer asks to send it here. Without the
   * flag the forms are offered next to the request tools, with no order between them.
   */
  formsFirst: boolean;
  /**
   * 0.37.0: an order plug-in whose business published a delivery fee (\`delivery_fee\` in business.csv, \`deliveryFee\`
   * on the profile) adds it to a delivery order: its own line, the total, and the checkout. The price list says what
   * delivery costs. Without the flag, or without a fee, a delivery order's total is the items only, as before.
   */
  deliveryFee: boolean;
  /**
   * 0.38.0: card languages (card-languages.ts). A business that chose languages (Arabic, Korean, Japanese) and
   * provided translations gets a language switch on its card: the card's own words from a fixed dictionary, the
   * business's data from its own translations, Arabic right to left. Every tool takes an
   * optional \`language\`; a request still reaches the business in its own language. Without the flag, or without
   * chosen languages, the card is in English only, as before.
   */
  cardLanguages: boolean;
  /**
   * 0.39.0: more card languages (card-languages.ts, \`languagesForVersion\`). Next to Arabic, Korean and Japanese, a
   * business can offer Hindi, Spanish, French, Bengali, Portuguese, Russian, Indonesian, Urdu
   * (right to left), German, Italian and Dutch, with the card's own words for each. Without the flag only Arabic, Korean and Japanese
   * are offered, as in 0.38.0, even when the business provided translations for others.
   */
  moreCardLanguages: boolean;
  /**
   * 0.40.0: checkout for agents (agent-mode.ts \`agentCheckout\`). In agent mode, a sent request with a firm price on a
   * business that takes payment online returns its own checkout link as \`sent.checkout\`, with the rules an agent must
   * follow: the person it acts for approves and pays on the page or in a wallet of their own; the agent never enters
   * payment details it was given; paid only when the status tool says so. The instructions and describe_business say
   * how payment works. Without the flag an agent is told nothing is charged and gets no checkout guidance, as in 0.34.0.
   */
  agentCheckout: boolean;
  /**
   * 0.41.0: booking on WhatsApp beyond hotel nights (engines.ts \`whatsappOther\`). A business with \`whatsappBooking\`
   * in an industry booked by the day or for one date gets Book on WhatsApp too, and in a plug-in booked by the night
   * an option may be booked once for the stay (\`per\` on the option, inventory.csv \`per\`: person or booking), such
   * as an activity next to rooms, priced once and booked on WhatsApp or by request. Without the flag WhatsApp
   * booking is for rooms by the night only and \`per\` is ignored.
   */
  mixedBooking: boolean;
  /**
   * 0.42.0: events with fixed dates (events-list.ts). In an industry booked for one date, an option with \`start\` is
   * an event; a business that lists events gets the events screen from its look-up tool (month by month, its own
   * categories, search, each event's links) in place of the booking calendar, and an event with its own page is
   * opened there instead of requested. Without the flag those fields are ignored.
   */
  eventsList: boolean;
  /**
   * 0.43.0: listing panels (listing-details.ts). On a computer, a listing (an event, a member, an exhibitor or sponsor)
   * opens in a panel beside its list (plugin-widget.ts \`evFly\`, \`companyFly\`) with what the business lists, its links
   * and Ask for more, which sends a question about it to the chat; the business may choose the chat or no Ask for
   * more instead (\`plugin.listing\`). For events the instructions then let the assistant add what it knows or finds,
   * saying which parts are not from the business's calendar. On a phone, and without the flag, nothing changes.
   */
  listingPanel: boolean;
  /**
   * 0.44.0: a Featured row above the events calendar (events-list.ts \`featured\`, plugin-widget.ts \`evFeatured\`): the
   * events the business marks \`featured\` (inventory.csv \`featured\`), soonest first, as a row of large cards to
   * swipe or click through. Without the flag, or with no featured event, the calendar is as in 0.42.0.
   */
  featuredEvents: boolean;
  /**
   * 0.45.0: member, exhibitor and sponsor lists as a grid of tiles (plugin-widget.ts \`.lgrid\`): two columns on a
   * phone, three or four on a computer, each tile with the logo or initials, the name, the level or stand and the
   * category. The description moves to the listing's panel or screen. Without the flag the lists are rows.
   */
  listingGrid: boolean;
  /**
   * 0.46.0: direct offers by the Vacation Rental Protocol (vrp.ts). A business booked by the night whose own website
   * publishes signed offers (VRP v0.1; \`vrp.domain\` on the profile, set by the BizPlug team) gets
   * \`check_direct_offer\`: its site's offer for one stay (availability, the exact total, the night-by-night prices,
   * the rules and cancellation terms), checked against the keys the site publishes, with the site's own booking link.
   * Nothing is sent but the dates and the guest count, and nothing is booked here. Without the flag, or without a
   * domain, the tool is not offered.
   */
  directOffers: boolean;
  /**
   * 0.47.0: the direct offer in the card (vrp.ts, plugin-widget.ts \`directOfferView\`). A business with direct offers
   * gets a **Price for your dates** menu option (kind \`directoffer\`: check-in, check-out, guests), and the offer is
   * drawn as a screen: the total, night by night, the house rules, the cancellation terms as the host signed them,
   * and **Book & pay on <site>**, which opens the host's signed booking link, where the guest confirms and pays.
   * Without the flag the tool answers in the chat only, as in 0.46.0.
   */
  directOfferCard: boolean;
  /**
   * 0.48.0: the rental concierge (concierge.ts), on vacation rentals (industry-functions.ts \`concierge\`). From the
   * host's places.csv, area.csv, events.csv and house.csv: Explore the area (the host's picks by category, with why,
   * how far and partner offers; Save to my trip), Area guide & what's on (about the area, its history, a map, getting
   * around, seasons, rules; events on the guest's dates; questions to ask in the chat), House guide (how the stove,
   * grill, washer and the rest work, per home), Which home fits (the group and what they want), Plan my stay (a
   * day-by-day plan from the picks with the homes that fit priced for the dates, then Check availability & book) and
   * Continue on WhatsApp (the trip handed to the host's WhatsApp concierge). On a computer a pick or a topic opens in
   * a panel beside the list. Each option shows only where the host published what it needs.
   */
  concierge: boolean;
  /**
   * 0.49.0: Ask the assistant in the chat (plugin-widget.ts \`askOwn\`, plugin-mcp.ts \`ASK_IN_CHAT_RULE\`). The card's
   * Ask ChatGPT buttons (about a pick, a topic, an event, a member or the weather) send a question the assistant answers
   * itself, without opening the plug-in again; the card stays on its screen and, on a computer, asks the host to float
   * it (picture-in-picture) while the answer arrives. The menu gets a Full screen button. The host decides the mode.
   */
  askInChat: boolean;
  /**
   * 0.50.0: trips day by day (itinerary.ts), on tour operators and DMCs (industry-functions.ts \`itinerary\`). From
   * trips.csv, trip_days.csv, trip_items.csv and trip_prices.csv: Itineraries (the published trips, each day with its
   * picture), a day opened with its flights, hotels, transfers and activities by the hour (Website, Directions, Ask
   * ChatGPT), an ask bar and the trip's contact, My trip (a traveller's own trip or a DMC's proposal, opened with the
   * code the business gave them; wrong codes are counted, trip-code-limits.ts) and a proposal's price breakdown. Each
   * option shows only where the business published what it needs.
   */
  itineraries: boolean;
  /** 0.51.0: a vacation rental names its own local picks (profile `picksTitle`, business.csv `picks_title`), shown in place of Explore the area. */
  picksTitle: boolean;
  /** 0.52.0: each tool's title also as annotations.title, which Anthropic's Connectors Directory reads for a listing. */
  titleAnnotations: boolean;
  /** 0.53.0: tool descriptions say only what a tool does; the rules for using them are in the server's instructions. */
  plainDescriptions: boolean;
  /**
   * 0.54.0: Ticket Tailor (ticket-tailor.ts), on events plug-ins. A business that connected its own Ticket Tailor box
   * office under Integrations gets \`find_tickets\`: its published, upcoming events with each ticket type's price and
   * whether it is on sale (and what is left, when it shows that to buyers), with the event's own Ticket Tailor checkout
   * link. Read-only: nothing about a buyer is read, and tickets are bought on Ticket Tailor. Without the flag, or
   * without a connected box office, the tool is not offered.
   */
  ticketTailor: boolean;
  /**
   * 0.55.0: the tickets in the card (plugin-widget.ts \`ticketsView\`): a **Tickets** menu option (kind \`tickets\`) on an
   * events plug-in with a connected Ticket Tailor box office, and \`find_tickets\`' result drawn as a screen: each
   * upcoming event with its date, place and ticket types (price, sold out or on sale, what is left where the business
   * shows it) and **Buy tickets**, which opens the event's own Ticket Tailor checkout through /tickets/<industry>/<slug>/<event>.
   * Without the flag the answer is text in the chat, as in 0.54.0.
   */
  ticketsCard: boolean;
  /**
   * 0.56.0: Humanitix (humanitix.ts) next to Ticket Tailor on events plug-ins. A business that connected its own
   * Humanitix account gets \`find_tickets\` (and the card's Tickets) from it: its published, public, upcoming events and
   * ticket types with the event's Humanitix page to buy them. Nothing about a buyer is read for it. Without the flag a
   * Humanitix account is not offered; Ticket Tailor, when both are connected, comes first.
   */
  humanitix: boolean;
  /**
   * 0.57.0: on a computer an event guide's speaker and agenda session open in the panel beside their list, like
   * members, exhibitors and a rental's picks, instead of on their own screen or folded open in the list. A session's
   * panel offers Ask about this session; a speaker's has none, since speakers are people. On a phone, and without the
   * flag, a speaker opens on its own screen and a session folds open as before.
   */
  eventPanels: boolean;
  /**
   * 0.58.0 (registration-self-service.ts): an events plug-in whose business connected Ticket Tailor or Humanitix and
   * switched it on offers My registration in the card. The attendee types their email, gets a 6-digit code there, and
   * sees and changes only the registrations on that email. The tool is the card's alone (hidden from the assistant).
   */
  attendeeUpdates: boolean;
  /**
   * 0.59.0 (linkedin-apify.ts): My registration takes the attendee's LinkedIn address. With their tick and the
   * business's own Apify token, the public profile is looked up and sent to the business's channels (Twenty CRM,
   * inbox), tagged with the event and the date and time. Without the flag no LinkedIn field is offered.
   */
  linkedinProfiles: boolean;
  /**
   * 0.60.0 (plugin-mcp.ts `forClaude`): a business's plug-in may leave tools out when the client is Claude (`claude.without`
   * on the profile), with their menu options: the same address then offers Claude a shorter tool list than ChatGPT.
   * Without the flag every client gets the same tools.
   */
  claudeVersion: boolean;
  /** 0.61.0: a home booked by the night (vacation rentals) is called a home on the booking screen, and its host, not "the hotel", confirms. */
  homeWords: boolean;
  /** 0.62.0: searchable lists a contributed industry defines in its file, each a data file, a tool, a menu option and a card screen (collections.ts). */
  collections: boolean;
  /** 0.63.0: a contributed industry's own menu titles and extra rules (menuTitles, rules). */
  industryWords: boolean;
  /** 0.64.0: request forms a contributed industry gives every business, sent to the business's own channels (formsFor). */
  industryForms: boolean;
  /** 0.65.0: the concierge says the industry's own words for the host, a home and the house guide (nouns). */
  industryNouns: boolean;
};

export type PluginVersion = {
  version: string;
  date: string; // ISO date
  /** One sentence on what changed, for the package READMEs. */
  summary: string;
  /** What is new, in the client's words. Shown in the portal next to the Upgrade button. */
  notes: string[];
  features: PluginFeatures;
};

const FULL_NAME_FEATURES: PluginFeatures = { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: true, fullAnnotations: true, members: true, payCard: true, fullName: true, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false };
const SOFTWARE_FEATURES: PluginFeatures = { ...FULL_NAME_FEATURES, softwareMenu: true, businessOnlyInstructions: true, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false };

export const PLUGIN_VERSIONS: PluginVersion[] = [
  {
    version: "0.1.0",
    date: "2026-11-15",
    summary: "The plug-in's tools for the industry, answers from the business's own information, and a text menu of what it can do.",
    notes: ["The plug-in's tools for your industry, questions answered from your own information, and a text menu of what it can do."],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: false, cardResults: false, cardNavigation: false, whatsappContact: false, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.2.0",
    date: "2026-11-16",
    summary: "A menu card in ChatGPT, with a button and a short form for each thing a customer can do.",
    notes: [
      "A menu card in ChatGPT: your customers see a button for each thing they can do.",
      "Each button opens a short form (dates and party size, an item, a reference, a question or a request), so customers tap and fill in instead of typing everything.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: false, cardNavigation: false, whatsappContact: false, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.3.0",
    date: "2026-11-16",
    summary: "Results show inside the card (prices, availability, open times, estimates and statuses), and a request can be sent straight from a result.",
    notes: [
      "Results show inside the card: prices, availability, open times, estimates and statuses, instead of only as text in the chat.",
      "Customers can go from a result straight to a request in the card: pick an option or a time, add their name and email, and send.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: false, whatsappContact: false, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.4.0",
    date: "2026-11-16",
    summary:
      "Browsing by tapping in the card: quick options on each form, search and category filters on a list, an item or option on its own screen with Back, the business's published questions and answers, and choosing the business on an industry-wide plug-in.",
    notes: [
      "Customers browse by tapping: your own categories and services, and shortcuts for dates and party size, appear as buttons on each form.",
      "A list can be searched and filtered by category in the card, and each item or option opens on its own screen, with Back to return.",
      "Your published questions and answers show in the card, so common questions are answered with one tap. Other questions still go to the chat.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: false, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.5.0",
    date: "2026-11-16",
    summary: "A WhatsApp button to the business's own number, with its contact details and after a sent request, when the business has saved its number in the portal.",
    notes: [
      "A WhatsApp button to your own number: save your WhatsApp number and a first message under Integrations on your plug-in page, and customers can open a chat with you from your contact details and after they send a request.",
      "Requests still reach you by email as before. WhatsApp is an extra way for a customer to reach you, and nothing is sent until they press send in WhatsApp.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.6.0",
    date: "2026-11-16",
    summary: "Buttons to the business's own pages, when it has saved them in the portal: a payment page after a sent request, and its booking page, directions and review page with its contact details.",
    notes: [
      "A Pay online button after a request, to your own payment page (for example a Stripe Payment Link). BizPlug takes no payment: the customer pays on your page.",
      "Book online, Get directions and Leave a review buttons with your contact details, each to a link you save under Integrations on your plug-in page.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.7.0",
    date: "2026-11-16",
    summary: "The business's own buttons (WhatsApp, booking, directions, reviews, social media) on the menu card and next to availability, with presses counted for the business.",
    notes: [
      "Your buttons show on your menu card, so a customer can message, book, find or follow you without asking first.",
      "A Book button to your booking page shows next to availability and open times, where a customer decides.",
      "The assistant knows which buttons you have and points to the right one at the right moment.",
      "Your Traction Dashboard counts how often each button is pressed, and where each request was delivered.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.8.0",
    date: "2026-11-16",
    summary: "Clear answers on how to pay: the business's own payment page when it has one, offered whenever a customer asks, and payment never taken in the chat.",
    notes: [
      "When a customer asks how to pay or whether they can pay online, the assistant answers from your settings: your own payment page if you saved one (Stripe, PayPal, Square or another), otherwise that payment is arranged with you directly.",
      "Your payment page is also listed with your contact details, so a customer can find it before or without sending a request. It still shows after a request as before.",
      "The assistant never takes card details or payment in the chat. The customer pays on your page, and the money never passes through BizPlug.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: false, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.9.0",
    date: "2026-11-16",
    summary: "Checkout on the business's own Stripe or Checkout.com account, when it has connected one: customers pay for an order or booking right after the request, and the status check asks the provider whether it was paid.",
    notes: [
      "Connect your own Stripe account (sign in with Stripe, or paste a key) or your Checkout.com account under Integrations: after a customer sends an order or booking with a price, they get a Pay now button to a checkout page in your business's name. The money goes to your account, never through BizPlug.",
      "The price is taken from your published files, never from the chat. Your plug-in confirms each payment with the provider, you get an email when an order is paid, and you can refund it from Payments on your plug-in page.",
      "Test mode first: no real money. Live payments are switched on for your plug-in once BizPlug has approved it. You still confirm every request yourself.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: false, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.10.0",
    date: "2026-11-17",
    summary: "The plug-in introduces itself to ChatGPT and other clients with a description and a website, and BizPlug's industry-wide plug-ins with the BizPlug logo, privacy policy, terms and support contact.",
    notes: [
      "Your plug-in tells ChatGPT who it is: your business's own summary as its description, and your website as its link.",
      "Nothing changes in how it answers customers or handles requests.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: true, fullAnnotations: false, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.11.0",
    date: "2026-11-17",
    summary: "Every tool states whether it only reads, whether its action can be taken back and whether it reaches outside the business's own data, as ChatGPT's plug-in directory requires.",
    notes: [
      "Each tool of your plug-in now states whether it only reads information or sends something that cannot be taken back. ChatGPT uses this to decide when to ask a customer to confirm.",
      "Sending a request is marked as an action that cannot be undone, so ChatGPT may ask the customer to confirm before it is sent. Nothing else changes.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: true, fullAnnotations: true, members: false, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.12.0",
    date: "2026-11-17",
    summary: "Coworking & Offices: a business can publish its member businesses, so people can find a member by name, kind of business or what they need or offer, and contact it directly.",
    notes: [
      "For coworking plug-ins: upload members.csv with the member businesses that agreed to be listed, and your plug-in gets a Members button. People search your members by name, kind of business or location, and open each one to see what it does, what it is looking for and what it offers.",
      "Find a collaborator: a person says what they need or what they can offer, and the plug-in shows the members whose entries match.",
      "Contact is direct: the plug-in shows the website, general email and phone number you list for each member, and the person writes or calls the member themselves. Neither you nor BizPlug introduces, forwards or vouches. Other plug-ins do not change.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: true, fullAnnotations: true, members: true, payCard: false, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.13.0",
    date: "2026-11-18",
    summary: "A pay step in the card after a request with checkout: the total, a Pay now button to the business's own checkout page, and an I've paid button that checks the payment.",
    notes: [
      "After a customer sends an order or booking with a price, the card shows the total and a Pay now button to your Stripe or Checkout.com checkout page, with a TEST badge while you are in test mode.",
      "An I've paid button in the card asks your payment provider whether the payment went through and shows Paid or Waiting for payment, without the customer typing their reference.",
      "Card details are only ever entered on the payment provider's own page, never in ChatGPT.",
    ],
    features: { visits: false, claudeCard: false, passwordSignIn: false, showcase: false, memberDetails: false, stayCalendar: false, eventDetails: false, dateCalendar: false, socialFeed: false, menuLayouts: false, formLinks: false, customForms: false, agentMode: false, socialVideo: false, formsFirst: false, deliveryFee: false, cardLanguages: false, moreCardLanguages: false, agentCheckout: false, mixedBooking: false, eventsList: false, listingPanel: false, featuredEvents: false, listingGrid: false, directOffers: false, directOfferCard: false, concierge: false, askInChat: false, itineraries: false, picksTitle: false, titleAnnotations: false, plainDescriptions: false, ticketTailor: false, ticketsCard: false, humanitix: false, eventPanels: false, attendeeUpdates: false, linkedinProfiles: false, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false, menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: true, fullAnnotations: true, members: true, payCard: true, fullName: false, softwareMenu: false, businessOnlyInstructions: false, customerSignIn: false, appTools: false, accountMenu: false, accountSend: false, cardBanner: false, memberMessages: false, eventGuide: false },
  },
  {
    version: "0.14.0",
    date: "2026-11-18",
    summary: "A business's plug-in shows its full name in ChatGPT, the business's name with what it is, and its own logo as the plug-in's icon.",
    notes: [
      "ChatGPT shows your plug-in under your business's name followed by what it is, for example \"msg2ai – AI messaging for hotels, rentals and events\", so customers can tell it apart from others.",
      "If your business.csv has a logo, ChatGPT can show it as your plug-in's icon.",
      "Nothing changes in how it answers customers or handles requests.",
    ],
    features: FULL_NAME_FEATURES,
  },
  {
    version: "0.15.0",
    date: "2026-11-18",
    summary: "Software & SaaS plug-ins get a menu made for software (Features, Pricing, Help & guides, Support, Book a demo), and every business's plug-in describes only the business to ChatGPT.",
    notes: [
      "For Software & SaaS plug-ins: the menu shows Features (what the product does, the plan each feature is on and its guide), Pricing, Help & guides (your help articles, searchable, each with its link), Support (a support request with a reference) and Book a demo.",
      "Upload features.csv, plans.csv and guides.csv, and add your pricing, support, documentation and status pages to business.csv.",
      "Listed in ChatGPT's plug-in directory: switch Listed in ChatGPT directory on, and Pricing shows only your pricing page, as OpenAI requires.",
      "Every industry: your plug-in now describes only your business to ChatGPT. It no longer calls itself a BizPlug plug-in in its instructions, and ChatGPT is no longer asked to mention BizPlug in its answers. The Contact BizPlug bar in the card stays.",
    ],
    features: SOFTWARE_FEATURES,
  },
  {
    version: "0.16.0",
    date: "2026-11-19",
    summary: "Customer sign-in with Clerk: a business that runs its own Clerk application can make its plug-in answer only its signed-in customers or members.",
    notes: [
      "Customer sign-in: under Integrations, open Clerk sign-in and save the API keys of your own Clerk application. From then on ChatGPT asks each customer to sign in with your Clerk sign-in page when they add your plug-in, and your plug-in answers only signed-in customers.",
      "Use it for a plug-in that is only for your members or existing customers. BizPlug checks each customer's sign-in with your Clerk application on every request and keeps none of their account details.",
      "Without Clerk keys saved, nothing changes: your plug-in stays open to anyone, as before.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true },
  },
  {
    version: "0.17.0",
    date: "2026-11-19",
    summary: "Account tools: a business that runs its own MCP server can offer its tools in its plug-in, so signed-in customers work in their own account from ChatGPT.",
    notes: [
      "Account tools: if your product has its own MCP server, save its address under Integrations, in the Clerk sign-in panel. Your plug-in then also offers your server's tools, so a customer can work in their own account with you from ChatGPT.",
      "Customers sign in with your Clerk application to use those tools. The rest of your plug-in (menu, answers, requests) stays open to anyone, so people who are not customers yet can still ask about your product.",
      "Your plug-in offers the tools your server listed when you saved the address, and keeps exactly those until you press Refresh. Each call goes to your server with the customer's own sign-in; BizPlug keeps neither the sign-in nor what was asked or answered.",
      "Without a saved address nothing changes: with Clerk sign-in alone, your whole plug-in still answers only signed-in customers, as in 0.16.0.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true },
  },
  {
    version: "0.18.0",
    date: "2026-11-19",
    summary: "Event guide: an Events & Conferences plug-in for a show or conference answers with its agenda, speakers, exhibitors and sponsors, and sends exhibiting, sponsoring and visiting enquiries.",
    notes: [
      "For shows and conferences: upload sessions.csv (the agenda), speakers.csv, exhibitors.csv and sponsors.csv, and your plug-in becomes an event guide. The menu shows About the event, Agenda (by day), Speakers, Exhibitors & sponsors (searchable, each with its website and email) and Send an enquiry.",
      "An enquiry (exhibiting, sponsoring, visiting, speaking or anything else) reaches your team with a reference, like any other request. People contact an exhibitor directly with the details you publish.",
      "A show needs no inventory.csv. A venue that publishes no programme keeps the venue menu (availability, date holds) as before.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true },
  },
  {
    version: "0.19.0",
    date: "2026-11-19",
    summary: "Account menu: the account tools of a business's own server get buttons in the card, with a form or a list for each, so signed-in customers tap instead of typing.",
    notes: [
      "Account menu: if your server's tool list also declares a menu, your card shows a button for each entry, next to your plug-in's own options. A customer taps a button, fills in a short form or picks from a list, and the card runs your tool and shows the result.",
      "A button can save something (a new note), list records and open one (sessions, notes, action items, reports), start a longer job and show it when it is ready (a report), or hand over to the chat (dictating a note with ChatGPT's microphone).",
      "The menu is read with your tool list when you save your server's address, and stays as it was until you save the address again. Customers still sign in with your Clerk application before any of these run.",
      "Without a menu in your tool list nothing changes: your account tools work from the chat as in 0.17.0.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true },
  },
  {
    version: "0.20.0",
    date: "2026-11-19",
    summary: "Send from the account menu: a record's screen can open the customer's own mail app or WhatsApp with a text from it filled in, such as a follow-up draft.",
    notes: [
      "Send by email and Send on WhatsApp: an entry of your account menu can add these buttons to a record's screen. They open the customer's own mail app or WhatsApp with the text you name filled in, for example a follow-up draft, addressed to the contact on the record when it has one.",
      "The customer reads the message and sends it themselves. Nothing is sent by the card, by BizPlug or by your server, and the text does not pass through BizPlug's servers.",
      "Without `send` in your menu nothing changes.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: false, memberMessages: false },
  },
  {
    version: "0.21.0",
    date: "2026-11-20",
    summary: "Card banner: a business's own wide picture at the top of its card's menu. Member messages: on a member list, the card drafts a first message to a member, sent from the person's own email or WhatsApp.",
    notes: [
      "Card banner: add a wide picture of your business (your own photo or artwork, https) on your plug-in's page, next to the card theme. Your card shows it at the top of its menu, above the buttons, on test and production at once.",
      "The picture is shown through bizplug.ai, so your card only loads images from BizPlug and showing your banner never makes your customers' browsers contact another site. PNG, JPEG or WebP, up to 3 MB; a wide picture (about 1.91 to 1, for example 1200 by 628) fits best.",
      "Without a banner nothing changes.",
      "Write to a member (coworking and chambers with a published member list): on a member's screen, Write to them asks the person's name, company and what they would like to discuss, and drafts a first message. Open in email starts it in their own mail app with the draft filled in; Open in WhatsApp opens a chat with the member's own number. The person reads it and sends it themselves: nothing is sent, kept or forwarded by the card, the business or BizPlug.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true },
  },
  {
    version: "0.22.0",
    date: "2026-11-20",
    summary: "Coworking & Offices: Book a tour and Day pass at the business's own locations, continued with the business's WhatsApp assistant when it has one.",
    notes: [
      "For coworking plug-ins: upload locations.csv with your locations, whether you give tours there and when, and whether you sell a day pass there and at what rate. Your plug-in then gets a Book a tour button and a Day pass button, each for the locations that offer it.",
      "A customer picks a location, a day and how many people. A day pass shows your published rate for that many people; where you gave no rate, it says you confirm the price.",
      "If you saved your msg2ai WhatsApp assistant or your own WhatsApp number under Integrations, the customer continues on WhatsApp with the message to send there, and is asked for no name or email. Otherwise the request reaches you like a booking request, with a reference.",
      "Nothing is booked until you confirm. Paying for a day pass and live tour time slots are not part of this version. Other plug-ins do not change.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true },
  },
  {
    version: "0.23.0",
    date: "2026-11-20",
    summary: "The card also shows in Claude: the menu, the forms and the results are drawn there as they are in ChatGPT.",
    notes: [
      "Your plug-in's card now also shows in Claude. Until now a customer who added your plug-in in Claude got its answers as text only; from this version Claude draws the same menu, forms and results as ChatGPT, on the web, in the desktop app and in the mobile apps.",
      "Nothing changes in ChatGPT: it keeps the card it has.",
      "Claude asks the customer before it opens a link from the card, and before the card puts a message in the chat. Claude Code shows the answers as text, without the card.",
      "How to add your plug-in in Claude is in the how-to pages, under Test and go live.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true },
  },
  {
    version: "0.24.0",
    date: "2026-11-20",
    summary: "Password sign-in: parts of a plug-in that only the people on the business's own list can use, after they sign in with an email and password.",
    notes: [
      "Password sign-in: under Integrations, choose which parts of your plug-in are restricted, and add the people who may use them with an email address and a password, one by one or as a CSV file.",
      "When a customer uses a restricted part, ChatGPT or Claude opens a BizPlug sign-in page with your business's name, where they type the email and password you gave them. Never in the chat. Everything else in your plug-in stays open to anyone.",
      "BizPlug stores a one-way hash of each password, never the password itself. Removing a person or giving them a new password ends their sign-in at once.",
      "Without password sign-in switched on, nothing changes.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true },
  },
  {
    version: "0.25.0",
    date: "2026-11-20",
    summary: "Showcase: the business's logo on its card, member logos, and committees, the newsletter, and news and events on their own screens.",
    notes: [
      "Your logo at the top of your card, in place of the shop icon, from the logo in your business profile.",
      "Member logos: a member list shows each member's logo next to its name, and a member's own screen shows it large. A member without a logo shows its initials.",
      "Committees, your newsletter, and news and events: when you publish them, each gets its own button on the menu and its own screen, with links to your pages, and the assistant answers from them.",
      "Without a logo, committees, a newsletter or news, your card looks as before.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true },
  },
  {
    version: "0.26.0",
    date: "2026-11-20",
    summary: "Member details: each member's address, LinkedIn page and a More about panel, with Ask ChatGPT for more.",
    notes: [
      "A member's screen shows its address and LinkedIn page next to its phone, email and website, when you list them.",
      "More about: a panel with a longer profile of the member, its main services and where the details came from.",
      "Ask ChatGPT for more: the person can ask the chat about a member. Only then may the assistant add what it knows or finds on the web, and it says that this is not from your member list.",
      "Without these details, a member's screen looks as before.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true },
  },
  {
    version: "0.27.0",
    date: "2026-11-20",
    summary: "Hotels: a booking screen with a calendar of free nights, adults, children and rooms, room cards with nightly prices, the hotel's policies, and a booking button on each room.",
    notes: [
      "For hotels and other places that book by the night: Availability and price now opens a month calendar. Free nights show the lowest price; a customer taps check-in, then check-out.",
      "Adults, children and rooms are set with − and + buttons, and the rooms are checked again at once.",
      "Each free room has its own card: the total for the stay, the average per night, a night-by-night breakdown, who it fits and, where your booking system says so, how many are left.",
      "Each room has its own button: Book & pay when your rooms are paid on a checkout, Book on WhatsApp when your WhatsApp concierge takes bookings, otherwise Request the booking. Your check-in and check-out times and cancellation terms show when your booking system publishes them.",
      "Other plug-ins do not change.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true },
  },
  {
    version: "0.28.0",
    date: "2026-11-20",
    summary: "Event guides: exhibitor and sponsor logos, and a More about panel for each company with Ask ChatGPT for more.",
    notes: [
      "Exhibitors and sponsors show their logos in the list and on their own screen, from the logo you list for each.",
      "More about: a panel with a longer profile of the company, its products or highlights, its LinkedIn page and where the details came from.",
      "Ask ChatGPT for more: a visitor can ask the chat about an exhibitor or sponsor. Only then may the assistant add what it knows or finds on the web, and it says that this is not from your list. Speakers are not offered this.",
      "Without logos or profiles, the exhibitors look as before.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true },
  },
  {
    version: "0.29.0",
    date: "2026-11-20",
    summary: "The booking calendar for car rental, tickets, desks and venues, with prices that change by day.",
    notes: [
      "Rentals, desks and venues booked by the day: Availability and price opens a month calendar. Tap the first day, then the last; each open day shows its lowest price.",
      "Tickets for a date (theme parks, museums, cruises, tours, matches): tap the date, set adults and children, and each option shows its price per person and the total.",
      "Prices by day: add weekday rates (for example a higher Friday and Saturday) in inventory.csv and seasons or holidays in rates.csv. The calendar, the quote and the request all use the same day-by-day price.",
      "Each option has its own button to request it; you confirm the booking as before.",
      "Hotels keep the booking screen they have; they can use weekday and seasonal rates too.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true },
  },
  {
    version: "0.30.0",
    date: "2026-11-20",
    summary: "Social media on the card: the business's latest posts with their pictures, from its feeds and the posts it pins, and where to follow it.",
    notes: [
      "A Social media button on your menu, once you add social.csv: your latest posts as a swipeable row of cards with their pictures, the newest one large, filters by network, and Follow buttons for every network you are on.",
      "Posts from YouTube, your podcast, your blog or news page, Substack, Medium, Bluesky and Mastodon appear by themselves: add the channel, feed or profile once. BizPlug reads them every 30 minutes.",
      "For LinkedIn, Instagram, X, Facebook and TikTok, which do not let other services read posts without their approval, you pin the posts you want shown: the post's address, its picture and its text.",
      "Each post opens on its network. The assistant can answer what you posted lately, from the same posts only.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true },
  },
  {
    version: "0.31.0",
    date: "2026-11-20",
    summary: "Menu layouts: choose how your card's menu is organised, from the Ask bar, App and Story layouts or one from the open-source layout directory.",
    notes: [
      "Pick a menu layout for your card, next to its colours, with a preview of your own card on a computer and on a phone: Tiles (as before), Ask bar (a search box that is also a question, and one list of everything), App (round quick actions, a Start here card and a tab bar) or Story (a cover and one chapter per option).",
      "The same options, forms and results in every layout; only how the menu is organised and used changes. Your colours, banner and logo carry over.",
      "Layouts are open source: independent developers can write one and propose it in BizPlug's public plug-in repository, and accepted layouts appear here for every business.",
      "Until you pick one, your card keeps the tiles.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true },
  },
  {
    version: "0.32.0",
    date: "2026-11-20",
    summary: "Forms: your own forms in Google Forms, Microsoft Forms, Typeform, Jotform, Tally and other tools, offered at the right moment and opened with what the customer already said filled in.",
    notes: [
      "Add your forms on your plug-in's Forms tab, under Forms you already have: an application, a registration, a survey or an intake form, from Google Forms, Microsoft Forms, Typeform, Jotform, Tally, Fillout, Cognito Forms, HubSpot, Zoho Forms, Paperform, Formstack, Wufoo or Airtable.",
      "Your card gets a Forms button, and the assistant offers the right form when a customer wants to apply, register or give feedback.",
      "Put {name}, {email}, {phone}, {date} or {details} in the form's prefilled link, and the form opens with those answers filled in. The customer checks it and submits it on the form tool's own page; BizPlug keeps nothing.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true },
  },
  {
    version: "0.33.0",
    date: "2026-11-21",
    summary: "Your own forms: build short forms in the portal, and customers fill them in on your card or ask the assistant to.",
    notes: [
      "Next to linking the forms you have in other tools (0.32.0), you can now build short forms here with the BizPlug Form Tool on your plug-in's page: a catering request, a group booking, a warranty claim. Up to 5 forms, each with up to 10 fields: text, a choice, a number, a date, a time, or yes or no.",
      "Each form is a button on your card's menu, and the assistant can fill it in for a customer who asks in the chat: it asks for what is missing and confirms the details before sending.",
      "A sent form goes only to the channels you set up under Integrations (your requests inbox, Slack, Google Sheets, a webhook, Airtable and the others), with a reference for the customer. The BizPlug team gets no copy. Set up at least one channel first: without one, the customer is told the form could not be delivered.",
      "A form may not ask for card details, passwords, identity or bank numbers, or health details.",
      "A new or changed form goes live when your plug-in is published again, like new data.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true },
  },
  {
    version: "0.34.0",
    date: "2026-11-21",
    summary: "Agent mode: other companies' AI agents can use your plug-in without a card, and must show the customer a preview before a request is sent.",
    notes: [
      "AI agents that are not ChatGPT or Claude (an agent a developer built, a workflow tool, another company's assistant) can ask for agent mode when they connect to your plug-in: they get your information as data, with no card.",
      "An agent cannot send you a request in one step: its first call returns a preview and sends nothing, and the request is sent only when it calls again saying the customer agreed. A request still needs the customer's own name and email.",
      "Requests from agents are limited: at most 20 an hour for your business, and 5 a day for one customer email.",
      "A request sent by an agent says so where you receive it (a webhook gets source: agent).",
      "Nothing changes in ChatGPT or Claude: they never get agent mode.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true },
  },
  {
    version: "0.35.0",
    date: "2026-11-21",
    summary: "YouTube videos play inside the card: tap a video in Social media and it plays there, with YouTube Shorts shown upright.",
    notes: [
      "A YouTube video in Social media now plays inside your card: the customer taps it and it opens on its own screen with YouTube's player, its title, Back and Open on YouTube. This goes for the videos from your channel and for a YouTube video you pinned.",
      "YouTube Shorts are shown upright, as a tile and when they play.",
      "The player is YouTube's own, from youtube-nocookie.com, and is loaded only when a customer taps a video. From then on the customer's browser is in contact with YouTube, as on any page with a YouTube video; before the tap the card contacts nothing new.",
      "Where ChatGPT or Claude does not allow the player, the customer sees the video's picture and Open on YouTube instead.",
      "Posts from every other network open on their network as before: LinkedIn, Instagram, X, Facebook and TikTok do not allow their pages to be shown inside another page.",
      "If you list your plug-in in ChatGPT's directory: OpenAI asks for a reason when a card shows another site's content, and may take longer to review it. Without YouTube in your social media, nothing changes for your card.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true },
  },
  {
    version: "0.36.0",
    date: "2026-11-21",
    summary: "Your forms come first: when a customer wants to do what one of your forms is for, the assistant opens that form instead of sending you a request.",
    notes: [
      "When you linked forms of your own (0.32.0) and a customer wants to do what one of them is for, for example ask about becoming a member, the assistant now opens that form with what the customer already said filled in, instead of sending you an enquiry or a request.",
      "The assistant sends a request or an enquiry only when none of your forms fits, or when the customer asks to send it here instead.",
      "Nothing else changes: the customer still checks the form and submits it on your form tool's page, and BizPlug keeps none of the answers. Without linked forms, nothing changes for your plug-in.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true },
  },
  {
    version: "0.37.0",
    date: "2026-11-21",
    summary: "Delivery fees: an order plug-in adds the business's published delivery fee to a delivery order's total and checkout.",
    notes: [
      "If you take delivery orders, you can publish your delivery fee: the new delivery_fee column in business.csv, a number in your currency, for example 12.",
      "A delivery order then shows the fee on its own line and in the total, and when you take payment online through Stripe or Checkout.com, the checkout includes it. Pickup orders never carry it.",
      "Your price list tells customers what delivery costs, so they know before they order. Without a delivery fee, nothing changes for your plug-in.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true },
  },
  {
    version: "0.38.0",
    date: "2026-11-22",
    summary: "Card languages: the card can be switched to Arabic, Korean or Japanese, with the business's own translations of its data.",
    notes: [
      "Choose the languages your card offers on the Look tab: Arabic, Korean and Japanese, next to English. Download your card's texts as a CSV, add your translations, and upload it. From your next publish your card shows a language switch, and opens in the customer's own language when ChatGPT or Claude says which one it is.",
      "The card's own buttons and screens are translated by BizPlug. Your data (services, questions and answers, items, members' descriptions, agenda and the rest) shows in the translations you provide; a text you did not translate shows in English. Names, prices and links stay as you wrote them. Arabic is shown right to left.",
      "BizPlug does not translate your data and uses no AI for it: what customers read is what you wrote.",
      "Requests still reach you in your own language: what a customer picks in Korean arrives with your own item and service names.",
      "A language is offered only once you uploaded translations for it. Without any, nothing changes for your plug-in.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: false },
  },
  {
    version: "0.39.0",
    date: "2026-11-22",
    summary: "More card languages: Hindi, Spanish, French, Bengali, Portuguese, Russian, Indonesian, Urdu, German, Italian and Dutch, next to Arabic, Korean and Japanese.",
    notes: [
      "Your card can now also be offered in Hindi, Spanish, French, Bengali, Portuguese, Russian, Indonesian, Urdu, German, Italian and Dutch, next to Arabic, Korean and Japanese. Tick them on the Look tab, under Card languages.",
      "It works as before: download your card's texts as a CSV, add your translations, upload it and publish. The card's own buttons and screens are translated by BizPlug; your data shows in the translations you provide, and a text you did not translate shows in English. Urdu, like Arabic, is shown right to left.",
      "BizPlug does not translate your data and uses no AI for it. A language is offered only once you uploaded translations for it, so nothing changes for your plug-in until you do.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true },
  },
  {
    version: "0.40.0",
    date: "2026-11-22",
    summary: "Checkout for AI agents: an agent acting for a customer can take them to your own checkout, where the customer approves and pays.",
    notes: [
      "If you take payment online through Stripe or Checkout.com, an AI agent in agent mode (0.34.0) now gets your own checkout link, with the total, when it sends a request with a firm price for a customer.",
      "The agent is told the rules with every link: the customer pays on your checkout page themselves, or approves the payment in a wallet of their own that asks them for each payment. The agent may not enter card details it was given, or pay an amount the customer has not approved.",
      "The payment goes to your own account, as for any customer. Paying does not confirm the request: you still do. An order counts as paid only when Stripe or Checkout.com says so.",
      "Nothing changes in ChatGPT or Claude, and without online payments nothing changes for your plug-in.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true },
  },
  {
    version: "0.41.0",
    date: "2026-11-23",
    summary: "Book on WhatsApp for more than hotel nights: bookings by the day or for one date, and activities next to rooms.",
    notes: [
      "If your bookings are taken on WhatsApp (set up with the BizPlug team), that now works for anything booked by the day or for one date, not only rooms by the night: the customer chooses in the card, taps Book on WhatsApp and sends one message that says what, when and for how many people.",
      "In a plug-in booked by the night, an option can be booked once for the stay instead of per night: write person or booking in the new per column of inventory.csv for an activity or a transfer. It shows next to the rooms with its price per person or per booking.",
      "You confirm the day, the price and how to pay in your WhatsApp chat. Nothing is booked, held or paid from the card.",
      "Nothing changes for a hotel's rooms, or without WhatsApp booking and the new column.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true },
  },
  {
    version: "0.42.0",
    date: "2026-11-23",
    summary: "An events calendar: events with fixed dates, month by month, with categories, search and each event's own links.",
    notes: [
      "If what you offer happens on fixed dates (matches, races, workshops, shows), add the dates to each one in inventory.csv (start and end). Your plug-in then opens on an events calendar instead of the booking calendar: month by month, with your own categories as tabs and a search.",
      "Each event shows its dates, place, price or free entry, and buttons for its own page (tickets or website), directions and adding it to a calendar. An event has its own screen with the same details.",
      "An event with its own page is ticketed or booked there: the plug-in sends people to that page and takes no request. An event without one is requested like before.",
      "Only for plug-ins booked for one date, such as tickets, tours and activities. Without dates on your options nothing changes.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true },
  },
  {
    version: "0.43.0",
    date: "2026-11-23",
    summary: "On a computer, an event, a member or an exhibitor opens in a panel beside its list, with its links and Ask for more.",
    notes: [
      "On a computer, a listing now opens in a panel beside its list instead of leaving it: an event from your events calendar, a member from your member list, an exhibitor or sponsor from your event guide. The panel shows what you list for it, with its links.",
      "The panel has Ask for more: it asks ChatGPT or Claude about that listing in the chat, where the assistant may add what it knows or finds on the web and says which parts are not from your list.",
      "You choose how it works on the Look tab, under Listing details: the panel (the standard), asking in the chat straight away, or the panel without Ask for more.",
      "On a phone nothing changes: a listing opens on its own screen and a website button opens the page.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true },
  },
  {
    version: "0.44.0",
    date: "2026-11-23",
    summary: "A Featured row above the events calendar: the events you pick, as large cards to swipe through.",
    notes: [
      "Mark the events you want to stand out with featured (true) in inventory.csv. They show in a Featured row above your events calendar, soonest first, as large cards customers swipe or click through.",
      "A featured event shows whatever month, category or search the customer is looking at, until it has ended. Up to eight show at a time.",
      "Each card opens the event like any other: in the panel on a computer, on its own screen on a phone.",
      "Only for plug-ins with an events calendar. With no featured event nothing changes.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true },
  },
  {
    version: "0.45.0",
    date: "2026-11-23",
    summary: "Member, exhibitor and sponsor lists as a grid of tiles with logo, name and category.",
    notes: [
      "Your member list, and an event guide's exhibitors and sponsors, now show as a grid of tiles instead of rows: two columns on a phone, three or four on a computer.",
      "Each tile shows the logo (or the initials when there is none), the name, the membership level or stand, and the category. More fit on a screen, so customers scan the list faster.",
      "The description is one tap away: a tile opens the member in the panel on a computer, or on its own screen on a phone.",
      "Search and the category and area filters work as before.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true },
  },
  {
    version: "0.46.0",
    date: "2026-11-24",
    summary: "Direct offers: a rental or hotel whose own website publishes signed offers by the Vacation Rental Protocol is quoted from its site, with the exact total, the terms and its own booking link.",
    notes: [
      "If your own website publishes signed offers by the Vacation Rental Protocol (VRP), your plug-in can ask it for the offer for the dates and guests a customer gives: whether the home is free, the exact total, the price of each night, your check-in times, house rules and cancellation terms.",
      "BizPlug checks each offer before it is quoted: that it is signed with the keys your site publishes, that it is for those exact dates and guests, and that it has not expired. An offer that cannot be checked is not quoted.",
      "The customer books on your own site, through the booking link your offer carries. Only the dates and the number of guests are sent to your site.",
      "The BizPlug team sets up your site's address with you. Until then nothing changes.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true },
  },
  {
    version: "0.47.0",
    date: "2026-11-24",
    summary: "Direct offers in the card: Price for your dates, the host's offer as a screen, and Book & pay on the host's own website.",
    notes: [
      "If your plug-in quotes stays from your own website's signed offers, your card gets a Price for your dates button: the guest picks check-in, check-out and the number of guests.",
      "The card shows your offer for those dates: the total, the price of each night, check-in and check-out times, house rules and your cancellation terms as your site states them.",
      "A Book & pay button opens your own booking page with the stay filled in. The guest confirms and pays there, on your site; nothing is booked or paid in the chat.",
      "When the dates are taken, the card says so and offers other dates. When your site cannot confirm an offer, no price is shown.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true },
  },
  {
    version: "0.48.0",
    date: "2026-11-25",
    summary: "Vacation rentals: a concierge in the card. The host's local picks, an area guide with events on the guest's dates, a house guide, Which home fits, Plan my stay with the price for the dates, and Continue on WhatsApp.",
    notes: [
      "For vacation rental plug-ins: upload places.csv with your own local picks (where to eat, groceries, the beach, things to do), each with why you like it and how far it is. Guests browse them by category in the card, save the ones they like, and ask ChatGPT for more about any of them.",
      "Plan my stay: a guest gives their dates, who is coming (kids, a dog) and what they like, and gets a day-by-day plan from your picks, with your homes that fit priced for those dates and a button to check availability and book.",
      "Upload area.csv for an area guide (about the area, its history, a map, getting there and around, the seasons, local rules) and events.csv for what's on; events show for the guest's dates. Upload house.csv for a house guide: how the stove, grill, washer and the rest work in each home.",
      "Which home fits recommends one of your homes for a group and says why. With your msg2ai WhatsApp concierge or your WhatsApp number saved, Continue on WhatsApp hands the guest's trip to you there.",
      "Everything shown is what you published; ChatGPT labels anything it adds as its own. Nothing is booked until the guest books. Other plug-ins do not change.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true },
  },
  {
    version: "0.49.0",
    date: "2026-11-25",
    summary: "Ask ChatGPT from the card without losing it: the question is answered in the chat, the card floats beside the answer on a computer, and the menu opens full screen.",
    notes: [
      "The Ask ChatGPT buttons in your card (about a place, a topic, an event, a member or the weather) now ask ChatGPT to answer in the chat itself, instead of opening your card again.",
      "The card stays where the guest was, and on a computer it floats at the top (picture-in-picture) while the answer arrives, so the guest can read both. ChatGPT decides whether it can float; where it cannot, nothing changes.",
      "A Full screen button on the menu opens your card full screen, with the chat still available.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: false, picksTitle: false },
  },
  {
    version: "0.50.0",
    date: "2026-11-25",
    summary: "Tour operators and DMCs: trips day by day in the card, with a picture per day, each day opening on its flights, hotels and activities by the hour; My trip by code; and a proposal's price breakdown.",
    notes: [
      "For tour operator and DMC plug-ins: upload trips.csv, trip_days.csv and trip_items.csv to show your itineraries day by day. Each day is a card with its own picture; tapped, it opens the day by the hour, with the flight, hotel, transfer or activity details and buttons for the website, directions and Ask ChatGPT.",
      "Give a trip a code (at least 8 letters or digits) to make it a traveller's own: it is never listed, and opens only when the traveller enters the code you gave them, with their dates, flights, hotels and booking references. Wrong codes are counted, so codes cannot be guessed.",
      "DMCs: add trip_prices.csv to show a proposal's price breakdown by category, with the total, the price per person and the date it is valid until.",
      "Every trip has an ask bar that sends the traveller's question about the day to ChatGPT, and the trip's own contact (a tour leader or travel designer) with WhatsApp and email buttons.",
      "Everything shown is what you published. Nothing is booked from the card: you confirm every booking. Other plug-ins do not change.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true },
  },
  {
    version: "0.51.0",
    date: "2026-11-25",
    summary: "Vacation rentals: name your local picks yourself, such as \"Harrison's Suggestions\", in place of Explore the area.",
    notes: [
      "For vacation rental plug-ins: give your local picks your own name in business.csv, column picks_title (for example \"Harrison's Suggestions\"). It replaces \"Explore the area\" on the card's menu and on the picks screen, and the assistant calls your picks by that name.",
      "Without a name nothing changes. Other plug-ins do not change.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true },
  },
  {
    version: "0.52.0",
    date: "2026-11-25",
    summary: "Every tool's title is also in its annotations, as Claude's connector directory asks.",
    notes: [
      "Each tool of your plug-in now carries its title in its annotations too. Anthropic's Connectors Directory reads it when you submit your plug-in to be listed in Claude.",
      "Nothing changes in the card or in what the assistant says.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true },
  },
  {
    version: "0.53.0",
    date: "2026-11-25",
    summary: "Tool descriptions say only what each tool does; how to use them is in the plug-in's instructions, as Claude's connector directory asks.",
    notes: [
      "Each tool's description now says only what the tool does. The rules for using it, such as sending a request only once the customer has chosen, are in your plug-in's instructions to the assistant, word for word.",
      "The assistant follows the same rules as before. Anthropic's Connectors Directory asks for tool descriptions without instructions when you submit your plug-in to be listed in Claude.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true },
  },
  {
    version: "0.54.0",
    date: "2026-11-26",
    summary: "Events: connect your Ticket Tailor box office, and your plug-in shows your upcoming events and tickets with the link to buy them.",
    notes: [
      "For event plug-ins: connect your Ticket Tailor box office under Integrations with an API key from Ticket Tailor (Settings > API). Your plug-in then answers questions about your upcoming events and tickets: dates, ticket types, prices, whether they are on sale, and what is left when you show that to buyers, with your Ticket Tailor page to buy them.",
      "Tickets are still bought and paid for on Ticket Tailor. The plug-in never sees who bought a ticket. Your registrations are on your plug-in's Registrations page, for you only.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true },
  },
  {
    version: "0.55.0",
    date: "2026-11-26",
    summary: "Events with Ticket Tailor: a Tickets button in the card, with each event's tickets and a Buy tickets button.",
    notes: [
      "For event plug-ins with Ticket Tailor connected: your card gets a Tickets button. It shows your upcoming events with their dates, place and ticket types, the price of each, whether it is on sale or sold out, and what is left when you show that to buyers.",
      "Buy tickets opens your Ticket Tailor page for the event, where customers book and pay. Nothing is sold or paid in the card.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true },
  },
  {
    version: "0.56.0",
    date: "2026-11-26",
    summary: "Events: connect your Humanitix account, and your plug-in shows your upcoming Humanitix events and tickets with the page to buy them.",
    notes: [
      "For event plug-ins: connect your Humanitix account under Integrations with an API key from the Humanitix console. Your plug-in then shows your published, upcoming events and ticket types, in the chat and on the card's Tickets screen, with your Humanitix page to buy them.",
      "Your Registrations page lists your Humanitix tickets per event, checks people in and out, and corrects an attendee by a Humanitix transfer. Tickets are still bought and paid for on Humanitix.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true },
  },  {
    version: "0.57.0",
    date: "2026-11-27",
    summary: "Events: on a computer, a speaker or an agenda session opens in a panel beside the list, with its details, as exhibitors already do.",
    notes: [
      "For event plug-ins: on a computer, tapping a speaker or a session in the agenda opens it in a panel on the right of the card, beside the list, so people can go through the programme without losing their place. A session's panel has Ask about this session, which continues in the chat. On a phone they open as before.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true },
  },  {
    version: "0.58.0",
    date: "2026-11-27",
    summary: "Events: attendees can open and correct their own registration from the card, after a code sent to their email.",
    notes: [
      "For event plug-ins with Ticket Tailor or Humanitix: when you switch it on, on your Registrations page, the card offers My registration. An attendee types the email they registered with, gets a 6-digit code at that address, and then sees only their own tickets and can correct their name, email or phone. You are told of every change. Nobody sees a registration without the code.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true, attendeeUpdates: true },
  },  {
    version: "0.59.0",
    date: "2026-11-27",
    summary: "My registration: attendees can add their LinkedIn profile, which, with their agreement, is looked up and sent to your CRM.",
    notes: [
      "My registration takes an attendee's LinkedIn address. When they tick that they agree, and you connected your Apify account, their public LinkedIn profile is looked up and sent to your Twenty CRM or your inbox, tagged with the event and the date and time. Nothing is looked up without the tick.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true, attendeeUpdates: true, linkedinProfiles: true, claudeVersion: false, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false },
  },
  {
    version: "0.60.0",
    date: "2026-11-27",
    summary: "A plug-in can offer Claude a shorter list of tools than ChatGPT, at the same address.",
    notes: [
      "Your plug-in can leave chosen tools out in Claude, with their menu options, while ChatGPT keeps them all. The BizPlug team sets it up with you; until then nothing changes.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true, attendeeUpdates: true, linkedinProfiles: true, claudeVersion: true, homeWords: false, collections: false, industryWords: false, industryForms: false, industryNouns: false },
  },
  {
    version: "0.61.0",
    date: "2026-11-28",
    summary: "Vacation rentals: the booking screen speaks of homes and the host, not rooms and the hotel.",
    notes: [
      "On a plug-in for homes booked by the night, the booking screen lists Homes instead of Rooms, has no Rooms counter, and says your business confirms the request, not \"the hotel\". Hotels are unchanged.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true, attendeeUpdates: true, linkedinProfiles: true, claudeVersion: true, homeWords: true, collections: false, industryWords: false, industryForms: false, industryNouns: false },
  },
  {
    version: "0.62.0",
    date: "2026-11-28",
    summary: "Collections: searchable lists an industry defines, such as climbing routes or recipes, each with its own data file and card screen.",
    notes: [
      "Your industry may define its own lists (for example routes, recipes or courses). Fill in each list's data file, publish, and customers search it in the card: filters, pictures and links, an entry on its own screen. Only industries that define a list get this.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true, attendeeUpdates: true, linkedinProfiles: true, claudeVersion: true, homeWords: true, collections: true, industryWords: false, industryForms: false, industryNouns: false },
  },
  {
    version: "0.63.0",
    date: "2026-11-28",
    summary: "Industry words: an industry's menu speaks its own language, with its own titles and rules.",
    notes: [
      "Your industry may name its menu options in its own words (for example \"Find a session\" instead of \"Availability and price\") and give the assistant more of its own rules. Only industries that define them change.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true, attendeeUpdates: true, linkedinProfiles: true, claudeVersion: true, homeWords: true, collections: true, industryWords: true, industryForms: false, industryNouns: false },
  },
  {
    version: "0.64.0",
    date: "2026-11-28",
    summary: "Industry forms: request forms your industry gives every business, such as a warranty claim, sent to your own inbox.",
    notes: [
      "Your industry may come with request forms of its own (for example a warranty claim or a group enquiry). They show on your card next to your own forms and are sent only to your own channels: your requests inbox, webhook, Slack or another destination. Without a channel set up they are not offered.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true, attendeeUpdates: true, linkedinProfiles: true, claudeVersion: true, homeWords: true, collections: true, industryWords: true, industryForms: true, industryNouns: false },
  },
  {
    version: "0.65.0",
    date: "2026-11-28",
    summary: "The concierge speaks your industry's words: a marina's picks and its berths, not a host's and homes.",
    notes: [
      "Where your industry names them, the concierge's answers use its own words for the host, a home and the house guide (for example the marina, a berth and the berth guide). It also points the assistant to your industry's own availability tool. Vacation rentals are unchanged.",
    ],
    features: { ...SOFTWARE_FEATURES, customerSignIn: true, appTools: true, eventGuide: true, accountMenu: true, accountSend: true, cardBanner: true, memberMessages: true, visits: true, claudeCard: true, passwordSignIn: true, showcase: true, memberDetails: true, stayCalendar: true, eventDetails: true, dateCalendar: true, socialFeed: true, menuLayouts: true, formLinks: true, customForms: true, agentMode: true, socialVideo: true, formsFirst: true, deliveryFee: true, cardLanguages: true, moreCardLanguages: true, agentCheckout: true, mixedBooking: true, eventsList: true, listingPanel: true, featuredEvents: true, listingGrid: true, directOffers: true, directOfferCard: true, concierge: true, askInChat: true, itineraries: true, picksTitle: true, titleAnnotations: true, plainDescriptions: true, ticketTailor: true, ticketsCard: true, humanitix: true, eventPanels: true, attendeeUpdates: true, linkedinProfiles: true, claudeVersion: true, homeWords: true, collections: true, industryWords: true, industryForms: true, industryNouns: true },
  },
];

export const LATEST_VERSION = PLUGIN_VERSIONS[PLUGIN_VERSIONS.length - 1].version;
/** "16 November 2026", for a version's ISO date. */
export const versionDate = (v: PluginVersion) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${v.date}T00:00:00Z`));
/** Plug-ins published before versions were recorded ran this one. */
export const FIRST_VERSION = PLUGIN_VERSIONS[0].version;

const parts = (v: string) => v.split(".").map((n) => Number(n) || 0);
/**
 * One number for a business's published plug-in: the plug-in version with the release as its third part, so
 * release 4 on 0.12.0 reads 0.12.4. Plug-in versions step the second number, which leaves the third for the release.
 */
export const releaseVersion = (version: string, release: number) => `${parts(version)[0]}.${parts(version)[1] ?? 0}.${release}`;
/** Negative when a is older than b. */
export function compareVersions(a: string, b: string): number {
  const x = parts(a), y = parts(b);
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
  return 0;
}

export const getVersion = (v: string | undefined) => PLUGIN_VERSIONS.find((x) => x.version === v);
/** The behaviour of a version; an unknown or missing version behaves as the current one. */
export const featuresOf = (v: string | undefined): PluginFeatures => (getVersion(v) ?? PLUGIN_VERSIONS[PLUGIN_VERSIONS.length - 1]).features;
/** The versions newer than `v`, oldest first. */
export const versionsAfter = (v: string) => PLUGIN_VERSIONS.filter((x) => compareVersions(x.version, v) > 0);

/** What a business's plug-in can use, to tell whether a version changes anything for it. */
export type UpgradeContext = {
  /** The industry defines collections (industry-functions.ts `collections`, contributed industries). */
  collections?: boolean;
  /** The industry gives its own menu titles or rules (contributed industries). */
  words?: boolean;
  /** The industry gives every business request forms (contributed industries). */
  forms?: boolean;
  /** The industry gives the concierge its own words (contributed industries). */
  nouns?: boolean;
  /** The industry has members (industry-functions.ts `members`). */
  members: boolean;
  /** A Stripe, Checkout.com or Dibsy account is connected and payments are not switched off. */
  checkout: boolean;
  /** A software product (industry-functions.ts `software`). */
  software: boolean;
  /** A show or conference can publish its programme (industry-functions.ts `show`, Events & Conferences). */
  show: boolean;
  /** Tours and day passes (industry-functions.ts `visits`, Coworking & Offices). */
  visits: boolean;
  /** Booked by the night (industry-functions.ts engine `stay`, span `nights`): hotels, rentals, campsites. */
  stays: boolean;
  /** Booked by the day or for one date (engine `stay`, span `days` or `single`): car rental, tickets, desks, venues. */
  dated: boolean;
  /** Takes orders (engine `order`): the only engine with delivery. */
  orders: boolean;
  /** The rental concierge (industry-functions.ts `concierge`, Vacation Rentals). */
  concierge?: boolean;
  /** Trips day by day (industry-functions.ts `itinerary`, Tour Operators and DMCs). */
  itineraries?: boolean;
};

/**
 * Features that only act for some plug-ins. Every other feature changes every plug-in. A version matters to a
 * plug-in when at least one feature it turns on applies to it; one that does not is not offered as an upgrade.
 */
const APPLIES: Partial<Record<keyof PluginFeatures, (c: UpgradeContext) => boolean>> = {
  // Set in a profile by the team only (a profile file, or a team account's push): nothing a client can switch on.
  claudeVersion: () => false,
  homeWords: (c) => c.stays,
  collections: (c) => Boolean(c.collections),
  industryWords: (c) => Boolean(c.words),
  industryForms: (c) => Boolean(c.forms),
  industryNouns: (c) => Boolean(c.nouns),
  members: (c) => c.members,
  stripeCheckout: (c) => c.checkout,
  payCard: (c) => c.checkout,
  softwareMenu: (c) => c.software,
  eventGuide: (c) => c.show,
  visits: (c) => c.visits,
  concierge: (c) => Boolean(c.concierge),
  itineraries: (c) => Boolean(c.itineraries),
  picksTitle: (c) => Boolean(c.concierge),
  stayCalendar: (c) => c.stays,
  eventDetails: (c) => c.show,
  dateCalendar: (c) => c.dated,
  deliveryFee: (c) => c.orders,
  agentCheckout: (c) => c.checkout,
  mixedBooking: (c) => c.stays || c.dated,
  eventsList: (c) => c.dated,
  listingPanel: (c) => c.dated || c.members || c.show,
  featuredEvents: (c) => c.dated,
  listingGrid: (c) => c.members || c.show,
  directOffers: (c) => c.stays,
  directOfferCard: (c) => c.stays,
  ticketTailor: (c) => c.show,
  ticketsCard: (c) => c.show,
  humanitix: (c) => c.show,
};

export function versionMatters(v: PluginVersion, c: UpgradeContext): boolean {
  const before = PLUGIN_VERSIONS[PLUGIN_VERSIONS.indexOf(v) - 1];
  const added = (Object.keys(v.features) as (keyof PluginFeatures)[]).filter((k) => v.features[k] && !before?.features[k]);
  // A version that turns on no feature changed something for everyone.
  if (!added.length) return true;
  return added.some((k) => APPLIES[k]?.(c) ?? true);
}

/** The versions after `v` that change something for this plug-in. */
export const relevantVersionsAfter = (v: string, c: UpgradeContext) => versionsAfter(v).filter((x) => versionMatters(x, c));
