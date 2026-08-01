import { LandingPageSections } from "./landing-generator";

/**
 * Generate a complete V0 prompt from landing page sections.
 * The prompt is designed for V0.dev to generate a modern, high-conversion landing page.
 */
export function generateV0Prompt(
  productName: string,
  sections: LandingPageSections
): string {
  const prompt = `Create a modern, high-conversion landing page for "${productName}" using Next.js App Router, Tailwind CSS, and shadcn/ui components.

## Design Requirements

- Modern SaaS aesthetic with clean, professional design
- Mobile-first responsive design
- High contrast for excellent readability
- Smooth animations and transitions
- Use Brazilian Portuguese for all text

## Color Scheme

- Primary: #09090b (zinc-950) - Dark background
- Secondary: #27272a (zinc-800) - Card backgrounds
- Accent: #22c55e (green-500) - CTA buttons and highlights
- Text: #fafafa (zinc-50) - Primary text
- Text-muted: #a1a1aa (zinc-400) - Secondary text

## Typography

- Headings: Inter font, bold weights (600-700)
- Body: Inter font, regular weight (400)
- Line height: 1.6 for body text
- Letter spacing: -0.025em for headings

## Layout Structure

### Hero Section
- Full-width gradient background (zinc-950 to zinc-900)
- Center-aligned content
- Large headline: "${sections.hero.headline}"
- Subheadline: "${sections.hero.subheadline}"
- Prominent CTA button: "${sections.hero.cta}" (green-500 background, white text, rounded-md, px-8, h-12)
- Add subtle gradient overlay for depth

### Problem Section
- White/light background (zinc-50)
- Section heading: "O Problema"
- Grid layout for pain points (2 columns on desktop, 1 on mobile)
- Each pain point in a card with:
  - Red X icon (text-red-400)
  - Pain point text
  - Light background (zinc-100)
  - Rounded corners (rounded-lg)
  - Padding (p-4)

Pain points:
${sections.problem.painPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

### Solution Section
- Dark background (zinc-900)
- Section heading: "A Solução"
- Center-aligned explanation text
- "${sections.solution.explanation}"
- Add subtle border or accent line

### Benefits Section
- White/light background (zinc-50)
- Section heading: "Benefícios"
- Grid layout (2 columns on desktop, 1 on mobile)
- Each benefit in a card with:
  - Green checkmark icon (text-green-400)
  - Benefit text
  - Light background (zinc-100)
  - Rounded corners (rounded-lg)
  - Padding (p-4)

Benefits:
${sections.benefits.benefits.map((benefit, i) => `${i + 1}. ${benefit}`).join('\n')}

### Offer Section
- Gradient background (zinc-950 to zinc-900)
- Section heading: "A Oferta"
- Presentation text: "${sections.offer.presentation}"
- Unique Mechanism section with:
  - Subheading: "Mecanismo Único"
  - Text: "${sections.offer.uniqueMechanism}"
  - Highlighted card (zinc-800 background)
- Offer Stack section with:
  - Subheading: "O Que Você Vai Receber"
  - List of items with green checkmarks
  - Each item in a card (zinc-800 background, rounded, p-3)

Offer stack:
${sections.offer.offerStack.map((item, i) => `${i + 1}. ${item}`).join('\n')}

- Guarantee section with:
  - Subheading: "Garantia"
  - Text: "${sections.offer.guarantee}"
  - Green-themed card (green-900/20 background, green-500/30 border)

### Objection Handling Section
- White/light background (zinc-50)
- Section heading: "Objeções Comuns"
- Each objection in a card (zinc-900 background, rounded-lg, p-4)

Objections:
${sections.objectionHandling.objections.map((objection, i) => `${i + 1}. ${objection}`).join('\n')}

### FAQ Section
- Dark background (zinc-900)
- Section heading: "Perguntas Frequentes"
- Accordion-style FAQ items
- Each FAQ in a card (zinc-800 background, rounded-lg, p-4)
- Question in bold (text-zinc-200)
- Answer in muted text (text-zinc-400)

FAQs:
${sections.faq.questions.map((faq, i) => `Q${i + 1}: ${faq.question}\nA${i + 1}: ${faq.answer}`).join('\n\n')}

### CTA Section
- Full-width gradient background (zinc-950 to zinc-900)
- Center-aligned content
- Section heading: "Pronto para Começar?"
- CTA text: "${sections.cta.finalCallToAction}"
- Prominent CTA button: "Começar Agora" (green-500 background, white text, rounded-md, px-8, h-12)
- Add subtle animation on hover

## Component Requirements

Use shadcn/ui components where applicable:
- Button for CTAs
- Card for sections
- Accordion for FAQ
- Badge for status indicators

## CTA Placement

- Primary CTA in Hero section (above the fold)
- Secondary CTA in CTA section (bottom of page)
- Ensure CTAs are always visible and accessible

## Social Proof Section

Add a social proof section before the FAQ with:
- Section heading: "O Que Nossos Alunos Dizem"
- 3 testimonial cards in a grid
- Each testimonial includes:
  - Avatar placeholder
  - Name
  - Role/Company
  - Testimonial text
  - Star rating (5 stars)

## Mobile Optimization

- Stack all grids to single column on mobile
- Reduce font sizes appropriately
- Ensure touch targets are at least 44px
- Optimize spacing for smaller screens

## Performance

- Use Next.js Image component for images
- Implement lazy loading for below-fold content
- Optimize font loading

## Accessibility

- Use semantic HTML
- Ensure color contrast meets WCAG AA standards
- Add ARIA labels where necessary
- Keyboard navigation support

Generate the complete landing page with all sections, following the design requirements above. Ensure the page is production-ready and optimized for conversions.`;

  return prompt;
}
