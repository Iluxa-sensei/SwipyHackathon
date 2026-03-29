import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Bot, GraduationCap, MessageSquare } from "lucide-react";
import { brand } from "@config/brand";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA]">
      <div
        className="absolute -z-10 inset-0 opacity-50 bg-primary blur-3xl"
        aria-hidden
      />
      <motion.div
        className="absolute -z-10 top-[-10%] left-[-10%] w-80 h-80 rounded-full bg-brand/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />
      <motion.div
        className="absolute -z-10 bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-brand-light/20 blur-3xl"
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.4, 0.25, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 0.8 }}
      />

      <div className="container py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center animate-enter">
          <div className="relative mx-auto">
            <div className="absolute -inset-[2px] rounded-3xl bg-brand/25 blur-xl" />
            <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl border border-purple-100 shadow-brand-shadow p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-purple-200 text-brand-dark text-xs font-medium mb-4 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Учимся с ИИ
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight">
                <span className="text-brand">{brand.siteName}</span>
                <span className="block text-[#1A1A2E] mt-1">Ваша виртуальная школа будущего</span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Инклюзивная образовательная платформа для людей с ограниченными возможностями. ИИ-ассистент, голосовая навигация и функции доступности для комфортного обучения.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/register"><Button variant="hero" size="lg" className="px-8 rounded-xl">Зарегистрироваться</Button></Link>
                <Link to="/login"><Button variant="outline" size="lg" className="px-8 rounded-xl bg-white hover:bg-white border-gray-200 hover:border-gray-300 text-gray-800 hover:text-gray-900">Войти</Button></Link>
              </div>

              <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="rounded-xl border border-purple-100 bg-white px-3 py-2 text-gray-800 inline-flex items-center gap-2 justify-center">
                  <Bot className="w-4 h-4 text-brand" /> ИИ-ассистент
                </div>
                <div className="rounded-xl border border-purple-100 bg-white px-3 py-2 text-gray-800 inline-flex items-center gap-2 justify-center">
                  <MessageSquare className="w-4 h-4 text-brand" /> Голосовая навигация
                </div>
                <div className="rounded-xl border border-purple-100 bg-white px-3 py-2 text-gray-800 inline-flex items-center gap-2 justify-center">
                  <GraduationCap className="w-4 h-4 text-brand" /> Виртуальные классы
                </div>
                <div className="rounded-xl border border-purple-100 bg-white px-3 py-2 text-gray-800 inline-flex items-center gap-2 justify-center">
                  <Sparkles className="w-4 h-4 text-brand" /> Доступность
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
