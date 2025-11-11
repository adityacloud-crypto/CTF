import socket

s = socket.socket()

s.bind(("0.0.0.0", 9999))

s.listen(1)

conn, = s.accept()

data = conn.recv(1024)

if b"secret" in data:

conn.send(b"Access granted")

else:

conn.send(b"Access denied")