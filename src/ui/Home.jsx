import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const username = useSelector((state) => state.user.userName);
  return (
    <div className="text-center">
      <h1 className="mb-8 px-4 text-center text-xl font-bold text-stone-700 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-orange-600">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <Button to="/menu">Continue Ordering {username}</Button>
      )}
    </div>
  );
}

export default Home;
