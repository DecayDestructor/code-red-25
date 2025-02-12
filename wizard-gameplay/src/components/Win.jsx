import level1_3 from '../assets/Win2.webp';
import { Link } from "react-router-dom";

const Win = () => {
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
            <div className="relative flex justify-center items-center h-full w-full">
                <div className="text-center bg-black/50 p-8 rounded-xl backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-500 w-2/3 md:w-1/3">
                    <h1 className="text-5xl font-bold text-yellow-300 mb-4 animate-bounce">
                        🎉 YOU WON! 🎉
                    </h1>
                    <p className="text-2xl text-white mb-6">
                        Congratulations on your victory!
                    </p>
                    <Link 
                        to="/"
                        className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Play Again
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Win;
