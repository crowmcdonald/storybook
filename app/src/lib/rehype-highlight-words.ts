import { visit, SKIP } from 'unist-util-visit';
import { h } from 'hastscript';
// Types are used inline

interface RehypeHighlightWordsOptions {
  wordsToHighlight: string[];
}

// This type might need to be adjusted based on actual tree node structure from HAST
interface HastNode {
  type: string;
  value?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

export default function rehypeHighlightWords(options: RehypeHighlightWordsOptions) {
  const { wordsToHighlight } = options;
  if (!wordsToHighlight || wordsToHighlight.length === 0) {
    return (tree: HastNode) => tree; // No-op if no words to highlight
  }

  // Create a regex that matches any of the words to highlight, case-insensitive, as whole words
  // Escape special characters in wordsToHighlight to prevent regex injection
  const escapedWords = wordsToHighlight.map(word => word.replace(/[.*+?^${}()|[\\]/g, '\\// Word boundaries \b are important to match whole words only
  const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');'));
  // Create a regex that matches any of the words to highlight, case-insensitive, as whole words
  // Word boundaries \b are important to match whole words only
  const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi');

  return (tree: HastNode) => {
    visit(tree, 'text', (node: HastNode, index, parent: HastNode | undefined) => {
      if (node.type === 'text' && node.value && parent && parent.type === 'element') {
        const textValue = node.value;
        const newNodes: HastNode[] = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(textValue)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            newNodes.push({ type: 'text', value: textValue.substring(lastIndex, match.index) });
          }
          // Add the highlighted word, wrapped only in <u>
          newNodes.push(
            h('u', match[0])
          );
          lastIndex = regex.lastIndex;
        }

        // Add any remaining text after the last match
        if (lastIndex < textValue.length) {
          newNodes.push({ type: 'text', value: textValue.substring(lastIndex) });
        }

        // If any matches were found, replace the original text node with the new nodes
        if (newNodes.length > 0 && parent.children && typeof index === 'number') {
          parent.children.splice(index, 1, ...newNodes);
          return [SKIP, index + newNodes.length]; // Adjust index for visit, use imported SKIP
        }
      }
    });
  };
} 