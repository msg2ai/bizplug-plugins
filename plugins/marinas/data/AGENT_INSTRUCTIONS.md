# Collect the data for the Marinas & Boat Slips plug-in

You are helping a business prepare the data BizPlug needs to deploy its Marinas & Boat Slips ChatGPT plug-in ("Visitor berths by the night and harbour services"). Work only from the business's own sources (its website, its systems' exports, and what the owner tells you). Never invent prices, hours, services or answers; leave a cell empty when you cannot confirm it and list it for the owner.

## Never include
- Passwords, API keys or other secrets.
- Card numbers, bank details or government ID numbers.
- Customers' personal data (names, phone numbers, addresses, health or financial details).
- The plug-in's own rule: Never give navigation, weather or tide advice; the harbour master confirms every berth and arrival time.

## Files to prepare

### business.csv (required, one row)
What the plug-in says about the business and where customers can reach it.

Columns (first row of the file, exactly these names):
- `name` (required): Business name, text. As customers know it. Example: Harbour Point Marina
- `summary` (required): Summary, text. One or two sentences, in the business's own words. Example: Harbour Point Marina serves customers in and around Charlotte, NC.
- `email` (required): Public email, email. The address customers may write to. Example: hello@example.com
- `phone`: Public phone, text. With country code. Example: +1 704 555 0100
- `website`: Website, url. Full URL. Example: https://example.com
- `tagline`: What you are, text. A few words shown after your name in ChatGPT, e.g. "Harbor Street Studio – Yoga in Charlotte". Without it, the plug-in's industry is shown. Example: Marinas & Boat Slips in Charlotte
- `logo`: Logo URL, url. Your own logo as an https image, square if you have one. Shown next to your plug-in in the BizPlug portal, and as its icon in ChatGPT. Example: https://example.com/logo.png
- `wordmark`: Wide logo URL, url. Optional: your logo with your name, wider than it is tall, as an https PNG, JPEG or WebP image. From plug-in version 0.25.0 it heads your card in ChatGPT and Claude; without it the card shows the logo above. Example: https://example.com/logo-wide.png
- `address`: Address, text. Street address, if customers visit. Example: 123 Main St, Charlotte, NC 28202
- `city`: City, text.  Example: Charlotte
- `region`: State or country, text.  Example: NC
- `hours`: Opening hours, text. As shown to customers. Example: Mon-Fri 09:00-17:00; Sat 10:00-14:00
- `currency`: Currency, text. ISO code for the prices in the other files. Example: USD
- `picks_title`: Name for your local picks, text. Optional, up to 40 characters. Replaces "Explore the area" on your card's menu and picks screen. Leave empty to keep Explore the area. Example: Harrison's Suggestions
- `notify_email`: Requests go to, email. The team inbox that should receive requests from ChatGPT (not shown to customers). Example: orders@example.com

How to collect it:
1. Copy the name, summary, phone, email, website and address exactly as they appear on the business's website or Google Business Profile.
2. Write the summary in the business's own words (one or two sentences). Do not add claims the business does not make.
3. Ask the owner which inbox should receive requests from ChatGPT and put it in notify_email.

### inventory.csv (required, up to 500 rows)
The options and published rates the plug-in prices from.

Columns (first row of the file, exactly these names):
- `id` (required): Id, text. Short, unique, lowercase with hyphens. Example: visitor-berth-up-to-12-m
- `name` (required): Name, text.  Example: Visitor berth up to 12 m
- `rate` (required): Published rate, number. Per night, day or booking, as the business publishes it. Example: 45.00
- `capacity`: Capacity, number. Most guests or people. Example: 2
- `description`: Description, text.  Example: 
- `day_rates`: Weekday rates, text. Optional: a different rate on some weekdays, as day:rate separated by semicolons (sun, mon, tue, wed, thu, fri, sat). Shown on the booking calendar from plug-in version 0.29.0. Example: fri:45.00;sat:45.00
- `per`: Booked once, text. Optional, from plug-in version 0.41.0, and only where bookings are by the night: leave empty for a room priced per night. Write person or booking for something booked once for the stay, such as an activity or a transfer: the rate is then per person or per booking. Example: 
- `start`: Event: first day, date. Optional, from plug-in version 0.42.0, and only where bookings are for one date: the first day of an event with fixed dates, as YYYY-MM-DD. A list with events is shown as an events calendar, month by month. Example: 
- `end`: Event: last day, date. Optional: the event's last day, as YYYY-MM-DD. Leave empty for a one-day event. Example: 
- `category`: Event: category, text. Optional: the tab the event is filed under, in your own words, such as Football or Workshops. Example: 
- `place`: Event: place, text. Optional: where the event is held. Example: 
- `featured`: Event: featured, boolean. Optional, from plug-in version 0.44.0: true puts the event in the Featured row above your events calendar. Feature a few, not all. Example: 
- `free`: Event: free entry, boolean. Optional: true when entry is free. Example: 
- `url`: Event: its own page, url. Optional: the event's own page for tickets or details (https). With one, the plug-in sends people there and takes no request. Example: 
- `url_label`: Event: what the page is, text. Optional: Tickets or Website. Example: 
- `maps_url`: Event: directions, url. Optional: a directions link (https). Example: 
- `amenities`: Features, text. Optional, from plug-in version 0.48.0 (vacation rentals): what the home has, separated by semicolons, such as Pet friendly;Pool table;Bunk room. Which home fits matches a group's wishes against them; write No pets for a home that takes no dogs. Example: 

How to collect it:
1. Copy each bookable option and its standard published rate from the website or booking engine.
2. Use the rate customers see before discounts. Note in faqs.csv whether taxes and fees are included.

### blocked-dates.csv (optional, up to 2000 rows)
Dates the plug-in should not offer for an option.

Columns (first row of the file, exactly these names):
- `id` (required): Option id, text. An id from inventory.csv. Example: visitor-berth-up-to-12-m
- `start` (required): From, date. YYYY-MM-DD. Example: 2026-12-24
- `end` (required): To, date. YYYY-MM-DD, the day after the last blocked night or day. Example: 2026-12-27

How to collect it:
1. Add closures and sold-out periods the owner knows about. This is not a live calendar; BizPlug confirms each request with the business.

### rates.csv (optional, up to 2000 rows)
Seasons and holidays with their own rate (from plug-in version 0.29.0). A date range here wins over the weekday rates and the standard rate.

Columns (first row of the file, exactly these names):
- `id` (required): Option id, text. An id from inventory.csv. Example: visitor-berth-up-to-12-m
- `start` (required): From, date. YYYY-MM-DD, the first day at this rate. Example: 2026-12-20
- `end` (required): To, date. YYYY-MM-DD, the last day at this rate. Example: 2027-01-03
- `rate` (required): Rate, number. Per night, day or person, as in inventory.csv. Example: 45.00

How to collect it:
1. Copy the business's own published seasonal or holiday rates. Only rates customers can see; BizPlug confirms each request with the business.

### services.csv (optional, up to 100 rows)
A short list of what the business offers, used in answers.

Columns (first row of the file, exactly these names):
- `service` (required): Service, text. One per row. Example: Visitor berths by the night and harbour services

How to collect it:
1. List the services from the website's services or about page, one per row, short names only.

### faqs.csv (optional, up to 100 rows)
The plug-in answers customer questions only from these, so it never guesses.

Columns (first row of the file, exactly these names):
- `question` (required): Question, text. How a customer would ask it. Example: What are your opening hours?
- `answer` (required): Answer, text. The business's answer, in full sentences. Example: Monday to Saturday, 9am to 6pm.

How to collect it:
1. Take the FAQ page of the website first, then policies (cancellation, delivery, payment, parking, accessibility).
2. Keep each answer factual and current. Leave out anything the owner has not confirmed.

### places.csv (optional, up to 150 rows)
Your own recommendations near your homes: where to eat, groceries, the beach, things to do. Guests browse them by category in the card, Plan my stay builds a day-by-day plan from them, and ChatGPT presents them as yours.

Columns (first row of the file, exactly these names):
- `name` (required): Name, text. The place's name, as it is known. Example: Harris Teeter
- `category` (required): Category, text. One of: groceries, eat, drink, beach, outdoors, activities, shopping, culture, wellness, services. Example: groceries
- `why`: Why we like it, text. In your own words, one or two sentences. This is what makes a pick yours. Example: Do the big shop here when you arrive: a full supermarket with a deli and bakery.
- `distance`: How far, text. From your homes, in words. Example: 10 min by car
- `minutes`: Minutes away, number. The same distance in minutes, to put the nearest first. Example: 10
- `price`: Price level, text. Optional: $ to $$$$, or Free. Example: $$
- `best_time`: Best time, text. Optional: when to go. Example: Before 10:00, when it is quiet
- `hours`: Opening hours, text. Optional, as published by the place; guests are told to check before they go. Example: Daily 6:00 to 23:00
- `address`: Address, text. Optional. Example: 515 Freshfields Dr, Johns Island, SC
- `website`: Website, url. Optional, https. Example: https://www.harristeeter.com
- `maps_url`: Directions, url. Optional: a Google Maps or Apple Maps link (https). Example: 
- `book_url`: Book or reserve, url. Optional: the place's own booking page (https). Example: 
- `image`: Photo, url. Optional: a photo the card may show (https, on storage.googleapis.com). Example: 
- `good_for`: Good for, text. Optional, separated by semicolons: kids, dogs, rainy, couples, groups, sunset, free. Example: kids;rainy
- `offer`: Partner offer, text. Optional: an offer the place gives your guests, as agreed with it, such as 10% off a kayak tour. Example: 
- `offer_url`: Offer link, url. Optional: where the guest claims the offer (https). Example: 
- `offer_direct`: Only for direct bookings, boolean. Optional: yes when the offer is only for guests who booked with you directly. Example: 

How to collect it:
1. Write each pick in the host's own words: why they recommend it, and for whom. Start with groceries and the first dinner.
2. Give the distance from the homes in words and in minutes. Never copy reviews or ratings from other sites.
3. Add an offer only when the place agreed to it, with the exact terms.

### area.csv (optional, up to 40 rows)
About the area, its history, a map, getting here and around, the seasons, local rules, essentials and safety. Guests read it in the card and can ask ChatGPT more from each topic.

Columns (first row of the file, exactly these names):
- `topic` (required): Topic, text. One of: about, history, map, arrival, around, seasons, rules, essentials, safety. Example: arrival
- `title` (required): Title, text.  Example: Getting here
- `text` (required): Text, text. A short paragraph in your own words. Example: Charleston International Airport (CHS) is about 32 miles away; Island Transportation does transfers.
- `map_url`: Map link, url. Optional: a map page (https), such as Google Maps or the area's own map. Example: 
- `image`: Picture, url. Optional (https, on storage.googleapis.com). Example: 
- `questions`: Questions to ask ChatGPT, text. Optional, separated by semicolons: questions the guest can send to the chat from this topic, where ChatGPT answers from what it knows and the web, not from you. Example: 

How to collect it:
1. Write what a guest needs before and during the stay, in the host's words. Rules (gate passes, beach rules) as the area publishes them.

### events.csv (optional, up to 100 rows)
Events near your homes. Guests see the ones on their dates, and Plan my stay puts them in the plan.

Columns (first row of the file, exactly these names):
- `name` (required): Event, text.  Example: Holiday Festival of Lights
- `start` (required): First day, date. YYYY-MM-DD. Example: 2026-11-13
- `end`: Last day, date. YYYY-MM-DD; empty for one day. Example: 2027-01-01
- `place`: Where, text.  Example: James Island County Park
- `description`: What it is, text. One sentence. Example: 
- `url`: Its own page, url. https. Example: 

How to collect it:
1. List only events with published dates, from the organiser's own page. Remove past ones.

### house.csv (optional, up to 120 rows)
How things work in your homes: the stove, oven, grill, washer and dryer, coffee maker, heating, TV, check-in, rules and checkout. Guests find the answer in the card instead of messaging you.

Columns (first row of the file, exactly these names):
- `topic` (required): Topic, text. One of: kitchen, laundry, outdoor, comfort, arrival, rules, checkout, other. Example: kitchen
- `title` (required): Title, text. The appliance or thing. Example: Gas grill
- `text` (required): How it works, text. Step by step, in your own words. Example: Open the propane valve, press and turn a burner knob to light it.
- `homes`: Which homes, text. Optional: home ids from your homes file, separated by semicolons. Empty means every home. Example: 
- `image`: Photo, url. Optional (https, on storage.googleapis.com). Example: 

How to collect it:
1. Never put door codes, Wi-Fi passwords or alarm codes here: they are sent to the guest privately before arrival.

### harbour.csv (optional, up to 500 rows)
What the marina offers boats and crews: fuel, water, shore power, showers, laundry, repairs and haul-out, with where and when. One row per service; people search them in the plug-in.

Columns (first row of the file, exactly these names):
- `name` (required): Service, text.  Example: Fuel dock
- `kind`: Kind, text. Use the same words for the same value: people filter by it. Example: Fuel
- `where`: Where, text. Use the same words for the same value: people filter by it. Example: Pontoon A
- `hours`: Hours, text.  Example: Daily 08:00 to 18:00
- `price`: Price, text.  Example: Diesel at the posted pump price
- `about`: About it, text. A few sentences. Example: Diesel and petrol for boats up to 15 m. Call the office on channel 9 before coming alongside.
- `page`: More information, url. A full https address. Example: https://www.example.com/marina/fuel

How to collect it:
1. List each service you publish, one per row, with the columns above.
2. Only what you would publish on your own website: nothing about a person that they did not agree to share.

### social.csv (optional, up to 60 rows)
Where to follow you, and your latest posts with their pictures, shown under Social media in the plug-in. Feeds (YouTube, podcast, blog, Substack, Medium, Bluesky, Mastodon) are read automatically; for LinkedIn, Instagram, X, Facebook and TikTok you pin the posts you want shown. From plug-in version 0.35.0 a YouTube video plays inside the card.

Columns (first row of the file, exactly these names):
- `kind` (required): Kind, text. "follow" for a profile to follow, "feed" for a public feed BizPlug reads (YouTube channel, podcast or blog RSS, Substack, Medium, Bluesky or Mastodon profile), "post" for one post you pin. Example: follow
- `network`: Network, text. instagram, linkedin, facebook, x, tiktok, youtube, threads, bluesky, mastodon, podcast, blog, substack, medium, pinterest or whatsapp. Left empty, it is read from the address. Example: instagram
- `url` (required): Address, url. The profile, the feed or the post, as an https address. Example: https://www.instagram.com/yourbusiness/
- `image`: Picture, url. For a pinned post: its picture, an https PNG, JPEG or WebP image. Example: https://example.com/post.jpg
- `text`: Text, text. For a pinned post: its caption, or the first lines of it. Example: Our new menu is here.
- `date`: Date, text. For a pinned post: YYYY-MM-DD. Example: 2026-11-20

How to collect it:
1. Take the profiles from the links on the business's own website (header or footer).
2. Add a feed row for a YouTube channel, a podcast or blog RSS, a Substack, Medium, Bluesky or Mastodon profile; its latest posts appear by themselves.
3. Pin a few recent posts from LinkedIn, Instagram, X, Facebook or TikTok with their own picture and text: only posts the business published.
4. A pinned post may also be one of the business's own YouTube videos (a watch, youtu.be or Shorts address): it plays inside the card, and needs no picture.

## Format
- UTF-8 CSV with a header row; comma separated; quote cells that contain commas, quotes or line breaks.
- Numbers without currency signs or thousands separators (4.75, not $4.75).
- Dates as YYYY-MM-DD, times as 24-hour HH:MM.

## Submit
1. The business owner signs in to the BizPlug client portal: https://www.bizplug.ai/portal. Do not sign in on their behalf.
2. Open the Marinas & Boat Slips plug-in under My plug-ins (add it from the marketplace first).
3. Upload each file under its matching dataset. Fix every error the portal lists and upload again.
4. When the required files show as accepted, press Request test deploy. BizPlug deploys to the test server and confirms by email.
5. After checking the test plug-in in ChatGPT, press Request production. BizPlug confirms plan details with the business before any payment.

## Or submit by API
If the owner gives you a BizPlug API key (they create it at https://www.bizplug.ai/portal/api; never ask for their password), submit each file directly instead of uploading it. Keep the key out of chats, logs and URLs.
1. List the plug-ins and their ids: `GET https://www.bizplug.ai/api/portal/v1/plugins` with the header `Authorization: Bearer <key>`.
2. Submit each file: `PUT https://www.bizplug.ai/api/portal/v1/plugins/<plugin-id>/datasets/<file name>` with `Content-Type: text/csv` and the file as the body, or `Content-Type: application/json` and `{"rows": [{...}]}` keyed by the column names above.
3. The response says whether the file was accepted and lists every error. Fix them and submit again.
4. Tell the owner when the required files are accepted: they press Request test deploy in the portal themselves.
