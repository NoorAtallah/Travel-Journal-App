"use client";

import { useEffect, useState } from "react";
import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export function Nav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
            <Link to="/profile" className="ml-4">
              <Button>{user.displayName || "User"}</Button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="./home" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/blogs">Blogs</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
