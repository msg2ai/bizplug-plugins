# Tools

Every tool a BizPlug plug-in can offer, with its inputs. It is generated from the plug-in server's own code with the rest of this repository (plug-in version 0.65.0), so it always matches what the server answers. Please do not edit it by hand. The same list for every industry, machine readable, is [tools.json](tools.json).

## How a plug-in is called

A plug-in is an MCP server over streamable HTTP, with JSON-RPC 2.0 and no sign-in:

- `https://mcp.bizplug.ai/plugin/<industry>` serves every business in an industry. Each tool takes a `business` input: the business's slug.
- `https://mcp.bizplug.ai/plugin/<industry>/<business>` serves one business. Its tools take the same inputs without `business`.
- `https://mcp-test.bizplug.ai` serves the same build for testing.

You can call one yourself. The **sample businesses** below answer like a real business, mark every answer as sample data, and **never send a request anywhere**, so you can try every tool, requests included:

| Engine | Sample businesses |
| --- | --- |
| `order` | `coffee-shops/demo-cafe`, `florists/demo-florist`, `retail/demo-shop` |
| `stay` | `activity-calendar/demo-sample`, `events/demo-venue`, `hospitality/demo-hotel`, `hospitality/vrp-test-villaakerlyckan`, `tour-operators/demo-nile-river-cruises`, `tour-operators/demo-riverbend-journeys`, `tourism-bureaus/demo-sample` |
| `appt` | `beauty/demo-salon`, `restaurant-reservations/demo-sample` |
| `quote` | `dmc/demo-andes-path`, `hvac/demo-hvac` |
| `track` | `property-management/demo-pm` |

List the tools, then call one:

```bash
curl -s https://mcp.bizplug.ai/plugin/coffee-shops/demo-cafe \
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

curl -s https://mcp.bizplug.ai/plugin/coffee-shops/demo-cafe \
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_menu","arguments":{}}}'
```

Each result has `content` (text written for the assistant) and, for most tools, `structuredContent` (the same answer as data, which the card in ChatGPT draws). A tool that fails answers with `isError: true` and says why.

## Tools every plug-in has

### `show_menu` (Menu)

Read-only.

How the plug-in's instructions tell the assistant to use it: Call it when the customer asks what this can do, asks for a menu or options, or opens without a question. ChatGPT shows the menu as a card with a button and a short form for each option. Where there is no card, show the options exactly as returned (same titles, same order).

No inputs.

### `get_business_info` (Business information)

Read-only.

How the plug-in's instructions tell the assistant to use it: If the profile does not cover the question, say so and use get_contact.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `question` | string |  | The customer's question, in their words. |
| `section` | `committees` or `news` or `social` |  | Optional: "committees" for the business's committees, "news" for its news, events and newsletter, "social" for its latest social media posts and where to follow it. Leave out for everything else. |

### `get_contact` (Contact details)

Read-only.

No inputs.

### `open_form` (Open a form)

Read-only. Only when the business linked forms of its own.

How the plug-in's instructions tell the assistant to use it: Use it when the customer wants to apply, register, sign up, give feedback or do what one of the forms is for.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `form` | string | yes | The form's id or title, from the business's forms. |
| `name` | string |  | The customer's name, when they gave it. |
| `email` | string |  | The customer's email, when they gave it. |
| `phone` | string |  | The customer's phone, when they gave it. |
| `date` | string |  | A date the form asks for, as YYYY-MM-DD, when the customer gave it. |
| `details` | string |  | What the customer said the form is about, in their words. |

### `my_registration` (My registration)

Sends something to the business: once sent, it cannot be taken back. Only where the business connected Ticket Tailor or Humanitix and switched on My registration, from version 0.58.0. The card calls it; the assistant does not see it.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `action` | `send_code` or `open` or `list` or `change` | yes | send_code: email a code; open: check the code; list: the tickets again; change: change one ticket. |
| `email` | string |  | The email the customer registered with (send_code, open). |
| `code` | string |  | The 6-digit code from the email (open). |
| `session` | string |  | The session the open step returned (list, change). |
| `ticket` | string |  | The ticket to change (change). |
| `first_name` | string |  |  |
| `last_name` | string |  |  |
| `new_email` | string |  |  |
| `phone` | string |  |  |
| `linkedin` | string |  | 0.59.0: the attendee's LinkedIn profile address (change). |
| `consent` | boolean |  | 0.59.0: the attendee ticked that their public LinkedIn profile may be looked up and shared with the business (change). |

## The three tools of each engine

Every industry runs on one of 5 engines ([INDUSTRIES.md](INDUSTRIES.md)). The engine gives it a look-up, a request and a status check; the industry only names them and adds its words and rules.

### `order`: Browse a catalog with prices, send a pickup or delivery order, check its status.

The inputs below are Restaurants & Food Service's. Every order industry takes the same inputs under its own tool names (table at the end of this section); only the words in the descriptions change. Try it on a sample business: `https://mcp.bizplug.ai/plugin/coffee-shops/demo-cafe`, `https://mcp.bizplug.ai/plugin/florists/demo-florist`, `https://mcp.bizplug.ai/plugin/retail/demo-shop`.

#### `browse_menu` (look-up: Browse and prices)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `query` | string |  | Optional words to search the list for, e.g. a menu item name or category. |
| `category` | string |  | Optional: one of the business's own category names, to show only that category. |

#### `place_order` (request: Place the order)

Sends something to the business: once sent, it cannot be taken back.

How the plug-in's instructions tell the assistant to use it: Use only once the customer has confirmed the items.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `items` | array of object | yes | What the customer wants, using ids from the look-up tool. |
| `items[].id` | string | yes | The menu item id. |
| `items[].quantity` | integer | yes |  |
| `items[].notes` | string |  | Options or changes, e.g. size or milk. |
| `fulfilment` | `pickup` or `delivery` |  |  |
| `when` | string |  | Requested pickup or delivery time, in the customer's words. |
| `address` | string |  | Delivery address, when fulfilment is delivery. |
| `name` | string | yes | Customer's name. |
| `email` | string | yes | Email the business can reply to. |
| `phone` | string |  | Optional phone number. |
| `notes` | string |  | Anything else the business should know. |

#### `get_order_status` (status: Order status)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `reference` | string | yes | The reference returned when the request was made, e.g. BP-7K2Q9D. |

<details><summary>Tool names of the 14 order industries</summary>

| Industry | Look-up | Request | Status |
| --- | --- | --- | --- |
| Restaurants & Food Service | `browse_menu` | `place_order` | `get_order_status` |
| Coffee Shops & Cafes | `get_menu` | `place_pickup_order` | `get_order_status` |
| Florists & Flower Delivery | `browse_bouquets` | `order_flowers` | `get_flower_order_status` |
| Food Delivery | `browse_menu` | `place_delivery_order` | `get_delivery_status` |
| Ghost & Cloud Kitchens | `browse_brand_menus` | `place_order` | `get_order_status` |
| Meal Kits & Subscriptions | `list_plans_and_meals` | `request_box_order` | `get_box_status` |
| Grocery & Supermarkets | `search_products` | `place_pickup_order` | `get_order_status` |
| Convenience & C-Stores | `search_items` | `reserve_for_pickup` | `get_pickup_status` |
| Retail & E-commerce | `search_products` | `reserve_item` | `get_reservation_status` |
| Fashion & Apparel | `search_apparel` | `reserve_for_tryon` | `get_reservation_status` |
| Electronics & Gadgets | `search_gadgets` | `reserve_gadget` | `get_reservation_status` |
| Furniture & Home Goods | `browse_collection` | `request_furniture_order` | `get_order_status` |
| Beauty E-commerce | `search_beauty_products` | `place_order` | `get_order_status` |
| Subscription Boxes | `list_boxes` | `request_subscription` | `get_subscription_status` |

</details>

### `stay`: Check what is free for dates and party size with the total price, send a booking request, check its status.

The inputs below are Hospitality & Hotels's. Every stay industry takes the same inputs under its own tool names (table at the end of this section); only the words in the descriptions change. Try it on a sample business: `https://mcp.bizplug.ai/plugin/activity-calendar/demo-sample`, `https://mcp.bizplug.ai/plugin/events/demo-venue`, `https://mcp.bizplug.ai/plugin/hospitality/demo-hotel`, `https://mcp.bizplug.ai/plugin/hospitality/vrp-test-villaakerlyckan`, `https://mcp.bizplug.ai/plugin/tour-operators/demo-nile-river-cruises`, `https://mcp.bizplug.ai/plugin/tour-operators/demo-riverbend-journeys`, `https://mcp.bizplug.ai/plugin/tourism-bureaus/demo-sample`.

#### `check_room_availability` (look-up: Availability and price)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `start` | string |  | Check-in date, as YYYY-MM-DD. |
| `end` | string |  | Check-out date, as YYYY-MM-DD. |
| `guests` | integer |  | Number of people. |
| `adults` | integer |  | Number of adults. Use with children instead of guests. |
| `children` | integer |  | Number of children (default 0). |
| `rooms` | integer |  | How many rooms of the same type (default 1). |
| `month` | string |  | YYYY-MM: the calendar month to show, when no dates are chosen yet. |

#### `request_booking` (request: Request the booking)

Sends something to the business: once sent, it cannot be taken back.

How the plug-in's instructions tell the assistant to use it: Use only once the customer has chosen an option.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `option` | string | yes | The room type id chosen from the availability result. |
| `start` | string | yes | Check-in date, as YYYY-MM-DD. |
| `end` | string |  | Check-out date, as YYYY-MM-DD. |
| `guests` | integer |  | Number of people. |
| `name` | string | yes | Customer's name. |
| `email` | string | yes | Email the business can reply to. |
| `phone` | string |  | Optional phone number. |
| `notes` | string |  | Anything else the business should know. |
| `adults` | integer |  | Number of adults. Use with children instead of guests. |
| `children` | integer |  | Number of children (default 0). |
| `rooms` | integer |  | How many rooms of the same type (default 1). |

#### `get_booking_status` (status: Booking status)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `reference` | string | yes | The reference returned when the request was made, e.g. BP-7K2Q9D. |

<details><summary>Tool names of the 16 stay industries</summary>

| Industry | Look-up | Request | Status |
| --- | --- | --- | --- |
| Hospitality & Hotels | `check_room_availability` | `request_booking` | `get_booking_status` |
| Casinos & Gaming | `check_room_availability` | `request_booking` | `get_booking_status` |
| Events & Conferences | `check_venue_availability` | `request_venue_hold` | `get_hold_status` |
| Wedding & Events Pros | `check_date_availability` | `request_wedding_consultation` | `get_request_status` |
| Bars & Nightlife | `check_table_availability` | `request_table` | `get_reservation_status` |
| Travel & Tourism | `check_trip_availability` | `request_trip_booking` | `get_booking_status` |
| Cruise Lines | `check_sailings` | `request_cabin_hold` | `get_hold_status` |
| Theme Parks & Attractions | `check_ticket_availability` | `request_tickets` | `get_ticket_request_status` |
| Museums & Galleries | `check_ticket_availability` | `request_tickets` | `get_ticket_request_status` |
| Sports Teams & Venues | `check_seat_availability` | `request_tickets` | `get_ticket_request_status` |
| Vacation Rentals | `check_rental_availability` | `request_booking` | `get_booking_status` |
| Tour Operators | `check_tour_departures` | `request_tour_booking` | `get_booking_status` |
| Car Rental | `check_vehicle_availability` | `request_reservation` | `get_reservation_status` |
| Coworking & Offices | `check_space_availability` | `request_space_booking` | `get_booking_status` |
| Activity Calendar | `check_activity_calendar` | `request_activity_places` | `get_activity_request_status` |
| Tourism Bureaus & Destinations | `find_stays_and_activities` | `book_stay_or_activity` | `get_booking_status` |

</details>

### `appt`: Find open times on a day, request an appointment, check its status.

The inputs below are Healthcare & Clinics's. Every appt industry takes the same inputs under its own tool names (table at the end of this section); only the words in the descriptions change. Try it on a sample business: `https://mcp.bizplug.ai/plugin/beauty/demo-salon`, `https://mcp.bizplug.ai/plugin/restaurant-reservations/demo-sample`.

#### `find_appointment_slots` (look-up: Open times)

Read-only.

How the plug-in's instructions tell the assistant to use it: Scheduling and information only: never give medical, mental-health or clinical advice, and never ask for symptoms or records.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `service` | string |  | Optional visit type id or name. |
| `date` | string |  | Day to look at (defaults to the next open day), as YYYY-MM-DD. |

#### `request_appointment` (request: Request the appointment)

Sends something to the business: once sent, it cannot be taken back.

How the plug-in's instructions tell the assistant to use it: Use only once the customer has picked a time. Scheduling and information only: never give medical, mental-health or clinical advice, and never ask for symptoms or records.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `service` | string | yes | The visit type id or name. |
| `date` | string | yes | Requested day, as YYYY-MM-DD. |
| `time` | string | yes | Requested start time as HH:MM (24h), from the slots result. |
| `name` | string | yes | Customer's name. |
| `email` | string | yes | Email the business can reply to. |
| `phone` | string |  | Optional phone number. |
| `notes` | string |  | Anything else the business should know. |

#### `get_appointment_status` (status: Request status)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `reference` | string | yes | The reference returned when the request was made, e.g. BP-7K2Q9D. |

<details><summary>Tool names of the 33 appt industries</summary>

| Industry | Look-up | Request | Status |
| --- | --- | --- | --- |
| Healthcare & Clinics | `find_appointment_slots` | `request_appointment` | `get_appointment_status` |
| Dental Practices | `find_appointment_slots` | `request_appointment` | `get_appointment_status` |
| Optometry & Eye Care | `find_exam_slots` | `request_exam` | `get_exam_status` |
| Dermatology & Skin | `find_appointment_slots` | `request_appointment` | `get_appointment_status` |
| Chiropractic & PT | `find_session_slots` | `request_session` | `get_session_status` |
| Mental Health & Therapy | `find_intake_slots` | `request_intake` | `get_request_status` |
| Veterinary & Pet Care | `find_pet_appointment_slots` | `request_pet_appointment` | `get_appointment_status` |
| Med Spas & Aesthetics | `find_treatment_slots` | `request_treatment` | `get_treatment_status` |
| Beauty & Salons | `find_salon_slots` | `request_salon_appointment` | `get_appointment_status` |
| Fitness & Gyms | `find_class_slots` | `request_class_spot` | `get_booking_status` |
| Automotive & Dealerships | `find_service_slots` | `request_service_appointment` | `get_appointment_status` |
| Home Health & Hospice | `find_assessment_slots` | `request_assessment` | `get_request_status` |
| Senior Care & Communities | `find_tour_slots` | `request_tour` | `get_tour_status` |
| Real Estate | `find_showing_slots` | `request_showing` | `get_showing_status` |
| Legal Services | `find_consult_slots` | `request_consultation` | `get_consult_status` |
| Tax & Accounting | `find_consult_slots` | `request_consultation` | `get_consult_status` |
| Financial Services & Banking | `find_meeting_slots` | `request_meeting` | `get_meeting_status` |
| Wealth & Investing | `find_meeting_slots` | `request_meeting` | `get_meeting_status` |
| Lending & Mortgages | `find_consult_slots` | `request_consultation` | `get_consult_status` |
| Tutoring & Test Prep | `find_session_slots` | `request_session` | `get_session_status` |
| Childcare & Daycare | `find_tour_slots` | `request_tour` | `get_tour_status` |
| Photography & Creative | `find_shoot_slots` | `request_shoot` | `get_shoot_status` |
| Education & Schools | `find_visit_slots` | `request_visit` | `get_visit_status` |
| Universities & Colleges | `find_tour_slots` | `request_tour` | `get_tour_status` |
| Consulting & Professional Services | `find_call_slots` | `request_discovery_call` | `get_call_status` |
| Marketing Agencies | `find_call_slots` | `request_strategy_call` | `get_call_status` |
| SaaS & Software | `find_demo_slots` | `request_demo` | `get_demo_status` |
| Developer Tools | `find_demo_slots` | `request_demo` | `get_demo_status` |
| Cybersecurity | `find_assessment_slots` | `request_assessment_call` | `get_call_status` |
| Recruiting & Staffing | `find_call_slots` | `request_intro_call` | `get_call_status` |
| HR & Internal Comms | `find_demo_slots` | `request_demo` | `get_demo_status` |
| Religious Organizations | `find_event_slots` | `request_rsvp` | `get_rsvp_status` |
| Restaurant Reservations | `find_table_times` | `request_table_booking` | `get_reservation_status` |

</details>

### `quote`: Work out an estimate from published price rules, request a quote or a visit, check its status.

The inputs below are HVAC & Heating/Cooling's. Every quote industry takes the same inputs under its own tool names (table at the end of this section); only the words in the descriptions change. Try it on a sample business: `https://mcp.bizplug.ai/plugin/dmc/demo-andes-path`, `https://mcp.bizplug.ai/plugin/hvac/demo-hvac`.

#### `get_service_estimate` (look-up: Price estimate)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `service` | string |  | Optional HVAC service id or name. Omit to list what can be estimated. |
| `size` | number |  | How much, in the unit the price list uses (e.g. square feet, guests, miles). |

#### `request_service_visit` (request: Request the job)

Sends something to the business: once sent, it cannot be taken back.

How the plug-in's instructions tell the assistant to use it: Use only once the customer agrees to send it.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `service` | string | yes | The HVAC service id or name. |
| `size` | number |  |  |
| `location` | string |  | Address or ZIP code for the work. |
| `name` | string | yes | Customer's name. |
| `email` | string | yes | Email the business can reply to. |
| `phone` | string |  | Optional phone number. |
| `notes` | string |  | Anything else the business should know. |

#### `get_job_status` (status: Job status)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `reference` | string | yes | The reference returned when the request was made, e.g. BP-7K2Q9D. |

<details><summary>Tool names of the 15 quote industries</summary>

| Industry | Look-up | Request | Status |
| --- | --- | --- | --- |
| HVAC & Heating/Cooling | `get_service_estimate` | `request_service_visit` | `get_job_status` |
| Plumbing | `get_service_estimate` | `request_plumber_visit` | `get_job_status` |
| Electricians | `get_service_estimate` | `request_electrician_visit` | `get_job_status` |
| Local & Home Services | `get_service_estimate` | `request_service_visit` | `get_job_status` |
| Cleaning Services | `get_cleaning_estimate` | `request_cleaning` | `get_job_status` |
| Landscaping & Lawn | `get_landscaping_estimate` | `request_site_visit` | `get_job_status` |
| Pest Control | `get_treatment_estimate` | `request_treatment` | `get_job_status` |
| Solar & Clean Energy | `get_solar_estimate` | `request_site_survey` | `get_survey_status` |
| Moving & Storage | `get_moving_estimate` | `request_move` | `get_move_status` |
| Destination Management Companies | `get_package_estimate` | `request_custom_proposal` | `get_proposal_status` |
| Catering & Events | `get_catering_estimate` | `request_catering_quote` | `get_quote_status` |
| Logistics & Delivery | `get_shipping_estimate` | `request_pickup` | `track_shipment` |
| Insurance | `get_quote_requirements` | `request_quote` | `get_quote_status` |
| Telecom & ISPs | `get_plan_estimate` | `request_service` | `get_order_status` |
| Crypto & Fintech | `get_fee_estimate` | `request_onboarding` | `get_request_status` |

</details>

### `track`: Look up a reference the customer already has, send a new request, check its status.

The inputs below are Government & Public Sector's. Every track industry takes the same inputs under its own tool names (table at the end of this section); only the words in the descriptions change. Try it on a sample business: `https://mcp.bizplug.ai/plugin/property-management/demo-pm`.

#### `lookup_case_status` (look-up: Look up a reference)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `reference` | string | yes | The reference or number the customer was given. |

#### `submit_service_request` (request: Send a request)

Sends something to the business: once sent, it cannot be taken back.

How the plug-in's instructions tell the assistant to use it: Use only once the customer has given the details and agrees to send it.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `topic` | string | yes | Short title for the service request. |
| `message` | string | yes | The details, in the customer's words. |
| `name` | string | yes | Customer's name. |
| `email` | string | yes | Email the business can reply to. |
| `phone` | string |  | Optional phone number. |
| `notes` | string |  | Anything else the business should know. |

#### `get_request_status` (status: Request status)

Read-only.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `reference` | string | yes | The reference returned when the request was made, e.g. BP-7K2Q9D. |

<details><summary>Tool names of the 10 track industries</summary>

| Industry | Look-up | Request | Status |
| --- | --- | --- | --- |
| Government & Public Sector | `lookup_case_status` | `submit_service_request` | `get_request_status` |
| Utilities & Energy | `lookup_service_status` | `report_issue` | `get_issue_status` |
| Property Management | `lookup_request_status` | `submit_maintenance_request` | `get_request_status` |
| Nonprofits & Charities | `lookup_request_status` | `submit_volunteer_or_donation_request` | `get_request_status` |
| Chambers of Commerce & Business Associations | `lookup_membership_reference` | `send_chamber_enquiry` | `get_enquiry_status` |
| Membership Associations | `lookup_membership_status` | `submit_membership_request` | `get_request_status` |
| Political Campaigns & Advocacy | `lookup_signup_status` | `submit_volunteer_signup` | `get_signup_status` |
| Airlines | `lookup_flight_status` | `submit_support_request` | `get_request_status` |
| Public Transit & Mobility | `lookup_service_alerts` | `report_issue` | `get_issue_status` |
| Pharmacies | `lookup_refill_status` | `request_callback` | `get_callback_status` |

</details>

## Tools of the options

A few industries switch on an option that adds tools. Each is offered only when the business published what it needs.

### `check_direct_offer` (Direct offer from the host's website)

Read-only. Only when the business's own website gives signed offers by the Vacation Rental Protocol, and the BizPlug team has set up its domain. Industries: Hospitality & Hotels, Casinos & Gaming, Vacation Rentals, Tourism Bureaus & Destinations.

How the plug-in's instructions tell the assistant to use it: An offer that cannot be checked is returned as unknown and nothing from it may be quoted. Use it when the customer gives dates and a guest count and asks whether the home is free, what it costs or how to book.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `check_in` | string | yes | Arrival date, as YYYY-MM-DD. |
| `check_out` | string | yes | Departure date, as YYYY-MM-DD; after check_in. |
| `guests` | integer | yes | How many guests stay. |

### `get_agenda` (Agenda)

Read-only. Only for a show or conference that published its programme (sessions.csv and the others); it then replaces the venue's three tools. Industries: Events & Conferences.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `date` | string |  | Optional: one day of the event, YYYY-MM-DD, to show only that day. |
| `query` | string |  | Optional words to search the sessions for: a topic, a speaker or a format. |

### `find_speakers` (Speakers)

Read-only. Only for a show or conference that published its programme (sessions.csv and the others); it then replaces the venue's three tools. Industries: Events & Conferences.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `query` | string |  | Optional: a speaker's name, a company or a topic. Omit to list them. |

### `find_exhibitors` (Exhibitors & sponsors)

Read-only. Only for a show or conference that published its programme (sessions.csv and the others); it then replaces the venue's three tools. Industries: Events & Conferences.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `query` | string |  | Optional: a company's name or what the customer is looking for, e.g. stage lighting. |
| `category` | string |  | Optional: one of the event's exhibitor categories, or "Sponsors". |

### `send_event_enquiry` (Event enquiry)

Sends something to the business: once sent, it cannot be taken back. Only for a show or conference that published its programme (sessions.csv and the others); it then replaces the venue's three tools. Industries: Events & Conferences.

How the plug-in's instructions tell the assistant to use it: Use only once the customer has given the details and agrees to send it.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `topic` | `Exhibiting` or `Sponsoring` or `Visiting` or `Speaking` or `Other` | yes | What the enquiry is about. |
| `message` | string | yes | The enquiry, in the customer's words. |
| `company` | string |  | Optional: the customer's company. |
| `name` | string | yes | Customer's name. |
| `email` | string | yes | Email the organisers can reply to. |
| `phone` | string |  | Optional phone number. |

### `find_tickets` (Tickets)

Read-only. Only on events plug-ins whose business connected its Ticket Tailor box office, from version 0.54.0. Industries: Events & Conferences.

How the plug-in's instructions tell the assistant to use it: Use it when the customer asks about tickets, prices, dates or how to buy.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `query` | string |  | Optional words to look for in the event names, places and ticket types. |

### `explore_area` (Explore the area)

Read-only. Only when the host published its local picks (places.csv). Industries: Vacation Rentals.

How the plug-in's instructions tell the assistant to use it: Use it for any question about what to do, where to eat or what is nearby.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `category` | `groceries` or `eat` or `drink` or `beach` or `outdoors` or `activities` or `shopping` or `culture` or `wellness` or `services` |  | Optional: one category of the host's picks. |
| `good_for` | `kids` or `dogs` or `rainy` or `couples` or `groups` or `sunset` or `free` |  | Optional: only picks the host marked good for this. |
| `query` | string |  | Optional: words to look for, such as pizza or kayak. |

### `get_area_guide` (Area guide and events)

Read-only. Only when the host published an area guide or events (area.csv, events.csv). Industries: Vacation Rentals.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `topic` | string |  | Optional: one topic (about, history, map, arrival, around, seasons, rules, essentials, safety) or words to look for. |
| `start` | string |  | Arrival date, YYYY-MM-DD. |
| `end` | string |  | Departure date, YYYY-MM-DD. |

### `get_house_guide` (House guide)

Read-only. Only when the host published a house guide (house.csv). Industries: Vacation Rentals.

How the plug-in's instructions tell the assistant to use it: Never guess how an appliance works.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `home` | string |  | Optional: the home the guest stays in, by id or name. |
| `query` | string |  | Optional: what they ask about, such as grill, washer, oven or Wi-Fi. |

### `match_home` (Which home fits)

Read-only. Only on vacation rental plug-ins from version 0.48.0. Industries: Vacation Rentals.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `adults` | integer | yes | How many adults. |
| `children` | integer |  | How many children. |
| `dogs` | integer |  | How many dogs come along. |
| `needs` | string |  | Optional: what the group wants, in their words (pool table, near the beach, bunk beds). |
| `start` | string |  | Arrival date, YYYY-MM-DD. |
| `end` | string |  | Departure date, YYYY-MM-DD. |

### `plan_stay` (Plan my stay)

Read-only. Only on vacation rental plug-ins from version 0.48.0. Industries: Vacation Rentals.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `start` | string | yes | Arrival date, YYYY-MM-DD. |
| `end` | string | yes | Departure date, YYYY-MM-DD. |
| `adults` | integer | yes | How many adults. |
| `children` | integer |  | How many children. |
| `dogs` | integer |  | How many dogs come along. |
| `interests` | array of string |  | Optional: what they enjoy most. |
| `pace` | `relaxed` or `balanced` or `packed` |  | Optional: how full the days should be. Defaults to balanced. |
| `picks` | array of string |  | Optional: names of the host's picks the guest saved, planned first. |
| `home` | string |  | Optional: the home they chose, by id or name. |

### `continue_on_whatsapp` (Continue on WhatsApp)

Read-only. Only when the host has a WhatsApp concierge or number. Industries: Vacation Rentals.

How the plug-in's instructions tell the assistant to use it: Use it when the guest wants to continue with the host on WhatsApp.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `start` | string |  | Arrival date, YYYY-MM-DD. |
| `end` | string |  | Departure date, YYYY-MM-DD. |
| `adults` | integer |  | How many adults. |
| `children` | integer |  | How many children. |
| `dogs` | integer |  | How many dogs come along. |
| `home` | string |  | Optional: the home they chose. |
| `picks` | array of string |  | Optional: the picks the guest saved. |
| `note` | string |  | Optional: anything else for the host, in the guest's words. |

### `find_itineraries` (Itineraries)

Read-only. Only when the business published itineraries without a code (trips.csv), from version 0.50.0. Industries: Tour Operators, Destination Management Companies.

How the plug-in's instructions tell the assistant to use it: Use it when the customer asks what trips there are.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `query` | string |  | Optional: words to look for, such as a place or a kind of trip. |

### `get_itinerary` (Itinerary day by day)

Read-only. Only when the business published itineraries without a code (trips.csv), from version 0.50.0. Industries: Tour Operators, Destination Management Companies.

How the plug-in's instructions tell the assistant to use it: A traveller's own trip is not found here: use open_my_trip with their code.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `itinerary` | string | yes | The itinerary's id or name, from the itineraries list. |
| `day` | integer |  | Optional: one day of the trip, 1 for the first day. |

### `open_my_trip` (My trip)

Read-only. Only when the business published trips with a code (trips.csv), from version 0.50.0. Industries: Tour Operators, Destination Management Companies.

How the plug-in's instructions tell the assistant to use it: Pass the code exactly as the traveller typed it. Never guess, suggest or repeat a code.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `code` | string | yes | The trip code exactly as the traveller typed it. Never guess, suggest or invent one. |
| `day` | integer |  | Optional: one day of the trip, 1 for the first day. |

### `find_members` (Members)

Read-only. Only when the business published its member businesses (members.csv). Industries: Coworking & Offices, Chambers of Commerce & Business Associations.

How the plug-in's instructions tell the assistant to use it: Share only what the business lists for a member.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `query` | string |  | Optional free text: a member's name, a kind of business, or what the person needs or can offer. Omit to list the members by industry. |
| `industry` | string |  | Optional: one of the industries in the business's member list, to show only those members. |
| `location` | string |  | Optional: a site or floor from the business's member list, to show only the members there. |

### `write_to_member` (Write to a member)

Read-only. Only when the business published its member businesses (members.csv). Industries: Coworking & Offices, Chambers of Commerce & Business Associations.

How the plug-in's instructions tell the assistant to use it: Use it when the person wants to contact a member they found with find_members.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `member` | string | yes | The member business, by its name as find_members returned it. |
| `name` | string | yes | The person's own name, as they gave it in this chat, to sign the message. |
| `company` | string |  | Optional: the person's company, as they gave it. |
| `email` | string |  | Optional: the person's email, to sign the message. |
| `message` | string | yes | What the person wants to say or discuss, in their words. |

### `get_visit_options` (Tours and day passes)

Read-only. Only when the business published its locations (locations.csv). Industries: Coworking & Offices.

How the plug-in's instructions tell the assistant to use it: Use it for any question about tours, day passes or their prices.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `location` | string |  | Optional: one of the business's published locations, to show only that one. |

### `book_tour` (Book a tour)

Sends something to the business: once sent, it cannot be taken back. Only when the business published its locations (locations.csv). Industries: Coworking & Offices.

How the plug-in's instructions tell the assistant to use it: Use only once the customer has chosen the location and the day and wants to go ahead. Never invent a location or tour hours.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `location` | string |  | One of the business's published locations that gives tours, by name. Required when the business has more than one; never a location it did not publish. |
| `date` | string | yes | The day of the tour, as YYYY-MM-DD. |
| `time` | string |  | Optional: the preferred time as HH:MM (24h), or morning, midday, afternoon or evening. |
| `people` | integer |  | Optional: how many people come on the tour. |
| `name` | string |  | Customer's name. Needed unless the business takes these requests on WhatsApp; the tool says so. |
| `email` | string |  | Email the business can reply to. Needed unless the business takes these requests on WhatsApp. |
| `phone` | string |  | Optional phone number. |
| `notes` | string |  | Anything else the business should know. |

### `request_day_pass` (Day pass)

Sends something to the business: once sent, it cannot be taken back. Only when the business published its locations (locations.csv). Industries: Coworking & Offices.

How the plug-in's instructions tell the assistant to use it: Use only once the customer has chosen the location and the day and wants to go ahead. Never invent a price or a location.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `location` | string |  | One of the business's published locations that sells a day pass, by name. Required when the business has more than one; never a location it did not publish. |
| `date` | string | yes | The day the pass is for, as YYYY-MM-DD. |
| `people` | integer |  | How many people need a day pass. Defaults to 1. |
| `name` | string |  | Customer's name. Needed unless the business takes these requests on WhatsApp; the tool says so. |
| `email` | string |  | Email the business can reply to. Needed unless the business takes these requests on WhatsApp. |
| `phone` | string |  | Optional phone number. |
| `notes` | string |  | Anything else the business should know. |

### `get_features` (Features)

Read-only. Industries: SaaS & Software.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `query` | string |  | Optional words to search the features for, e.g. a feature name or what the customer wants to do. Omit to list them. |

### `get_pricing` (Pricing)

Read-only. Industries: SaaS & Software.

How the plug-in's instructions tell the assistant to use it: Never quote a price that is not returned, and never start a subscription or an upgrade.

No inputs.

### `search_help` (Help & guides)

Read-only. Industries: SaaS & Software.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `query` | string |  | Optional words to search the help articles for. |
| `topic` | string |  | Optional: one of the topics the help articles are filed under. |

### `request_support` (Support request)

Sends something to the business: once sent, it cannot be taken back. Industries: SaaS & Software.

How the plug-in's instructions tell the assistant to use it: Use only once the customer has given the details and agrees to send it.

| Input | Type | Required | What it is |
| --- | --- | --- | --- |
| `topic` | string | yes | A short subject for the question or problem. |
| `message` | string | yes | The question or problem, in the customer's words. |
| `name` | string | yes | Customer's name. |
| `email` | string | yes | Email the support team can reply to. |
| `phone` | string |  | Optional phone number. |

## For a new industry

A new industry reuses its engine's three tools with names of its own, so it has exactly the inputs of that engine above, plus the tools every plug-in has. To add one, see [INDUSTRIES.md](INDUSTRIES.md#add-a-new-industry).

Questions: info@bizplug.ai.
