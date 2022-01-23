/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ethers } from 'ethers'
import { Button, Flex, Text, useColorMode, IconButton, Icon, Link, Image, Tooltip, Spinner, useToast } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaLinkedin, FaGithub, FaEthereum } from 'react-icons/fa'
import myEpicNft from '../utils/MyEpicNFT.json'
import LOGO from '../public/dragon2.png'

// > Nuestra direccion del contrato que desplegamos.
const CONTRACT_ADDRESS = '0x858a2c0D6Ae323efE9Fa06727EF57192Aff72f15'
// > Nuestro abi del contrato
const contractABI = myEpicNft.abi

export default function Home () {
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const [loader, setLoader] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0) // Almacenamos el total de NFTs que se podra mintear.
  const [currentSupply, setCurrentSupply] = useState(0) // Almacenamos total actual de NFTs minteados
  const [currentAccount, setCurrentAccount] = useState('') // Almacenamos la billetera pública de nuestro usuario.
  const [chainIdOk, setChainIdOk] = useState(false)

  console.log('totalSupply', totalSupply)
  console.log('currentSupply', currentSupply)

  const checkIfChainIsCorrect = async () => {
    try {
      const { ethereum } = window
      // > Comprobamos si estamos en la red correcta
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      const rinkebyChainId = '0x4'
      if (chainId !== rinkebyChainId) {
        setChainIdOk(false)
        toast({
          title: 'Red incorrecta.',
          description: '¡No está conectado a Rinkeby Test Network!.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      } else {
        setChainIdOk(true)
      }
    } catch (error) {
      console.log(new Error(error))
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      // > Nos aseguramos de tener acceso a window.ethereum
      if (!ethereum) {
        console.log('Make sure you have metamask!')
        return
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      // > Comprobamos si estamos autorizados a acceder a la billetera del usuario
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)
        // > Escucho eventos! caso en que un usuario llega a nuestro sitio y YA tenía su billetera conectada + autorizada.
        setupEventListener()
        // > check de la red
        checkIfChainIsCorrect()
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(new Error(error))
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
      // > Escucho evenots! caso en que un usuario ingresa a nuestro sitio y conecta su billetera por primera vez.
      setupEventListener()
      // > check de la red
      checkIfChainIsCorrect()
    } catch (error) {
      console.log(new Error(error))
    }
  }

  // > Funcion que permite escuchar los eventos del contrato.
  const setupEventListener = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer)

        // > Capturo el evento
        connectedContract.on('NewEpicNFTMinted', (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        })
        connectedContract.on('getTotalNFTsMintedSoFar', (maxSupply, currentSupply) => {
          setTotalSupply(maxSupply.toNumber())
          setCurrentSupply(currentSupply.toNumber())
        })
        console.log('Setup event listener!')
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        // > Un "provider" es lo que usamos para comunicarnos con los nodos de Ethereum.
        // En este caso usamos nodos que Metamask proporciona en segundo plano para enviar/recibir datos de nuestro contrato implementado.
        const provider = new ethers.providers.Web3Provider(ethereum)
        // > info: https://docs.ethers.io/v5/api/signer/#signers
        const signer = provider.getSigner()
        // > Crea la conexión con nuestro contrato
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer)

        console.log('Going to pop wallet now to pay gas...')
        const nftTxn = await connectedContract.makeAnEpicNFT()
        setLoader(true)
        console.log('Mining...please wait.')
        await nftTxn.wait()
        setLoader(false)
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <Flex
      align={'center'}
      justify={'space-around'}
      direction={'column'}
      w={'100%'}
      minH={'100vh'}
      py={100}
    >
      <Head>
        <title>buildsapce-epic-nfts</title>
        <meta name="description" content="buildspace-epic-nfts with Next.js" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"></link>
      </Head>

      <Flex
        width={'100%'}
        padding={5}
        flexDirection={'row'}
        justifyContent={'flex-end'}
        align={'center'}
      >
        {chainIdOk
          ? <Text color={'green.600'}>Conectado</Text>
          : <Text color={'red.600'}>Red incorrecta</Text>
        }
      </Flex>

      <Flex
        align={'center'}
        justify={'center'}
        direction={'column'}
        w={'50%'}
      >
        <Text
          id='top'
          as='h1'
          fontSize={'3xl'}
          fontWeight={900}
          letterSpacing={'1px'}
        >
          {"Hi 👋, I'm Braian and"}
        </Text>
        <Text
          as='h3'
          my={10}
          fontSize={'5xl'}
          fontWeight={600}
          letterSpacing={'.5px'}
        >
          Welcome to Epic NFTs 🐲
        </Text>

        <Button
          mt={5}
          p={4}
          w={'30%'}
          fontWeight={'bold'}
          letterSpacing={1}
          borderRadius={'md'}
          bgGradient={'linear(to-r, green.300, green.500)'}
          color={'white'}
          boxShadow={'2xl'}
          _hover={{
            opacity: currentAccount ? '.9' : '.2',
            cursor: currentAccount ? 'pointer' : 'not-allowed'
          }}
          disabled={!currentAccount || loader || !chainIdOk}
          onClick={askContractToMintNft}
        >
          Mint a NFT
        </Button>

        {/* Conectar billetera */}
        {!currentAccount && (
          <Button
            mt={10}
            w={'30%'}
            letterSpacing={1}
            borderRadius={'md'}
            bg={'gray.600'}
            color={'white'}
            boxShadow={'2xl'}
            _hover={{
              opacity: '.9',
              cursor: 'pointer'
            }}
            onClick={connectWallet}
            disabled={currentAccount}
          >
            {'Connect your Wallet'}
          </Button>
        )}
      </Flex>

      {loader &&
          (
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            w={'100%'}
          >
            <Spinner
              thickness='6px'
              speed='0.45s'
              emptyColor='green.100'
              color='green.500'
              size='xl'
            />
            <Text
              mt={2.5}
            >{'Mining'}</Text>
          </Flex>
          )
      }

      {/* Footer con links */}
      <Flex
        direction={'row'}
        justify={'center'}
        align={'center'}
        w={'50%'}
        mt={100}
      >
        <Tooltip hasArrow label={'linkedin'} bg={'gray.900'} color={'white'}>
          <IconButton
            mx={5}
            _hover={{
              cursor: 'pointer',
              color: 'green.100'
            }}
            as={Link}
            href={'https://www.linkedin.com/in/braianvaylet/'}
            icon={<Icon as={FaLinkedin} w={7} h={7} />}
          />
        </Tooltip>
        <Tooltip hasArrow label={'github'} bg={'gray.900'} color={'white'}>
          <IconButton
            mx={5}
            _hover={{
              cursor: 'pointer',
              color: 'green.100'
            }}
            as={Link}
            href={'https://github.com/BraianVaylet'}
            icon={<Icon as={FaGithub} w={7} h={7} />}
          />
        </Tooltip>
        <Tooltip hasArrow label={'Volver al inicio'} bg={'gray.900'} color={'white'}>
          <IconButton
            mx={5}
            _hover={{
              cursor: 'pointer',
              color: 'green.100'
            }}
            as={Link}
            href={'#top'}
            icon={<Image src={LOGO.src} alt='logo wave-portal' w={7} h={7} />}
          />
        </Tooltip>
        <Tooltip hasArrow label={'Cambiar theme'} bg={'gray.900'} color={'white'}>
          <IconButton
            mx={5}
            _hover={{
              cursor: 'pointer',
              color: 'green.100'
            }}
            onClick={toggleColorMode}
            icon={
              colorMode === 'light'
                ? <MoonIcon w={5} h={5} />
                : <SunIcon w={5} h={5} />
            }
          />
        </Tooltip>
        <Tooltip hasArrow label={'Contrato'} bg={'gray.900'} color={'white'}>
          <IconButton
            mx={5}
            _hover={{
              cursor: 'pointer',
              color: 'green.100'
            }}
            as={Link}
            href={`https://rinkeby.etherscan.io/address/${CONTRACT_ADDRESS}`}
            icon={<Icon as={FaEthereum} w={7} h={7} />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}
