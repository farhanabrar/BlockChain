//imports
const { ethers, run, network } = require("hardhat")
//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
  )
  console.log("Deploying contract ......")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`deployed to: ${simpleStorage.address}`)
  console.log(network.config)
  if (process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.storage, [])
  }
  
  const currentValue = await simpleStorage.retrieve()
  console.log(`current value is: ${currentValue}`)

  //update current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`update value is ${updatedValue}`)
}

async function verify(contractAddress, args) {
  console.log("Verifying contract....")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (e) {
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Already Verified !")
    } else{
      console.log(e)
    }
  }
  
}
//main
main().then(() => process.exit(0)).catch((error)=> {
  console.error(error);
  process.exit(1);
});
