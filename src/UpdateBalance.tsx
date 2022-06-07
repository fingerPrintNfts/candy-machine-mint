import React from 'react'

export const UpdateBalance = async ( wallet: any, connection: any  ) => {
    if( wallet.publicKey ) {
        const balance = await connection.getBalance( wallet.publicKey );
        return balance / 1000000000;
      }
}
