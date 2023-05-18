import React from "react";
import { Link } from "react-router-dom"
import { ReactComponent as Icon } from "../../assets/bars.svg"
import useWindowSize from "../../hooks/useWindowSize"
import classNames from "classnames"
import Logo from "../../assets/logo.png"


function LandingPage() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { width } = useWindowSize()


  React.useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);


  }, []);

  React.useEffect(() => {
    if (width < 776) {
      setIsOpen(false)
    }
  }, [width])



  return (
    <div>

      <nav className={classNames("shadow fixed w-full bg-transparent z-30 text-white transition-all duration-500 py-4", {
        "backdrop-blur-[10px] !py-0 !bg-[rgb(0,30,63,0.8)] z-50": isScrolled
      })}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"
        >
          <div className="flex justify-between h-16 px-4">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="font-bold text-lg">
                <img src={Logo} alt="Chat g6 logo" className=" h-[60px]" />
              </a>
            </div>
            <div className="hidden sm:flex sm:items-center">
              <Link to="/" className="px-3 py-2">
                Home
              </Link>
              <a href="#pricing" className="px-3 py-2">Pricing</a>
              <Link to="/chat" className="px-3 py-2">
                Chat
              </Link>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none "
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <Icon width={25} height={25} className="menu-icon" />

              </button>
            </div>
          </div>
        </div>
        <div className={classNames(`sm:hidden absolute top-[64px] left-0 w-full transition-all duration-3 scale-y-0 opacity-0 origin-top`, { "scale-y-100 opacity-100": isOpen, "!top-[80px]": !isScrolled })} id="mobile-menu">
          <div className={classNames("px-2 pt-2 pb-3 space-y-1 bg-white")}>
            <Link to="/">
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Home
              </button>
            </Link>
            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => {
                setIsOpen(!isOpen)
              }}>
              <a href="#pricing">
                Pricing
            </a>
            </button>
            <Link to="/chat">
              <button type="button" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Chat
              </button>
            </Link>
          </div>
        </div>
      </nav>



      {/* Main content */}
      <main className="" style={{
        height: window.innerHeight
      }}>
        {/* Hero section */}
        <section className="bg-mainai bg-center bg-cover flex h-full justify-center md:!justify-start items-center relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-60"
        >
          <div className="max-w-7xl px-4 sm:px-6 text-center md:text-left lg:px-8 z-30">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Welcome to Chat G6
              </h2>
              <p className="mt-4 text-lg text-gray-500 text-center md:text-start">
                your AI-powered chat companion!
              </p>
              <button className="text-md mt-4  bg-[white] inline-block hover:bg-[rgb(0,30,63)] hover:text-white px-4 py-1 rounded-xl">
                <Link to="/chat">
                  Start now
                    </Link>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing section */}

        {/*
        <section className="h-[5000px]" id="pricing">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-gray-100 rounded-lg shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900">
                    Basic Plan
                  </h3>
                  <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="mt-6">
                    <span className="text-2xl font-medium text-gray-900">
                      $9
                    </span>
                    <span className="text-gray-500 ml-2">/ month</span>
                  </div>
                  <div className="mt-8">
                    <a
                      href="/"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              </div>

              
              <div className="bg-gray-100 rounded-lg shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900">
                    Pro Plan
                  </h3>
                  <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="mt-6">
                    <span className="text-2xl font-medium text-gray-900">
                      $19
                    </span>
                    <span className="text-gray-500 ml-2">/ month</span>
                  </div>
                  <div className="mt-8">
                    <a
                      href="/"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              </div>

              
              <div className="bg-gray-100 rounded-lg shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900">
                    Pro Plan
                  </h3>
                  <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="mt-6">
                    <span className="text-2xl font-medium text-gray-900">
                      $19
                    </span>
                    <span className="text-gray-500 ml-2">/ month</span>
                  </div>
                  <div className="mt-8">
                    <a
                      href="/"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        */
        }

      </main>
    </div>
  )
}
export default LandingPage