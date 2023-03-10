const main = async () => {
    try 
      {
        const nftContractFactory = await hre.ethers.getContractFactory(
          "Web3_3"
        );

        const nftContract = await nftContractFactory.deploy();
        await nftContract.deployed();
    
        console.log("Great haha Contract deployed to:", nftContract.address);
        process.exit(0);
      } 
      catch (error) {
        console.log(error);
        process.exit(1);
      }
  };
    
  main();