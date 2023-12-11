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
			class: "HyperMD-codeblock token string",
		},
	}),
});

export const quotePlugin = ViewPlugin.fromClass(
	class {
		quotedText: DecorationSet;

		constructor(view: EditorView) {
			console.log("Loaded quote plugin");
			this.quotedText = quoteMatcher.createDeco(view);
		}

		update(update: ViewUpdate) {
			this.quotedText = quoteMatcher.updateDeco(update, this.quotedText);
			//console.log(this.quotedText);
		}
	},
	{
		decorations: (instance) => instance.quotedText,
	}
);
