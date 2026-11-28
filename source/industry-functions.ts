// The major business function each industry plug-in performs, in the spirit of the
// per-industry WhatsApp templates. Each row picks one of five engines (src/lib/engines.ts)
// and gives the tool names a model will see.
//   order : browse a catalog, place a pickup/delivery order, check its status
//   stay  : check availability and total price for dates, request a booking, check status
//   appt  : find open slots, request an appointment, check status
//   quote : get a price estimate from published rules, request a quote or visit, check status
//   track : look up a reference, submit a request, check status
import { contributions, functionOf } from "@/lib/contributed-industries";
import { isPreviewSlug, previewFunctions } from "@/lib/preview-registry";
import type { CollectionDef } from "@/lib/collections";
import type { CustomForm } from "@/lib/custom-forms";
export type Engine = "order" | "stay" | "appt" | "quote" | "track";
export type Span = "nights" | "days" | "single";

/** The five engines in plain words, as the public INDUSTRIES.md lists them (scripts/plugins-industries-page.ts). */
export const ENGINES: Record<Engine, string> = {
  order: "Browse a catalog with prices, send a pickup or delivery order, check its status.",
  stay: "Check what is free for dates and party size with the total price, send a booking request, check its status.",
  appt: "Find open times on a day, request an appointment, check its status.",
  quote: "Work out an estimate from published price rules, request a quote or a visit, check its status.",
  track: "Look up a reference the customer already has, send a new request, check its status.",
};
/** How a stay-engine industry is booked. */
export const SPANS: Record<Span, string> = {
  nights: "by the night",
  days: "by the day, first and last day both counted",
  single: "for one date",
};

export type IndustryFunction = {
  slug: string;
  engine: Engine;
  title: string;
  tools: [string, string, string]; // [look-up, request, status]
  noun: string; // what is being ordered, booked or quoted
  span?: Span; // stay only
  perGuest?: boolean; // stay only: price is per guest, not per unit
  note?: string; // extra rule shown to the model
  members?: boolean; // the business may publish its member businesses: find_members and members.csv (plugins.ts, plugin-data.ts)
  infoFirst?: boolean; // the menu starts with "Ask a question": the plug-in mainly explains the business (chambers)
  software?: boolean; // a software product: from 0.15.0 the menu is Features, Pricing, Help & guides, Support, Book a demo (plugins.ts, software.ts)
  visits?: boolean; // the business may publish its locations with tours and day passes: from 0.22.0 get_visit_options, book_tour and request_day_pass, and locations.csv (plugins.ts, plugin-data.ts, visits.ts)
  concierge?: boolean; // vacation rentals: from 0.48.0 the concierge (local picks, area guide and events, house guide, Which home fits, Plan my stay, Continue on WhatsApp; concierge.ts) and places.csv, area.csv, events.csv, house.csv
  itinerary?: "tour" | "dmc"; // tour operators and DMCs: from 0.50.0 trips day by day (Itineraries, My trip by code, a DMC proposal's price breakdown; itinerary.ts) and trips.csv, trip_days.csv, trip_items.csv, trip_prices.csv
  /** 0.62.0 (`collections`): searchable lists the industry defines in its file, each a data file, a read-only tool, a menu option and a card screen (collections.ts). Contributed industries only. */
  collections?: CollectionDef[];
  /** 0.63.0 (`industryWords`): the industry's own titles for menu options by kind; a plug-in on an older version keeps the engine's (plugin-mcp.ts). Contributed industries only. */
  menuTitles?: Record<string, string>;
  /** 0.63.0 (`industryWords`): more rules for the assistant, in the server's instructions. Contributed industries only. */
  rules?: string[];
  /** A card theme suggested for the industry's businesses with no colours of their own (cardExtras). Contributed industries only. */
  cardTheme?: string;
  /** 0.64.0 (`industryForms`): request forms every business in the industry gets, in the Form Tool's format, sent to the business's own channels only (plugin-mcp.ts formsFor). Contributed industries only. */
  forms?: CustomForm[];
  /** 0.65.0 (`industryNouns`): the concierge's words for the host, a home, the homes and the house guide (concierge.ts wordsOf). Contributed industries only. */
  nouns?: { host?: string; home?: string; homes?: string; houseGuide?: string };
  show?: boolean; // events: from 0.18.0 a show or conference that published its programme gets the event guide (Agenda, Speakers, Exhibitors & sponsors, Enquiry; event-guide.ts)
};

const NO_ADVICE = "Scheduling and information only: never give medical, mental-health or clinical advice, and never ask for symptoms or records.";
const NO_FIN = "Information and scheduling only: never give financial, investment, tax or legal advice, and never ask for account numbers or ID numbers.";

// slug | engine | title | tool names | noun | span | perGuest | note
const r = (
  slug: string, engine: Engine, title: string, tools: [string, string, string], noun: string,
  extra: Partial<Pick<IndustryFunction, "span" | "perGuest" | "note" | "members" | "infoFirst" | "software" | "show" | "visits" | "concierge" | "itinerary">> = {},
): IndustryFunction => ({ slug, engine, title, tools, noun, ...extra });

export const industryFunctions: IndustryFunction[] = [
  // Food and retail: order engine
  r("restaurants", "order", "Order ahead and takeaway", ["browse_menu", "place_order", "get_order_status"], "menu item"),
  r("coffee-shops", "order", "Mobile order-ahead for pickup", ["get_menu", "place_pickup_order", "get_order_status"], "drink or snack"),
  r("florists", "order", "Bouquets for pickup or delivery", ["browse_bouquets", "order_flowers", "get_flower_order_status"], "bouquet", { note: "Never promise a delivery time, same-day delivery or an exact seasonal flower the florist has not confirmed; the florist confirms every order and may substitute flowers of the same style and value." }),
  r("food-delivery", "order", "Delivery orders", ["browse_menu", "place_delivery_order", "get_delivery_status"], "menu item"),
  r("ghost-kitchens", "order", "Order from a cloud-kitchen brand", ["browse_brand_menus", "place_order", "get_order_status"], "dish"),
  r("meal-kits", "order", "Pick a plan and order a weekly box", ["list_plans_and_meals", "request_box_order", "get_box_status"], "meal plan or kit"),
  r("grocery", "order", "Build a pickup or delivery list", ["search_products", "place_pickup_order", "get_order_status"], "grocery product"),
  r("convenience-stores", "order", "Reserve items for quick pickup", ["search_items", "reserve_for_pickup", "get_pickup_status"], "store item"),
  r("retail", "order", "Product search and reserve in store", ["search_products", "reserve_item", "get_reservation_status"], "product"),
  r("fashion", "order", "Find sizes and reserve for try-on", ["search_apparel", "reserve_for_tryon", "get_reservation_status"], "garment"),
  r("electronics", "order", "Check stock and reserve a gadget", ["search_gadgets", "reserve_gadget", "get_reservation_status"], "gadget"),
  r("furniture", "order", "Browse pieces and request an order", ["browse_collection", "request_furniture_order", "get_order_status"], "piece"),
  r("beauty-ecommerce", "order", "Shop products and place an order", ["search_beauty_products", "place_order", "get_order_status"], "beauty product"),
  r("subscriptions", "order", "Choose a box and start a subscription request", ["list_boxes", "request_subscription", "get_subscription_status"], "box"),

  // Lodging, venues, tickets and rentals: stay engine
  r("hospitality", "stay", "Room availability, rates and booking requests", ["check_room_availability", "request_booking", "get_booking_status"], "room type", { span: "nights" }),
  r("casinos", "stay", "Hotel rooms and show tickets (no wagering)", ["check_room_availability", "request_booking", "get_booking_status"], "room or show", { span: "nights", note: "Never place, take or discuss wagers or odds." }),
  r("events", "stay", "Venue availability, pricing and date holds", ["check_venue_availability", "request_venue_hold", "get_hold_status"], "venue space", { span: "days", show: true }),
  r("wedding-services", "stay", "Check your date and request a consultation", ["check_date_availability", "request_wedding_consultation", "get_request_status"], "package", { span: "single" }),
  r("bars-nightlife", "stay", "Table and guest-list requests", ["check_table_availability", "request_table", "get_reservation_status"], "table or guest list", { span: "single" }),
  r("travel", "stay", "Tour and trip availability with price per traveller", ["check_trip_availability", "request_trip_booking", "get_booking_status"], "trip or tour", { span: "single", perGuest: true }),
  r("cruise-lines", "stay", "Sailing availability and cabin pricing", ["check_sailings", "request_cabin_hold", "get_hold_status"], "cabin on a sailing", { span: "single", perGuest: true }),
  r("theme-parks", "stay", "Ticket availability for a visit date", ["check_ticket_availability", "request_tickets", "get_ticket_request_status"], "ticket", { span: "single", perGuest: true }),
  r("museums", "stay", "Timed tickets and exhibitions", ["check_ticket_availability", "request_tickets", "get_ticket_request_status"], "ticket", { span: "single", perGuest: true }),
  r("sports-teams", "stay", "Seat availability and ticket requests", ["check_seat_availability", "request_tickets", "get_ticket_request_status"], "seat section", { span: "single", perGuest: true }),
  r("vacation-rentals", "stay", "Home availability, nightly rates and booking", ["check_rental_availability", "request_booking", "get_booking_status"], "home", { span: "nights", concierge: true }),
  r("tour-operators", "stay", "Tour departures, price per traveller and trips day by day", ["check_tour_departures", "request_tour_booking", "get_booking_status"], "tour departure", { span: "single", perGuest: true, itinerary: "tour", note: "Share only the itinerary, departures and prices the operator published; never invent a flight, hotel, time or booking reference, and never say a place on a tour is confirmed, since the operator confirms every booking." }),
  r("car-rental", "stay", "Vehicle availability and rental price", ["check_vehicle_availability", "request_reservation", "get_reservation_status"], "vehicle class", { span: "days" }),
  r("coworking", "stay", "Desk and office availability and rates", ["check_space_availability", "request_space_booking", "get_booking_status"], "desk, room or office", { span: "days", members: true, visits: true }),

  // Appointments, tours, demos and consultations: appt engine
  r("healthcare", "appt", "Find and request appointments", ["find_appointment_slots", "request_appointment", "get_appointment_status"], "visit type", { note: NO_ADVICE }),
  r("dental", "appt", "Book cleanings, exams and consults", ["find_appointment_slots", "request_appointment", "get_appointment_status"], "dental visit", { note: NO_ADVICE }),
  r("optometry", "appt", "Book eye exams and fittings", ["find_exam_slots", "request_exam", "get_exam_status"], "eye-care visit", { note: NO_ADVICE }),
  r("dermatology", "appt", "Book skin-care visits", ["find_appointment_slots", "request_appointment", "get_appointment_status"], "skin visit", { note: NO_ADVICE }),
  r("chiropractic", "appt", "Book adjustments and therapy sessions", ["find_session_slots", "request_session", "get_session_status"], "session", { note: NO_ADVICE }),
  r("mental-health", "appt", "Request an intake or session", ["find_intake_slots", "request_intake", "get_request_status"], "session", { note: NO_ADVICE + " If the customer seems in crisis, point them to their local emergency number or crisis line instead of booking (in the US: 988 or 911)." }),
  r("veterinary", "appt", "Book pet appointments", ["find_pet_appointment_slots", "request_pet_appointment", "get_appointment_status"], "pet visit", { note: "Do not give veterinary advice; for an emergency tell the owner to call the clinic or an emergency vet now." }),
  r("med-spa", "appt", "Book aesthetic treatments and consults", ["find_treatment_slots", "request_treatment", "get_treatment_status"], "treatment", { note: NO_ADVICE }),
  r("beauty", "appt", "Book salon services with a stylist", ["find_salon_slots", "request_salon_appointment", "get_appointment_status"], "service"),
  r("fitness", "appt", "Book classes, trials and tours", ["find_class_slots", "request_class_spot", "get_booking_status"], "class or trial"),
  r("automotive", "appt", "Book service and test drives", ["find_service_slots", "request_service_appointment", "get_appointment_status"], "service or test drive"),
  r("home-health", "appt", "Request a care assessment", ["find_assessment_slots", "request_assessment", "get_request_status"], "assessment", { note: NO_ADVICE }),
  r("senior-care", "appt", "Schedule community tours", ["find_tour_slots", "request_tour", "get_tour_status"], "tour", { note: NO_ADVICE }),
  r("real-estate", "appt", "Request property showings", ["find_showing_slots", "request_showing", "get_showing_status"], "showing"),
  r("legal", "appt", "Book an initial consultation", ["find_consult_slots", "request_consultation", "get_consult_status"], "consultation", { note: NO_FIN }),
  r("accounting", "appt", "Book a tax or bookkeeping consult", ["find_consult_slots", "request_consultation", "get_consult_status"], "consultation", { note: NO_FIN }),
  r("financial-services", "appt", "Book a banker or advisor meeting", ["find_meeting_slots", "request_meeting", "get_meeting_status"], "meeting", { note: NO_FIN }),
  r("wealth", "appt", "Book an intro meeting with an advisor", ["find_meeting_slots", "request_meeting", "get_meeting_status"], "meeting", { note: NO_FIN }),
  r("lending", "appt", "Book a loan or mortgage consultation", ["find_consult_slots", "request_consultation", "get_consult_status"], "consultation", { note: NO_FIN }),
  r("tutoring", "appt", "Book tutoring sessions and prep trials", ["find_session_slots", "request_session", "get_session_status"], "session"),
  r("childcare", "appt", "Schedule tours and enrollment calls", ["find_tour_slots", "request_tour", "get_tour_status"], "tour"),
  r("photography", "appt", "Book a shoot or consultation", ["find_shoot_slots", "request_shoot", "get_shoot_status"], "shoot"),
  r("education", "appt", "Book campus visits and info sessions", ["find_visit_slots", "request_visit", "get_visit_status"], "visit"),
  r("universities", "appt", "Book campus tours and advising", ["find_tour_slots", "request_tour", "get_tour_status"], "tour or advising slot"),
  r("consulting", "appt", "Book a discovery call", ["find_call_slots", "request_discovery_call", "get_call_status"], "discovery call"),
  r("agencies", "appt", "Book a strategy call", ["find_call_slots", "request_strategy_call", "get_call_status"], "strategy call"),
  r("saas", "appt", "Book a product demo", ["find_demo_slots", "request_demo", "get_demo_status"], "demo", { software: true }),
  r("dev-tools", "appt", "Book a technical demo or onboarding", ["find_demo_slots", "request_demo", "get_demo_status"], "demo"),
  r("cybersecurity", "appt", "Book a security assessment call", ["find_assessment_slots", "request_assessment_call", "get_call_status"], "assessment call", { note: "Never ask for credentials, keys or details of live vulnerabilities in chat." }),
  r("recruiting", "appt", "Book an intro call for employers or candidates", ["find_call_slots", "request_intro_call", "get_call_status"], "intro call"),
  r("hr-comms", "appt", "Book a platform demo", ["find_demo_slots", "request_demo", "get_demo_status"], "demo"),
  r("religious-orgs", "appt", "RSVP to services and events, book pastoral time", ["find_event_slots", "request_rsvp", "get_rsvp_status"], "service, event or meeting"),

  // Priced jobs: quote engine
  r("hvac", "quote", "Instant estimate and service visit request", ["get_service_estimate", "request_service_visit", "get_job_status"], "HVAC service"),
  r("plumbing", "quote", "Estimate and book a plumber", ["get_service_estimate", "request_plumber_visit", "get_job_status"], "plumbing job"),
  r("electricians", "quote", "Estimate and book an electrician", ["get_service_estimate", "request_electrician_visit", "get_job_status"], "electrical job"),
  r("home-services", "quote", "Estimate a local home service", ["get_service_estimate", "request_service_visit", "get_job_status"], "home service"),
  r("cleaning", "quote", "Price a clean by home size and book", ["get_cleaning_estimate", "request_cleaning", "get_job_status"], "clean"),
  r("landscaping", "quote", "Estimate lawn and landscape work", ["get_landscaping_estimate", "request_site_visit", "get_job_status"], "landscaping job"),
  r("pest-control", "quote", "Estimate treatment and request a visit", ["get_treatment_estimate", "request_treatment", "get_job_status"], "treatment"),
  r("solar", "quote", "Rough system estimate and site survey request", ["get_solar_estimate", "request_site_survey", "get_survey_status"], "solar system", { note: "Estimates are rough published ranges, never a guarantee of savings or output." }),
  r("moving-storage", "quote", "Moving estimate and storage rates", ["get_moving_estimate", "request_move", "get_move_status"], "move or storage unit"),
  r("dmc", "quote", "Tailor-made packages with a price breakdown, and proposals day by day", ["get_package_estimate", "request_custom_proposal", "get_proposal_status"], "travel package", { itinerary: "dmc", note: "Share only the packages, proposals and prices the company published; a proposal's price holds only until the date it gives, and the company confirms every booking. Never invent a flight, hotel, time, booking reference or price." }),
  r("catering", "quote", "Catering price by headcount", ["get_catering_estimate", "request_catering_quote", "get_quote_status"], "catering package"),
  r("logistics", "quote", "Shipping rate estimate and pickup request", ["get_shipping_estimate", "request_pickup", "track_shipment"], "shipment"),
  r("insurance", "quote", "Quote request intake", ["get_quote_requirements", "request_quote", "get_quote_status"], "policy type", { note: NO_FIN + " Do not quote premiums; collect details for a licensed agent." }),
  r("telecom", "quote", "Compare plans and request service", ["get_plan_estimate", "request_service", "get_order_status"], "plan"),
  r("crypto", "quote", "Fee estimate and onboarding request", ["get_fee_estimate", "request_onboarding", "get_request_status"], "service", { note: NO_FIN + " Never discuss price predictions." }),

  // References and requests: track engine
  r("government", "track", "Service requests and case status", ["lookup_case_status", "submit_service_request", "get_request_status"], "service request"),
  r("utilities", "track", "Outage and service-request status", ["lookup_service_status", "report_issue", "get_issue_status"], "service issue"),
  r("property-management", "track", "Maintenance requests and status", ["lookup_request_status", "submit_maintenance_request", "get_request_status"], "maintenance request"),
  r("nonprofits", "track", "Volunteer and donation requests", ["lookup_request_status", "submit_volunteer_or_donation_request", "get_request_status"], "volunteer or donation request", { note: "Never take card or bank details in chat." }),
  r("chambers", "track", "Chamber information, membership enquiries and member businesses", ["lookup_membership_reference", "send_chamber_enquiry", "get_enquiry_status"], "membership or event enquiry", { members: true, infoFirst: true, note: "Share only what the chamber or association has published about membership, dues, events and programs. Never promise that membership will be approved, or any introduction, business lead or policy outcome, and never take payment of dues in chat." }),
  r("associations", "track", "Membership applications and renewals", ["lookup_membership_status", "submit_membership_request", "get_request_status"], "membership request"),
  r("political-campaigns", "track", "Volunteer and event sign-ups", ["lookup_signup_status", "submit_volunteer_signup", "get_signup_status"], "volunteer sign-up", { note: "Non-partisan service: share only what the campaign has published; never persuade, and never take donations in chat." }),
  r("airlines", "track", "Flight status and support requests", ["lookup_flight_status", "submit_support_request", "get_request_status"], "flight or support request"),
  r("public-transit", "track", "Service alerts and issue reports", ["lookup_service_alerts", "report_issue", "get_issue_status"], "service alert or report"),
  r("pharmacy", "track", "Store services and callback requests", ["lookup_refill_status", "request_callback", "get_callback_status"], "callback request", { note: NO_ADVICE + " Never collect medication names or prescription numbers in chat; the pharmacy gets those by phone." }),
];

// Industries contributed in the public plug-in repository (contributed-industries.ts); a built-in row wins.
for (const c of contributions) if (!industryFunctions.some((f) => f.slug === c.slug)) industryFunctions.push(functionOf(c));

export const functionBySlug = new Map(industryFunctions.map((f) => [f.slug, f]));
export const getFunction = (slug: string) => functionBySlug.get(slug) ?? (isPreviewSlug(slug) ? previewFunctions.get(slug) : undefined);
