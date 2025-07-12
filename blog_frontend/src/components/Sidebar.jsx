// src/components/Sidebar.jsx
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, Bars3Icon, HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Create Post", href: "/create", icon: PencilSquareIcon },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative w-64 bg-white p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-indigo-600">MyBlog</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50 text-gray-800"
                    >
                      <item.icon className="h-5 w-5 text-indigo-600" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">MyBlog</h2>
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50 text-gray-800"
              >
                <item.icon className="h-5 w-5 text-indigo-600" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content Wrapper (adjust left margin on desktop) */}
      <div className="md:pl-64 pt-4 px-4">{/* your page content here */}</div>
    </>
  );
}
