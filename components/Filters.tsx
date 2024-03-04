"use client"

import React, {useState} from 'react';
import {formUrlQuery} from "@/sanity/utils";
import {useSearchParams, useRouter} from "next/navigation";
const links = ['all', 'Next 13', 'frontend', 'backend', 'fullstack'];

function Filters() {
  const  [active, setActive] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (link: string) => {
    let newUrl = '';

    if(active === link) {
      setActive('');

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'],
      })
    } else {
      setActive(link);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: link.toLowerCase(),
      })
    }

    router.push(newUrl, { scroll: false });
    // let newUrl = '';
    //
    // setActive(link);
  }

  return (
    <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full max-w-full gap-2 overflow-auto py-12 sm:max-w-2xl">
      {links.map((link) => (
        <button
          key={link}
          onClick={() => handleFilter(link)}
          className={`${active === link ? 'gradient_blue-purple' : ''} whitespace-nowrap text-white rounded-xl px-8 py-2.5 capitalize`}
        >
          {link}
        </button>
      ))}
    </ul>
  );
}

export default Filters;
