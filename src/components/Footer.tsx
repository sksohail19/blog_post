const footerLinks = ["Privacy", "Terms", "Cookies"];

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-stone-200 bg-stone-100/80 px-6 py-6 backdrop-blur sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">
            The Editorial
          </p>
          <p className="mt-2 text-sm text-stone-600">
            2026 The Editorial. All rights reserved.
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-stone-700">
          {footerLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="transition duration-200 hover:text-stone-950"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
