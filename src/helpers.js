import teoria from 'teoria';

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
    const interval = teoria.interval(intervalNames[Math.abs(semitones % 12)]);

    if (semitones < 0) {
        interval.direction('down');
    }

    return interval;
}
