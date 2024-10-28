import type { Portafolio } from "../../app"


export const portafolio:Portafolio[] = [
    {
        id: 1,
        title:"Valuacion de cryptomonedas con el metodo value at risk",
        description:`
            Una pagina web que se entrego como portafolio final de la clase Topicos financieros.
            La pagina consiste de una integracion de las API de coingecko y de ChatGPT
            en el cual se ejecutan y muestran los calculos necesarios para crear el 
            valor at risk de las criptomonedas y finalmente se piden parametros para el modelo
            finalmente creando un prompt estructurado para chatGPT donde te da una evaluacion automatica
            del rendimiento de tu modelo.
        `,
        image:"/Images/Portafolio/Crypto_portafolio.png",
        alt:"Crypto portafolio with coingecko and chatgpt implementation",
        url:"https://portafolio-jgbg.vercel.app/"
    },
    {
        id: 2,
        title:"Aplicacion estilo catalogo para renta de maquinaria",
        description:`
            Una pagina diseñada para dar a conocer la oferta de maquinaria en renta para la empresa
            arrendadora y construcciónes del tropico. En el cual se muestra un catalogo digital de los equipo.
            El cual puede ser extendido a una pagina donde se muestra que incluye cada servicio y un calendario. 
            Donde el calendario puede ser controlado desde Google Calendar para mostrar la disponibilidad de los equipos.
        `,
        image:"/Images/Portafolio/aplicacion de renta de maquinaria.png",
        alt:"imagen de una aplicacion de renta de maquinaria",
        url:"https://rentasact.vercel.app/"
    },
    {
        id: 3,
        title:"Implementación del algoritmo K means en python",
        url:"https://colab.research.google.com/drive/1UGZxH1aDZhkCI982DEtXusrsZ8pteoi7?usp=sharing",
        video:"https://www.youtube.com/embed/tV2b1GoX4JM?si=It0sdqvBKAe4Ndg3"
    },
    {
        id: 4,
        title:"Implementación del algoritmo genetico en python",
        url:"https://colab.research.google.com/drive/183AcK8bO52vtoFEjc4EaorhuUgDNTe9n?usp=sharing",
        video:"https://www.youtube.com/embed/XGs4nUhalJI?si=A2HNtEcNuocCj4uW"
    },
    {
        id: 5,
        title:"Implementación del algoritmo regresion lineal simple en python",
        url:"https://colab.research.google.com/drive/1-vxXqRp2dfBvb4W0wsNFxCSWbzLn8U_v?usp=sharing",
        video:"https://www.youtube.com/embed/sAJUJiGBCmk?si=VJUFBQIJwOUhtaca"
    },
    {
        id: 6,
        title:"Implementación del algoritmo de regresion lineal multiple en python",
        url:"https://colab.research.google.com/drive/1bXyJiQ8-nPaDSrCM-X9nN3Ak8jIieybT?usp=sharing",
        video:"https://www.youtube.com/embed/LWZFXHccF3A?si=9xEVrDze1LNKYnhO"
    },
    {
        id:7,
        title:"Implementación del algoritmo de regresion lineal regularizado L2 en python",
        url:"https://colab.research.google.com/drive/1_OJcWg9owaH2g61IZCNcZQvru8n7Ay1j?usp=sharing",
        video:"https://www.youtube.com/embed/dfYRSgigjNU?si=3LSlroQembuNZ1yE"
    },
    {
        id:8,
        title:"Implementación del algoritmo de regresion lineal logistico regularizado en python",
        url:"https://colab.research.google.com/drive/1zejU8a4trl-cR-F_0QA3u9uQGNT1oo1y?usp=sharing",
        video:"https://www.youtube.com/embed/J4AvkGgFCB4?si=LyJGlUOx5BfZZrLz"

    }
]