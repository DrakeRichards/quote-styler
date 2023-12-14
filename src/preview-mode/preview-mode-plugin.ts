import { MarkdownPostProcessor, MarkdownPostProcessorContext } from 'obsidian';

export const quotePostProcessor: MarkdownPostProcessor = function (el: Node, ctx: MarkdownPostProcessorContext) {
	const htmlElement = el as HTMLElement;
	if (
		!isDataViewQuery(htmlElement)
		&& !isBlockQuote(htmlElement)
	) {
		replaceTextContent(htmlElement);
	}
};

function replaceTextContent(element: HTMLElement) {
	if (
		isTextNodeWithQuotes(element)
		&& isParentAllowed(element)
	) {
		const matches = findQuoteMatches(element);
		if (matches.length > 0) {
			const fragment = createFragmentFromMatches(element, matches);
			replaceTextNodeWithFragment(element, fragment);
		}
	} else {
		processChildNodes(element);
	}
}

function isTextNodeWithQuotes(element: HTMLElement): boolean {
	return (
		element.nodeType === element.TEXT_NODE &&
		element.nodeValue !== null
	);
}

function isParentAllowed(element: HTMLElement): boolean {
	const allowedParentNodeNames = ['P', 'LI'];
	if (element.parentNode === null) {
		return true;
	}
	return allowedParentNodeNames.includes(element.parentNode.nodeName);
}

function isDataViewQuery(element: HTMLElement) {
	// If the top-level element is a span, that means the block is probably
	// a DataView query and should be skipped entirely.
	return element.nodeName === 'SPAN'
}

function isBlockQuote(element: HTMLElement) {
	return element.firstChild?.nodeName === 'BLOCKQUOTE';
}

function findQuoteMatches(element: HTMLElement): RegExpMatchArray[] {
	const regex = /"([^"]*)"/g;
	if (element.nodeValue === null) {
		return [];
	}
	return [...element.nodeValue.matchAll(regex)];
}

function createFragmentFromMatches(element: HTMLElement, matches: RegExpMatchArray[]): DocumentFragment {
	const fragment = document.createDocumentFragment();
	let lastIndex = 0;

	matches.forEach(match => {
		// Add text before the match
		if (element.nodeValue === null) { return; }
		const beforeText = element.nodeValue.slice(lastIndex, match.index !== undefined ? match.index : lastIndex);
		if (beforeText.length > 0) {
			fragment.appendChild(document.createTextNode(beforeText));
		}

		// Add the matched text with a surrounding span
		const span = document.createElement('span');
		span.className = 'token string';
		span.textContent = `"${match[1]}"`;
		fragment.appendChild(span);

		// Update the lastIndex for the next iteration
		lastIndex = match.index !== undefined ? match.index + match[0].length : lastIndex;
	});

	// Add the remaining text after the last match
	if (element.nodeValue === null) { return fragment; }
	const afterText = element.nodeValue.slice(lastIndex);
	if (afterText.length > 0) {
		fragment.appendChild(document.createTextNode(afterText));
	}

	return fragment;
}

function replaceTextNodeWithFragment(element: HTMLElement, fragment: DocumentFragment) {
	element.parentNode?.replaceChild(fragment, element);
}

function processChildNodes(element: HTMLElement) {
	element.childNodes.forEach(replaceTextContent);
}
