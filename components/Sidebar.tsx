import React from 'react';
import type { OwaspItem } from '../types';

interface SidebarProps {
    items: OwaspItem[];
    selectedItem: OwaspItem | null;
    onSelectItem: (item: OwaspItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, selectedItem, onSelectItem }) => {
    return (
        <aside className="w-64 bg-primary text-text-primary flex-shrink-0 border-r border-border-color p-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">OWASP Top 10</h2>
                <p className="text-sm text-text-secondary">Edición 2021</p>
            </div>
            <nav>
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className="mb-2">
                            <button
                                onClick={() => onSelectItem(item)}
                                className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                                    selectedItem?.id === item.id
                                        ? 'bg-accent text-white shadow-lg'
                                        : 'hover:bg-secondary'
                                }`}
                            >
                                <div className="font-bold">{item.category}</div>
                                <div className="text-sm">{item.title}</div>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;