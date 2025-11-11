FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y gcc g++ make socat netcat && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the vulnerable C file
COPY vuln.c .

# Compile the C file
RUN gcc -fno-stack-protector -z execstack -no-pie -o vuln vuln.c

# Expose the port
EXPOSE 9001

# Run the vulnerable binary using socat
CMD ["socat", "TCP-LISTEN:9001,fork,reuseaddr", "EXEC:./vuln"]
