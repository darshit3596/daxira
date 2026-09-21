import { ServiceItem, CaseStudyItem, PricingPackage, FaqItem } from '../types.ts';

export const STUDIO_SPEC = {
  version: "2026 Edition",
  status: "Available for new projects",
  foundingPrincipal: "Darshit Sapariya",
  studioModel: "Independent Web Development Studio",
  coreStack: ["Python", "Django", "React", "Tailwind CSS"],
  codeHygiene: "Clean custom code • No slow templates",
  contractSla: "Direct WhatsApp support & weekly updates",
  region: "Gujarat, India (Serving clients worldwide)",
  uptime: "99.9%",
  averageResponseMs: "Under 1 second load time",
};

export const VALUE_PILLARS = [
  {
    number: "01",
    title: "You Talk Directly with the Developer",
    description:
      "You speak directly with me—the person who designs and writes your code. No salespeople, no account managers, and no miscommunication. Quick answers on WhatsApp or phone.",
  },
  {
    number: "02",
    title: "Custom Built for Your Business",
    description:
      "No slow, cookie-cutter WordPress templates that break easily. We build clean, lightweight websites made specifically for your brand, your services, and your customers.",
  },
  {
    number: "03",
    title: "Fast & Easy to Use on Phones",
    description:
      "Over 70% of your visitors browse on their mobile phones. Your site will load in under a second, look great on every screen, and make it effortless for customers to contact you.",
  },
  {
    number: "04",
    title: "Reliable & Supported After Launch",
    description:
      "We don't disappear once the website goes live. You get 30 days of free post-launch support, reliable hosting setup, and prompt help whenever you want to make updates.",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "commercial-web",
    number: "01",
    category: "Websites",
    title: "Business & Company Websites",
    description: "Clean, professional websites designed to build trust and bring in new phone calls and inquiries.",
    features: [
      "Custom design tailored to your business (no generic templates)",
      "Direct WhatsApp chat and click-to-call buttons for instant leads",
      "Fast page load times and basic Google Search setup (SEO)",
      "Fully responsive—looks great on mobile phones, tablets, and laptops",
    ],
    tech: ["HTML5", "Tailwind CSS", "React", "Google SEO"],
    recommendedBudget: "starter",
  },
  {
    id: "ecommerce-payments",
    number: "02",
    category: "Online Stores",
    title: "E-Commerce & Online Stores",
    description: "Easy-to-use online stores where your customers can browse products and pay securely.",
    features: [
      "Product catalog with categories, search, and variants (sizes, colors)",
      "Secure online payments via UPI, Google Pay, PhonePe, and Cards",
      "Automatic customer invoice delivery via WhatsApp and Email",
      "Simple admin panel to manage products, prices, and customer orders",
    ],
    tech: ["Razorpay / UPI", "Product Catalog", "Order Management", "Django"],
    recommendedBudget: "growth",
  },
  {
    id: "fullstack-saas",
    number: "03",
    category: "Custom Software",
    title: "Custom Web Applications & Portals",
    description: "Tailored web tools and software to automate your business processes and save you hours of work.",
    features: [
      "Secure customer or staff login portals with custom access levels",
      "Reliable database setup to organize your orders, leads, or records",
      "Automatic PDF invoice, receipt, and report generation",
      "Direct integration with WhatsApp notifications and payment gateways",
    ],
    tech: ["Python", "Django", "PostgreSQL", "React"],
    recommendedBudget: "application",
  },
  {
    id: "optimization-sla",
    number: "04",
    category: "Maintenance",
    title: "Website Updates & Speed Optimization",
    description: "Keep your existing website secure, fast, and up to date without any technical headaches.",
    features: [
      "Speed optimization to fix slow pages and improve mobile scores",
      "Regular security updates, automatic backups, and free SSL certificate",
      "Monthly hours included for text edits, new images, or new pages",
      "Quick emergency support whenever you need help or have questions",
    ],
    tech: ["Speed Optimization", "Security", "Regular Backups", "Direct Support"],
    recommendedBudget: "starter",
  },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "vyaparix",
    badge: "Delivered Client Project",
    status: "Successfully Delivered & In Daily Use",
    title: "Vyaparix",
    subtitle: "Complete Business Management & Billing System",
    summary:
      "A complete billing and business management system custom-built and successfully delivered for a retail client. It solves slow manual billing, stock confusion, and lost receipts by letting the business generate GST bills in seconds, track inventory in real-time, and send invoices directly to customer WhatsApp numbers—even when the internet is down.",
    highlights: [
      { icon: "point_of_sale", label: "Fast Barcode Billing & GST Invoices" },
      { icon: "inventory_2", label: "Automatic Real-Time Stock Tracking" },
      { icon: "chat", label: "Instant PDF Receipts to Customer WhatsApp" },
      { icon: "cloud_sync", label: "Works 100% Offline with Auto Cloud Backup" },
    ],
    techStack: ["Desktop Application", "Fast Local Database", "WhatsApp Integration", "Thermal Printer Ready"],
  },
];

export const TECH_STACK = [
  {
    number: "01",
    category: "Backend & Database",
    items: [
      { name: "Python", desc: "Reliable, powerful programming language used by top tech companies" },
      { name: "Django", desc: "Industry-standard web framework known for bulletproof security" },
      { name: "PostgreSQL Database", desc: "Organized, safe database to keep your customer records secure" },
      { name: "Secure APIs", desc: "Connects your website to payment gateways, WhatsApp, and SMS" },
    ],
  },
  {
    number: "02",
    category: "Design & Frontend",
    items: [
      { name: "Modern React", desc: "Makes pages load instantly and feel fast without reloading" },
      { name: "Tailwind CSS", desc: "Creates clean, beautiful layouts tailored to your brand" },
      { name: "Mobile-First Design", desc: "Thoroughly tested on iPhones, Android phones, and tablets" },
      { name: "Fast Load Speeds", desc: "Optimized so pages open in under 1 second on mobile networks" },
    ],
  },
  {
    number: "03",
    category: "Hosting & Support",
    items: [
      { name: "Reliable Cloud Hosting", desc: "Keeps your website online 24/7 without unexpected downtime" },
      { name: "Free SSL Security", desc: "The green padlock (https) that protects your customer data" },
      { name: "Automatic Backups", desc: "Daily backups so your website data is always safe" },
      { name: "Domain & Business Email", desc: "We help you set up your custom domain and email address" },
    ],
  },
];

export const SPRINT_STAGES = [
  {
    number: "01",
    title: "Free Discussion",
    description:
      "Tell us about your business, goals and requirements. We'll suggest the best solution and give you an honest quote.",
    deliverable: "Clear Plan & Quote",
    icon: "chat",
  },
  {
    number: "02",
    title: "Design & Layout",
    description:
      "We create the look, colors and layout of your website. You review the design and give your feedback.",
    deliverable: "Design Preview",
    icon: "design",
  },
  {
    number: "03",
    title: "Building the Site",
    description:
      "We write clean code, add your text and photos, and connect forms, WhatsApp buttons, payment methods and other features.",
    deliverable: "Working Private Link",
    icon: "code",
  },
  {
    number: "04",
    title: "Phone & Speed Test",
    description:
      "We test every button, form and page on real phones, tablets and laptops to make sure everything works smoothly.",
    deliverable: "Quality Check Passed",
    icon: "test",
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "We connect your domain, launch your website for the world to see, and give you 30 days of free support for any tweaks.",
    deliverable: "Your Site is Live!",
    icon: "launch",
  },
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "business-website",
    title: "Business Website",
    startingPrice: "₹4,000",
    priceRange: "₹4,000 – ₹7,000",
    domainHosting: "Additional / Based on actual provider cost",
    description:
      "Best for local businesses, shops, consultants, and service providers who need a clean, mobile-optimized website to attract inquiries.",
    features: [
      "Custom responsive design (Home, About, Services, Contact, etc.)",
      "Direct WhatsApp chat button & click-to-call for quick inquiries",
      "Fast page load speed tested on Android and iOS devices",
      "Google Search & Maps visibility setup (basic local SEO)",
      "Contact inquiry form connected directly to your email/phone",
      "30 days of free support after launch for any tweaks",
    ],
    buttonText: "Get a Free Quote",
    scopeValue: "commercial_web",
  },
  {
    id: "ecommerce-website",
    title: "E-Commerce Website",
    startingPrice: "₹11,000",
    priceRange: "₹11,000 – ₹15,000",
    domainHosting: "Additional / Based on actual provider cost",
    isPopular: true,
    description:
      "Best for businesses wanting to sell products online and accept payments directly into their bank account.",
    features: [
      "Full online store with catalog, search, categories & product variants",
      "Accept UPI, Google Pay, PhonePe, Debit/Credit Cards & Net Banking",
      "Instant order confirmations sent to customer WhatsApp or email",
      "Easy admin dashboard to add products, adjust prices and manage stock",
      "Cart, checkout, coupon discount codes & invoice generation",
      "30 days of free support after launch for any questions",
    ],
    buttonText: "Get a Free Quote",
    scopeValue: "ecommerce",
  },
  {
    id: "custom-web-application",
    title: "Custom Web Application",
    startingPrice: "₹18,000+",
    priceRange: "₹18,000+ according to requirement",
    domainHosting: "Additional / Based on actual provider cost",
    description:
      "Best for businesses that need custom management portals, internal billing systems, or specialized database workflows.",
    features: [
      "Custom software built around your exact business processes",
      "Secure user logins, staff permissions, and role management",
      "Automated PDF receipts, billing, invoice generation & reports",
      "Connects to hardware (printers/scanners) or third-party APIs",
      "Offline-first or cloud-hosted database architecture",
      "Full walkthrough training and 60 days of free support",
    ],
    buttonText: "Get a Free Quote",
    scopeValue: "custom_app",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How much does a website cost?",
    answer:
      "A Business Website typically ranges between ₹4,000 and ₹7,000 (starting from ₹4,000). An E-Commerce Website ranges between ₹11,000 and ₹15,000. Custom Web Applications start from ₹18,000+ based on specific requirements. Domain and hosting costs are additional based on actual provider cost without markup. After our first discussion, you will receive a fixed, itemized quote.",
    category: "Pricing",
  },
  {
    question: "How long will it take to build my website?",
    answer:
      "A standard 3 to 5 page business website usually takes 1 to 2 weeks. An online store takes 2 to 3 weeks. Custom web applications typically take 3 to 6 weeks depending on the features you need. We give you a clear completion date before starting.",
    category: "Timelines",
  },
  {
    question: "Do I need to buy web hosting and a domain beforehand?",
    answer:
      "No, you don't need to buy anything in advance. If you already have a domain or hosting, we can use that. If not, we will guide you to buy the right domain and set up fast, affordable, and secure hosting for you.",
    category: "Hosting & Setup",
  },
  {
    question: "Can you redesign and speed up my current website?",
    answer:
      "Yes! If your existing website is slow, looks outdated, or doesn't work well on mobile phones, we can rebuild it. We keep the content you like, modernize the design, and make it load in under a second.",
    category: "Redesign",
  },
  {
    question: "Do you work with clients outside Gujarat or India?",
    answer:
      "Yes. We work with clients across India and internationally. We communicate easily through WhatsApp, phone calls, and Google Meet, and share private preview links so you can see your website as we build it.",
    category: "Communication",
  },
  {
    question: "What if I don't have all the text or photos ready?",
    answer:
      "That is completely normal! We help you organize the pages you need, write clean and simple text for your services, and supply quality photos until your own official pictures are ready.",
    category: "Content",
  },
  {
    question: "Will my website look good on mobile phones?",
    answer:
      "Yes, 100%. More than 70% of people browse the web on their phones. We test every page thoroughly on iPhones, Android phones, and tablets to ensure buttons are easy to tap and text is comfortable to read.",
    category: "Mobile Design",
  },
  {
    question: "What support do I get after the website is launched?",
    answer:
      "Every project includes 30 days of free post-launch support for any minor tweaks, text changes, or questions. After that, we also offer simple monthly maintenance plans if you want us to handle updates and backups for you.",
    category: "Support",
  },
];
