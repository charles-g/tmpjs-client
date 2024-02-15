import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white py-4 shadow-md mb-2">
            <div className="container px-4 mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-black text-lg font-semibold">TJS</div>
                <div className="w-3/4 md:w-auto">
                    <p className="text-sm">This is a POC for the &quot;booking&quot; use case with Algolia.</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
