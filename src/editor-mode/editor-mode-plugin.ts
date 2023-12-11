import {
	EditorView,
	ViewPlugin,
	MatchDecorator,
	Decoration,
	DecorationSet,
	ViewUpdate,
} from "@codemirror/view";

const quoteMatcher = new MatchDecorator({
	regexp: /"([^"]*)"/g,
	decoration: Decoration.mark({
		attributes: {
			class: "token string",
		},
	}),
});

export const quotePlugin = ViewPlugin.fromClass(
	class {
		quotedText: DecorationSet;

		constructor(view: EditorView) {
			this.quotedText = quoteMatcher.createDeco(view);
		}

		update(update: ViewUpdate) {
			this.quotedText = quoteMatcher.updateDeco(update, this.quotedText);
		}
	},
	{
		decorations: (instance) => instance.quotedText,
	}
);
