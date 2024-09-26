import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, MessageCircle, Home, Menu, X } from 'lucide-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import bents_logo from "../public/bents-logo.jpg"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { to: "/", icon: Home, text: "Home" },
    { to: "/chat", icon: MessageCircle, text: "Chat" },
    { to: "/shop", icon: ShoppingBag, text: "Shop" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="pl-4">
          <Link to="/" className="flex items-center">
            <LazyLoadImage
              src={bents_logo}
              alt="Bent's Woodworking"
              width={100}
              height={50}
              effect="blur"
              className="max-h-12 w-auto"
            />
          </Link>
        </div>
        <nav className="ml-auto pr-4">
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.to} className="flex items-center hover:text-gray-300">
                  <item.icon className="mr-2" size={20} />
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black">
          <ul className="flex flex-col items-center py-4">
            {menuItems.map((item, index) => (
              <li key={index} className="w-full">
                <Link
                  to={item.to}
                  className="flex items-center justify-center py-2 hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  <item.icon className="mr-2" size={20} />
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header