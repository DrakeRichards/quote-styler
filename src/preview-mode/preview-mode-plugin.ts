import { MarkdownPostProcessor, MarkdownPostProcessorContext } from 'obsidian';

export const quotePostProcessor: MarkdownPostProcessor = function (el: Node, ctx: MarkdownPostProcessorContext) {
	const htmlElement = el as HTMLElement;
	if (isBodyText(htmlElement)) {
		processElement(el as HTMLElement);
	}
};

function isBodyText(el: HTMLElement): boolean {
	const paragraphs = el.getElementsByTagName('p');
	
	if (
		el.nodeType === el.ELEMENT_NODE &&
		paragraphs.length === 1 &&
		el.children.length === 1 &&
		el.children[0] === paragraphs[0]
	) {
		return true;
	}

	return false;
}

function processElement(el: HTMLElement) {
	const paragraphs = el.getElementsByTagName('p');
	if (paragraphs.length === 1) {
		const paragraph = paragraphs[0];
		replaceTextContent(paragraph);
	}
}

function replaceTextContent(node: Node) {
	if (node.nodeType === node.TEXT_NODE && node.nodeValue !== null) {
		const regex = /"([^"]*)"/g;
		node.nodeValue = node.nodeValue.replace(regex, '"$1"');
	} else {
		// Recursively process child nodes
		node.childNodes.forEach(replaceTextContent);
	}
}