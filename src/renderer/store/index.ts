import { WaterStore, WaterProps as IWaterProps } from './water.store';
import { DataSetEntry } from './types';

const mockdata: DataSetEntry<IWaterProps>[] = [
    {
        key: 'a1',
        name: 'first experiment',
        description: '2019-02-12 by pp',
        params: {
            pressure: 1.001, // atm
            temperature: 25, // ℃
            density: { use: true }, // g/cm^3
            viscosity: { use: true }
        }
    },
    {
        key: 'a2',
        name: '2nd experiment',
        description: '2020-02-12 by pp',
        params: {
            pressure: 1.001, // atm
            temperature: 20, // ℃
            density: { use: true }, // g/cm^3
            viscosity: { use: true }
        }
    },
    {
        key: 'a3',
        name: '3rd experiment',
        description: '2020-02-21 by pp',
        params: {
            pressure: 1.001, // atm
            temperature: 30, // ℃
            density: { use: false }, // g/cm^3
            viscosity: { use: true }
        }
    }
];
const waterRootStore = new WaterStore({ props: mockdata });

export { waterRootStore };
