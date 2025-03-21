import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold my-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold mt-6 mb-3" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-lg font-bold mt-5 mb-2" {...props} />
        ),
        p: ({ node, ...props }) => <p className="my-4" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-primary hover:underline" {...props} />
        ),
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-gray-200 pl-4 py-2 my-6 italic text-gray-700" {...props} />
        ),
        img: ({ node, ...props }) => (
          <img className="max-w-full h-auto my-6 rounded-lg" {...props} />
        ),
        code: ({ node, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '');
          return !props.inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus as any}
              language={match[1]}
              PreTag="div"
              className="rounded-md my-4"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-100 px-1 py-0.5 rounded text-red-500 text-sm" {...props}>
              {children}
            </code>
          );
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-gray-300" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-50" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="divide-y divide-gray-200" {...props} />
        ),
        tr: ({ node, ...props }) => <tr {...props} />,
        th: ({ node, ...props }) => (
          <th
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-t border-gray-200" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
