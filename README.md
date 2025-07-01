# Full Stack Engineer Challenge – Payload CMS + Lexical Editor Customization

This repository contains my implementation of the Full Stack Engineer Challenge using **Payload CMS**, **MongoDB**, and **Lexical Editor**, fully written in **TypeScript**.

---

## 🗂️ Steps Completed

### ✅ Step 1: GitHub Repository
- Created this public GitHub repository for all commits and progress tracking.

### ✅ Step 2: Payload CMS Setup
- Bootstrapped a new Payload CMS instance using the **blank template**.
- Connected to a **MongoDB** database.
- Initialized TypeScript-based backend.

### ✅ Step 3: Lexical Editor Integration
- Modified `payload.config.ts` to use **Lexical Editor** as the rich text handler.

### ✅ Step 4: Posts Collection
- Created a `posts` collection with the following fields:
  - `title`: plain text field.
  - `content`: richText field using Lexical Editor.

### ✅ Step 5: Custom `<mark>` Lexical Feature
- Added a button to the floating Lexical toolbar between **strikethrough** and **subscript**.
- The button uses FontAwesome’s `faHighlighter` icon.
- Functionality includes:
  - Toggle wrapping/unwrapping selection in `<mark>` tags.
  - Button activates only when selection is marked.
  - Selection remains active after toggling.
  - HTML output parses `<mark>` nodes correctly.
- ✅ **[Watch Demo Video on Loom](https://www.loom.com/share/9d0cd066deb34934ac162fa5694d6cd7?sid=bc1808c1-7e4b-4ff4-a8ed-e5b021f42fa7)**

### ✅ Step 6: Footnote Lexical Feature
- Removed **superscript** and **subscript** buttons from the default config.
- Replaced **superscript** with a custom **footnote** feature:
  - Inserts an incrementing superscript number.
  - Opens a modal to add rich text content (limited to italic, bold, strike, link).
  - Preview + Edit/Delete buttons when hovering over the node.
  - Footnotes render in HTML as `<sup>` with `<section>` at bottom containing `<ul><li>` list of content.
- ✅ **[Watch Demo Video on Loom](https://www.loom.com/share/6c7d7bb2c83c4ba5a3f5e92869bf5f00?sid=e934a575-82b0-4aec-866d-b8d65c67a75d)**

---

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/fullstack-payload-challenge.git
   cd fullstack-payload-challenge
