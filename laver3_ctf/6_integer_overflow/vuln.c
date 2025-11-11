#include <stdio.h> #include <stdlib.h>

int main() {

unsigned int size;

scanf("%u", &size);

char *buf = malloc(size);

return 0;

} read(0, buf, size);