¡Hola developer 👋🏻! Este repositorio contiene el ejemplo que te mostré durante el vídeo sobre "Cómo crear una GitHub Copilot Extensions usando skillsets" de mi canal de YouTube.

## Cómo ejecutar el ejemplo

Este código está desarrollado en Node.js por lo que necesitas o bien tenerlo instalado en tu máquina local o bien puedes usar Dev Containers, o GitHub Codespaces. Si quieres saber más de estas dos tecnologías puedes ver los siguientes vídeos de mi canal de YouTube:

[![10. Entornos de desarrollo dentro de un contenedor con Dev Containers](images/Capitulo%2010.png)](https://youtu.be/DkKs29etRis)
[![10-11. GitHub Codespaces 🚀 para tus entornos de desarrollo remotos GRATIS](images/10-11.%20GitHub%20Codespaces%20para%20tus%20entornos%20de%20desarrollo%20remotos%20GRATIS.png)](https://youtu.be/cO-oFpePy3c)


Una vez que elijas el entorno donde quieres ejecutarlo, necesitas instalar las dependencias. Para ello, ejecuta el siguiente comando en la terminal:

```bash
npm install
```

y una vez instaladas las dependencias, puedes ejecutar el servidor con el siguiente comando:

```bash
 npm start
```

Por otro lado, necesitas utilizar algo para que GitHub Copilot Extension pueda acceder a tu servidor local. Para ello, puedes utilizar [ngrok](https://ngrok.com/) con una cuenta gratuita. La configuración de Dev Containers ya tiene todo preparado para que puedas utilizarlo sin tener que instalar nada más 😇. Para arrancar ngrok necesitas ejecutar este comando:

```bash
ngrok http 3000
```

> [!NOTE]  
> La primera vez te dirá que te registres o que configures tu token de autenticaciión. En el terminal te dará todos los pasos a seguir. Una vez que lo tengas configurado, ejecuta de nuevo el comando y te dará una URL pública que podrás utilizar para configurar tu GitHub Copilot Extension.

## Crear una extensión de GitHub Copilot

Hace ya tiempo te mostré cómo crear una extensión de GitHub Copilot en este otro vídeo:

[![Cómo crear una extensión para GitHub Copilot Chat](images/Cómo%20crear%20GitHub%20Copilot%20Extensions.png)](https://youtu.be/8JRGNIuEKAQ)

En ese momento solo había una forma de hacerlo que era crear el agente en su totalidad. Sin embargo, ahora podemos utilizar los skillsets para extender las capacidades de GitHub Copilot Extension de una forma más sencilla.


## ¿Qué hace este ejemplo?

En este repositorio puedes encontrar dos ejemplos de endpoints para una GitHub Copilot Extension usando skillsets. En lugar de crear todo el agente, le damos al agente que ya existe de Github Copilot Extension la capacidad de poder llamar a nuestros endpoints. En este caso tenemos tres endpoints:

- `/dragonball`: Este endpoint devuelve información sobre los personajes de Dragon Ball.
- `/starwars`: Este endpoint devuelve información sobre los personajes de Star Wars.
- `/ado`: Este endpoint se conecta a Azure DevOps y es capaz de devolver los work items de un proyecto que se le pida.

Con ellos puedo generar datos de ejemplo para mis aplicaciones. Estos son algunos de los ejemplos

que puedes generar con ellos:

Puedes pedirle cosas como: 

- `@returngis-skillset generame un array con 10 personajes de Dragon Ball`

- `@returngis-skillset ahora mezclamelo con 10 personajes de Star Wars`

- `@returngis-skillset damelo en formato JSON con el nombre, el genero y la procedencia`

Esto está muy bien para comprender cómo funciona el skillset y cómo podemos utilizarlo para generar datos de ejemplo para nuestras aplicaciones. 

Si queremos llevarlo a un ejemplo más real, podemos utilizar el endpoint de Azure DevOps para recuperar los work items de un proyecto:

- `@returngis-skillset dame los work items del proyecto Tour-Of-Heroes de Azure DevOps`
- `@returngis-skillset ahora dame los work items de tipo To Do`
- `@returngis-skillset cuáles están asignados a mi`
- `@returngis-skillset cuáles están asociados a Jon`