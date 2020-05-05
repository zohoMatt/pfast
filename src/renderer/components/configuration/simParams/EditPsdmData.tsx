import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { EditProps } from '../../container/TableWithEditSection';
import { PsdmValidator } from '../../../../mods/validators/psdm.validator';
import { VALIDATE_MSG_TEMPLATE } from '../../../../utils/validator';

const styles = require('./EditPsdmData.module.less');

export const EditPsdmData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const vdator = new PsdmValidator();
    const POINTS = 500;

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Form
                    size="small"
                    layout="horizontal"
                    validateMessages={VALIDATE_MSG_TEMPLATE}
                    ref={form}
                    hideRequiredMark={true}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 8 }}
                    onValuesChange={(s, all: any) => onValuesChange(all)}
                    initialValues={initValues}>
                    <Form.Item name="name" label="Name" rules={vdator.getFormValidators('name')}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ max: 80, type: 'string' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Divider orientation="left" />
                    <Form.Item
                        name="totalRunTime"
                        label="Total Run Time"
                        rules={vdator.getFormValidators('totalRunTime', POINTS)}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="d" />
                    </Form.Item>
                    <Form.Item
                        name="firstPointDisplayed"
                        label="First Point Displayed"
                        rules={vdator.getFormValidators('firstPointDisplayed', POINTS)}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="d" />
                    </Form.Item>
                    <Form.Item
                        name="timeStep"
                        label="Time Step"
                        rules={vdator.getFormValidators('timeStep', POINTS)}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="d" />
                    </Form.Item>
                    <Form.Item
                        name="numOfAxialElms"
                        label="Number of Axial Elements"
                        rules={vdator.getFormValidators('numOfAxialElms')}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" />
                    </Form.Item>
                    <Divider orientation="left">Number of Collocation Points</Divider>
                    <Form.Item
                        name="axialCollocatPts"
                        label="Axial Direction"
                        rules={vdator.getFormValidators('axialCollocatPts')}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="radialCollocatPts"
                        label="Radial Direction"
                        rules={vdator.getFormValidators('radialCollocatPts')}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
