import React from "react";

export interface ClothingIllustrationProps {
    category: "Dress" | "Jacket" | "Trousers" | "Top" | string;
}

export const ClothingIllustration = ({ category }: ClothingIllustrationProps) => {
    const svgs: Record<string, React.ReactNode> = {
        Dress: (
            <svg viewBox="0 0 80 110" width="70" height="96">
                <path d="M25,15 L55,15 L60,30 L65,100 L15,100 L20,30 Z" fill="rgba(181,69,27,0.08)" stroke="#B5451B" strokeWidth="1.2" />
                <path d="M25,15 Q40,8 55,15" fill="none" stroke="#B5451B" strokeWidth="0.8" strokeDasharray="3,2" />
                <line x1="15" y1="60" x2="65" y2="60" stroke="#B5451B" strokeWidth="0.5" strokeDasharray="2,2" />
                <path d="M20,30 Q10,35 8,45 L15,60" fill="none" stroke="#B5451B" strokeWidth="1.2" />
                <path d="M60,30 Q70,35 72,45 L65,60" fill="none" stroke="#B5451B" strokeWidth="1.2" />
            </svg>
        ),
        Jacket: (
            <svg viewBox="0 0 90 100" width="78" height="87">
                <path d="M20,10 L70,10 L78,25 L80,90 L10,90 L12,25 Z" fill="rgba(181,69,27,0.08)" stroke="#B5451B" strokeWidth="1.2" />
                <path d="M20,10 L30,25 L45,20" fill="none" stroke="#B5451B" strokeWidth="1" />
                <path d="M70,10 L60,25 L45,20" fill="none" stroke="#B5451B" strokeWidth="1" />
                <path d="M12,25 Q4,30 4,45 L10,55" fill="none" stroke="#B5451B" strokeWidth="1.2" />
                <path d="M78,25 Q86,30 86,45 L80,55" fill="none" stroke="#B5451B" strokeWidth="1.2" />
                <rect x="38" y="55" width="14" height="5" fill="rgba(181,69,27,0.2)" stroke="#B5451B" strokeWidth="0.8" />
            </svg>
        ),
        Trousers: (
            <svg viewBox="0 0 80 110" width="68" height="94">
                <path d="M15,10 L65,10 L68,55 L55,110 L40,110 L38,70 L25,110 L10,110 L12,55 Z" fill="rgba(181,69,27,0.08)" stroke="#B5451B" strokeWidth="1.2" />
                <line x1="15" y1="10" x2="65" y2="10" stroke="#B5451B" strokeWidth="1" strokeDasharray="4,2" />
                <line x1="12" y1="55" x2="68" y2="55" stroke="#B5451B" strokeWidth="0.6" strokeDasharray="2,2" />
                <line x1="39" y1="55" x2="39" y2="110" stroke="#B5451B" strokeWidth="0.6" strokeDasharray="2,2" />
            </svg>
        ),
        Top: (
            <svg viewBox="0 0 80 90" width="68" height="76">
                <path d="M22,12 L58,12 L62,25 L65,80 L15,80 L18,25 Z" fill="rgba(181,69,27,0.08)" stroke="#B5451B" strokeWidth="1.2" />
                <path d="M22,12 Q40,6 58,12" fill="none" stroke="#B5451B" strokeWidth="0.8" strokeDasharray="3,2" />
                <path d="M18,25 Q8,30 6,42 L12,55" fill="none" stroke="#B5451B" strokeWidth="1.2" />
                <path d="M62,25 Q72,30 74,42 L68,55" fill="none" stroke="#B5451B" strokeWidth="1.2" />
                <ellipse cx={28} cy={14} rx="5" ry="3" fill="rgba(181,69,27,0.15)" stroke="#B5451B" strokeWidth="0.8" />
                <ellipse cx={52} cy={14} rx="5" ry="3" fill="rgba(181,69,27,0.15)" stroke="#B5451B" strokeWidth="0.8" />
            </svg>
        )
    };
    return svgs[category] as React.ReactElement || svgs.Dress as React.ReactElement;
};
