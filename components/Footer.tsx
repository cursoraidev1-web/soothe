import Link from 'next/link'
import Image from 'next/image'

const footerNavigation = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ],
  solutions: [
    { name: 'Productivity', href: '/solutions#productivity' },
    { name: 'Wellness', href: '/solutions#wellness' },
    { name: 'Assistive Technology', href: '/solutions#assistive' },
    { name: 'Smart Living', href: '/solutions#smart-living' },
  ],
  support: [
    { name: 'Accessibility', href: '/inclusivity' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/logo/logo-horizontal-light.png"
                alt="SOOHE TECHNOLOGIES"
                width={360}
                height={140}
                className="h-[8.5rem] w-auto"
              />
            </div>
            <p className="text-sm text-neutral-400 mt-4 max-w-xs">
              Build Easy Technology. Inclusive from day one, designed for humans.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-accent-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Solutions</h3>
              <ul className="space-y-3">
                {footerNavigation.solutions.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-accent-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {footerNavigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-accent-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-xs text-neutral-500 text-center">
            &copy; {new Date().getFullYear()} SOOTHE TECHNOLOGIES LIMITED. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
