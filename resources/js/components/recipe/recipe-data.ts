export interface Ingredient {
    name: string;
    amount: string;
    note?: string;
}

export interface Instruction {
    step: number;
    title: string;
    description: string;
}

export interface NutritionFacts {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    image: string;
    cookingTime: number;
    tags: string[];
    label?: string;
    price: string;
    difficulty: string;
    // Detail page fields
    smartSubstitutions?: {
        title: string;
        description: string;
        suggestions: string[];
    };
    ingredients: Ingredient[];
    instructions: Instruction[];
    nutritionFacts: NutritionFacts;
}

export const recipeData: Recipe[] = [
    {
        id: '1',
        title: 'Authentic Shakshuka',
        description:
            'Poached eggs in spiced tomato sauce with peppers and herbs. A Middle Eastern classic that is both hearty and delicious.',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 25,
        tags: ['GLUTEN-FREE', 'VEGETARIAN'],
        label: 'BUDGET PICK',
        price: '$$',
        difficulty: 'EASY',
        smartSubstitutions: {
            title: 'Smart Substitutions',
            description: 'Resourceful cooking means using what you have.',
            suggestions: [
                'No Bell Peppers? Use 1 tsp smoked Paprika instead to add the same deep flavor.',
                'Out of Feta? A dollop of thick Greek yogurt or goat cheese works beautifully.',
            ],
        },
        ingredients: [
            { name: '2 tbsp Extra Virgin Olive Oil', amount: '' },
            {
                name: '1 Red Bell Pepper, chopped',
                amount: '',
                note: 'or similar yellow',
            },
            { name: '1 can (28oz) Whole Peeled Tomatoes', amount: '' },
            { name: '1/4 cup Fresh Parsley & Cilantro', amount: '' },
            { name: '1 Medium Onion, diced', amount: '' },
            { name: '4 Garlic Cloves, minced', amount: '' },
            { name: '4-6 Large Organic Eggs', amount: '' },
            { name: '1 tsp Cumin & 1 tsp Paprika', amount: '' },
        ],
        instructions: [
            {
                step: 1,
                title: 'Sautè the Aromatics',
                description:
                    'Heat the olive oil in a large cast-iron skillet over medium heat. Add the onion and bell pepper. Cook for about 5 minutes until soft and fragrant. This "blooming" of spices is essential for the depth of flavor.',
            },
            {
                step: 2,
                title: 'Spices & Garlic',
                description:
                    'Add garlic, cumin, and paprika. Stir constantly for 1 minute until fragrant. This "blooming" of spices is essential for the depth of flavor.',
            },
            {
                step: 3,
                title: 'Simmer the Sauce',
                description:
                    'Pour in the tomatoes and break them down with a wooden spoon. Bring to a simmer and let it cook for 8-10 minutes.',
            },
            {
                step: 4,
                title: 'Poach the Eggs',
                description:
                    'Use a spoon to make small wells in the sauce. Crack an egg into each well. Cover the skillet and cook for 5-8 minutes until the whites are set but yolks are still runny.',
            },
        ],
        nutritionFacts: {
            calories: 340,
            protein: '16g',
            fat: '22g',
            carbs: '8g',
            fiber: '5g',
        },
    },
    {
        id: '2',
        title: 'Silky Tomato Omelette',
        description:
            'A simple, garlic-infused omelette that highlights fresh tomatoes and herbs. Perfect for breakfast or a quick dinner.',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 10,
        tags: ['QUICK', 'VEGETARIAN'],
        price: '$',
        difficulty: 'EASY',
        smartSubstitutions: {
            title: 'Smart Substitutions',
            description: 'Make it your own with these simple swaps.',
            suggestions: [
                'No fresh tomatoes? Use sun-dried tomatoes for a more concentrated flavor.',
                'Prefer it cheesy? Add grated cheddar or feta before folding.',
            ],
        },
        ingredients: [
            { name: '3 Large Eggs', amount: '' },
            { name: '2 tbsp Butter', amount: '' },
            { name: '1 cup Fresh Cherry Tomatoes, halved', amount: '' },
            { name: '2 Garlic Cloves, minced', amount: '' },
            { name: '1/4 cup Fresh Basil', amount: '' },
            { name: 'Salt & Black Pepper to taste', amount: '' },
            { name: '1/4 cup Crumbled Goat Cheese (optional)', amount: '' },
        ],
        instructions: [
            {
                step: 1,
                title: 'Prepare the Filling',
                description:
                    'Heat 1 tbsp of butter in a small pan. Add garlic and cook for 30 seconds. Add tomatoes and cook for 2-3 minutes until slightly softened.',
            },
            {
                step: 2,
                title: 'Whisk the Eggs',
                description:
                    'In a bowl, whisk eggs with salt and pepper until well combined and slightly foamy.',
            },
            {
                step: 3,
                title: 'Cook the Omelette',
                description:
                    'Heat remaining butter in an omelette pan over medium-high heat. Pour in eggs and let cook for 1 minute, then gently push cooked portions to the center.',
            },
            {
                step: 4,
                title: 'Fold & Serve',
                description:
                    'When eggs are mostly set but slightly wet on top, add the tomato mixture and basil. Fold in half and slide onto a plate.',
            },
        ],
        nutritionFacts: {
            calories: 280,
            protein: '12g',
            fat: '18g',
            carbs: '6g',
            fiber: '1g',
        },
    },
    {
        id: '3',
        title: 'Garlic-Tomato Stir Fry',
        description:
            'Elevated slow-cooking method that transforms basic pantry ingredients into something extraordinary and flavorful.',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 15,
        tags: ['QUICK', 'HEALTHY'],
        price: '$',
        difficulty: 'EASY',
        smartSubstitutions: {
            title: 'Smart Substitutions',
            description: 'Keep it flexible and use what you have.',
            suggestions: [
                'No fresh tomatoes? Canned diced tomatoes work just as well.',
                'Add protein: throw in tofu, chicken, or shrimp for extra nutrition.',
            ],
        },
        ingredients: [
            { name: '2 tbsp Sesame Oil', amount: '' },
            { name: '6 Garlic Cloves, thinly sliced', amount: '' },
            { name: '1 lb Cherry Tomatoes', amount: '' },
            { name: '2 cups Baby Bok Choy or Spinach', amount: '' },
            { name: '1 tbsp Soy Sauce', amount: '' },
            { name: '1 tsp Rice Vinegar', amount: '' },
            { name: '1 tsp Ginger, minced', amount: '' },
            { name: 'Sesame seeds & Green Onion for garnish', amount: '' },
        ],
        instructions: [
            {
                step: 1,
                title: 'Heat the Wok',
                description:
                    'Get a wok or large skillet very hot. Add sesame oil and let it shimmer for 30 seconds.',
            },
            {
                step: 2,
                title: 'Cook Garlic',
                description:
                    'Add sliced garlic and cook for 1-2 minutes until fragrant and light golden. Do not let it burn.',
            },
            {
                step: 3,
                title: 'Add Tomatoes',
                description:
                    'Add tomatoes and ginger. Stir-fry for 3-4 minutes until tomatoes begin to blister and break down slightly.',
            },
            {
                step: 4,
                title: 'Finish with Greens',
                description:
                    'Add bok choy or spinach. Toss well. Add soy sauce and rice vinegar. Cook for another 2 minutes until greens are wilted.',
            },
        ],
        nutritionFacts: {
            calories: 220,
            protein: '8g',
            fat: '14g',
            carbs: '12g',
            fiber: '3g',
        },
    },
    {
        id: '4',
        title: 'Roasted Garlic Frittata',
        description:
            'Slow-roasted garlic adds a deep, umami complexity to this Italian-style baked egg dish. Comfort food at its finest.',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 35,
        tags: ['GLUTEN-FREE', 'VEGETARIAN'],
        price: '$$',
        difficulty: 'MEDIUM',
        smartSubstitutions: {
            title: 'Smart Substitutions',
            description: 'Make it work with what you have on hand.',
            suggestions: [
                'No roasted garlic? Use 2 tbsp garlic paste or minced fresh garlic for a more intense flavor.',
                'Substitute cheese: any aged cheese like Parmesan or Gruyère works beautifully.',
            ],
        },
        ingredients: [
            { name: '1 whole head Garlic, roasted', amount: '' },
            { name: '8 Large Eggs', amount: '' },
            { name: '1/4 cup Heavy Cream', amount: '' },
            { name: '1/2 cup Aged Gruyère, grated', amount: '' },
            { name: '2 tbsp Butter', amount: '' },
            { name: '1 cup Baby Spinach', amount: '' },
            { name: '1/4 tsp Nutmeg', amount: '' },
            { name: 'Sea Salt & Cracked Black Pepper', amount: '' },
        ],
        instructions: [
            {
                step: 1,
                title: 'Roast the Garlic',
                description:
                    'Cut the top off a garlic head, drizzle with olive oil, wrap in foil, and roast at 400°F for 35-40 minutes until soft and golden.',
            },
            {
                step: 2,
                title: 'Prepare the Mixture',
                description:
                    'Whisk eggs with cream, nutmeg, salt, and pepper. Squeeze roasted garlic cloves into the mixture and fold gently.',
            },
            {
                step: 3,
                title: 'Cook the Base',
                description:
                    'Preheat oven to 375°F. Heat butter in an oven-safe skillet over medium heat. Add spinach and cook until wilted.',
            },
            {
                step: 4,
                title: 'Bake the Frittata',
                description:
                    'Pour egg mixture over spinach. Sprinkle cheese on top. Bake for 12-15 minutes until golden and center is just set.',
            },
        ],
        nutritionFacts: {
            calories: 380,
            protein: '22g',
            fat: '28g',
            carbs: '5g',
            fiber: '0g',
        },
    },
    {
        id: '5',
        title: 'Classic Tomato Stir-Fry',
        description:
            'A budget-friendly dish that combines fresh tomatoes with pantry staples for a quick and satisfying meal.',
        image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 12,
        tags: ['BUDGET PICK', 'QUICK'],
        price: '$',
        difficulty: 'EASY',
        smartSubstitutions: {
            title: 'Smart Substitutions',
            description: 'Keep meals budget-friendly with these swaps.',
            suggestions: [
                'Use canned tomatoes if fresh ones are expensive.',
                'Skip the sesame oil and use regular vegetable oil for a lighter, budget option.',
            ],
        },
        ingredients: [
            { name: '2 tbsp Vegetable Oil', amount: '' },
            { name: '4 cups Fresh Tomatoes, chopped', amount: '' },
            { name: '4 Garlic Cloves, minced', amount: '' },
            { name: '1 Medium Onion, sliced', amount: '' },
            { name: '1 tbsp Soy Sauce', amount: '' },
            { name: '1 tsp Sugar', amount: '' },
            { name: '1/2 tsp White Pepper', amount: '' },
            { name: 'Fresh Cilantro for garnish', amount: '' },
        ],
        instructions: [
            {
                step: 1,
                title: 'Sauté Aromatics',
                description:
                    'Heat oil in a wok over high heat. Add onion and garlic. Cook for 1 minute until fragrant.',
            },
            {
                step: 2,
                title: 'Add Tomatoes',
                description:
                    'Add chopped tomatoes. Stir well and cook for 3-4 minutes until tomatoes start to break down.',
            },
            {
                step: 3,
                title: 'Season',
                description:
                    'Add soy sauce, sugar, and white pepper. Stir well to combine all flavors.',
            },
            {
                step: 4,
                title: 'Finish',
                description:
                    'Cook for another 2-3 minutes until sauce thickens slightly. Garnish with fresh cilantro and serve.',
            },
        ],
        nutritionFacts: {
            calories: 180,
            protein: '4g',
            fat: '12g',
            carbs: '14g',
            fiber: '3g',
        },
    },
    {
        id: '6',
        title: 'Egg & Tomato Confit',
        description:
            'Elevated slow-cooking method that transforms basic pantry ingredients into something extraordinary and restaurant-quality.',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 50,
        tags: ['GOURMET', 'VEGETARIAN'],
        label: 'SPECIAL',
        price: '$$$',
        difficulty: 'HARD',
        smartSubstitutions: {
            title: 'Smart Substitutions',
            description: 'Elevate your dish with premium ingredients.',
            suggestions: [
                'Use truffle oil instead of olive oil for extra luxury.',
                'Add burrata cheese instead of eggs for a different twist on the dish.',
            ],
        },
        ingredients: [
            { name: '1 lb Cherry Tomatoes', amount: '' },
            { name: '1/2 cup Extra Virgin Olive Oil', amount: '' },
            { name: '8 Garlic Cloves, thinly sliced', amount: '' },
            { name: '4 Fresh Eggs', amount: '' },
            { name: '2 Fresh Thyme Sprigs', amount: '' },
            { name: '1 Bay Leaf', amount: '' },
            { name: 'Fleur de Sel & Cracked Black Pepper', amount: '' },
            { name: 'Fresh Basil Leaves', amount: '' },
        ],
        instructions: [
            {
                step: 1,
                title: 'Prepare the Confit',
                description:
                    'Combine tomatoes, olive oil, garlic, thyme, and bay leaf in a heavy-bottomed pot. Heat to 200°F and cook slowly for 35-40 minutes.',
            },
            {
                step: 2,
                title: 'Infuse the Flavors',
                description:
                    'The tomatoes should be soft and the oil infused with flavor. Season generously with fleur de sel and cracked pepper.',
            },
            {
                step: 3,
                title: 'Add the Eggs',
                description:
                    'Carefully crack eggs into the warm tomato oil mixture. Cover and let poach gently for 8-10 minutes.',
            },
            {
                step: 4,
                title: 'Serve with Style',
                description:
                    'Gently transfer to a serving dish. Drizzle with the infused oil. Garnish with fresh basil and serve with crusty bread.',
            },
        ],
        nutritionFacts: {
            calories: 420,
            protein: '14g',
            fat: '35g',
            carbs: '8g',
            fiber: '2g',
        },
    },
];
