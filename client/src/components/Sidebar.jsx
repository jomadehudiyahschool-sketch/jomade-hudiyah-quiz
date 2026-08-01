import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const menus = [

        {
            name: "Dashboard",
            icon: "🏠",
            link: "/admin/dashboard"
        },

        {
            name: "Participants",
            icon: "👨‍🎓",
            link: "/admin/participants"
        },
        {
    name: "QR Code",
    icon: "📱",
    link: "/admin/qrcode"
},

        {

    name:"Question Manager",

    icon:"❓",

    link:"/admin/questions"

},
        {
            name: "Live Competition",
            icon: "🎮",
            link: "/admin/live"
        },

        {
    name: "Live Leaderboard",
    icon: "📊",
    link: "/admin/leaderboard"
},
{
            name: "Settings",
            icon: "⚙",
            link: "/admin/settings"
        },
{
    name: "Results",
    icon: "🏆",
    link: "/admin/results"
},
{
    name: "Winner Podium",
    icon: "🥇",
    link: "/admin/podium"
},
{
    name: "Certificates",
    icon: "📜",
    link: "/admin/certificates"
}


    ];

    return (

        <div className="w-72 bg-slate-950 text-white h-screen fixed">

            <div className="p-6">

                <h1 className="text-2xl font-black">

                    🏫 Jomade Hudiyah School

                </h1>

                <p className="text-gray-400">

                    Quiz Competition

                </p>

            </div>

            <div className="mt-6">

                {

                    menus.map(menu => (

                        <NavLink

                            key={menu.link}

                            to={menu.link}

                            className={({isActive})=>

                                `block px-6 py-4 hover:bg-slate-800 ${
                                    isActive
                                    ? "bg-blue-700"
                                    : ""
                                }`
                            }

                        >

                            {menu.icon} {menu.name}

                        </NavLink>

                    ))

                }

            </div>

        </div>

    );

}