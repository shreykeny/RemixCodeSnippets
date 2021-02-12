// Code to deploy the contract 

(async () => {
  try {
    console.log('deploy...')

    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', 'browser/contracts/artifacts/Owner.json'))
    const accounts = await web3.eth.getAccounts()

    let contract = new web3.eth.Contract(metadata.abi)

    contract = contract.deploy({
      data: metadata.data.bytecode.object,
      arguments: []
    })

    newContractInstance = await contract.send({
      from: accounts[0],
      gas: 1500000,
      gasPrice: '30000000000'
    })
    console.log(newContractInstance.options.address)
    
    console.log(contract.methods);
    
    
//   contract.methods.isOwner().call({from: newContractInstance.options.address}, function(error, result){
//     console.log(result);
// });
  } catch (e) {
    console.log(e.message)
  }
})()