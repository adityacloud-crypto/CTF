#include <stdio.h>

int main() {
    char input[100];
    fgets(input, sizeof(input), stdin);
    printf(input); // format string vulnerability
    return 0;
}