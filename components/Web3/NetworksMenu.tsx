import * as React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useNetwork } from 'wagmi';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export const NetworksMenu = () => {
  const [{ data }, switchNetwork] = useNetwork();

  const chain = React.useMemo(() => {
    const index = data?.chains?.findIndex((chain) => chain.id === data?.chain?.id);
    return data.chains[index] || null;
  }, [data]);

  if (!chain || !switchNetwork) return null;

  return (
    <>
      {data && (
        <Listbox value={chain} onChange={(x) => switchNetwork(x.id)}>
          <div className="relative z-10 mt-1">
            <Listbox.Button className="nav-button relative cursor-default pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-base">{chain.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-zinc-100 py-1 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:text-white sm:text-sm">
                <p className="py-2 px-3 text-neutral-700 dark:text-neutral-200">Select a Network</p>
                {data.chains.map((chain) => (
                  <Listbox.Option
                    key={chain.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-cyan-100 text-cyan-900' : 'text-gray-900 dark:text-white'
                      }`
                    }
                    value={chain}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {chain.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </>
  );
};
