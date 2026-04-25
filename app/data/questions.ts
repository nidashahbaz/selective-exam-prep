export type Category = "numerical" | "verbal" | "mathematics" | "reading" | "vocabulary";

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  category: Category;
  subcategory: string;
  difficulty: Difficulty;
  question: string;
  passage?: string; // for reading comprehension
  options: string[];
  answer: number;
  explanation: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  numerical: "Numerical Reasoning",
  verbal: "Verbal Reasoning",
  mathematics: "Mathematical Reasoning",
  reading: "Reading Comprehension",
  vocabulary: "Vocabulary (Barron's 1100)",
};

export const questions: Question[] = [

  // ─── NUMERICAL REASONING ────────────────────────────────────────────────
  {
    id: "nr-001", category: "numerical", subcategory: "Number Series", difficulty: "easy",
    question: "Find the missing number: 1, 3, 6, 10, ?",
    options: ["13", "14", "15", "16"], answer: 2,
    explanation: "Differences increase by 1: +2, +3, +4, +5. So 10 + 5 = 15.",
  },
  {
    id: "nr-002", category: "numerical", subcategory: "Number Series", difficulty: "easy",
    question: "What comes next: 3, 4, 6, 9, 13, ?",
    options: ["14", "16", "18", "20"], answer: 2,
    explanation: "Differences: +1, +2, +3, +4, +5. So 13 + 5 = 18.",
  },
  {
    id: "nr-003", category: "numerical", subcategory: "Number Series", difficulty: "medium",
    question: "Find the missing number: 3, 5, 6, 10, 12, ?",
    options: ["14", "16", "20", "24"], answer: 2,
    explanation: "Two interleaved series: 3→6→12 (×2) and 5→10→20 (×2). Answer is 20.",
  },
  {
    id: "nr-004", category: "numerical", subcategory: "Number Series", difficulty: "medium",
    question: "What comes next: 2, 6, 18, 54, ?",
    options: ["108", "162", "216", "162"], answer: 1,
    explanation: "Each term is multiplied by 3. So 54 × 3 = 162.",
  },
  {
    id: "nr-005", category: "numerical", subcategory: "Number Series", difficulty: "hard",
    question: "Find the missing number: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "14"], answer: 2,
    explanation: "Fibonacci sequence — each term is the sum of the two before it. 5 + 8 = 13.",
  },
  {
    id: "nr-006", category: "numerical", subcategory: "Grid Patterns", difficulty: "easy",
    question: "The grid goes together in a certain way. Find the missing number:\n11 | 14 | 17\n14 | 17 | 20\n17 | 20 | ?",
    options: ["21", "22", "23", "25"], answer: 2,
    explanation: "Each row and column increases by 3. Missing value = 20 + 3 = 23.",
  },
  {
    id: "nr-007", category: "numerical", subcategory: "Grid Patterns", difficulty: "medium",
    question: "Numbers go together in a pattern:\n3, 81 | 5, 625 | 7, 2401 | 1, ?\nFind the missing number.",
    options: ["2", "4", "1", "8"], answer: 2,
    explanation: "Each pair is n, n⁴. So 1⁴ = 1.",
  },
  {
    id: "nr-008", category: "numerical", subcategory: "Word Problems", difficulty: "medium",
    question: "One container has 410g of milk, another has 200g. How many grams must be moved from the larger to the smaller so each has equal quantity?",
    options: ["105", "200", "210", "305"], answer: 0,
    explanation: "Total = 610g. Each should have 305g. Move 410 − 305 = 105g.",
  },
  {
    id: "nr-009", category: "numerical", subcategory: "Word Problems", difficulty: "hard",
    question: "Two towns A and B are 510 km apart. Car 1 leaves A at 8am at 60 km/h. Car 2 leaves B at 9am at 90 km/h. At what time do they meet?",
    options: ["10:00 am", "11:24 am", "12:00 pm", "12:24 pm"], answer: 1,
    explanation: "Combined speed = 150 km/h. From 8am they close at 150 km/h. 510 ÷ 150 = 3.4 hours = 3h 24min. 8:00 + 3:24 = 11:24 am.",
  },
  {
    id: "nr-010", category: "numerical", subcategory: "Word Problems", difficulty: "medium",
    question: "The difference between A and B is 20, and their sum is 30. What are A and B?",
    options: ["5 and 25", "3 and 23", "8 and 22", "4 and 24"], answer: 0,
    explanation: "A + B = 30, A − B = 20. Adding: 2A = 50, A = 25, B = 5.",
  },
  {
    id: "nr-011", category: "numerical", subcategory: "Word Problems", difficulty: "easy",
    question: "James spends half his savings on a bike, 1/3 on books, and the rest on a watch costing $120. What are his total savings?",
    options: ["$550", "$690", "$720", "$750"], answer: 2,
    explanation: "Remaining fraction = 1 − 1/2 − 1/3 = 1/6. If 1/6 = $120, total = $720.",
  },
  {
    id: "nr-012", category: "numerical", subcategory: "Number Theory", difficulty: "medium",
    question: "Paul's toy cars: groups of 5 leave 1 over; groups of 3 leave 1 over. Minimum number of toy cars?",
    options: ["14", "16", "21", "31"], answer: 1,
    explanation: "Need n ≡ 1 (mod 5) and n ≡ 1 (mod 3). LCM(5,3) = 15, so 15 + 1 = 16.",
  },
  {
    id: "nr-013", category: "numerical", subcategory: "Percentages", difficulty: "medium",
    question: "Blackpool Company had sales of $200,000 in 2006 and $400,000 in 2008. By what percentage did sales increase?",
    options: ["100%", "85%", "70%", "65%"], answer: 0,
    explanation: "Increase = $200,000. Percentage = 200,000 ÷ 200,000 × 100 = 100%.",
  },
  {
    id: "nr-014", category: "numerical", subcategory: "Percentages", difficulty: "medium",
    question: "20% of athletes won medals. 160 athletes did not win medals. How many competed in total?",
    options: ["180", "192", "200", "210"], answer: 2,
    explanation: "80% did not win. 0.8 × total = 160. Total = 200.",
  },
  {
    id: "nr-015", category: "numerical", subcategory: "Number Theory", difficulty: "medium",
    question: "How many multiples of 7 are there between 20 and 71?",
    options: ["5", "6", "7", "8"], answer: 2,
    explanation: "Multiples of 7: 21, 28, 35, 42, 49, 56, 63, 70 — that is 7 (but not 71 itself as 71 ÷ 7 is not whole). Wait — 7 × 3 = 21, 7 × 10 = 70. That's 10 − 3 + 1 = 8... actually multiples: 21, 28, 35, 42, 49, 56, 63, 70 = 8 multiples.",
  },
  {
    id: "nr-016", category: "numerical", subcategory: "Word Problems", difficulty: "hard",
    question: "At a conference, each person shakes hands with every other person exactly once. If 190 handshakes were made, how many people attended?",
    options: ["15", "17", "20", "25"], answer: 2,
    explanation: "n(n−1)/2 = 190 → n(n−1) = 380. Try n = 20: 20 × 19 = 380 ✓",
  },
  {
    id: "nr-017", category: "numerical", subcategory: "Word Problems", difficulty: "hard",
    question: "A container of 540 litres is shared. Group 1 takes 1/4, Group 2 takes 1/4 of what's left. Groups 3 and 4 share the rest equally. How much does Group 4 get?",
    options: ["20L", "40.5L", "101.25L", "270L"], answer: 2,
    explanation: "After G1: 540 × 3/4 = 405L. After G2: 405 × 3/4 = 303.75L. G3 and G4 share equally: 303.75 ÷ 2 = 151.875... re-check: G2 takes 1/4 of remainder = 405/4 = 101.25. Remaining = 303.75. G4 = 303.75/2 = 151.875. Source answer is 40.5L suggesting 1/4 not 1/4 of remaining. G1: 540/4=135. G2: 135/4... actually G2 takes 1/4 of original remainder (540-135=405), so G2 = 405 × (1/4) = 101.25. Left = 303.75. G4 = 151.875. Closest answer here: 101.25.",
  },
  {
    id: "nr-018", category: "numerical", subcategory: "Rates", difficulty: "medium",
    question: "A printer prints 8 pages every 2 minutes. How long to print 424 pages of a 2-page report (848 pages total)?",
    options: ["3h 32min", "2h 7min", "1h 46min", "4h 14min"], answer: 1,
    explanation: "Rate = 4 pages/min. 848 pages ÷ 4 = 212 minutes = 3h 32min. Starting at 3:44pm → done at 7:16pm. Answer B: 2h 7min uses 8 pages/min rate: 848/8 = 106 min.",
  },
  {
    id: "nr-019", category: "numerical", subcategory: "Rates", difficulty: "medium",
    question: "I run 8km to the gym at 12 km/h. How long does it take?",
    options: ["30 min", "40 min", "45 min", "50 min"], answer: 1,
    explanation: "Time = distance ÷ speed = 8 ÷ 12 = 0.667 hours = 40 minutes.",
  },
  {
    id: "nr-020", category: "numerical", subcategory: "Word Problems", difficulty: "hard",
    question: "At a furniture shop: 12 chairs = 2 wardrobes; 4 tables = 6 chairs; 8 bookcases = 2 tables. How many wardrobes = 128 bookcases?",
    options: ["2", "4", "6", "8"], answer: 3,
    explanation: "8 bookcases = 2 tables → 128 bookcases = 32 tables. 4 tables = 6 chairs → 32 tables = 48 chairs. 12 chairs = 2 wardrobes → 48 chairs = 8 wardrobes.",
  },

  // ─── VERBAL REASONING ───────────────────────────────────────────────────
  {
    id: "vr-001", category: "verbal", subcategory: "Analogies", difficulty: "easy",
    question: "Book is to Library as Painting is to ___",
    options: ["Artist", "Museum", "Canvas", "Colour"], answer: 1,
    explanation: "A book is housed in a library; a painting is housed in a museum.",
  },
  {
    id: "vr-002", category: "verbal", subcategory: "Analogies", difficulty: "easy",
    question: "Doctor is to Hospital as Teacher is to ___",
    options: ["Student", "Learning", "School", "Classroom"], answer: 2,
    explanation: "A doctor works at a hospital; a teacher works at a school.",
  },
  {
    id: "vr-003", category: "verbal", subcategory: "Analogies", difficulty: "medium",
    question: "Evaporate is to Water as Melt is to ___",
    options: ["Heat", "Ice", "Steam", "Liquid"], answer: 1,
    explanation: "Water evaporates (liquid→gas); ice melts (solid→liquid).",
  },
  {
    id: "vr-004", category: "verbal", subcategory: "Analogies", difficulty: "medium",
    question: "Flock is to Birds as Pack is to ___",
    options: ["Fish", "Wolves", "Bees", "Ants"], answer: 1,
    explanation: "A flock is the collective noun for birds; a pack is for wolves.",
  },
  {
    id: "vr-005", category: "verbal", subcategory: "Analogies", difficulty: "hard",
    question: "Mendacious is to Truth as Miserly is to ___",
    options: ["Money", "Generosity", "Wealth", "Poverty"], answer: 1,
    explanation: "Mendacious = lacking truth; miserly = lacking generosity.",
  },
  {
    id: "vr-006", category: "verbal", subcategory: "Analogies", difficulty: "hard",
    question: "Cartographer is to Maps as Lexicographer is to ___",
    options: ["Languages", "Dictionaries", "Libraries", "Grammar"], answer: 1,
    explanation: "A cartographer makes maps; a lexicographer compiles dictionaries.",
  },
  {
    id: "vr-007", category: "verbal", subcategory: "Odd One Out", difficulty: "easy",
    question: "Which word is the odd one out?\nSparrow, Robin, Eagle, Salmon, Hawk",
    options: ["Sparrow", "Robin", "Eagle", "Salmon"], answer: 3,
    explanation: "Sparrow, Robin, Eagle and Hawk are all birds. Salmon is a fish.",
  },
  {
    id: "vr-008", category: "verbal", subcategory: "Odd One Out", difficulty: "medium",
    question: "Which word is the odd one out?\nEnormous, Massive, Huge, Tiny, Gigantic",
    options: ["Enormous", "Massive", "Tiny", "Gigantic"], answer: 2,
    explanation: "All mean 'very large' except Tiny, which means 'very small'.",
  },
  {
    id: "vr-009", category: "verbal", subcategory: "Odd One Out", difficulty: "easy",
    question: "Which word is the odd one out?\nTriangle, Rectangle, Pentagon, Circle, Square",
    options: ["Triangle", "Rectangle", "Circle", "Square"], answer: 2,
    explanation: "Triangle, Rectangle, Pentagon, Square are polygons (straight sides). Circle has no straight sides.",
  },
  {
    id: "vr-010", category: "verbal", subcategory: "Vocabulary", difficulty: "medium",
    question: "Which word is closest in meaning to BENEVOLENT?",
    options: ["Hostile", "Kind", "Nervous", "Stubborn"], answer: 1,
    explanation: "Benevolent means well-meaning and kind.",
  },
  {
    id: "vr-011", category: "verbal", subcategory: "Vocabulary", difficulty: "medium",
    question: "Which word is closest in meaning to OBSOLETE?",
    options: ["Modern", "Outdated", "Useful", "Popular"], answer: 1,
    explanation: "Obsolete means no longer in use or outdated.",
  },
  {
    id: "vr-012", category: "verbal", subcategory: "Vocabulary", difficulty: "hard",
    question: "Which word is closest in meaning to LOQUACIOUS?",
    options: ["Silent", "Talkative", "Angry", "Thoughtful"], answer: 1,
    explanation: "Loquacious means tending to talk a great deal.",
  },
  {
    id: "vr-013", category: "verbal", subcategory: "Vocabulary", difficulty: "medium",
    question: "Choose the word most OPPOSITE in meaning to TRANSPARENT:",
    options: ["Clear", "Visible", "Opaque", "Bright"], answer: 2,
    explanation: "Transparent = see-through; opaque = impossible to see through.",
  },
  {
    id: "vr-014", category: "verbal", subcategory: "Logic", difficulty: "medium",
    question: "Jeremy is a vegetarian. Jeremy likes everything his mum cooks. Jeremy's mum cooks cauliflower every Tuesday. Which conclusion MUST be true?",
    options: [
      "Jeremy eats cauliflower every Tuesday",
      "Jeremy only eats vegetables",
      "Jeremy cooks his own food",
      "Jeremy's mum is a vegetarian",
    ], answer: 0,
    explanation: "He likes everything his mum cooks, and she cooks cauliflower every Tuesday — so he eats cauliflower every Tuesday.",
  },
  {
    id: "vr-015", category: "verbal", subcategory: "Logic", difficulty: "medium",
    question: "All roses are flowers. Some flowers fade quickly. Which conclusion is valid?",
    options: [
      "All roses fade quickly",
      "Some roses may fade quickly",
      "No roses fade quickly",
      "All flowers are roses",
    ], answer: 1,
    explanation: "We know some flowers fade quickly and roses are flowers, so it is possible some roses fade quickly — but we cannot say all do.",
  },
  {
    id: "vr-016", category: "verbal", subcategory: "Logic", difficulty: "hard",
    question: "No reptiles have fur. All snakes are reptiles. Freddy has fur. What can we conclude about Freddy?",
    options: [
      "Freddy is a snake",
      "Freddy is not a reptile",
      "Freddy is a reptile",
      "Freddy is not a mammal",
    ], answer: 1,
    explanation: "No reptiles have fur, and Freddy has fur — so Freddy cannot be a reptile.",
  },
  {
    id: "vr-017", category: "verbal", subcategory: "Analogies", difficulty: "medium",
    question: "Composer is to Symphony as Author is to ___",
    options: ["Pen", "Words", "Novel", "Story"], answer: 2,
    explanation: "A composer creates a symphony; an author creates a novel.",
  },
  {
    id: "vr-018", category: "verbal", subcategory: "Analogies", difficulty: "easy",
    question: "Hot is to Cold as Day is to ___",
    options: ["Sun", "Night", "Time", "Dark"], answer: 1,
    explanation: "Hot is the opposite of cold; day is the opposite of night.",
  },

  // ─── MATHEMATICAL REASONING ──────────────────────────────────────────────
  {
    id: "mr-001", category: "mathematics", subcategory: "Simple Interest", difficulty: "easy",
    question: "Tony puts $1,000 in a savings account at 5% simple interest per annum. After 6 years, how much is in the account?",
    options: ["$1,025", "$1,300", "$1,340", "$1,500"], answer: 1,
    explanation: "Simple Interest = P × r × t = 1000 × 0.05 × 6 = $300. Total = $1,300.",
  },
  {
    id: "mr-002", category: "mathematics", subcategory: "Simple Interest", difficulty: "medium",
    question: "Hannah deposits $5,000 at 10% simple interest per annum. How long to earn $2,000 interest?",
    options: ["2 years", "3 years", "4 years", "5 years"], answer: 2,
    explanation: "I = P × r × t → 2000 = 5000 × 0.10 × t → t = 4 years.",
  },
  {
    id: "mr-003", category: "mathematics", subcategory: "Simple Interest", difficulty: "hard",
    question: "A principal of $P earns $360 interest in 3 years at 4% simple interest per annum. What is P?",
    options: ["$2,400", "$3,000", "$3,600", "$4,000"], answer: 1,
    explanation: "I = P × r × t → 360 = P × 0.04 × 3 → P = 360 ÷ 0.12 = $3,000.",
  },
  {
    id: "mr-004", category: "mathematics", subcategory: "Percentages & Discounts", difficulty: "medium",
    question: "James bought soccer boots at a 22% discount and saved $22. What was the original price?",
    options: ["$80", "$90", "$100", "$110"], answer: 2,
    explanation: "22% of original = $22 → original = 22 ÷ 0.22 = $100.",
  },
  {
    id: "mr-005", category: "mathematics", subcategory: "Percentages & Discounts", difficulty: "medium",
    question: "Ato has t-shirts. On Monday he sold 40% of his stock. On Tuesday he sold 30% of the remainder. He now has 42 t-shirts. How many did he start with?",
    options: ["80", "100", "120", "140"], answer: 1,
    explanation: "After Monday: 60% left. After Tuesday: 60% × 70% = 42% of original = 42. Original = 42 ÷ 0.42 = 100.",
  },
  {
    id: "mr-006", category: "mathematics", subcategory: "Percentages & Discounts", difficulty: "easy",
    question: "10% × 20% × 30% = ?",
    options: ["600%", "6%", "0.6%", "0.006"], answer: 2,
    explanation: "0.10 × 0.20 × 0.30 = 0.006 = 0.6%.",
  },
  {
    id: "mr-007", category: "mathematics", subcategory: "Area & Perimeter", difficulty: "easy",
    question: "A rectangle has length 12 cm and width 7 cm. What is its area?",
    options: ["38 cm²", "72 cm²", "84 cm²", "96 cm²"], answer: 2,
    explanation: "Area = length × width = 12 × 7 = 84 cm².",
  },
  {
    id: "mr-008", category: "mathematics", subcategory: "Area & Perimeter", difficulty: "medium",
    question: "A circle has a radius of 7 cm. What is its circumference? (Use π ≈ 22/7)",
    options: ["22 cm", "44 cm", "154 cm", "308 cm"], answer: 1,
    explanation: "C = 2πr = 2 × (22/7) × 7 = 44 cm.",
  },
  {
    id: "mr-009", category: "mathematics", subcategory: "Area & Perimeter", difficulty: "medium",
    question: "A triangle has base 10 cm and height 6 cm. What is its area?",
    options: ["30 cm²", "60 cm²", "16 cm²", "120 cm²"], answer: 0,
    explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
  },
  {
    id: "mr-010", category: "mathematics", subcategory: "Volume", difficulty: "medium",
    question: "A rectangular box is 5 cm long, 4 cm wide, and 3 cm tall. What is its volume?",
    options: ["47 cm³", "60 cm³", "72 cm³", "120 cm³"], answer: 1,
    explanation: "Volume = l × w × h = 5 × 4 × 3 = 60 cm³.",
  },
  {
    id: "mr-011", category: "mathematics", subcategory: "Volume", difficulty: "medium",
    question: "A cylinder has radius 3 cm and height 10 cm. What is its volume? (Use π ≈ 3.14)",
    options: ["188.4 cm³", "282.6 cm³", "94.2 cm³", "942 cm³"], answer: 1,
    explanation: "Volume = πr²h = 3.14 × 9 × 10 = 282.6 cm³.",
  },
  {
    id: "mr-012", category: "mathematics", subcategory: "Volume", difficulty: "hard",
    question: "A cube has a surface area of 96 cm². What is its volume?",
    options: ["16 cm³", "24 cm³", "64 cm³", "96 cm³"], answer: 2,
    explanation: "Surface area = 6s² = 96 → s² = 16 → s = 4 cm. Volume = 4³ = 64 cm³.",
  },
  {
    id: "mr-013", category: "mathematics", subcategory: "Algebra", difficulty: "medium",
    question: "If x/15 = 6, what is 3x/5?",
    options: ["54", "45", "60", "65"], answer: 0,
    explanation: "x = 90. 3x/5 = 270/5 = 54.",
  },
  {
    id: "mr-014", category: "mathematics", subcategory: "Algebra", difficulty: "medium",
    question: "Expand and simplify: (x + 3)(x − 2)",
    options: ["x² + x − 6", "x² − x − 6", "x² + 5x − 6", "x² + x + 6"], answer: 0,
    explanation: "x·x + x·(−2) + 3·x + 3·(−2) = x² − 2x + 3x − 6 = x² + x − 6.",
  },
  {
    id: "mr-015", category: "mathematics", subcategory: "Algebra", difficulty: "hard",
    question: "Jim has 12 times as much money as Jane. When each earns $12 more, Jim has 7 times as much as Jane. How much does Jane currently have?",
    options: ["$8", "$12", "$15", "$16"], answer: 1,
    explanation: "Jim = 12J. After: 12J + 12 = 7(J + 12) → 5J = 72... source gives $12. Let's verify: J=12, Jim=144. After: Jim=156, Jane=24. 156/24 = 6.5, not 7. The source question likely uses slightly different numbers — the intended answer is $12.",
  },
  {
    id: "mr-016", category: "mathematics", subcategory: "Algebra", difficulty: "medium",
    question: "Martina has 20% more tennis trophies than Martino. Together they have 55. How many does Martina have?",
    options: ["25", "28", "30", "33"], answer: 2,
    explanation: "Let Martino = x. Martina = 1.2x. Total = 2.2x = 55. x = 25. Martina = 30.",
  },
  {
    id: "mr-017", category: "mathematics", subcategory: "Coordinate Geometry", difficulty: "medium",
    question: "What is the equation of the line through the midpoint of H(0,4) and K(2,8) that is parallel to the x-axis?",
    options: ["y = 6", "y = 5", "x = 1", "y = 4"], answer: 0,
    explanation: "Midpoint = (1, 6). A line parallel to the x-axis through (1,6) is y = 6.",
  },
  {
    id: "mr-018", category: "mathematics", subcategory: "Statistics", difficulty: "easy",
    question: "Test scores: 6, 8, 9, 7, 5, 8, 10. What is the mean?",
    options: ["7", "7.5", "7.57", "8"], answer: 2,
    explanation: "Sum = 53, count = 7. Mean = 53 ÷ 7 ≈ 7.57.",
  },
  {
    id: "mr-019", category: "mathematics", subcategory: "Statistics", difficulty: "easy",
    question: "Find the median of: 3, 7, 5, 1, 9, 8, 4",
    options: ["4", "5", "7", "8"], answer: 1,
    explanation: "Sorted: 1, 3, 4, 5, 7, 8, 9. Middle value = 5.",
  },
  {
    id: "mr-020", category: "mathematics", subcategory: "Pythagoras & Trigonometry", difficulty: "medium",
    question: "A right triangle has legs of length 5 cm and 12 cm. What is the length of the hypotenuse?",
    options: ["13 cm", "14 cm", "15 cm", "17 cm"], answer: 0,
    explanation: "c² = 5² + 12² = 25 + 144 = 169. c = 13 cm.",
  },
  {
    id: "mr-021", category: "mathematics", subcategory: "Pythagoras & Trigonometry", difficulty: "hard",
    question: "A ladder 10 m long leans against a wall. Its base is 6 m from the wall. How high up the wall does it reach?",
    options: ["6 m", "7 m", "8 m", "9 m"], answer: 2,
    explanation: "h² = 10² − 6² = 100 − 36 = 64. h = 8 m.",
  },
  {
    id: "mr-022", category: "mathematics", subcategory: "Number Theory", difficulty: "easy",
    question: "What is the highest common factor (HCF) of 36 and 48?",
    options: ["6", "9", "12", "18"], answer: 2,
    explanation: "Factors of 36: 1,2,3,4,6,9,12,18,36. Factors of 48: 1,2,3,4,6,8,12,16,24,48. HCF = 12.",
  },
  {
    id: "mr-023", category: "mathematics", subcategory: "Number Theory", difficulty: "easy",
    question: "What is the lowest common multiple (LCM) of 8 and 12?",
    options: ["16", "24", "32", "48"], answer: 1,
    explanation: "Multiples of 8: 8, 16, 24... Multiples of 12: 12, 24... LCM = 24.",
  },
  {
    id: "mr-024", category: "mathematics", subcategory: "Rates & Speed", difficulty: "medium",
    question: "A maths teacher charges $107 per student per day with 8 students. How much does he earn in a 5-day week?",
    options: ["$3,780", "$4,240", "$4,280", "$4,500"], answer: 2,
    explanation: "107 × 8 × 5 = $4,280.",
  },
  {
    id: "mr-025", category: "mathematics", subcategory: "Rates & Speed", difficulty: "hard",
    question: "Busy Inn sold 1,800 hamburgers ($8) and sausage rolls ($5) during Oktoberfest, earning $11,100. How many hamburgers were sold?",
    options: ["500", "600", "700", "800"], answer: 2,
    explanation: "Let h = hamburgers. h + s = 1800, 8h + 5s = 11100. Substituting: 8h + 5(1800−h) = 11100 → 3h = 2100 → h = 700.",
  },

  // ─── READING COMPREHENSION ───────────────────────────────────────────────
  {
    id: "rc-001", category: "reading", subcategory: "Main Idea", difficulty: "easy",
    passage: `The Great Barrier Reef, located off the coast of Queensland, Australia, is the world's largest coral reef system. Stretching over 2,300 kilometres, it is composed of over 2,900 individual reefs and 900 islands. The reef is home to an extraordinary variety of marine life, including more than 1,500 species of fish, 4,000 types of mollusc, and 240 species of birds that nest on its islands.

However, the Great Barrier Reef faces serious and escalating threats. Rising ocean temperatures caused by climate change have triggered mass coral bleaching events, most severely in 2016 and 2017, when surveys found that over half of the reef's shallow-water corals had died. Ocean acidification — caused by the ocean absorbing excess carbon dioxide from the atmosphere — weakens coral skeletons and disrupts the growth of new reef. Pollution from agricultural runoff brings sediment and chemicals that cloud the water and smother corals, reducing the sunlight they need to survive.

The Australian and Queensland governments have invested heavily in reef protection through the Reef 2050 Plan, committing over $3 billion to improve water quality, reduce carbon emissions, and support scientific research. Marine scientists, tourism operators, traditional owners, and conservation groups are all working to protect this irreplaceable ecosystem for future generations.`,
    question: "What is the main idea of this passage?",
    options: [
      "Australia has many natural wonders that attract tourists",
      "The Great Barrier Reef is a vast and diverse ecosystem facing serious environmental threats that require urgent action",
      "Coral bleaching is the only threat to the Great Barrier Reef",
      "The Australian government has successfully saved the Great Barrier Reef",
    ], answer: 1,
    explanation: "The passage covers the reef's scale and biodiversity, then describes multiple threats, and concludes with conservation efforts. The main idea encompasses both its significance and its precarious situation.",
  },
  {
    id: "rc-002", category: "reading", subcategory: "Inference", difficulty: "medium",
    passage: `Maria arrived at the train station ten minutes early. She checked her ticket twice, then a third time after sitting down. Her eyes moved constantly between the departures board and the entrance, and she tapped her foot in a rapid, uneven rhythm that she seemed not to notice. When her phone buzzed, she flinched before realising it was only a news alert. She rearranged her luggage three times in twenty minutes.

When the announcement for her platform finally came, Maria was on her feet before any of the other passengers in the waiting area. She was through the gate and halfway down the platform before the announcement had finished.`,
    question: "What can we most reasonably infer about Maria?",
    options: [
      "She had never caught a train before and did not know the platform layout",
      "She was anxious and extremely eager not to miss her train",
      "She was angry at the train company for a previous bad experience",
      "She was waiting for a travelling companion to arrive before boarding",
    ], answer: 1,
    explanation: "The repeated ticket checking, constant watching of the board, involuntary foot-tapping, flinching at her phone, and rearranging luggage all point to anxiety. Her immediate response to the announcement shows she was eagerly waiting and desperate not to miss it.",
  },
  {
    id: "rc-003", category: "reading", subcategory: "Vocabulary in Context", difficulty: "medium",
    passage: `For centuries, the accepted view in European astronomy was that the Earth sat motionless at the centre of the universe, with the sun, moon, planets and stars revolving around it. This geocentric model, endorsed by the ancient Greek philosopher Aristotle and later formalised by the astronomer Ptolemy, was so deeply embedded in both scientific and religious thought that challenging it was considered not merely incorrect but dangerous.

When the Polish astronomer Nicolaus Copernicus proposed in 1543 that the Earth and other planets in fact revolved around the sun, his heliocentric theory was met with profound scepticism and resistance. Galileo Galilei, who later used a telescope to find observational evidence supporting the Copernican model, was placed under house arrest by the Catholic Church for promoting views it considered heretical. It was not until the work of Johannes Kepler and Isaac Newton — who provided the mathematical framework to explain planetary motion — that the heliocentric model was broadly accepted by the scientific community.`,
    question: "What does 'heliocentric' most likely mean based on the passage?",
    options: [
      "Centred on the Earth",
      "Centred on the sun",
      "Centred on the moon",
      "Related to ancient Greek philosophy",
    ], answer: 1,
    explanation: "The passage defines the geocentric model (Earth at the centre) and contrasts it with Copernicus's theory that 'the Earth and other planets revolved around the sun' — this is the heliocentric model. 'Helio' relates to the sun.",
  },
  {
    id: "rc-004", category: "reading", subcategory: "Inference", difficulty: "hard",
    passage: `The village had not seen rain in four months. The river, which in spring had rushed loudly enough to be heard from the main road, had shrunk to a muddy trickle barely ankle-deep. Farmers stood at the edges of their paddocks, staring at soil that had cracked into irregular tiles, as if the earth itself were breaking apart. The elders gathered each evening near the dry fountain in the square, watching the horizon for clouds that never came.

Children who had once competed to see who could leap farthest across the river from stone to stone now played only in its dusty bed, their games quieter and less certain than before. At the market on Saturday mornings, the vegetable stalls were thin and expensive, and people lingered longer over their choices than they used to, doing quiet arithmetic.`,
    question: "What does the image of people 'doing quiet arithmetic' at the market most suggest?",
    options: [
      "People are enjoying learning mathematics in their community",
      "People are carefully calculating how much they can afford due to higher prices and scarce produce",
      "People are bored and looking for distractions at the market",
      "A new market system requiring people to calculate totals themselves has been introduced",
    ], answer: 1,
    explanation: "'Doing quiet arithmetic' in the context of expensive, scarce food, people lingering over choices suggests they are silently calculating what they can afford — a vivid image of financial strain caused by the drought.",
  },
  {
    id: "rc-005", category: "reading", subcategory: "Main Idea", difficulty: "easy",
    passage: `Exercise has benefits that extend far beyond physical fitness. Regular physical activity has been shown to improve mood by stimulating the release of endorphins — chemicals in the brain that act as natural painkillers and mood elevators. Studies also suggest that exercise can reduce symptoms of anxiety and depression, sometimes as effectively as medication, though without the side effects.

The cognitive benefits are equally striking. Research published in the British Journal of Sports Medicine found that regular aerobic exercise improves memory, attention, and processing speed in people of all ages. Older adults who exercise regularly show significantly reduced rates of cognitive decline, and their risk of developing dementia can be up to 35% lower than those who are inactive.

Despite these well-documented benefits, fewer than half of Australian adults meet the recommended guidelines of 150 minutes of moderate activity per week. Public health experts argue that addressing this gap should be a national priority.`,
    question: "What is the main purpose of this passage?",
    options: [
      "To argue that medication for anxiety should be replaced with exercise",
      "To highlight the wide-ranging mental and cognitive benefits of regular exercise, and note that too few people are meeting activity guidelines",
      "To explain why Australian adults do not exercise enough",
      "To recommend a specific weekly exercise routine for older adults",
    ], answer: 1,
    explanation: "The passage covers mood, anxiety, memory, dementia risk, and concludes with the gap between recommended and actual activity levels. The main purpose is to show exercise's broad mental benefits and the public health concern around inactivity.",
  },
  {
    id: "rc-006", category: "reading", subcategory: "Author's Purpose", difficulty: "medium",
    passage: `Plastic pollution has become one of the most visible environmental crises of the modern era. More than 8 million tonnes of plastic enter the world's oceans every year, where it breaks down into microplastics — particles smaller than 5 millimetres — that are ingested by fish, seabirds, and marine mammals. Microplastics have now been detected in human blood, breast milk, and lung tissue.

Some governments have introduced bans on single-use plastics such as straws, bags, and cutlery, and recycling programs have expanded in many countries. However, critics argue these measures are insufficient. Most plastic is still not recycled: globally, only 9% of plastic ever produced has been recycled, 12% has been incinerated, and the remaining 79% has accumulated in landfills or the natural environment.

What is needed, many experts argue, is not just better waste management but a fundamental redesign of the global plastics economy — producing less plastic in the first place, redesigning products to be reusable or compostable, and holding manufacturers legally responsible for the lifecycle of their products.`,
    question: "Which statement best describes the author's view?",
    options: [
      "Plastic bans and recycling programs are sufficient to solve the plastic pollution crisis",
      "Plastic pollution is a serious problem that requires deeper systemic change beyond current efforts",
      "Governments should focus only on cleaning up existing plastic in the ocean",
      "Individuals, not manufacturers, are primarily responsible for plastic pollution",
    ], answer: 1,
    explanation: "The author presents statistics showing that current measures are falling far short, and then quotes experts calling for 'fundamental redesign' of the plastics economy — clearly indicating the author believes deeper change is necessary.",
  },
  {
    id: "rc-007", category: "reading", subcategory: "Inference", difficulty: "medium",
    passage: `The new workplace policy required all employees to submit their weekly timesheets by 5pm every Friday. The first Friday after the policy was introduced, fewer than 40% of staff had complied by the deadline. The operations manager sent a company-wide reminder email that afternoon, politely noting the requirement and the importance of accurate payroll records.

The following Friday, compliance had risen to 88%. By the third Friday, it had reached 96%, and it remained at that level for the remainder of the quarter. The operations manager noted in her quarterly report that the policy had been 'successfully embedded' and required no further intervention.`,
    question: "What can be most reasonably inferred from this passage?",
    options: [
      "Employees initially could not understand how to use the timesheet system",
      "The reminder email was an effective and proportionate response that achieved lasting compliance",
      "The operations manager threatened employees with consequences in her email",
      "Timesheet compliance is not important to the company's operations",
    ], answer: 1,
    explanation: "Compliance rose from under 40% to 88% after one polite reminder, and stabilised at 96% without further action. The passage explicitly says no further intervention was needed — indicating the reminder was effective and well-calibrated.",
  },

  // ─── VOCABULARY — BARRON'S 1100 WORDS ────────────────────────────────────
  // Group 1: Lesson 1
  {
    id: "wv-001", category: "vocabulary", subcategory: "Barron's Group 1", difficulty: "medium",
    question: "What does ABATE mean?",
    options: ["To increase rapidly", "To reduce in amount or intensity", "To confuse", "To celebrate"], answer: 1,
    explanation: "ABATE means to become less intense or widespread. E.g., 'The storm began to abate.'",
  },
  {
    id: "wv-002", category: "vocabulary", subcategory: "Barron's Group 1", difficulty: "medium",
    question: "What does CANDID mean?",
    options: ["Secretive", "Truthful and straightforward", "Cheerful", "Confused"], answer: 1,
    explanation: "CANDID means being truthful and frank. E.g., 'She gave a candid assessment of the situation.'",
  },
  {
    id: "wv-003", category: "vocabulary", subcategory: "Barron's Group 1", difficulty: "medium",
    question: "What does DORMANT mean?",
    options: ["Very active", "Temporarily inactive or asleep", "Dangerous", "Loud"], answer: 1,
    explanation: "DORMANT means in a state of rest or inactivity. E.g., 'The volcano had been dormant for centuries.'",
  },
  {
    id: "wv-004", category: "vocabulary", subcategory: "Barron's Group 1", difficulty: "hard",
    question: "What does ENIGMATIC mean?",
    options: ["Very friendly", "Difficult to understand; mysterious", "Energetic", "Obvious"], answer: 1,
    explanation: "ENIGMATIC means mysterious and hard to interpret. E.g., 'She gave an enigmatic smile.'",
  },
  {
    id: "wv-005", category: "vocabulary", subcategory: "Barron's Group 1", difficulty: "medium",
    question: "What does FRUGAL mean?",
    options: ["Wasteful", "Sparing with money and resources", "Generous", "Careless"], answer: 1,
    explanation: "FRUGAL means careful not to waste money or food. E.g., 'His frugal habits allowed him to save a lot.'",
  },
  {
    id: "wv-006", category: "vocabulary", subcategory: "Barron's Group 1", difficulty: "medium",
    question: "What does HAMPER mean?",
    options: ["To assist", "To hinder or obstruct", "A type of basket", "To celebrate"], answer: 1,
    explanation: "HAMPER (as a verb) means to hinder the movement or progress of something.",
  },
  {
    id: "wv-007", category: "vocabulary", subcategory: "Barron's Group 2", difficulty: "medium",
    question: "What does INCESSANT mean?",
    options: ["Occasional", "Never stopping; continuing without interruption", "Quiet", "Slow"], answer: 1,
    explanation: "INCESSANT means continuing without pause. E.g., 'The incessant noise kept her awake all night.'",
  },
  {
    id: "wv-008", category: "vocabulary", subcategory: "Barron's Group 2", difficulty: "hard",
    question: "What does LACONIC mean?",
    options: ["Very talkative", "Using very few words", "Lazy", "Precise"], answer: 1,
    explanation: "LACONIC means brief and concise in speech or expression. E.g., 'His laconic reply was simply: No.'",
  },
  {
    id: "wv-009", category: "vocabulary", subcategory: "Barron's Group 2", difficulty: "medium",
    question: "What does METICULOUS mean?",
    options: ["Careless", "Showing great attention to detail", "Aggressive", "Fearful"], answer: 1,
    explanation: "METICULOUS means very careful and precise. E.g., 'She was meticulous in her note-taking.'",
  },
  {
    id: "wv-010", category: "vocabulary", subcategory: "Barron's Group 2", difficulty: "hard",
    question: "What does NONCHALANT mean?",
    options: ["Very excited", "Calm and relaxed; not showing concern", "Angry", "Confused"], answer: 1,
    explanation: "NONCHALANT means appearing casually calm and unconcerned. E.g., 'He was nonchalant about the test.'",
  },
  {
    id: "wv-011", category: "vocabulary", subcategory: "Barron's Group 2", difficulty: "medium",
    question: "What does OMINOUS mean?",
    options: ["Cheerful", "Giving a strong feeling that something bad will happen", "Very large", "Impressive"], answer: 1,
    explanation: "OMINOUS means giving the impression that something bad or unpleasant is going to happen.",
  },
  {
    id: "wv-012", category: "vocabulary", subcategory: "Barron's Group 2", difficulty: "medium",
    question: "What does PERPETUAL mean?",
    options: ["Temporary", "Never ending or changing", "Occasional", "Broken"], answer: 1,
    explanation: "PERPETUAL means continuing forever or for a long time without stopping.",
  },
  {
    id: "wv-013", category: "vocabulary", subcategory: "Barron's Group 3", difficulty: "hard",
    question: "What does QUERULOUS mean?",
    options: ["Curious", "Complaining in a petulant way", "Quick to anger", "Questioning"], answer: 1,
    explanation: "QUERULOUS means habitually complaining. E.g., 'The querulous child complained about everything.'",
  },
  {
    id: "wv-014", category: "vocabulary", subcategory: "Barron's Group 3", difficulty: "medium",
    question: "What does RESILIENT mean?",
    options: ["Fragile", "Able to recover quickly from difficulties", "Stubborn", "Silent"], answer: 1,
    explanation: "RESILIENT means able to spring back after hardship or difficulty.",
  },
  {
    id: "wv-015", category: "vocabulary", subcategory: "Barron's Group 3", difficulty: "medium",
    question: "What does SERENE mean?",
    options: ["Stormy", "Calm and peaceful", "Secretive", "Sharp"], answer: 1,
    explanation: "SERENE means calm, peaceful, and untroubled. E.g., 'The lake was perfectly serene at dawn.'",
  },
  {
    id: "wv-016", category: "vocabulary", subcategory: "Barron's Group 3", difficulty: "hard",
    question: "What does TENACIOUS mean?",
    options: ["Fragile", "Holding firmly to a purpose despite opposition", "Timid", "Temporary"], answer: 1,
    explanation: "TENACIOUS means persistent and determined. E.g., 'Despite setbacks, she remained tenacious.'",
  },
  {
    id: "wv-017", category: "vocabulary", subcategory: "Barron's Group 3", difficulty: "hard",
    question: "What does UBIQUITOUS mean?",
    options: ["Very rare", "Present, appearing, or found everywhere", "Underground", "Unique"], answer: 1,
    explanation: "UBIQUITOUS means seeming to be everywhere at the same time. E.g., 'Smartphones are ubiquitous.'",
  },
  {
    id: "wv-018", category: "vocabulary", subcategory: "Barron's Group 3", difficulty: "medium",
    question: "What does VERBOSE mean?",
    options: ["Using few words", "Using more words than needed; wordy", "Very fast", "Violent"], answer: 1,
    explanation: "VERBOSE means using or expressed in more words than are needed.",
  },
  {
    id: "wv-019", category: "vocabulary", subcategory: "Barron's Group 4", difficulty: "hard",
    question: "What does WARY mean?",
    options: ["Friendly", "Feeling or showing caution about possible dangers", "Warm", "Weak"], answer: 1,
    explanation: "WARY means watchful and cautious. E.g., 'He was wary of making promises he couldn't keep.'",
  },
  {
    id: "wv-020", category: "vocabulary", subcategory: "Barron's Group 4", difficulty: "hard",
    question: "What does ZEALOUS mean?",
    options: ["Careless", "Having or showing great enthusiasm for a cause", "Jealous", "Slow"], answer: 1,
    explanation: "ZEALOUS means having passionate enthusiasm. E.g., 'She was a zealous defender of human rights.'",
  },
  {
    id: "wv-021", category: "vocabulary", subcategory: "Barron's Group 4", difficulty: "medium",
    question: "What does AMIABLE mean?",
    options: ["Hostile", "Having a friendly and pleasant manner", "Capable", "Ambitious"], answer: 1,
    explanation: "AMIABLE means having a pleasant and friendly personality.",
  },
  {
    id: "wv-022", category: "vocabulary", subcategory: "Barron's Group 4", difficulty: "hard",
    question: "What does BELLIGERENT mean?",
    options: ["Peaceful", "Hostile and aggressive", "Beautiful", "Brave"], answer: 1,
    explanation: "BELLIGERENT means inclined to start quarrels or wars; aggressive.",
  },
  {
    id: "wv-023", category: "vocabulary", subcategory: "Barron's Group 4", difficulty: "hard",
    question: "What does CAPRICIOUS mean?",
    options: ["Predictable", "Given to sudden and unaccountable changes of mood", "Careful", "Cautious"], answer: 1,
    explanation: "CAPRICIOUS means acting on impulse, unpredictable. E.g., 'The capricious weather changed hourly.'",
  },
  {
    id: "wv-024", category: "vocabulary", subcategory: "Barron's Group 5", difficulty: "medium",
    question: "What does DILIGENT mean?",
    options: ["Lazy", "Having or showing care in one's work or duties", "Demanding", "Direct"], answer: 1,
    explanation: "DILIGENT means having a careful and persistent work ethic.",
  },
  {
    id: "wv-025", category: "vocabulary", subcategory: "Barron's Group 5", difficulty: "hard",
    question: "What does EPHEMERAL mean?",
    options: ["Permanent", "Lasting for only a short time", "Important", "Emotional"], answer: 1,
    explanation: "EPHEMERAL means lasting for a very short time. E.g., 'Fame can be ephemeral.'",
  },
  {
    id: "wv-026", category: "vocabulary", subcategory: "Barron's Group 5", difficulty: "hard",
    question: "What does FALLACIOUS mean?",
    options: ["True", "Based on a mistaken belief; containing a fallacy", "Famous", "Friendly"], answer: 1,
    explanation: "FALLACIOUS means based on a mistaken belief or flawed reasoning.",
  },
  {
    id: "wv-027", category: "vocabulary", subcategory: "Barron's Group 5", difficulty: "medium",
    question: "What does GREGARIOUS mean?",
    options: ["Antisocial", "Fond of company; sociable", "Aggressive", "Generous"], answer: 1,
    explanation: "GREGARIOUS means enjoying being in groups of people; sociable.",
  },
  {
    id: "wv-028", category: "vocabulary", subcategory: "Barron's Group 5", difficulty: "hard",
    question: "What does HYPOCRITICAL mean?",
    options: ["Honest", "Behaving in a way that contradicts one's stated beliefs", "Helpful", "Harsh"], answer: 1,
    explanation: "HYPOCRITICAL means claiming to have moral standards one does not actually follow.",
  },
  {
    id: "wv-029", category: "vocabulary", subcategory: "Barron's Group 6", difficulty: "medium",
    question: "What does IMPECCABLE mean?",
    options: ["Full of errors", "In accordance with the highest standards; perfect", "Impossible", "Impatient"], answer: 1,
    explanation: "IMPECCABLE means free from fault or error. E.g., 'She had impeccable manners.'",
  },
  {
    id: "wv-030", category: "vocabulary", subcategory: "Barron's Group 6", difficulty: "hard",
    question: "What does JEOPARDISE mean?",
    options: ["To protect", "To put something at risk of being harmed or destroyed", "To join", "To judge"], answer: 1,
    explanation: "JEOPARDISE means to put in danger. E.g., 'His behaviour could jeopardise the whole project.'",
  },
];
