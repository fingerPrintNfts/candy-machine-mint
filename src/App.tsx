import './App.css';
import { useMemo } from 'react';
import * as anchor from '@project-serum/anchor';
import Home from './Home';
import { DEFAULT_TIMEOUT } from './connection';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
  getBitKeepWallet,
  getBloctoWallet,
  getCoin98Wallet,
  getBitpieWallet,
  getCloverWallet,
  getCoinhubWallet,
  getLedgerWallet,
  getMathWallet,
  getSafePalWallet,
  getSolflareWebWallet,
  getSolongWallet,
} from '@solana/wallet-adapter-wallets';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';

import { ThemeProvider, createTheme } from '@material-ui/core';

import './styleWallet.css';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!,
    );

    return candyMachineId;
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet'),
);

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
      getBitKeepWallet(),
      getBloctoWallet(),
      getCoin98Wallet(),
      getBitpieWallet(),
      getCloverWallet(),
      getCoinhubWallet(),
      getLedgerWallet(),
      getMathWallet(),
      getSafePalWallet(),
      getSolflareWebWallet(),
      getSolongWallet(),
    ],
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider className='finger-background'>
            <Home
              candyMachineId={candyMachineId}
              connection={connection}
              txTimeout={DEFAULT_TIMEOUT}
              rpcHost={rpcHost}
              network={network}
            />
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
