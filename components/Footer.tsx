import React from 'react';
import Link from "next/link";

function Footer() {
  return (
    <footer className="text-white flex-between body-text w-full gap-y-10   border-t-slate-900 border-t-2  px-20 py-12 max-md:flex-col">
      <p className="text-white-800">Copyright © 2023 JS Mastery Pro | All Rights Reserved</p>

      <div className="flex gap-x-9">
        <Link href="/terms-of-use">Terms & Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export default Footer;
