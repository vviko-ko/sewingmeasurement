import React from "react";

export interface PatternSVGProps {
    shape: string;
}

export const PatternSVG = ({ shape }: PatternSVGProps) => {
    const col = "#C14B1A";
    const fill = "rgba(193,75,26,0.07)";

    const shapes: Record<string, React.ReactNode> = {
        front_bodice: (
            <svg viewBox="0 0 110 145" width="98" height="130">
                <path d="M18,10 L92,10 L100,28 L104,135 L6,135 L10,28Z" fill={fill} stroke={col} strokeWidth="1.4" />
                <path d="M18,10 Q55,18 92,10" fill="none" stroke={col} strokeWidth=".9" strokeDasharray="3,2" />
                <line x1="6" y1="72" x2="104" y2="72" stroke={col} strokeWidth=".5" strokeDasharray="3,2" />
                <text x="55" y="90" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={col} opacity=".6">CF</text>
                <line x1="55" y1="38" x2="55" y2="62" stroke="#2D6A4F" strokeWidth="1" />
                <text x="60" y="52" fontFamily="DM Mono" fontSize="5" fill="#2D6A4F">GRAIN</text>
            </svg>
        ),
        back_bodice: (
            <svg viewBox="0 0 110 145" width="98" height="130">
                <path d="M14,8 L96,8 L104,26 L106,136 L4,136 L6,26Z" fill={fill} stroke={col} strokeWidth="1.4" />
                <path d="M14,8 Q55,4 96,8" fill="none" stroke={col} strokeWidth=".9" strokeDasharray="4,2" />
                <line x1="4" y1="74" x2="106" y2="74" stroke={col} strokeWidth=".5" strokeDasharray="3,2" />
                <text x="55" y="94" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={col} opacity=".6">CB</text>
                <line x1="55" y1="32" x2="55" y2="60" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
        sleeve: (
            <svg viewBox="0 0 120 158" width="106" height="140">
                <path d="M60,9 C88,9 110,26 110,46 L103,150 L17,150 L10,46 C10,26 32,9 60,9Z" fill={fill} stroke={col} strokeWidth="1.4" />
                <line x1="17" y1="136" x2="103" y2="136" stroke={col} strokeWidth=".8" strokeDasharray="4,3" />
                <line x1="60" y1="36" x2="60" y2="68" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
        collar: (
            <svg viewBox="0 0 155 76" width="138" height="68">
                <path d="M8,58 L18,13 Q78,3 136,13 L146,58 Q78,70 8,58Z" fill={fill} stroke={col} strokeWidth="1.4" />
                <line x1="78" y1="13" x2="78" y2="58" stroke={col} strokeWidth=".5" strokeDasharray="2,2" />
                <line x1="78" y1="22" x2="78" y2="46" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
        skirt_panel: (
            <svg viewBox="0 0 130 168" width="115" height="150">
                <path d="M28,10 L102,10 L125,160 L5,160Z" fill={fill} stroke={col} strokeWidth="1.4" />
                <line x1="28" y1="10" x2="102" y2="10" stroke={col} strokeWidth="1.2" strokeDasharray="5,3" />
                <line x1="10" y1="145" x2="120" y2="145" stroke={col} strokeWidth=".8" strokeDasharray="4,3" />
                <line x1="65" y1="32" x2="65" y2="72" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
        trouser_front: (
            <svg viewBox="0 0 115 192" width="100" height="170">
                <path d="M18,10 L97,10 L100,95 L90,192 L58,192 L55,125 L22,192 L10,192 L14,95Z" fill={fill} stroke={col} strokeWidth="1.4" />
                <line x1="14" y1="95" x2="100" y2="95" stroke={col} strokeWidth=".6" strokeDasharray="3,2" />
                <line x1="57" y1="38" x2="57" y2="75" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
        waistband: (
            <svg viewBox="0 0 190 55" width="170" height="49">
                <rect x="8" y="8" width="174" height="38" fill={fill} stroke={col} strokeWidth="1.4" />
                <line x1="8" y1="27" x2="182" y2="27" stroke={col} strokeWidth=".6" strokeDasharray="4,3" />
                <line x1="95" y1="10" x2="95" y2="45" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
        pocket: (
            <svg viewBox="0 0 88 97" width="78" height="86">
                <path d="M9,9 L79,9 L82,88 L6,88Z" fill={fill} stroke={col} strokeWidth="1.4" />
                <line x1="9" y1="9" x2="79" y2="9" stroke={col} strokeWidth="1.2" strokeDasharray="4,2" />
                <line x1="44" y1="28" x2="44" y2="55" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
        agbada_outer: (
            <svg viewBox="0 0 200 140" width="178" height="124">
                <path d="M5,10 Q100,2 195,10 L190,130 L10,130Z" fill={fill} stroke={col} strokeWidth="1.4" />
                <path d="M5,10 Q100,2 195,10" fill="none" stroke={col} strokeWidth="1.2" strokeDasharray="5,3" />
                <line x1="5" y1="70" x2="195" y2="70" stroke={col} strokeWidth=".5" strokeDasharray="3,2" />
                <line x1="100" y1="25" x2="100" y2="60" stroke="#2D6A4F" strokeWidth="1" />
                <text x="100" y="90" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={col} opacity=".6">OUTER ROBE</text>
            </svg>
        ),
        embroidery_panel: (
            <svg viewBox="0 0 60 120" width="52" height="105">
                <rect x="6" y="6" width="48" height="108" fill={fill} stroke={col} strokeWidth="1.4" />
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <path key={i} d={`M18,${16 + i * 16} Q30,${22 + i * 16} 42,${16 + i * 16}`} fill="none" stroke={col} strokeWidth="1" opacity=".5" />
                ))}
                <line x1="30" y1="20" x2="30" y2="55" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
        kente_strip: (
            <svg viewBox="0 0 45 160" width="38" height="142">
                <rect x="5" y="5" width="35" height="150" fill={fill} stroke={col} strokeWidth="1.4" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                    <rect key={i} x="5" y={5 + i * 19} width="35" height="9"
                        fill={["#D4A017", "#B22222", "#2D6A4F", "#0E0C09"][i % 4]} opacity=".3" />
                ))}
                <line x1="22" y1="20" x2="22" y2="55" stroke="#2D6A4F" strokeWidth="1" />
            </svg>
        ),
    };

    return (shapes[shape] as React.ReactElement) || (shapes.front_bodice as React.ReactElement);
};
