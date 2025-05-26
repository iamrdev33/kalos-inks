import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const portfolio = [
  {
    id: 1,
    title: 'Black Lotus Sleeve',
    image: 'https://images.pexels.com/photos/1040958/pexels-photo-1040958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'blackwork',
    tags: ['blackwork', 'floral', 'sleeve'],
    healing: 'healed'
  },
  {
    id: 2,
    title: 'Geometric Wolf',
    image: 'https://images.pexels.com/photos/5321589/pexels-photo-5321589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'geometric',
    tags: ['geometric', 'animal', 'back'],
    healing: 'fresh'
  },
  {
    id: 3,
    title: 'Watercolor Koi',
    image: 'https://images.pexels.com/photos/4125591/pexels-photo-4125591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'watercolor',
    tags: ['watercolor', 'japanese', 'koi'],
    healing: 'healed'
  },
  {
    id: 4,
    title: 'Traditional Rose',
    image: 'https://images.pexels.com/photos/6975524/pexels-photo-6975524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'traditional',
    tags: ['traditional', 'floral', 'arm'],
    healing: 'fresh'
  },
  {
    id: 5,
    title: 'Minimalist Script',
    image: 'https://images.pexels.com/photos/4125645/pexels-photo-4125645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'lettering',
    tags: ['lettering', 'script', 'minimalist'],
    healing: 'healed'
  },
  {
    id: 6,
    title: 'Realistic Portrait',
    image: 'https://images.pexels.com/photos/6975519/pexels-photo-6975519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'realism',
    tags: ['realism', 'portrait', 'chest'],
    healing: 'fresh'
  },
  {
    id: 7,
    title: 'Neo-Traditional Dragon',
    image: 'https://images.pexels.com/photos/6975573/pexels-photo-6975573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'neo-traditional',
    tags: ['neo-traditional', 'dragon', 'sleeve'],
    healing: 'healed'
  },
  {
    id: 8,
    title: 'Blackwork Mandala',
    image: 'https://images.pexels.com/photos/6975607/pexels-photo-6975607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'blackwork',
    tags: ['blackwork', 'mandala', 'shoulder'],
    healing: 'fresh'
  }
];

export const flashDesigns = [
  {
    id: 1,
    title: 'Mystic Rose',
    image: 'https://images.pexels.com/photos/6975524/pexels-photo-6975524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'floral',
    price: 150,
    available: true
  },
  {
    id: 2,
    title: 'Geometric Wolf',
    image: 'https://images.pexels.com/photos/5321589/pexels-photo-5321589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'animals',
    price: 200,
    available: true
  },
  {
    id: 3,
    title: 'Skull & Roses',
    image: 'https://images.pexels.com/photos/4125591/pexels-photo-4125591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'traditional',
    price: 180,
    available: false
  },
  {
    id: 4,
    title: 'Minimalist Mountain',
    image: 'https://images.pexels.com/photos/6975573/pexels-photo-6975573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'minimalist',
    price: 120,
    available: true
  },
  {
    id: 5,
    title: 'Script "Always"',
    image: 'https://images.pexels.com/photos/4125645/pexels-photo-4125645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'lettering',
    price: 100,
    available: true
  },
  {
    id: 6,
    title: 'Japanese Koi',
    image: 'https://images.pexels.com/photos/6975519/pexels-photo-6975519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'japanese',
    price: 250,
    available: true
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Alex Morgan',
    testimonial: 'The artist at Kalos Inks truly understood my vision and created a tattoo that exceeded my expectations. The attention to detail is incredible!',
    rating: 5,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Jamie Lee',
    testimonial: 'Clean studio, professional service, and amazing artistry. My first tattoo experience couldn\'t have been better!',
    rating: 5,
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Chris Walker',
    testimonial: 'I came in for a cover-up and was blown away by how they transformed my old tattoo into something beautiful.',
    rating: 5,
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    name: 'Sam Taylor',
    testimonial: 'The whole experience from consultation to aftercare guidance was top-notch. Highly recommend Kalos Inks!',
    rating: 4,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const faqCategories = [
  {
    id: 'general',
    name: 'General Questions',
    questions: [
      {
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment through our online booking system, by calling us, or by sending us an email with your tattoo idea and preferred dates.'
      },
      {
        question: 'Do I need to pay a deposit?',
        answer: 'Yes, we require a non-refundable deposit to secure your appointment. The deposit amount varies depending on the size and complexity of the tattoo.'
      },
      {
        question: 'What forms of payment do you accept?',
        answer: 'We accept cash, all major credit cards, and digital payment methods like Apple Pay and Google Pay.'
      }
    ]
  },
  {
    id: 'before-tattoo',
    name: 'Before Your Tattoo',
    questions: [
      {
        question: 'How should I prepare for my tattoo session?',
        answer: 'Get a good night\'s sleep, eat a substantial meal before your appointment, stay hydrated, and avoid alcohol for at least 24 hours before your session.'
      },
      {
        question: 'Can I bring someone with me?',
        answer: 'Due to space limitations, we allow one guest per client. Please inform us beforehand if you plan to bring someone.'
      },
      {
        question: 'What should I wear?',
        answer: 'Wear comfortable, loose-fitting clothes that can easily expose the area being tattooed while maintaining your comfort and modesty.'
      }
    ]
  },
  {
    id: 'aftercare',
    name: 'Aftercare',
    questions: [
      {
        question: 'How do I care for my new tattoo?',
        answer: 'Keep your tattoo clean, apply the recommended aftercare product, avoid direct sunlight, don\'t swim or soak in water, and avoid tight clothing on the tattooed area.'
      },
      {
        question: 'When can I exercise after getting a tattoo?',
        answer: 'We recommend waiting at least 48-72 hours before resuming light exercise and up to two weeks for heavy workouts or activities that cause excessive sweating.'
      },
      {
        question: 'Is it normal for my tattoo to scab or peel?',
        answer: 'Yes, light scabbing and peeling is a normal part of the healing process. Do not pick or scratch at your tattoo as this can remove ink and cause scarring.'
      }
    ]
  }
];

export const services = [
  {
    id: 'custom-design',
    title: 'Custom Design',
    description: 'Collaborate with our artist to create a unique, personalized tattoo design that reflects your vision and style.',
    image: 'https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    minPrice: 200
  },
  {
    id: 'flash-designs',
    title: 'Flash Designs',
    description: 'Choose from our collection of pre-designed artwork for a ready-to-go tattoo experience.',
    image: 'https://images.pexels.com/photos/4123590/pexels-photo-4123590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    minPrice: 100
  },
  {
    id: 'cover-up',
    title: 'Cover-Up',
    description: 'Transform unwanted tattoos into beautiful new designs that completely conceal the original artwork.',
    image: 'https://images.pexels.com/photos/4123587/pexels-photo-4123587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    minPrice: 250
  },
  {
    id: 'retouch',
    title: 'Retouch',
    description: 'Refresh and revitalize faded or aging tattoos to bring back their original vibrancy and detail.',
    image: 'https://images.pexels.com/photos/4125615/pexels-photo-4125615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    minPrice: 80
  },
  {
    id: 'piercings',
    title: 'Piercings',
    description: 'Professional body piercing services using high-quality jewelry and sterile techniques.',
    image: 'https://images.pexels.com/photos/1435397/pexels-photo-1435397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    minPrice: 40
  }
];

export const tattooStyles = [
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Bold lines, vibrant colors, and classic motifs like roses, anchors, and skulls.',
    image: 'https://images.pexels.com/photos/6975524/pexels-photo-6975524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'realism',
    name: 'Realism',
    description: 'Photorealistic depictions with fine details, shading, and depth.',
    image: 'https://images.pexels.com/photos/6975519/pexels-photo-6975519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'blackwork',
    name: 'Blackwork',
    description: 'Bold black ink designs with various techniques from solid fills to intricate patterns.',
    image: 'https://images.pexels.com/photos/4125585/pexels-photo-4125585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Flowing, colorful designs resembling watercolor paintings with a painterly aesthetic.',
    image: 'https://images.pexels.com/photos/4125591/pexels-photo-4125591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'geometric',
    name: 'Geometric',
    description: 'Precise shapes, patterns, and symmetrical designs often with deep symbolic meaning.',
    image: 'https://images.pexels.com/photos/5321589/pexels-photo-5321589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'japanese',
    name: 'Japanese (Irezumi)',
    description: 'Traditional Japanese imagery like koi fish, dragons, and cherry blossoms with cultural significance.',
    image: 'https://images.pexels.com/photos/6975573/pexels-photo-6975573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];