import mongoose, { Schema } from 'mongoose';

export interface PortfolioDocument extends mongoose.Document {
  header: {
    logo: string;
    navLinks: Array<{ label: string; href: string; dropdown?: boolean }>;
    hireButton: string;
  };
  hero: {
    label: string;
    name: string;
    description: string;
    cvButton: string;
    cvLink: string;
    personImage: string;
  };
  statistics: Array<{
    number: string;
    label: string;
  }>;
  about: {
    label: string;
    title: string;
    description: string;
    points: string[];
    signature: string;
    role: string;
    socialLinks: string[];
    image: string;
    award: {
      title: string;
      subtitle: string;
    };
  };
  services: {
    label: string;
    title: string;
    description: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
      linkText: string;
    }>;
  };
  experience: {
    label: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      company: string;
      years: string;
    }>;
  };
  expertise: {
    label: string;
    title: string;
    description: string;
    skills: Array<{
      name: string;
      percentage: number;
    }>;
    images: string[];
  };
  testimonials: {
    label: string;
    title: string;
    description: string;
    items: Array<{
      text: string;
      author: string;
      avatar: string;
      role: string;
    }>;
  };
  cta: {
    label: string;
    title: string;
    description: string;
    buttonText: string;
    backgroundImage: string;
  };
  footer: {
    logo: string;
    description: string;
    navLinks: string[];
    socialLinks: string[];
    copyright: string;
    ctaLabel: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    credit: string;
  };
}

const PortfolioSchema = new Schema<PortfolioDocument>({
  header: {
    logo: { type: String, default: 'PERZIFO' },
    navLinks: {
      type: [
        {
          label: { type: String, default: '' },
          href: { type: String, default: '' },
          dropdown: { type: Boolean, default: false },
        },
      ],
      default: [
        { label: 'Home', href: '#hero', dropdown: false },
        { label: 'About', href: '#about', dropdown: false },
        { label: 'Services', href: '#services', dropdown: false },
        { label: 'Experience', href: '#experience', dropdown: false },
        { label: 'Expertise', href: '#expertise', dropdown: false },
        { label: 'Testimonials', href: '#testimonials', dropdown: false },
        { label: 'Contact', href: '#cta', dropdown: false },
      ],
    },
    hireButton: { type: String, default: 'HIRE ME' },
  },
  hero: {
    label: { type: String, default: 'Creative Designer' },
    name: { type: String, default: "Hello, I'm Perzi Foleni" },
    description: { type: String, default: '' },
    cvButton: { type: String, default: 'Download CV' },
    cvLink: { type: String, default: '#' },
    personImage: { type: String, default: '' },
  },
  statistics: [
    {
      number: String,
      label: String,
    },
  ],
  about: {
    label: { type: String, default: 'About Me' },
    title: { type: String, default: 'Call Me, Perzi' },
    description: { type: String, default: '' },
    points: [String],
    signature: { type: String, default: 'Perzi Foleni' },
    role: { type: String, default: 'Creative Designer' },
    socialLinks: [String],
    image: { type: String, default: '' },
    award: {
      title: { type: String, default: 'Best UI/UX Award' },
      subtitle: { type: String, default: 'Apple App Redesign Challenge' },
    },
  },
  services: {
    label: { type: String, default: 'My Services' },
    title: { type: String, default: 'What I Do For You' },
    description: { type: String, default: '' },
    items: [
      {
        icon: String,
        title: String,
        description: String,
        linkText: String,
      },
    ],
  },
  experience: {
    label: { type: String, default: 'My Experiences' },
    title: { type: String, default: 'Awesome Journey' },
    description: { type: String, default: '' },
    items: [
      {
        title: String,
        description: String,
        company: String,
        years: String,
      },
    ],
  },
  expertise: {
    label: { type: String, default: 'Why Choose Me' },
    title: { type: String, default: 'My Expertise Area' },
    description: { type: String, default: '' },
    skills: [
      {
        name: String,
        percentage: Number,
      },
    ],
    images: [String],
  },
  testimonials: {
    label: { type: String, default: 'Testimonials' },
    title: { type: String, default: 'What They Said' },
    description: { type: String, default: '' },
    items: [
      {
        text: String,
        author: String,
        avatar: String,
        role: { type: String, default: '' },
      },
    ],
  },
  cta: {
    label: { type: String, default: "Let's Talk" },
    title: { type: String, default: 'Get A Free Quote' },
    description: { type: String, default: '' },
    buttonText: { type: String, default: 'Contact Now' },
    backgroundImage: { type: String, default: '' },
  },
  footer: {
    logo: { type: String, default: 'PERZIFO' },
    description: { type: String, default: '' },
    navLinks: [String],
    socialLinks: [String],
    copyright: { type: String, default: 'Copyright @ 2023. All right reserved by Perzifo.' },
    ctaLabel: { type: String, default: "Let's Talk" },
    ctaTitle: { type: String, default: 'Get A Free Quote' },
    ctaDescription: { type: String, default: '' },
    ctaButtonText: { type: String, default: 'Contact Now' },
    credit: { type: String, default: 'Creative Portfolio Elementor Template Kit By Hellokuro.' },
  },
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model<PortfolioDocument>('Portfolio', PortfolioSchema);


