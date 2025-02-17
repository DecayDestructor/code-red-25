import level1_3 from '../assets/interfaces/Lose.png';
import { Link } from "react-router-dom";

const Lose = () => {
    return (
        <div
            className="flex justify-center items-center flex-col imageContainer"
            style={{
                backgroundImage: `url(${level1_3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                transition: "background-image 0.8s ease-in-out",
            }}
        >
            <div className="text-center bg-black/50 p-8 rounded-xl backdrop-blur-sm">
                <h1 className="text-6xl font-bold text-red-500 mb-4">
                    Game Over
                </h1>
                <p className="text-2xl text-gray-300 mb-6">
                    Don't give up! Try again!
                </p>
                <Link 
                    to="/"
                    className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default Lose;