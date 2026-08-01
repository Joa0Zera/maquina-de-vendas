"use client";

import type { Product } from "@maquina/database";
import { motion } from "framer-motion";
import { formatCurrencyFromCents } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const testimonials = [
  {
    name: "Mariana S.",
    role: "Aluna verificada",
    quote: "Conteúdo direto ao ponto. Apliquei no mesmo dia e já vi resultado.",
  },
  {
    name: "Rafael T.",
    role: "Empreendedor digital",
    quote: "A estrutura do material é clara e o passo a passo realmente funciona.",
  },
  {
    name: "Camila R.",
    role: "Profissional liberal",
    quote: "Investimento que se paga rápido. Recomendo sem hesitar.",
  },
];

const faqs = [
  {
    q: "Como recebo o acesso?",
    a: "Após a confirmação do pagamento, você recebe o acesso automaticamente no e-mail cadastrado.",
  },
  {
    q: "Posso pedir reembolso?",
    a: "Sim, conforme a política de garantia informada na página de checkout Cakto.",
  },
  {
    q: "Preciso de experiência prévia?",
    a: "Não. O conteúdo foi estruturado para iniciantes e intermediários.",
  },
];

type PublicLandingProps = {
  product: Product;
};

export function PublicLanding({ product }: PublicLandingProps) {
  const price = formatCurrencyFromCents(product.priceCents);
  const checkoutUrl = product.checkoutUrl;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-900/80">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="text-sm font-medium text-zinc-400">{product.title}</span>
          {checkoutUrl && (
            <a
              href={checkoutUrl}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              Comprar agora
            </a>
          )}
        </div>
      </header>

      <main>
        <motion.section
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium uppercase tracking-widest text-blue-400"
          >
            Infoproduto digital
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl"
          >
            {product.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed"
          >
            {product.description ||
              "Transforme conhecimento em resultado com um método prático, moderno e pronto para aplicar."}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                className="inline-flex h-12 items-center rounded-lg bg-white px-8 text-base font-semibold text-zinc-900 hover:bg-zinc-200 transition-colors"
              >
                Garantir minha vaga — {price}
              </a>
            ) : (
              <span className="text-zinc-500">Checkout em breve</span>
            )}
          </motion.div>
          {product.thumbnail && (
            <motion.div variants={fadeUp} className="mt-14 overflow-hidden rounded-2xl border border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full object-cover max-h-[420px]"
              />
            </motion.div>
          )}
        </motion.section>

        <motion.section
          className="border-y border-zinc-900 bg-zinc-900/30 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">O que você vai conquistar</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Um sistema claro para criar, lançar e monetizar seu infoproduto com foco em conversão.
            </p>
          </div>
        </motion.section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-semibold">Depoimentos</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-sm text-zinc-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-xs text-zinc-500">
                  <strong className="text-zinc-300">{t.name}</strong> — {t.role}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </section>

        <motion.section
          className="mx-auto max-w-lg px-6 py-16"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 text-center">
            <p className="text-sm uppercase tracking-widest text-zinc-500">Investimento</p>
            <p className="mt-2 text-4xl font-bold tracking-tight">{price}</p>
            <p className="mt-2 text-sm text-zinc-400">Pagamento seguro via Cakto</p>
            {checkoutUrl && (
              <a
                href={checkoutUrl}
                className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg bg-white font-semibold text-zinc-900 hover:bg-zinc-200"
              >
                Comprar agora
              </a>
            )}
          </div>
        </motion.section>

        <section className="mx-auto max-w-3xl px-6 pb-24">
          <h2 className="text-center text-2xl font-semibold">Perguntas frequentes</h2>
          <dl className="mt-10 space-y-6">
            {faqs.map((item, i) => (
              <motion.div
                key={item.q}
                className="border-b border-zinc-800 pb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <dt className="font-medium text-zinc-200">{item.q}</dt>
                <dd className="mt-2 text-sm text-zinc-400">{item.a}</dd>
              </motion.div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}
