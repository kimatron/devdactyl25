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
    slug: string;
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

// New type for Featured Work case studies
export interface Project {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    direction: 'left' | 'right';
    isGIF?: boolean;
    challenge?: string;
    solution?: string;
    features?: string[];
    results?: string;
    techStack?: string[];
}