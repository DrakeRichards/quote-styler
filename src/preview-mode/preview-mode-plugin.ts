import { MarkdownPostProcessor, MarkdownPostProcessorContext } from 'obsidian';

export const quotePostProcessor: MarkdownPostProcessor = function (el: Node, ctx: MarkdownPostProcessorContext) {
	if (isBodyText(el)) {
		const htmlElement = el as HTMLElement;
		const regex = /"([^"]*)"/g;
		console.log(htmlElement.innerHTML);
		htmlElement.innerHTML = htmlElement.innerHTML.replace(regex, '<span class="token string">"$1"</span>');
	}
};

function isBodyText(el: Node): el is HTMLElement {
	if (
		el instanceof HTMLElement &&
		el.nodeType === el.ELEMENT_NODE
	) {
		// Check if the element contains only a single <p> tag and no other child elements
		const paragraphs = el.getElementsByTagName('p');
		return paragraphs.length === 1 && el.children.length === 1 && el.children[0] === paragraphs[0];
	}

	return false;
}