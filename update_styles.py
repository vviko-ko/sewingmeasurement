new_styles = """const STYLES: GarmentStyle[] = [
    {
        id: 1, name: "Grand Agbada", category: "Agbada", region: "West Africa", origin: "Yoruba",
        difficulty: "Advanced", fabric: "Brocade / Damask", tags: ["ceremonial", "royalty", "aso-ebi"], african: true,
        garmentType: "agbada", accent: "#D4A017", bg: "#0E0A04",
        desc: "The quintessential Yoruba ceremonial three-piece ensemble — outer robe, buba inner shirt, and sokoto trousers with heavy embroidery.",
        measurements: { "Chest": "96–104 cm", "Waist": "84–92 cm", "Hip": "102–110 cm", "Robe Len.": "150 cm", "Sleeve": "62 cm", "Seam Allow.": "2 cm" },
        pieces: [
            { id: "ag1", name: "Outer Agbada Robe", shape: "agbada_outer", dims: "280×150 cm", qty: 1, notes: ["Cut 1 full width on grain", "Mark center front opening", "Allow 5cm at hem"], instructions: ["Hem all four edges first", "Reinforce CF opening with interfacing", "Apply embroidery before final pressing"] },
            { id: "ag2", name: "Inner Agbada Facing", shape: "agbada_inner", dims: "50×140 cm", qty: 1, notes: ["Cut 1 on fold", "Heavy interfacing required"], instructions: ["Staystitch neck opening", "Attach to outer robe right sides together"] },
            { id: "ag3", name: "Buba Front Bodice", shape: "front_bodice", dims: "58×70 cm", qty: 1, notes: ["Cut 1 on fold", "Mark embroidery lines at collar and cuffs"], instructions: ["Embroider before assembly", "Interface collar edge", "Staystitch neckline at 1.2cm"] },
            { id: "ag4", name: "Buba Back Bodice", shape: "back_bodice", dims: "58×70 cm", qty: 2, notes: ["Cut 2 mirror", "CB seam or fold"], instructions: ["Join shoulders first", "Press seams open over tailor's ham"] },
            { id: "ag5", name: "Buba Sleeve", shape: "buba_sleeve", dims: "65×40 cm", qty: 2, notes: ["Cut 2", "Wide straight sleeve"], instructions: ["Set sleeve flat", "Sew underarm and side seam in one pass"] },
            { id: "ag6", name: "Embroidery Panel", shape: "embroidery_panel", dims: "20×55 cm", qty: 2, notes: ["Cut 2 from contrasting fabric", "Complete embroidery before cutting"], instructions: ["Slipstitch to garment over lining", "Press all edges under"] },
            { id: "ag7", name: "Sokoto Trouser Front", shape: "trouser_front", dims: "58×110 cm", qty: 2, notes: ["Cut 2 mirror", "Very wide leg", "Maintain grain strictly"], instructions: ["Sew inseam with French seam", "Add 6cm elastic casing", "Hemstitch at 3cm"] },
            { id: "ag8", name: "Sokoto Trouser Back", shape: "trouser_back", dims: "62×112 cm", qty: 2, notes: ["Cut 2 mirror", "Deeper crotch curve"], instructions: ["Join to front at side seams", "Sew crotch seam twice for strength"] }
        ]
    },
    {
        id: 2, name: "Senator Suit", category: "Senator", region: "West Africa", origin: "Pan-Nigerian",
        difficulty: "Intermediate", fabric: "Linen / Cotton", tags: ["formal", "everyday", "political"], african: true,
        garmentType: "senator", accent: "#4A8FD4", bg: "#040810",
        desc: "The modern Nigerian Senator suit — structured tunic top and straight trousers heavily influenced by minimalist tailoring.",
        measurements: { "Chest": "90–98 cm", "Waist": "78–86 cm", "Hip": "96–104 cm", "Top Len.": "90 cm", "Trouser": "110 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "se1", name: "Top Front", shape: "front_bodice", dims: "55×95 cm", qty: 1, notes: ["Cut 1 on fold", "Notch CF slit", "Block fuse CF placket area"], instructions: ["Construct hidden placket", "Attach breast welt pocket"] },
            { id: "se2", name: "Top Back", shape: "back_bodice", dims: "55×95 cm", qty: 1, notes: ["Cut 1 on fold", "Dart shaping at waist optional"], instructions: ["Sew shoulder seams to front", "Add back darts if preferred"] },
            { id: "se3", name: "Hidden Placket", shape: "placket", dims: "15×45 cm", qty: 2, notes: ["Cut 2", "Apply stiff interfacing"], instructions: ["Sew hidden buttonholes", "Edgestitch to CF"] },
            { id: "se4", name: "Senator Collar", shape: "collar", dims: "42×8 cm", qty: 2, notes: ["Cut 2", "Mandarin style collar", "Heavy interfacing"], instructions: ["Sew collar points", "Turn, press, and topstitch at 2mm"] },
            { id: "se5", name: "Long Sleeve", shape: "sleeve", dims: "35×65 cm", qty: 2, notes: ["Cut 2 mirror", "Match cap notches to armhole"], instructions: ["Ease sleeve cap", "Insert into armscye", "Finish cuff with placket"] },
            { id: "se6", name: "Sleeve Cuff", shape: "sleeve_cuff", dims: "28×12 cm", qty: 2, notes: ["Cut 2", "Block fuse"], instructions: ["Attach to sleeve hem", "Add buttonholes"] },
            { id: "se7", name: "Trouser Front", shape: "trouser_front", dims: "40×115 cm", qty: 2, notes: ["Cut 2 mirror", "Mark pleats and pocket placement"], instructions: ["Sew front pleats", "Insert side pockets", "Assemble zip fly"] },
            { id: "se8", name: "Trouser Back", shape: "trouser_back", dims: "45×115 cm", qty: 2, notes: ["Cut 2 mirror", "Mark back darts"], instructions: ["Sew back darts", "Join inseams and outseams"] },
            { id: "se9", name: "Fly Shield", shape: "fly_shield", dims: "8×22 cm", qty: 1, notes: ["Cut 1", "Fold in half and interface"], instructions: ["Attach to zipper flat", "Sew to left trouser front"] },
            { id: "se10", name: "Waistband", shape: "waistband", dims: "105×10 cm", qty: 1, notes: ["Cut 1", "Use trouser waistband interfacing"], instructions: ["Attach continuously to waist", "Finish ends cleanly"] },
            { id: "se11", name: "Pocket Bag", shape: "pocket_bag", dims: "20×30 cm", qty: 4, notes: ["Cut 4 from pocketing cotton"], instructions: ["Attach to trouser side seam", "Bag out and topstitch"] }
        ]
    },
    {
        id: 3, name: "Dashiki Tunic", category: "Dashiki", region: "West Africa", origin: "Yoruba",
        difficulty: "Beginner", fabric: "Angelina Print / Cotton", tags: ["casual", "streetwear", "pan-african"], african: true,
        garmentType: "dashiki", accent: "#C14B1A", bg: "#0A0402",
        desc: "A loose-fitting pull-over tunic characterized by its V-neckline and ornate printed or embroidered central positioning.",
        measurements: { "Chest": "110–120 cm", "Waist": "110–120 cm", "Len.": "80 cm", "Sleeve": "25 cm" },
        pieces: [
            { id: "da1", name: "Tunic Front", shape: "front_bodice", dims: "65×85 cm", qty: 1, notes: ["Cut 1 on fold", "Center the print motif perfectly", "Mark V-neck plunge"], instructions: ["Interface V-neck facing", "Apply front pocket bags"] },
            { id: "da2", name: "Tunic Back", shape: "back_bodice", dims: "65×85 cm", qty: 1, notes: ["Cut 1 on fold", "Match print across side seams if possible"], instructions: ["Sew shoulder seams", "Sew side seams leaving hem splits"] },
            { id: "da3", name: "Front Facing", shape: "front_facing", dims: "30×40 cm", qty: 1, notes: ["Cut 1 on fold", "Light interfacing"], instructions: ["Pin right sides to V-neck", "Sew, clip corners, turn inside and press"] },
            { id: "da4", name: "Back Neck Facing", shape: "back_facing", dims: "30×12 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Attach to back neckline", "Join to front facing at shoulders"] },
            { id: "da5", name: "Short Sleeve", shape: "sleeve", dims: "40×35 cm", qty: 2, notes: ["Cut 2", "Wide straight drop-shoulder sleeve"], instructions: ["Sew flat into armhole before side seams", "Hem 3cm"] },
            { id: "da6", name: "Patch Pocket", shape: "pocket", dims: "20×22 cm", qty: 2, notes: ["Cut 2", "Center print motif on pocket identical to underlying fabric"], instructions: ["Turn top edge twice and stitch", "Press remaining edges and topstitch to front bodices"] }
        ]
    },
    {
        id: 4, name: "Grand Boubou", category: "Boubou", region: "West Africa", origin: "Senegal / Mali",
        difficulty: "Advanced", fabric: "Bazin Riche", tags: ["formal", "voluminous", "embroidery"], african: true,
        garmentType: "boubou", accent: "#5C3A8A", bg: "#07030E",
        desc: "A flowing, floor-length wide-sleeved robe worn across the Sahel, defined by heavy starching and intricate chest embroidery.",
        measurements: { "Total Width": "150 cm", "Len.": "160 cm", "Neck Drop": "22 cm", "Seam Allow.": "none (selvage)" },
        pieces: [
            { id: "bo1", name: "Main Body Panel", shape: "agbada_outer", dims: "150×320 cm", qty: 1, notes: ["Cut 1 continuous piece (front to back)", "Fold at shoulders", "Do not cut neck opening until embroidery layout is confirmed"], instructions: ["Fold fabric in half", "Mark center front and neck opening"] },
            { id: "bo2", name: "Neck Opening", shape: "embroidery_panel", dims: "30×45 cm", qty: 1, notes: ["Cut 1 template for embroidery placing"], instructions: ["Draw embroidery motif directly on fabric", "Send for machine embroidery"] },
            { id: "bo3", name: "Neck Facing", shape: "front_facing", dims: "30×50 cm", qty: 1, notes: ["Cut 1", "Heavy interfacing"], instructions: ["Apply facing to neck hole", "Turn and catch stitch blindly under embroidery"] },
            { id: "bo4", name: "Side Gussets", shape: "side_panel", dims: "15×40 cm", qty: 2, notes: ["Cut 2", "Optional for extra drape"], instructions: ["Insert into side seams at hem level"] }
        ]
    },
    {
        id: 5, name: "Kente Kaba & Slit", category: "Kente", region: "West Africa", origin: "Ashanti / Ghana",
        difficulty: "Expert", fabric: "Woven Kente Cloth", tags: ["bridal", "traditional", "woven"], african: true,
        garmentType: "kente", accent: "#E5A910", bg: "#0A0800",
        desc: "A traditional Ghanaian two-piece consisting of a tailored kaba (blouse) and long slit (skirt), meticulously matching hand-woven strips.",
        measurements: { "Bust": "92–100 cm", "Waist": "74–82 cm", "Hip": "100–108 cm", "Skirt Len.": "115 cm" },
        pieces: [
            { id: "ke1", name: "Kaba Front", shape: "front_bodice", dims: "55×65 cm", qty: 1, notes: ["Cut 1", "Center Kente motif PERFECTLY", "Block fuse"], instructions: ["Sew princess seams", "Apply rigid boning to seams"] },
            { id: "ke2", name: "Kaba Side Front", shape: "side_panel", dims: "25×65 cm", qty: 2, notes: ["Cut 2 mirror", "Match horizontal stripes to Center Front"], instructions: ["Join to front bodice", "Press seams open"] },
            { id: "ke3", name: "Kaba Back", shape: "back_bodice", dims: "35×65 cm", qty: 2, notes: ["Cut 2 mirror", "Match stripes at CB zipper"], instructions: ["Insert invisible zipper at CB", "Join to side front"] },
            { id: "ke4", name: "Peplum Flare", shape: "skirt_panel", dims: "40×30 cm", qty: 3, notes: ["Cut 3", "Ensure weave runs vertically"], instructions: ["Gather or pleat", "Attach to Kaba waist"] },
            { id: "ke5", name: "Puff Sleeve", shape: "buba_sleeve", dims: "45×40 cm", qty: 2, notes: ["Cut 2", "Use stiff organza inside for volume"], instructions: ["Gather sleeve head heavily", "Set into armhole"] },
            { id: "ke6", name: "Skirt Front", shape: "trouser_front", dims: "55×120 cm", qty: 1, notes: ["Cut 1 on fold", "Line fully with cotton"], instructions: ["Sew waist darts", "Attach to back pieces"] },
            { id: "ke7", name: "Skirt Back", shape: "trouser_back", dims: "32×120 cm", qty: 2, notes: ["Cut 2", "Leave 45cm slit at bottom center back"], instructions: ["Sew CB seam down to slit notch", "Insert zip"] },
            { id: "ke8", name: "Waistband", shape: "waistband", dims: "90×8 cm", qty: 1, notes: ["Cut 1", "Interface heavily"], instructions: ["Attach to skirt", "Add hook and bar closure"] }
        ]
    },
    {
        id: 6, name: "Adire Maxi Dress", category: "Adire", region: "West Africa", origin: "Nigeria",
        difficulty: "Beginner", fabric: "Indigo Dyed Cotton", tags: ["resort", "dyed", "flowing"], african: true,
        garmentType: "adire", accent: "#1A3B8A", bg: "#030810",
        desc: "A free-flowing, A-line maxi dress showcasing the beauty of indigo resist-dye patterns with minimal seam disruption.",
        measurements: { "Bust": "100–110 cm", "Waist": "Free", "Len.": "145 cm", "Sweep": "240 cm" },
        pieces: [
            { id: "ad1", name: "Dress Front", shape: "front_bodice", dims: "80×155 cm", qty: 1, notes: ["Cut 1 on fold", "Position favored dye motif across chest"], instructions: ["Sew bust darts if needed", "Finish neckline with bias binding"] },
            { id: "ad2", name: "Dress Back", shape: "back_bodice", dims: "80×155 cm", qty: 1, notes: ["Cut 1 on fold", "Optional CB seam for shaping"], instructions: ["Join shoulders to front", "Join side seams"] },
            { id: "ad3", name: "Inseam Pocket", shape: "pocket_bag", dims: "20×30 cm", qty: 4, notes: ["Cut 4"], instructions: ["Attach to side seams at waist mark", "Sew around pocket bag while doing side seam"] },
            { id: "ad4", name: "Neck Binding", shape: "kente_strip", dims: "70×4 cm", qty: 1, notes: ["Cut 1 on true bias"], instructions: ["Fold and press", "Apply to neckline for clean finish"] }
        ]
    },
    {
        id: 7, name: "Iro & Buba (Gele Set)", category: "Aso-Oke", region: "West Africa", origin: "Yoruba",
        difficulty: "Intermediate", fabric: "Aso-Oke / Lace", tags: ["wedding", "traditional", "intricate"], african: true,
        garmentType: "gele", accent: "#8A2B3D", bg: "#080402",
        desc: "The classic four-piece Yoruba womenswear: Iro (wrapper), Buba (blouse), Gele (headtie), and Ipele (shoulder sash).",
        measurements: { "Wrapper Wrap": "200 cm", "Bust": "104 cm", "Gele Len.": "250 cm" },
        pieces: [
            { id: "ge1", name: "Buba Front", shape: "front_bodice", dims: "65×70 cm", qty: 1, notes: ["Cut 1", "Round or sweetheart neck"], instructions: ["Line with skin-tone sweetheart lining", "Sew shoulder seams"] },
            { id: "ge2", name: "Buba Back", shape: "back_bodice", dims: "35×70 cm", qty: 2, notes: ["Cut 2", "CB zip"], instructions: ["Insert zipper", "Sew side seams"] },
            { id: "ge3", name: "Buba Sleeve", shape: "buba_sleeve", dims: "45×60 cm", qty: 2, notes: ["Cut 2", "Wide sleeves (3/4 length)"], instructions: ["Gather slightly at cap", "Sew into armhole"] },
            { id: "ge4", name: "Iro (Wrapper)", shape: "wrapper_panel", dims: "200×115 cm", qty: 1, notes: ["Cut 1 large rectangle", "Use Aso-Oke strips sewn together"], instructions: ["Hem all edges", "Add wrapper ties if desired"] },
            { id: "ge5", name: "Gele (Headtie)", shape: "gele_tie", dims: "250×50 cm", qty: 1, notes: ["Cut 1 from stiff Aso-Oke"], instructions: ["Hem edges", "Pleat while tying on head"] },
            { id: "ge6", name: "Ipele (Sash)", shape: "gele_tie", dims: "150×30 cm", qty: 1, notes: ["Cut 1"], instructions: ["Hem and embellish edges with fringe"] }
        ]
    },
    {
        id: 8, name: "Moroccan Kaftan", category: "Kaftan", region: "North Africa", origin: "Morocco",
        difficulty: "Advanced", fabric: "Silk Crepe / Velvet", tags: ["bridal", "embellished", "sfifa"], african: true,
        garmentType: "kaftan", accent: "#8B0000", bg: "#0A0202",
        desc: "An exquisite single or double-layered gown featuring intricate sfifa braiding, aakad (knotted buttons), and luxurious drape.",
        measurements: { "Bust": "96 cm", "Waist": "80 cm", "Hip": "104 cm", "Len.": "165 cm", "Sleeve": "60 cm" },
        pieces: [
            { id: "ka1", name: "Front Panel", shape: "front_bodice", dims: "45×170 cm", qty: 2, notes: ["Cut 2 mirror", "Deep V or scoop neck", "CF open to hem"], instructions: ["Apply sfifa braid entirely down CF edge", "Attach aakad buttons"] },
            { id: "ka2", name: "Back Panel", shape: "back_bodice", dims: "90×170 cm", qty: 1, notes: ["Cut 1 on fold", "Add godet slit at CB if needed"], instructions: ["Sew shoulder seams to front", "Sew side seams"] },
            { id: "ka3", name: "Bell Sleeve", shape: "sleeve", dims: "40×65 cm", qty: 2, notes: ["Cut 2", "Widens significantly at cuff"], instructions: ["Apply sfifa to cuff", "Set sleeve into armhole"] },
            { id: "ka4", name: "Side Godet", shape: "side_panel", dims: "30×80 cm", qty: 2, notes: ["Cut 2", "For extra hem sweep"], instructions: ["Insert into lower side seams"] },
            { id: "ka5", name: "Belt (Mdamma)", shape: "waistband", dims: "90×12 cm", qty: 1, notes: ["Cut 1", "Use stiff buckram inner"], instructions: ["Cover with fabric", "Embroider heavily", "Attach hooks"] }
        ]
    },
    {
        id: 9, name: "Isiagu Tunic", category: "Isiagu", region: "West Africa", origin: "Igbo",
        difficulty: "Intermediate", fabric: "Velvet Isiagu Print", tags: ["chieftaincy", "traditional", "lion-head"], african: true,
        garmentType: "isiagu", accent: "#9B1B30", bg: "#060208",
        desc: "A pullover shirt often made of velvet patterned with lion heads, featuring a breast pocket, gold buttons linked by chains, and a mandarin collar.",
        measurements: { "Chest": "105–115 cm", "Len.": "85 cm", "Sleeve": "63 cm", "Cross-Back": "46 cm" },
        pieces: [
            { id: "is1", name: "Tunic Front", shape: "front_bodice", dims: "60×90 cm", qty: 1, notes: ["Cut 1 on fold", "Match lion heads at CF fold"], instructions: ["Cut CF slit for placket", "Attach breast pocket matching print"] },
            { id: "is2", name: "Tunic Back", shape: "back_bodice", dims: "60×90 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Join shoulders to front"] },
            { id: "is3", name: "Front Placket", shape: "placket", dims: "10×35 cm", qty: 2, notes: ["Cut 2", "Heavy interfacing"], instructions: ["Attach to CF slit", "Add gold chain buttons"] },
            { id: "is4", name: "Mandarin Collar", shape: "collar", dims: "45×6 cm", qty: 2, notes: ["Cut 2", "Shape curves gently"], instructions: ["Sew and turn", "Attach to neckline"] },
            { id: "is5", name: "Long Sleeve", shape: "sleeve", dims: "45×68 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Sew into armhole", "Finish with hem or cuff"] },
            { id: "is6", name: "Breast Pocket", shape: "pocket", dims: "14×16 cm", qty: 1, notes: ["Cut 1", "Must pattern-match to front body perfectly"], instructions: ["Fold top edge", "Topstitch to left chest"] }
        ]
    },
    {
        id: 10, name: "Ankara Matching Set", category: "Coordinates", region: "West Africa", origin: "Contemporary",
        difficulty: "Intermediate", fabric: "Ankara Wax Print", tags: ["casual", "vibrant", "two-piece"], african: true,
        garmentType: "wrapper", accent: "#2A7B5C", bg: "#020A06",
        desc: "A modern two-piece utilizing colorful wax prints, consisting of a tailored peplum blouse and a matching wrap skirt or trousers.",
        measurements: { "Bust": "92 cm", "Waist": "72 cm", "Hip": "98 cm", "Top Len.": "60 cm", "Skirt Len.": "105 cm" },
        pieces: [
            { id: "an1", name: "Peplum Front Bodice", shape: "front_bodice", dims: "30×45 cm", qty: 2, notes: ["Cut 2", "Center front seam or zipper"], instructions: ["Sew princess darts", "Line bodice"] },
            { id: "an2", name: "Peplum Side Front", shape: "side_panel", dims: "20×45 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Attach to front bodice"] },
            { id: "an3", name: "Peplum Back Bodice", shape: "back_bodice", dims: "30×45 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Sew back darts", "Join to front at sides"] },
            { id: "an4", name: "Peplum Circle Flare", shape: "skirt_panel", dims: "80×80 cm", qty: 1, notes: ["Cut 1 full circle or 2 half circles"], instructions: ["Hem outer edge first", "Attach inner circle to bodice waist"] },
            { id: "an5", name: "Wrap Skirt Panel", shape: "wrapper_panel", dims: "140×110 cm", qty: 1, notes: ["Cut 1 wide rectangle", "Wrap style"], instructions: ["Create angled wrap at one end", "Hem entire perimeter"] },
            { id: "an6", name: "Skirt Waistband", shape: "waistband", dims: "200×8 cm", qty: 1, notes: ["Cut 1 long tie"], instructions: ["Attach to skirt top edge", "Leave long ends for tying around waist"] }
        ]
    },
    {
        id: 11, name: "Classic A-Line Dress", category: "Dresses", region: "International", origin: "Global",
        difficulty: "Beginner", fabric: "Cotton / Rayon", tags: ["everyday", "simple", "fitted"], african: false,
        garmentType: "adress", accent: "#4A5A7A", bg: "#040608",
        desc: "A simple, timeless A-Line dress fitted at the bodice and softly flared at the hem, suitable for endless modifications.",
        measurements: { "Bust": "90 cm", "Waist": "70 cm", "Hip": "98 cm", "Len.": "95 cm" },
        pieces: [
            { id: "al1", name: "Dress Front", shape: "front_bodice", dims: "65×100 cm", qty: 1, notes: ["Cut 1 on fold", "Mark bust and waist darts"], instructions: ["Sew bust darts", "Sew front waist darts", "Press darts downwards and towards center"] },
            { id: "al2", name: "Dress Back", shape: "back_bodice", dims: "35×100 cm", qty: 2, notes: ["Cut 2", "CB seam for zipper"], instructions: ["Sew back waist darts", "Insert 50cm invisible zipper at CB"] },
            { id: "al3", name: "Front Neck Facing", shape: "front_facing", dims: "30×15 cm", qty: 1, notes: ["Cut 1 on fold", "Interface"], instructions: ["Attach and understitch to front neckline"] },
            { id: "al4", name: "Back Neck Facing", shape: "back_facing", dims: "18×15 cm", qty: 2, notes: ["Cut 2", "Interface"], instructions: ["Join to front facing at shoulder", "Attach to back neckline"] }
        ]
    },
    {
        id: 12, name: "Tailored Blazer", category: "Jackets", region: "International", origin: "Global",
        difficulty: "Expert", fabric: "Wool / Tweed", tags: ["tailoring", "formal", "structured"], african: false,
        garmentType: "blazer", accent: "#8A6B4E", bg: "#080604",
        desc: "A highly complex tailored jacket featuring notched lapels, two-piece sleeves, welt pockets, and full lining.",
        measurements: { "Chest": "96 cm", "Waist": "84 cm", "Len.": "74 cm", "Shoulder": "44 cm", "Sleeve": "64 cm" },
        pieces: [
            { id: "bl1", name: "Jacket Front", shape: "front_bodice", dims: "40×80 cm", qty: 2, notes: ["Cut 2 mirror", "Apply hair canvas/fusible interfacing entirely", "Mark roll line"], instructions: ["Pad stitch lapel", "Create front darts", "Cut welt pocket slit"] },
            { id: "bl2", name: "Side Panel", shape: "side_panel", dims: "25×75 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Join to front panel", "Join to back panel"] },
            { id: "bl3", name: "Jacket Back", shape: "back_bodice", dims: "35×80 cm", qty: 2, notes: ["Cut 2 mirror", "CB seam with vent allowance"], instructions: ["Sew CB seam", "Construct back vent"] },
            { id: "bl4", name: "Front Facing", shape: "lapel_facing", dims: "20×80 cm", qty: 2, notes: ["Cut 2 mirror", "Interface fully as this forms the lapel top"], instructions: ["Sew to front jacket edge along lapel and CF", "Turn and press impeccably"] },
            { id: "bl5", name: "Top Collar", shape: "top_collar", dims: "45×10 cm", qty: 1, notes: ["Cut 1 on fold", "Fabric cut slightly larger (2mm) than undercollar to hide seam"], instructions: ["Attach to front facings"] },
            { id: "bl6", name: "Undercollar", shape: "undercollar", dims: "25×10 cm", qty: 2, notes: ["Cut 2 on bias", "Cut from melton wool", "CB seam"], instructions: ["Sew CB seam", "Attach to jacket neckline", "Join to top collar"] },
            { id: "bl7", name: "Upper Sleeve", shape: "upper_sleeve", dims: "35×70 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Ease sleeve cap heavily", "Join inseam to under sleeve"] },
            { id: "bl8", name: "Under Sleeve", shape: "under_sleeve", dims: "20×70 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Join outseam to upper sleeve", "Construct sleeve vent with buttons"] },
            { id: "bl9", name: "Welt Pocket Flap", shape: "pocket_flap", dims: "18×8 cm", qty: 4, notes: ["Cut 4", "Interface 2"], instructions: ["Sew, turn, and press", "Base into pocket opening"] },
            { id: "bl10", name: "Pocket Bag", shape: "pocket_bag", dims: "20×25 cm", qty: 4, notes: ["Cut 4 from lining"], instructions: ["Attach to welt seams inside", "Sew bag closed"] },
            { id: "bl11", name: "Breast Welt", shape: "pocket_welt", dims: "15×6 cm", qty: 1, notes: ["Cut 1", "Cut on slight bias for effect"], instructions: ["Fold and press", "Construct welt opening on left chest"] }
        ]
    },
    {
        id: 13, name: "Wide-Leg Trousers", category: "Trousers", region: "International", origin: "Global",
        difficulty: "Advanced", fabric: "Gabardine / Twill", tags: ["tailoring", "bottoms", "pleated"], african: false,
        garmentType: "trousers", accent: "#7A3B46", bg: "#0A0205",
        desc: "High-waisted tailored trousers featuring deep front pleats, slant pockets, a zippered fly shield, and wide hems.",
        measurements: { "Waist": "76 cm", "Hip": "102 cm", "Outseam": "112 cm", "Inseam": "82 cm" },
        pieces: [
            { id: "tr1", name: "Trouser Front", shape: "trouser_front", dims: "45×120 cm", qty: 2, notes: ["Cut 2 mirror", "Mark crease lines firmly", "Mark pleat lines"], instructions: ["Fold and baste pleats", "Sew front darts if applicable"] },
            { id: "tr2", name: "Trouser Back", shape: "trouser_back", dims: "50×120 cm", qty: 2, notes: ["Cut 2 mirror", "Mark back darts and welt pocket placement"], instructions: ["Sew back waist darts", "Construct back welt pocket"] },
            { id: "tr3", name: "Curved Waistband", shape: "waistband", dims: "90×10 cm", qty: 2, notes: ["Cut 2", "Use ban-roll or stiff interfacing"], instructions: ["Attach to waist after fly is constructed", "Add belt loops"] },
            { id: "tr4", name: "Fly Shield", shape: "fly_shield", dims: "10×25 cm", qty: 1, notes: ["Cut 1 out of fashion fabric", "Fold in half"], instructions: ["Sew to left front crotch curve", "Attach zipper tape"] },
            { id: "tr5", name: "Fly Facing", shape: "fly_shield", dims: "8×25 cm", qty: 1, notes: ["Cut 1", "Interface fully"], instructions: ["Attach to right front crotch", "Topstitch J-curve"] },
            { id: "tr6", name: "Front Pocket Bag", shape: "pocket_bag", dims: "25×35 cm", qty: 4, notes: ["Cut 4 from pocketing"], instructions: ["Attach to slant pocket opening", "Understitch", "Sew bag closed"] },
            { id: "tr7", name: "Back Yoke (Optional)", shape: "yoke_back", dims: "45×15 cm", qty: 2, notes: ["Cut 2 mirror if modifying back for jeans-style"], instructions: ["Join to back leg", "Topstitch seam"] }
        ]
    },
    {
        id: 14, name: "Puff Sleeve Blouse", category: "Tops", region: "International", origin: "Global",
        difficulty: "Intermediate", fabric: "Organza / Poplin", tags: ["feminine", "statement", "blouse"], african: false,
        garmentType: "pblouse", accent: "#3B7A68", bg: "#020A06",
        desc: "A romantic button-down blouse dominated by extreme voluminous puff sleeves gathered tightly at the shoulder and cuff.",
        measurements: { "Bust": "94 cm", "Waist": "76 cm", "Top Len.": "60 cm", "Bicep": "Volume +30 cm" },
        pieces: [
            { id: "pb1", name: "Blouse Front", shape: "front_bodice", dims: "35×65 cm", qty: 2, notes: ["Cut 2 logitudinal", "Add 3cm for button placket fold"], instructions: ["Fold CF placket twice and topstitch", "Sew bust darts"] },
            { id: "pb2", name: "Blouse Back", shape: "back_bodice", dims: "60×65 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Sew shoulder and side seams to front"] },
            { id: "pb3", name: "Exaggerated Sleeve", shape: "buba_sleeve", dims: "70×60 cm", qty: 2, notes: ["Cut 2", "Extremely wide sleeve cap", "Notch heavily for gathering"], instructions: ["Run 2 rows of gathering stitches at cap", "Gather to fit armscye exactly"] },
            { id: "pb4", name: "Fitted Cuff", shape: "sleeve_cuff", dims: "25×15 cm", qty: 2, notes: ["Cut 2", "Heavy interface"], instructions: ["Gather sleeve hem into cuff", "Attach buttons"] },
            { id: "pb5", name: "Flat Collar", shape: "collar", dims: "45×12 cm", qty: 2, notes: ["Cut 2", "Peter pan or pointed style"], instructions: ["Sew, clip curves, turn and press", "Baste to neckline", "Finish with bias tape"] }
        ]
    }
];"""

import sys

filepath = "src/App.tsx"
with open(filepath, "r", encoding="utf-8") as file:
    content = file.read()

start_idx = content.find("const STYLES: GarmentStyle[] = [")
# End index is effectively the end of STYLES, before `export default function AtelierApp`
end_idx = content.find("export default function AtelierApp")

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_styles + "\n" + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as file:
    file.write(content)

print("STYLES array successfully updated with exhaustive piece lists!")
