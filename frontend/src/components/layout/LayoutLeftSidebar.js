import React from "react";

export default function LayoutLeftSidebar() {
  return (
    <footer className="mt-32">
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Kainat Mazhar. All rights
                reserved.
              </p>
            </div>
        </div>
    </footer>
  )
}
