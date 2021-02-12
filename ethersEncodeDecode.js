(
    () => {
        
        var string = "Shrey Is Awesome"
    var encodedString = ethers.utils.formatBytes32String(string);
    
    console.log("Encoded String is : ", encodedString);
    
    var decodedString = ethers.utils.parseBytes32String(encodedString); 
    
    console.log("Decoded String is : ", decodedString);
    }
    ) ()