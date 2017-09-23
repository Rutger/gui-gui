const intervalNames = [
    'P1',
    'm2',
    'M2',
    'm3',
    'M3',
    'P4',
    'P5',
    'm6',
    'M6',
    'm7',
    'M7',
    'P8',
];

export function intervalFromSemitones(semitones) {
    return intervalNames[semitones % 12];
}
