#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void vuln() {
    char buffer[64];
    gets(buffer);
}

int main() {
    setvbuf(stdout, NULL, _IONBF, 0);
    vuln();
    return 0;
}