import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-16 mt-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">

          {/* Brand */}

          <div className="col-span-2">

            <div className="mb-6">

              <Link href="/" className="inline-block">

                <Image
                  src="/logo.png"
                  alt="Travel For Benefits"
                  width={160}
                  height={60}
                  className="h-14 w-auto object-contain"
                />

              </Link>

            </div>

            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">

              Connecting travelers with extraordinary stays, adventures,
              spiritual retreats, Char Dham Yatra, and divine experiences
              across Uttarakhand, Himachal Pradesh and beyond.

            </p>

          </div>

          {/* Company */}

          <div>

            <h5 className="font-bold mb-6 text-slate-900">Company</h5>

            <ul className="space-y-4 text-sm text-slate-500">

              <li>
                <Link href="/about" className="hover:text-[#f4b400] transition-colors">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/careers" className="hover:text-[#f4b400] transition-colors">
                  Careers
                </Link>
              </li>

              <li>
                <Link href="/press" className="hover:text-[#f4b400] transition-colors">
                  Press
                </Link>
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h5 className="font-bold mb-6 text-slate-900">Support</h5>

            <ul className="space-y-4 text-sm text-slate-500">

              <li>
                <Link href="/help" className="hover:text-[#f4b400] transition-colors">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="/safety" className="hover:text-[#f4b400] transition-colors">
                  Safety Information
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-[#f4b400] transition-colors">
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>

          {/* Legal */}

          <div>

            <h5 className="font-bold mb-6 text-slate-900">Legal</h5>

            <ul className="space-y-4 text-sm text-slate-500">

              <li>
                <Link href="/privacy-policy" className="hover:text-[#f4b400] transition-colors">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-[#f4b400] transition-colors">
                  Terms of Service
                </Link>
              </li>

            </ul>

          </div>

          {/* Newsletter */}

          <div>

            <h5 className="font-bold mb-6 text-slate-900">Newsletter</h5>

            <div className="flex gap-2">

              <input
                type="email"
                placeholder="Email"
                className="w-full bg-slate-100 border-none rounded-lg text-xs px-3 py-2 focus:ring-1 focus:ring-[#f4b400] outline-none"
              />

              <button className="bg-[#f4b400] text-white px-3 rounded-lg flex items-center justify-center">

                <span className="material-symbols-outlined text-sm">
                  send
                </span>

              </button>

            </div>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">

          <p>
            © {new Date().getFullYear()} Travel For Benefits. All rights reserved.
          </p>

          <div className="flex items-center gap-4">

            <span>English (IN)</span>

            <span>INR</span>

          </div>

        </div>

      </div>

    </footer>
  );
}