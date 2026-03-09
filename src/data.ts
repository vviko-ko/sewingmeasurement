import type { StyleData } from "./types";

export const STYLES: StyleData[] = [
    {
        id: 1, name: "Grand Agbada", category: "Agbada", region: "West Africa", origin: "Yoruba / Nigerian",
        difficulty: "Advanced", fabric: "Brocade / Damask / Satin",
        tags: ["ceremonial", "royalty", "aso-ebi"], african: true,
        desc: "The quintessential Yoruba ceremonial robe — a three-piece ensemble comprising the agbada outer robe, buba inner shirt, and sokoto trousers.",
        garmentKey: "agbada", colors: { c1: "#2D6A4F", c2: "#C14B1A", c3: "#D4A017" },
        measurements: { "Chest": "96–104 cm", "Waist": "84–92 cm", "Hip": "102–110 cm", "Robe Len.": "150 cm", "Sleeve": "62 cm", "Seam Allow.": "2 cm" },
        pieces: [
            { id: "ag1", name: "Outer Agbada Robe", shape: "agbada_outer", dims: "280 × 150 cm", qty: 1, notes: ["Cut 1", "Width across arms"], instructions: ["Hem all sides", "Reinforce neck opening"] },
            { id: "ag2", name: "Buba Front", shape: "front_bodice", dims: "58 × 70 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Embroider before assembly"] },
            { id: "ag3", name: "Buba Back", shape: "back_bodice", dims: "58 × 70 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Join block"] },
            { id: "ag4", name: "Embroidery Panel", shape: "embroidery_panel", dims: "20 × 55 cm", qty: 2, notes: ["Embroider first"], instructions: ["Slip stitch"] },
            { id: "ag5", name: "Sokoto Trouser Front", shape: "trouser_front", dims: "58 × 110 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Sew inseam", "Waist elastic"] },
        ]
    },
    {
        id: 2, name: "Senator Suit", category: "Senator", region: "West Africa", origin: "Pan-Nigerian",
        difficulty: "Intermediate", fabric: "Linen / Cotton / Ankara",
        tags: ["formal", "political", "everyday"], african: true,
        desc: "The modern Nigerian Senator suit — a two-piece consisting of a long embroidered shirt and matching straight trousers.",
        garmentKey: "senator", colors: { c1: "#1A3A5C", c2: "#D4A017", c3: "#F7F2E8" },
        measurements: { "Chest": "90–98 cm", "Waist": "78–86 cm", "Hip": "96–104 cm", "Top Len.": "90 cm", "Trouser": "110 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "s1", name: "Senator Top Front", shape: "front_bodice", dims: "52 × 90 cm", qty: 2, notes: ["Cut 2 for CF open"], instructions: ["Construct collar stand", "Embroider CF"] },
            { id: "s2", name: "Senator Top Back", shape: "back_bodice", dims: "52 × 90 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Join with front shoulders"] },
            { id: "s3", name: "Long Sleeve", shape: "sleeve", dims: "40 × 66 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Ease sleeve cap", "Set sleeve form inside"] },
            { id: "s4", name: "Trouser Front", shape: "trouser_front", dims: "55 × 112 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Sew inseam, outseam", "Apply waistband"] },
            { id: "s5", name: "Waistband", shape: "waistband", dims: "84 × 9 cm", qty: 1, notes: ["Straight grain"], instructions: ["Interface half", "Top stitch 2mm"] },
        ]
    },
    {
        id: 3, name: "Dashiki Shirt", category: "Dashiki", region: "West Africa", origin: "Pan-African",
        difficulty: "Beginner", fabric: "Cotton / Ankara Print",
        tags: ["casual", "cultural", "vibrant", "everyday"], african: true,
        desc: "The beloved Pan-African symbol — a loose, brightly-patterned shirt featuring a distinctive V-neck embroidery yoke.",
        garmentKey: "dashiki", colors: { c1: "#B22222", c2: "#D4A017", c3: "#2D6A4F" },
        measurements: { "Chest": "88–100 cm", "Waist": "Free", "Hip": "Free", "Length": "70 cm", "Sleeve": "30 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "d1", name: "Front Body", shape: "front_bodice", dims: "54 × 70 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Staystitch V-neck", "Apply yoke embroidery"] },
            { id: "d2", name: "Back Body", shape: "back_bodice", dims: "54 × 70 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["French seam recommended"] },
            { id: "d3", name: "Short Sleeve", shape: "sleeve", dims: "42 × 30 cm", qty: 2, notes: ["Cut 2"], instructions: ["Sew sleeve seam, press open", "Hem cuff block"] },
        ]
    },
    {
        id: 4, name: "Grand Boubou", category: "Boubou", region: "West Africa", origin: "Senegalese / Malian",
        difficulty: "Intermediate", fabric: "Bazin Riche / Brocade",
        tags: ["ceremonial", "flowing", "unisex"], african: true,
        desc: "The majestic West African boubou — a voluminous flowing robe worn from Senegal to Mali.",
        garmentKey: "boubou", colors: { c1: "#4A1A7A", c2: "#D4A017", c3: "#C14B1A" },
        measurements: { "Chest": "Free", "Waist": "Free", "Length": "145 cm", "Width": "220 cm", "Seam Allow.": "2 cm" },
        pieces: [
            { id: "bo1", name: "Boubou Main Robe", shape: "agbada_outer", dims: "220 × 145 cm", qty: 1, notes: ["Very wide panel"], instructions: ["Hem edges", "Neck opening last"] },
            { id: "bo2", name: "Neck Embroidery", shape: "collar", dims: "40 × 15 cm", qty: 1, notes: ["Cut from contrast fabric"], instructions: ["Finish embroidery", "Slipstitch opening"] },
            { id: "bo3", name: "Front Panel", shape: "embroidery_panel", dims: "22 × 60 cm", qty: 1, notes: ["Marks chest embroidery"], instructions: ["Embroider over tearaway spacer"] },
        ]
    },
    {
        id: 5, name: "Kente Kaba Set", category: "Kente", region: "West Africa", origin: "Ghanaian / Akan",
        difficulty: "Advanced", fabric: "Kente Woven Strips",
        tags: ["ceremonial", "royalty", "Ghana", "festival"], african: true,
        desc: "A traditional Ghanaian Kaba and Slit set made from hand-woven Kente strips.",
        garmentKey: "kente_cloth", colors: { c1: "#D4A017", c2: "#B22222", c3: "#2D6A4F" },
        measurements: { "Bust": "86–94 cm", "Waist": "70–78 cm", "Hip": "92–100 cm", "Skirt Len.": "100 cm", "Top Len.": "52 cm", "Strip Width": "10 cm" },
        pieces: [
            { id: "k1", name: "Kente Strip", shape: "kente_strip", dims: "10 × 160 cm", qty: 12, notes: ["Separate woven strips"], instructions: ["Join with invisible ladder stitch"] },
            { id: "k2", name: "Kaba Top Front", shape: "front_bodice", dims: "48 × 52 cm", qty: 1, notes: ["Align dominant color CF"], instructions: ["Bind seams, do not serge thick weave"] },
            { id: "k3", name: "Slit Skirt Front", shape: "skirt_panel", dims: "55 × 100 cm", qty: 2, notes: ["Left overlaps right"], instructions: ["Join at left seam", "Apply waist finish"] },
        ]
    },
    {
        id: 6, name: "Adire Tie-Dye Dress", category: "Adire", region: "West Africa", origin: "Yoruba",
        difficulty: "Intermediate", fabric: "Hand-Dyed Cotton (Adire)",
        tags: ["casual", "artistic", "everyday", "blue"], african: true,
        desc: "An adire eleko (indigo resist-dye) wrap dress featuring the distinctive blue-and-white patterns of Yoruba textile art.",
        garmentKey: "adire_dress", colors: { c1: "#1A3A5C", c2: "#2D6A4F", c3: "#F7F2E8" },
        measurements: { "Bust": "86–94 cm", "Waist": "68–76 cm", "Hip": "90–98 cm", "Length": "105 cm", "Sleeve": "22 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "ad1", name: "Dress Front", shape: "front_bodice", dims: "48 × 105 cm", qty: 1, notes: ["Complete resist-dye before cutting"], instructions: ["Handle gently", "French seams"] },
            { id: "ad2", name: "Dress Back", shape: "back_bodice", dims: "48 × 105 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["CB seam", "Install invisible zipper"] },
            { id: "ad3", name: "Short Sleeve", shape: "sleeve", dims: "38 × 22 cm", qty: 2, notes: ["Align adire pattern"], instructions: ["Set with minimal ease", "Narrow cuff hem"] },
        ]
    },
    {
        id: 7, name: "Gele & Iro Buba Set", category: "Gele Set", region: "West Africa", origin: "Yoruba",
        difficulty: "Expert", fabric: "Aso-Oke / Satin / Damask",
        tags: ["ceremonial", "wedding", "aso-ebi", "feminine"], african: true,
        desc: "The complete Yoruba women's ceremonial ensemble — iro (wrap skirt), buba (blouse), ipele (shoulder cloth), and gele.",
        garmentKey: "gele_iro", colors: { c1: "#C14B1A", c2: "#D4A017", c3: "#1A3A5C" },
        measurements: { "Bust": "86–92 cm", "Waist": "68–76 cm", "Hip": "96–108 cm", "Iro Len.": "120 cm", "Buba Len.": "52 cm", "Gele": "180×60 cm" },
        pieces: [
            { id: "g1", name: "Buba Front", shape: "front_bodice", dims: "48 × 52 cm", qty: 1, notes: ["Interface completely"], instructions: ["Staystitch neck immediately"] },
            { id: "g2", name: "Buba Back", shape: "back_bodice", dims: "48 × 52 cm", qty: 1, notes: ["Cut on fold"], instructions: ["Join shoulders", "Press seams"] },
            { id: "g3", name: "Buba Sleeve", shape: "sleeve", dims: "36 × 55 cm", qty: 2, notes: ["Often 3/4 length"], instructions: ["Set sleeve", "Decorate cuff edge"] },
            { id: "g4", name: "Iro Wrapper", shape: "skirt_panel", dims: "200 × 120 cm", qty: 1, notes: ["Large rectangle"], instructions: ["Double-fold hem edges"] },
            { id: "g5", name: "Ipele Shoulder Cloth", shape: "skirt_panel", dims: "80 × 60 cm", qty: 1, notes: ["Matching fabric"], instructions: ["Fringe or bead edges"] },
        ]
    },
    {
        id: 8, name: "Moroccan Kaftan", category: "Kaftan", region: "North Africa", origin: "Moroccan",
        difficulty: "Intermediate", fabric: "Velvet / Brocade / Silk",
        tags: ["ceremonial", "elegant", "North Africa", "feminine"], african: true,
        desc: "The Moroccan kaftan — a long, regal garment with a center front hook-and-eye closure, elaborate sgifa braid finish.",
        garmentKey: "kaftan", colors: { c1: "#5A1F1F", c2: "#D4A017", c3: "#C14B1A" },
        measurements: { "Bust": "88–96 cm", "Waist": "72–82 cm", "Hip": "96–108 cm", "Length": "140 cm", "Sleeve": "58 cm" },
        pieces: [
            { id: "kf1", name: "Kaftan Front", shape: "front_bodice", dims: "55 × 140 cm", qty: 2, notes: ["CF edge completely interfaced"], instructions: ["Apply sfifa braid to CF"] },
            { id: "kf2", name: "Kaftan Back", shape: "back_bodice", dims: "55 × 140 cm", qty: 1, notes: ["Long back hem"], instructions: ["French seams everywhere", "Double hem"] },
            { id: "kf3", name: "Kaftan Sleeve", shape: "sleeve", dims: "42 × 60 cm", qty: 2, notes: ["Very flared"], instructions: ["Join sleeve seam", "Apply sfifa cuff"] },
            { id: "kf4", name: "Collar Band", shape: "collar", dims: "38 × 12 cm", qty: 2, notes: ["Interface upper side"], instructions: ["Finish embroidery", "Grade seams"] },
        ]
    },
    {
        id: 9, name: "Isiagu Ceremonial Top", category: "Isiagu", region: "West Africa", origin: "Igbo",
        difficulty: "Intermediate", fabric: "Embossed Fabric (Lion Print)",
        tags: ["ceremonial", "Igbo", "chieftaincy", "formal"], african: true,
        desc: "The Igbo isiagu (literally 'head of the leopard') — a ceremonial top featuring embossed lion or leopard head motifs.",
        garmentKey: "isiagu", colors: { c1: "#8B0000", c2: "#D4A017", c3: "#0E0C09" },
        measurements: { "Chest": "88–96 cm", "Waist": "Free", "Length": "72 cm", "Sleeve": "60 cm" },
        pieces: [
            { id: "is1", name: "Front Body", shape: "front_bodice", dims: "50 × 72 cm", qty: 2, notes: ["Button front opening"], instructions: ["Match lion pattern seamlessly"] },
            { id: "is2", name: "Back Body", shape: "back_bodice", dims: "50 × 72 cm", qty: 1, notes: ["Lion motif centered"], instructions: ["Join shoulders"] },
            { id: "is3", name: "Long Sleeve", shape: "sleeve", dims: "38 × 62 cm", qty: 2, notes: ["Motifs centered on cap"], instructions: ["Set with ease", "Attach gold cuff details"] },
        ]
    },
    {
        id: 10, name: "Wrapper Print Set", category: "Wrapper Set", region: "West Africa", origin: "Pan-West African",
        difficulty: "Beginner", fabric: "Ankara / Wax Print",
        tags: ["casual", "ankara", "everyday", "colourful"], african: true,
        desc: "The versatile two-piece wax print set — a peplum or cropped top with a matching wrapper skirt.",
        garmentKey: "wrapper_set", colors: { c1: "#4A0E6B", c2: "#D4A017", c3: "#C14B1A" },
        measurements: { "Bust": "84–92 cm", "Waist": "68–76 cm", "Hip": "90–100 cm", "Top Len.": "55 cm", "Skirt Len.": "100 cm" },
        pieces: [
            { id: "w1", name: "Top Front", shape: "front_bodice", dims: "46 × 55 cm", qty: 1, notes: ["Cut on fold"], instructions: ["Staystitch neck", "Add peplum finish"] },
            { id: "w2", name: "Top Back", shape: "back_bodice", dims: "46 × 55 cm", qty: 1, notes: ["Zipper backing optionally"], instructions: ["Join block"] },
            { id: "w3", name: "Wrapper Skirt Panel", shape: "skirt_panel", dims: "110 × 100 cm", qty: 2, notes: ["Align wax print pattern"], instructions: ["Left side overlap", "Waistband finish"] },
            { id: "w4", name: "Pocket Bag", shape: "pocket", dims: "18 × 20 cm", qty: 2, notes: ["Add in seams"], instructions: ["Attach to side seams", "Secure opening with backstitch"] },
        ]
    },
    {
        id: 11, name: "Classic A-Line Dress", category: "Dress", region: "International", origin: "Classic",
        difficulty: "Beginner", fabric: "Woven Cotton / Crepe",
        tags: ["formal", "everyday", "versatile"], african: false,
        desc: "A timeless A-line dress with fitted bodice, defined waist, and flared skirt.",
        garmentKey: "aline_dress", colors: { c1: "#2D6A4F", c2: "#D4A017", c3: "#F7F2E8" },
        measurements: { "Bust": "86–92 cm", "Waist": "68–74 cm", "Hip": "92–98 cm", "Length": "100 cm", "Sleeve": "N/A", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "al1", name: "Front Bodice", shape: "front_bodice", dims: "42×38 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Staystitch neck", "Sew side darts"] },
            { id: "al2", name: "Back Bodice", shape: "back_bodice", dims: "42×37 cm", qty: 2, notes: ["Add CB allowance"], instructions: ["Install zipper"] },
            { id: "al3", name: "Front Skirt", shape: "skirt_panel", dims: "60×70 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Understitch facing"] },
            { id: "al4", name: "Back Skirt", shape: "skirt_panel", dims: "60×70 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Hem at 2.5cm"] },
        ]
    },
    {
        id: 12, name: "Tailored Blazer", category: "Blazer", region: "International", origin: "Classic",
        difficulty: "Advanced", fabric: "Suiting / Wool Blend",
        tags: ["formal", "structured", "unisex"], african: false,
        desc: "A single-breasted notch lapel blazer with set-in sleeves and welt pockets — the definitive tailoring challenge.",
        garmentKey: "blazer", colors: { c1: "#1A3A5C", c2: "#F7F2E8", c3: "#D4A017" },
        measurements: { "Chest": "92–98 cm", "Waist": "78–84 cm", "Hip": "98–104 cm", "Length": "72 cm", "Sleeve": "62 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "bl1", name: "Front Panel", shape: "front_bodice", dims: "48×72 cm", qty: 2, notes: ["Mirror panel"], instructions: ["Interface woven fusible", "Baste collar layer"] },
            { id: "bl2", name: "Back Panel", shape: "back_bodice", dims: "45×72 cm", qty: 2, notes: ["Interface upper back"], instructions: ["Sew back seam over roll"] },
            { id: "bl3", name: "Set-In Sleeve", shape: "sleeve", dims: "36×65 cm", qty: 2, notes: ["Ease cap"], instructions: ["Two ease stitch rows", "Steam shrinkage"] },
            { id: "bl4", name: "Notch Collar", shape: "collar", dims: "32×18 cm", qty: 2, notes: ["Upper only"], instructions: ["Grade under collar narrower"] },
        ]
    },
    {
        id: 13, name: "Wide-Leg Trousers", category: "Trousers", region: "International", origin: "Classic",
        difficulty: "Intermediate", fabric: "Crepe / Linen",
        tags: ["casual", "wide-leg", "comfortable"], african: false,
        desc: "High-waisted wide-leg trousers with side pockets and a clean front crease.",
        garmentKey: "trousers", colors: { c1: "#2C1810", c2: "#8B7355", c3: "#D4A017" },
        measurements: { "Waist": "70–76 cm", "Hip": "96–102 cm", "Rise": "28 cm", "Inseam": "80 cm", "Outseam": "108 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "tr1", name: "Front Leg", shape: "trouser_front", dims: "52×110 cm", qty: 2, notes: ["Mark crease line"], instructions: ["Staystitch crotch 1cm", "Sew inseam/side seam"] },
            { id: "tr2", name: "Back Leg", shape: "trouser_front", dims: "55×110 cm", qty: 2, notes: ["Deep back crotch"], instructions: ["Ease back leg seat", "Leave waist 5cm opening elastic"] },
            { id: "tr3", name: "Waistband", shape: "waistband", dims: "80×8 cm", qty: 1, notes: ["Straight grain"], instructions: ["Attach right sides together"] },
        ]
    },
    {
        id: 14, name: "Puff Sleeve Blouse", category: "Blouse", region: "International", origin: "Classic",
        difficulty: "Intermediate", fabric: "Lightweight Cotton / Chiffon",
        tags: ["romantic", "feminine", "blouse"], african: false,
        desc: "A romantic gathered puff-sleeve blouse with scoop neck and button placket.",
        garmentKey: "puff_blouse", colors: { c1: "#C14B1A", c2: "#F7F2E8", c3: "#D4A017" },
        measurements: { "Bust": "84–90 cm", "Waist": "70–76 cm", "Length": "60 cm", "Sleeve": "58 cm" },
        pieces: [
            { id: "pb1", name: "Front Bodice", shape: "front_bodice", dims: "38×60 cm", qty: 1, notes: ["Placket front"], instructions: ["Interface plackets", "Staystitch scoop"] },
            { id: "pb2", name: "Back Bodice", shape: "back_bodice", dims: "38×60 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Gather yoke overlay"] },
            { id: "pb3", name: "Puff Sleeve", shape: "sleeve", dims: "52×60 cm", qty: 2, notes: ["Gather both sides"], instructions: ["Gather to match armhole length"] },
        ]
    },
];

export const CATS = ["All", "Agbada", "Senator", "Dashiki", "Boubou", "Kente", "Adire", "Gele Set", "Kaftan", "Isiagu", "Wrapper Set", "Dress", "Blazer", "Trousers", "Blouse"];
export const REGIONS = ["All Regions", "West Africa", "North Africa", "International"];
export const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced", "Expert"];
