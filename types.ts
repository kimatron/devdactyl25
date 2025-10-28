import type React from 'react';

export interface Service {
    title: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    items: string[];
    imageUrl: string;
}

export interface BlogPost {
    imageUrl: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    content: string;
}

export interface FeaturedProject {
    imageUrl: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}