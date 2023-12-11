// Import statements
import { MarkdownPostProcessorContext, Plugin } from 'obsidian';
import { quotePlugin } from './editor-mode/editor-mode-plugin'

export default class QuotationPlugin extends Plugin {
  async onload() {
    this.registerEditorExtension(quotePlugin);
  }

  onunload() {
    console.log('unloading plugin');
  }
}
