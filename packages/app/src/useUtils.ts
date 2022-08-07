
// turns a hex string into bytes with 8 Bit view
export const useHexStringToBytes = (str: string):Uint8Array => {
    if (!str) {
        return new Uint8Array();
      }
    
      const a = [];
      for (let i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16));
      }
    
      return new Uint8Array(a);
}

// returns a hex string for the bytes 
export const useBytesToHexString = (bytes: number[]):string => {
    for (var hex: string[] = [], i = 0; i < bytes.length; i++) {
      const current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
      hex.push((current >>> 4).toString(16));
      hex.push((current & 0xf).toString(16));
    }
    return hex.join("");
  }