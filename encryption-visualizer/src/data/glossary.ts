export interface GlossaryTerm {
    term: string;
    definition: string;
    category: 'Symmetric' | 'Asymmetric' | 'Hashing' | 'General' | 'Security';
    relatedTerms?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
    {
        term: "Advanced Encryption Standard (AES)",
        definition: "A symmetric block cipher established by NIST in 2001. It is used worldwide to encrypt sensitive data.",
        category: "Symmetric",
        relatedTerms: ["Block Cipher", "Rijndael", "Symmetric Encryption"],
    },
    {
        term: "Asymmetric Encryption",
        definition: "A type of encryption that uses a pair of keys: a public key for encryption and a private key for decryption. Also known as Public-Key Cryptography.",
        category: "Asymmetric",
        relatedTerms: ["RSA", "Public Key", "Private Key"],
    },
    {
        term: "Avalanche Effect",
        definition: "A desirable property in cryptography where a small change in the input (e.g., flipping a single bit) results in a significant change (e.g., 50% of the bits) in the output.",
        category: "General",
        relatedTerms: ["Confusion", "Diffusion", "Hashing"],
    },
    {
        term: "Block Cipher",
        definition: "A deterministic algorithm operating on fixed-length groups of bits, called blocks. AES is a block cipher.",
        category: "Symmetric",
        relatedTerms: ["AES", "Stream Cipher", "Mode of Operation"],
    },
    {
        term: "Ciphertext",
        definition: "The result of encryption performed on plaintext using an internal algorithm, called a cipher.",
        category: "General",
        relatedTerms: ["Plaintext", "Encryption"],
    },
    {
        term: "Collision",
        definition: "In hashing, a collision occurs when two different inputs produce the same hash output.",
        category: "Hashing",
        relatedTerms: ["Hash Function", "SHA-256"],
    },
    {
        term: "Diffusion",
        definition: "A property of a secure cipher where the statistical structure of the plaintext is dissipated into long-range statistics of the ciphertext.",
        category: "General",
        relatedTerms: ["Avalanche Effect", "Confusion"],
    },
    {
        term: "Galois Field (GF)",
        definition: "A field that contains a finite number of elements. AES uses GF(2^8) for its MixColumns operation.",
        category: "Symmetric",
        relatedTerms: ["AES", "MixColumns"],
    },
    {
        term: "Hash Function",
        definition: "A function that can be used to map data of arbitrary size to fixed-size values. The values are usually used to index a fixed-size table called a hash table or hash map.",
        category: "Hashing",
        relatedTerms: ["SHA-256", "Collision"],
    },
    {
        term: "Initialization Vector (IV)",
        definition: "A fixed-size input to a cryptographic primitive that is typically required to be random or pseudorandom.",
        category: "Symmetric",
        relatedTerms: ["Mode of Operation", "CBC"],
    },
    {
        term: "Key Schedule",
        definition: "An algorithm that calculates all the round keys from the key. AES uses a key schedule to expand a short key into a number of separate round keys.",
        category: "Symmetric",
        relatedTerms: ["AES", "Round Key"],
    },
    {
        term: "Plaintext",
        definition: "Information that is readable by humans or machines before it is encrypted.",
        category: "General",
        relatedTerms: ["Ciphertext", "Decryption"],
    },
    {
        term: "Public Key Infrastructure (PKI)",
        definition: "A set of roles, policies, hardware, software and procedures needed to create, manage, distribute, use, store and revoke digital certificates and manage public-key encryption.",
        category: "Asymmetric",
        relatedTerms: ["RSA", "Digital Certificate"],
    },
    {
        term: "RSA",
        definition: "A public-key cryptosystem that is widely used for secure data transmission. It is also one of the oldest.",
        category: "Asymmetric",
        relatedTerms: ["Asymmetric Encryption", "Prime Number"],
    },
    {
        term: "SHA-256",
        definition: "Secure Hash Algorithm 256-bit. A cryptographic hash function that outputs a 256-bit digest.",
        category: "Hashing",
        relatedTerms: ["Hash Function", "Avalanche Effect"],
    },
    {
        term: "Symmetric Encryption",
        definition: "An encryption method where the same key is used to encrypt and decrypt the message.",
        category: "Symmetric",
        relatedTerms: ["AES", "Asymmetric Encryption"],
    },
    {
        term: "Zero-Knowledge Proof",
        definition: "A method by which one party (the prover) can prove to another party (the verifier) that they know a value x, without conveying any information apart from the fact that they know the value x.",
        category: "Security",
        relatedTerms: ["Cryptography"],
    },
];
