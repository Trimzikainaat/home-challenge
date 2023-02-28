import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white">
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40 px-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200"></div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Kainat Mazhar. All rights
                reserved.
              </p>
            </div>
        </div>
    </footer>
  )
}
