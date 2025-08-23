import { ActionType } from "../characters/ActionType";

/*
function customDialog(): string {
  return "";
}
  */

export const dialogues: Record<string, Record<ActionType, string[]>> = {
  Anna: {
    [ActionType.OPEN_DOOR]: [
      "Elle est verrouillée. Je pourrais peut-être la forcer ?",
      "Encore une foutue porte…",
    ],
    [ActionType.SUMMON]: ["Oui ?", "J'écoute."],
    [ActionType.ATTACK]: ["Prends ça !", "Je vais t’arrêter."],

    [ActionType.MOVE]: ["J'y vais."],
    [ActionType.CANT_MOVE]: ["Aucun accès."],
    [ActionType.ARRIVED]: ["J'y suis."],

    [ActionType.OBSERVE]: [
      "Je vais jeter un œil...",
      "Inspectons les environs...",
    ],
    [ActionType.OBSERVE_FAIL]: ["Rien de particulier.", "Rien à signaler."],

    [ActionType.EXAMINE]: ["Je suis arrivée."],
    [ActionType.FIND_ITEM]: ["J'ai trouvé quelque chose."],

    [ActionType.UNKNOWN]: ["Je ne comprends pas.", "Je te reçois mal."],
  },

  Clara: {
    [ActionType.OPEN_DOOR]: [
      "Je sens que ce passage cache quelque chose…",
      "Même sans voir, je devine que cette porte résiste.",
    ],
    [ActionType.SUMMON]: ["Je vous entends.", "Je vous écoute."],
    [ActionType.ATTACK]: [
      "Je sens leur présence…",
      "Je vais essayer de les repousser !",
    ],
    [ActionType.MOVE]: ["Je m'y déplace."],
    [ActionType.CANT_MOVE]: ["Je ne peux pas y aller."],
    [ActionType.ARRIVED]: ["Je suis arrivée."],

    [ActionType.OBSERVE]: [
      "Voyons ce que les énergies me chuchotent...",
      "Puissent les esprits me guider...",
    ],
    [ActionType.OBSERVE_FAIL]: ["Je ne perçois rien.", "Rien de tangible."],
    [ActionType.EXAMINE]: ["Je suis arrivée."],
    [ActionType.FIND_ITEM]: ["Quelque chose était caché !"],

    [ActionType.UNKNOWN]: ["Je ne saisis pas.", "Je n'ai pas bien compris."],
  },

  Paul: {
    [ActionType.OPEN_DOOR]: [
      "Je peux essayer de la forcer.",
      "Une porte ? Laisse-moi faire.",
    ],
    [ActionType.SUMMON]: ["Ici Paul !", "Oui !"],
    [ActionType.ATTACK]: ["Tiens bon !", "J’ai ce qu’il faut."],

    [ActionType.MOVE]: ["J'y vais !"],
    [ActionType.CANT_MOVE]: ["Impossible de s'y déplacer."],
    [ActionType.ARRIVED]: ["J'y suis."],

    [ActionType.OBSERVE]: ["Voyons, voyons...", "Que se cache-t-il autour..."],
    [ActionType.OBSERVE_FAIL]: [
      "Je ne vois rien d'intéressant.",
      "Il n'y a rien.",
    ],

    [ActionType.EXAMINE]: ["Je suis arrivée."],
    [ActionType.FIND_ITEM]: ["Tiens donc !"],

    [ActionType.UNKNOWN]: ["Comment ?", "Plaît-il ?"],
  },
};
