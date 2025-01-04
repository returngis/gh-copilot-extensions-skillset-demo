¡Hola developer 👋🏻! Este repositorio contiene el ejemplo que te mostré durante el vídeo sobre "Cómo crear GitHub Copilot Extensions usando skillsets" de mi canal de YouTube.

## ¿Qué hace este ejemplo?

En este repositorio puedes encontrar dos ejemplos de endpoints para una GitHub Copilot Extension usando skillsets. En lugar de crear todo el agente, le damos al agente que ya existe de Github Copilot Extension la capacidad de poder llamar a nuestros endpoints. En este caso tenemos tres endpoints:

- `/dragonball`: Este endpoint devuelve información sobre los personajes de Dragon Ball.
- `/starwars`: Este endpoint devuelve información sobre los personajes de Star Wars.
- `/ado`: Este endpoint se conecta a Azure DevOps y es capaz de devolver los work items de un proyecto que se le pida.

Con ellos puedo generar datos de ejemplo para mis aplicaciones. Estos son algunos de los ejemplos


## Cómo ejecutar el ejemplo

Este código está desarrollado en Node.js por lo que necesitas o bien tenerlo instalado en tu máquina local o bien puedes usar Dev Containers, o GitHub Codespaces.

Para ejecutarlo, primero necesitas instalar las dependencias. Para ello, ejecuta el siguiente comando en la terminal:

```bash
npm install
```

y una vez instaladas las dependencias, puedes ejecutar el servidor con el siguiente comando:

```bash
 npm start
```

Por otro lado, necesitas utilizar algo para que GitHub Copilot Extension pueda acceder a tu servidor. Para ello, puedes utilizar [ngrok](https://ngrok.com/) con una cuenta gratuita. 

La configuración de Dev Containers ya tiene todo preparado para que puedas utilizarlo sin tener que configurar nada más. Si quieres utilizarlo en tu máquina local, puedes ejecutar el siguiente comando:

```bash
ngrok http 3000
```

