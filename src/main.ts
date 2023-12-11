// Import statements
import { Plugin } from 'obsidian';
import { quotePlugin } from './editor-mode/editor-mode-plugin'
import { quotePostProcessor } from './preview-mode/preview-mode-plugin'

export default class QuotationPlugin extends Plugin {
  async onload() {
    this.registerEditorExtension(quotePlugin);
    this.registerMarkdownPostProcessor(quotePostProcessor);
  }

  onunload() {
    //console.log('unloading plugin');
  }
}
