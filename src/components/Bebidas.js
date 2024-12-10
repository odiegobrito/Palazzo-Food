import React from 'react';
import { FaCartPlus } from "react-icons/fa";
import guaracamp from '../assets/guaracamp.jpeg';

const Bebidas = ({ addToCart }) => {
    const bebidas = [
        { name: 'GuaraCamp', price: '2.00', img: guaracamp, description: 'Guaracamp 285ml.' },
    ]
    return (
        <>
            <h1 className="text-2xl md:text-3xl font-bold text-center mt-9 mb-6">
                Bebidas
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16" id="menu">
            {bebidas.map(({ name, price, img, description }, index) => (
                    <div className="flex gap-2" key={index}>
                        <img
                            src={img}
                            alt={name}
                            className="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300"
                        />
                        <div>
                            <p className="font-bold text-white">{name}</p>
                            <p className="text-sm text-white">{description}</p> {/* Aqui exibe a descrição */}
                            <div className="flex items-center gap-2 justify-between mt-3">
                                <p className="font-bold">R$ {price}</p>
                                <button
                                    className="bg-gray-900 px-5 rounded add-to-cart-btn text-white"
                                    onClick={() => addToCart(name, price)}
                                >
                                    <FaCartPlus className="text-white text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
     </div>
 </>
);
};
export default Bebidas;
