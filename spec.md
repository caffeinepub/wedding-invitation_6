# Wedding Invitation

## Current State
A wedding invitation single-page app with: HeroSection (names "Emily & James", date Sept 20 2026), StorySection (story text + Milestones timeline card), DetailsSection (two event cards: Ceremony and Reception), RSVPSection (form with name, email, attendance, meal preference, message), Navigation, Footer.

## Requested Changes (Diff)

### Add
- Nothing new to add.

### Modify
- **Names**: Change "Emily & James" to "Bhavana & Ajay" everywhere (HeroSection, Navigation, Footer, StorySection, RSVPSection ThankYouMessage, DetailsSection).
- **Reception date/time**: Change to March 25, 2026 at 7:00 PM. Update countdown date accordingly.
- **DetailsSection**: Show only the Reception card (remove Ceremony card). Update heading from "Wedding Details" to "Reception Details". Update the reception date to "March 25, 2026".
- **RSVP form**: Remove the Name field and Email field entirely. Form state and validation should no longer include name or email. ThankYouMessage should not reference name.
- **Footer**: Update date/location line to match reception date "March 25, 2026 · Bengaluru, Karnataka".
- **Backend**: Update submitRSVP call - remove name and email fields.

### Remove
- **StorySection**: Remove the Milestones card/timeline entirely. Keep the story text and quote but remove the right-column milestones panel. Change layout to single column or centered.
- **DetailsSection**: Remove the Ceremony EventCard.
- **RSVP**: Remove Name field, Email field, and their validation logic.

## Implementation Plan
1. HeroSection: change names to "Bhavana & Ajay", update WEDDING_DATE to `2026-03-25T19:00:00`.
2. Navigation: change logo text to "Bhavana & Ajay".
3. Footer: change names to "Bhavana & Ajay", update date line to "March 25, 2026 · Bengaluru, Karnataka".
4. DetailsSection: remove Ceremony card, show only Reception card with date "March 25, 2026", change section heading to "Reception Details".
5. StorySection: remove the milestones right column, change layout to single centered column with story text and quote.
6. RSVPSection: remove name and email fields and their state/validation. Update submitRSVP call accordingly. Update ThankYouMessage to not use name.
7. Update RSVP deadline text if needed.
