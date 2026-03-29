import Link from "next/link";
import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { brand } from "@config/brand";

const Footer = () => {
  return (
    <footer className="border-t border-purple-100 bg-[#FAFAFA]" id="contact">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img
              src={brand.logoLightPath}
              alt=""
              className="h-10 w-auto max-w-[200px] object-contain object-left"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {brand.siteName} — портал для учеников, родителей и педагогов (Актобе, Казахстан).
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3 text-brand tracking-tight">Контакты</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Email: iluxaser07@gmail.com</li>
            <li>Город: Актобе</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3 text-brand tracking-tight">Правовая информация</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-brand transition-colors">
                Политика конфиденциальности
              </Link>
            </li>
          </ul>
          <div className="flex gap-4 mt-4 text-muted-foreground">
            <a
              aria-label="WhatsApp"
              href="https://wa.me/77000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-emerald-600"
            >
              <MessageCircle className="size-5" />
            </a>
            <a
              aria-label="Instagram"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              <Instagram className="size-5" />
            </a>
            <a
              aria-label="LinkedIn"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              <Linkedin className="size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-purple-100 py-4 text-center text-xs text-muted-foreground uppercase tracking-widest">
        © {new Date().getFullYear()} {brand.siteName}. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
