// deepcrack.c  (admin/source - keep private)
#include <stdio.h>
#include <string.h>
#include <stdint.h>
#include <unistd.h>
#include <sys/ptrace.h>

static void anti_debug(){
    if(ptrace(PTRACE_TRACEME, 0, 1, 0) == -1) {
        // silently exit to confuse naive debuggers
        _exit(1);
    }
}

static uint8_t rol8(uint8_t v, int r){ return (uint8_t)((v<<r)|(v>>(8-r))); }
static uint8_t ror8(uint8_t v, int r){ return (uint8_t)((v>>r)|(v<<(8-r))); }

/* validation uses LFSR + per-byte rotate/xor/adder — reversible but not obvious */
int validate(const char *s){
    int n = strlen(s);
    if(n != 28) return 0;
    uint8_t state = 0xA5;
    uint8_t lfsr = 0xB6;
    for(int i=0;i<n;i++){
        uint8_t c = (uint8_t)s[i];
        uint8_t bit = ((lfsr >> 7) ^ (lfsr >> 1)) & 1;
        lfsr = (uint8_t)((lfsr << 1) | bit);
        uint8_t k = (uint8_t)((i * 0x3F) ^ lfsr);
        state ^= rol8((uint8_t)(c + k), (i % 7) + 1);
        state = (uint8_t)((state + (k ^ 0x5C)) & 0xFF);
        state = ror8(state, (i % 5) + 1);
    }
    uint32_t mix = (uint32_t)state * 0x9E3779B1u;
    return ((mix & 0xFF) == 0xD2);
}

int main(){
    anti_debug();
    char buf[256];
    printf("Enter password: ");
    fflush(stdout);
    if(!fgets(buf, sizeof(buf), stdin)) return 0;
    char *p = strchr(buf, '\n'); if(p) *p = 0;
    if(validate(buf)){
        printf("Correct! Flag: flag{deep_reverse_layer2}\n");
    } else {
        printf("Access Denied.\n");
    }
    return 0;
}
