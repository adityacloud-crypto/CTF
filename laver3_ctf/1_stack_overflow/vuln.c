#include <stdio.h>
#include <string.h>

void vuln() {
    char buffer[64];
    gets(buffer); // unsafe
}

int main() {
    vuln();
    return 0;
}