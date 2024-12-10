import React, { useState, useEffect } from "react";

function Modal({ isModalOpen, toggleModal, cart, cartCount }) {
    const [name, setName] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [talher, setTalher] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [trocoValor, setTrocoValor] = useState("");
    const [isFormValid, setIsFormValid] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);
    const [addressWarn, setAddressWarn] = useState(false); // Estado para controle do aviso de endereço vazio
    const [erroCep, setErroCep] = useState(false); // Estado para erro de CEP inválido

    // Função para converter o endereço para maiúsculas
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value.toUpperCase());
    };

    // Função para validar o endereço
    useEffect(() => {
        if (address !== "") {
            setAddressWarn(false); // eslint-disable-next-line
            
        }
    }, [address]);

    // Função para buscar o endereço via API ViaCEP
    const buscarEndereco = async () => {
        const cepFormatado = cep.replace(/\D/g, ''); // Remove tudo que não for número

        // Verifica se o CEP tem o formato correto (8 dígitos)
        if (cepFormatado.length !== 8) {
            setErroCep(true);
            return;
        }
        setErroCep(false);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }

            // Preenche os campos com os dados retornados
            setAddress(data.logradouro);
            setBairro(data.bairro);
            
        } catch (error) {
            alert("Erro ao buscar o CEP. Tente novamente.");
        }
    };

    // Calcular o total do carrinho
    useEffect(() => {
        if (Array.isArray(cart)) { // Verifique se cart é um array válido
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setCartTotal(total);
        } else {
            setCartTotal(0); // Caso cart não seja um array, set o total como 0
        }
    }, [cart]);

    // Função para coletar os dados do cliente
    const getCustomerData = () => {
        if (!name || !cep || !numero || !bairro || !address || !paymentMethod) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return null;
        }

        let message = `*Pedido de:* ${name}\n\n`;

        // Adicionar produtos ao pedido
        message += `*Produtos:* \n`;
        cart.forEach(item => {
            // Verifique se item.price é um número
            const price = parseFloat(item.price); // Tenta garantir que seja um número

            // Se item.price não for um número válido, substituímos por 0 ou outra ação
            if (isNaN(price)) {
                console.error(`Erro: o preço do item ${item.name} não é um número válido.`);
                return; // Se o preço não for válido, o item é ignorado
            }

            message += `- ${item.name} x${item.quantity} (R$ ${price.toFixed(2)})\n`;
        });

        // Adicionar o total do pedido
        message += `\n*Total a Pagar:* R$ ${cartTotal.toFixed(2)}\n\n*Precisa de Talher? : ${talher}*\n\n`;

        // Adicionar endereço e método de pagamento
        message += `*Endereço de Entrega:*\n${address}, Nº ${numero}, Bairro: ${bairro}, CEP: ${cep}\n\n`;
        message += `*Método de Pagamento:* ${paymentMethod}\n\n\n ***O valor da Taxa de Entrega será calculado após o envio do Pedido***\n`;

        if (paymentMethod === "Dinheiro") {
            if (trocoValor && parseFloat(trocoValor) > 0) {
                message += `\n*Troco para: R$* ${parseFloat(trocoValor).toFixed(2)}`;
            } else {
                message += `\n*Troco não especificado*`;
            }
        }

        return message;
    };

    // Função para enviar os dados para o WhatsApp
    const sendToWhatsApp = (message) => {
        if (!message) return;

        const encodedMessage = encodeURIComponent(message);
        const phone = "+5521986473364";  // Substitua pelo número desejado
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
    };

    // Função para finalizar o pedido
    const handleCheckout = () => {
        const message = getCustomerData();
        if (message) {
            sendToWhatsApp(message);
            toggleModal(); // Fecha o modal após enviar o pedido
        }
    };

    if (!isModalOpen) return null; // Não renderiza o modal se não estiver aberto

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-96 max-h-[80vh] overflow-auto">
                <h3 className="text-2xl font-bold">Carrinho</h3>
                <ul className="mt-4">
                    {cart.map((item, index) => (
                        <li key={index} className="flex justify-between mt-2">
                            <span>{item.name} x{item.quantity}</span>
                            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 flex justify-between font-bold">
                    <p className="font-bold text-black">Total:</p>
                    <p className="font-bold text-black">R$ {cartTotal.toFixed(2)}</p>
                </div>

                {/* Formulário de informações de entrega */}
                <div className="mt-4">
                    <label className="font-bold text-black mt-4">Nome</label>
                    <input
                        type="text"
                        placeholder="Digite seu Nome"
                        className="w-full border-2 p-1 rounded my-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="font-bold text-black mt-4">CEP</label>
                    <input
                        type="text"
                        placeholder="Digite seu CEP"
                        className="w-full border-2 p-1 rounded my-1"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        onBlur={buscarEndereco} // Aciona a busca quando o campo perde o foco
                    />
                    {erroCep && <span className="text-red-500">CEP inválido!</span>}

                    <label className="font-bold text-black mt-4">Endereço Completo</label>
                    <input
                        type="text"
                        placeholder="Digite seu Endereço Completo"
                        className="w-full border-2 p-1 rounded my-1"
                        value={address}
                        onChange={handleAddressChange}
                    />

                    <label className="font-bold text-black mt-4">Número/Lote</label>
                    <input
                        type="text"
                        placeholder="Número"
                        className="w-full border-2 p-1 rounded my-1"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />

                    <label className="font-bold text-black mt-4">Bairro</label>
                    <input
                        type="text"
                        placeholder="Bairro"
                        className="w-full border-2 p-1 rounded my-1"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                    />

                        <label className="font-bold text-black mt-4">Precisa de Talher?</label>
                        <input
                        type="text"
                        placeholder="Talher?"
                        className="w-full border-2 p-1 rounded my-1"
                        value={talher}
                        onChange={(e) => setTalher(e.target.value)}
                    />

                    <label className="font-bold text-black mt-4">Forma de Pagamento</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full border-2 p-1 rounded my-1"
                    >
                        <option value="">Selecione</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Pix">PIX</option>
                        <option value="Cartão">Cartão</option>
                    </select>

                    {paymentMethod === "Dinheiro" && (
                        <div id="change-container">
                            <label className="font-bold text-black mt-4">
                                Vai precisar de troco? Digite o Valor que vai pagar em dinheiro
                            </label>
                            <input
                                type="number"
                                value={trocoValor}
                                onChange={(e) => setTrocoValor(e.target.value)}
                                className="w-full border-2 p-1 rounded my-1"
                            />
                        </div>
                        
                    )}
                    <p class="font-bold text-black mt-4"> ***O valor da Taxa de Entrega será calculado após o envio do Pedido***</p>

                    {/* Validação de formulário */}
                    {!isFormValid && (
                        <p className="text-red-500 mt-2">
                            Por favor, preencha todos os campos obrigatórios.
                        </p>
                    )}
                </div>

                {/* Botões de ação */}
                <div className="flex items-center justify-between mt-5 w-full">
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded-md"
                        onClick={toggleModal}
                    >
                        Fechar
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-1 rounded"
                        onClick={handleCheckout}
                    >
                        Finalizar Pedido
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
