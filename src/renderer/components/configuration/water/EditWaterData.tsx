import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { BasicInfoFormFields } from '../common/BasicInfo';
import { TextSwitcher } from '../../common/TextSwticher';
import { Water } from '../../../../mods/calculation/waterProperties.maths';
import { Calculation } from '../../../../mods/calculation/basic';
import { EditProps } from '../../container/TableWithEditSection';
import { WaterValidator } from '../../../../mods/validators/water.validator';
import { VALIDATE_MSG_TEMPLATE } from '../../../../utils/validator';

export const EditWaterData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const { temperature } = initValues;
    const vdator = new WaterValidator();

    return (
        <Form
            size="small"
            layout="horizontal"
            ref={form}
            validateMessages={VALIDATE_MSG_TEMPLATE}
            hideRequiredMark={true}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            onValuesChange={(s, all: any) => onValuesChange(all)}
            initialValues={initValues}>
            <BasicInfoFormFields />
            <Divider orientation="left" />
            <Form.Item
                name="pressure"
                label="Pressure"
                rules={vdator.getFormValidators('pressure')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="atm" />
            </Form.Item>
            <Form.Item
                name="temperature"
                label="Temperature"
                rules={vdator.getFormValidators('temperature')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="℃" />
            </Form.Item>
            <Divider orientation="left">Correlations</Divider>
            <Form.Item label="Density">
                <Form.Item name={['density', 'use']}>
                    <TextSwitcher
                        text={temperature ? Calculation.display(Water.density(temperature)) : '-'}
                        />
                </Form.Item>
            </Form.Item>
            <Form.Item name={['viscosity', 'use']} label="Viscosity">
                <TextSwitcher
                    text={temperature ? Calculation.display(Water.viscosity(temperature)) : '-'}
                    />
            </Form.Item>
        </Form>
    );
};
