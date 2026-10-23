// Your app catalogue. Edit this file to add, remove or change apps.
//
// Fields:
//   id          short unique name, used in the page link (e.g. #notes)
//   name        app name
//   tagline     one line shown on the store card
//   icon        an emoji, or a path to an image like "icons/notes.png"
//   iconScale   optional, shrinks an image icon inside its square (e.g. 0.65 = 65% size)
//   color       background colour behind the icon
//   category    shown as a small label
//   version     current version
//   description longer text shown on the detail page (blank line = new paragraph)
//   features    bullet points shown on the detail page
//   downloads   one button per platform; url can be a GitHub Releases link
//   source      optional link to the source code
//   madeByUs    true shows a "Made by The Bike Shop" badge on the card

// true = every tool's page shows "Coming soon" instead of its About / Features.
// Set to false to show the full descriptions again.
window.DETAILS_COMING_SOON = true;

// The three boxes on the Share! page. Put a link in each "url"
// (a Google Form, an email like "mailto:someone@example.com", etc.).
window.SHARE_OPTIONS = [
  { title: "Share a Bicycle", text: "A tool that helps you think, make or do more.", url: "https://docs.google.com/forms/d/1jrBB0OYMhDa_E06Z6hrzv2w0rr4h5Omv-q029lWw4-0/viewform" },
  { title: "Share a Pain Point", text: "Something slow, annoying or broken that a tool could fix.", url: "https://docs.google.com/forms/d/107ydnS28_B48cBqpAqyzxgTeJkptJJAHfqRN0qs3zYk/viewform" },
  { title: "Share an Idea", text: "A tool you wish existed.", url: "https://docs.google.com/forms/d/1G-npcq1T4oP-ihfoVzxfrkmOwrtE0_lWqlAaRQTVBIQ/viewform" },
];

// Order of the filter buttons ("All" always comes first).
// A category used by an app but missing here is added at the end.
window.CATEGORIES = ["Bicycles", "Ideas", "Pain points"];

window.APPS = [
  {
    id: "web-highlights",
    name: "Web Highlights",
    tagline: "Highlights and notes across any website or PDF are aggregated in one space.",
    icon: "icons/web-highlights.png",
    iconScale: 0.65,
    color: "#FFFFFF",
    category: "Bicycles",
    description:
      "Web Highlights is a Chrome extension for highlighting text and adding notes on websites and PDFs, with AI summaries of what you've read.\n\nYour highlights are saved and easy to find again. It's free and doesn't need an account.",
    features: [
      "Highlight text on any web page or PDF",
      "Add notes to your highlights",
      "AI summaries",
      "Free, no sign-up required",
    ],
    downloads: [
      { label: "Chrome", url: "https://chromewebstore.google.com/detail/web-highlights-pdf-web-hi/hldjnlbobkdkghfidgoecgmklcemanhm" },
    ],
  },
  {
    id: "you-lock",
    madeByUs: true,
    name: "You-Lock",
    tagline: "Set your screen ahead of time.",
    icon: "icons/you-lock.svg",
    iconScale: 0.95,
    color: "#FFFFFF",
    category: "Bicycles",
    description: "",
    features: [],
    downloads: [],
  },
  {
    id: "peer-review",
    madeByUs: true,
    name: "Peer Review",
    tagline: "A paper sharing platform for the Bike Shop.",
    icon: "icons/peer-review.svg",
    iconScale: 0.85,
    color: "#FFFFFF",
    category: "Bicycles",
    description: "",
    features: [],
    downloads: [],
  },
  {
    id: "timer",
    name: "Focus Timer",
    tagline: "Simple work and break timer to help you stay on task.",
    icon: "⏱️",
    color: "#C9F0D6",
    category: "Pain points",
    version: "0.9.1",
    description:
      "Focus Timer splits your time into work sessions and short breaks.\n\nPick a length, press start, and it tells you when to rest.",
    features: ["Custom session lengths", "Gentle sound alerts", "Daily focus stats"],
    downloads: [
      { label: "macOS", url: "https://github.com/YOUR-USERNAME/focus-timer/releases/latest" },
      { label: "Windows", url: "https://github.com/YOUR-USERNAME/focus-timer/releases/latest" },
      { label: "Linux", url: "https://github.com/YOUR-USERNAME/focus-timer/releases/latest" },
    ],
  },
  {
    id: "palette",
    madeByUs: true,
    name: "Palette Picker",
    tagline: "Grab any colour on your screen and copy its code.",
    icon: "🎨",
    color: "#E3D9FF",
    category: "Ideas",
    version: "2.0.0",
    description:
      "Palette Picker lets you point at anything on your screen and copy its colour as HEX, RGB or HSL.\n\nSave colours into palettes and export them for your design tools.",
    features: ["Screen colour picker", "Saved palettes", "Export to CSS"],
    downloads: [{ label: "macOS", url: "https://github.com/YOUR-USERNAME/palette-picker/releases/latest" }],
  },
  {
    id: "budget",
    name: "Pocket Budget",
    tagline: "Track spending in seconds. No account needed.",
    icon: "💰",
    color: "#CDE8FF",
    category: "Bicycles",
    version: "1.0.3",
    description:
      "Pocket Budget is a no-fuss spending tracker. Add what you spent, see where your money goes each month.\n\nYour data stays on your device.",
    features: ["Monthly summaries", "Custom categories", "CSV export"],
    downloads: [
      { label: "iPhone", url: "https://github.com/YOUR-USERNAME/pocket-budget/releases/latest" },
      { label: "Android", url: "https://github.com/YOUR-USERNAME/pocket-budget/releases/latest" },
    ],
  },
];
