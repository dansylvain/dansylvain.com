// Jeu de la vie : grille en mémoire linéaire, lue directement par JavaScript.
#include <cstdint>
#include <cstring>
#include <emscripten/emscripten.h>

namespace {

constexpr int kWidth = 64;
constexpr int kHeight = 48;

// Un octet par cellule (0 = morte, 1 = vivante), rangées les unes après les
// autres. Tableau statique : son adresse ne change jamais.
std::uint8_t cells[kWidth * kHeight];

// Génération en cours de calcul : cells doit rester intact pendant le comptage.
std::uint8_t next_cells[kWidth * kHeight];

// Ramène value dans [0, size[. En C++, -1 % size vaut -1 : on ajoute size.
// Valable pour value >= -size, ce qui couvre les voisines d'une cellule.
constexpr int wrap(int value, int size) { return (value + size) % size; }

// Nombre de voisines vivantes sur la grille torique.
int count_neighbors(int x, int y)
{
    int count = 0;
    for (int dy = -1; dy <= 1; ++dy) {
        for (int dx = -1; dx <= 1; ++dx) {
            if (dx == 0 && dy == 0)
                continue;
            count += cells[wrap(y + dy, kHeight) * kWidth + wrap(x + dx, kWidth)];
        }
    }
    return count;
}

} // namespace

extern "C" {

EMSCRIPTEN_KEEPALIVE
int life_width() { return kWidth; }

EMSCRIPTEN_KEEPALIVE
int life_height() { return kHeight; }

// Vu de JavaScript, ce pointeur est un simple indice dans HEAPU8.
EMSCRIPTEN_KEEPALIVE
std::uint8_t *life_cells() { return cells; }

// Place un planeur en haut à gauche d'une grille vide.
EMSCRIPTEN_KEEPALIVE
void life_init()
{
    for (std::uint8_t &cell : cells)
        cell = 0;

    constexpr int glider[][2] = {{1, 0}, {2, 1}, {0, 2}, {1, 2}, {2, 2}};
    for (const auto &[x, y] : glider)
        cells[y * kWidth + x] = 1;
}

// Calcule la génération suivante.
EMSCRIPTEN_KEEPALIVE
void life_step()
{
    for (int y = 0; y < kHeight; ++y) {
        for (int x = 0; x < kWidth; ++x) {
            const int neighbors = count_neighbors(x, y);
            const bool alive = cells[y * kWidth + x] != 0;
            next_cells[y * kWidth + x] = neighbors == 3 || (alive && neighbors == 2);
        }
    }
    // Copie plutôt qu'échange de pointeurs : l'adresse de cells reste stable.
    std::memcpy(cells, next_cells, sizeof cells);
}

} // extern "C"
