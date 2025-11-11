#include <stdio.h> #include <string.h>

void vuln() {

char buffer[64];

char flag [8] = "SECRET";

for (int i = 0; i ≤ 64; i++) {

buffer[i] = getchar(); // off-by-one }

printf("Flag: %s\n", flag);

00

}

}

int main() {

vuln();

return 0;