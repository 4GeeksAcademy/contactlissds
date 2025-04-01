// Home.jsx
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useGlobalReducer } from "../hooks/useGlobalReducer"; // Importar correctamente el hook

export const Home = () => {
  const { state, dispatch } = useGlobalReducer();  // Desestructurando state y dispatch

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
    </div>
  );
};

export default Home;
