import { atomFamily } from 'recoil';

export const chartAtom = atomFamily({ key: 'AtomChart', default: { symbol: 'GROW', interval: '1day', range: '1year' } })
