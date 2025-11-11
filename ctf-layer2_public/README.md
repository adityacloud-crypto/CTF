# ctf-layer2-public
“Public files for Layer 2 CTF (Reverse Engineering + Crypto)”

# solve_onion.py  (player-run)
import base64, codecs
def vigenere_decrypt(ct, key):
    res=[]; ki=0
    for c in ct:
        if c.isalpha():
            base = 'A' if c.isupper() else 'a'
            shift = ord(key[ki%len(key)].lower()) - 97
            res.append(chr((ord(c)-ord(base)-shift)%26 + ord(base)))
            ki+=1
        else:
            res.append(c)
    return ''.join(res)

ct = open('onion_token.txt','r').read().strip()
# step1: base64 decode
s1 = base64.b64decode(ct).decode()
# step2: ROT13
s2 = codecs.decode(s1, 'rot_13')
# step3: vigenere decrypt
plain = vigenere_decrypt(s2, 'hackathon')
print("Plain:", plain)

python3 solve_onion.py
# prints: Plain: flag{onion_crypto_layer2}

OnionKeys hint: Start with a Base64 decode. If output looks like ROT13, apply ROT13. Then Vigenère decrypt (key = hackathon).


ctf-layer2_public/
  - deepcrack              # compiled stripped binary (uploaded)
  - onion_token.txt        # ciphertext (string above)
  - README_PLAYERS.md      # contains instructions + form link

