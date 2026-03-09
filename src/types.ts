export interface Piece {
    id: string;
    name: string;
    shape: string;
    dims: string;
    qty: number;
    notes: string[];
    instructions: string[];
}

export interface Measurements {
    [key: string]: string | undefined;
}

export interface Colors {
    c1: string;
    c2: string;
    c3: string;
}

export interface StyleData {
    id: number;
    name: string;
    category: string;
    region: string;
    origin: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert" | string;
    fabric: string;
    tags: string[];
    african: boolean;
    desc: string;
    garmentKey: string;
    colors: Colors;
    measurements: Measurements;
    pieces: Piece[];
}
