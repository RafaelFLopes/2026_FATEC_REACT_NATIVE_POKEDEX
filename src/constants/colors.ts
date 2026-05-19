
export const Colors = {
    white: '#FFFFFF',
    black: '#000000',
    background: '#F5F5F5',

    btnPrimary: '#E15610',
    labelPrimary: '#FFFFFF',
    txtPrimary: '#121214',

    whiteAlpha: {
        '08': 'rgba(255, 255, 255, 0.08)',
        '45': 'rgba(255, 255, 255, 0.45)',
    },

    semantic: {
        error: {
            bg: '#FFEBEE',
            border: '#B71C1C',
            text: '#B71C1C'
        },
        success: {
            bg: '#E8F5E9',
            border: '#1B5E20',
            text: '#1B5E20'
        },
        warning: {
            bg: '#FFF8E1',
            border: '#FF8F00',
            text: '#FF8F00'
        },
        info: {
            bg: '#E3F2FD',
            border: '#2196F3',
            text: '#0D47A1'
        }
    },

    gray: {
        100: '#F2F2F2',
        500: '#999999',
        800: '#333333',
    }
} as const;

type ColorPalette = { bg: string; accent: string };

const TYPE_COLORS: Record<string, ColorPalette> = {
    fire:     { bg: '#FF6B35', accent: '#FF6B35' },
    water:    { bg: '#4A90E2', accent: '#4A90E2' },
    grass:    { bg: '#2ECC71', accent: '#2ECC71' },
    electric: { bg: '#F1C40F', accent: '#F1C40F' },
    ice:      { bg: '#74D7F0', accent: '#74D7F0' },
    fighting: { bg: '#D62828', accent: '#D62828' },
    poison:   { bg: '#9B59B6', accent: '#9B59B6' },
    ground:   { bg: '#A67C52', accent: '#A67C52' },
    flying:   { bg: '#7FB3D5', accent: '#7FB3D5' },
    psychic:  { bg: '#E74C3C', accent: '#E74C3C' },
    bug:      { bg: '#27AE60', accent: '#27AE60' },
    rock:     { bg: '#95A5A6', accent: '#95A5A6' },
    ghost:    { bg: '#8E44AD', accent: '#8E44AD' },
    dragon:   { bg: '#2980B9', accent: '#2980B9' },
    dark:     { bg: '#4A4A6A', accent: '#7A7ABA' },
    steel:    { bg: '#708090', accent: '#A8C0C8' },
    fairy:    { bg: '#FF69B4', accent: '#FF91C7' },
    normal:   { bg: '#A4ACAF', accent: '#C4CCC0' },
};

export function getColor(types: string[]): ColorPalette {
    const primary = types[0] ?? 'normal';
    return TYPE_COLORS[primary] ?? TYPE_COLORS['normal'];
}