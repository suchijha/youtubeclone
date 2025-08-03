import { X, Home, Flame, Radio, Video, Clock, ThumbsUp, User2, Music, Film, Gamepad2, Newspaper, Trophy, ShoppingBag, Settings, Flag, HelpCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function SideMenu({ onClose }) {
  return (
    <div className=" w-64  h-[97vh] fixed z-30 md:static bg-white shadow-md  overflow-y-auto">
        <br /><br />
    

      {/* Menu Sections */}
      <nav className="p-4 space-y-6">
        <ul className="space-y-3">

          <Link to="/">
          <MenuItem icon={<Home />} label="Home" />
          </Link>
          <MenuItem icon={<Flame />} label="Trending" />
          <MenuItem icon={<Radio />} label="Shorts" />
          <MenuItem icon={<Video />} label="Subscriptions" />
        </ul>

        <hr />

        <ul className="space-y-3">
          <Link to='/mychannel'>
          <MenuItem icon={<User2 />} label="Your Channel" />
          </Link>
          <MenuItem icon={<Clock />} label="History" />
          <MenuItem icon={<Video />} label="Your Videos" />
          <MenuItem icon={<ThumbsUp />} label="Liked Videos" />
        </ul>

        <hr />

        <ul className="space-y-3">
          <MenuItem icon={<Music />} label="Music" />
          <MenuItem icon={<Film />} label="Movies" />
          <MenuItem icon={<Gamepad2 />} label="Gaming" />
          <MenuItem icon={<Newspaper />} label="News" />
          <MenuItem icon={<Trophy />} label="Sports" />
          <MenuItem icon={<ShoppingBag />} label="Shopping" />
        </ul>

        <hr />

        <ul className="space-y-3">
          <MenuItem icon={<Settings />} label="Settings" />
          <MenuItem icon={<Flag />} label="Report history" />
          <MenuItem icon={<HelpCircle />} label="Help" />
          <MenuItem icon={<AlertCircle />} label="Send feedback" />
        </ul>
      </nav>
    </div>
  );
}

function MenuItem({ icon, label }) {
  return (
    <li className="flex items-center gap-3 text-gray-800 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer transition">
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </li>
  );
}
