const generic = {
    generateAccessToken:async (email)=> {
        const arrayBufferToHex = (buffer) => {
            return Array.from(new Uint8Array(buffer))
              .map(byte => byte.toString(16).padStart(2, '0'))
              .join('');
          }
        const encoder = new TextEncoder();
        const emailBytes = encoder.encode(email);
        
        const emailHashBuffer = await crypto.subtle.digest('SHA-256', emailBytes);
        const emailHashHex = arrayBufferToHex(emailHashBuffer);
        
        const emailHashPart = emailHashHex.slice(0, 16);
      
        const randomBytes = new Uint8Array(8);
        crypto.getRandomValues(randomBytes);
        const randomPart = arrayBufferToHex(randomBytes);
      
        const token = emailHashPart + randomPart;
        return token;
      }
  };
  
  export default generic;
  