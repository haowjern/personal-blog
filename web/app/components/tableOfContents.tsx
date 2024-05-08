import { PortableTextTextBlock } from "sanity";

export default function TableOfContents({
  headings,
}: {
  headings: PortableTextTextBlock[];
}) {
  return (
    <div className="p-12">
      <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
        On this page
      </h5>
      <ul className="text-slate-700 text-sm leading-6">
        {headings.map((heading) => {
          const level = heading.style.slice(1);
          const headingText = heading.children[0].text as string;
          const headingId = headingText.toLowerCase().replace(/\s+/g, "-");
          switch (level) {
            case "1":
              return (
                <li key={headingId}>
                  <a
                    href={`#${headingId}`}
                    className="block py-1 font-medium hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {heading.children[0].text}
                  </a>
                </li>
              );
            case "2":
              return (
                <li className="ml-4" key={headingId}>
                  <a
                    href={`#${headingId}`}
                    className="group flex items-start py-1 block py-1 font-medium hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <svg
                      width="3"
                      height="24"
                      viewBox="0 -9 3 24"
                      className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                    >
                      <path
                        d="M0 0L3 3L0 6"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                    {heading.children[0].text}
                  </a>
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
}

/*


*/
