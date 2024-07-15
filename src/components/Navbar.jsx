import React from "react";

const Navbar = () =>{
    return(
        <header>
            <div className="container flex justify-between items-center py-6">
                <h1>Where in the world</h1>

                <button>
                    <i className="bi bi-moon space-x-1"></i>
                    <span>Dark Mode</span>
                </button>
            </div>
        </header>
    )
}

export default Navbar