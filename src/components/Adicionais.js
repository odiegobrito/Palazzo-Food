import { FaCartPlus } from "react-icons/fa";
import fritas from '../assets/fritas.png'
import maionese from '../assets/maionese.png'
import salada from '../assets/salada.png'
import pure from '../assets/pure.png'
import ovo from '../assets/ovo.png'
import vinagrete from '../assets/vinagrete.png';


const Adicionais = ({ addToCart }) => {
    const adicionais = [
        { name: 'Salada Maionese', price: '4.00', img: maionese, description: 'Deliciosa salada com maionese fresca.' },
        { name: 'Molho Vinagrete', price: '4.00', img: vinagrete, description: 'Molho tradicional com tomate e cebola.' },
        { name: '+++Fritas', price: '5.00', img: fritas, description: 'Batatas fritas crocantes e sequinhas.' },
        { name: 'Purê de Batata', price: '4.00', img: pure, description: 'Purê cremoso feito com batatas selecionadas.' },
        { name: 'Salada Verde', price: '3.00', img: salada, description: 'Salada fresca com folhas verdes e saudáveis.' },
        {name: 'Ovo Frito', price: '2.00', img:ovo, description: 'Ovo Frito na hora'},
    ];

    return (
        <>
            <h1 className="text-2xl md:text-3xl font-bold text-center mt-9 mb-6">
                Adicionais
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16" id="menu">
                {adicionais.map(({ name, price, img, description }, index) => (
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

export default Adicionais;
