
import base64
import codecs

def vigenere_encrypt(plaintext, key):
    encrypted_text = ""
    key_index = 0
    for char in plaintext:
        if 'a' <= char <= 'z':
            shift = ord(key[key_index % len(key)]) - ord('a')
            encrypted_char = chr(((ord(char) - ord('a') + shift) % 26) + ord('a'))
            encrypted_text += encrypted_char
            key_index += 1
        elif 'A' <= char <= 'Z':
            shift = ord(key[key_index % len(key)].lower()) - ord('a')
            encrypted_char = chr(((ord(char) - ord('A') + shift) % 26) + ord('A'))
            encrypted_text += encrypted_char
            key_index += 1
        else:
            encrypted_text += char
    return encrypted_text

def rot13(text):
    return codecs.encode(text, 'rot13')

plaintext = "flag{onion_crypto_layer2}"
key = "hackathon"

# 1. Vigenère encrypt
vigenere_encrypted = vigenere_encrypt(plaintext, key)

# 2. ROT13
rot13_encrypted = rot13(vigenere_encrypted)

# 3. Base64 encode
base64_encrypted = base64.b64encode(rot13_encrypted.encode())

with open("D:\\Adi's Ai System\\Hackathon Code\\HWI CTF\\ctf-layer2_public\\onion_token.txt", "wb") as f:
    f.write(base64_encrypted)

print(f"Created onion_token.txt with content: {base64_encrypted.decode()}")
