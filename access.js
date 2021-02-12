// Code to access the contract getOwner function. 

(async () => {
    try {
    // Temp address to initiate the call from 
    const account1 = '0x4108424e30dfCe6E9cA41e707C2c64FA5704A01A'

    //Contact address obtained from previous deploy.js script
    const contractAddress = '0xC179e76B61efb39a80Bd01A178EdCf122bD62612'
    
    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', 'browser/contracts/artifacts/Owner.json'))
    let contract = new web3.eth.Contract(metadata.abi, contractAddress)
    
    // await console.log(contract.methods);
    
    const result = await contract.methods.getOwner().call({from: account1})
    console.log('Address is : ', result)
    } catch(e) {
        console.log(e)
    }

})()

