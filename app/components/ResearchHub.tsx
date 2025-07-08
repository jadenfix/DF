'use client';

import { useState } from 'react';
import { 
  ArrowTopRightOnSquareIcon, 
  DocumentTextIcon, 
  CodeBracketIcon,
  CircleStackIcon,
  BookOpenIcon 
} from '@heroicons/react/24/outline';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  description: string;
  category: string;
  tags: string[];
  links: {
    pdf?: string;
    arxiv?: string;
    github?: string;
    huggingface?: string;
    demo?: string;
    proceedings?: string;
  };
}

const papers: Paper[] = [
  {
    id: 'moondream2',
    title: 'Moondream 2: A tiny vision language model',
    authors: ['Vikhyat Korrapati', 'Moondream Team'],
    venue: 'Moondream',
    year: 2024,
    description: 'A compact 1.86B parameter vision-language model that achieves competitive performance on visual question answering tasks while being efficient enough to run on edge devices.',
    category: 'Vision-Language Models',
    tags: ['VLM', 'Efficiency', 'Edge Computing', 'Visual QA'],
    links: {
      huggingface: 'https://huggingface.co/vikhyatk/moondream2',
      github: 'https://github.com/vikhyat/moondream',
      demo: 'https://huggingface.co/spaces/vikhyatk/moondream2'
    }
  },
  {
    id: 'clip',
    title: 'Learning Transferable Visual Representations from Natural Language Supervision',
    authors: ['Alec Radford', 'Jong Wook Kim', 'Chris Hallacy', 'Aditya Ramesh', 'Gabriel Goh', 'Sandhini Agarwal', 'Girish Sastry', 'Amanda Askell', 'Pamela Mishkin', 'Jack Clark', 'Gretchen Krueger', 'Ilya Sutskever'],
    venue: 'ICML',
    year: 2021,
    description: 'CLIP learns visual concepts from natural language supervision, demonstrating impressive zero-shot transfer capabilities across various vision tasks.',
    category: 'Vision-Language Models',
    tags: ['Vision-Language', 'Zero-shot', 'Contrastive Learning', 'Transfer Learning'],
    links: {
      arxiv: 'https://arxiv.org/abs/2103.00020',
      github: 'https://github.com/openai/CLIP',
      proceedings: 'https://proceedings.mlr.press/v139/radford21a.html'
    }
  },
  {
    id: 'llava',
    title: 'Visual Instruction Tuning',
    authors: ['Haotian Liu', 'Chunyuan Li', 'Qingyang Wu', 'Yong Jae Lee'],
    venue: 'NeurIPS',
    year: 2023,
    description: 'LLaVA introduces visual instruction tuning to build large multimodal models with enhanced visual understanding and reasoning capabilities.',
    category: 'Vision-Language Models',
    tags: ['Instruction Tuning', 'Multimodal', 'Visual Reasoning', 'Large Language Models'],
    links: {
      arxiv: 'https://arxiv.org/abs/2304.08485',
      github: 'https://github.com/haotian-liu/LLaVA',
      huggingface: 'https://huggingface.co/llava-hf',
      proceedings: 'https://papers.nips.cc/paper_files/paper/2023/hash/6dcf277ea32ce3288914faf369fe6de0-Abstract-Conference.html'
    }
  },
  {
    id: 'blip2',
    title: 'BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models',
    authors: ['Junnan Li', 'Dongxu Li', 'Silvio Savarese', 'Steven Hoi'],
    venue: 'ICML',
    year: 2023,
    description: 'BLIP-2 achieves state-of-the-art performance on various vision-language tasks by bootstrapping from frozen pre-trained models.',
    category: 'Vision-Language Models',
    tags: ['Bootstrapping', 'Frozen Models', 'Vision-Language', 'Pre-training'],
    links: {
      arxiv: 'https://arxiv.org/abs/2301.12597',
      github: 'https://github.com/salesforce/BLIP',
      huggingface: 'https://huggingface.co/Salesforce/blip2-opt-2.7b',
      proceedings: 'https://proceedings.mlr.press/v202/li23q.html'
    }
  },
  {
    id: 'flamingo',
    title: 'Flamingo: a Visual Language Model for Few-Shot Learning',
    authors: ['Jean-Baptiste Alayrac', 'Jeff Donahue', 'Pauline Luc', 'Antoine Miech', 'Iain Barr', 'Yana Hasson', 'Karel Lenc', 'Arthur Mensch', 'Katherine Millican', 'Malcolm Reynolds', 'Roman Ring', 'Eliza Rutherford', 'Serkan Cabi', 'Tengda Han', 'Zhitao Gong', 'Sina Samangooei', 'Marianne Monteiro', 'Jacob Menick', 'Sebastian Borgeaud', 'Andy Brock', 'Aida Nematzadeh', 'Sahand Sharifzadeh', 'Mikolaj Binkowski', 'Ricardo Barreira', 'Oriol Vinyals', 'Andrew Zisserman', 'Karen Simonyan'],
    venue: 'NeurIPS',
    year: 2022,
    description: 'Flamingo demonstrates remarkable few-shot learning capabilities on a wide range of multimodal tasks by bridging powerful pre-trained vision and language models.',
    category: 'Vision-Language Models',
    tags: ['Few-shot Learning', 'Multimodal', 'Vision-Language', 'Transfer Learning'],
    links: {
      arxiv: 'https://arxiv.org/abs/2204.14198',
      proceedings: 'https://papers.nips.cc/paper_files/paper/2022/hash/960a172bc7fbf0177ccccbb411a7d800-Abstract-Conference.html'
    }
  },
  {
    id: 'gpt4v',
    title: 'GPT-4V(ision) System Card',
    authors: ['OpenAI'],
    venue: 'OpenAI',
    year: 2023,
    description: 'GPT-4V extends GPT-4 with vision capabilities, enabling it to accept image inputs and demonstrate strong performance across diverse vision-language tasks.',
    category: 'Vision-Language Models',
    tags: ['GPT-4', 'Vision', 'Multimodal', 'Large Language Models'],
    links: {
      pdf: 'https://cdn.openai.com/papers/GPTV_System_Card.pdf'
    }
  },
  {
    id: 'instructblip',
    title: 'InstructBLIP: Towards General-purpose Vision-Language Models with Instruction Tuning',
    authors: ['Wenliang Dai', 'Junnan Li', 'Dongxu Li', 'Anthony Meng Huat Tiong', 'Junqi Zhao', 'Weisheng Wang', 'Boyang Li', 'Pascale Fung', 'Steven Hoi'],
    venue: 'arXiv',
    year: 2023,
    description: 'InstructBLIP introduces comprehensive instruction tuning for vision-language models, achieving strong performance across diverse multimodal tasks.',
    category: 'Vision-Language Models',
    tags: ['Instruction Tuning', 'Vision-Language', 'General Purpose', 'Multimodal'],
    links: {
      arxiv: 'https://arxiv.org/abs/2305.06500',
      github: 'https://github.com/salesforce/LAVIS/tree/main/projects/instructblip',
      huggingface: 'https://huggingface.co/Salesforce/instructblip-vicuna-7b'
    }
  },
  {
    id: 'minigpt4',
    title: 'MiniGPT-4: Enhancing Vision-Language Understanding with Advanced Large Language Models',
    authors: ['Deyao Zhu', 'Jun Chen', 'Xiaoqian Shen', 'Xiang Li', 'Mohamed Elhoseiny'],
    venue: 'arXiv',
    year: 2023,
    description: 'MiniGPT-4 aligns a frozen visual encoder with a frozen LLM using just one projection layer, achieving impressive vision-language generation capabilities.',
    category: 'Vision-Language Models',
    tags: ['Vision-Language', 'Large Language Models', 'Alignment', 'Generation'],
    links: {
      arxiv: 'https://arxiv.org/abs/2304.10592',
      github: 'https://github.com/Vision-CAIR/MiniGPT-4',
      huggingface: 'https://huggingface.co/Vision-CAIR/MiniGPT-4',
      demo: 'https://minigpt-4.github.io/'
    }
  }
];

const categories = ['All', 'Vision-Language Models', 'Medical VLM', 'Video Understanding', 'Document Understanding'];

export default function ResearchHub() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPapers = papers.filter(paper => {
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      paper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'arxiv':
        return <DocumentTextIcon className="h-4 w-4" />;
      case 'github':
        return <CodeBracketIcon className="h-4 w-4" />;
      case 'huggingface':
        return <CircleStackIcon className="h-4 w-4" />;
      case 'proceedings':
        return <BookOpenIcon className="h-4 w-4" />;
      default:
        return <ArrowTopRightOnSquareIcon className="h-4 w-4" />;
    }
  };

  const getLinkLabel = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'arxiv':
        return 'arXiv';
      case 'github':
        return 'GitHub';
      case 'huggingface':
        return 'HuggingFace';
      case 'demo':
        return 'Demo';
      case 'proceedings':
        return 'Proceedings';
      default:
        return 'Link';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            VLM Research Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore cutting-edge research in Vision-Language Models. Discover papers, implementations, and resources 
            from the latest breakthroughs in multimodal AI.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search papers, authors, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {paper.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {paper.year}
                </span>
              </div>
              
              {/* Title and Authors */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
                {paper.title}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Authors:</strong> {paper.authors.slice(0, 3).join(', ')}
                {paper.authors.length > 3 && ' et al.'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                <strong>Venue:</strong> {paper.venue}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {paper.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(paper.links).map(([type, url]) => (
                  <a
                    key={type}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    {getLinkIcon(type)}
                    {getLinkLabel(type)}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No papers found matching your criteria.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Discover and explore the latest breakthroughs in Vision-Language Models
          </p>
        </div>
      </div>
    </div>
  );
}
