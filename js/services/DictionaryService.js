import { GAME_CONFIG } from "../config/constants.js";

export class DictionaryService {

    static dictionaries = {
        pt: [
            "TESTE",
            "DADOS",
            "PILHA",
            "SUITE"
        ],

        en: [
            "CLEAN",
            "SMELL",
            "PRINT",
            "FILES",
            "STACK"
        ]
    };

    static getValidWords(language) {

        const words = this.dictionaries[language] || [];

        return words.filter(word => {

            const isValid =
                typeof word === "string" &&
                word.length === GAME_CONFIG.WORD_LENGTH;

            if (!isValid) {
                console.warn(
                    `Palavra inválida removida do dicionário: ${word}`
                );
            }

            return isValid;
        });
    }

    static getRandomWord(language) {

        const validWords = this.getValidWords(language);

        const randomIndex =
            Math.floor(Math.random() * validWords.length);

        return validWords[randomIndex];
    }
}
