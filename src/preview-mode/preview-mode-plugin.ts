import { MarkdownPostProcessor, MarkdownPostProcessorContext } from 'obsidian';

export function processTextNodes(el: Node, ctx: MarkdownPostProcessorContext)  {
	if (el.nodeType == el.TEXT_NODE) {
        console.log(el);
		// text node
		let text = el.nodeValue;
		let parent = el.parentNode;
		let regex = /"([^"]*)"/g;
		let lastIndex = 0;
		let match;
		if (text === null || parent === null) {
			return;
		}
		while ((match = regex.exec(text)) !== null) {
			if (regex.lastIndex - match[0].length > lastIndex) {
				parent.insertBefore(
					document.createTextNode(
						text.substring(
							lastIndex,
							regex.lastIndex - match[0].length
						)
					),
					el
				);
			}
			let span = document.createElement("span");
			span.textContent = match[1];
			span.className = "style-quotes";
			parent.insertBefore(span, el);
			lastIndex = regex.lastIndex;
		}
		if (lastIndex < text.length) {
			parent.insertBefore(
				document.createTextNode(text.substring(lastIndex)),
				el
			);
		}
		parent.removeChild(el);
	} else {
		for (let i = el.childNodes.length - 1; i >= 0; i--) {
			processTextNodes(el.childNodes[i], ctx);
		}
	}
}
