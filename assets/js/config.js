/*
  ORAFDEV site configuration.
  Everything here is real-world information only the founders can supply.
  Empty values are hidden or shown as "coming soon" on the site, so nothing fake is ever published.
*/
window.ORAFDEV = {
  contact: {
    // Digits only, with country code, e.g. "201234567890"
    whatsapp: "601162256809",
    email: "",
    // Full profile links. Any channel left empty stays hidden on the site.
    instagram: "https://www.instagram.com/orafdev/",
    linkedin: "",
    github: "",
  },

  // Optional: a form service URL (e.g. Formspree) that accepts POSTed JSON.
  // If empty, the form opens WhatsApp (or email) with the request pre-written.
  formEndpoint: "",

  whatsappMessage: "Hi Orafdev, I'm interested in discussing a web development project.",

  // Live / source links per project. Empty live → "Live view coming soon". Empty source → no button.
  // tech: only list technologies you have verified, e.g. ["Next.js", "Node.js"]. Empty → line hidden.
  projects: {
    "car-rental": { live: "", source: "", tech: [] },
    "next-stack": { live: "", source: "", tech: [] },
    "israf-guard": { live: "", source: "", tech: [] },
    "ozo-store":  { live: "", source: "", tech: [] },
    "ats-matching": { live: "", source: "", tech: [] },
  },

  /*
    Real client feedback only. The section stays hidden until at least one entry exists.
    Light edits for grammar are fine; never write a quote a client did not give.
    Example entry:
    {
      quote: "What the client said, in their words.",
      name: "Client name",
      role: "Owner",                       // optional
      company: "Business name",            // optional, only with permission
      project: "Business website",         // optional
      rating: 5,                           // optional, 1–5
      avatar: "assets/img/clients/name.webp", // optional
      lang: "en"                           // "en" or "ar" — the language the quote is written in
    }
  */
  testimonials: [],
};
