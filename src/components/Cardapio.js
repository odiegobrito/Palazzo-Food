import { useState } from 'react';
import { FaCartPlus } from "react-icons/fa";
import ba from '../assets/ba.png'
import bm from '../assets/bm.jpg'
import pf from '../assets/pf.jpg'
import fm from '../assets/fm.jpg'
import pcf from '../assets/pcf.jpg'
import fg from '../assets/fg.jpg'
import mc from '../assets/mc.jpg'
import ca from '../assets/ca.jpg'

import Modal from './Modal.js'
import bifeCavalo from '../assets/bife.png'
import bolonhesa from '../assets/bolonhesa.png'
import Bebidas from './Bebidas';
import Adicionais from './Adicionais';

function Cardapio () {

    const [cart, setCart] = useState([]); // Estado para os itens no carrinho
    const [cartCount, setCartCount] = useState(0); // Contagem de itens no carrinho
    const [cartTotal, setCartTotal] = useState(0); // Total do carrinho
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

    // Função para adicionar ou atualizar itens no carrinho
    const addToCart = (name, price) => {
        setCart(prevCart => {
            const existingItem = prevCart.find((item) => item.name === name);
    
            if (existingItem) {
                // Se o item já existe no carrinho, aumente a quantidade
                existingItem.quantity += 1;
                return [...prevCart];
            } else {
                // Se o item não existe, adicione um novo item com quantidade 1
                return [...prevCart, { name, price, quantity: 1 }];
            }
        });
    
        // Atualizando o contador e o total do carrinho
        setCartCount(prevCount => prevCount + 1);
        setCartTotal(prevTotal => prevTotal + parseFloat(price));
    };

    // Função para alternar a visibilidade do modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const pratos = [
        {
          name: "Bife a Cavalo",
          description: "Delicioso bife com fritas, servido com Arroz, Feijão, Ovo e Farofa.",
          price: "17.00",
          img: bifeCavalo,
        },
        {
          name: "Bife Acebolado",
          description: "Delicioso bife acebolado com fritas, servido com Arroz, Feijão e Farofa.",
          price: "15.00",
          img: ba,
        },
        {
          name: "Bife a Milanesa",
          description: "Bife a Milanesa acompanhado com Fritas, Arroz, Feijão e Farofa.",
          price: "15.00",
          img: bm,
        },
        {
          name: "Filézinho de Peixe Frito",
          description: "Filezinho de Peixe Frito acompanhado com Fritas, Arroz, Feijão.",
          price: "15.00",
          img: pf,
        },
        {
          name: "Frango a Milanesa",
          description: "Frango a Milanesa acompanhado com Fritas, Arroz, Feijão e Farofa.",
          price: "14.00",
          img: fm,
        },
        {
          name: "Frango Grelhado",
          description: "Frango Grelhado acompanhado com Fritas, Arroz, Feijão e Farofa.",
          price: "14.00",
          img: fg,
        },
        {
          name: "Picadinho de Frango",
          description: "Frango Picado acompanhado com Fritas, Arroz, Feijão e Farofa.",
          price: "14.00",
          img: pcf,
        },
        {
          name: "Espaguete a Bolonhesa",
          description: "Macarrão a Bolonhesa acompanhado com Feijão e Farofa.",
          price: "13.00",
          img: bolonhesa,
        },
        {
          name: "Calabresa Acebolada",
          description: "Calabresa Acebolada acompanhada com Arroz, Feijão e Farofa.",
          price: "12.00",
          img: ca,
        },
        {
          name: "Macarrão C/ Linguiça",
          description: "Macarrão C/ Linguiça acompanhado com Feijão e Farofa.",
          price: "11.00",
          img: mc,
        },
      ];
      

return(
    <>
        
        <div id="menu">
  <h2 className="text-2xl md:text-3xl font-bold text-center mt-9 mb-6">Conheça nosso cardápio</h2>
  <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16">
    {pratos.map(({ name, description, price, img }, index) => (
      <div className="flex gap-2" key={index}>
        <img
          src={img}
          alt={name}
          className="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300"
        />
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-sm">{description}</p>
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
  </main>
</div>


    
    {/* Botão do carrinho */}

    
    <footer className="w-full bg-red-500 py-2 fixed bottom-0 z-40 flex items-center justify-center">
                <button 
                    className="flex items-center gap-2 text-white font-bold" 
                    onClick={toggleModal}>
                    <FaCartPlus className="fa fa-cart-plus text-lg text-white" />
                    Veja meu carrinho
                    <i className="fa fa-cart-plus text-lg text-white"></i>
                    {cartCount > 0 && <span className="text-sm">{cartCount}</span>}
                </button>
            </footer>

            {/* Modal do Carrinho */}

            <Modal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        cart={cart}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />
            <Bebidas addToCart={addToCart} />
            <Adicionais addToCart={addToCart} />
        </>
    );
}
export default Cardapio;