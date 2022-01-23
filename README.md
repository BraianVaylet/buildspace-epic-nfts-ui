# 🦄 Wave Portal [UI]

Proyecto web basado en la web3 desarrollado con **[Next.js](https://nextjs.org/)** y **[ChakraUI](https://chakra-ui.com/)**. En esta aplicación los usuarios podrán dejar un mensaje que será almacenado dentro de la blockchain, para esto es necesario primero autenticarse usando la wallet **[Metamask](https://metamask.io/)** y configurandola para usar la red de prueba de **[Rinkeby](https://www.rinkeby.io/#stats)**.

Los usuarios podrán dejar por medio de un modal un mensaje que se almacenará en la cadena de bloques, para esto es necesario pagar la transacción usando ETH. Dado a que nos encontramos en la red de Rinkeby no estaremos usando ETH real, sino unos de prueba. Para cargarle saldo a tu wallet y asi tener ETH para usar en la red de Rinkeby pueden usar el siguiente **[enlace](https://faucets.chain.link/rinkeby)**

Cuando un usuario deja un mensaje tiene un ***50% de probabilidad de ganar una recompensa en ETH*** que será automáticamente depositada en su wallet. La plataforma le avisará si ha ganado la recompensa.

Este fue un proyecto con fin 100% académico mientras realizaba los cursos de la plataforma **[buildspace](https://buildspace.so/)**, la cual recomiendo a todo desarrollador que quiera comenzar a desarrollar para la web3.

Pueden probar la aplicación ingresando al siguiente link: **[Wave Portal 🦄](https://buildspace-wave-portal-ui.vercel.app/)**

La aplicación está conectándose a un smart-contract desarrollado con la tecnología **[Solidity](https://solidity-es.readthedocs.io/es/latest/#)**, pueden revisar su repo [aquí](https://github.com/BraianVaylet/buildspace-wave-portal) y el contrato desplegado en la **rinkeby.etherscan** [aquí](https://rinkeby.etherscan.io/address/0xef10AE1B845aEC9251c19cc5af7d4dda7424F52D)

## Algunas capturas del proyecto:

![screenshot#1](https://raw.githubusercontent.com/BraianVaylet/buildspace-wave-portal-ui/main/screenshot/1.png)

![screenshot#2](https://raw.githubusercontent.com/BraianVaylet/buildspace-wave-portal-ui/main/screenshot/2.png)

![screenshot#3](https://raw.githubusercontent.com/BraianVaylet/buildspace-wave-portal-ui/main/screenshot/3.png)

---

### This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
