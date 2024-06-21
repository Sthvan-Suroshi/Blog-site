import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Home() {
  const [posts, setPosts] = useState([]);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        console.log("data loaded");
      }
    });
    return () => {
      console.log("flushed useEffect from home page");
    };
  }, []);

  if (!authStatus) {
    return (
      <Container>
        <div className="flex flex-wrap h-[50vh] justify-center items-center">
          <div className="p-2 w-full flex justify-center items-center ">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              login to read posts
            </h1>
          </div>
        </div>
      </Container>
    );
  } else if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center h-[32rem]">
        <Container>
          <div className="flex flex-wrap h-full">
            <div className="p-2 w-full flex justify-center items-center flex-col">
              <h1 className="text-2xl font-bold hover:text-gray-500 mb-8">
                No posts yet
              </h1>
              <div>
                <Link to="/add-post">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Add Post
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full min-h-[70vh] py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
