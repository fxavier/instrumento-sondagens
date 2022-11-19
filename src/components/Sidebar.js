import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdDashboard, MdSummarize } from "react-icons/md";
import { FaList } from "react-icons/fa";

import { Link } from "react-router-dom";

const Sidebar = () => {
	const menus = [
		{ name: "Dashboard", link: "/dashboard", icon: MdDashboard },
		{ name: "Inquerito", link: "/inquerito", icon: MdSummarize },
		{ name: "Listagem", link: "/listagem", icon: FaList },
	];

	const [open, setOpen] = useState(true);
	return (
		<section className="flex gap-6">
			<div
				className={`bg-[#052963] min-h-screen ${
					open ? "w-72" : "w-16"
				} duration-500 text-gray-100 px-4`}
			>
				<div className="py-3 flex justify-end">
					<HiMenu
						size={26}
						className="cursor-pointer hover:text-[#02BBCA]"
						onClick={() => setOpen(!open)}
					/>
				</div>
				<div className="mt-4 flex flex-col gap-4 relative">
					{menus.map((menu, i) => (
						<Link
							to={menu?.link}
							key={i}
							className={`${
								menu?.margin && "mt-5"
							}group flex items-center text-sm gap-3.5 font-medium p-2  hover:bg-[#02BBCA] rounded-md`}
						>
							<div>{React.createElement(menu?.icon, { size: "20" })}</div>
							<h2
								style={{ transitionDelay: `${i + 3}00ms` }}
								className={`whitespace-pre duration-500 ${
									!open && "opacity-0 translate-x-28 overflow-hidden"
								}`}
							>
								{menu?.name}
							</h2>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Sidebar;
