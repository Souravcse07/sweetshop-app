"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* SHOP INFO */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/logo/logo.png"
              alt="Sri Annapoorneswari Sweets"
              width={40}
              height={40}
            />
            <h2 className="text-xl font-bold text-white">
              Sri Annapoorneswari Sweets
            </h2>
          </div>
          <p className="text-sm">
            Traditional sweets & savouries made with love and quality ingredients.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="flex items-center gap-2 text-sm">
            <Phone size={16} /> +91 9686795546
          </p>
          <p className="flex items-center gap-2 text-sm mt-2">
            <Mail size={16} /> sriannapoorneswarisweets@gmail.com
          </p>
        </div>

        {/* LOCATION */}
        <div>
          <h3 className="text-white font-semibold mb-3">Location</h3>
          <p className="flex items-center gap-2 text-sm">
            <MapPin size={16} />
           5/A, 14th cross,Subramanya Pura Rd, Kadarenahalli, Kaderenahalli, Banashankari, Bengaluru, Karnataka 560070
          </p>
          <Link
            href="https://www.google.com/maps/place/Sri+Annapoorneshwari+Sweets/@12.9154117,77.5620648,17z/data=!4m15!1m8!3m7!1s0x3bae155e73303c83:0xc095a566a0772aa9!2sSri+Annapoorneshwari+Sweets!8m2!3d12.9153525!4d77.5620222!10e5!16s%2Fg%2F11khpdjq28!3m5!1s0x3bae155e73303c83:0xc095a566a0772aa9!8m2!3d12.9153525!4d77.5620222!16s%2Fg%2F11khpdjq28?entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
            target="_blank"
            className="text-orange-400 text-sm mt-2 inline-block"
          >
            View on Google Maps
          </Link>
        </div>

        {/* SOCIAL & FEEDBACK */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>

          <Link
            href="/feedback"
            className="text-sm hover:text-white block mb-2"
          >
            💬 Give Feedback
          </Link>

          <Link
            href="https://www.instagram.com/sri_annapoorneswari_sweets_/"
            target="_blank"
            className="flex items-center gap-2 text-sm hover:text-white"
          >
            <Instagram size={16} /> Instagram
          </Link>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sri Annapoorneswari Sweets ·{" "}
        <span className="ml-1">
          Website handled by{" "}
          <span className="text-white font-medium">DECODERS</span>
        </span>
      </div>
    </footer>
  );
}
