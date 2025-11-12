type PortfolioData = Record<string, any>;
type PortfolioUpdate = Partial<PortfolioData>;

let inMemoryPortfolio: PortfolioData | null = null;

const DEFAULT_PORTFOLIO: PortfolioData = {
  header: {
    logo: 'PERZIFO',
    navLinks: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Experience', href: '#experience' },
      { label: 'Expertise', href: '#expertise' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#cta' },
    ],
    hireButton: 'HIRE ME',
  },
  hero: {
    label: 'Product Designer',
    name: "Hello, I'm Muna Tariq",
    description:
      'I design human-centered products and brands for SaaS, fintech, and lifestyle companies. From concept to launch, I craft experiences that feel effortless and deliver measurable results.',
    cvButton: 'Download CV',
    cvLink: '#',
    personImage: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
  },
  statistics: [
    { number: '10+', label: 'Years shipping product' },
    { number: '58', label: 'Products launched' },
    { number: '32%', label: 'Avg. conversion lift' },
    { number: '3', label: 'Design awards' },
  ],
  about: {
    label: 'About Me',
    title: 'Call Me, Muna',
    description:
      'I’m a Nairobi-based creative focused on building unforgettable digital product experiences. From strategy to pixel-perfect interfaces, I help brands translate big ideas into elegant, human-centered design.',
    points: [
      'Product strategy grounded in research-driven insights',
      'Design systems that keep teams aligned and shipping faster',
      'Interfaces crafted for accessibility, performance, and delight',
    ],
    signature: 'Muna Tariq',
    role: 'Product Designer · Visual Storyteller',
    socialLinks: [
      'https://dribbble.com',
      'https://behance.net',
      'https://linkedin.com',
    ],
    image: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
    award: {
      title: 'Product Hunt “Golden Kitty” Winner',
      subtitle: 'Top Product · January 2024',
    },
  },
  services: {
    label: 'My Services',
    title: 'Design That Moves Brands Forward',
    description:
      'I collaborate with visionary founders, marketing teams, and agencies to transform complex problems into effortless customer journeys.',
    items: [
      {
        icon: '💻',
        title: 'Product Design Sprints',
        description:
          'Rapid discovery, user testing, and validated prototypes to get your next big idea investor-ready.',
        linkText: 'Plan a sprint →',
      },
      {
        icon: '🎨',
        title: 'Brand Systems',
        description:
          'Complete identity systems with usage guidelines that keep every touchpoint consistent and on-brand.',
        linkText: 'View brand work →',
      },
      {
        icon: '🌐',
        title: 'Marketing Websites',
        description:
          'Conversion-driven landing pages built with performance, SEO, and analytics in mind.',
        linkText: 'See live sites →',
      },
    ],
  },
  experience: {
    label: 'My Experiences',
    title: 'Design Journey So Far',
    description:
      'From scrappy startups to global organizations, I’ve helped teams launch experiences that users love—and goals that stakeholders trust.',
    items: [
      {
        title: 'Lead Product Designer',
        description:
          'Led cross-functional squads shipping payments, analytics, and onboarding flows used by 5M+ users.',
        company: 'Flutterwave · Remote',
        years: '2022 — Present',
      },
      {
        title: 'Senior UX Designer',
        description:
          'Partnered with growth teams to launch multi-market campaigns that increased retention by 34%.',
        company: 'Andela · Nairobi',
        years: '2019 — 2022',
      },
      {
        title: 'Brand & Visual Designer',
        description:
          'Delivered multi-channel brand refreshes for tech and lifestyle clients across EMEA.',
        company: 'Freelance Collective',
        years: '2016 — 2019',
      },
    ],
  },
  expertise: {
    label: 'Why Choose Me',
    title: 'What I’m Exceptional At',
    description:
      'A rare mix of strategy, systems thinking, and craft. I design with empathy, iterate with data, and ship with engineering.',
    skills: [
      { name: 'Design Systems & Tokens', percentage: 96 },
      { name: 'Conversion-Focused UX', percentage: 92 },
      { name: 'Collaborative Prototyping', percentage: 94 },
      { name: 'Brand Strategy & Art Direction', percentage: 89 },
    ],
    images: [
      '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
      '/imgi_41_striped-blue-watercolor-banner-blog-XBWPYHE.jpg',
      '/imgi_42_striped-blue-watercolor-banner-top-3-XBWPYHE.jpg',
      '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
    ],
  },
  testimonials: {
    label: 'Testimonials',
    title: 'Trusted By Visionary Teams',
    description:
      'Clients describe my work as strategic, collaborative, and relentlessly detail-driven.',
    items: [
      {
        text:
          'Muna has an uncanny ability to translate lofty ideas into tangible products. She took our scattered requirements, built alignment across leadership, and delivered a design system that still scales today.',
        author: 'Niki Civinema',
        avatar: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
        role: 'VP of Product · LipaPay',
      },
      {
        text:
          'From stakeholder workshops to the final handoff, her process is world-class. Every iteration was grounded in evidence, and the end result increased our signups 42% in the first month.',
        author: 'Samuel Kimani',
        avatar: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
        role: 'Head of Growth · Nimbus Health',
      },
      {
        text:
          'If you need someone who can lead design strategically while still obsessing the pixels, look no further. Muna is that rare mix of visionary and doer.',
        author: 'Ivy Mugo',
        avatar: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
        role: 'Creative Director · Horizon Studio',
      },
    ],
  },
  cta: {
    label: "Let's Talk",
    title: 'Let’s Build Something Bold',
    description:
      'Tell me about your product, campaign, or idea. I’ll respond within 48 hours with next steps and a tailored collaboration plan.',
    buttonText: 'Book a discovery call',
    backgroundImage: '/imgi_41_striped-blue-watercolor-banner-blog-XBWPYHE.jpg',
  },
  footer: {
    logo: 'PERZIFO',
    description:
      'Portfolio of Muna Tariq — product designer crafting human, high-performing experiences for SaaS, fintech, and lifestyle brands.',
    navLinks: [
      'Home',
      'About',
      'Services',
      'Experience',
      'Expertise',
      'Testimonials',
      'Contact',
    ],
    socialLinks: [
      'https://dribbble.com',
      'https://behance.net',
      'https://linkedin.com',
    ],
    copyright: '© 2025 Muna Tariq. All rights reserved.',
  },
} as PortfolioData;

export const getDefaultPortfolio = (): PortfolioData => ({ ...DEFAULT_PORTFOLIO });

export const getInMemoryPortfolio = (): PortfolioData => {
  if (!inMemoryPortfolio) {
    inMemoryPortfolio = getDefaultPortfolio();
  }
  return inMemoryPortfolio;
};

export const overwriteInMemoryPortfolio = (update: PortfolioUpdate): PortfolioData => {
  const current = getInMemoryPortfolio();
  inMemoryPortfolio = { ...current, ...update };
  return inMemoryPortfolio;
};

export const updateInMemorySection = (section: string, data: unknown): PortfolioData => {
  const current = getInMemoryPortfolio();
  inMemoryPortfolio = { ...current, [section]: data } as PortfolioData;
  return inMemoryPortfolio;
};


