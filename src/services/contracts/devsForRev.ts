import { BigNumberish } from "@ethersproject/bignumber";
import { ContractTransaction } from "@ethersproject/contracts";
import { DevsForRevolution__factory } from "~/types/chain";
import { formatUnits } from "@ethersproject/units";
import { initWeb3Provider } from "~/services/contracts";

const contractAddress = "0x25ed58c027921E14D86380eA2646E3a1B5C55A8b";

const claim = async (id: BigNumberish): Promise<ContractTransaction> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider.getSigner()
    );
    return await devForRev.claim(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Cannot claim the NFT!");
    }
  }
};

const getTokenURI = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.tokenURI(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Invalid Token ID");
    }
  }
};
const totalSupply = async (): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    await devForRev.totalSupply();
    return formatUnits(await devForRev.totalSupply(), 0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the total supply");
    }
  }
};

const getClothing = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.getClothing(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the clothing");
    }
  }
};

const getIndustry = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.getIndustry(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the industry");
    }
  }
};

const getLanguage = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.getLanguage(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the language");
    }
  }
};

const getLocation = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.getLocation(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the location");
    }
  }
};

const getMind = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.getMind(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the mindset");
    }
  }
};

const getOS = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.getOS(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the OS");
    }
  }
};

const getTextEditor = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.getTextEditor(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the text editor");
    }
  }
};

const getVibe = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.getVibe(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error getting the vibe");
    }
  }
};

const getOwnerOf = async (id: BigNumberish): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return await devForRev.ownerOf(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(`Error getting the owner of the token ${id}`);
    }
  }
};

const getBalanceOf = async (walletAddress: string): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );

    return formatUnits(await devForRev.balanceOf(walletAddress), 0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(
        `Error getting the balance of the address ${walletAddress}`
      );
    }
  }
};
const getTokenOfOwnerByIndex = async (
  walletAddress: string,
  index: BigNumberish
): Promise<string> => {
  try {
    const provider = await initWeb3Provider();
    const devForRev = DevsForRevolution__factory.connect(
      contractAddress,
      provider
    );
    return formatUnits(
      await devForRev.tokenOfOwnerByIndex(walletAddress, index),
      0
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(
        `Error getting the token id of the token with index ${index} from the address ${walletAddress}`
      );
    }
  }
};

export {
  getTokenURI,
  claim,
  totalSupply,
  getClothing,
  getIndustry,
  getLanguage,
  getLocation,
  getMind,
  getOS,
  getTextEditor,
  getVibe,
  getOwnerOf,
  getBalanceOf,
  getTokenOfOwnerByIndex,
};
