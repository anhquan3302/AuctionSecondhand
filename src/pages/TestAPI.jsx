import React from "react";
import { useGetUsersQuery } from "../services/user.service.js";
import { Link } from "react-router-dom";
import FooterBK from "../components/FooterBK/index.jsx";

const TestAPI = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    // eslint-disable-next-line react/no-unescaped-entities
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Product List</h1>
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user.email}</li>;
          })}
        </ul>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default TestAPI;
