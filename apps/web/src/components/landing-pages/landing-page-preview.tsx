import { LandingPageSections } from "@/lib/landing-generator";

interface LandingPagePreviewProps {
  sections: LandingPageSections;
  title: string;
}

export function LandingPagePreview({ sections, title }: LandingPagePreviewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-white">{sections.hero.headline}</h1>
        <p className="text-xl text-zinc-300">{sections.hero.subheadline}</p>
        <button className="inline-flex h-12 items-center rounded-md bg-white px-8 text-sm font-medium text-zinc-900 hover:bg-zinc-100">
          {sections.hero.cta}
        </button>
      </section>

      {/* Problem Section */}
      <section className="space-y-6 py-8">
        <h2 className="text-2xl font-semibold">O Problema</h2>
        <div className="space-y-4">
          {sections.problem.painPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-zinc-900 rounded-lg">
              <span className="text-red-400 font-bold">✗</span>
              <p className="text-zinc-300">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="space-y-6 py-8 bg-zinc-900 rounded-lg p-8">
        <h2 className="text-2xl font-semibold">A Solução</h2>
        <p className="text-zinc-300 leading-relaxed">{sections.solution.explanation}</p>
      </section>

      {/* Benefits Section */}
      <section className="space-y-6 py-8">
        <h2 className="text-2xl font-semibold">Benefícios</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.benefits.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-zinc-900 rounded-lg">
              <span className="text-green-400 font-bold">✓</span>
              <p className="text-zinc-300">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Section */}
      <section className="space-y-6 py-8 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-lg p-8">
        <h2 className="text-2xl font-semibold">A Oferta</h2>
        <p className="text-zinc-300 leading-relaxed mb-4">{sections.offer.presentation}</p>
        
        {/* Unique Mechanism */}
        <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Mecanismo Único</h3>
          <p className="text-zinc-300">{sections.offer.uniqueMechanism}</p>
        </div>
        
        {/* Offer Stack */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">O Que Você Vai Receber</h3>
          <div className="space-y-2">
            {sections.offer.offerStack.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-zinc-800 rounded">
                <span className="text-green-400 font-bold">✓</span>
                <p className="text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Guarantee */}
        <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400 mb-2">Garantia</h3>
          <p className="text-zinc-300">{sections.offer.guarantee}</p>
        </div>
      </section>

      {/* Objection Handling Section */}
      <section className="space-y-6 py-8">
        <h2 className="text-2xl font-semibold">Objeções Comuns</h2>
        <div className="space-y-4">
          {sections.objectionHandling.objections.map((objection, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg">
              <p className="text-zinc-300">{objection}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6 py-8">
        <h2 className="text-2xl font-semibold">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {sections.faq.questions.map((faq, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg">
              <h3 className="font-semibold text-zinc-200 mb-2">{faq.question}</h3>
              <p className="text-zinc-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-4 py-12 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-white">Pronto para Começar?</h2>
        <p className="text-zinc-300">{sections.cta.finalCallToAction}</p>
        <button className="inline-flex h-12 items-center rounded-md bg-white px-8 text-sm font-medium text-zinc-900 hover:bg-zinc-100">
          Começar Agora
        </button>
      </section>
    </div>
  );
}
