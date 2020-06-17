import { action, observable } from 'mobx';
import { Store } from './index';
import { EssentialProfileInput } from '../../mods/calculation/profile.maths';
import { DataStorage } from '../../utils/storage/storage';
import { ExpProfilesStorage } from '../app';
import { ExpProfileParams, FullRecordType, GraphProcessingStatus } from '../../utils/storage/types';
import { fullRecordToBrief, profileToInput } from './helpers';

export interface ProfileStatusUIStates {
    profilesToCompare: string[];
}

export class GraphStore {
    protected root: Store;

    @observable public database: DataStorage<FullRecordType<ExpProfileParams>> = ExpProfilesStorage;

    @observable public profiles: ProfileStatusUIStates = {
        profilesToCompare: []
    };

    constructor(root: Store) {
        this.root = root;
    }

    public async profileStatusTableData() {
        const list = await this.database.list();
        return Promise.all(
            list.map(async profile => {
                const briefRecord = fullRecordToBrief(profile);
                const { adsorbent: adsKey } = briefRecord.bed;
                const { contaminant: contmKey } = briefRecord.adsorption;
                const adsorbent = adsKey
                    ? await this.root.adsorbent.queryWithKeyInList(adsKey)
                    : undefined;
                const contaminant = contmKey
                    ? await this.root.contaminant.queryWithKeyInList(contmKey)
                    : undefined;
                return {
                    key: profile.key,
                    name: profile.name,
                    status: profile.processed || GraphProcessingStatus.Processing,
                    ...profileToInput(briefRecord, adsorbent, contaminant)
                };
            })
        );
    }

    @action
    public getProfileViaKey(key: string): EssentialProfileInput {
        return {} as any;
    }

    @action
    public resetUI() {
        this.profiles.profilesToCompare = [];
    }

    @action
    public updateStatus(key: string, status: GraphProcessingStatus) {
        // todo
    }

    @action
    public compareThem(keys: string[]) {
        this.profiles.profilesToCompare = keys;
    }
}
