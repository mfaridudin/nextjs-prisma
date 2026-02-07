 <aside className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl fixed h-screen p-4 border-r col">

                <nav>
                    <ul className="space-y-2">
                        {menus.map((menu) => {
                            const isActive =
                                pathname === menu.href

                            return (
                                <li key={menu.href}>
                                    <Link
                                        href={menu.href}
                                        className={`flex items-center py-3 px-4 rounded-lg transition-all group
                    ${isActive
                                                ? "bg-indigo-600 text-white"
                                                : "hover:bg-indigo-100 dark:hover:bg-gray-700"
                                            }
                  `}
                                    >
                                        <svg
                                            className={`w-5 h-5 mr-3 transition-colors
                      ${isActive
                                                    ? "text-white"
                                                    : "text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800"
                                                }
                    `}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            {menu.icon}
                                        </svg>
                                        {menu.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>