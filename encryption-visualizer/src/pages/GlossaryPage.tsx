import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { glossaryTerms } from '@/data/glossary';
import { Search, Book } from 'lucide-react';
import { motion } from 'framer-motion';

export const GlossaryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'Symmetric', 'Asymmetric', 'Hashing', 'General', 'Security'];

    const filteredTerms = glossaryTerms.filter((term) => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <Layout>
            <div className="space-y-8 max-w-4xl mx-auto">
                <div className="glass-card p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 flex items-center justify-center sm:justify-start gap-3">
                            <Book className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
                            Crypto Glossary
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            Dictionary of cryptographic terms and concepts.
                        </p>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                            placeholder="Search terms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Terms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTerms.length > 0 ? (
                        filteredTerms.map((term, index) => (
                            <motion.div
                                key={term.term}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-l-4 border-l-blue-500"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{term.term}</h3>
                                    <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                        {term.category}
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                                    {term.definition}
                                </p>
                                {term.relatedTerms && term.relatedTerms.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
                                        <span className="text-xs text-slate-400 dark:text-slate-500 mr-1">Related:</span>
                                        {term.relatedTerms.map((related) => (
                                            <span key={related} className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                                {related}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-400 dark:text-slate-500">
                            No terms found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};
