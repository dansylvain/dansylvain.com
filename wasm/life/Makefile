# Démo « life » : compile life.cpp en WebAssembly avec Emscripten.
# Prérequis : source ~/emsdk/emsdk_env.sh (version indiquée dans le README).

CXX      := em++
OUT_DIR  := ../../public/demos/life
TARGET   := $(OUT_DIR)/life.mjs
WASM     := $(OUT_DIR)/life.wasm
SRCS     := life.cpp

CXXFLAGS := -std=c++20 -O2 -Wall -Wextra -Werror

# --no-entry : pas de main(), le module n'expose que des fonctions.
# HEAPU8     : vue JavaScript sur la mémoire du module.
LDFLAGS  := --no-entry \
            -sMODULARIZE \
            -sEXPORT_ES6 \
            -sENVIRONMENT=web \
            -sEXPORTED_RUNTIME_METHODS=HEAPU8

.PHONY: all clean re

all: $(TARGET)

# em++ produit life.mjs (glue) et life.wasm en une seule commande.
$(TARGET): $(SRCS) Makefile | $(OUT_DIR)
	$(CXX) $(CXXFLAGS) $(SRCS) $(LDFLAGS) -o $@

$(OUT_DIR):
	mkdir -p $@

clean:
	$(RM) $(TARGET) $(WASM)

re: clean
	$(MAKE) all
