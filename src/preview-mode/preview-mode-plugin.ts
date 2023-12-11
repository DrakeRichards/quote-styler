import { MarkdownPostProcessor, MarkdownPostProcessorContext } from 'obsidian';

export const quotePostProcessor: MarkdownPostProcessor = function (el: Node, ctx: MarkdownPostProcessorContext) {
	if ((el instanceof HTMLElement) && (el.nodeType === el.ELEMENT_NODE) && (el.getElementsByTagName('code').length === 0)) {
		const regex = /"([^"]*)"/g;
		el.innerHTML = el.innerHTML.replace(regex, '<span class="token string">"$1"</span>');
	}
};
