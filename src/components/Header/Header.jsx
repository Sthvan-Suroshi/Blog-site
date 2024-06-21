import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../appwrite/auth";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [name, setName] = useState("user");
  async function userData() {
    const userData = await authService.getCurrentUser();
    if (userData) {
      setName(userData.name);
      console.log(userData.name);
    }
  }

  useEffect(() => {
    userData();
  }, []);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-blue-300 w-full">
      <Container>
        <nav className="flex justify-center items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center">
            {navItems &&
              navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            {authStatus && (
              <>
                <li className="mx-4">Welcome, {name}</li>
                <li>
                  <LogoutBtn />
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
