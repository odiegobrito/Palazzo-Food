import logo from '../assets/logo.png'
import capa from '../assets/capa.png'


function Header() {
    return(

        <div>
            
            <header className=" w-full h-[420px] relative" >
            <img src={capa} alt="Imagem de fundo" className="w-full h-[420px] object-cover absolute inset-0 z-0" />

        <div className="w-full h-full flex flex-col justify-center items-center relative z-10 ">
            <img src={logo} alt="Logo" className="w-40 h-40 rounded-full shadow-lg hover:scale-110 duration-200"/>
             <h1 className="text-3xl mt-4 mb-2 font-bold text-white hidden">Palazzo</h1>

            <span className="text-white font-medium">Vilar dos Teles, São João de Meriti - RJ</span>

            <div className="bg-green-600 px-4 py-1 rounded-lg mt-5" id="date-span">
                <span className="text-white">Ter á Dom - 10:00 às 15:30 </span>
            </div>
        </div>
    </header>


        </div>


    )
}

export default Header;