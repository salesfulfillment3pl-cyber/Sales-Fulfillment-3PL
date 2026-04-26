"use client";

import type { ElementType, FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clock3,
  Cpu,
  Globe2,
  Layers3,
  Link2,
  Lock,
  Mail,
  Menu,
  PackageCheck,
  Radar,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";

type Service = {
  title: string;
  badge: string;
  icon: ElementType;
  accent: string;
  copy: string;
  points: string[];
};

const services: Service[] = [
  {
    title: "Shopify Fulfillment",
    badge: "DTC-ready",
    icon: Store,
    accent: "from-emerald-400 to-cyan-400",
    copy: "Premium pick, pack, ship, branded inserts, returns, and inventory workflows for growing Shopify stores.",
    points: ["Real-time inventory sync", "Branded packing options", "Returns support"],
  },
  {
    title: "TikTok Shop CBT",
    badge: "Creator-surge ready",
    icon: ShoppingBag,
    accent: "from-cyan-400 to-fuchsia-500",
    copy: "TikTok Shop fulfillment workflows built for CBT requirements, fast processing, and campaign-driven demand spikes.",
    points: ["TikTok Shop order flow", "CBT-ready processing", "Peak-volume support"],
  },
  {
    title: "Amazon FBM Specialists",
    badge: "Marketplace-grade",
    icon: Truck,
    accent: "from-orange-400 to-amber-300",
    copy: "Amazon-focused merchant fulfillment with tracking discipline, shipping speed, and seller-performance awareness.",
    points: ["FBM order handling", "Tracking discipline", "Amazon-focused standards"],
  },
  {
    title: "Amazon FBA Prep",
    badge: "Inbound-ready",
    icon: Boxes,
    accent: "from-violet-400 to-blue-400",
    copy: "FNSKU labeling, bundling, poly bagging, kitting, carton prep, and shipment-ready FBA operations.",
    points: ["FNSKU labeling", "Bundling and kitting", "Shipment prep"],
  },
];

const metrics = [
  { value: "99.8%", label: "Accuracy-first workflows", icon: Target },
  { value: "<24h", label: "Fast onboarding path", icon: Clock3 },
  { value: "4", label: "Core selling channels", icon: Layers3 },
  { value: "Scale", label: "Built for volume spikes", icon: Rocket },
];

const process = [
  {
    title: "Connect",
    copy: "Map Shopify, TikTok Shop, Amazon FBM, and FBA prep needs into one clean operating flow.",
    icon: Link2,
  },
  {
    title: "Receive Inventory",
    copy: "Products are counted, inspected, organized, labeled, and stored for clean fulfillment execution.",
    icon: PackageCheck,
  },
  {
    title: "Fulfill Orders",
    copy: "Orders are picked, packed, shipped, prepped, kitted, or routed based on your channel rules.",
    icon: Boxes,
  },
  {
    title: "Scale",
    copy: "You focus on sales, sourcing, creators, and growth while the warehouse engine runs precisely.",
    icon: BarChart3,
  },
];

const advantages = [
  { title: "Advanced technology", copy: "Live dashboards, clean workflows, and channel-ready fulfillment logic.", icon: Cpu },
  { title: "Marketplace precision", copy: "Built around Shopify, TikTok Shop CBT, Amazon FBM, and Amazon FBA prep.", icon: ShieldCheck },
  { title: "Fast shipping discipline", copy: "Processes designed to reduce delay, confusion, and operational drag.", icon: Zap },
  { title: "Founder-level care", copy: "Responsive support and accountability instead of getting buried inside a giant 3PL.", icon: Mail },
  { title: "Flexible operations", copy: "Kitting, bundling, labels, inserts, returns, and custom workflows as you grow.", icon: Layers3 },
  { title: "Growth-ready", copy: "Built for campaign spikes, new SKUs, channel launches, and e-commerce scaling.", icon: Rocket },
];

const channelRows = [
  ["Shopify", "8,921", "+19.4%", "bg-emerald-400"],
  ["TikTok Shop", "6,214", "+24.7%", "bg-fuchsia-400"],
  ["Amazon FBM", "5,231", "+15.8%", "bg-amber-400"],
  ["Amazon FBA Prep", "4,505", "+12.3%", "bg-violet-400"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const springTransition = { type: "spring", stiffness: 90, damping: 18, mass: 0.7 } as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-sky-200 shadow-glow backdrop-blur-xl">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="Sales Fulfillment 3PL home">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-300/25 bg-sky-400/10 shadow-glow transition group-hover:scale-105">
        <Warehouse className="h-6 w-6 text-sky-200" />
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.9)]" />
      </div>
      <div className="leading-none">
        <div className="text-sm font-black uppercase tracking-[0.16em] text-white sm:text-base">Sales</div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-sky-300">
          Fulfillment <span className="rounded-md border border-sky-300/30 bg-sky-400/10 px-1.5 py-0.5 text-[10px] text-white">3PL</span>
        </div>
      </div>
    </a>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Services", "#services"],
    ["How It Works", "#process"],
    ["Why Us", "#why-us"],
    ["Technology", "#technology"],
    ["Quote", "#quote"],
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/58 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a href="#quote" className="rounded-full border border-white/12 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-sky-300/50 hover:text-white">
            Talk to an Expert
          </a>
          <a href="#quote" className="button-glow rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-5 py-3 text-sm font-black text-white shadow-glow transition hover:scale-[1.02]">
            Get a Quote <ArrowRight className="ml-1.5 inline h-4 w-4" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-white/10 p-2 text-white lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">
                {label}
              </a>
            ))}
            <a href="#quote" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-5 py-3 text-center text-sm font-black text-white">
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function FloatingParcel({ className, delay = 0, size = "h-14 w-14" }: { className: string; delay?: number; size?: string }) {
  return (
    <motion.div
      className={cx("absolute rounded-2xl border border-amber-200/25 bg-gradient-to-br from-amber-300/30 to-orange-900/20 p-3 shadow-violetGlow backdrop-blur-xl", size, className)}
      animate={{ y: [0, -18, 0], rotate: [0, 4, -2, 0] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <Boxes className="h-full w-full text-amber-100/90" />
    </motion.div>
  );
}

function CommandCenter() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ ...springTransition, delay: 0.15 }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <div className="absolute -inset-8 rounded-[3rem] bg-sky-500/10 blur-3xl" aria-hidden="true" />
      <FloatingParcel className="-left-7 top-12 hidden sm:block" delay={0.2} />
      <FloatingParcel className="-right-5 bottom-24 hidden sm:block" delay={1.1} size="h-16 w-16" />
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
        <div className="absolute inset-0 physics-grid opacity-50" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-200">
              Live Fulfillment Command Center
              <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] text-emerald-300">Live</span>
            </div>
            <div className="mt-2 text-sm text-slate-400">AI-assisted order flow, channel sync, and warehouse visibility</div>
          </div>
          <button className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 sm:flex sm:items-center sm:gap-2">
            All Channels <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-[1.5rem] border border-sky-300/15 bg-slate-950/45 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(56,189,248,0.18),transparent_36%),radial-gradient(circle_at_75%_65%,rgba(168,85,247,0.16),transparent_35%)]" />
          <div className="relative h-56 sm:h-72">
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/20 bg-sky-400/5 shadow-glow sm:h-60 sm:w-60" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/15 sm:h-80 sm:w-80" />
            {["left-[15%] top-[28%]", "left-[35%] top-[62%]", "left-[60%] top-[28%]", "left-[78%] top-[58%]", "left-[50%] top-[46%]"].map((position, index) => (
              <div key={position} className={cx("absolute h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_24px_rgba(125,211,252,1)]", position)}>
                <span className="absolute inset-0 animate-ping rounded-full bg-sky-300/70" style={{ animationDelay: `${index * 0.35}s` }} />
              </div>
            ))}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 360" fill="none" aria-hidden="true">
              <path d="M90 110 C220 30 340 28 510 112" stroke="url(#routeA)" strokeWidth="2" strokeDasharray="8 10" />
              <path d="M145 230 C250 155 372 154 470 215" stroke="url(#routeB)" strokeWidth="2" strokeDasharray="8 10" />
              <path d="M220 260 C262 190 332 148 390 100" stroke="url(#routeC)" strokeWidth="2" strokeDasharray="8 10" />
              <defs>
                <linearGradient id="routeA" x1="90" y1="0" x2="510" y2="0"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
                <linearGradient id="routeB" x1="145" y1="0" x2="470" y2="0"><stop stopColor="#22c55e" /><stop offset="1" stopColor="#38bdf8" /></linearGradient>
                <linearGradient id="routeC" x1="220" y1="0" x2="390" y2="0"><stop stopColor="#f59e0b" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
              {[
                ["Today", "24,871", "+18.6%"],
                ["In Progress", "8,302", "76%"],
                ["Shipped", "16,569", "+21.3%"],
              ].map(([label, value, delta]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/65 p-3 backdrop-blur-xl">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
                  <div className="mt-1 text-lg font-black text-white sm:text-2xl">{value}</div>
                  <div className="mt-1 text-[11px] font-bold text-emerald-300">{delta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 lg:grid-cols-[1fr_0.82fr]">
          <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/42 p-4">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Channel Performance</div>
            <div className="grid gap-2">
              {channelRows.map(([channel, count, growth, dot]) => (
                <div key={channel} className="flex items-center justify-between rounded-xl bg-white/[0.035] px-3 py-2 text-sm">
                  <div className="flex items-center gap-2 font-semibold text-slate-200"><span className={cx("h-2.5 w-2.5 rounded-full", dot)} />{channel}</div>
                  <div className="flex items-center gap-3"><span className="text-white">{count}</span><span className="text-xs font-bold text-emerald-300">{growth}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/42 p-4">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Warehouse Network</div>
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-3xl font-black">12</div>
                <div className="text-xs text-slate-400">Facilities ready</div>
              </div>
              <div>
                <div className="text-3xl font-black">3.2M+</div>
                <div className="text-xs text-slate-400">Sq ft capacity</div>
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-sky-400 to-violet-500 shadow-glow" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const y = useTransform(smoothProgress, [0, 0.45], [0, -80]);
  const rotate = useTransform(smoothProgress, [0, 0.45], [0, 8]);

  return (
    <section id="home" className="relative isolate overflow-hidden px-4 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(34,197,94,0.08),transparent_40%)]" />
      <div className="absolute inset-0 -z-10 bg-radial-grid [background-size:22px_22px] opacity-20" />
      <motion.div style={{ y, rotate }} className="pointer-events-none absolute -right-32 top-24 -z-10 h-[36rem] w-[36rem] rounded-full border border-sky-300/12" />
      <motion.div style={{ y: useTransform(smoothProgress, [0, 0.45], [0, 120]) }} className="pointer-events-none absolute left-[-16rem] top-48 -z-10 h-[38rem] w-[38rem] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 pb-20 pt-6 lg:grid-cols-[0.92fr_1.08fr] lg:pb-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={springTransition}>
          <SectionKicker>Smarter fulfillment. Bigger growth.</SectionKicker>
          <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Fulfillment built for the future of <span className="text-gradient">commerce.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            End-to-end 3PL solutions for high-growth brands. Shopify fulfillment, TikTok Shop CBT, Amazon FBM specialists, and Amazon FBA prep — all under one intelligent network.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className="button-glow inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-4 text-sm font-black text-white shadow-glow transition hover:scale-[1.02]">
              Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#services" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:border-sky-300/40 hover:bg-white/10">
              Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="glass-panel rounded-2xl p-4">
                <metric.icon className="h-5 w-5 text-sky-300" />
                <div className="mt-3 text-xl font-black text-white">{metric.value}</div>
                <div className="mt-1 text-xs leading-5 text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <CommandCenter />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ ...springTransition, delay: index * 0.08 }}
      className="group relative"
    >
      <div className={cx("absolute -inset-px rounded-[2rem] bg-gradient-to-br opacity-0 blur transition duration-500 group-hover:opacity-60", service.accent)} />
      <article className="glass-panel relative h-full overflow-hidden rounded-[2rem] p-6 transition duration-500 group-hover:-translate-y-2">
        <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className={cx("flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br text-slate-950 shadow-glow", service.accent)}>
          <service.icon className="h-8 w-8" />
        </div>
        <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">
          {service.badge}
        </div>
        <h3 className="mt-5 text-2xl font-black tracking-tight text-white">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{service.copy}</p>
        <div className="mt-6 grid gap-3">
          {service.points.map((point) => (
            <div key={point} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-300" />
              {point}
            </div>
          ))}
        </div>
        <a href="#quote" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-sky-200 transition group-hover:text-white">
          Learn More <ArrowRight className="h-4 w-4" />
        </a>
      </article>
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-px glow-line animate-shimmer opacity-60" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionKicker>Our services</SectionKicker>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
            Tailored fulfillment for <span className="text-gradient">every</span> sales channel.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Marketplace-aware warehouse execution for sellers who need accuracy, speed, and operational calm.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent_44%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <SectionKicker>How it works</SectionKicker>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">A smarter process. Built for scale.</h2>
        </div>
        <div className="relative mt-16 grid gap-5 lg:grid-cols-4">
          <div className="absolute left-16 right-16 top-10 hidden h-px bg-gradient-to-r from-sky-400 via-violet-500 to-emerald-400 lg:block" aria-hidden="true" />
          {process.map((step, index) => (
            <motion.div
              key={step.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ ...springTransition, delay: index * 0.1 }}
              className="relative"
            >
              <div className="glass-panel h-full rounded-[2rem] p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-sky-300/25 bg-sky-400/10 shadow-glow">
                  <step.icon className="h-8 w-8 text-sky-200" />
                </div>
                <div className="mx-auto mt-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-black text-white">{index + 1}</div>
                <h3 className="mt-4 text-xl font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="technology" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={springTransition}>
          <SectionKicker>Powered by technology</SectionKicker>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">Real-time visibility. Total control.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            A futuristic 3PL experience should feel simple: orders in, products moving, metrics visible, problems solved before they become expensive.
          </p>
          <div className="mt-7 grid gap-3">
            {["Live order tracking and status visibility", "Inventory sync across channels", "Automated exception management", "Performance analytics and reporting"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                <Check className="h-5 w-5 rounded-full bg-sky-400/15 p-1 text-sky-300" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ ...springTransition, delay: 0.08 }} className="glass-panel overflow-hidden rounded-[2rem] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Radar className="h-6 w-6 text-sky-300" />
              <div>
                <div className="font-black text-white">Operations Overview</div>
                <div className="text-xs text-slate-400">All channels synchronized</div>
              </div>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">AI Systems Operational</span>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            {["Total Orders", "Shipped Today", "On-Time Ship", "Returns"].map((label, index) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-2 text-2xl font-black text-white">{["24,782", "18,267", "99.6%", "1.2%"][index]}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
              <div className="mb-5 flex items-center justify-between text-sm"><span className="font-bold text-white">Orders Over Time</span><span className="text-sky-300">May 12: 2,457</span></div>
              <svg className="h-56 w-full" viewBox="0 0 560 220" fill="none" aria-hidden="true">
                <path d="M0 180 C35 120 72 130 105 90 C145 40 178 125 222 102 C270 80 295 150 340 110 C380 72 395 18 446 35 C490 48 510 15 560 24" stroke="url(#chartLine)" strokeWidth="4" strokeLinecap="round" />
                <path d="M0 180 C35 120 72 130 105 90 C145 40 178 125 222 102 C270 80 295 150 340 110 C380 72 395 18 446 35 C490 48 510 15 560 24 L560 220 L0 220 Z" fill="url(#chartFill)" />
                <defs>
                  <linearGradient id="chartLine" x1="0" y1="0" x2="560" y2="0"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="220"><stop stopColor="#38bdf8" stopOpacity="0.28" /><stop offset="1" stopColor="#38bdf8" stopOpacity="0" /></linearGradient>
                </defs>
              </svg>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
              <div className="mb-5 font-bold text-white">Orders by Channel</div>
              <div className="mx-auto h-36 w-36 rounded-full bg-[conic-gradient(#22c55e_0_42%,#a855f7_42%_71%,#f59e0b_71%_90%,#38bdf8_90%_100%)] p-5 shadow-glow">
                <div className="h-full w-full rounded-full bg-slate-950" />
              </div>
              <div className="mt-5 grid gap-2 text-xs text-slate-300">
                {channelRows.map(([channel, , , dot]) => <div key={channel} className="flex items-center gap-2"><span className={cx("h-2 w-2 rounded-full", dot)} />{channel}</div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <SectionKicker>Why choose Sales Fulfillment 3PL</SectionKicker>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">Technology. People. Performance.</h2>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <motion.div key={advantage.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ ...springTransition, delay: index * 0.05 }} className="glass-panel rounded-[1.7rem] p-6">
              <advantage.icon className="h-8 w-8 text-sky-300" />
              <h3 className="mt-5 text-xl font-black text-white">{advantage.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{advantage.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type QuoteStatus = "idle" | "loading" | "success" | "error";

function QuoteForm() {
  const [status, setStatus] = useState<QuoteStatus>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");

      setStatus("success");
      setMessage("Quote request sent. We’ll review the details and respond shortly.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit right now.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">Full Name<input className="form-input" name="name" placeholder="Your name" required /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">Email Address<input className="form-input" name="email" type="email" placeholder="you@brand.com" required /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">Company Name<input className="form-input" name="company" placeholder="Brand name" required /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">Website<input className="form-input" name="brandUrl" placeholder="https://yourstore.com" /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">Sales Channel(s)<select className="form-input" name="channels" required defaultValue=""><option value="" disabled>Select primary channel</option><option>Shopify</option><option>TikTok Shop CBT</option><option>Amazon FBM</option><option>Amazon FBA Prep</option><option>Multiple channels</option></select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">Monthly Order Volume<select className="form-input" name="monthlyOrders" required defaultValue=""><option value="" disabled>Select range</option><option>Under 250</option><option>250 - 1,000</option><option>1,000 - 5,000</option><option>5,000 - 20,000</option><option>20,000+</option></select></label>
      </div>
      <label className="grid gap-2 text-sm font-bold text-slate-200">What do you need handled?<textarea className="form-input min-h-32 resize-none" name="details" placeholder="Products, order volume, FBA prep needs, FBM needs, TikTok Shop CBT needs, returns, kitting, special packaging..." required /></label>
      <button disabled={status === "loading"} className="button-glow inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-4 text-sm font-black text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
        {status === "loading" ? "Sending..." : "Get My Custom Quote"} <ArrowRight className="ml-2 h-5 w-5" />
      </button>
      {message && (
        <div className={cx("rounded-2xl border px-4 py-3 text-sm font-semibold", status === "success" ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-200" : "border-rose-300/25 bg-rose-400/10 text-rose-200")}>
          {message}
        </div>
      )}
    </form>
  );
}

function QuoteSection() {
  return (
    <section id="quote" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.12),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.14),transparent_36%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
          <div className="absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-sky-400/10 blur-3xl" />
          <SectionKicker>Ready to scale?</SectionKicker>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">Let’s build your fulfillment <span className="text-gradient">advantage.</span></h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Tell us about your business and we’ll create a custom fulfillment setup around your products, channels, and growth goals.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {["No long-term contracts", "Transparent pricing", "Fast onboarding"].map((chip) => <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200"><Check className="mr-1.5 inline h-4 w-4 text-sky-300" />{chip}</span>)}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center text-xs font-black uppercase tracking-[0.12em] text-slate-300">
            <span>Shopify</span><span>TikTok Shop</span><span>Amazon</span>
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-5 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl border border-sky-300/20 bg-sky-400/10 p-3"><Mail className="h-6 w-6 text-sky-300" /></div>
            <div>
              <h3 className="text-2xl font-black text-white">Request a quote</h3>
              <p className="mt-1 text-sm text-slate-400">This form emails your lead inbox after Vercel environment variables are added.</p>
            </div>
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-400">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#process" className="hover:text-white">How it works</a>
          <a href="#why-us" className="hover:text-white">Why us</a>
          <a href="#quote" className="hover:text-white">Get quote</a>
        </div>
        <div className="text-sm text-slate-500">© {year} Sales Fulfillment 3PL. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sales Fulfillment 3PL",
    description: "Shopify fulfillment, TikTok Shop CBT fulfillment, Amazon FBM, and Amazon FBA prep for e-commerce brands.",
    url: "https://salesfulfillment3pl.com",
    serviceType: ["Shopify Fulfillment", "TikTok Shop CBT Fulfillment", "Amazon FBM Fulfillment", "Amazon FBA Prep"],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="noise-overlay" />
      <Navigation />
      <Hero />
      <Services />
      <Process />
      <Technology />
      <WhyUs />
      <QuoteSection />
      <Footer />
    </main>
  );
}
