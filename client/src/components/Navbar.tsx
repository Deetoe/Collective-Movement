import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="min-w-full bg-pink-500 shadow-md">
            <div className="mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="item-start text-2xl font-bold">Collective Movement</Link>
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-700 focus:outline-none"
                >
                    ☰
                </button>
                <ul className={`md:flex space-x-6 ${open ? 'block mt-4' : 'hidden'} md:mt-0`}>
                    <li>
                        <Link to="/" className="font-bold hover:text-blue-600">Home</Link>
                    </li>

                    <li>
                        <Link to="/media" className="font-bold hover:text-blue-600">Media</Link>
                    </li>

                    <li>
                        <Link to="/leaderboard" className="font-bold hover:text-blue-600">Leader Board</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
