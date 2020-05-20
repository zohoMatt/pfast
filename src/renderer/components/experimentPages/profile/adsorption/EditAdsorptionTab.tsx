import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Form, Input, Select } from 'antd';

import { CorrelationOrUserInput } from '../../../common/elements/CorrelationOrUserInput';
import { StoreInjectedProp } from '../../../../store/init';
import { AdsorptionInputParams, ContaminantData } from '../../../../../utils/storage/types';

export const EditAdsorptionTab: React.FunctionComponent<AdsorptionInputParams &
    StoreInjectedProp> = inject('store')(
    observer(({ store }) => {
        // Hooks
        const [options, setOpts] = React.useState([] as ContaminantData[]);
        React.useEffect(() => {
            store!.contaminant.tableList().then(setOpts);
        });

        const { Option } = Select;
        const optionComps = options.map((c: ContaminantData) => (
            <Option key={c.key} value={c.key}>
                {c.name}
            </Option>
        ));

        return (
            <>
                <Form.Item name={['adsorption', 'contaminant']} label="Contaminant">
                    <Select
                        showSearch
                        placeholder="Select a contaminant"
                        optionFilterProp="children"
                        filterOption={(input: string, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {optionComps}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={['adsorption', 'initConcent', 'value']}
                    label="Initial Concentration"
                    normalize={v => +v}>
                    <Input type="number" addonAfter="μg/L" />
                </Form.Item>
                <Divider orientation="left">Kinetics</Divider>
                <Form.Item
                    name={['adsorption', 'kinetics', 'filmDiffusion']}
                    label="Film Diffusion"
                    wrapperCol={{ span: 12 }}>
                    <CorrelationOrUserInput
                        decorationText="Correlation"
                        tooltip="Gnielinski Correlation"
                        unit="cm/s"
                        />
                </Form.Item>
                <Form.Item
                    name={['adsorption', 'kinetics', 'surfaceDiffusion']}
                    label="Surface Diffusion"
                    wrapperCol={{ span: 12 }}>
                    <CorrelationOrUserInput
                        decorationText="Correlation"
                        tooltip="Sontheimer Correlation"
                        unit="cm²/s"
                        />
                </Form.Item>
                <Form.Item
                    name={['adsorption', 'kinetics', 'poreDiffusion']}
                    label="Pore Diffusion"
                    wrapperCol={{ span: 12 }}>
                    <CorrelationOrUserInput
                        decorationText="Correlation"
                        tooltip="Hayduk and Laudie"
                        unit="cm²/s"
                        />
                </Form.Item>
                <Form.Item
                    name={['adsorption', 'kinetics', 'spdfr', 'value']}
                    label="SPDFR"
                    normalize={v => +v}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name={['adsorption', 'kinetics', 'tortuosity', 'value']}
                    label="Tortuosity"
                    normalize={v => +v}>
                    <Input type="number" />
                </Form.Item>
                <Divider orientation="left">Freundlich</Divider>
                <Form.Item
                    name={['adsorption', 'freundlich', 'k', 'value']}
                    label="K"
                    normalize={v => +v}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name={['adsorption', 'freundlich', 'nth', 'value']}
                    label="1/n"
                    normalize={v => +v}>
                    <Input type="number" />
                </Form.Item>
            </>
        );
    })
);
