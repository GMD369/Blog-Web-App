
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Image, Smartphone, PenTool, TrendingUp, Star } from "lucide-react";
import Footer from "../components/Footer";

const perks = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
    title: "Secure JWT Auth",
    desc: "Your account is fortified with industry‑standard token protection so you can write with peace of mind."
  },
  {
    icon: <Image className="w-8 h-8 text-indigo-600" />,
    title: "Cloud Image Hosting",
    desc: "Every image is automatically optimized & CDN‑delivered for lightning‑fast load times."
  },
  {
    icon: <Smartphone className="w-8 h-8 text-indigo-600" />,
    title: "Responsive UI",
    desc: "Whether on mobile, tablet, or desktop, your blog always looks pixel‑perfect."  
  },
];

const highlights = [
  {
    icon: <PenTool className="w-8 h-8 text-indigo-600" />,
    heading: "Markdown & Rich‑Text Editor",
    description: "Compose seamlessly with live preview and keyboard shortcuts."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
    heading: "Built‑in Analytics",
    description: "Track views, reads, and engagement in real‑time, right from your dashboard."
  },
  {
    icon: <Star className="w-8 h-8 text-indigo-600" />,
    heading: "Custom Themes",
    description: "Switch palettes or craft your own to match your personal brand."
  }
];

const testimonials = [
  {
    quote: "InkCraft made publishing my tutorials effortless and beautiful. My readership grew 3× in a month!",
    name: "Ayesha Khan",
    role: "Full‑Stack Dev"
  },
  {
    quote: "The built‑in analytics help me understand what resonates with my audience without extra tools.",
    name: "Hassan Raza",
    role: "Technical Writer"
  }
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* ───────────────────── Hero Section ───────────────────── */}
      <header className="relative bg-gradient-to-br from-indigo-600 to-purple-600 min-h-screen flex flex-col text-white overflow-hidden">
        {/* Login Button */}
        <Link
          to="/login"
          className="absolute top-6 right-8 text-sm font-medium px-5 py-2 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-indigo-100 transition"
        >
          Login
        </Link>

        {/* Logo */}
        <div className="px-6 pt-6">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-500 bg-clip-text text-transparent">
            InkCraft
          </h1>
        </div>

        {/* Hero Content */}
        <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
          <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight max-w-3xl drop-shadow-md">
            Share your <span className="text-yellow-300">stories</span> with the world.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-indigo-200">
            A modern blogging platform built with Django & React — secure, fast and delightful.
          </p>
          <Link
            to="/register"
            className="mt-10 inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
        </main>

        {/* Decorative SVG */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h1440v90H0V0z" fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>
        </svg>
      </header>

      {/* ───────────────────── Feature Cards ───────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-12">Why Choose InkCraft?</h3>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {perks.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition text-left">
                {icon}
                <h4 className="mt-4 text-lg font-semibold text-indigo-700">{title}</h4>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── Product Highlights ───────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid gap-16 md:grid-cols-3 items-start">
          {highlights.map(({ icon, heading, description }) => (
            <div key={heading} className="flex flex-col items-start">
              {icon}
              <h4 className="mt-4 text-xl font-semibold text-gray-800">{heading}</h4>
              <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────── Testimonials ───────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-12">What Our Writers Say</h3>
          <div className="grid gap-10 md:grid-cols-2">
            {testimonials.map(({ quote, name, role }) => (
              <div key={name} className="bg-white rounded-xl shadow p-8 text-left">
                <p className="text-gray-700 italic leading-relaxed">“{quote}”</p>
                <div className="mt-4 text-sm font-medium text-indigo-700">{name}</div>
                <div className="text-xs text-gray-500">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── Call‑to‑Action Strip ───────────────────── */}
      <section className="relative py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h4 className="text-2xl md:text-3xl font-bold max-w-xl">
            Ready to turn your ideas into captivating reads?
          </h4>
          <Link
            to="/register"
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
          >
            Start Writing Today
          </Link>
        </div>
        <svg className="absolute top-0 right-0 w-40 opacity-20" viewBox="0 0 183 157" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h183v157H0V0z" fill="url(#strip)" />
          <defs>
            <linearGradient id="strip" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      <Footer />
    </>
  );
}
