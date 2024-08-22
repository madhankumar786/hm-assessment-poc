// Helper function to convert a Uint8Array to a hex string
const arrayBufferToHex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  };
  
  // Function to hash email and generate a token
  const generateAccessToken = async (email) => {
    // Encode email to Uint8Array
    const encoder = new TextEncoder();
    const emailBytes = encoder.encode(email);
    
    // Generate a hash of the email
    const emailHashBuffer = await crypto.subtle.digest('SHA-256', emailBytes);
    const emailHashHex = arrayBufferToHex(emailHashBuffer);
    
    // Use only the first 4 bytes of the hash for the token (16 hex characters)
    const emailHashPart = emailHashHex.slice(0, 16); // 64-bit part
  
    // Generate random 8-byte (64-bit) buffer
    const randomBytes = new Uint8Array(8);
    crypto.getRandomValues(randomBytes);
    
    // Convert random bytes to hex string
    const randomPart = arrayBufferToHex(randomBytes);
    
    // Combine hash part and random part
    const token = emailHashPart + randomPart;
    
    return token;
  }
  
  export default generateAccessToken;