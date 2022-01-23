/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Button, Flex, Text, useColorMode, IconButton, Icon, Link, Image, Tooltip } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaLinkedin, FaGithub, FaEthereum } from 'react-icons/fa'
import LOGO from '../public/dragon2.png'

export default function Home () {
  const { colorMode, toggleColorMode } = useColorMode()
  const [currentAccount, setCurrentAccount] = useState('') // Almacenamos la billetera pública de nuestro usuario.

  // Nuestra direccion del contrato que desplegamos.
  const contractAddress = '0xef10AE1B845aEC9251c19cc5af7d4dda7424F52D'
  // Nuestro abi del contrato
  // const contractABI = WavePortal.abi

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      // Nos aseguramos de tener acceso a window.ethereum
      if (!ethereum) {
        console.log('Make sure you have metamask!')
        return
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      // Comprobamos si estamos autorizados a acceder a la billetera del usuario
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)
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
    } catch (error) {
      console.log(new Error(error))
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
            href={`https://rinkeby.etherscan.io/address/${contractAddress}`}
            icon={<Icon as={FaEthereum} w={7} h={7} />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}
